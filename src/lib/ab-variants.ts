// A/B image variants for product experiments.
// Flip VITE_AB_VARIANT (or per-model override) to swap hero/card assets without
// touching component code. Add new SKUs by extending `variants`.

import meridianHeroA from "@/assets/products/meridian-hero-a.jpg";
import meridianHeroB from "@/assets/products/meridian-hero-b.jpg";
import meridianCardA from "@/assets/products/meridian-card-a.jpg";
import meridianCardB from "@/assets/products/meridian-card-b.jpg";
import soleneHeroA from "@/assets/products/solene-hero-a.jpg";
import soleneHeroB from "@/assets/products/solene-hero-b.jpg";
import soleneCardA from "@/assets/products/solene-card-a.jpg";
import soleneCardB from "@/assets/products/solene-card-b.jpg";

export type Variant = "a" | "b";
export type Slot = "hero" | "card";
export type Sku = "meridian" | "solene";

const variants: Record<Sku, Record<Slot, Record<Variant, string>>> = {
  meridian: {
    hero: { a: meridianHeroA, b: meridianHeroB },
    card: { a: meridianCardA, b: meridianCardB },
  },
  solene: {
    hero: { a: soleneHeroA, b: soleneHeroB },
    card: { a: soleneCardA, b: soleneCardB },
  },
};

function resolveVariant(sku: Sku): Variant {
  // Priority: URL ?ab=a|b  →  localStorage  →  env  →  "a"
  if (typeof window !== "undefined") {
    const url = new URLSearchParams(window.location.search);
    const q = url.get(`ab_${sku}`) ?? url.get("ab");
    if (q === "a" || q === "b") {
      try { window.localStorage.setItem(`ab_${sku}`, q); } catch { /* ignore */ }
      return q;
    }
    try {
      const stored = window.localStorage.getItem(`ab_${sku}`);
      if (stored === "a" || stored === "b") return stored;
    } catch { /* ignore */ }
  }
  const env = import.meta.env.VITE_AB_VARIANT;
  return env === "b" ? "b" : "a";
}

export function getVariantImage(sku: Sku, slot: Slot, override?: Variant): string {
  const v = override ?? resolveVariant(sku);
  return variants[sku][slot][v];
}

export function currentVariant(sku: Sku): Variant {
  return resolveVariant(sku);
}
