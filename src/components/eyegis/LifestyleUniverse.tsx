import { useEffect, useRef, useState, type ElementType } from "react";
import { useParams } from "@tanstack/react-router";

import lifeCreative from "@/assets/life-creative.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import lifeBusiness from "@/assets/life-business-man.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import lifeGaming from "@/assets/life-gaming.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import lifeStudent from "@/assets/life-student-kid.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import lifeTravel from "@/assets/life-travel-man.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import { Picture, type PictureSource } from "./Picture";
import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

/* ---------- Reveal ---------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(true);
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
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
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

/* ---------- Icons ---------- */
function IconCreative() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M3 19 13 5l4 3-10 14H3v-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M13 5l2-2 4 3-2 2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function IconBusiness() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x="3" y="7" width="16" height="11" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7V4h6v3M3 12h16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function IconGaming() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x="3" y="6" width="16" height="10" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 11h3M8.5 9.5v3M14 10.5h.01M16 12.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconStudent() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M2 8l9-4 9 4-9 4-9-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 10v5c0 1.5 2.5 3 5 3s5-1.5 5-3v-5M19 8v6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function IconTravel() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M3 14l16-8-4 12-4-4-4 3-1-2-3-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Data ---------- */
type Tone = "paper" | "champagne" | "teal";
type Panel = {
  index: string;
  eyebrow: string;
  tags: string[];
  title: string;
  script: string;
  body: string;
  cta: string;
  image: PictureSource;
  imageAlt: string;
  align: "left" | "right";
  tone: Tone;
  Icon: React.FC;
};

import lifestyleData from "@/content/lifestyle.json";
import { useContentDocument } from "@/lib/cms";

type LifestyleCopy = {
  sectionEyebrow: string;
  headline1: string;
  headline2: string;
  introBody1: string;
  introBody2: string;
  panels: {
    eyebrow: string;
    tags: string[];
    title: string;
    script: string;
    body: string;
    cta: string;
    imageAlt: string;
  }[];
  finalEyebrow: string;
  finalHeadline1: string;
  finalHeadline2: string;
  finalBody: string;
  buttonPrefix: string;
  btnMen: string;
  btnWomen: string;
  btnKids: string;
  continueLabel: string;
  continueTarget: string;
};

const LIFESTYLE_COPY = lifestyleData as Record<Lang, LifestyleCopy>;

/* Panel/Tone types are declared above near the copy dictionary. */

export type LifestyleAudience = "men" | "women" | "kids";

const PANEL_META = [
  { image: lifeCreative, align: "right" as const, tone: "paper" as const, Icon: IconCreative, audience: "women" as LifestyleAudience },
  { image: lifeBusiness, align: "left" as const, tone: "champagne" as const, Icon: IconBusiness, audience: "men" as LifestyleAudience },
  { image: lifeGaming, align: "right" as const, tone: "teal" as const, Icon: IconGaming, audience: "men" as LifestyleAudience },
  { image: lifeStudent, align: "left" as const, tone: "paper" as const, Icon: IconStudent, audience: "kids" as LifestyleAudience },
  { image: lifeTravel, align: "right" as const, tone: "champagne" as const, Icon: IconTravel, audience: "men" as LifestyleAudience },
];

function buildPanels(copy: LifestyleCopy, audience?: LifestyleAudience): Panel[] {
  return copy.panels
    .map((p, i) => ({
      index: String(i + 1).padStart(2, "0"),
      eyebrow: p.eyebrow,
      tags: p.tags,
      title: p.title,
      script: p.script,
      body: p.body,
      cta: p.cta,
      image: PANEL_META[i].image,
      imageAlt: p.imageAlt,
      align: PANEL_META[i].align,
      tone: PANEL_META[i].tone,
      Icon: PANEL_META[i].Icon,
      _audience: PANEL_META[i].audience,
    }))
    .filter((p) => (audience ? p._audience === audience : true))
    .map(({ _audience: _a, ...rest }) => rest);
}



const TONE_STYLES: Record<Tone, { bg: string; text: string; muted: string; hairline: string; script: string; eyebrow: string; ctaBase: string; ctaHover: string; badge: string }> = {
  paper: {
    bg: "bg-paper",
    text: "text-ink",
    muted: "text-ink/65",
    hairline: "bg-ink/20",
    script: "text-teal",
    eyebrow: "text-ink/50",
    ctaBase: "text-ink",
    ctaHover: "hover:text-teal",
    badge: "text-ink/60 ring-ink/15",
  },
  champagne: {
    bg: "bg-paper-warm",
    text: "text-ink",
    muted: "text-ink/65",
    hairline: "bg-ink/20",
    script: "text-teal",
    eyebrow: "text-ink/55",
    ctaBase: "text-ink",
    ctaHover: "hover:text-teal",
    badge: "text-ink/65 ring-ink/15",
  },
  teal: {
    bg: "bg-teal-deep",
    text: "text-paper",
    muted: "text-paper/70",
    hairline: "bg-paper/25",
    script: "text-mint",
    eyebrow: "text-paper/60",
    ctaBase: "text-paper",
    ctaHover: "hover:text-mint",
    badge: "text-paper/70 ring-paper/25",
  },
};

/* ---------- One panel ---------- */
function LifestylePanel({ panel, i }: { panel: Panel; i: number }) {
  const t = TONE_STYLES[panel.tone];
  const { ref, visible } = useReveal<HTMLDivElement>();

  const textOrder = panel.align === "right" ? "lg:order-1" : "lg:order-2";
  const imageOrder = panel.align === "right" ? "lg:order-2" : "lg:order-1";

  return (
    <section
      ref={ref}
      className={`${t.bg} ${t.text} relative overflow-hidden`}
    >
      {/* subtle top hairline between panels */}
      {i > 0 && <div className={`absolute inset-x-6 top-0 h-px ${t.hairline} opacity-40 md:inset-x-14`} />}

      <div className="mx-auto grid min-h-[92vh] max-w-[1600px] grid-cols-1 items-center gap-12 px-6 py-28 md:px-10 md:py-36 lg:grid-cols-12 lg:gap-16 lg:px-14">
        {/* IMAGE */}
        <div className={`relative ${imageOrder} lg:col-span-7`}>
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-teal-deep/10 md:aspect-[5/6] lg:aspect-[4/5]">
            <Picture
              source={panel.image}
              alt={panel.imageAlt}
              sizes="(min-width:1024px) 58vw, 100vw"
              className={`h-full w-full object-cover transition-[transform,filter] duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                visible ? "scale-100" : "scale-[1.06]"
              }`}
              style={{ filter: visible ? "none" : "brightness(0.92)" }}
            />
            {/* index marker overlay */}
            <div className={`absolute left-5 top-5 flex items-center gap-3 font-eyebrow text-[10px] ${panel.tone === "teal" ? "text-paper/80" : "text-paper/85"} drop-shadow`}>
              <span>N° {panel.index}</span>
              <span className="h-px w-8 bg-current opacity-60" />
              <span>{panel.eyebrow}</span>
            </div>
          </div>
        </div>

        {/* COPY */}
        <div className={`${textOrder} lg:col-span-5`}>
          <Reveal delay={120}>
            <div className={`flex items-center gap-3 font-eyebrow ${t.eyebrow}`}>
              <span className={t.script}>
                <panel.Icon />
              </span>
              <span>{panel.eyebrow}</span>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <h3 className={`mt-8 font-editorial leading-[0.92] text-balance-tight break-words hyphens-auto text-fluid-display ${t.text}`}>
              {panel.title}
              <br />
              <span className={`italic ${t.script}`}>{panel.script}</span>
            </h3>
          </Reveal>

          <Reveal delay={340}>
            <p className={`mt-8 max-w-md font-light text-base md:text-lg leading-relaxed ${t.muted}`}>
              {panel.body}
            </p>
          </Reveal>

          <Reveal delay={440}>
            <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-2">
              {panel.tags.map((tag) => (
                <li
                  key={tag}
                  className={`font-eyebrow text-[9px] px-3 py-1.5 rounded-full ring-1 ${t.badge}`}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={560}>
            <a
              href="/#collections"
              className={`group mt-12 inline-flex items-center gap-5 ${t.ctaBase} ${t.ctaHover} transition-colors duration-500`}
            >
              <span className="font-eyebrow">{panel.cta}</span>
              <span className="relative block h-px w-16 overflow-hidden bg-current/40">
                <span className="absolute inset-0 origin-left scale-x-0 bg-current transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              </span>
              <span className="inline-block translate-x-0 transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Main ---------- */
export function LifestyleUniverse({ audience, compact = false }: { audience?: LifestyleAudience; compact?: boolean } = {}) {
  const { lang } = useI18n();
  const params = useParams({ strict: false }) as { locale?: string };
  const locale = params.locale ?? "br";
  const content = useContentDocument<typeof lifestyleData>("lifestyle", lifestyleData);
  const copy = (content as Record<Lang, LifestyleCopy>)[lang] ?? LIFESTYLE_COPY[lang];
  const panels = buildPanels(copy, audience);

  if (compact) {
    return (
      <section id="lifestyles" className="relative bg-paper text-ink">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14 py-20 md:py-28 border-t border-ink/10">
          <Reveal>
            <div className="flex items-center gap-4 text-ink/60">
              <span className="font-eyebrow text-teal">§ 05</span>
              <span className="h-px w-8 bg-ink/25" />
              <span className="font-eyebrow">{copy.sectionEyebrow}</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-6 max-w-3xl font-editorial text-ink text-balance-tight text-fluid-display leading-[0.95]">
              {copy.headline1} <span className="italic text-teal">{copy.headline2}</span>
            </h2>
          </Reveal>

          <ul className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
            {panels.map((p) => (
              <li key={p.index} className="group">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-teal-deep/10">
                  <Picture
                    source={p.image}
                    alt={p.imageAlt}
                    sizes="(min-width:768px) 30vw, 50vw"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-3 top-3 font-eyebrow text-[9px] text-paper/85 drop-shadow">N° {p.index}</span>
                </div>
                <div className="mt-4 flex items-center gap-2 font-eyebrow text-[10px] text-ink/60">
                  <span className="text-teal"><p.Icon /></span>
                  <span>{p.eyebrow}</span>
                </div>
                <p className="mt-2 font-light text-sm md:text-base leading-snug text-ink/75">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section id="lifestyles" className="relative">

      {/* ============ INTRO ============ */}
      <div className="bg-paper text-ink">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 pt-32 md:pt-44 pb-16 md:pb-24 border-t border-ink/10">
          <Reveal>
            <div className="flex items-center gap-4 text-ink/60">
              <span className="font-eyebrow text-teal">§ 05</span>
              <span className="h-px w-8 bg-ink/25" />
              <span className="font-eyebrow">{copy.sectionEyebrow}</span>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <Reveal delay={120} className="lg:col-span-8">
              <h2 className="font-editorial text-ink text-balance-tight text-fluid-hero leading-[0.9]">
                {copy.headline1}
                <br />
                <span className="italic text-teal">{copy.headline2}</span>
              </h2>
            </Reveal>
            <Reveal delay={260} className="lg:col-span-4">
              <p className="font-light text-base md:text-lg leading-relaxed text-ink/75 max-w-md">
                {copy.introBody1}
                <span className="mt-3 block text-ink/55">
                  {copy.introBody2}
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ============ PANELS ============ */}
      {panels.map((p, i) => (
        <LifestylePanel key={p.index} panel={p} i={i} />
      ))}


      {/* ============ FINAL CTA — TRANSITION TO COLLECTIONS ============ */}
      <div className="relative bg-paper text-ink">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14 py-32 md:py-48 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-4 text-ink/60">
              <span className="h-px w-14 bg-ink/25" />
              <span className="font-eyebrow">{copy.finalEyebrow}</span>
              <span className="h-px w-14 bg-ink/25" />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h3 className="mt-12 font-editorial text-ink text-balance-tight text-fluid-display leading-[0.95]">
              {copy.finalHeadline1}
              <br />
              <span className="italic text-teal">{copy.finalHeadline2}</span>
            </h3>
          </Reveal>

          <Reveal delay={360}>
            <p className="mx-auto mt-8 max-w-xl font-light text-base md:text-lg leading-relaxed text-ink/65">
              {copy.finalBody}
            </p>
          </Reveal>

          <Reveal delay={520}>
            <div className="mt-14 flex flex-col md:flex-row flex-wrap items-stretch md:items-center justify-center gap-4">
              {[
                { label: copy.btnMen, href: `/${locale}/men`, variant: "teal" as const },
                { label: copy.btnWomen, href: `/${locale}/women`, variant: "sand" as const },
                { label: copy.btnKids, href: `/${locale}/kids`, variant: "outline" as const },
              ].map((b) => (
                <a
                  key={b.label}
                  href={b.href}
                  className={`cta-lift group inline-flex items-center justify-between gap-6 rounded-full px-8 py-5 min-w-[240px] max-w-full transition-all duration-500 ${
                    b.variant === "teal"
                      ? "bg-teal text-paper shadow-[0_20px_50px_-20px_rgba(0,75,87,0.6)] hover:bg-teal-deep hover:-translate-y-0.5"
                      : b.variant === "sand"
                      ? "bg-sand text-ink shadow-[0_20px_50px_-20px_rgba(226,209,195,0.9)] hover:bg-sand-warm hover:-translate-y-0.5"
                      : "bg-transparent text-ink ring-1 ring-ink/25 hover:bg-ink hover:text-paper hover:-translate-y-0.5"
                  }`}
                >
                  <span className="font-eyebrow">{copy.buttonPrefix} {b.label}</span>
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-full transition-transform duration-500 group-hover:translate-x-1 ${
                      b.variant === "teal"
                        ? "bg-paper/10"
                        : b.variant === "sand"
                        ? "bg-ink/10"
                        : "bg-ink/10 group-hover:bg-paper/15"
                    }`}
                    aria-hidden
                  >
                    →
                  </span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={680}>
            <div className="mt-16 flex items-center justify-center gap-4 font-eyebrow text-[9px] text-ink/50">
              <span>{copy.continueLabel}</span>
              <span className="block h-px w-10 bg-ink/25" />
              <span>{copy.continueTarget}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
