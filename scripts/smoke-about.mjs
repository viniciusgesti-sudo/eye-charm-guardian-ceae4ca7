#!/usr/bin/env node
/**
 * About-only smoke test: /about and /{br,en,fr}/about.
 * Validates HTTP < 400, real <title>, and at least one <h1>.
 *
 * Usage:
 *   node scripts/smoke-about.mjs                  # against local preview
 *   PREVIEW_BASE=https://…lovable.app node scripts/smoke-about.mjs
 */
const BASE = process.env.PREVIEW_BASE ?? "http://localhost:8080";
const ROUTES = ["/about", "/br/about", "/en/about", "/fr/about"];
const BAD_TITLES = new Set(["Lovable App", "Lovable Generated Project", ""]);

const extractTitle = (h) => {
  const m = h.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].replace(/\s+/g, " ").trim() : null;
};
const extractH1 = (h) => {
  const m = h.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  return m ? m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : null;
};

let failed = 0;
for (const path of ROUTES) {
  const url = `${BASE}${path}`;
  const errs = [];
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (res.status >= 400) errs.push(`HTTP ${res.status}`);
    const html = await res.text();
    const title = extractTitle(html);
    if (!title || BAD_TITLES.has(title)) errs.push(`bad title: ${JSON.stringify(title)}`);
    const h1 = extractH1(html);
    if (!h1) errs.push("no <h1>");
    if (errs.length) {
      failed++;
      console.log(`✗ ${path}\n  ${errs.join("\n  ")}`);
    } else {
      console.log(`✓ ${path}  title="${title}"  h1="${h1}"`);
    }
  } catch (e) {
    failed++;
    console.log(`✗ ${path}\n  ${e.message}`);
  }
}
console.log(`\n${ROUTES.length - failed}/${ROUTES.length} passed`);
process.exit(failed ? 1 : 0);
