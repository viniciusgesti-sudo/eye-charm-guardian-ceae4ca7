import { useEffect, useRef, useState } from "react";

import universePortrait from "@/assets/universe-portrait.jpg";
import universeLens from "@/assets/products/solene-macro.jpg";
import universeScience from "@/assets/universe-science.jpg";
import universeEyewear from "@/assets/products/collection-family.jpg";

/* ------------------------------------------------------------------
   Reveal on scroll — subtle editorial fade + rise
   ------------------------------------------------------------------ */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  as: As = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Tag = As as any;
  return (
    <Tag
      ref={ref as any}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Icons — minimal outline
   ------------------------------------------------------------------ */
function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l8 3v6c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V6l8-3z" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
function IconFlask() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 3h6M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21.5h11.6a2 2 0 0 0 1.7-3L14 9V3" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
function IconLens() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="8" cy="14" r="4" stroke="currentColor" strokeWidth="1" />
      <circle cx="16" cy="14" r="4" stroke="currentColor" strokeWidth="1" />
      <path d="M12 14h.01M4 10l2-3h12l2 3" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Panel — editorial luxury tile
   ------------------------------------------------------------------ */
type Panel = {
  index: string;
  eyebrow: string;
  headline: string;
  description: React.ReactNode;
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
  icon: React.ReactNode;
  tone: "paper" | "champagne";
  aspect: string; // Tailwind aspect class
};

function EditorialPanel({ panel, delay = 0 }: { panel: Panel; delay?: number }) {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <article
      ref={ref as any}
      className="group relative"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={`relative overflow-hidden rounded-[6px] ${panel.aspect} ${
          panel.tone === "champagne" ? "bg-[var(--paper-warm)]" : "bg-[var(--paper)]"
        } shadow-[0_1px_0_rgba(29,37,45,0.04)] transition-[box-shadow,transform] duration-700 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_40px_60px_-40px_rgba(29,37,45,0.25)]`}
      >
        <img
          src={panel.image}
          alt={panel.imageAlt}
          loading="lazy"
          className={`h-full w-full object-cover transition-[transform,filter] duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
            visible ? "scale-100" : "scale-[1.06]"
          } group-hover:scale-[1.05]`}
        />
        {/* Index marker */}
        <div className="absolute left-6 top-6 flex items-center gap-3 text-paper mix-blend-difference">
          <span className="font-eyebrow text-[10px] tracking-[0.28em]">
            {panel.index}
          </span>
          <span className="h-px w-8 bg-paper/70" />
        </div>
        {/* Icon marker */}
        <div className="absolute right-6 top-6 text-paper mix-blend-difference opacity-90">
          {panel.icon}
        </div>
      </div>

      {/* Editorial caption */}
      <div className="mt-8 md:mt-10 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4">
          <span className="font-eyebrow text-ink/60">{panel.eyebrow}</span>
        </div>
        <div className="col-span-12 md:col-span-8 max-w-[46ch]">
          <h3 className="font-editorial text-ink text-3xl md:text-[38px] leading-[1] tracking-[-0.02em]">
            {panel.headline}
          </h3>
          <p className="mt-5 text-[15px] leading-[1.7] text-ink/70">
            {panel.description}
          </p>
          <a
            href={panel.href}
            className="mt-8 inline-flex items-center gap-3 font-eyebrow text-ink group/cta"
          >
            <span className="relative">
              {panel.cta}
              <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-100 bg-ink/40 transition-transform duration-500 group-hover/cta:scale-x-0" />
              <span className="absolute inset-x-0 -bottom-1 h-px origin-right scale-x-0 bg-ink transition-transform duration-500 group-hover/cta:origin-left group-hover/cta:scale-x-100" />
            </span>
            <span
              aria-hidden="true"
              className="inline-block translate-x-0 transition-transform duration-500 group-hover/cta:translate-x-1.5"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------
   Section
   ------------------------------------------------------------------ */
export function Universe() {
  const panels: Panel[] = [
    {
      index: "Panel 01",
      eyebrow: "EyegisGuard™",
      headline: "Our proprietary technology.",
      description:
        "Selective blue-light filtering designed to preserve natural colors while reducing unnecessary visual stress.",
      cta: "Learn More",
      href: "#eyegisguard",
      image: universeLens,
      imageAlt: "Macro photograph of a single premium optical lens catching a soft teal reflection",
      icon: <IconShield />,
      tone: "paper",
      aspect: "aspect-[4/5]",
    },
    {
      index: "Panel 02",
      eyebrow: "Honest Science™",
      headline: "Evidence before marketing.",
      description: (
        <>
          No exaggerated promises. No pseudoscience. Only transparent,
          evidence-based optical engineering.
        </>
      ),
      cta: "Explore the Science",
      href: "#honest-science",
      image: universeScience,
      imageAlt: "Minimal optical laboratory with a brass microscope on a concrete bench",
      icon: <IconFlask />,
      tone: "champagne",
      aspect: "aspect-[4/5]",
    },
    {
      index: "Panel 03",
      eyebrow: "Choose Your Lens",
      headline: "Find your perfect lens.",
      description:
        "Compare every Eyegis lens and discover the right balance between protection, comfort and style.",
      cta: "Choose Your Lens",
      href: "#lenses",
      image: universeEyewear,
      imageAlt: "Editorial flat lay of three premium acetate eyewear frames on warm linen",
      icon: <IconLens />,
      tone: "paper",
      aspect: "aspect-[4/5]",
    },
  ];

  return (
    <section
      id="universe"
      aria-labelledby="universe-title"
      className="relative bg-[var(--paper)] text-ink"
    >
      {/* --------- Editorial title band --------- */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 pt-32 md:pt-40 lg:pt-48">
        <Reveal className="flex items-center gap-4">
          <span className="h-px w-10 bg-ink/30" />
          <span className="font-eyebrow text-ink/60">Chapter III</span>
        </Reveal>

        <Reveal delay={120}>
          <h2
            id="universe-title"
            className="mt-8 font-editorial text-center text-ink text-balance-tight leading-[0.92] tracking-[-0.02em] text-[13vw] sm:text-[10vw] md:text-[7.5vw] lg:text-[112px]"
          >
            The Eyegis <span className="italic text-teal">Universe</span>
          </h2>
        </Reveal>

        <Reveal delay={220} className="mt-10 flex justify-center">
          <span className="font-eyebrow text-ink/50">
            Vision · Science · Style
          </span>
        </Reveal>
      </div>

      {/* --------- Editorial intro : two-column asymmetric --------- */}
      <div className="mx-auto mt-24 md:mt-32 lg:mt-40 max-w-[1600px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left — Editorial content (7 col, offset 1) */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-1 order-2 lg:order-1">
            <Reveal delay={80} className="flex items-center gap-4">
              <span className="font-eyebrow text-ink/50">A Note on Purpose</span>
              <span className="h-px w-8 bg-ink/25" />
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 font-editorial text-ink text-balance-tight leading-[1.02] tracking-[-0.02em] text-[36px] md:text-[46px] lg:text-[54px] max-w-[18ch]">
                At Eyegis, we believe eye protection should never come at the
                expense of <span className="italic text-teal">style</span>.
              </p>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-12 max-w-[62ch] space-y-6 text-[16px] md:text-[17px] leading-[1.75] text-ink/75">
                <p>
                  Our mission is simple: protect the eyes of the digital
                  generation through scientifically engineered lenses designed
                  to be worn every day.
                </p>
                <p>
                  We combine optical engineering, honest science and thoughtful
                  design to create products that help people work, create and
                  play more comfortably — without compromising style.
                </p>
              </div>
            </Reveal>

            <Reveal delay={380}>
              <div className="mt-14 grid grid-cols-3 gap-8 max-w-lg">
                {[
                  { k: "Est.", v: "MMXXIV" },
                  { k: "Ateliers", v: "SP · PAR" },
                  { k: "Lenses", v: "9 series" },
                ].map((s) => (
                  <div key={s.k} className="flex flex-col gap-2 border-t border-ink/15 pt-4">
                    <span className="font-eyebrow text-ink/50 text-[10px]">
                      {s.k}
                    </span>
                    <span className="font-editorial text-ink text-lg tracking-tight">
                      {s.v}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — Lifestyle image (5 col) */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 order-1 lg:order-2">
            <Reveal delay={40}>
              <figure className="relative">
                <div className="relative overflow-hidden rounded-[6px] aspect-[4/5] bg-[var(--paper-warm)]">
                  <img
                    src={universePortrait}
                    alt="An Eyegis wearer resting by a window in a minimal concrete and oak interior, Paris"
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="mt-5 flex items-center justify-between font-eyebrow text-ink/55">
                  <span>Solène — Le Marais, Paris</span>
                  <span>Portrait N°04</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>

      {/* --------- Section transition rule --------- */}
      <div className="mx-auto mt-32 md:mt-40 lg:mt-48 max-w-[1600px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-12 gap-10 items-end">
          <Reveal className="col-span-12 md:col-span-6 flex items-center gap-4">
            <span className="font-eyebrow text-ink/50">Three Principles</span>
            <span className="h-px w-16 bg-ink/25" />
          </Reveal>
          <Reveal delay={120} className="col-span-12 md:col-span-6 md:text-right">
            <p className="font-editorial text-ink text-2xl md:text-3xl tracking-[-0.01em] leading-tight max-w-[32ch] md:ml-auto">
              Technology, science and style — quietly held in balance.
            </p>
          </Reveal>
        </div>
      </div>

      {/* --------- Editorial panels grid --------- */}
      <div className="mx-auto mt-20 md:mt-28 max-w-[1600px] px-6 md:px-10 lg:px-14 pb-40 md:pb-48">
        {/* Asymmetric editorial grid — not equal-height cards */}
        <div className="grid grid-cols-12 gap-x-8 lg:gap-x-14 gap-y-28 md:gap-y-36">
          {/* Panel 01 — column span 5, top */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-1">
            <EditorialPanel panel={panels[0]} />
          </div>

          {/* Panel 02 — column span 6, offset right, pushed down */}
          <div className="col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-7 lg:mt-32">
            <EditorialPanel panel={panels[1]} delay={80} />
          </div>

          {/* Panel 03 — column span 7, centered-ish, wider */}
          <div className="col-span-12 md:col-span-12 lg:col-span-7 lg:col-start-3">
            <EditorialPanel panel={panels[2]} delay={40} />
          </div>
        </div>
      </div>

      {/* --------- Champagne closing rule --------- */}
      <div className="bg-[var(--paper-warm)]">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 py-24 md:py-28 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <Reveal>
            <p className="font-editorial text-ink text-3xl md:text-4xl tracking-[-0.01em] leading-[1.05] max-w-[24ch]">
              Continue into the science that makes it possible.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <a
              href="#honest-science"
              className="group inline-flex items-center gap-4 font-eyebrow text-ink"
            >
              <span className="relative">
                Read Honest Science™
                <span className="absolute inset-x-0 -bottom-1 h-px bg-ink/40" />
              </span>
              <span
                aria-hidden="true"
                className="grid h-10 w-10 place-items-center rounded-full border border-ink/25 transition-[transform,background-color,color] duration-500 group-hover:bg-ink group-hover:text-paper group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Universe;
