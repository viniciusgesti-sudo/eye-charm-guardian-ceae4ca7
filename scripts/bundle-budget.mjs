#!/usr/bin/env node
/**
 * Bundle size budget check.
 *
 * Runs after `vite build`. Emits WARN when a file/total crosses the warning
 * threshold (default 90% of the limit) and FAILS (exit 1) only when it
 * exceeds 100%. Budgets are KB (1 KB = 1024 bytes) and cover shipped
 * JS/CSS under `dist/client` and MJS under `dist/server`.
 *
 * Overrides via env vars, e.g.
 *   BUDGET_CLIENT_TOTAL_KB=1600 BUDGET_WARN_PCT=85 bun run build
 */
import { readdirSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const KB = 1024;
const num = (v, d) => (v != null && !Number.isNaN(Number(v)) ? Number(v) : d);

const WARN_PCT = Math.min(100, Math.max(1, num(process.env.BUDGET_WARN_PCT, 90)));

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

function collect(dir, exts) {
  return walk(dir)
    .filter((f) => exts.includes(extname(f)))
    .map((f) => ({ path: f, size: statSync(f).size }))
    .sort((a, b) => b.size - a.size);
}

const violations = [];
const warnings = [];
const summary = [];

/** Check a single measurement against its limit. */
function check(label, bytes, limitKb) {
  const p = pct(bytes, limitKb);
  const msg = `${label} = ${fmt(bytes)} (${p.toFixed(1)}% of ${limitKb} KB)`;
  if (p > 100) violations.push(msg);
  else if (p >= WARN_PCT) warnings.push(msg);
}

// --- Client --------------------------------------------------------------
const clientFiles = collect(CLIENT_DIR, [".js", ".css"]);
const clientTotal = clientFiles.reduce((s, f) => s + f.size, 0);

for (const f of clientFiles) {
  const ext = extname(f.path);
  const limitKb = ext === ".css" ? BUDGETS.client.fileCss : BUDGETS.client.fileJs;
  check(`client file ${rel(f.path)}`, f.size, limitKb);
}
check("client total", clientTotal, BUDGETS.client.total);
summary.push(
  `client: ${clientFiles.length} files, total ${fmt(clientTotal)} / ${BUDGETS.client.total} KB (${pct(clientTotal, BUDGETS.client.total).toFixed(1)}%)`,
);

// --- Server --------------------------------------------------------------
const serverFiles = collect(SERVER_DIR, [".mjs", ".js"]);
const serverTotal = serverFiles.reduce((s, f) => s + f.size, 0);

for (const f of serverFiles) {
  check(`server file ${rel(f.path)}`, f.size, BUDGETS.server.file);
}
check("server total", serverTotal, BUDGETS.server.total);
summary.push(
  `server: ${serverFiles.length} files, total ${fmt(serverTotal)} / ${BUDGETS.server.total} KB (${pct(serverTotal, BUDGETS.server.total).toFixed(1)}%)`,
);

// --- Report --------------------------------------------------------------
console.log(`\n[bundle-budget] warn threshold: ${WARN_PCT}% · fail threshold: 100%`);
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

if (warnings.length) {
  console.warn(`\n[bundle-budget] ⚠ ${warnings.length} at or above ${WARN_PCT}%:`);
  for (const w of warnings) console.warn("  ⚠ " + w);
}

if (violations.length) {
  console.error("\n[bundle-budget] ✗ BUDGET EXCEEDED:");
  for (const v of violations) console.error("  ✗ " + v);
  console.error(
    "\nRaise the limit via BUDGET_* env vars only after confirming the growth is justified.",
  );
  process.exit(1);
}

console.log(
  warnings.length
    ? "\n[bundle-budget] ✓ within hard limits (see warnings above)\n"
    : "\n[bundle-budget] ✓ all budgets within limits\n",
);
