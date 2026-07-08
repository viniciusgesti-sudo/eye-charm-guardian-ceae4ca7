import { useEffect, useRef, useState, type ElementType } from "react";

import lensFloat from "@/assets/guard-lens-float.jpg";
import lensMacro from "@/assets/products/solene-macro.jpg";
import comparisonImg from "@/assets/guard-comparison.jpg";
import lifeCreative from "@/assets/guard-life-creative.jpg";
import lifeBusiness from "@/assets/guard-life-business.jpg";
import lifeStudent from "@/assets/guard-life-student.jpg";
import lifeGamer from "@/assets/guard-life-gamer.jpg";

/* ------------------------------------------------------------------
   Reveal — scroll-triggered fade + rise
   ------------------------------------------------------------------ */
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
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
      ref={ref as any}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------
   Small marks
   ------------------------------------------------------------------ */
function IndexMark({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4 text-ink/60">
      <span className="font-eyebrow text-teal">{n}</span>
      <span className="h-px w-8 bg-ink/25" />
      <span className="font-eyebrow">{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------
   § 01 — The Lens (parallax rotation while scrolling)
   ------------------------------------------------------------------ */
const CALLOUTS: Array<{
  n: string;
  title: string;
  body: string;
  x: string; // horizontal anchor
  y: string; // vertical anchor
  side: "left" | "right";
}> = [
  {
    n: "01",
    title: "Premium Optical Lens",
    body: "High-clarity optical resin, precision-polished for distortion-free vision.",
    x: "18%",
    y: "22%",
    side: "left",
  },
  {
    n: "02",
    title: "Selective Blue-Light Filter",
    body: "Attenuates a targeted portion of the 400–455 nm band without shifting color.",
    x: "82%",
    y: "34%",
    side: "right",
  },
  {
    n: "03",
    title: "Anti-Reflective Coating",
    body: "Multi-layer AR treatment reduces glare from screens and ambient light.",
    x: "16%",
    y: "62%",
    side: "left",
  },
  {
    n: "04",
    title: "Scratch-Resistant Surface",
    body: "Hard-coat finish protects the lens across years of daily wear.",
    x: "84%",
    y: "72%",
    side: "right",
  },
  {
    n: "05",
    title: "TR90 Lightweight Comfort",
    body: "Aerospace-grade thermoplastic frame — flexible, hypoallergenic, weightless.",
    x: "50%",
    y: "92%",
    side: "left",
  },
];

function LensStage() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [rot, setRot] = useState(-8);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        // progress: -0.5 (below) → 0 (centered) → 0.5 (above)
        const p = (rect.top + rect.height / 2 - vh / 2) / vh;
        const clamped = Math.max(-0.6, Math.min(0.6, p));
        setRot(-clamped * 40);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={stageRef} className="relative mx-auto w-full max-w-[1100px]">
      {/* soft champagne halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 50%, rgba(226,209,195,0.55), rgba(249,249,249,0) 70%)",
        }}
      />
      <div className="relative aspect-square w-full">
        <img
          src={lensFloat}
          alt="EyegisGuard™ optical lens — floating study"
          width={1600}
          height={1600}
          loading="lazy"
          className="h-full w-full object-contain will-change-transform"
          style={{
            transform: `rotate(${rot.toFixed(2)}deg)`,
            transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />

        {/* Callouts */}
        {CALLOUTS.map((c, i) => (
          <Callout key={c.n} c={c} delay={200 + i * 120} />
        ))}
      </div>
    </div>
  );
}

function Callout({
  c,
  delay,
}: {
  c: (typeof CALLOUTS)[number];
  delay: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute hidden md:block"
      style={{
        left: c.x,
        top: c.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className={`reveal ${visible ? "reveal-in" : ""} flex items-center gap-4 ${
          c.side === "right" ? "flex-row-reverse text-right" : ""
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {/* line + dot */}
        <div className={`flex items-center gap-3 ${c.side === "right" ? "flex-row-reverse" : ""}`}>
          <span className="block h-1.5 w-1.5 rounded-full bg-teal" />
          <span className="block h-px w-16 bg-teal/40" />
        </div>
        {/* label card */}
        <div className="min-w-[190px] max-w-[220px] rounded-md bg-paper/85 px-4 py-3 backdrop-blur-md ring-1 ring-ink/10 shadow-[0_10px_30px_-18px_rgba(29,37,45,0.35)]">
          <div className={`flex items-baseline gap-2 ${c.side === "right" ? "justify-end" : ""}`}>
            <span className="font-eyebrow text-[9px] text-teal">{c.n}</span>
            <span className="font-editorial text-[17px] leading-tight text-ink">{c.title}</span>
          </div>
          <p className="mt-1 text-[12px] leading-snug text-muted-foreground">{c.body}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   § 02 — Spectrum
   ------------------------------------------------------------------ */
function Spectrum() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  // filtered band ~ 400–455 nm mapped onto full 300–1000 nm axis
  const total = 700; // 1000-300
  const startPct = ((400 - 300) / total) * 100;
  const endPct = ((455 - 300) / total) * 100;
  return (
    <div ref={ref} className="relative">
      <div className="relative h-[140px] w-full">
        {/* baseline */}
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink/15" />
        {/* spectrum bar — muted, editorial (no rainbow saturation) */}
        <div
          className="absolute inset-x-0 top-1/2 h-[14px] -translate-y-1/2 rounded-full overflow-hidden ring-1 ring-ink/10"
          style={{
            background:
              "linear-gradient(90deg, #4B3B6B 0%, #3E5C86 18%, #86D9D1 34%, #C9D6B4 55%, #E7C79A 74%, #C08466 92%, #7A3B34 100%)",
            filter: "saturate(0.55) brightness(1.02)",
          }}
        />
        {/* filtered band highlight */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-[52px] rounded-md ring-1 ring-teal/40"
          style={{
            left: `${startPct}%`,
            width: `${endPct - startPct}%`,
            background:
              "linear-gradient(180deg, rgba(0,75,87,0.14), rgba(0,75,87,0.02))",
            transform: `translateY(-50%) scaleX(${visible ? 1 : 0})`,
            transformOrigin: "left center",
            transition: "transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
        {/* filter label */}
        <div
          className="absolute -top-2 flex -translate-y-full flex-col items-center"
          style={{ left: `${(startPct + endPct) / 2}%`, transform: `translate(-50%, -100%)` }}
        >
          <span className="font-eyebrow text-[9px] text-teal">Filtered by EyegisGuard™</span>
          <span className="mt-1 font-editorial italic text-teal text-[15px]">400 – 455 nm</span>
          <span className="mt-1 block h-3 w-px bg-teal/50" />
        </div>

        {/* axis ticks */}
        {[
          { nm: 300, label: "UV" },
          { nm: 450, label: "Blue" },
          { nm: 550, label: "Visible" },
          { nm: 700, label: "Red" },
          { nm: 1000, label: "Infrared" },
        ].map((t) => {
          const p = ((t.nm - 300) / total) * 100;
          return (
            <div
              key={t.nm}
              className="absolute top-1/2 flex flex-col items-center"
              style={{ left: `${p}%`, transform: "translate(-50%, 24px)" }}
            >
              <span className="block h-2 w-px bg-ink/30" />
              <span className="mt-2 font-eyebrow text-[9px] text-ink/70">{t.label}</span>
              <span className="mt-1 font-mono text-[10px] text-ink/40">{t.nm} nm</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   § 03 — Comparison slider
   ------------------------------------------------------------------ */
function ComparisonSlider() {
  const [pos, setPos] = useState(52);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const setFromClientX = (clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(6, Math.min(94, p)));
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      setFromClientX(x);
    };
    const onUp = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-sm ring-1 ring-ink/10 select-none"
      onMouseDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        dragging.current = true;
        setFromClientX(e.touches[0].clientX);
      }}
    >
      {/* right: "with" — natural color */}
      <img
        src={comparisonImg}
        alt="Workspace viewed with EyegisGuard™ — natural color preserved"
        width={1800}
        height={1200}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* left overlay: "without" — cool cast + harsher highlights */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img
          src={comparisonImg}
          alt="Workspace viewed without EyegisGuard™ — cooler, harsher"
          width={1800}
          height={1200}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter: "hue-rotate(-6deg) saturate(1.25) contrast(1.12) brightness(1.06)",
            width: `${(100 / pos) * 100}%`,
            maxWidth: "none",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(120,160,220,0.16), rgba(120,160,220,0.06))",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* labels */}
      <span className="absolute left-5 top-5 font-eyebrow text-[10px] text-paper drop-shadow">
        Without EyegisGuard™
      </span>
      <span className="absolute right-5 top-5 font-eyebrow text-[10px] text-ink/80">
        With EyegisGuard™
      </span>

      {/* handle */}
      <div
        className="absolute inset-y-0 z-10"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="relative h-full w-px bg-paper/85 shadow-[0_0_0_1px_rgba(29,37,45,0.15)]" />
        <button
          type="button"
          aria-label="Drag to compare"
          className="absolute top-1/2 left-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink ring-1 ring-ink/15 shadow-[0_10px_30px_-10px_rgba(29,37,45,0.35)]"
          onMouseDown={(e) => {
            e.stopPropagation();
            dragging.current = true;
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            dragging.current = true;
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M6 4 2 9l4 5M12 4l4 5-4 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   § 04 — Everyday digital life
   ------------------------------------------------------------------ */
const LIFE = [
  {
    tag: "For",
    title: "Creative Professionals",
    body: "Preserved color accuracy across long editing sessions — reds stay red, blacks stay black.",
    img: lifeCreative,
    Icon: IconAperture,
  },
  {
    tag: "For",
    title: "Business Professionals",
    body: "Comfort across back-to-back calls, spreadsheets and travel days.",
    img: lifeBusiness,
    Icon: IconBriefcase,
  },
  {
    tag: "For",
    title: "Students",
    body: "Steady visual focus for reading, research and late-night writing.",
    img: lifeStudent,
    Icon: IconBook,
  },
  {
    tag: "For",
    title: "Gamers",
    body: "Reduced glare and stable contrast during extended play — without color shift.",
    img: lifeGamer,
    Icon: IconTarget,
  },
];

function IconAperture() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1" />
      <path d="M10 2 6 10l4 8M10 2l4 8-4 8M2 10h16" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
function IconBriefcase() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="2.5" y="6" width="15" height="10" stroke="currentColor" strokeWidth="1" />
      <path d="M7 6V4h6v2M2.5 11h15" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
function IconBook() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3 4h6a2 2 0 0 1 2 2v10H5a2 2 0 0 1-2-2V4Z" stroke="currentColor" strokeWidth="1" />
      <path d="M17 4h-6a2 2 0 0 0-2 2v10h6a2 2 0 0 0 2-2V4Z" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
function IconTarget() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1" />
      <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1" />
      <circle cx="10" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   § 05 — Specifications
   ------------------------------------------------------------------ */
const SPECS = [
  { n: "01", title: "Selective Blue-Light Filtering", body: "Targeted attenuation across 400–455 nm." },
  { n: "02", title: "Anti-Reflective Coating", body: "Multi-layer AR for glare-free clarity." },
  { n: "03", title: "TR90 Lightweight Frame", body: "Aerospace polymer — flexible, hypoallergenic." },
  { n: "04", title: "Premium Optical Clarity", body: "Distortion-free vision, edge to edge." },
  { n: "05", title: "Natural Color Preservation", body: "True whites. True skin tones. No yellow cast." },
  { n: "06", title: "Comfort for Long Sessions", body: "Balanced weight distribution and nose bridge." },
  { n: "07", title: "2-Year Warranty", body: "Frame integrity guaranteed against defects." },
  { n: "08", title: "60-Day Comfort Guarantee", body: "Wear them. If they do not feel right, return them." },
];

/* ------------------------------------------------------------------
   MAIN
   ------------------------------------------------------------------ */
export function EyegisGuard() {
  return (
    <section id="technology" className="relative bg-paper text-ink">
      {/* ============ INTRO ============ */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 pt-32 md:pt-44 pb-20 md:pb-28">
        <Reveal>
          <IndexMark n="§ 04" label="EyegisGuard™ Technology" />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <Reveal delay={120} className="lg:col-span-8">
            <h2 className="font-editorial text-ink text-balance-tight text-[12vw] sm:text-[9vw] md:text-[7vw] lg:text-[6vw] xl:text-[92px] leading-[0.9]">
              Engineered to protect.
              <br />
              <span className="italic text-teal">Designed to preserve.</span>
            </h2>
          </Reveal>
          <Reveal delay={260} className="lg:col-span-4">
            <p className="font-light text-base md:text-lg leading-relaxed text-ink/75 max-w-md">
              EyegisGuard™ is our proprietary lens technology, developed to
              selectively filter specific wavelengths of blue light while
              preserving natural color accuracy, visual clarity and everyday
              comfort.
              <span className="mt-3 block text-ink/50">
                No hype. No fear. Just quiet optical engineering.
              </span>
            </p>
          </Reveal>
        </div>
      </div>

      {/* ============ § 01 — THE LENS ============ */}
      <div className="relative border-t border-ink/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 py-24 md:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16 lg:mb-24">
            <Reveal className="lg:col-span-3">
              <IndexMark n="01" label="The Lens" />
            </Reveal>
            <Reveal delay={140} className="lg:col-span-6">
              <h3 className="font-editorial text-[38px] md:text-[52px] leading-[0.95] text-ink">
                A single lens, five deliberate layers.
              </h3>
            </Reveal>
            <Reveal delay={280} className="lg:col-span-3">
              <p className="text-sm md:text-base leading-relaxed text-ink/65">
                Every EyegisGuard™ lens is built as a stack of considered choices —
                each one measurable, none of them cosmetic.
              </p>
            </Reveal>
          </div>

          <LensStage />

          {/* Mobile fallback list */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:hidden gap-6">
            {CALLOUTS.map((c) => (
              <div key={c.n} className="border-t border-ink/15 pt-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-eyebrow text-[9px] text-teal">{c.n}</span>
                  <span className="font-editorial text-lg text-ink">{c.title}</span>
                </div>
                <p className="mt-1 text-sm text-ink/65">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ § 02 — HOW IT WORKS ============ */}
      <div className="relative bg-paper-warm">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14 py-28 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-20">
            <Reveal className="lg:col-span-3">
              <IndexMark n="02" label="How It Works" />
            </Reveal>
            <Reveal delay={140} className="lg:col-span-6">
              <h3 className="font-editorial text-[38px] md:text-[54px] leading-[0.95] text-ink">
                We filter a slice of the spectrum —
                <span className="italic text-teal"> not the whole sky.</span>
              </h3>
            </Reveal>
            <Reveal delay={280} className="lg:col-span-3">
              <p className="text-sm md:text-base leading-relaxed text-ink/65">
                A narrow, targeted band of high-energy blue light — attenuated with
                intent, so daylight, screens and skin tones still look like themselves.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <Spectrum />
          </Reveal>

          <Reveal delay={400}>
            <p className="mt-16 max-w-2xl font-editorial italic text-ink/60 text-lg leading-relaxed">
              "Blocking as much blue light as possible is not the goal. Blocking
              the right amount, in the right place, is."
            </p>
          </Reveal>
        </div>
      </div>

      {/* ============ § 03 — PRESERVE WHAT MATTERS ============ */}
      <div className="relative border-t border-ink/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 py-28 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
            <Reveal className="lg:col-span-3">
              <IndexMark n="03" label="Preserve What Matters" />
            </Reveal>
            <Reveal delay={140} className="lg:col-span-6">
              <h3 className="font-editorial text-[38px] md:text-[54px] leading-[0.95] text-ink">
                Comfort you can see —
                <span className="italic text-teal"> without color you can't.</span>
              </h3>
            </Reveal>
            <Reveal delay={280} className="lg:col-span-3">
              <p className="text-sm md:text-base leading-relaxed text-ink/65">
                Drag the handle. The difference is quiet, honest and never dramatic —
                exactly as an optical filter should behave.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <ComparisonSlider />
          </Reveal>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "Natural Colors",
              "Contrast Preservation",
              "Reduced Harsh Reflections",
              "Visual Comfort",
            ].map((t, i) => (
              <Reveal key={t} delay={i * 120}>
                <div className="border-t border-ink/15 pt-4">
                  <span className="font-editorial text-lg md:text-xl text-ink">{t}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ============ § 04 — DIGITAL LIFE ============ */}
      <div className="relative bg-paper-warm">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 py-28 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
            <Reveal className="lg:col-span-3">
              <IndexMark n="04" label="Designed For Everyday Digital Life" />
            </Reveal>
            <Reveal delay={140} className="lg:col-span-6">
              <h3 className="font-editorial text-[38px] md:text-[54px] leading-[0.95] text-ink">
                One lens.
                <span className="italic text-teal"> Many quiet lives.</span>
              </h3>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-x-12">
            {LIFE.map((l, i) => (
              <Reveal key={l.title} delay={i * 120}>
                <article className="group">
                  <div className="relative overflow-hidden bg-ink/5 aspect-[4/5]">
                    <img
                      src={l.img}
                      alt={`${l.title} — everyday digital life with Eyegis`}
                      width={1400}
                      height={1750}
                      loading="lazy"
                      className="h-full w-full object-cover img-hover group-hover:img-hover-in"
                    />
                  </div>
                  <div className="mt-6 flex items-start gap-6">
                    <div className="mt-1 text-teal">
                      <l.Icon />
                    </div>
                    <div className="flex-1">
                      <span className="font-eyebrow text-[10px] text-ink/50">
                        {l.tag}
                      </span>
                      <h4 className="mt-2 font-editorial text-2xl md:text-3xl text-ink">
                        {l.title}
                      </h4>
                      <p className="mt-3 max-w-md text-sm md:text-base leading-relaxed text-ink/65">
                        {l.body}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ============ § 05 — SPECIFICATIONS ============ */}
      <div className="relative border-t border-ink/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 py-28 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
            <Reveal className="lg:col-span-3">
              <IndexMark n="05" label="Technical Specifications" />
            </Reveal>
            <Reveal delay={140} className="lg:col-span-6">
              <h3 className="font-editorial text-[38px] md:text-[54px] leading-[0.95] text-ink">
                Every detail,
                <span className="italic text-teal"> quietly stated.</span>
              </h3>
            </Reveal>
            <Reveal delay={280} className="lg:col-span-3">
              <div className="overflow-hidden rounded-sm bg-ink/[0.03] p-4 ring-1 ring-ink/10">
                <img
                  src={lensMacro}
                  alt="EyegisGuard™ lens macro detail"
                  width={800}
                  height={800}
                  loading="lazy"
                  className="h-40 w-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10">
            {SPECS.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="h-full bg-paper p-8 transition-colors duration-500 hover:bg-paper-warm">
                  <div className="flex items-baseline justify-between">
                    <span className="font-eyebrow text-[10px] text-teal">{s.n}</span>
                    <span className="h-px w-8 bg-ink/25" />
                  </div>
                  <h4 className="mt-8 font-editorial text-xl md:text-[22px] leading-tight text-ink">
                    {s.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ============ § 06 — WHY IT FEELS DIFFERENT ============ */}
      <div className="relative bg-teal-deep text-paper">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14 py-32 md:py-48">
          <Reveal>
            <IndexMark n="06" label="Why It Feels Different" />
          </Reveal>
          <Reveal delay={180}>
            <blockquote className="mt-12 max-w-5xl font-editorial text-paper text-[8vw] md:text-[5.4vw] lg:text-[4.2vw] xl:text-[68px] leading-[1.02] text-balance-tight">
              Comfort is not achieved by blocking as much blue light as possible.
              It is achieved by the quiet
              <span className="italic text-mint"> conversation between frame ergonomics, </span>
              optical quality, selective filtering and thoughtful design.
            </blockquote>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-14 flex items-center gap-4 text-paper/60">
              <span className="h-px w-14 bg-paper/40" />
              <span className="font-eyebrow text-[10px]">
                Eyegis Optical Studio · Design Charter
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
