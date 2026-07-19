/**
 * SEO helper — canonical, hreflang, og:url builders.
 *
 * Every shareable route calls one of these to guarantee that
 * `canonical`, `og:url`, `twitter:*` and (for localized routes)
 * `hreflang alternate` links stay consistent site-wide.
 */

export const SITE = "https://eye-charm-guardian.lovable.app";
export const LOCALES = ["br", "en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "br";

type Meta = { title?: string; name?: string; property?: string; content?: string };
type Link = { rel: string; href: string; hrefLang?: string };

export interface SeoInput {
  title: string;
  description: string;
  /** Absolute or root-relative path (e.g. "/about"). */
  path: string;
  /** Absolute URL for og:image (optional but recommended for share-worthy pages). */
  image?: string;
  ogType?: "website" | "article" | "product";
  locale?: Locale;
  /** For localized routes: base path without the locale prefix (e.g. "/women" or ""). */
  localizedBasePath?: string;
  robots?: string;
}

export interface SeoOutput {
  meta: Meta[];
  links: Link[];
}

/**
 * Build a complete meta+links block for a page. Canonical always
 * self-references the current URL — never the homepage.
 */
export function buildSeo(input: SeoInput): SeoOutput {
  const url = `${SITE}${input.path}`;
  const ogType = input.ogType ?? "website";

  const meta: Meta[] = [
    { title: input.title },
    { name: "description", content: input.description },
    { property: "og:title", content: input.title },
    { property: "og:description", content: input.description },
    { property: "og:type", content: ogType },
    { property: "og:url", content: url },
    { property: "og:site_name", content: "Eyegis" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: input.title },
    { name: "twitter:description", content: input.description },
  ];

  if (input.locale) {
    meta.push({ property: "og:locale", content: localeToOg(input.locale) });
  }
  if (input.image) {
    meta.push({ property: "og:image", content: input.image });
    meta.push({ name: "twitter:image", content: input.image });
  }
  if (input.robots) {
    meta.push({ name: "robots", content: input.robots });
  }

  const links: Link[] = [{ rel: "canonical", href: url }];

  if (input.localizedBasePath !== undefined) {
    for (const alt of LOCALES) {
      links.push({
        rel: "alternate",
        hrefLang: alt,
        href: `${SITE}/${alt}${input.localizedBasePath}`,
      });
    }
    links.push({
      rel: "alternate",
      hrefLang: "x-default",
      href: `${SITE}/${DEFAULT_LOCALE}${input.localizedBasePath}`,
    });
  }

  return { meta, links };
}

function localeToOg(l: Locale): string {
  switch (l) {
    case "br": return "pt_BR";
    case "en": return "en_US";
    case "fr": return "fr_FR";
  }
}
