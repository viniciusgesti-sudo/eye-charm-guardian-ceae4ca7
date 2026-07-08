import { useEffect, useRef, useState } from "react";

import scienceLab from "@/assets/universe-science.jpg";
import scienceDevices from "@/assets/science-devices.jpg";
import scienceLensExploded from "@/assets/science-lens-exploded.jpg";

/* ------------------------------------------------------------------
   Reveal on scroll — subtle editorial fade + rise
   ------------------------------------------------------------------ */
function useReveal<T extends HTMLElement>(threshold = 0.15) {
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
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   Soft numeric counter — slow, premium
   ------------------------------------------------------------------ */
function CountUp({
  to,
  suffix = "",
  duration = 1600,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const { ref, visible } = useReveal<HTMLSpanElement>(0.3);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, to, duration]);
  const display =
    to % 1 === 0 ? Math.round(n).toString() : n.toFixed(1);
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------
   Spectrum diagram — luxury infographic
   ------------------------------------------------------------------ */
function SpectrumDiagram() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.25);

  const bands = [
    { key: "UV", label: "Ultraviolet", range: "100 – 400 nm", color: "#8E8FB3", start: 0, end: 18 },
    { key: "Visible", label: "Visible Light", range: "400 – 700 nm", color: "linear-gradient(90deg,#6A5ACD,#2E8AC9,#3DC1B8,#E9D77A,#E58A5A,#C24A4A)", start: 18, end: 78 },
    { key: "Blue", label: "Blue Light", range: "400 – 500 nm", color: "#2E8AC9", start: 18, end: 34, highlight: true },
    { key: "IR", label: "Infrared", range: "700 nm – 1 mm", color: "#B76A55", start: 78, end: 100 },
  ];

  return (
    <div ref={ref} className="w-full">
      {/* Wavelength scale */}
      <div className="flex items-baseline justify-between font-eyebrow text-ink/50 text-[10px]">
        <span>100 nm</span>
        <span>Wavelength (nm)</span>
        <span>1 mm</span>
      </div>

      {/* Spectrum bar */}
      <div className="relative mt-6 h-14 w-full rounded-[3px] bg-[var(--paper-warm)] overflow-hidden">
        {/* Full visible spectrum band (gradient) */}
        <div
          className="absolute top-0 h-full transition-[transform,opacity] duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] origin-left"
          style={{
            left: `${bands[1].start}%`,
            width: `${bands[1].end - bands[1].start}%`,
            background: bands[1].color,
            transform: visible ? "scaleX(1)" : "scaleX(0)",
            opacity: visible ? 1 : 0,
          }}
        />
        {/* UV band */}
        <div
          className="absolute top-0 h-full transition-[transform,opacity] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] origin-left"
          style={{
            left: `${bands[0].start}%`,
            width: `${bands[0].end - bands[0].start}%`,
            background: bands[0].color,
            transform: visible ? "scaleX(1)" : "scaleX(0)",
            opacity: visible ? 0.65 : 0,
            transitionDelay: "120ms",
          }}
        />
        {/* IR band */}
        <div
          className="absolute top-0 h-full transition-[transform,opacity] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] origin-right"
          style={{
            left: `${bands[3].start}%`,
            width: `${bands[3].end - bands[3].start}%`,
            background: bands[3].color,
            transform: visible ? "scaleX(1)" : "scaleX(0)",
            opacity: visible ? 0.7 : 0,
            transitionDelay: "180ms",
          }}
        />
        {/* Blue light highlight bracket */}
        <div
          className="absolute top-0 h-full border-x border-ink/40 transition-opacity duration-[1200ms]"
          style={{
            left: `${bands[2].start}%`,
            width: `${bands[2].end - bands[2].start}%`,
            opacity: visible ? 1 : 0,
            transitionDelay: "900ms",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Legends aligned to bar */}
      <div className="relative mt-4 h-8">
        {bands
          .filter((b) => b.key !== "Blue")
          .map((b, i) => {
            const center = (b.start + b.end) / 2;
            return (
              <div
                key={b.key}
                className="absolute -translate-x-1/2 text-center transition-opacity duration-1000"
                style={{
                  left: `${center}%`,
                  opacity: visible ? 1 : 0,
                  transitionDelay: `${400 + i * 120}ms`,
                }}
              >
                <span className="font-eyebrow text-ink/70 text-[10px]">{b.label}</span>
              </div>
            );
          })}
      </div>

      {/* Blue light callout */}
      <div
        className="mt-6 flex items-start gap-4 transition-[opacity,transform] duration-1000"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transitionDelay: "1100ms",
        }}
      >
        <div className="mt-1 h-3 w-3 rounded-full bg-[#2E8AC9]" aria-hidden="true" />
        <div className="max-w-md">
          <div className="font-eyebrow text-ink text-[10px]">
            Blue Light · 400 – 500 nm
          </div>
          <p className="mt-2 text-[14px] leading-[1.7] text-ink/70">
            A narrow band within the visible spectrum, present in daylight and,
            in far smaller quantities, in modern screens.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Comparison table — refined, no attacks
   ------------------------------------------------------------------ */
function ComparisonTable() {
  const rows: { topic: string; typical: string; eyegis: string }[] = [
    {
      topic: "Color Accuracy",
      typical: "Yellow tint, shifted whites",
      eyegis: "Neutral tone, true-to-life color",
    },
    {
      topic: "Visual Comfort",
      typical: "Generic filtering",
      eyegis: "Selective, wavelength-tuned filtering",
    },
    {
      topic: "Lens Quality",
      typical: "Standard polycarbonate",
      eyegis: "Optical-grade CR-39 & mineral glass",
    },
    {
      topic: "Frame Quality",
      typical: "Injection plastic",
      eyegis: "Italian acetate & Japanese titanium",
    },
    {
      topic: "Design Language",
      typical: "Utilitarian",
      eyegis: "Editorial, timeless silhouettes",
    },
    {
      topic: "Transparency",
      typical: "Broad wellness claims",
      eyegis: "Documented specifications",
    },
    {
      topic: "Scientific Approach",
      typical: "Marketing-led",
      eyegis: "Research-informed engineering",
    },
  ];

  return (
    <div className="w-full">
      {/* Header row */}
      <div className="grid grid-cols-12 gap-6 border-b border-ink/15 pb-6">
        <div className="col-span-4">
          <span className="font-eyebrow text-ink/50">Topic</span>
        </div>
        <div className="col-span-4">
          <span className="font-eyebrow text-ink/50">
            Typical Blue-Light Glasses
          </span>
        </div>
        <div className="col-span-4">
          <span className="font-eyebrow text-teal">Eyegis</span>
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-ink/10">
        {rows.map((r, i) => (
          <Reveal key={r.topic} delay={i * 60}>
            <div className="grid grid-cols-12 gap-6 py-6 md:py-7 items-baseline">
              <div className="col-span-12 md:col-span-4">
                <span className="font-editorial text-ink text-xl md:text-2xl tracking-[-0.01em]">
                  {r.topic}
                </span>
              </div>
              <div className="col-span-12 md:col-span-4">
                <span className="text-[14px] md:text-[15px] leading-[1.65] text-ink/55">
                  {r.typical}
                </span>
              </div>
              <div className="col-span-12 md:col-span-4">
                <span className="text-[14px] md:text-[15px] leading-[1.65] text-ink">
                  {r.eyegis}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Icons — thin, medical precision
   ------------------------------------------------------------------ */
const stroke = { stroke: "currentColor", strokeWidth: 1 } as const;
function IconSun() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" {...stroke} />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M19.5 4.5l-2 2M6.5 17.5l-2 2" {...stroke} />
    </svg>
  );
}
function IconScreen() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="1" {...stroke} />
      <path d="M8 20h8M12 16v4" {...stroke} />
    </svg>
  );
}
function IconEye() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" {...stroke} />
      <circle cx="12" cy="12" r="2.5" {...stroke} />
    </svg>
  );
}
function IconWave() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" {...stroke} />
    </svg>
  );
}
function IconDoc() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 3h9l4 4v14H6z" {...stroke} />
      <path d="M14 3v5h5M9 13h6M9 17h4" {...stroke} />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Section
   ------------------------------------------------------------------ */
export function HonestScience() {
  return (
    <section
      id="honest-science"
      aria-labelledby="honest-title"
      className="relative bg-[var(--paper)] text-ink"
    >
      {/* ============ Title band ============ */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 pt-32 md:pt-40 lg:pt-48">
        <Reveal className="flex items-center gap-4">
          <span className="h-px w-10 bg-ink/30" />
          <span className="font-eyebrow text-ink/60">Chapter IV · Honest Science™</span>
        </Reveal>

        <div className="mt-14 grid grid-cols-12 gap-10 lg:gap-16 items-end">
          <Reveal delay={100} className="col-span-12 lg:col-span-8">
            <h2
              id="honest-title"
              className="font-editorial text-ink text-balance-tight leading-[0.92] tracking-[-0.02em] text-[14vw] sm:text-[11vw] md:text-[8.5vw] lg:text-[128px]"
            >
              Evidence.
              <br />
              <span className="italic text-teal">Not Marketing.</span>
            </h2>
          </Reveal>

          <Reveal delay={220} className="col-span-12 lg:col-span-4">
            <p className="text-[15px] md:text-[16px] leading-[1.75] text-ink/70 max-w-md">
              Blue-light lenses can improve visual comfort — but not every claim
              made online is scientifically supported. At Eyegis we choose
              transparency over exaggerated promises.
              <span className="block mt-4 text-ink/50">
                What follows is what we know, what we suspect, and what we still
                study.
              </span>
            </p>
          </Reveal>
        </div>
      </div>

      {/* ============ Section 01 — What is Blue Light ============ */}
      <div className="mx-auto mt-32 md:mt-44 max-w-[1600px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Right — Text (order-1 on mobile) */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 order-1 lg:order-2">
            <Reveal className="flex items-center gap-3">
              <span className="font-eyebrow text-ink/50">§ 01</span>
              <span className="h-px w-8 bg-ink/25" />
              <span className="font-eyebrow text-ink/50">Spectrum</span>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="mt-8 font-editorial text-ink text-[42px] md:text-[52px] leading-[1] tracking-[-0.02em] max-w-[14ch]">
                What is <span className="italic text-teal">Blue Light?</span>
              </h3>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-8 space-y-5 text-[15px] md:text-[16px] leading-[1.75] text-ink/70">
                <p>
                  Blue light exists naturally. The sun is, by a wide margin, its
                  largest source. Digital screens emit significantly less blue
                  light than daylight.
                </p>
                <p>
                  Extended screen exposure may nonetheless contribute to digital
                  visual discomfort in some people. The picture is nuanced —
                  and so is our response to it.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Left — Diagram */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-1 order-2 lg:order-1">
            <Reveal delay={80}>
              <div className="rounded-[6px] bg-[var(--paper-warm)] p-8 md:p-12">
                <div className="flex items-center justify-between">
                  <span className="font-eyebrow text-ink/60">
                    Fig. 01 · Visible Spectrum
                  </span>
                  <IconWave />
                </div>
                <div className="mt-10">
                  <SpectrumDiagram />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ============ Section 02 — Digital Eye Strain ============ */}
      <div className="mx-auto mt-40 md:mt-52 max-w-[1600px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left — Image */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-1">
            <Reveal>
              <figure>
                <div className="relative overflow-hidden rounded-[6px] aspect-[4/5] md:aspect-square bg-[var(--paper-warm)]">
                  <img
                    src={scienceDevices}
                    alt="Overhead view of a laptop, tablet and phone on a minimal desk in soft window light"
                    loading="lazy"
                    width={1200}
                    height={1200}
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="mt-4 flex items-center justify-between font-eyebrow text-ink/55">
                  <span>Fig. 02 · Contemporary Visual Load</span>
                  <span>N°02</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* Right — Text + factors */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <Reveal className="flex items-center gap-3">
              <span className="font-eyebrow text-ink/50">§ 02</span>
              <span className="h-px w-8 bg-ink/25" />
              <span className="font-eyebrow text-ink/50">Visual Comfort</span>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="mt-8 font-editorial text-ink text-[42px] md:text-[52px] leading-[1] tracking-[-0.02em] max-w-[16ch]">
                Digital eye strain is a{" "}
                <span className="italic text-teal">many-sided</span> story.
              </h3>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-8 text-[15px] md:text-[16px] leading-[1.75] text-ink/70">
                Discomfort at the end of a long screen day is influenced by many
                factors. Blue light is only one of them. Eyegis addresses visual
                comfort as a whole — through thoughtful optical engineering.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {[
                "Long screen exposure",
                "Reduced blinking rate",
                "Viewing distance",
                "Ambient lighting",
                "Sustained focus fatigue",
                "Screen glare",
              ].map((f, i) => (
                <Reveal key={f} delay={300 + i * 60}>
                  <div className="flex items-baseline gap-3 border-t border-ink/10 pt-3">
                    <span className="font-eyebrow text-ink/40 text-[10px]">
                      0{i + 1}
                    </span>
                    <span className="text-[14px] text-ink/80">{f}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============ Section 03 — EyegisGuard™  (Deep teal editorial block) ============ */}
      <div className="mt-40 md:mt-52 bg-[var(--teal-deep)] text-paper">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 py-28 md:py-36">
          <div className="grid grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left — Text */}
            <div className="col-span-12 lg:col-span-5">
              <Reveal className="flex items-center gap-3">
                <span className="font-eyebrow text-mint">§ 03</span>
                <span className="h-px w-8 bg-paper/25" />
                <span className="font-eyebrow text-paper/60">Technology</span>
              </Reveal>
              <Reveal delay={120}>
                <h3 className="mt-8 font-editorial text-paper text-[44px] md:text-[56px] leading-[0.98] tracking-[-0.02em] max-w-[14ch]">
                  EyegisGuard™ —{" "}
                  <span className="italic text-mint">selective</span>, not
                  aggressive.
                </h3>
              </Reveal>
              <Reveal delay={220}>
                <p className="mt-8 text-[15px] md:text-[16px] leading-[1.75] text-paper/75 max-w-md">
                  A proprietary lens treatment that filters a narrow band of
                  higher-energy blue wavelengths while preserving color fidelity
                  and contrast. No yellow tint. No distorted whites. No
                  exaggerated filtering.
                </p>
              </Reveal>

              {/* Numeric specimens */}
              <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
                {[
                  { v: <CountUp to={38} suffix="%" />, k: "Peak filtering at 435 nm" },
                  { v: <CountUp to={99} suffix="%" />, k: "Visible light transmission" },
                  { v: <CountUp to={1.6} />, k: "Refractive index" },
                ].map((s, i) => (
                  <Reveal key={i} delay={320 + i * 100}>
                    <div className="flex flex-col gap-2 border-t border-paper/20 pt-4">
                      <span className="font-editorial text-paper text-3xl md:text-4xl tracking-tight">
                        {s.v}
                      </span>
                      <span className="font-eyebrow text-paper/55 text-[10px] leading-relaxed">
                        {s.k}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={620}>
                <a
                  href="#eyegisguard"
                  className="mt-14 inline-flex items-center gap-4 font-eyebrow text-paper group"
                >
                  <span className="relative">
                    Learn More
                    <span className="absolute inset-x-0 -bottom-1 h-px bg-paper/40" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid h-10 w-10 place-items-center rounded-full border border-paper/30 transition-[transform,background-color,color] duration-500 group-hover:bg-mint group-hover:text-teal-deep group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </Reveal>
            </div>

            {/* Right — Exploded lens */}
            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <Reveal delay={80}>
                <figure className="relative">
                  <div className="relative overflow-hidden rounded-[6px] aspect-[5/4] bg-[color:rgba(255,255,255,0.03)]">
                    <img
                      src={scienceLensExploded}
                      alt="Exploded view of three curved optical layers that form an Eyegis lens"
                      loading="lazy"
                      width={1200}
                      height={1200}
                      className="h-full w-full object-cover mix-blend-screen opacity-95"
                    />
                    {/* Callout hairlines */}
                    <svg
                      className="pointer-events-none absolute inset-0 h-full w-full"
                      viewBox="0 0 100 80"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <line x1="72" y1="26" x2="94" y2="18" stroke="rgba(134,217,209,0.6)" strokeWidth="0.15" vectorEffect="non-scaling-stroke" />
                      <line x1="70" y1="42" x2="94" y2="42" stroke="rgba(134,217,209,0.6)" strokeWidth="0.15" vectorEffect="non-scaling-stroke" />
                      <line x1="70" y1="60" x2="94" y2="68" stroke="rgba(134,217,209,0.6)" strokeWidth="0.15" vectorEffect="non-scaling-stroke" />
                    </svg>
                    <div className="pointer-events-none absolute right-3 top-[18%] font-eyebrow text-mint text-[10px]">
                      01 · AR Coating
                    </div>
                    <div className="pointer-events-none absolute right-3 top-[48%] font-eyebrow text-mint text-[10px]">
                      02 · Selective Filter
                    </div>
                    <div className="pointer-events-none absolute right-3 top-[78%] font-eyebrow text-mint text-[10px]">
                      03 · CR-39 Substrate
                    </div>
                  </div>
                  <figcaption className="mt-4 flex items-center justify-between font-eyebrow text-paper/55">
                    <span>Fig. 03 · EyegisGuard™ Exploded</span>
                    <span>N°03</span>
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* ============ Section 04 — The Difference (comparison) ============ */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 pt-32 md:pt-44">
        <div className="grid grid-cols-12 gap-10 items-end">
          <Reveal className="col-span-12 md:col-span-7">
            <div className="flex items-center gap-3">
              <span className="font-eyebrow text-ink/50">§ 04</span>
              <span className="h-px w-8 bg-ink/25" />
              <span className="font-eyebrow text-ink/50">The Difference</span>
            </div>
            <h3 className="mt-8 font-editorial text-ink text-[42px] md:text-[54px] leading-[1] tracking-[-0.02em] max-w-[18ch]">
              A quiet comparison,{" "}
              <span className="italic text-teal">on our own terms.</span>
            </h3>
          </Reveal>
          <Reveal delay={120} className="col-span-12 md:col-span-5">
            <p className="text-[15px] leading-[1.75] text-ink/65 max-w-md md:ml-auto">
              We do not name competitors. We simply describe, honestly, what
              differentiates the objects we make from what is broadly available.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-20">
          <ComparisonTable />
        </div>
      </div>

      {/* ============ Section 05 — Research Philosophy ============ */}
      <div className="mx-auto mt-40 md:mt-52 max-w-[1600px] px-6 md:px-10 lg:px-14 pb-40 md:pb-52">
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left — Lab image */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-1">
            <Reveal>
              <figure>
                <div className="relative overflow-hidden rounded-[6px] aspect-[4/5] bg-[var(--paper-warm)]">
                  <img
                    src={scienceLab}
                    alt="A brass microscope on a concrete bench inside a quiet optical laboratory"
                    loading="lazy"
                    width={1200}
                    height={1200}
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="mt-4 flex items-center justify-between font-eyebrow text-ink/55">
                  <span>Fig. 04 · Research Studio, São Paulo</span>
                  <span>N°04</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* Right — Philosophy statement */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Reveal className="flex items-center gap-3">
              <span className="font-eyebrow text-ink/50">§ 05</span>
              <span className="h-px w-8 bg-ink/25" />
              <span className="font-eyebrow text-ink/50">Research Philosophy</span>
            </Reveal>

            <Reveal delay={120}>
              <blockquote className="mt-10">
                <span
                  className="font-editorial text-teal text-6xl md:text-7xl leading-none block"
                  aria-hidden="true"
                >
                  “
                </span>
                <p className="mt-2 font-editorial text-ink text-[32px] md:text-[42px] leading-[1.15] tracking-[-0.015em] max-w-[26ch]">
                  We continuously monitor peer-reviewed research in{" "}
                  <span className="italic text-teal">optics</span>,{" "}
                  <span className="italic text-teal">ergonomics</span> and{" "}
                  <span className="italic text-teal">visual comfort</span> to
                  guide the evolution of our products.
                </p>
                <footer className="mt-8 flex items-center gap-3 font-eyebrow text-ink/50">
                  <span className="h-px w-8 bg-ink/25" />
                  <span>Eyegis Optical Studio — Research Charter, 2026</span>
                </footer>
              </blockquote>
            </Reveal>

            {/* Commitment pillars */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
              {[
                {
                  icon: <IconDoc />,
                  title: "Documented specifications",
                  copy: "Every lens ships with a plain-language technical sheet.",
                },
                {
                  icon: <IconEye />,
                  title: "Careful language",
                  copy: "We describe what our lenses do — never what they cure.",
                },
                {
                  icon: <IconScreen />,
                  title: "Product, not prescription",
                  copy: "Eyegis is designed comfort-wear, not a medical device.",
                },
                {
                  icon: <IconSun />,
                  title: "Whole-day thinking",
                  copy: "Screens are one variable among many that we study.",
                },
              ].map((p, i) => (
                <Reveal key={p.title} delay={200 + i * 80}>
                  <div className="border-t border-ink/15 pt-5 flex items-start gap-4">
                    <span className="mt-1 text-ink/70">{p.icon}</span>
                    <div>
                      <div className="font-editorial text-ink text-lg tracking-[-0.01em]">
                        {p.title}
                      </div>
                      <p className="mt-2 text-[13.5px] leading-[1.7] text-ink/65">
                        {p.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============ Champagne closing rule ============ */}
      <div className="bg-[var(--paper-warm)]">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 py-24 md:py-28 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <Reveal>
            <p className="font-editorial text-ink text-3xl md:text-4xl tracking-[-0.01em] leading-[1.05] max-w-[26ch]">
              Honest science makes better objects — and better wearers.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <a
              href="#lenses"
              className="group inline-flex items-center gap-4 font-eyebrow text-ink"
            >
              <span className="relative">
                Choose Your Lens
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

export default HonestScience;
