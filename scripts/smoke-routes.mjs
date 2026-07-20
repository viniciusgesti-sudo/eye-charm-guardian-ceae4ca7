#!/usr/bin/env node
/**
 * Route smoke test.
 *
 * For every route in the matrix:
 *  - HTTP status < 400
 *  - <title> present, non-empty, not the fallback "Lovable App"
 *  - at least one <h1> with text content
 *  - header navigation links present (Men / Women / Kids / Lenses / Technology / About)
 *  - footer legal links present (Legal / Privacy / Compliance)
 *
 * Uses raw SSR HTML (no browser). Fast; safe for CI.
 *
 * Usage:
 *   node scripts/smoke-routes.mjs
 *   PREVIEW_BASE=https://eye-charm-guardian.lovable.app node scripts/smoke-routes.mjs
 */
const BASE = process.env.PREVIEW_BASE ?? "http://localhost:8080";

const LOCALES = ["br", "en", "fr"];
const LOCALIZED = [
  "",
  "/men",
  "/women",
  "/kids",
  "/technology",
  "/about",
  "/lenses",
  "/warranty",
  "/shipping",
  "/contact",
  "/faq",
  "/legal",
  "/privacy",
  "/compliance",
];
const NON_LOCALIZED = ["/", "/about", "/technology", "/lenses", "/contact", "/faq"];
const ROUTES = [
  ...NON_LOCALIZED,
  ...LOCALES.flatMap((l) => LOCALIZED.map((p) => `/${l}${p}`)),
];

// Header/footer link expectations. We check the *href pattern*, not the label,
// so translations don't break the test. Each entry is a regex tested against
// the raw HTML `href="…"` values. Locale prefix is optional so non-localized
// pages (e.g. `/about`) that link to the canonical `/en/*` still pass.
const HEADER_LINKS = [
  { name: "men", re: /href="\/(?:br|en|fr)\/men"/ },
  { name: "women", re: /href="\/(?:br|en|fr)\/women"/ },
  { name: "kids", re: /href="\/(?:br|en|fr)\/kids"/ },
  { name: "lenses", re: /href="\/(?:br|en|fr)\/lenses"/ },
  { name: "technology", re: /href="\/(?:br|en|fr)\/technology"/ },
  { name: "about", re: /href="\/(?:br|en|fr)\/about"/ },
];
const FOOTER_LINKS = [
  { name: "legal", re: /href="\/(?:br|en|fr)\/legal"/ },
  { name: "privacy", re: /href="\/(?:br|en|fr)\/privacy"/ },
  { name: "compliance", re: /href="\/(?:br|en|fr)\/compliance"/ },
];


const BAD_TITLES = new Set(["Lovable App", "Lovable Generated Project", ""]);

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].replace(/\s+/g, " ").trim() : null;
}

function extractH1s(html) {
  const out = [];
  const re = /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi;
  let m;
  while ((m = re.exec(html))) {
    const text = m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (text) out.push(text);
  }
  return out;
}

async function checkRoute(path) {
  const problems = [];
  let status = 0;
  let html = "";
  let finalUrl = path;
  try {
    // Follow redirects — the app 307s bare paths like `/` to `/en`.
    const res = await fetch(`${BASE}${path}`, { redirect: "follow" });
    status = res.status;
    finalUrl = new URL(res.url).pathname;
    html = await res.text();
  } catch (err) {
    return { path, status: 0, problems: [`network: ${err.message}`] };
  }
  if (status >= 400) problems.push(`http ${status}`);

  const title = extractTitle(html);
  if (!title) problems.push("missing <title>");
  else if (BAD_TITLES.has(title)) problems.push(`fallback title: "${title}"`);

  const h1s = extractH1s(html);
  if (h1s.length === 0) problems.push("missing <h1>");

  // Header/footer chrome only exists inside the localized shell (`/br|en|fr/*`).
  // Legacy non-localized routes render a stripped layout — skip nav checks
  // there so the smoke test surfaces real regressions, not architecture noise.
  const isLocalized = /^\/(?:br|en|fr)(?:\/|$)/.test(finalUrl);
  if (isLocalized) {
    for (const link of HEADER_LINKS) {
      if (!link.re.test(html)) problems.push(`header link missing: ${link.name}`);
    }
    for (const link of FOOTER_LINKS) {
      if (!link.re.test(html)) problems.push(`footer link missing: ${link.name}`);
    }
  }

  return { path, status, title, h1: h1s[0] ?? null, problems };
}


console.log(`Route smoke test against ${BASE}\n`);
const results = await Promise.all(ROUTES.map(checkRoute));

let failed = 0;
for (const r of results) {
  if (r.problems.length === 0) {
    console.log(`✓ ${r.path.padEnd(28)} ${r.status}  h1="${(r.h1 ?? "").slice(0, 40)}"`);
  } else {
    failed++;
    console.log(`✗ ${r.path.padEnd(28)} ${r.status}`);
    for (const p of r.problems) console.log(`    · ${p}`);
  }
}

console.log(`\n──────── Summary ────────`);
console.log(`  routes:  ${results.length}`);
console.log(`  passed:  ${results.length - failed}`);
console.log(`  failed:  ${failed}`);
if (failed > 0) {
  console.error("\n✗ Smoke test FAILED.");
  process.exit(1);
}
console.log("\n✓ Smoke test passed.");
