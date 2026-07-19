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

// --- Baseline environment ------------------------------------------------
// Pick a baseline slot via `BUDGET_BASELINE_ENV` (e.g. `dev`, `prod`, `ci`)
// or `--baseline=<env>`. Each env keeps its own file:
//   bundle-budget.baseline.<env>.json
// The legacy `bundle-budget.baseline.json` is still used as fallback for
// backward compatibility when no env is selected.
const cliBaselineArg = process.argv.find((a) => a.startsWith("--baseline="));
const BASELINE_ENV = (
  cliBaselineArg?.split("=")[1] ||
  process.env.BUDGET_BASELINE_ENV ||
  process.env.NODE_ENV ||
  ""
)
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9_-]/g, "");

// --- Budgets (KB) --------------------------------------------------------
const BUDGETS = {
  client: {
    fileJs: num(process.env.BUDGET_CLIENT_FILE_JS_KB, 600),
    fileCss: num(process.env.BUDGET_CLIENT_FILE_CSS_KB, 200),
    total: num(process.env.BUDGET_CLIENT_TOTAL_KB, 1700),
  },
  server: {
    file: num(process.env.BUDGET_SERVER_FILE_KB, 700),
    total: num(process.env.BUDGET_SERVER_TOTAL_KB, 2400),
  },
};

const ROOT = process.cwd();
const CLIENT_DIR = join(ROOT, "dist", "client");
const SERVER_DIR = join(ROOT, "dist", "server");
const LEGACY_BASELINE_PATH = join(ROOT, "bundle-budget.baseline.json");
const ENV_BASELINE_PATH = BASELINE_ENV
  ? join(ROOT, `bundle-budget.baseline.${BASELINE_ENV}.json`)
  : LEGACY_BASELINE_PATH;
// Write always goes to the env-scoped file (or legacy when no env set).
// Read prefers env file, then falls back to legacy so existing setups keep working.
const BASELINE_WRITE_PATH = ENV_BASELINE_PATH;
const BASELINE_READ_PATH = existsSync(ENV_BASELINE_PATH)
  ? ENV_BASELINE_PATH
  : LEGACY_BASELINE_PATH;


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
  const snap = { ...currentSnapshot, env: BASELINE_ENV || null };
  writeFileSync(BASELINE_WRITE_PATH, JSON.stringify(snap, null, 2) + "\n");
  console.log(
    `\n[bundle-budget] baseline written → ${rel(BASELINE_WRITE_PATH)}${BASELINE_ENV ? ` (env: ${BASELINE_ENV})` : ""}`,
  );
  console.log(
    `  client total ${fmt(clientTotal)} · server total ${fmt(serverTotal)} · max growth ${MAX_GROWTH_PCT}%\n`,
  );
  process.exit(0);
}

const baselineExists = existsSync(BASELINE_READ_PATH);
const baseline = baselineExists
  ? JSON.parse(readFileSync(BASELINE_READ_PATH, "utf8"))
  : null;
const baselineSource = baselineExists
  ? `${rel(BASELINE_READ_PATH)}${BASELINE_ENV && BASELINE_READ_PATH === LEGACY_BASELINE_PATH ? " (legacy fallback)" : ""}`
  : "missing";

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

// --- Per-asset suggestions ----------------------------------------------
function suggestFor(file, side) {
  const kb = file.size / KB;
  const ext = extname(file.path);
  const name = basename(file.path).toLowerCase();
  const s = [];
  if (side === "client" && ext === ".js") {
    if (kb > 380) s.push("Split via dynamic import() or React.lazy — chunk excede o limite JS.");
    else if (kb > 200) s.push("Considere code-splitting por rota/feature (dynamic import).");
    if (/vendor|libs?|chunk/.test(name) && kb > 150)
      s.push("Auditar dependências pesadas (bundle analyzer) e trocar por libs menores.");
    if (/index\.js$/.test(name) && kb > 250)
      s.push("Entry principal pesado — mover seções abaixo da dobra para chunks lazy.");
  }
  if (ext === ".css") {
    if (kb > 180) s.push("CSS acima do limite — verificar Tailwind purge/@utility não utilizadas.");
    else if (kb > 100) s.push("CSS grande — auditar utilitários e keyframes não usados.");
  }
  if (side === "server" && kb > 500)
    s.push("Handler server pesado — avaliar libs (router/zod) e mover lógica para módulos lazy.");
  return s;
}

const assetsReport = [
  ...clientFiles.map((f) => {
    const limitKb = extname(f.path) === ".css" ? BUDGETS.client.fileCss : BUDGETS.client.fileJs;
    return {
      side: "client",
      path: rel(f.path),
      key: f.key,
      type: extname(f.path).replace(".", "") || "bin",
      bytes: f.size,
      sizeKB: +(f.size / KB).toFixed(2),
      limitKB: limitKb,
      pctOfLimit: +pct(f.size, limitKb).toFixed(1),
      status: pct(f.size, limitKb) > 100 ? "fail" : pct(f.size, limitKb) >= WARN_PCT ? "warn" : "ok",
      suggestions: suggestFor(f, "client"),
    };
  }),
  ...serverFiles.map((f) => ({
    side: "server",
    path: rel(f.path),
    key: f.key,
    type: extname(f.path).replace(".", "") || "bin",
    bytes: f.size,
    sizeKB: +(f.size / KB).toFixed(2),
    limitKB: BUDGETS.server.file,
    pctOfLimit: +pct(f.size, BUDGETS.server.file).toFixed(1),
    status:
      pct(f.size, BUDGETS.server.file) > 100
        ? "fail"
        : pct(f.size, BUDGETS.server.file) >= WARN_PCT
          ? "warn"
          : "ok",
    suggestions: suggestFor(f, "server"),
  })),
];

const reportJson = {
  generatedAt: new Date().toISOString(),
  thresholds: { warnPct: WARN_PCT, failPct: 100, maxGrowthPct: MAX_GROWTH_PCT },
  budgets: BUDGETS,
  totals: {
    client: { bytes: clientTotal, sizeKB: +(clientTotal / KB).toFixed(2), limitKB: BUDGETS.client.total, pctOfLimit: +pct(clientTotal, BUDGETS.client.total).toFixed(1) },
    server: { bytes: serverTotal, sizeKB: +(serverTotal / KB).toFixed(2), limitKB: BUDGETS.server.total, pctOfLimit: +pct(serverTotal, BUDGETS.server.total).toFixed(1) },
  },
  violations,
  warnings,
  newChunks,
  removedChunks,
  assets: assetsReport.sort((a, b) => b.bytes - a.bytes),
};

function renderHtml(r) {
  const row = (a) => `<tr class="${a.status}"><td>${a.side}</td><td><code>${a.path}</code></td><td>${a.type}</td><td class="num">${a.sizeKB.toFixed(1)} KB</td><td class="num">${a.limitKB} KB</td><td class="num">${a.pctOfLimit.toFixed(1)}%</td><td class="badge b-${a.status}">${a.status.toUpperCase()}</td><td>${a.suggestions.map((s) => `<div>• ${s}</div>`).join("") || "<span class='muted'>—</span>"}</td></tr>`;
  const list = (arr) => (arr.length ? `<ul>${arr.map((x) => `<li>${x}</li>`).join("")}</ul>` : `<p class="muted">Nenhum.</p>`);
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Bundle Budget Report — Eyegis</title>
<style>
:root{--ink:#1D252D;--muted:#6b7480;--ok:#0a8f3e;--warn:#b7791f;--fail:#c0392b;--bg:#F9F9F9;--surface:#fff;--border:#e6e8ec;--primary:#004B57}
*{box-sizing:border-box}body{margin:0;font:14px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;color:var(--ink);background:var(--bg)}
header{padding:32px 40px;background:var(--primary);color:#fff}h1{margin:0 0 4px;font-weight:600;letter-spacing:-.01em}
main{padding:24px 40px;max-width:1400px;margin:0 auto}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin:16px 0 28px}
.card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px}
.card h3{margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:.15em;color:var(--muted)}
.card .big{font-size:24px;font-weight:600}
table{width:100%;border-collapse:collapse;background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden}
th,td{padding:10px 12px;text-align:left;border-bottom:1px solid var(--border);vertical-align:top}
th{background:#f2f4f7;font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted)}
.num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
code{font:12px/1.4 ui-monospace,Menlo,Consolas,monospace;color:#334}
tr.fail{background:#fff4f2}tr.warn{background:#fffaf0}
.badge{font-size:10px;font-weight:700;letter-spacing:.1em;padding:3px 8px;border-radius:999px;display:inline-block}
.b-ok{background:#e6f7ec;color:var(--ok)}.b-warn{background:#fdf1d8;color:var(--warn)}.b-fail{background:#fde1dd;color:var(--fail)}
.muted{color:var(--muted)}
section{margin:24px 0}h2{font-weight:600;font-size:16px;letter-spacing:.02em;margin:0 0 10px}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:800px){.grid2{grid-template-columns:1fr}}
</style></head><body>
<header><h1>Bundle Budget Report</h1><div style="opacity:.85">Gerado em ${r.generatedAt} · warn ${r.thresholds.warnPct}% · fail 100% · max growth ${r.thresholds.maxGrowthPct}%</div></header>
<main>
<div class="cards">
<div class="card"><h3>Client total</h3><div class="big">${r.totals.client.sizeKB.toFixed(1)} KB</div><div class="muted">${r.totals.client.pctOfLimit.toFixed(1)}% de ${r.totals.client.limitKB} KB</div></div>
<div class="card"><h3>Server total</h3><div class="big">${r.totals.server.sizeKB.toFixed(1)} KB</div><div class="muted">${r.totals.server.pctOfLimit.toFixed(1)}% de ${r.totals.server.limitKB} KB</div></div>
<div class="card"><h3>Assets</h3><div class="big">${r.assets.length}</div><div class="muted">${r.assets.filter((a)=>a.status==="fail").length} fail · ${r.assets.filter((a)=>a.status==="warn").length} warn</div></div>
<div class="card"><h3>Baseline</h3><div class="big">${r.newChunks.length}+ / ${r.removedChunks.length}−</div><div class="muted">novos / removidos</div></div>
</div>
<section class="grid2">
<div class="card"><h2 style="color:var(--fail)">Violações</h2>${list(r.violations)}</div>
<div class="card"><h2 style="color:var(--warn)">Avisos</h2>${list(r.warnings)}</div>
</section>
<section><h2>Breakdown por asset</h2>
<table><thead><tr><th>Side</th><th>Arquivo</th><th>Tipo</th><th class="num">Tamanho</th><th class="num">Limite</th><th class="num">%</th><th>Status</th><th>Sugestões</th></tr></thead>
<tbody>${r.assets.map(row).join("")}</tbody></table></section>
<section class="grid2">
<div class="card"><h2>Novos chunks</h2>${list(r.newChunks)}</div>
<div class="card"><h2>Chunks removidos</h2>${list(r.removedChunks)}</div>
</section>
</main></body></html>`;
}

const REPORT_DIR = join(ROOT, "dist", "reports");
try { mkdirSync(REPORT_DIR, { recursive: true }); } catch {}
const jsonPath = join(REPORT_DIR, "bundle-report.json");
const htmlPath = join(REPORT_DIR, "bundle-report.html");
writeFileSync(jsonPath, JSON.stringify(reportJson, null, 2));
writeFileSync(htmlPath, renderHtml(reportJson));

// Mirror to /mnt/documents for the user to download.
try {
  mkdirSync("/mnt/documents", { recursive: true });
  copyFileSync(jsonPath, "/mnt/documents/bundle-report.json");
  copyFileSync(htmlPath, "/mnt/documents/bundle-report.html");
} catch {}

console.log(`\n[bundle-budget] reports written:`);
console.log(`  · ${rel(jsonPath)}`);
console.log(`  · ${rel(htmlPath)}`);
console.log(`  · /mnt/documents/bundle-report.{json,html}`);

// Log fail/warn assets with suggestions in the build output.
const flagged = assetsReport.filter((a) => a.status !== "ok");
if (flagged.length) {
  console.log(`\n[bundle-budget] assets acima do warn threshold (${flagged.length}):`);
  for (const a of flagged) {
    const mark = a.status === "fail" ? "✗" : "⚠";
    console.log(`  ${mark} [${a.side}] ${a.path}  ${a.sizeKB.toFixed(1)} KB (${a.pctOfLimit.toFixed(1)}% de ${a.limitKB} KB)`);
    for (const s of a.suggestions) console.log(`      → ${s}`);
  }
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
      "  • re-baseline with `node scripts/bundle-budget.mjs --update-baseline` after review.\n" +
      `  • see full report: dist/reports/bundle-report.html\n`,
  );
  process.exit(1);
}

console.log(
  warnings.length
    ? "\n[bundle-budget] ✓ within hard limits and baseline (see warnings above)\n"
    : "\n[bundle-budget] ✓ all budgets and baseline within limits\n",
);
