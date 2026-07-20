#!/usr/bin/env node
/**
 * HMR smoke test for the About page.
 *
 * 1. Snapshots src/routes/about.tsx and src/components/eyegis/AboutPage.tsx
 *    (the non-localized /about route file and the shared component used by
 *    /$locale/about).
 * 2. Injects a unique data-hmr-marker attribute on the first <h1 in each file.
 * 3. Flushes the sandbox HMR gate (POST /__hmr_flush) and waits briefly.
 * 4. Fetches /about, /br/about, /en/about, /fr/about and asserts:
 *      - HTTP < 400
 *      - <title> present and non-fallback
 *      - <h1> present
 *      - the injected marker appears in the rendered HTML
 * 5. Restores the original files (always, even on failure), re-flushes, and
 *    verifies the marker is gone and pages still render.
 *
 * Usage:  node scripts/hmr-about.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import { setTimeout as sleep } from "node:timers/promises";

const BASE = process.env.PREVIEW_BASE ?? "http://localhost:8080";
// AboutPage.tsx is the shared component lazy-loaded by both /about and
// /$locale/about routes — patching it exercises HMR for every locale.
const FILES = ["src/components/eyegis/AboutPage.tsx"];
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
  // Give the dev server a beat to re-transform SSR modules.
  await sleep(400);
}

async function checkRoute(path, { expectMarker }) {
  const res = await fetch(`${BASE}${path}`, { redirect: "follow" });
  const html = await res.text();
  const errs = [];
  if (res.status >= 400) errs.push(`HTTP ${res.status}`);
  const title = extractTitle(html);
  if (!title || BAD_TITLES.has(title)) errs.push(`bad title: ${JSON.stringify(title)}`);
  if (!hasH1(html)) errs.push("no <h1>");
  const seen = html.includes(MARKER);
  if (expectMarker && !seen) errs.push(`marker "${MARKER}" not in HTML`);
  if (!expectMarker && seen) errs.push("marker still present after restore");
  return { path, errs, title };
}

// Snapshot originals up front so restore is always possible.
const originals = new Map();
for (const f of FILES) originals.set(f, await readFile(f, "utf8"));

const H1_RE = /<h1\b/;
for (const [f, src] of originals) {
  if (!H1_RE.test(src)) {
    console.error(`✗ could not find <h1 in ${f}`);
    process.exit(2);
  }
}

let failed = 0;
try {
  console.log(`→ patching ${FILES.length} file(s) with marker=${MARKER}`);
  for (const [f, src] of originals) {
    await writeFile(f, src.replace(H1_RE, `<h1 data-hmr-marker="${MARKER}"`));
  }
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
  console.log(`→ restoring ${FILES.length} file(s)`);
  for (const [f, src] of originals) await writeFile(f, src);
  try { await flush(); } catch (e) { console.error(`! restore flush failed: ${e.message}`); }
}

console.log("→ verifying rollback");
for (const path of ROUTES) {
  const { errs, title } = await checkRoute(path, { expectMarker: false });
  if (errs.length) {
    failed++;
    console.log(`✗ ${path} (post-restore)\n  ${errs.join("\n  ")}`);
  } else {
    console.log(`✓ ${path} (post-restore)  title="${title}"`);
  }
}

console.log(`\n${failed === 0 ? "PASS" : "FAIL"} — ${failed} error(s)`);
process.exit(failed ? 1 : 0);
