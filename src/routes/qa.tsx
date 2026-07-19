import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BeforeAfter } from "@/components/qa/BeforeAfter";

// Rotas renderizadas em iframes para validar breakpoints rapidamente
const responsiveRoutes: { path: string; label: string }[] = [
  { path: "/", label: "Home" },
  { path: "/en/women", label: "Women" },
  { path: "/en/men", label: "Men" },
  { path: "/en/kids", label: "Kids" },
  { path: "/en/technology", label: "Technology" },
  { path: "/product/meridian", label: "PDP — Meridian" },
  { path: "/product/solene", label: "PDP — Solène" },
  { path: "/product/atelier", label: "PDP — Atelier" },
  { path: "/product/marais", label: "PDP — Marais" },
];

const BREAKPOINTS = [
  { key: "mobile", label: "Mobile · 375", width: 375, height: 720 },
  { key: "tablet", label: "Tablet · 768", width: 768, height: 820 },
  { key: "desktop", label: "Desktop · 1280", width: 1280, height: 820 },
] as const;

import heroSPBefore from "@/assets/hero-saopaulo.jpg";
import heroSPAfter from "@/assets/hero-saopaulo-eyegis.jpg";
import heroParisBefore from "@/assets/hero-paris.jpg";
import heroParisAfter from "@/assets/hero-paris-eyegis.jpg";

import personaExecutive from "@/assets/persona-executive.jpg";
import personaCreative from "@/assets/persona-creative.jpg";
import personaGamer from "@/assets/persona-gamer.jpg";
import shippingUnboxing from "@/assets/shipping-unboxing.jpg";
import contactConcierge from "@/assets/contact-concierge.jpg";
import aboutFounders from "@/assets/about-founders.jpg";
import collectionMen from "@/assets/collection-men.jpg";
import collectionWomen from "@/assets/collection-women.jpg";
import collectionKidsHero from "@/assets/collection-hero-kids.jpg";

import meridianHero from "@/assets/products/meridian-hero.jpg";
import soleneFront from "@/assets/products/solene-front.jpg";
import atelierFront from "@/assets/products/atelier-front.jpg";
import maraisFront from "@/assets/products/marais-front.jpg";

export const Route = createFileRoute("/qa")({
  head: () => ({
    meta: [
      { title: "QA — Eyegis Visual Review" },
      { name: "description", content: "Comparações antes/depois e estado atual dos assets para validação visual rápida." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: QAPage,
});

const beforeAfterPairs = [
  {
    label: "Hero — São Paulo",
    alt: "Hero São Paulo",
    before: heroSPBefore,
    after: heroSPAfter,
  },
  {
    label: "Hero — Paris",
    alt: "Hero Paris",
    before: heroParisBefore,
    after: heroParisAfter,
  },
];

const currentAssets: { section: string; items: { src: string; label: string; sku?: string }[] }[] = [
  {
    section: "Produtos (SKUs)",
    items: [
      { src: meridianHero, label: "Meridian", sku: "MERIDIAN" },
      { src: soleneFront, label: "Solène", sku: "SOLENE" },
      { src: atelierFront, label: "Atelier", sku: "ATELIER" },
      { src: maraisFront, label: "Marais", sku: "MARAIS" },
    ],
  },
  {
    section: "Coleções",
    items: [
      { src: collectionMen, label: "Men — Meridian" },
      { src: collectionWomen, label: "Women — Solène" },
      { src: collectionKidsHero, label: "Kids & Teens" },
    ],
  },
  {
    section: "Personas & Editorial",
    items: [
      { src: personaExecutive, label: "Executive" },
      { src: personaCreative, label: "Creative" },
      { src: personaGamer, label: "Gamer — Marais" },
      { src: shippingUnboxing, label: "Unboxing" },
      { src: contactConcierge, label: "Concierge" },
      { src: aboutFounders, label: "Founders" },
    ],
  },
];

function QAPage() {
  return (
    <main className="min-h-screen bg-[color:var(--surface,#F9F9F9)] text-[color:var(--text,#1D252D)]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--primary)]">Internal / QA</p>
          <h1 className="mt-2 font-[Montserrat] text-3xl md:text-5xl font-light tracking-tight">
            Visual Review — Before vs After
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-black/70">
            Arraste o divisor para comparar assets antigos e novos. Abaixo, um grid do estado atual
            por SKU e seção para validação rápida.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-xs uppercase tracking-[0.2em] text-[color:var(--primary)] mb-6">
          Comparações interativas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {beforeAfterPairs.map((p) => (
            <BeforeAfter key={p.label} {...p} />
          ))}
        </div>
      </section>

      {currentAssets.map((group) => (
        <section key={group.section} className="mx-auto max-w-6xl px-6 pb-12">
          <h2 className="text-xs uppercase tracking-[0.2em] text-[color:var(--primary)] mb-6">
            {group.section}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {group.items.map((it) => (
              <figure key={it.label} className="overflow-hidden rounded-lg border border-black/10 bg-white">
                <img
                  src={it.src}
                  alt={it.label}
                  className="aspect-[3/4] w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="flex items-center justify-between px-3 py-2 text-xs">
                  <span className="font-medium">{it.label}</span>
                  {it.sku && (
                    <span className="rounded bg-black/5 px-2 py-0.5 text-[10px] uppercase tracking-widest text-black/60">
                      {it.sku}
                    </span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}

      <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-xs text-black/60">
          Página interna — não indexada. Rota: <code>/qa</code>
        </div>
      </footer>
    </main>
  );
}
