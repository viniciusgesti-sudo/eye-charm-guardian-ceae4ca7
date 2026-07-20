#!/usr/bin/env node
// Server bundle profiler — ranks the largest server chunks and emits
// automatic reduction suggestions based on shape/heuristics.
//
// Reads dist/server/**, groups by _ssr / _libs / routes / other, prints a
// ranked table, writes JSON + HTML reports to dist/reports/server-profile.*
// and dist/reports/server-profile.md. Never fails the build — pure advice.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SERVER_DIR = path.join(ROOT, "dist", "server");
const OUT_DIR = path.join(ROOT, "dist", "reports");

if (!fs.existsSync(SERVER_DIR)) {
  console.error("[server-profiler] dist/server not found — run the build first.");
  process.exit(0);
}

const TOP_N = Number(process.env.PROFILE_TOP ?? 15);
const SUGGEST_MIN_KB = Number(process.env.PROFILE_SUGGEST_KB ?? 25);

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (name.endsWith(".mjs") || name.endsWith(".js"))
      acc.push({ path: p, size: st.size });
  }
  return acc;
}

function classify(rel) {
  if (rel.startsWith("_ssr/")) return "ssr-component";
  if (rel.startsWith("_libs/")) return "vendor";
  if (rel.startsWith("_server-fns/")) return "server-fn";
  if (rel.startsWith("chunks/")) return "chunk";
  if (rel.startsWith("assets/")) return "asset";
  if (rel.endsWith(".mjs") && !rel.includes("/")) return "entry";
  return "route";
}

function suggestionsFor(entry, source) {
  const s = [];
  const rel = entry.rel;
  const kb = entry.kb;
  const src = source ?? "";

  if (entry.kind === "vendor" && kb >= SUGGEST_MIN_KB) {
    const name = path.basename(rel, ".mjs");
    if (/zod/i.test(name))
      s.push("Vendor zod is imported on the server. Consider replacing schemas with hand-rolled guards on hot SSR paths, or lazy-import zod inside the handler that needs it.");
    else if (/tanstack__react-query|query-core/i.test(name))
      s.push("react-query pulled server-side. Ensure QueryClient is instantiated per request and no client-only devtools are imported at module scope.");
    else if (/tanstack/i.test(name))
      s.push("TanStack vendor chunk. Audit for accidental imports of `@tanstack/react-router-devtools` or `Link` in server-only utils.");
    else if (/lucide-react/i.test(name))
      s.push("lucide-react ships every icon it sees imported. Prefer `import { Foo } from 'lucide-react'` (already tree-shakeable) and remove unused icons from shared components.");
    else if (/radix-ui/i.test(name))
      s.push("Radix primitives are heavy in SSR. Move purely interactive widgets behind `<ClientOnly>` / dynamic import so they leave the server graph.");
    else if (/unenv|h3|srvx|hookable/i.test(name))
      s.push("Runtime shim — usually unavoidable, but confirm no Node-only polyfills are pulled through custom server helpers.");
    else
      s.push("Large vendor chunk. Confirm it is used by SSR; if only client code needs it, move imports behind dynamic() to keep it out of `_libs/`.");
  }

  if (entry.kind === "ssr-component" && kb >= SUGGEST_MIN_KB) {
    if (src) {
      const lines = src.split("\n").length;
      const strings = (src.match(/"[^"\n]{40,}"/g) ?? []).length;
      const svgs = (src.match(/<svg/gi) ?? []).length;
      if (svgs >= 3)
        s.push(`Contains ${svgs} inline <svg>. Extract to shared .svg?react imports or a single icon module so SSR emits them once.`);
      if (strings >= 40)
        s.push(`~${strings} long literal strings — likely marketing copy. Externalize copy into a JSON or .ts locale module shared across locales to dedupe.`);
      if (lines > 400)
        s.push(`Component is ${lines} lines. Split subsections into sibling files so route bundles only pull what they render.`);
      if (/from ["']lucide-react["']/.test(src)) {
        const iconCount = (src.match(/from ["']lucide-react["']/g) ?? []).length;
        if (iconCount > 4)
          s.push("Multiple lucide-react imports in one file — consolidate at the top and drop unused ones.");
      }
    }
    if (s.length === 0)
      s.push("Large SSR component. Consider moving below-the-fold blocks behind `React.lazy` + `<Suspense>` to shrink the server chunk.");
  }

  if (entry.kind === "route" && kb >= SUGGEST_MIN_KB)
    s.push("Route chunk carries too much inline JSX. Extract page body into a component under `src/components/**` and `React.lazy` it from the route.");

  return s;
}

function tryFindSource(rel) {
  // rel like _ssr/HonestScience-hash.mjs → src/components/**/HonestScience.tsx
  const base = path.basename(rel).replace(/-[A-Za-z0-9_-]{6,10}\.m?js$/, "");
  const guesses = [
    `src/components/eyegis/${base}.tsx`,
    `src/components/${base}.tsx`,
    `src/routes/${base}.tsx`,
    `src/lib/${base}.ts`,
    `src/lib/${base}.tsx`,
  ];
  for (const g of guesses) {
    const abs = path.join(ROOT, g);
    if (fs.existsSync(abs)) return { file: g, source: fs.readFileSync(abs, "utf8") };
  }
  return { file: null, source: null };
}

const files = walk(SERVER_DIR).map((f) => {
  const rel = path.relative(SERVER_DIR, f.path).replace(/\\/g, "/");
  const kind = classify(rel);
  return { rel, kind, bytes: f.size, kb: +(f.size / 1024).toFixed(2) };
});

files.sort((a, b) => b.bytes - a.bytes);

const total = files.reduce((n, f) => n + f.bytes, 0);
const byKind = {};
for (const f of files) {
  byKind[f.kind] ??= { count: 0, bytes: 0 };
  byKind[f.kind].count++;
  byKind[f.kind].bytes += f.bytes;
}

const top = files.slice(0, TOP_N).map((entry) => {
  const { file, source } = tryFindSource(entry.rel);
  return {
    ...entry,
    sourceFile: file,
    pctOfTotal: +((entry.bytes / total) * 100).toFixed(1),
    suggestions: suggestionsFor(entry, source),
  };
});

// --- Print ---
const fmtKB = (b) => `${(b / 1024).toFixed(1)} KB`;
console.log("\n[server-profiler] dist/server profile");
console.log(`  total: ${fmtKB(total)}  (${files.length} files)`);
console.log("  by kind:");
for (const [k, v] of Object.entries(byKind).sort((a, b) => b[1].bytes - a[1].bytes)) {
  const pct = ((v.bytes / total) * 100).toFixed(1);
  console.log(`    ${k.padEnd(16)} ${fmtKB(v.bytes).padStart(10)}  ${pct.padStart(5)}%   (${v.count})`);
}

console.log(`\n  top ${TOP_N} chunks:`);
for (const e of top) {
  console.log(`    ${fmtKB(e.bytes).padStart(10)}  ${String(e.pctOfTotal).padStart(4)}%  ${e.rel}`);
  if (e.sourceFile) console.log(`      ↳ source: ${e.sourceFile}`);
  for (const s of e.suggestions) console.log(`      • ${s}`);
}

// --- Reports ---
fs.mkdirSync(OUT_DIR, { recursive: true });
const json = {
  generatedAt: new Date().toISOString(),
  totalBytes: total,
  fileCount: files.length,
  byKind,
  top,
  all: files,
};
fs.writeFileSync(path.join(OUT_DIR, "server-profile.json"), JSON.stringify(json, null, 2));

const md = [
  `# Server bundle profile`,
  ``,
  `Generated ${json.generatedAt}`,
  ``,
  `**Total:** ${fmtKB(total)} across ${files.length} files.`,
  ``,
  `## By kind`,
  ``,
  `| Kind | Size | Share | Files |`,
  `| --- | ---: | ---: | ---: |`,
  ...Object.entries(byKind)
    .sort((a, b) => b[1].bytes - a[1].bytes)
    .map(([k, v]) =>
      `| ${k} | ${fmtKB(v.bytes)} | ${((v.bytes / total) * 100).toFixed(1)}% | ${v.count} |`,
    ),
  ``,
  `## Top ${TOP_N} chunks & next targets`,
  ``,
  ...top.flatMap((e) => [
    `### ${e.rel} — ${fmtKB(e.bytes)} (${e.pctOfTotal}%)`,
    e.sourceFile ? `- source: \`${e.sourceFile}\`` : `- source: _unresolved_`,
    ...(e.suggestions.length ? e.suggestions.map((s) => `- ${s}`) : [`- No specific suggestion — inspect manually.`]),
    ``,
  ]),
].join("\n");
fs.writeFileSync(path.join(OUT_DIR, "server-profile.md"), md);

const html = `<!doctype html><meta charset="utf-8"><title>Server bundle profile</title>
<style>body{font:14px/1.5 ui-sans-serif,system-ui;margin:2rem auto;max-width:960px;color:#1D252D}
h1,h2,h3{font-family:Montserrat,ui-sans-serif}code{background:#F1EDE7;padding:2px 6px;border-radius:4px}
table{border-collapse:collapse;width:100%;margin:1rem 0}td,th{border-bottom:1px solid #ddd;padding:6px 10px;text-align:left}
.kb{text-align:right;font-variant-numeric:tabular-nums}li{margin:.25rem 0}.chunk{border-left:3px solid #004B57;padding:8px 14px;margin:12px 0;background:#F9F9F9}
.pct{color:#7A6238;font-weight:600}</style>
<h1>Server bundle profile</h1>
<p><small>${json.generatedAt}</small></p>
<p><b>Total:</b> ${fmtKB(total)} · ${files.length} files</p>
<h2>By kind</h2><table><tr><th>Kind</th><th class=kb>Size</th><th class=kb>Share</th><th class=kb>Files</th></tr>
${Object.entries(byKind).sort((a,b)=>b[1].bytes-a[1].bytes).map(([k,v])=>`<tr><td>${k}</td><td class=kb>${fmtKB(v.bytes)}</td><td class=kb>${((v.bytes/total)*100).toFixed(1)}%</td><td class=kb>${v.count}</td></tr>`).join("")}
</table>
<h2>Top ${TOP_N} chunks &amp; next targets</h2>
${top.map(e=>`<div class=chunk><h3>${e.rel} <span class=pct>${fmtKB(e.bytes)} · ${e.pctOfTotal}%</span></h3>
${e.sourceFile?`<p>source: <code>${e.sourceFile}</code></p>`:`<p><i>source unresolved</i></p>`}
<ul>${(e.suggestions.length?e.suggestions:["No specific suggestion — inspect manually."]).map(s=>`<li>${s}</li>`).join("")}</ul></div>`).join("")}
`;
fs.writeFileSync(path.join(OUT_DIR, "server-profile.html"), html);

console.log(`\n[server-profiler] reports:`);
console.log(`  · dist/reports/server-profile.json`);
console.log(`  · dist/reports/server-profile.md`);
console.log(`  · dist/reports/server-profile.html`);
