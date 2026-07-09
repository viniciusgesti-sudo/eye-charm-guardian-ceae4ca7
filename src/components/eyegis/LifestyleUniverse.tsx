import { useEffect, useRef, useState, type ElementType } from "react";

import lifeCreative from "@/assets/life-creative.jpg";
import lifeBusiness from "@/assets/life-business.jpg";
import lifeGaming from "@/assets/life-gaming.jpg";
import lifeStudent from "@/assets/life-student.jpg";
import lifeTravel from "@/assets/life-travel.jpg";
import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

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
      <path d="M3 19 13 5l4 3-10 14H3v-3Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path d="M13 5l2-2 4 3-2 2" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
function IconBusiness() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x="3" y="7" width="16" height="11" stroke="currentColor" strokeWidth="1" />
      <path d="M8 7V4h6v3M3 12h16" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
function IconGaming() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x="3" y="6" width="16" height="10" rx="5" stroke="currentColor" strokeWidth="1" />
      <path d="M7 11h3M8.5 9.5v3M14 10.5h.01M16 12.5h.01" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
function IconStudent() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M2 8l9-4 9 4-9 4-9-4Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path d="M6 10v5c0 1.5 2.5 3 5 3s5-1.5 5-3v-5M19 8v6" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
function IconTravel() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M3 14l16-8-4 12-4-4-4 3-1-2-3-1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
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
  image: string;
  imageAlt: string;
  align: "left" | "right";
  tone: Tone;
  Icon: React.FC;
};

const PANELS: Panel[] = [
  {
    index: "01",
    eyebrow: "Creative Professionals",
    tags: ["Photography", "Architecture", "Graphic Design", "Video Editing", "Fashion", "Creative Studios"],
    title: "Designed for",
    script: "creators.",
    body:
      "Long hours creating deserve uncompromised visual comfort. Color accuracy stays honest — from the first sketch to the final export.",
    cta: "Explore Creative Collection",
    image: lifeCreative,
    imageAlt: "Creative professional in a linen shirt reviewing prints in a sunlit studio",
    align: "right",
    tone: "paper",
    Icon: IconCreative,
  },
  {
    index: "02",
    eyebrow: "Business Professionals",
    tags: ["Executives", "Finance", "Developers", "Consultants", "Remote Workers"],
    title: "Designed for",
    script: "performance.",
    body:
      "Stay focused through meetings, spreadsheets, presentations and long workdays — from Faria Lima to a hotel desk in Paris.",
    cta: "Explore Business Collection",
    image: lifeBusiness,
    imageAlt: "Executive at a marble desk overlooking the São Paulo skyline at dusk",
    align: "left",
    tone: "champagne",
    Icon: IconBusiness,
  },
  {
    index: "03",
    eyebrow: "Gaming",
    tags: ["Curved Monitor", "Mechanical Keyboard", "Architectural Lighting", "Modern Apartment"],
    title: "Designed for",
    script: "immersion.",
    body:
      "Long sessions demand clarity, comfort and focus. Reduced glare and stable contrast — without color shift, without theatrics.",
    cta: "Explore Gaming Collection",
    image: lifeGaming,
    imageAlt: "Luxury minimal gaming setup in a modern apartment with warm architectural lighting",
    align: "right",
    tone: "teal",
    Icon: IconGaming,
  },
  {
    index: "04",
    eyebrow: "Students",
    tags: ["Laptop", "Tablet", "Notebook", "Natural Light", "Modern Library"],
    title: "Designed for",
    script: "learning.",
    body:
      "From morning lectures to late-night study sessions — visual comfort that lets ideas, not fatigue, lead the day.",
    cta: "Explore Student Collection",
    image: lifeStudent,
    imageAlt: "Student reading in a sunlit university library beside a laptop and tablet",
    align: "left",
    tone: "paper",
    Icon: IconStudent,
  },
  {
    index: "05",
    eyebrow: "Travel & Digital Nomads",
    tags: ["Airport Lounge", "Luxury Hotel", "Coffee Shop", "Business Class"],
    title: "Designed to",
    script: "move.",
    body:
      "Your work travels with you. Your comfort should too. A lightweight TR90 frame, a considered case, a lens that behaves the same at 35,000 feet.",
    cta: "Discover Travel Collection",
    image: lifeTravel,
    imageAlt: "Traveler in a wool coat working on a laptop in a dusk airport lounge",
    align: "right",
    tone: "champagne",
    Icon: IconTravel,
  },
];

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
          <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[5/6] lg:aspect-[4/5]">
            <img
              src={panel.image}
              alt={panel.imageAlt}
              width={1800}
              height={1200}
              loading="lazy"
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
            <h3 className={`mt-8 font-editorial leading-[0.92] text-balance-tight text-[13vw] sm:text-[9vw] lg:text-[5.4vw] xl:text-[86px] ${t.text}`}>
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
              href="#collections"
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
export function LifestyleUniverse() {
  return (
    <section id="lifestyles" className="relative">
      {/* ============ INTRO ============ */}
      <div className="bg-paper text-ink">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 pt-32 md:pt-44 pb-16 md:pb-24 border-t border-ink/10">
          <Reveal>
            <div className="flex items-center gap-4 text-ink/60">
              <span className="font-eyebrow text-teal">§ 05</span>
              <span className="h-px w-8 bg-ink/25" />
              <span className="font-eyebrow">Designed for Every Digital Life</span>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <Reveal delay={120} className="lg:col-span-8">
              <h2 className="font-editorial text-ink text-balance-tight text-[12vw] sm:text-[9vw] md:text-[7vw] lg:text-[6vw] xl:text-[96px] leading-[0.9]">
                Whatever your screen.
                <br />
                <span className="italic text-teal">Wherever your ambition.</span>
              </h2>
            </Reveal>
            <Reveal delay={260} className="lg:col-span-4">
              <p className="font-light text-base md:text-lg leading-relaxed text-ink/75 max-w-md">
                Every profession, every passion and every creative journey deserves
                visual comfort without compromising style.
                <span className="mt-3 block text-ink/55">
                  Eyegis is designed to support the modern digital life — from
                  focused work to creative expression, from competitive play to
                  everyday productivity.
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ============ PANELS ============ */}
      {PANELS.map((p, i) => (
        <LifestylePanel key={p.index} panel={p} i={i} />
      ))}

      {/* ============ FINAL CTA — TRANSITION TO COLLECTIONS ============ */}
      <div className="relative bg-paper text-ink">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14 py-32 md:py-48 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-4 text-ink/60">
              <span className="h-px w-14 bg-ink/25" />
              <span className="font-eyebrow">A Frame For Every Life</span>
              <span className="h-px w-14 bg-ink/25" />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h3 className="mt-12 font-editorial text-ink text-balance-tight text-[10vw] sm:text-[7vw] md:text-[5.6vw] lg:text-[4.8vw] xl:text-[76px] leading-[0.95]">
              Find the collection
              <br />
              <span className="italic text-teal">that fits your lifestyle.</span>
            </h3>
          </Reveal>

          <Reveal delay={360}>
            <p className="mx-auto mt-8 max-w-xl font-light text-base md:text-lg leading-relaxed text-ink/65">
              Three families. One optical philosophy. Shaped for the way you live,
              work and see the world.
            </p>
          </Reveal>

          <Reveal delay={520}>
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
              {[
                { label: "Men", href: "#men", variant: "teal" as const },
                { label: "Women", href: "#women", variant: "sand" as const },
                { label: "Kids & Teens", href: "#kids", variant: "outline" as const },
              ].map((b) => (
                <a
                  key={b.label}
                  href={b.href}
                  className={`cta-lift group inline-flex items-center justify-between gap-6 rounded-full px-8 py-5 min-w-[260px] transition-all duration-500 ${
                    b.variant === "teal"
                      ? "bg-teal text-paper shadow-[0_20px_50px_-20px_rgba(0,75,87,0.6)] hover:bg-teal-deep hover:-translate-y-0.5"
                      : b.variant === "sand"
                      ? "bg-sand text-ink shadow-[0_20px_50px_-20px_rgba(226,209,195,0.9)] hover:bg-sand-warm hover:-translate-y-0.5"
                      : "bg-transparent text-ink ring-1 ring-ink/25 hover:bg-ink hover:text-paper hover:-translate-y-0.5"
                  }`}
                >
                  <span className="font-eyebrow">Explore {b.label}</span>
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
              <span>Continue</span>
              <span className="block h-px w-10 bg-ink/25" />
              <span>The Collections</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
