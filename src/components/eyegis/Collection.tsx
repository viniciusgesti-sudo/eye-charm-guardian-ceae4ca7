import { useEffect, useRef, useState, type ElementType, type MouseEvent as ReactMouseEvent } from "react";
import { Link } from "@tanstack/react-router";

import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";
import { useContentDocument } from "@/lib/cms";
import collectionData from "@/content/collection_comp.json";

/* Campaign / editorial imagery */
import heroSaoPaulo from "@/assets/hero-saopaulo-eyegis.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import heroParis from "@/assets/hero-paris-eyegis.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import kidsHero from "@/assets/collection-hero-kids.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import soleneFront from "@/assets/products/solene-front.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture";
import soleneMacro from "@/assets/products/solene-macro.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture";
import maraisFront from "@/assets/products/marais-front.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture";
import meridianHero from "@/assets/products/meridian-hero.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture";
import meridianPair from "@/assets/products/meridian-pair.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture";
import atelierFront from "@/assets/products/atelier-front.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture";
import atelierProfile from "@/assets/products/atelier-profile.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture";
import atelierKids from "@/assets/products/atelier-kids.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture";
import atelierKidsThumb from "@/assets/products/atelier-kids.jpg?w=320;480;640&format=avif;webp;jpg&as=picture";

/* Standardized list/collection thumbnails — smaller widths, same source */
import soleneFrontThumb from "@/assets/products/solene-front.jpg?w=320;480;640&format=avif;webp;jpg&as=picture";
import soleneMacroThumb from "@/assets/products/solene-macro.jpg?w=320;480;640&format=avif;webp;jpg&as=picture";
import maraisFrontThumb from "@/assets/products/marais-front.jpg?w=320;480;640&format=avif;webp;jpg&as=picture";
import meridianHeroThumb from "@/assets/products/meridian-hero.jpg?w=320;480;640&format=avif;webp;jpg&as=picture";
import meridianPairThumb from "@/assets/products/meridian-pair.jpg?w=320;480;640&format=avif;webp;jpg&as=picture";
import atelierFrontThumb from "@/assets/products/atelier-front.jpg?w=320;480;640&format=avif;webp;jpg&as=picture";
import atelierProfileThumb from "@/assets/products/atelier-profile.jpg?w=320;480;640&format=avif;webp;jpg&as=picture";

import { Picture, type PictureSource } from "./Picture";


const AMAZON_URL = "#coming-soon";

/* ---------- Reveal ---------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLElement>();
  const Comp = Tag as ElementType;
  return (
    <Comp
      ref={ref as unknown as React.Ref<HTMLElement>}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}

/* ---------- Marks ---------- */
function IconArrow({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconExternal({ className = "" }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className={className}>
      <path d="M4.5 2h5.5v5.5M10 2 5 7M8.5 8.5V10H2V3.5h1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Localized copy ---------- */
type Tone = "paper" | "champagne" | "teal";
type CollectionCopy = {
  label: string;
  city: string;
  headline: string;
  scriptWord: string;
  supporting: string;
  highlights: string[];
  primaryCta: string;
};
type Copy = {
  section: string;
  eyebrow: string;
  introHeadline1: string;
  introHeadline2: string;
  introLead: string;
  introLeadSub: string;
  collections: {
    men: { label: string; city: string; headline: string; scriptWord: string; supporting: string; highlights: string[]; primaryCta: string };
    women: { label: string; city: string; headline: string; scriptWord: string; supporting: string; highlights: string[]; primaryCta: string };
    kids: { label: string; city: string; headline: string; scriptWord: string; supporting: string; highlights: string[]; primaryCta: string };
  };
  buyOnAmazon: string;
  amazonNote: string;
  preview: {
    eyebrow: string;
    headline1: string;
    headline2: string;
    lead: string;
    filterLabel: string;
    filters: Record<string, string>;
    scrollLeft: string;
    scrollRight: string;
    empty: string;
    bestSeller: string;
    newest: string;
    warranty: string;
    comfort: string;
    learnMore: string;
  };
  products: Record<string, {
    name: string;
    collection: string;
    city: string;
    description: string;
  }>;
  closing: {
    eyebrow: string;
    headline1: string;
    headline2: string;
    lead: string;
    ctaTech: string;
    ctaAmazon: string;
    est: string;
    cities: string;
  };
};
const COPY = collectionData as Record<Lang, Copy>;

/* ---------- Static (non-translatable) data ---------- */
type CollectionMeta = {
  id: "men" | "women" | "kids";
  index: string;
  image: PictureSource;
  imageAlt: string;
  align: "left" | "right";
  tone: Tone;
};

const COLLECTIONS: CollectionMeta[] = [
  { id: "men", index: "01", image: heroSaoPaulo, imageAlt: "Eyegis Men — São Paulo, night", align: "right", tone: "teal" },
  { id: "women", index: "02", image: heroParis, imageAlt: "Eyegis Women — Paris, golden hour", align: "left", tone: "champagne" },
  { id: "kids", index: "03", image: kidsHero, imageAlt: "Eyegis Kids & Teens — a young reader in a sunlit study", align: "right", tone: "paper" },
];

const TONE_STYLES: Record<
  Tone,
  {
    bg: string;
    text: string;
    muted: string;
    hairline: string;
    script: string;
    eyebrow: string;
    primary: string;
    secondary: string;
    chip: string;
  }
> = {
  paper: {
    bg: "bg-paper",
    text: "text-ink",
    muted: "text-ink/65",
    hairline: "bg-ink/20",
    script: "text-teal",
    eyebrow: "text-ink/55",
    primary:
      "bg-teal text-paper hover:bg-teal-deep shadow-[0_20px_50px_-20px_rgba(0,75,87,0.55)]",
    secondary: "text-ink hover:text-teal ring-ink/20 hover:ring-teal/50",
    chip: "text-ink/65 ring-ink/15",
  },
  champagne: {
    bg: "bg-paper-warm",
    text: "text-ink",
    muted: "text-ink/65",
    hairline: "bg-ink/20",
    script: "text-teal",
    eyebrow: "text-ink/55",
    primary:
      "bg-teal text-paper hover:bg-teal-deep shadow-[0_20px_50px_-20px_rgba(0,75,87,0.55)]",
    secondary: "text-ink hover:text-teal ring-ink/20 hover:ring-teal/50",
    chip: "text-ink/60 ring-ink/15",
  },
  teal: {
    bg: "bg-teal-deep",
    text: "text-paper",
    muted: "text-paper/70",
    hairline: "bg-paper/25",
    script: "text-mint",
    eyebrow: "text-paper/60",
    primary:
      "bg-paper text-teal-deep hover:bg-sand-warm shadow-[0_20px_50px_-20px_rgba(249,249,249,0.35)]",
    secondary:
      "text-paper hover:text-mint ring-paper/30 hover:ring-mint/60",
    chip: "text-paper/75 ring-paper/25",
  },
};

function CollectionSection({ meta, i, copy }: { meta: CollectionMeta; i: number; copy: Copy }) {
  const t = TONE_STYLES[meta.tone];
  const { ref, visible } = useReveal<HTMLDivElement>();
  const textOrder = meta.align === "right" ? "lg:order-1" : "lg:order-2";
  const imageOrder = meta.align === "right" ? "lg:order-2" : "lg:order-1";
  const c = copy.collections[meta.id];

  return (
    <section
      ref={ref}
      id={meta.id}
      className={`${t.bg} ${t.text} relative overflow-hidden`}
    >
      {i > 0 && (
        <div
          className={`absolute inset-x-6 top-0 h-px ${t.hairline} opacity-40 md:inset-x-14`}
        />
      )}

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-6 px-6 py-8 md:px-10 md:py-12 lg:grid-cols-12 lg:gap-10 lg:px-14">
        <div className={`relative ${imageOrder} lg:col-span-6`}>
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-teal-deep/10 md:aspect-[3/4] lg:aspect-[16/11]">
            <Picture
              source={meta.image}
              alt={meta.imageAlt}
              sizes="(min-width:1024px) 50vw, 100vw"
              className={`h-full w-full object-cover will-change-transform transition-[transform,filter] duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                visible ? "scale-100" : "scale-[1.06]"
              }`}
              style={{ filter: visible ? "none" : "brightness(0.92)" }}
            />
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-ink/70 px-2.5 py-1 font-eyebrow text-[9px] text-paper backdrop-blur-sm">
              <span>N° {meta.index}</span>
              <span className="h-px w-6 bg-paper/80" />
              <span>{c.city}</span>
            </div>
          </div>
        </div>

        <div className={`${textOrder} lg:col-span-6`}>
          <Reveal delay={120}>
            <div className={`flex items-center gap-3 font-eyebrow text-[10px] ${t.eyebrow}`}>
              <span className={t.script}>N° {meta.index}</span>
              <span className={`h-px w-6 ${t.hairline}`} />
              <span>{copy.section} · {c.label}</span>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <h3
              className={`mt-4 font-editorial leading-[1.02] text-balance-tight text-fluid-h2 ${t.text}`}
            >
              {c.headline}{" "}
              <span className={`italic ${t.script}`}>{c.scriptWord}</span>
            </h3>
          </Reveal>

          <Reveal delay={340}>
            <p className={`mt-4 max-w-md font-light text-sm md:text-base leading-relaxed ${t.muted}`}>
              {c.supporting}
            </p>
          </Reveal>

          <Reveal delay={440}>
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2">
              {c.highlights.map((h) => (
                <li
                  key={h}
                  className={`flex items-baseline gap-2 border-t ${
                    meta.tone === "teal" ? "border-paper/20" : "border-ink/15"
                  } pt-2`}
                >
                  <span className={`font-eyebrow text-[9px] ${t.script}`}>•</span>
                  <span className={`text-xs md:text-sm ${t.text}`}>{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={560}>
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href="#preview"
                className={`cta-lift group inline-flex items-center justify-between gap-4 rounded-full px-5 py-3 min-w-[200px] max-w-full text-xs transition-all duration-500 hover:-translate-y-0.5 ${t.primary}`}
              >
                <span className="font-eyebrow">{c.primaryCta}</span>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-current/10 transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </a>

              <a
                href={AMAZON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center gap-2 rounded-full px-4 py-3 text-xs ring-1 transition-all duration-500 hover:-translate-y-0.5 ${t.secondary}`}
              >
                <span className="font-eyebrow">{copy.buyOnAmazon}</span>
                <IconExternal className="opacity-70 transition-opacity group-hover:opacity-100" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={680}>
            <p className={`mt-6 font-eyebrow text-[9px] ${t.eyebrow}`}>
              {copy.amazonNote}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- PRODUCT PREVIEW ---------- */
type GalleryShot = { src: PictureSource; thumb: PictureSource; alt: string; label: string };
type ProductMeta = {
  id: string;
  productKey: keyof Copy["products"];
  filterKey: "Men" | "Women" | "Kids";
  image: PictureSource;
  thumbImage: PictureSource;
  imageAlt: string;
  gallery: GalleryShot[];
  bestSeller?: boolean;
  newest?: boolean;
  detailShot?: boolean;
  pdpPath?: string;
};

const PRODUCTS: ProductMeta[] = [
  {
    id: "meridian", productKey: "meridian", filterKey: "Men",
    image: meridianHero, thumbImage: meridianHeroThumb,
    imageAlt: "Men's Collection frame — official Eyegis product photography",
    pdpPath: "/product/meridian",
    gallery: [
      { src: meridianHero, thumb: meridianHeroThumb, alt: "Men's Collection — hero shot on obsidian gradient", label: "Hero" },
      { src: meridianPair, thumb: meridianPairThumb, alt: "Men's Collection — dual angle pair", label: "Pair" },
    ],
    bestSeller: true,
  },
  {
    id: "atelier", productKey: "atelier", filterKey: "Men",
    image: atelierFront, thumbImage: atelierFrontThumb,
    imageAlt: "Men's Collection frame — official Eyegis product photography",
    pdpPath: "/product/atelier",
    gallery: [
      { src: atelierFront, thumb: atelierFrontThumb, alt: "Men's Collection — front three-quarter view", label: "Front" },
      { src: atelierProfile, thumb: atelierProfileThumb, alt: "Men's Collection — studied side profile", label: "Profile" },
    ],
    newest: true,
  },
  {
    id: "solene", productKey: "solene", filterKey: "Women",
    image: soleneFront, thumbImage: soleneFrontThumb,
    imageAlt: "Women's Collection frame — official Eyegis product photography",
    pdpPath: "/product/solene",
    gallery: [
      { src: soleneFront, thumb: soleneFrontThumb, alt: "Women's Collection — floating hero in champagne light", label: "Hero" },
      { src: soleneMacro, thumb: soleneMacroThumb, alt: "Women's Collection — hinge and coating macro", label: "Macro" },
    ],
    bestSeller: true,
  },
  {
    id: "marais", productKey: "marais", filterKey: "Women",
    image: maraisFront, thumbImage: maraisFrontThumb,
    imageAlt: "Women's Collection frame — official Eyegis product photography",
    pdpPath: "/product/marais",
    gallery: [
      { src: maraisFront, thumb: maraisFrontThumb, alt: "Women's Collection — front three-quarter view", label: "Front" },
    ],
    newest: true,
  },
  {
    id: "meridian-pair", productKey: "meridian-pair", filterKey: "Men",
    image: meridianPair, thumbImage: meridianPairThumb,
    imageAlt: "Men's Collection pair — editorial still life",
    gallery: [
      { src: meridianPair, thumb: meridianPairThumb, alt: "Men's Collection — twin pair still life", label: "Pair" },
      { src: meridianHero, thumb: meridianHeroThumb, alt: "Men's Collection — hero shot", label: "Hero" },
    ],
    detailShot: true,
  },
  {
    id: "atelier-profile", productKey: "atelier-profile", filterKey: "Men",
    image: atelierProfile, thumbImage: atelierProfileThumb,
    imageAlt: "Men's Collection frame profile — editorial",
    gallery: [
      { src: atelierProfile, thumb: atelierProfileThumb, alt: "Men's Collection — profile study", label: "Profile" },
      { src: atelierFront, thumb: atelierFrontThumb, alt: "Men's Collection — front view", label: "Front" },
    ],
    detailShot: true,
  },
  {
    id: "solene-macro", productKey: "solene-macro", filterKey: "Women",
    image: soleneMacro, thumbImage: soleneMacroThumb,
    imageAlt: "Women's Collection lens macro — editorial",
    gallery: [
      { src: soleneMacro, thumb: soleneMacroThumb, alt: "Women's Collection — lens coating macro", label: "Macro" },
      { src: soleneFront, thumb: soleneFrontThumb, alt: "Women's Collection — hero shot", label: "Hero" },
    ],
    bestSeller: true,
    detailShot: true,
  },
  {
    id: "atelier-kids", productKey: "atelier-kids", filterKey: "Kids",
    image: atelierKids, thumbImage: atelierKidsThumb,
    imageAlt: "Men's Collection Young — teen wearing honey champagne frames at study desk",
    gallery: [
      { src: atelierKids, thumb: atelierKidsThumb, alt: "Men's Collection Young — teen study portrait", label: "Front" },
    ],
    newest: true,
  },
];

type Filter = "All" | "Men" | "Women" | "Kids" | "Newest" | "Best" | "Details";
const FILTERS: Filter[] = ["All", "Men", "Women", "Kids", "Newest", "Best", "Details"];

function matches(p: ProductMeta, f: Filter) {
  if (f === "All") return true;
  if (f === "Newest") return !!p.newest;
  if (f === "Best") return !!p.bestSeller;
  if (f === "Details") return !!p.detailShot;
  return p.filterKey === f;
}

function ProductPreview({ copy, audience }: { copy: Copy; audience?: "men" | "women" | "kids" }) {
  const audienceFilter: Filter | null = audience === "men" ? "Men" : audience === "women" ? "Women" : audience === "kids" ? "Kids" : null;
  const [filter, setFilter] = useState<Filter>(audienceFilter ?? "All");
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const pool = audience ? PRODUCTS.filter((p) => matches(p, audienceFilter as Filter)) : PRODUCTS;
  const visible = pool.filter((p) => matches(p, filter));
  const availableFilters = audience ? FILTERS.filter((f) => f === audienceFilter || f === "Newest" || f === "Best") : FILTERS;


  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section id="preview" className="bg-paper text-ink border-t border-ink/10">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 pt-14 md:pt-20 pb-14 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-10">
          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-4 text-ink/60">
              <span className="font-eyebrow text-teal">§ 06</span>
              <span className="h-px w-8 bg-ink/25" />
              <span className="font-eyebrow">{copy.preview.eyebrow}</span>
            </div>
            <h3 className="mt-5 font-editorial text-ink leading-[0.94] text-balance-tight text-fluid-h1">
              {copy.preview.headline1}
              <br />
              <span className="italic text-teal">{copy.preview.headline2}</span>
            </h3>
          </Reveal>

          <Reveal delay={200} className="lg:col-span-5">
            <p className="max-w-md font-light text-base md:text-lg leading-relaxed text-ink/70">
              {copy.preview.lead}
            </p>
          </Reveal>
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-ink/10 pt-5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
            <span className="mr-2 font-eyebrow text-[10px] text-ink/50">{copy.preview.filterLabel}</span>
            {availableFilters.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`font-eyebrow rounded-full px-4 py-2 ring-1 transition-all duration-400 ${
                    active
                      ? "bg-ink text-paper ring-ink"
                      : "text-ink/70 ring-ink/15 hover:text-ink hover:ring-ink/40"
                  }`}
                  aria-pressed={active}
                >
                  {copy.preview.filters[f]}
                </button>
              );
            })}
          </div>

        </div>

        <div
          ref={scrollerRef}
          className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6"
        >
          {visible.map((p, i) => (
            <ProductCard key={p.id} p={p} i={i} copy={copy} />
          ))}
          {visible.length === 0 && (
            <div className="col-span-full py-24 text-center font-eyebrow text-ink/50">
              {copy.preview.empty}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

function Lightbox({
  shots,
  index,
  onIndex,
  onClose,
  title,
  eyebrow,
}: {
  shots: GalleryShot[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
  title: string;
  eyebrow: string;
}) {
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const total = shots.length;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % total);
      if (e.key === "ArrowLeft") onIndex((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, total, onClose, onIndex]);

  const shot = shots[index];
  const move = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/92 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-paper/10 text-paper ring-1 ring-paper/25 backdrop-blur transition hover:bg-paper hover:text-ink"
        aria-label="Close"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <div className="absolute left-5 top-5 max-w-[70%] font-eyebrow text-[10px] text-paper/75">
        <div>{eyebrow}</div>
        <div className="mt-1 text-paper/95">{title}</div>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + total) % total); }}
            className="absolute left-4 md:left-8 grid h-12 w-12 place-items-center rounded-full bg-paper/10 text-paper ring-1 ring-paper/25 backdrop-blur transition hover:bg-paper hover:text-ink"
            aria-label="Previous image"
          >
            <IconArrow className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % total); }}
            className="absolute right-4 md:right-8 grid h-12 w-12 place-items-center rounded-full bg-paper/10 text-paper ring-1 ring-paper/25 backdrop-blur transition hover:bg-paper hover:text-ink"
            aria-label="Next image"
          >
            <IconArrow />
          </button>
        </>
      )}

      <div
        className="relative flex h-full w-full items-center justify-center p-6 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`relative max-h-[86vh] max-w-[92vw] overflow-hidden ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
          onClick={() => setZoomed((v) => !v)}
          onMouseMove={move}
          onMouseLeave={() => setOrigin({ x: 50, y: 50 })}
        >
          <Picture
            source={shot.src}
            alt={shot.alt}
            sizes="90vw"
            className="max-h-[86vh] max-w-[92vw] object-contain transition-transform duration-500 ease-out select-none"
            style={{
              transform: zoomed ? "scale(2.1)" : "scale(1)",
              transformOrigin: `${origin.x}% ${origin.y}%`,
            }}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-3">
        {total > 1 && (
          <div className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-paper/10 px-3 py-2 ring-1 ring-paper/20 backdrop-blur">
            {shots.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => { e.stopPropagation(); onIndex(idx); }}
                aria-label={`Show image ${idx + 1}`}
                aria-current={idx === index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === index ? "w-7 bg-paper" : "w-1.5 bg-paper/50 hover:bg-paper/80"
                }`}
              />
            ))}
          </div>
        )}
        <span className="font-eyebrow text-[10px] text-paper/70">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {shot.label} · {zoomed ? "Click to zoom out" : "Click to zoom in"}
        </span>
      </div>
    </div>
  );
}

function ProductCard({ p, i, copy }: { p: ProductMeta; i: number; copy: Copy }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const pc = copy.products[p.productKey];
  const shots: GalleryShot[] = p.gallery.length > 0
    ? p.gallery
    : [{ src: p.image, thumb: p.thumbImage, alt: p.imageAlt, label: "01" }];
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const total = shots.length;
  const go = (dir: 1 | -1) => setActive((v) => (v + dir + total) % total);


  return (
    <article
      ref={ref}
      data-card
      className={`group w-full transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${i * 80}ms` }}
    >

      <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-warm">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute inset-0 z-[5] cursor-zoom-in"
          aria-label={`Zoom ${pc.name} — ${shots[active].label}`}
        />
        {shots.map((s, idx) => (
          <Picture
            key={idx}
            source={s.thumb}
            alt={s.alt}
            loading={idx === active ? "eager" : "lazy"}
            decoding="async"
            sizes="(min-width:1024px) 460px, (min-width:640px) 440px, 85vw"
            className={`absolute inset-0 h-full w-full object-cover img-hover group-hover:img-hover-in transition-opacity duration-[700ms] ease-out ${
              idx === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <span className="absolute right-4 bottom-4 z-10 hidden md:inline-flex items-center gap-1.5 rounded-full bg-paper/90 px-2.5 py-1 font-eyebrow text-[9px] text-ink ring-1 ring-ink/10 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="6" />
            <path d="M20 20l-4-4M9 11h4M11 9v4" />
          </svg>
          Zoom
        </span>



        <div className="absolute left-4 top-4 z-10 flex flex-col items-start gap-2">
          {p.bestSeller && (
            <span className="rounded-full bg-paper/90 px-3 py-1 font-eyebrow text-[9px] text-ink ring-1 ring-ink/10 backdrop-blur">
              {copy.preview.bestSeller}
            </span>
          )}
          {p.newest && (
            <span className="rounded-full bg-teal/90 px-3 py-1 font-eyebrow text-[9px] text-paper ring-1 ring-teal/40 backdrop-blur">
              {copy.preview.newest}
            </span>
          )}
        </div>
        <div className="absolute right-4 top-4 z-10 rounded-full bg-paper/85 px-3 py-1 font-eyebrow text-[9px] text-ink ring-1 ring-ink/10 backdrop-blur">
          EyegisGuard™
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); go(-1); }}
              className="absolute left-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-paper/85 text-ink ring-1 ring-ink/10 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-paper"
              aria-label="Previous image"
            >
              <IconArrow className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); go(1); }}
              className="absolute right-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-paper/85 text-ink ring-1 ring-ink/10 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-paper"
              aria-label="Next image"
            >
              <IconArrow />
            </button>

            <div className="absolute inset-x-4 bottom-4 z-10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                {shots.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => { e.preventDefault(); setActive(idx); }}
                    aria-label={`Show image ${idx + 1}`}
                    aria-current={idx === active}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      idx === active ? "w-6 bg-paper" : "w-1.5 bg-paper/55 hover:bg-paper/80"
                    }`}
                  />
                ))}
              </div>
              <span className="rounded-full bg-ink/70 px-2.5 py-1 font-eyebrow text-[9px] text-paper backdrop-blur">
                {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {shots[active].label}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="mt-6">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-eyebrow text-[10px] text-ink/50">
            {pc.collection} · {pc.city}
          </span>
          <span className="h-px flex-1 bg-ink/15" />
        </div>
        <h4 className="mt-3 font-editorial text-2xl md:text-3xl text-ink">{pc.name}</h4>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/65">
          {pc.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-eyebrow text-[9px] text-ink/55">
          <span>{copy.preview.warranty}</span>
          <span className="opacity-40">/</span>
          <span>{copy.preview.comfort}</span>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <a
            href={AMAZON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-lift group/btn inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 text-paper transition-all duration-500 hover:-translate-y-0.5 hover:bg-teal"
          >
            <span className="font-eyebrow">{copy.buyOnAmazon}</span>
            <IconExternal className="opacity-80" />
          </a>
          {p.pdpPath ? (
            <Link
              to={p.pdpPath}
              className="group/link inline-flex items-center gap-2 font-eyebrow text-ink/70 transition-colors hover:text-ink"
            >
              <span>{copy.preview.learnMore}</span>
              <IconArrow className="transition-transform duration-500 group-hover/link:translate-x-1" />
            </Link>
          ) : (
            <a
              href={`#${p.id}`}
              className="group/link inline-flex items-center gap-2 font-eyebrow text-ink/70 transition-colors hover:text-ink"
            >
              <span>{copy.preview.learnMore}</span>
              <IconArrow className="transition-transform duration-500 group-hover/link:translate-x-1" />
            </a>
          )}
        </div>
      </div>
      {open && (
        <Lightbox
          shots={shots}
          index={active}
          onIndex={setActive}
          onClose={() => setOpen(false)}
          title={pc.name}
          eyebrow={`${pc.collection} · ${pc.city}`}
        />
      )}
    </article>
  );
}


function FinalTransition({ copy }: { copy: Copy }) {
  return (
    <section className="relative bg-teal-deep text-paper">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14 py-16 md:py-24 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-4 text-paper/60">
            <span className="h-px w-14 bg-paper/30" />
            <span className="font-eyebrow">{copy.closing.eyebrow}</span>
            <span className="h-px w-14 bg-paper/30" />
          </div>
        </Reveal>

        <Reveal delay={180}>
          <h3 className="mt-6 font-editorial text-paper text-balance-tight text-fluid-h1 leading-[0.95]">
            {copy.closing.headline1}
            <br />
            <span className="italic text-mint">{copy.closing.headline2}</span>
          </h3>
        </Reveal>

        <Reveal delay={340}>
          <p className="mx-auto mt-5 max-w-xl font-light text-sm md:text-base leading-relaxed text-paper/70">
            {copy.closing.lead}
          </p>
        </Reveal>

        <Reveal delay={480}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#preview"
              className="cta-lift group inline-flex items-center justify-between gap-6 rounded-full bg-paper px-8 py-5 min-w-[280px] text-teal-deep shadow-[0_20px_50px_-20px_rgba(249,249,249,0.35)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-sand-warm"
            >
              <span className="font-eyebrow">{copy.closing.ctaTech}</span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-teal-deep/10 transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </a>

            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full px-6 py-4 text-paper ring-1 ring-paper/30 transition-all duration-500 hover:-translate-y-0.5 hover:ring-mint/60 hover:text-mint"
            >
              <span className="font-eyebrow">{copy.closing.ctaAmazon}</span>
              <IconExternal className="opacity-70 transition-opacity group-hover:opacity-100" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={640}>
          <div className="mt-10 flex items-center justify-center gap-4 font-eyebrow text-[9px] text-paper/50">
            <span>{copy.closing.est}</span>
            <span className="block h-px w-10 bg-paper/25" />
            <span>{copy.closing.cities}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export type CollectionAudience = "men" | "women" | "kids";

export function Collection({ audience }: { audience?: CollectionAudience } = {}) {
  const { lang } = useI18n();
  const content = useContentDocument<typeof collectionData>("collection_comp", collectionData);
  const copy = (content as Record<Lang, Copy>)[lang] ?? COPY[lang];
  const collections = audience ? COLLECTIONS.filter((c) => c.id === audience) : COLLECTIONS;

  return (
    <section id="collections" className="relative">
      <div className="bg-paper text-ink border-t border-ink/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 pt-16 md:pt-24 pb-8 md:pb-12">
          <Reveal>
            <div className="flex items-center gap-4 text-ink/60">
              <span className="font-eyebrow text-teal">{copy.eyebrow}</span>
              <span className="h-px w-8 bg-ink/25" />
              <span className="font-eyebrow">{copy.section}</span>
            </div>
          </Reveal>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
            <Reveal delay={120} className="lg:col-span-8">
              <h2 className="font-editorial text-ink text-balance-tight text-fluid-hero leading-[0.9]">
                {copy.introHeadline1}
                <br />
                <span className="italic text-teal">{copy.introHeadline2}</span>
              </h2>
            </Reveal>
            <Reveal delay={260} className="lg:col-span-4">
              <p className="font-light text-base md:text-lg leading-relaxed text-ink/75 max-w-md">
                {copy.introLead}
                <span className="mt-3 block text-ink/55">
                  {copy.introLeadSub}
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {collections.map((meta, i) => (
        <CollectionSection key={meta.id} meta={meta} i={i} copy={copy} />
      ))}

      <ProductPreview copy={copy} audience={audience} />

      <FinalTransition copy={copy} />
    </section>
  );
}
