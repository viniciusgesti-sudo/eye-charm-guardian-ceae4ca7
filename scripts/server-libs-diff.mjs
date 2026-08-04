#!/usr/bin/env node
/**
 * server-libs-diff.mjs
 *
 * Compares .output/server/_libs (current build) against the server._libs slice
 * of bundle-stats.baseline.json to confirm that a specific dependency
 * (default: @tanstack/react-router) was the size bottleneck and that no
 * other server chunk regressed.
 *
 * Usage:
 *   node scripts/server-libs-diff.mjs                 # write reports + exit code
 *   node scripts/server-libs-diff.mjs --focus=@tanstack/react-router
 *   node scripts/server-libs-diff.mjs --update-baseline
 *
 * Outputs:
 *   reports/server-libs-diff.json
 *   reports/server-libs-diff.html
 *   reports/server-libs-diff.md   (also printed to stdout)
 *
 * Exit codes:
 *   0  focus chunk shrank AND no other chunk grew beyond REGRESSION_PCT
 *   1  regression detected in a non-focus chunk (> REGRESSION_PCT or > REGRESSION_ABS bytes)
 *   2  baseline missing / dist missing
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASELINE = join(ROOT, "bundle-stats.baseline.json");
const SERVER_DIR = join(ROOT, ".output/server");
const LIBS_DIR = join(SERVER_DIR, "_libs");
const OUT_DIR = join(ROOT, "reports");

const args = new Set(process.argv.slice(2));
const focusArg = [...args].find((a) => a.startsWith("--focus="));
const FOCUS = focusArg ? focusArg.split("=")[1] : "@tanstack/react-router";
const UPDATE = args.has("--update-baseline");

const REGRESSION_PCT = Number(process.env.REGRESSION_PCT ?? 3);
const REGRESSION_ABS = Number(process.env.REGRESSION_ABS ?? 1024); // 1 KB noise floor

/** Strip Vite content hashes so `foo+[abcd1234].mjs` matches `foo+[...].mjs`. */
function normalizeKey(k) {
  return k
    .replace(/\+\[[a-f0-9]{6,}\]/gi, "+[...]")
    .replace(/-[a-f0-9]{8,}(?=\.(?:mjs|js)$)/gi, "");
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) out.push(...walk(full));
    else out.push({ path: full, size: s.size });
  }
  return out;
}

function fmt(n) {
  const sign = n > 0 ? "+" : "";
  if (Math.abs(n) >= 1024) return `${sign}${(n / 1024).toFixed(1)} KB`;
  return `${sign}${n} B`;
}
function kb(n) {
  return `${(n / 1024).toFixed(1)} KB`;
}

// --- Load current state ------------------------------------------------------
if (!existsSync(LIBS_DIR)) {
  console.error(`[server-libs-diff] missing ${LIBS_DIR} — run \`bun run build\` first.`);
  process.exit(2);
}
const currentFiles = walk(LIBS_DIR).map((f) => ({
  key: normalizeKey(relative(SERVER_DIR, f.path).replace(/\\/g, "/")),
  rawPath: relative(ROOT, f.path).replace(/\\/g, "/"),
  size: f.size,
}));
const currentMap = new Map(currentFiles.map((f) => [f.key, f]));

// --- Load baseline slice -----------------------------------------------------
if (!existsSync(BASELINE)) {
  console.error(`[server-libs-diff] missing ${BASELINE}.`);
  process.exit(2);
}
const baseline = JSON.parse(readFileSync(BASELINE, "utf8"));
const baselineLibs = Object.entries(baseline.server?.byPath ?? {})
  .filter(([k]) => k.includes("/_libs/"))
  .map(([k, v]) => ({
    key: normalizeKey(k.replace(/^(?:dist\/server|\.output\/server)\//, "")),
    rawPath: k,
    size: v.size,
  }));
const baselineMap = new Map(baselineLibs.map((f) => [f.key, f]));

// --- Diff --------------------------------------------------------------------
const allKeys = new Set([...currentMap.keys(), ...baselineMap.keys()]);
const rows = [];
for (const key of allKeys) {
  const before = baselineMap.get(key)?.size ?? 0;
  const after = currentMap.get(key)?.size ?? 0;
  const delta = after - before;
  const pct = before === 0 ? (after === 0 ? 0 : Infinity) : (delta / before) * 100;
  let status = "=";
  if (before === 0 && after > 0) status = "NEW";
  else if (after === 0 && before > 0) status = "GONE";
  else if (delta > 0) status = "▲";
  else if (delta < 0) status = "▼";
  rows.push({ key, before, after, delta, pct, status });
}
rows.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta) || b.after - a.after);

const totalBefore = baselineLibs.reduce((s, f) => s + f.size, 0);
const totalAfter = currentFiles.reduce((s, f) => s + f.size, 0);
const totalDelta = totalAfter - totalBefore;

const focusRow = rows.find((r) => r.key.includes(FOCUS));
const regressions = rows.filter(
  (r) =>
    !r.key.includes(FOCUS) &&
    r.delta > REGRESSION_ABS &&
    (r.status === "▲" || r.status === "NEW") &&
    (r.pct === Infinity || r.pct > REGRESSION_PCT),
);

// --- Emit reports ------------------------------------------------------------
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const jsonPayload = {
  focus: FOCUS,
  capturedAt: new Date().toISOString(),
  baselineCapturedAt: baseline.capturedAt,
  thresholds: { regressionPct: REGRESSION_PCT, regressionAbsBytes: REGRESSION_ABS },
  totals: { before: totalBefore, after: totalAfter, delta: totalDelta },
  focusRow: focusRow ?? null,
  regressions,
  rows,
};
writeFileSync(join(OUT_DIR, "server-libs-diff.json"), JSON.stringify(jsonPayload, null, 2));

const md = [
  `# Server \`_libs\` diff — focus: \`${FOCUS}\``,
  ``,
  `- Baseline captured: ${baseline.capturedAt}`,
  `- Compared at: ${jsonPayload.capturedAt}`,
  `- Total \`_libs\`: ${kb(totalBefore)} → ${kb(totalAfter)} (${fmt(totalDelta)})`,
  focusRow
    ? `- **Focus** \`${focusRow.key}\`: ${kb(focusRow.before)} → ${kb(focusRow.after)} (${fmt(focusRow.delta)}, ${focusRow.pct.toFixed(1)}%)`
    : `- **Focus** \`${FOCUS}\`: not present in either build`,
  `- Regressions (non-focus, >${REGRESSION_PCT}% and >${REGRESSION_ABS} B): **${regressions.length}**`,
  ``,
  `| Status | Chunk | Before | After | Δ | Δ% |`,
  `|---|---|---:|---:|---:|---:|`,
  ...rows.map(
    (r) =>
      `| ${r.status} | \`${r.key}\` | ${kb(r.before)} | ${kb(r.after)} | ${fmt(r.delta)} | ${r.pct === Infinity ? "∞" : r.pct.toFixed(1) + "%"} |`,
  ),
  ``,
].join("\n");
writeFileSync(join(OUT_DIR, "server-libs-diff.md"), md);

const html = `<!doctype html><meta charset="utf-8"><title>server _libs diff</title>
<style>
 body{font:14px/1.5 system-ui,sans-serif;margin:2rem;color:#1D252D;background:#F9F9F9}
 h1{margin:0 0 .25rem}small{color:#556}
 table{border-collapse:collapse;margin-top:1rem;width:100%;background:#fff}
 th,td{padding:.4rem .6rem;border-bottom:1px solid #e5e7eb;text-align:left}
 th{background:#004B57;color:#fff;position:sticky;top:0}
 td.num{text-align:right;font-variant-numeric:tabular-nums}
 .up{color:#b91c1c;font-weight:600}.down{color:#047857;font-weight:600}
 .new{color:#7c3aed;font-weight:600}.gone{color:#6b7280}.eq{color:#94a3b8}
 .focus{background:#FEF9C3}
 .card{padding:1rem 1.25rem;background:#fff;border-radius:.5rem;box-shadow:0 1px 3px rgba(0,0,0,.06);margin-bottom:1rem}
 .pill{display:inline-block;padding:.15rem .55rem;border-radius:999px;font-size:12px;margin-left:.5rem}
 .ok{background:#DCFCE7;color:#166534}.bad{background:#FEE2E2;color:#991B1B}
</style>
<h1>Server <code>_libs</code> diff <span class="pill ${regressions.length ? "bad" : "ok"}">${regressions.length ? regressions.length + " regression(s)" : "no regression"}</span></h1>
<small>Focus: <code>${FOCUS}</code> · Baseline ${baseline.capturedAt} → Now ${jsonPayload.capturedAt}</small>
<div class="card">
 <div><b>Total _libs</b>: ${kb(totalBefore)} → ${kb(totalAfter)} (<span class="${totalDelta > 0 ? "up" : totalDelta < 0 ? "down" : "eq"}">${fmt(totalDelta)}</span>)</div>
 ${focusRow ? `<div><b>Focus chunk</b> <code>${focusRow.key}</code>: ${kb(focusRow.before)} → ${kb(focusRow.after)} <span class="${focusRow.delta > 0 ? "up" : focusRow.delta < 0 ? "down" : "eq"}">${fmt(focusRow.delta)} (${focusRow.pct.toFixed(1)}%)</span></div>` : `<div><b>Focus chunk</b> <code>${FOCUS}</code>: not present</div>`}
 <div><b>Thresholds</b>: >${REGRESSION_PCT}% AND >${REGRESSION_ABS} B on non-focus chunks trigger a regression flag.</div>
</div>
<table>
 <thead><tr><th>Status</th><th>Chunk</th><th class="num">Before</th><th class="num">After</th><th class="num">Δ</th><th class="num">Δ%</th></tr></thead>
 <tbody>
 ${rows
   .map((r) => {
     const cls =
       r.status === "▲" || r.status === "NEW"
         ? "up"
         : r.status === "▼" || r.status === "GONE"
           ? "down"
           : "eq";
     const highlight = r.key.includes(FOCUS) ? " focus" : "";
     return `<tr class="${highlight.trim()}"><td class="${cls === "up" ? "up" : cls === "down" ? "down" : "eq"}">${r.status}</td><td><code>${r.key}</code></td><td class="num">${kb(r.before)}</td><td class="num">${kb(r.after)}</td><td class="num ${cls}">${fmt(r.delta)}</td><td class="num ${cls}">${r.pct === Infinity ? "∞" : r.pct.toFixed(1) + "%"}</td></tr>`;
   })
   .join("\n")}
 </tbody>
</table>`;
writeFileSync(join(OUT_DIR, "server-libs-diff.html"), html);

// --- stdout summary ----------------------------------------------------------
console.log(md);
if (UPDATE) {
  const next = { ...baseline, server: { ...baseline.server } };
  const byPath = { ...(baseline.server?.byPath ?? {}) };
  // Remove old _libs entries, re-add current ones.
  for (const k of Object.keys(byPath)) if (k.includes("/_libs/")) delete byPath[k];
  for (const f of currentFiles) {
    byPath[`.output/server/${f.key}`] = {
      path: `.output/server/${f.key}`,
      size: f.size,
      modules: null,
    };
  }
  next.server.byPath = byPath;
  next.server.total = Object.values(byPath).reduce((s, v) => s + v.size, 0);
  next.capturedAt = new Date().toISOString();
  writeFileSync(BASELINE, JSON.stringify(next, null, 2));
  console.error(`[server-libs-diff] baseline server slice updated.`);
}

if (regressions.length) {
  console.error(
    `\n[server-libs-diff] ${regressions.length} regression(s) detected in non-focus chunks.`,
  );
  process.exit(1);
}
process.exit(0);
