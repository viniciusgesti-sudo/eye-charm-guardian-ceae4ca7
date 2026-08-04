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
const ROUTES = [...NON_LOCALIZED, ...LOCALES.flatMap((l) => LOCALIZED.map((p) => `/${l}${p}`))];

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

const PRODUCTION_ORIGIN = "https://eyegis-eyewear.com";
const HTML_LANG = { br: "pt-BR", en: "en", fr: "fr" };
const HREFLANG = { br: "pt-BR", en: "en", fr: "fr" };
const LOCALIZED_H1 = {
  br: {
    "": "Eyegis, engenharia para a visão e design para o estilo.",
    "/men": "Coleção Masculina para quem vive em telas.",
    "/women": "Coleção Feminina para quem cria e escreve.",
    "/kids": "Proteção para a geração das telas.",
    "/technology": "Duas lentes. Duas horas do dia.",
    "/about": "Nossa História",
  },
  en: {
    "": "Eyegis, engineered for vision and designed for style.",
    "/men": "Men's Collection for the screen-bound day.",
    "/women": "Women's Collection for those who create.",
    "/kids": "Protection for the screen generation.",
    "/technology": "Two lenses. Two hours of the day.",
    "/about": "Our Story",
  },
  fr: {
    "": "Eyegis, l'ingénierie de la vision et le design du style.",
    "/men": "Collection Homme pour la journée sur écran.",
    "/women": "Collection Femme pour celles qui créent.",
    "/kids": "Protection pour la génération écran.",
    "/technology": "Deux verres. Deux heures du jour.",
    "/about": "Notre Histoire",
  },
};

// Stricter contract for /about — the page is the most link-shared entry point
// after the home hero, so a regression here (missing nav item, mistranslated
// label, broken href) is the fastest way to notice a visual/nav regression.
// We assert BOTH the exact href AND the exact translated label per locale.
// Labels come from src/i18n/translations.ts (header) and
// src/components/eyegis/Footer.tsx (footer). Update alongside those files.
const ABOUT_CONTRACT = {
  br: {
    header: [
      { label: "Homem", href: "/br/men" },
      { label: "Mulher", href: "/br/women" },
      { label: "Kids & Teens", href: "/br/kids" },
      { label: "Escolha suas lentes", href: "/br/lenses" },
      { label: "Nossa Tecnologia", href: "/br/technology" },
      { label: "Sobre a Eyegis", href: "/br/about" },
    ],
    footer: [
      { label: "Termos de Uso", href: "/br/legal" },
      { label: "Política de Privacidade", href: "/br/privacy" },
      { label: "Declaração de Conformidade", href: "/br/compliance" },
    ],
  },
  en: {
    header: [
      { label: "Men", href: "/en/men" },
      { label: "Women", href: "/en/women" },
      { label: "Kids & Teens", href: "/en/kids" },
      { label: "Choose your lenses", href: "/en/lenses" },
      { label: "Our Technology", href: "/en/technology" },
      { label: "About Eyegis", href: "/en/about" },
    ],
    footer: [
      { label: "Website Terms of Use", href: "/en/legal" },
      { label: "Privacy Policy", href: "/en/privacy" },
      { label: "Declaration of Compliance", href: "/en/compliance" },
    ],
  },
  fr: {
    header: [
      { label: "Homme", href: "/fr/men" },
      { label: "Femme", href: "/fr/women" },
      { label: "Enfants & Ados", href: "/fr/kids" },
      { label: "Choisir ses verres", href: "/fr/lenses" },
      { label: "Notre Technologie", href: "/fr/technology" },
      { label: "À propos d'Eyegis", href: "/fr/about" },
    ],
    footer: [
      { label: "Mentions légales", href: "/fr/legal" },
      { label: "Politique de confidentialité", href: "/fr/privacy" },
      { label: "Déclaration de conformité", href: "/fr/compliance" },
    ],
  },
};

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

// Extract every <a href="…">…</a> pair as { href, label } after stripping
// nested tags and decoding basic HTML entities. Case-insensitive, tolerant
// of attribute order (href may appear before or after other attributes).
function extractAnchors(html) {
  const out = [];
  const re = /<a\b([^>]*?)>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    const attrs = m[1];
    const hrefMatch = attrs.match(/\shref="([^"]*)"/i) ?? attrs.match(/^href="([^"]*)"/i);
    if (!hrefMatch) continue;
    const label = decodeEntities(m[2].replace(/<[^>]+>/g, " "))
      .replace(/\s+/g, " ")
      .trim();
    out.push({ href: hrefMatch[1], label });
  }
  return out;
}

function checkAboutContract(html, locale) {
  const problems = [];
  const contract = ABOUT_CONTRACT[locale];
  if (!contract) return problems;
  const anchors = extractAnchors(html);
  for (const expected of [...contract.header, ...contract.footer]) {
    const hit = anchors.find((a) => a.href === expected.href && a.label === expected.label);
    if (hit) continue;
    // Distinguish "href missing" from "href present but label drifted".
    const hrefHit = anchors.find((a) => a.href === expected.href);
    if (!hrefHit) {
      problems.push(`about: missing link href="${expected.href}" (label "${expected.label}")`);
    } else {
      problems.push(
        `about: label drift for href="${expected.href}" — expected "${expected.label}", got "${hrefHit.label}"`,
      );
    }
  }
  return problems;
}

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
    const text = decodeEntities(m[1].replace(/<[^>]+>/g, " "))
      .replace(/\s+/g, " ")
      .trim();
    if (text) out.push(text);
  }
  return out;
}

function extractAttribute(tag, attribute) {
  const match = tag.match(new RegExp(`\\s${attribute}="([^"]*)"`, "i"));
  return match?.[1] ?? null;
}

function extractLinksByRel(html, rel) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  return tags.filter((tag) => extractAttribute(tag, "rel") === rel);
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
    const [, locale, localizedPath = ""] = finalUrl.match(/^\/(br|en|fr)(\/.*)?$/) ?? [];
    const htmlLang = html.match(/<html\b[^>]*\slang="([^"]+)"/i)?.[1] ?? null;
    if (htmlLang !== HTML_LANG[locale]) {
      problems.push(`html lang mismatch: expected "${HTML_LANG[locale]}", got "${htmlLang}"`);
    }

    const canonicalTags = extractLinksByRel(html, "canonical");
    const canonical =
      canonicalTags.length === 1 ? extractAttribute(canonicalTags[0], "href") : null;
    const expectedCanonical = `${PRODUCTION_ORIGIN}${finalUrl}`;
    if (canonical !== expectedCanonical) {
      problems.push(`canonical mismatch: expected "${expectedCanonical}", got "${canonical}"`);
    }

    const alternates = new Map(
      extractLinksByRel(html, "alternate").map((tag) => [
        extractAttribute(tag, "hrefLang"),
        extractAttribute(tag, "href"),
      ]),
    );
    for (const alt of LOCALES) {
      const expected = `${PRODUCTION_ORIGIN}/${alt}${localizedPath}`;
      if (alternates.get(HREFLANG[alt]) !== expected) {
        problems.push(`hreflang ${HREFLANG[alt]} mismatch`);
      }
    }
    if (alternates.get("x-default") !== `${PRODUCTION_ORIGIN}/br${localizedPath}`) {
      problems.push("hreflang x-default mismatch");
    }

    const expectedH1 = LOCALIZED_H1[locale]?.[localizedPath];
    if (expectedH1 && h1s[0] !== expectedH1) {
      problems.push(`localized h1 mismatch: expected "${expectedH1}", got "${h1s[0]}"`);
    }

    for (const link of HEADER_LINKS) {
      if (!link.re.test(html)) problems.push(`header link missing: ${link.name}`);
    }
    for (const link of FOOTER_LINKS) {
      if (!link.re.test(html)) problems.push(`footer link missing: ${link.name}`);
    }
  }

  if (html.includes("eye-charm-guardian.lovable.app")) {
    problems.push("legacy Lovable domain leaked into rendered HTML");
  }

  // Stricter per-locale contract for /about (label + href pairs).
  const aboutMatch = finalUrl.match(/^\/(br|en|fr)\/about\/?$/);
  if (aboutMatch) {
    problems.push(...checkAboutContract(html, aboutMatch[1]));
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
