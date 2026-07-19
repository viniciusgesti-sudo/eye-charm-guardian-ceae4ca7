#!/usr/bin/env node
/**
 * Bundle size budget check with baseline comparison.
 *
 * Runs after `vite build`. Two independent gates:
 *
 *  1. Hard budget — WARN at BUDGET_WARN_PCT (default 90%), FAIL above 100%
 *     of the per-file / per-total KB caps below.
 *  2. Baseline growth — compares against the last approved sizes stored in
 *     `bundle-budget.baseline.json`. FAILS when totals (client / server) or
 *     any tracked chunk group grew by more than BUDGET_MAX_GROWTH_PCT
 *     (default 10%). New chunks and removed chunks are reported but never
 *     fail the build on their own.
 *
 * Update the baseline after intentionally shipping bigger bundles:
 *   bun run budget:baseline           # or: node scripts/bundle-budget.mjs --update-baseline
 *
 * Overrides via env vars:
 *   BUDGET_CLIENT_TOTAL_KB, BUDGET_SERVER_TOTAL_KB, BUDGET_CLIENT_FILE_JS_KB,
 *   BUDGET_CLIENT_FILE_CSS_KB, BUDGET_SERVER_FILE_KB, BUDGET_WARN_PCT,
 *   BUDGET_MAX_GROWTH_PCT, BUDGET_UPDATE_BASELINE=1
 */
import {
  readdirSync,
  statSync,
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  copyFileSync,
} from "node:fs";
import { join, extname, basename } from "node:path";

const KB = 1024;
const num = (v, d) => (v != null && !Number.isNaN(Number(v)) ? Number(v) : d);

const WARN_PCT = Math.min(100, Math.max(1, num(process.env.BUDGET_WARN_PCT, 90)));
const MAX_GROWTH_PCT = Math.max(0, num(process.env.BUDGET_MAX_GROWTH_PCT, 10));
const UPDATE_BASELINE =
  process.argv.includes("--update-baseline") ||
  process.env.BUDGET_UPDATE_BASELINE === "1";

// --- Budgets (KB) --------------------------------------------------------
const BUDGETS = {
  client: {
    fileJs: num(process.env.BUDGET_CLIENT_FILE_JS_KB, 380),
    fileCss: num(process.env.BUDGET_CLIENT_FILE_CSS_KB, 180),
    total: num(process.env.BUDGET_CLIENT_TOTAL_KB, 1200),
  },
  server: {
    file: num(process.env.BUDGET_SERVER_FILE_KB, 700),
    total: num(process.env.BUDGET_SERVER_TOTAL_KB, 2400),
  },
};

const ROOT = process.cwd();
const CLIENT_DIR = join(ROOT, "dist", "client");
const SERVER_DIR = join(ROOT, "dist", "server");
const BASELINE_PATH = join(ROOT, "bundle-budget.baseline.json");

function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const fmt = (bytes) => `${(bytes / KB).toFixed(1)} KB`;
const rel = (p) => p.replace(ROOT + "/", "");
const pct = (bytes, limitKb) => (bytes / (limitKb * KB)) * 100;
const growthPct = (curr, prev) => (prev === 0 ? (curr > 0 ? Infinity : 0) : ((curr - prev) / prev) * 100);
const signed = (n) => (n >= 0 ? `+${n.toFixed(1)}` : n.toFixed(1));

/** Strip Vite content hash so chunk names stay stable across builds. */
function normalizeKey(path) {
  const r = rel(path);
  // "assets/index-CTEfyqnu.js" -> "assets/index.js"
  return r.replace(/-[A-Za-z0-9_-]{6,}(\.[a-z0-9]+)$/i, "$1");
}

function collect(dir, exts) {
  return walk(dir)
    .filter((f) => exts.includes(extname(f)))
    .map((f) => ({ path: f, key: normalizeKey(f), size: statSync(f).size }))
    .sort((a, b) => b.size - a.size);
}

/** Sum sizes per normalized key (a group may include multiple hashed chunks). */
function groupByKey(files) {
  const map = new Map();
  for (const f of files) {
    const prev = map.get(f.key) ?? 0;
    map.set(f.key, prev + f.size);
  }
  return Object.fromEntries([...map.entries()].sort((a, b) => b[1] - a[1]));
}

const violations = [];
const warnings = [];
const summary = [];

function checkLimit(label, bytes, limitKb) {
  const p = pct(bytes, limitKb);
  const msg = `${label} = ${fmt(bytes)} (${p.toFixed(1)}% of ${limitKb} KB)`;
  if (p > 100) violations.push(msg);
  else if (p >= WARN_PCT) warnings.push(msg);
}

// --- Collect current build ----------------------------------------------
const clientFiles = collect(CLIENT_DIR, [".js", ".css"]);
const serverFiles = collect(SERVER_DIR, [".mjs", ".js"]);
const clientTotal = clientFiles.reduce((s, f) => s + f.size, 0);
const serverTotal = serverFiles.reduce((s, f) => s + f.size, 0);

// --- Hard budget checks --------------------------------------------------
for (const f of clientFiles) {
  const limitKb = extname(f.path) === ".css" ? BUDGETS.client.fileCss : BUDGETS.client.fileJs;
  checkLimit(`client file ${rel(f.path)}`, f.size, limitKb);
}
checkLimit("client total", clientTotal, BUDGETS.client.total);
for (const f of serverFiles) checkLimit(`server file ${rel(f.path)}`, f.size, BUDGETS.server.file);
checkLimit("server total", serverTotal, BUDGETS.server.total);

summary.push(
  `client: ${clientFiles.length} files, total ${fmt(clientTotal)} / ${BUDGETS.client.total} KB (${pct(clientTotal, BUDGETS.client.total).toFixed(1)}%)`,
);
summary.push(
  `server: ${serverFiles.length} files, total ${fmt(serverTotal)} / ${BUDGETS.server.total} KB (${pct(serverTotal, BUDGETS.server.total).toFixed(1)}%)`,
);

// --- Baseline comparison -------------------------------------------------
const currentSnapshot = {
  version: 1,
  updatedAt: new Date().toISOString(),
  maxGrowthPct: MAX_GROWTH_PCT,
  client: { total: clientTotal, groups: groupByKey(clientFiles) },
  server: { total: serverTotal, groups: groupByKey(serverFiles) },
};

if (UPDATE_BASELINE) {
  writeFileSync(BASELINE_PATH, JSON.stringify(currentSnapshot, null, 2) + "\n");
  console.log(`\n[bundle-budget] baseline written → ${rel(BASELINE_PATH)}`);
  console.log(
    `  client total ${fmt(clientTotal)} · server total ${fmt(serverTotal)} · max growth ${MAX_GROWTH_PCT}%\n`,
  );
  process.exit(0);
}

const baselineExists = existsSync(BASELINE_PATH);
const baseline = baselineExists
  ? JSON.parse(readFileSync(BASELINE_PATH, "utf8"))
  : null;

const baselineReport = [];
const newChunks = [];
const removedChunks = [];

if (baseline) {
  const bumps = [];

  const checkGrowth = (label, curr, prev) => {
    const g = growthPct(curr, prev);
    const line = `${label}: ${fmt(prev)} → ${fmt(curr)} (${signed(g)}%)`;
    if (g > MAX_GROWTH_PCT) {
      violations.push(`baseline growth · ${line} exceeds ${MAX_GROWTH_PCT}%`);
    } else if (g > MAX_GROWTH_PCT * 0.75 && g > 0) {
      warnings.push(`baseline growth · ${line} nearing +${MAX_GROWTH_PCT}%`);
    }
    return { label, curr, prev, growth: g, line };
  };

  bumps.push(checkGrowth("client total", clientTotal, baseline.client?.total ?? 0));
  bumps.push(checkGrowth("server total", serverTotal, baseline.server?.total ?? 0));

  for (const side of ["client", "server"]) {
    const currGroups = currentSnapshot[side].groups;
    const prevGroups = baseline[side]?.groups ?? {};
    for (const [key, curr] of Object.entries(currGroups)) {
      if (!(key in prevGroups)) {
        newChunks.push(`${side}/${key} = ${fmt(curr)} (new)`);
        continue;
      }
      const prev = prevGroups[key];
      const g = growthPct(curr, prev);
      // Only flag noticeable absolute growth (≥ 2 KB) to avoid rounding noise.
      if (curr - prev >= 2 * KB && g > MAX_GROWTH_PCT) {
        violations.push(
          `baseline growth · ${side} ${key}: ${fmt(prev)} → ${fmt(curr)} (${signed(g)}%) exceeds ${MAX_GROWTH_PCT}%`,
        );
      }
    }
    for (const key of Object.keys(prevGroups)) {
      if (!(key in currGroups)) removedChunks.push(`${side}/${key} = ${fmt(prevGroups[key])} (removed)`);
    }
  }

  baselineReport.push(...bumps.map((b) => `  ${b.line}`));
} else {
  baselineReport.push(
    `  no baseline yet — run \`node scripts/bundle-budget.mjs --update-baseline\` to record one.`,
  );
}

// --- Report --------------------------------------------------------------
console.log(
  `\n[bundle-budget] warn ${WARN_PCT}% · fail 100% · max baseline growth ${MAX_GROWTH_PCT}%`,
);
for (const line of summary) console.log("  " + line);

console.log("\n  top 5 client:");
for (const f of clientFiles.slice(0, 5))
  console.log(
    `    ${fmt(f.size).padStart(10)}  (${pct(f.size, extname(f.path) === ".css" ? BUDGETS.client.fileCss : BUDGETS.client.fileJs).toFixed(0)}%)  ${rel(f.path)}`,
  );
console.log("  top 5 server:");
for (const f of serverFiles.slice(0, 5))
  console.log(
    `    ${fmt(f.size).padStart(10)}  (${pct(f.size, BUDGETS.server.file).toFixed(0)}%)  ${rel(f.path)}`,
  );

console.log(`\n  baseline (${baseline ? "loaded" : "missing"}):`);
for (const line of baselineReport) console.log(line);
if (newChunks.length) {
  console.log("  new chunks:");
  for (const c of newChunks.slice(0, 8)) console.log("    + " + c);
  if (newChunks.length > 8) console.log(`    …and ${newChunks.length - 8} more`);
}
if (removedChunks.length) {
  console.log("  removed chunks:");
  for (const c of removedChunks.slice(0, 8)) console.log("    − " + c);
  if (removedChunks.length > 8) console.log(`    …and ${removedChunks.length - 8} more`);
}

if (warnings.length) {
  console.warn(`\n[bundle-budget] ⚠ ${warnings.length} warning(s):`);
  for (const w of warnings) console.warn("  ⚠ " + w);
}

if (violations.length) {
  console.error("\n[bundle-budget] ✗ FAIL:");
  for (const v of violations) console.error("  ✗ " + v);
  console.error(
    "\nFix the regression, or accept it explicitly:\n" +
      "  • raise a hard limit via BUDGET_*_KB env var, or\n" +
      "  • re-baseline with `node scripts/bundle-budget.mjs --update-baseline` after review.",
  );
  process.exit(1);
}

console.log(
  warnings.length
    ? "\n[bundle-budget] ✓ within hard limits and baseline (see warnings above)\n"
    : "\n[bundle-budget] ✓ all budgets and baseline within limits\n",
);
