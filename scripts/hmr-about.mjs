#!/usr/bin/env node
/**
 * HMR smoke test for the About page.
 *
 * 1. Snapshots src/routes/about.tsx.
 * 2. Injects a unique data-hmr-marker attribute on the <h1>.
 * 3. Flushes the sandbox HMR gate (POST /__hmr_flush).
 * 4. Fetches /about, /br/about, /en/about, /fr/about and asserts:
 *      - HTTP < 400
 *      - <title> present and non-fallback
 *      - <h1> present
 *      - the injected marker appears in the rendered HTML
 * 5. Restores the original file (always, even on failure) and re-flushes.
 *
 * Usage:  node scripts/hmr-about.mjs
 */
import { readFile, writeFile } from "node:fs/promises";

const BASE = process.env.PREVIEW_BASE ?? "http://localhost:8080";
const FILE = "src/routes/about.tsx";
const ROUTES = ["/about", "/br/about", "/en/about", "/fr/about"];
const BAD_TITLES = new Set(["Lovable App", "Lovable Generated Project", ""]);
const MARKER = `hmr-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const extractTitle = (h) => {
  const m = h.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].replace(/\s+/g, " ").trim() : null;
};
const hasH1 = (h) => /<h1\b[^>]*>[\s\S]*?<\/h1>/i.test(h);

async function flush() {
  const res = await fetch(`${BASE}/__hmr_flush`, { method: "POST" });
  if (!res.ok) throw new Error(`HMR flush failed: HTTP ${res.status}`);
}

async function checkRoute(path, { expectMarker }) {
  const res = await fetch(`${BASE}${path}`, { redirect: "follow" });
  const html = await res.text();
  const errs = [];
  if (res.status >= 400) errs.push(`HTTP ${res.status}`);
  const title = extractTitle(html);
  if (!title || BAD_TITLES.has(title)) errs.push(`bad title: ${JSON.stringify(title)}`);
  if (!hasH1(html)) errs.push("no <h1>");
  if (expectMarker && !html.includes(MARKER)) errs.push(`marker "${MARKER}" not in HTML`);
  return { path, errs, title };
}

const original = await readFile(FILE, "utf8");
const H1_RE = /<h1\b/;
if (!H1_RE.test(original)) {
  console.error(`✗ could not find <h1 in ${FILE}`);
  process.exit(2);
}
const patched = original.replace(H1_RE, `<h1 data-hmr-marker="${MARKER}"`);

let failed = 0;
try {
  console.log(`→ patching ${FILE} with marker=${MARKER}`);
  await writeFile(FILE, patched);
  await flush();

  for (const path of ROUTES) {
    const { errs, title } = await checkRoute(path, { expectMarker: true });
    if (errs.length) {
      failed++;
      console.log(`✗ ${path}\n  ${errs.join("\n  ")}`);
    } else {
      console.log(`✓ ${path}  title="${title}"  marker=ok`);
    }
  }
} catch (e) {
  failed++;
  console.error(`✗ error during patched run: ${e.message}`);
} finally {
  console.log(`→ restoring ${FILE}`);
  await writeFile(FILE, original);
  try { await flush(); } catch (e) { console.error(`! restore flush failed: ${e.message}`); }
}

// Post-restore sanity check: marker must be gone, pages must still render.
console.log("→ verifying rollback");
for (const path of ROUTES) {
  const { errs, title } = await checkRoute(path, { expectMarker: false });
  const html = await (await fetch(`${BASE}${path}`, { redirect: "follow" })).text();
  const stillHasMarker = html.includes(MARKER);
  if (stillHasMarker) errs.push("marker still present after restore");
  if (errs.length) {
    failed++;
    console.log(`✗ ${path} (post-restore)\n  ${errs.join("\n  ")}`);
  } else {
    console.log(`✓ ${path} (post-restore)  title="${title}"`);
  }
}

console.log(`\n${failed === 0 ? "PASS" : "FAIL"} — ${failed} error(s)`);
process.exit(failed ? 1 : 0);
