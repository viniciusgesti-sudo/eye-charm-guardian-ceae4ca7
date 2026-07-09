import { useEffect, useRef, useState, type ElementType } from "react";

/* Campaign / editorial imagery */
import heroSaoPaulo from "@/assets/hero-saopaulo.jpg";
import heroParis from "@/assets/hero-paris.jpg";
import kidsHero from "@/assets/collection-hero-kids.jpg";

/* Official product photography */
import soleneFront from "@/assets/products/solene-front.jpg";
import soleneMacro from "@/assets/products/solene-macro.jpg";
import maraisFront from "@/assets/products/marais-front.jpg";
import meridianHero from "@/assets/products/meridian-hero.jpg";
import meridianPair from "@/assets/products/meridian-pair.jpg";
import atelierFront from "@/assets/products/atelier-front.jpg";
import atelierProfile from "@/assets/products/atelier-profile.jpg";

const AMAZON_URL = "https://www.amazon.com/stores/Eyegis/page";

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
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
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

/* ---------- COLLECTION BLOCKS ---------- */
type Tone = "paper" | "champagne" | "teal";
type CollectionBlock = {
  id: string;
  index: string;
  label: string;
  city: string;
  headline: string;
  scriptWord: string;
  supporting: string;
  highlights: string[];
  primaryCta: string;
  image: string;
  imageAlt: string;
  align: "left" | "right";
  tone: Tone;
};

const COLLECTIONS: CollectionBlock[] = [
  {
    id: "men",
    index: "01",
    label: "Men",
    city: "São Paulo · after hours",
    headline: "Performance without",
    scriptWord: "compromise.",
    supporting:
      "Designed for professionals who spend hours in front of screens without sacrificing elegance. Architecture, night light, glass and steel — translated into a frame.",
    highlights: [
      "Lightweight TR90 Frame",
      "EyegisGuard™",
      "Anti-Reflective Coating",
      "Premium Comfort",
    ],
    primaryCta: "Explore Men's Collection",
    image: heroSaoPaulo,
    imageAlt: "Eyegis Men — São Paulo, night",
    align: "right",
    tone: "teal",
  },
  {
    id: "women",
    index: "02",
    label: "Women",
    city: "Paris · golden hour",
    headline: "Elegance for",
    scriptWord: "every screen.",
    supporting:
      "A refined collection combining timeless design with visual comfort for modern digital lifestyles. Soft Parisian light, warm neutrals, considered proportion.",
    highlights: [
      "Elegant Lightweight Frames",
      "Premium Lens Technology",
      "Natural Color Accuracy",
      "All-Day Comfort",
    ],
    primaryCta: "Explore Women's Collection",
    image: heroParis,
    imageAlt: "Eyegis Women — Paris, golden hour",
    align: "left",
    tone: "champagne",
  },
  {
    id: "kids",
    index: "03",
    label: "Kids & Teens",
    city: "Home study · daylight",
    headline: "Designed for",
    scriptWord: "growing minds.",
    supporting:
      "Helping students stay comfortable during study, creativity and everyday digital learning. Bright, clean and modern — never childish.",
    highlights: [
      "Lightweight",
      "Comfortable Fit",
      "Durable Materials",
      "Premium Lens Protection",
    ],
    primaryCta: "Explore Kids Collection",
    image: kidsHero,
    imageAlt: "Eyegis Kids & Teens — a young reader in a sunlit study",
    align: "right",
    tone: "paper",
  },
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

function CollectionSection({ c, i }: { c: CollectionBlock; i: number }) {
  const t = TONE_STYLES[c.tone];
  const { ref, visible } = useReveal<HTMLDivElement>();
  const textOrder = c.align === "right" ? "lg:order-1" : "lg:order-2";
  const imageOrder = c.align === "right" ? "lg:order-2" : "lg:order-1";

  return (
    <section
      ref={ref}
      id={c.id}
      className={`${t.bg} ${t.text} relative overflow-hidden`}
    >
      {i > 0 && (
        <div
          className={`absolute inset-x-6 top-0 h-px ${t.hairline} opacity-40 md:inset-x-14`}
        />
      )}

      <div className="mx-auto grid min-h-[92vh] max-w-[1600px] grid-cols-1 items-center gap-12 px-6 py-28 md:px-10 md:py-36 lg:grid-cols-12 lg:gap-16 lg:px-14">
        {/* IMAGE */}
        <div className={`relative ${imageOrder} lg:col-span-7`}>
          <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[5/6] lg:aspect-[4/5]">
            <img
              src={c.image}
              alt={c.imageAlt}
              width={1600}
              height={2000}
              loading="lazy"
              className={`h-full w-full object-cover will-change-transform transition-[transform,filter] duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                visible ? "scale-100" : "scale-[1.06]"
              }`}
              style={{ filter: visible ? "none" : "brightness(0.92)" }}
            />
            <div
              className={`absolute left-5 top-5 flex items-center gap-3 font-eyebrow text-[10px] ${
                c.tone === "champagne" ? "text-paper/95" : "text-paper/90"
              } drop-shadow`}
            >
              <span>N° {c.index}</span>
              <span className="h-px w-8 bg-current opacity-60" />
              <span>{c.city}</span>
            </div>
          </div>
        </div>

        {/* COPY */}
        <div className={`${textOrder} lg:col-span-5`}>
          <Reveal delay={120}>
            <div className={`flex items-center gap-3 font-eyebrow ${t.eyebrow}`}>
              <span className={t.script}>N° {c.index}</span>
              <span className={`h-px w-8 ${t.hairline}`} />
              <span>Collection · {c.label}</span>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <h3
              className={`mt-8 font-editorial leading-[0.92] text-balance-tight text-[13vw] sm:text-[9vw] lg:text-[5.4vw] xl:text-[84px] ${t.text}`}
            >
              {c.headline}
              <br />
              <span className={`italic ${t.script}`}>{c.scriptWord}</span>
            </h3>
          </Reveal>

          <Reveal delay={340}>
            <p className={`mt-8 max-w-md font-light text-base md:text-lg leading-relaxed ${t.muted}`}>
              {c.supporting}
            </p>
          </Reveal>

          <Reveal delay={440}>
            <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {c.highlights.map((h) => (
                <li
                  key={h}
                  className={`flex items-baseline gap-3 border-t ${
                    c.tone === "teal" ? "border-paper/20" : "border-ink/15"
                  } pt-3`}
                >
                  <span className={`font-eyebrow text-[9px] ${t.script}`}>•</span>
                  <span className={`text-sm ${t.text}`}>{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={560}>
            <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <a
                href={`#${c.id}-preview`}
                className={`cta-lift group inline-flex items-center justify-between gap-6 rounded-full px-8 py-5 min-w-[260px] transition-all duration-500 hover:-translate-y-0.5 ${t.primary}`}
              >
                <span className="font-eyebrow">{c.primaryCta}</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-current/10 transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </a>

              <a
                href={AMAZON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center gap-3 rounded-full px-6 py-4 ring-1 transition-all duration-500 hover:-translate-y-0.5 ${t.secondary}`}
              >
                <span className="font-eyebrow">Buy on Amazon</span>
                <IconExternal className="opacity-70 transition-opacity group-hover:opacity-100" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={680}>
            <p className={`mt-6 font-eyebrow text-[9px] ${t.eyebrow}`}>
              Available on Amazon · fast delivery · trusted customer service
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- PRODUCT PREVIEW CAROUSEL ---------- */
type Product = {
  id: string;
  collection: "Men" | "Women" | "Kids";
  name: string;
  city: string;
  description: string;
  image: string;
  imageAlt: string;
  bestSeller?: boolean;
  newest?: boolean;
};

const PRODUCTS: Product[] = [
  {
    id: "meridian",
    collection: "Men",
    name: "Meridian",
    city: "São Paulo",
    description: "Architectural profile, matte acetate — engineered for long screen days.",
    image: meridianHero,
    imageAlt: "Meridian frame — official Eyegis product photography",
    bestSeller: true,
  },
  {
    id: "atelier",
    collection: "Men",
    name: "Atelier",
    city: "São Paulo",
    description: "A quieter silhouette. Considered proportion, weightless on the bridge.",
    image: atelierFront,
    imageAlt: "Atelier frame — official Eyegis product photography",
    newest: true,
  },
  {
    id: "solene",
    collection: "Women",
    name: "Solène",
    city: "Paris",
    description: "Softened geometry in warm champagne — golden-hour every day.",
    image: soleneFront,
    imageAlt: "Solène frame — official Eyegis product photography",
    bestSeller: true,
  },
  {
    id: "marais",
    collection: "Women",
    name: "Marais",
    city: "Paris",
    description: "Refined round frame, subtle keyhole bridge — Parisian understatement.",
    image: maraisFront,
    imageAlt: "Marais frame — official Eyegis product photography",
    newest: true,
  },
  {
    id: "meridian-pair",
    collection: "Men",
    name: "Meridian · Twin",
    city: "São Paulo",
    description: "The Meridian shown as a pair — a study in balance and repetition.",
    image: meridianPair,
    imageAlt: "Meridian pair — editorial still life",
  },
  {
    id: "atelier-profile",
    collection: "Men",
    name: "Atelier · Profile",
    city: "São Paulo",
    description: "Studied side view — thin temples, honest hinges, no ornament.",
    image: atelierProfile,
    imageAlt: "Atelier frame profile — editorial",
  },
  {
    id: "solene-macro",
    collection: "Women",
    name: "Solène · Macro",
    city: "Paris",
    description: "Lens macro — anti-reflective coating catching quiet warm light.",
    image: soleneMacro,
    imageAlt: "Solène lens macro — editorial",
    bestSeller: true,
  },
  {
    id: "atelier-kids",
    collection: "Kids",
    name: "Atelier · Young",
    city: "Study",
    description: "The Atelier silhouette, sized for teens — durable, honest, comfortable.",
    image: atelierFront,
    imageAlt: "Atelier frame — teen edition",
    newest: true,
  },
];

type Filter = "All" | "Men" | "Women" | "Kids" | "Newest" | "Best Sellers";
const FILTERS: Filter[] = ["All", "Men", "Women", "Kids", "Newest", "Best Sellers"];

function matches(p: Product, f: Filter) {
  if (f === "All") return true;
  if (f === "Newest") return !!p.newest;
  if (f === "Best Sellers") return !!p.bestSeller;
  return p.collection === f;
}

function ProductPreview() {
  const [filter, setFilter] = useState<Filter>("All");
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const visible = PRODUCTS.filter((p) => matches(p, filter));

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section id="preview" className="bg-paper text-ink border-t border-ink/10">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 pt-28 md:pt-40 pb-24 md:pb-36">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-10">
          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-4 text-ink/60">
              <span className="font-eyebrow text-teal">§ 06</span>
              <span className="h-px w-8 bg-ink/25" />
              <span className="font-eyebrow">Selected Frames</span>
            </div>
            <h3 className="mt-8 font-editorial text-ink leading-[0.94] text-balance-tight text-[10vw] sm:text-[7vw] lg:text-[4.6vw] xl:text-[72px]">
              A curated preview.
              <br />
              <span className="italic text-teal">Not the full catalogue.</span>
            </h3>
          </Reveal>

          <Reveal delay={200} className="lg:col-span-5">
            <p className="max-w-md font-light text-base md:text-lg leading-relaxed text-ink/70">
              A small, considered selection from each collection. Every frame
              carries EyegisGuard™, a 2-year warranty and a 60-day comfort
              guarantee.
            </p>
          </Reveal>
        </div>

        {/* Filter + controls */}
        <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-t border-ink/10 pt-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
            <span className="mr-2 font-eyebrow text-[10px] text-ink/50">Filter</span>
            {FILTERS.map((f) => {
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
                  {f}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-ink/20 text-ink transition-all hover:bg-ink hover:text-paper"
              aria-label="Scroll left"
            >
              <IconArrow className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-ink/20 text-ink transition-all hover:bg-ink hover:text-paper"
              aria-label="Scroll right"
            >
              <IconArrow />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollerRef}
          className="mt-12 -mx-6 md:-mx-10 lg:-mx-14 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 md:px-10 lg:px-14 pb-6"
          style={{ scrollbarWidth: "thin" }}
        >
          {visible.map((p, i) => (
            <ProductCard key={p.id} p={p} i={i} />
          ))}
          {visible.length === 0 && (
            <div className="w-full py-24 text-center font-eyebrow text-ink/50">
              No frames match this filter.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p, i }: { p: Product; i: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <article
      ref={ref}
      data-card
      className={`group snap-start shrink-0 w-[85vw] sm:w-[420px] md:w-[440px] lg:w-[460px] transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${i * 80}ms` }}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-warm">
        <img
          src={p.image}
          alt={p.imageAlt}
          width={1200}
          height={1500}
          loading="lazy"
          className="h-full w-full object-cover img-hover group-hover:img-hover-in"
        />
        <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
          {p.bestSeller && (
            <span className="rounded-full bg-paper/90 px-3 py-1 font-eyebrow text-[9px] text-ink ring-1 ring-ink/10 backdrop-blur">
              Best Seller
            </span>
          )}
          {p.newest && (
            <span className="rounded-full bg-teal/90 px-3 py-1 font-eyebrow text-[9px] text-paper ring-1 ring-teal/40 backdrop-blur">
              Newest
            </span>
          )}
        </div>
        <div className="absolute right-4 bottom-4 rounded-full bg-paper/85 px-3 py-1 font-eyebrow text-[9px] text-ink ring-1 ring-ink/10 backdrop-blur">
          EyegisGuard™
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-eyebrow text-[10px] text-ink/50">
            {p.collection} · {p.city}
          </span>
          <span className="h-px flex-1 bg-ink/15" />
        </div>
        <h4 className="mt-3 font-editorial text-2xl md:text-3xl text-ink">{p.name}</h4>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/65">
          {p.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-eyebrow text-[9px] text-ink/55">
          <span>2-Year Warranty</span>
          <span className="opacity-40">/</span>
          <span>60-Day Comfort Guarantee</span>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <a
            href={AMAZON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-lift group/btn inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 text-paper transition-all duration-500 hover:-translate-y-0.5 hover:bg-teal"
          >
            <span className="font-eyebrow">Buy on Amazon</span>
            <IconExternal className="opacity-80" />
          </a>
          <a
            href={`#${p.id}`}
            className="group/link inline-flex items-center gap-2 font-eyebrow text-ink/70 transition-colors hover:text-ink"
          >
            <span>Learn More</span>
            <IconArrow className="transition-transform duration-500 group-hover/link:translate-x-1" />
          </a>
        </div>
      </div>
    </article>
  );
}

/* ---------- FINAL TRANSITION ---------- */
function FinalTransition() {
  return (
    <section className="relative bg-teal-deep text-paper">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14 py-32 md:py-52 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-4 text-paper/60">
            <span className="h-px w-14 bg-paper/30" />
            <span className="font-eyebrow">A Closing Note</span>
            <span className="h-px w-14 bg-paper/30" />
          </div>
        </Reveal>

        <Reveal delay={180}>
          <h3 className="mt-12 font-editorial text-paper text-balance-tight text-[10vw] sm:text-[7vw] md:text-[5.8vw] lg:text-[5vw] xl:text-[84px] leading-[0.95]">
            Engineered for comfort.
            <br />
            <span className="italic text-mint">Designed for everyday life.</span>
          </h3>
        </Reveal>

        <Reveal delay={340}>
          <p className="mx-auto mt-8 max-w-xl font-light text-base md:text-lg leading-relaxed text-paper/70">
            Every Eyegis frame begins where fashion and optical science meet — and
            ends at your desk, your studio, your commute, your home.
          </p>
        </Reveal>

        <Reveal delay={480}>
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#technology"
              className="cta-lift group inline-flex items-center justify-between gap-6 rounded-full bg-paper px-8 py-5 min-w-[280px] text-teal-deep shadow-[0_20px_50px_-20px_rgba(249,249,249,0.35)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-sand-warm"
            >
              <span className="font-eyebrow">Discover the Technology</span>
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
              <span className="font-eyebrow">Shop on Amazon</span>
              <IconExternal className="opacity-70 transition-opacity group-hover:opacity-100" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={640}>
          <div className="mt-16 flex items-center justify-center gap-4 font-eyebrow text-[9px] text-paper/50">
            <span>EST · MMXXIV</span>
            <span className="block h-px w-10 bg-paper/25" />
            <span>São Paulo · Paris · Porto</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- MAIN ---------- */
export function Collection() {
  return (
    <section id="collections" className="relative">
      {/* INTRO */}
      <div className="bg-paper text-ink border-t border-ink/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 pt-32 md:pt-44 pb-16 md:pb-24">
          <Reveal>
            <div className="flex items-center gap-4 text-ink/60">
              <span className="font-eyebrow text-teal">§ 06</span>
              <span className="h-px w-8 bg-ink/25" />
              <span className="font-eyebrow">Collections</span>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <Reveal delay={120} className="lg:col-span-8">
              <h2 className="font-editorial text-ink text-balance-tight text-[12vw] sm:text-[9vw] md:text-[7vw] lg:text-[6vw] xl:text-[92px] leading-[0.9]">
                Find the frame
                <br />
                <span className="italic text-teal">that fits your lifestyle.</span>
              </h2>
            </Reveal>
            <Reveal delay={260} className="lg:col-span-4">
              <p className="font-light text-base md:text-lg leading-relaxed text-ink/75 max-w-md">
                Eyegis offers thoughtfully designed collections for different
                personalities, lifestyles and daily routines.
                <span className="mt-3 block text-ink/55">
                  Each frame combines timeless aesthetics, lightweight comfort
                  and premium blue-light filtering technology.
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Three collection blocks */}
      {COLLECTIONS.map((c, i) => (
        <CollectionSection key={c.id} c={c} i={i} />
      ))}

      {/* Product preview */}
      <ProductPreview />

      {/* Final transition */}
      <FinalTransition />
    </section>
  );
}
