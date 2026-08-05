import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { SITE } from "@/lib/seo";

const BASE_URL = SITE;
const LOCALES = ["br", "en", "fr"] as const;
const HREFLANG = { br: "pt-BR", en: "en", fr: "fr" } as const;

// Locale-prefixed routes (translated pages)
const LOCALIZED_PATHS: { path: string; changefreq: string; priority: string }[] = [
  { path: "", changefreq: "weekly", priority: "1.0" },
  { path: "/women", changefreq: "weekly", priority: "0.9" },
  { path: "/men", changefreq: "weekly", priority: "0.9" },
  { path: "/kids", changefreq: "weekly", priority: "0.9" },
  { path: "/technology", changefreq: "monthly", priority: "0.8" },
  { path: "/lenses", changefreq: "monthly", priority: "0.7" },
  { path: "/about", changefreq: "monthly", priority: "0.6" },
  { path: "/warranty", changefreq: "monthly", priority: "0.5" },
  { path: "/shipping", changefreq: "monthly", priority: "0.5" },
  { path: "/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.4" },
  { path: "/legal", changefreq: "yearly", priority: "0.3" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/compliance", changefreq: "yearly", priority: "0.4" },
];

// Locale-agnostic support pages (single canonical URL for now)
const GLOBAL_PATHS: { path: string; changefreq: string; priority: string }[] = [
  { path: "/product/meridian", changefreq: "weekly", priority: "0.9" },
  { path: "/product/solene", changefreq: "weekly", priority: "0.9" },
  { path: "/product/marais", changefreq: "weekly", priority: "0.9" },
  { path: "/product/atelier", changefreq: "weekly", priority: "0.9" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls: string[] = [];

        for (const p of LOCALIZED_PATHS) {
          for (const l of LOCALES) {
            const loc = `${BASE_URL}/${l}${p.path}`;
            const alternates = LOCALES.map(
              (alt) =>
                `    <xhtml:link rel="alternate" hreflang="${HREFLANG[alt]}" href="${BASE_URL}/${alt}${p.path}" />`,
            ).join("\n");
            urls.push(
              [
                "  <url>",
                `    <loc>${loc}</loc>`,
                `    <changefreq>${p.changefreq}</changefreq>`,
                `    <priority>${p.priority}</priority>`,
                alternates,
                `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/br${p.path}" />`,
                "  </url>",
              ].join("\n"),
            );
          }
        }

        for (const p of GLOBAL_PATHS) {
          urls.push(
            [
              "  <url>",
              `    <loc>${BASE_URL}${p.path}</loc>`,
              `    <changefreq>${p.changefreq}</changefreq>`,
              `    <priority>${p.priority}</priority>`,
              "  </url>",
            ].join("\n"),
          );
        }

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
          ...urls,
          "</urlset>",
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
