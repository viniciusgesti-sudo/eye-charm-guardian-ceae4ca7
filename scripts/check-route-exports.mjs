#!/usr/bin/env node
/**
 * Guard: TanStack route files must only export `Route` (and type-only exports).
 *
 * The TanStack Router code-splitter transforms route files and removes the
 * `component` / `errorComponent` / `pendingComponent` / `notFoundComponent`
 * functions into separate chunks. Any additional `export` from a route file
 * defeats splitting or, worse, crashes at module load with
 * "ReferenceError: <name> is not defined" (which then 500s every route,
 * because src/routeTree.gen.ts imports every route file).
 *
 * Rules enforced across src/routes/**\/*.tsx (except routeTree.gen.ts):
 *   ✓ `export const Route = createFileRoute(...)`
 *   ✓ `export type ...` / `export interface ...` (type-only, erased)
 *   ✗ everything else: `export function`, `export default`, `export const X`,
 *     `export { X }`, `export * from`, etc.
 *
 * Exit 1 on any violation so CI blocks the merge.
 *
 * Usage:  node scripts/check-route-exports.mjs
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = "src/routes";
const IGNORE = new Set(["routeTree.gen.ts"]);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (IGNORE.has(entry.name)) continue;
    if (entry.isDirectory()) yield* walk(p);
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) yield p;
  }
}

// Strip line & block comments so `// export ...` in a comment is ignored.
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

const violations = [];

for await (const file of walk(ROOT)) {
  const raw = await readFile(file, "utf8");
  const src = stripComments(raw);
  const lines = src.split("\n");

  lines.forEach((line, i) => {
    const m = line.match(/^\s*export\b(.*)/);
    if (!m) return;
    const rest = m[1].trim();

    // Allowed: `export const Route = ...`
    if (/^const\s+Route\b/.test(rest)) return;
    // Allowed: type-only exports (erased at build time)
    if (/^(type|interface)\b/.test(rest)) return;

    violations.push({
      file,
      line: i + 1,
      text: line.trim(),
    });
  });
}

if (violations.length === 0) {
  console.log("✓ route-export guard: 0 violations");
  process.exit(0);
}

console.error(`✗ route-export guard: ${violations.length} violation(s)\n`);
console.error(
  "TanStack route files must only export `Route` (or type-only exports).",
);
console.error(
  "Extra exports defeat autoCodeSplitting and can throw ReferenceError\n" +
    "at module load (which then 500s every route via routeTree.gen.ts).\n",
);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}`);
  console.error(`    ${v.text}`);
}
console.error(
  "\nFix: move the exported symbol into src/components/ or src/lib/ and\n" +
    "import it from the route file. Keep the route file's only export as\n" +
    "`export const Route = createFileRoute(...)`.",
);
process.exit(1);
