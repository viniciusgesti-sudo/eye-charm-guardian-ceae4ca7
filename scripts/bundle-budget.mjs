#!/usr/bin/env node
/**
 * Bundle size budget check.
 *
 * Runs after `vite build` and fails (exit 1) when any budget is exceeded.
 * Budgets are expressed in KB (1 KB = 1024 bytes) and cover the shipped
 * artifacts under `dist/client` (browser bundle) and `dist/server` (Worker
 * SSR bundle). Images / fonts / other static assets are excluded — this
 * budget guards JavaScript and CSS payloads only.
 *
 * Override any budget via env var, e.g.
 *   BUDGET_CLIENT_TOTAL_KB=1600 bun run build
 */
import { readdirSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const KB = 1024;
const num = (v, d) => (v != null && !Number.isNaN(Number(v)) ? Number(v) : d);

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

function collect(dir, exts) {
  return walk(dir)
    .filter((f) => exts.includes(extname(f)))
    .map((f) => ({ path: f, size: statSync(f).size }))
    .sort((a, b) => b.size - a.size);
}

const violations = [];
const summary = [];

// --- Client --------------------------------------------------------------
const clientFiles = collect(CLIENT_DIR, [".js", ".css"]);
const clientTotal = clientFiles.reduce((s, f) => s + f.size, 0);

for (const f of clientFiles) {
  const ext = extname(f.path);
  const limitKb = ext === ".css" ? BUDGETS.client.fileCss : BUDGETS.client.fileJs;
  if (f.size > limitKb * KB) {
    violations.push(
      `client file ${rel(f.path)} = ${fmt(f.size)} exceeds ${limitKb} KB`,
    );
  }
}
if (clientTotal > BUDGETS.client.total * KB) {
  violations.push(
    `client total = ${fmt(clientTotal)} exceeds ${BUDGETS.client.total} KB`,
  );
}
summary.push(
  `client: ${clientFiles.length} files, total ${fmt(clientTotal)} / ${BUDGETS.client.total} KB`,
);

// --- Server --------------------------------------------------------------
const serverFiles = collect(SERVER_DIR, [".mjs", ".js"]);
const serverTotal = serverFiles.reduce((s, f) => s + f.size, 0);

for (const f of serverFiles) {
  if (f.size > BUDGETS.server.file * KB) {
    violations.push(
      `server file ${rel(f.path)} = ${fmt(f.size)} exceeds ${BUDGETS.server.file} KB`,
    );
  }
}
if (serverTotal > BUDGETS.server.total * KB) {
  violations.push(
    `server total = ${fmt(serverTotal)} exceeds ${BUDGETS.server.total} KB`,
  );
}
summary.push(
  `server: ${serverFiles.length} files, total ${fmt(serverTotal)} / ${BUDGETS.server.total} KB`,
);

// --- Report --------------------------------------------------------------
console.log("\n[bundle-budget]");
for (const line of summary) console.log("  " + line);

console.log("\n  top 5 client:");
for (const f of clientFiles.slice(0, 5))
  console.log(`    ${fmt(f.size).padStart(10)}  ${rel(f.path)}`);
console.log("  top 5 server:");
for (const f of serverFiles.slice(0, 5))
  console.log(`    ${fmt(f.size).padStart(10)}  ${rel(f.path)}`);

if (violations.length) {
  console.error("\n[bundle-budget] BUDGET EXCEEDED:");
  for (const v of violations) console.error("  ✗ " + v);
  console.error(
    "\nRaise the limit via BUDGET_* env vars only after confirming the growth is justified.",
  );
  process.exit(1);
}

console.log("\n[bundle-budget] ✓ all budgets within limits\n");
