import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import heroImg from "@/assets/products/meridian-hero.jpg";
import pairImg from "@/assets/products/meridian-pair.jpg";
import packageImg from "@/assets/products/meridian-package.jpg";
import pouchImg from "@/assets/products/meridian-pouch.jpg";
import lensMacro from "@/assets/universe-lens-macro.jpg";
import portrait from "@/assets/universe-portrait.jpg";
import lifestyleImg from "@/assets/life-business.jpg";
import guardLens from "@/assets/guard-lens-float.jpg";

export const Route = createFileRoute("/product/meridian")({
  head: () => ({
    meta: [
      { title: "Meridian — Eyegis" },
      {
        name: "description",
        content:
          "Meridian by Eyegis — TR90 lightweight frame with EyegisGuard™ blue-light filtering. Engineered for long screen hours, designed for everyday elegance.",
      },
      { property: "og:title", content: "Meridian — Eyegis" },
      {
        property: "og:description",
        content:
          "Premium blue-light filtering eyewear. TR90 frame, anti-reflective coating, 60-day comfort guarantee.",
      },
      { property: "og:image", content: "https://eye-charm-guardian.lovable.app/og-meridian.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MeridianProduct,
});

const AMAZON_URL = "https://www.amazon.com/";

/* ---------------------------------------------------------------- */
/*  Reveal hook                                                     */
/* ---------------------------------------------------------------- */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
      }}
      className={`transition-all duration-[1200ms] ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </Component>
  );
}

/* ---------------------------------------------------------------- */
/*  Minimal top-bar (matches homepage look)                         */
/* ---------------------------------------------------------------- */

function MiniHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60"
          : "bg-background/40 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10 lg:px-14">
        <Link to="/" className="flex items-baseline gap-2 text-ink">
          <span className="font-editorial text-2xl tracking-tight">Eyegis</span>
          <span className="font-eyebrow hidden text-[9px] text-muted-foreground sm:inline">
            ® Optical Science
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-eyebrow text-ink/70">
          <Link to="/" className="hover:text-ink transition-colors">
            ← All Collections
          </Link>
        </nav>
        <a
          href={AMAZON_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-teal px-5 py-2.5 font-eyebrow text-paper hover:bg-teal-deep transition-colors"
        >
          Buy on Amazon
        </a>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------- */
/*  Section 01 — Product Hero                                       */
/* ---------------------------------------------------------------- */

const BADGES = [
  "EyegisGuard™",
  "Blue Light Filtering",
  "TR90 Frame",
  "Anti-Reflective",
  "2-Year Warranty",
  "60-Day Comfort Guarantee",
];

function ProductHero() {
  return (
    <section className="relative bg-paper pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 px-6 md:px-10 lg:px-14 items-center">
        {/* Left — text */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <Reveal>
            <span className="font-eyebrow text-teal">Chapter I · Meridian</span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 font-editorial text-ink leading-[0.9] text-[13vw] sm:text-[9vw] lg:text-[6.4vw] xl:text-[96px]">
              Meridian
              <span className="block italic text-teal">by Eyegis</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-md font-light text-lg leading-relaxed text-ink/75">
              Designed for professionals who demand visual comfort without
              compromising style. A quiet architectural line, engineered for
              hours in front of the screen.
            </p>
          </Reveal>

          <Reveal delay={340}>
            <ul className="mt-10 flex flex-wrap gap-2">
              {BADGES.map((b) => (
                <li
                  key={b}
                  className="rounded-full border border-ink/15 bg-paper px-3.5 py-1.5 font-eyebrow text-[10px] text-ink/75"
                >
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={440}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={AMAZON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-6 rounded-full bg-teal px-8 py-5 text-paper shadow-[0_20px_50px_-20px_rgba(0,75,87,0.7)] hover:bg-teal-deep hover:-translate-y-0.5 hover:shadow-[0_28px_60px_-20px_rgba(0,56,66,0.85)] transition-all duration-500"
              >
                <span className="font-eyebrow">Buy on Amazon</span>
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 place-items-center rounded-full bg-paper/10 transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-ink/20 px-8 py-5 font-eyebrow text-ink hover:bg-ink hover:text-paper transition-colors duration-500"
              >
                View Gallery
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right — floating product */}
        <div className="lg:col-span-7 order-1 lg:order-2 relative">
          <Reveal delay={100}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-paper-warm">
              {/* soft reflection glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(134,217,209,0.18),transparent_60%)]" />
              <img
                src={heroImg}
                alt="Meridian frame — front view, luxury studio lighting"
                className="h-full w-full object-cover object-center float-slow"
                loading="eager"
              />
              {/* floor shadow */}
              <div className="pointer-events-none absolute inset-x-[20%] bottom-6 h-6 rounded-[50%] bg-ink/15 blur-2xl" />
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%,100% { transform: translateY(0) }
          50%     { transform: translateY(-10px) }
        }
        .float-slow { animation: float-slow 7s ease-in-out infinite; }
      `}</style>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Section 02 — Gallery                                            */
/* ---------------------------------------------------------------- */

const GALLERY = [
  { src: heroImg, label: "Front" },
  { src: pairImg, label: "Pair" },
  { src: lensMacro, label: "Lens Macro" },
  { src: pouchImg, label: "Pouch" },
  { src: packageImg, label: "Packaging" },
  { src: portrait, label: "On Face" },
];

function Gallery() {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  return (
    <section id="gallery" className="bg-paper-warm py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <Reveal>
          <div className="mb-14 flex items-end justify-between">
            <div>
              <span className="font-eyebrow text-teal">Section 02</span>
              <h2 className="mt-3 font-editorial text-ink text-4xl md:text-5xl lg:text-6xl leading-[0.95]">
                A closer look.
              </h2>
            </div>
            <span className="hidden md:block font-eyebrow text-ink/50">
              {String(active + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main viewer */}
          <div className="lg:col-span-9">
            <Reveal>
              <button
                type="button"
                onClick={() => setZoom((z) => !z)}
                className="group relative block w-full aspect-[16/11] overflow-hidden rounded-md bg-paper"
                aria-label="Zoom image"
              >
                <img
                  src={GALLERY[active].src}
                  alt={`Meridian — ${GALLERY[active].label}`}
                  loading="lazy"
                  className={`h-full w-full object-cover transition-transform duration-[1400ms] ease-out ${
                    zoom ? "scale-[1.35]" : "scale-100 group-hover:scale-[1.04]"
                  }`}
                />
                <span className="pointer-events-none absolute bottom-5 left-6 font-eyebrow text-[10px] text-ink/70">
                  {zoom ? "Click to reset" : "Click to zoom"}
                </span>
              </button>
            </Reveal>
          </div>

          {/* Thumbnails */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-3 lg:grid-cols-2 gap-3">
              {GALLERY.map((g, i) => (
                <button
                  key={g.label}
                  onClick={() => {
                    setActive(i);
                    setZoom(false);
                  }}
                  className={`relative aspect-square overflow-hidden rounded-sm transition-all duration-500 ${
                    active === i
                      ? "ring-1 ring-teal opacity-100"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`View ${g.label}`}
                >
                  <img
                    src={g.src}
                    alt={g.label}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Section 03 — Why You'll Love It                                 */
/* ---------------------------------------------------------------- */

const FEATURES = [
  {
    label: "01",
    title: "Visual Comfort",
    body: "Filters the most disruptive band of high-energy blue light so long hours feel like short ones.",
  },
  {
    label: "02",
    title: "Lightweight Frame",
    body: "TR90 memory polymer — under 18g on the face, engineered to be forgotten.",
  },
  {
    label: "03",
    title: "Natural Color Accuracy",
    body: "No amber tint. No color shift. What you see on screen is what your work requires.",
  },
  {
    label: "04",
    title: "Designed for All-Day Wear",
    body: "Balanced weight distribution, soft-touch nose pads, sculpted temple arms.",
  },
];

function FeatureIcon({ i }: { i: number }) {
  const paths = [
    "M4 12h16 M12 4v16", // eye/cross
    "M4 12c4-4 12-4 16 0", // arc
    "M4 6h16 M4 12h16 M4 18h16", // waves
    "M6 20V6h12v14", // frame
  ];
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={paths[i]} stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function WhyLove() {
  return (
    <section className="bg-paper py-28 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <Reveal>
          <span className="font-eyebrow text-teal">Section 03</span>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-4 max-w-3xl font-editorial text-ink text-4xl md:text-6xl lg:text-7xl leading-[0.95]">
            Why you'll love it.
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14 lg:gap-x-24">
          {FEATURES.map((f, i) => (
            <Reveal key={f.label} delay={i * 100}>
              <div className="flex flex-col gap-5 border-t border-ink/10 pt-6 text-teal">
                <div className="flex items-center justify-between font-eyebrow text-ink/50">
                  <span>Feature {f.label}</span>
                  <FeatureIcon i={i} />
                </div>
                <h3 className="font-editorial text-ink text-3xl md:text-4xl leading-tight">
                  {f.title}
                </h3>
                <p className="font-light text-ink/70 leading-relaxed max-w-md">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Section 04 — Frame Details (exploded)                           */
/* ---------------------------------------------------------------- */

const PARTS = [
  { top: "18%", left: "22%", label: "Frame Material", value: "TR90 polymer" },
  { top: "38%", left: "52%", label: "Lens", value: "EyegisGuard™ optical" },
  { top: "22%", left: "72%", label: "Hinges", value: "Precision spring-hinge" },
  { top: "62%", left: "38%", label: "Nose Pads", value: "Soft silicone" },
  { top: "70%", left: "68%", label: "Temple Arms", value: "Balanced 138mm" },
];

function FrameDetails() {
  return (
    <section className="bg-ink py-28 md:py-36 text-paper overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="font-eyebrow text-mint">Section 04</span>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-4 font-editorial text-4xl md:text-5xl lg:text-6xl leading-[0.95]">
                Every part,
                <span className="block italic text-mint">measured.</span>
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-8 max-w-sm font-light text-paper/70 leading-relaxed">
                Meridian is drawn from five components chosen for balance,
                durability and quiet elegance. Hover any point to reveal.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8 relative">
            <Reveal>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-[#0f1a1e]">
                <img
                  src={pairImg}
                  alt="Meridian frame — exploded technical study"
                  loading="lazy"
                  className="h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                {PARTS.map((p, i) => (
                  <div
                    key={p.label}
                    className="absolute group"
                    style={{ top: p.top, left: p.left }}
                  >
                    <span
                      className="block h-2.5 w-2.5 rounded-full bg-mint shadow-[0_0_0_6px_rgba(134,217,209,0.15)] animate-pulse"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    />
                    <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="rounded-sm bg-paper/95 px-3 py-1.5 backdrop-blur">
                        <div className="font-eyebrow text-[9px] text-teal">
                          {p.label}
                        </div>
                        <div className="font-editorial text-sm text-ink">
                          {p.value}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Legend for mobile */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 lg:hidden">
              {PARTS.map((p) => (
                <div key={p.label} className="border-t border-paper/10 pt-3">
                  <div className="font-eyebrow text-[9px] text-mint">{p.label}</div>
                  <div className="font-editorial text-paper text-base">{p.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Section 05 — Specifications                                     */
/* ---------------------------------------------------------------- */

const SPECS = [
  { k: "Frame Material", v: "TR90 memory polymer" },
  { k: "Lens Type", v: "EyegisGuard™ optical grade" },
  { k: "Weight", v: "17.8 g" },
  { k: "Protection", v: "Filters 400–455 nm HEV blue light" },
  { k: "Coating", v: "Anti-reflective · Anti-scratch · Oleophobic" },
  { k: "Warranty", v: "2-year international" },
  { k: "Comfort Guarantee", v: "60 days, no questions" },
  { k: "Recommended Usage", v: "Screen work · Reading · Travel" },
];

function Specifications() {
  return (
    <section className="bg-paper-warm py-28 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <Reveal>
          <span className="font-eyebrow text-teal">Section 05</span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 max-w-3xl font-editorial text-ink text-4xl md:text-6xl lg:text-7xl leading-[0.95]">
            Specifications.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SPECS.map((s, i) => (
            <Reveal key={s.k} delay={i * 60}>
              <div className="group h-full rounded-md border border-ink/10 bg-paper p-7 transition-all duration-500 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_20px_60px_-30px_rgba(0,75,87,0.4)]">
                <div className="font-eyebrow text-[9px] text-teal">{s.k}</div>
                <div className="mt-4 font-editorial text-ink text-xl leading-snug">
                  {s.v}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Section 06 — Lifestyle                                          */
/* ---------------------------------------------------------------- */

const CONTEXTS = ["Business", "Creative", "Travel", "Gaming", "Remote Work", "Architecture"];

function Lifestyle() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="relative h-[80vh] min-h-[560px] w-full">
        <img
          src={lifestyleImg}
          alt="Meridian in a modern architectural workspace"
          loading="lazy"
          className="h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-14 pb-16 md:pb-24 text-paper">
            <Reveal>
              <span className="font-eyebrow text-mint">Section 06 · Lifestyle</span>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-6 max-w-3xl font-editorial text-4xl md:text-6xl lg:text-7xl leading-[0.95]">
                Where Meridian
                <span className="block italic text-mint">belongs.</span>
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-10 flex flex-wrap gap-2">
                {CONTEXTS.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-paper/25 px-4 py-1.5 font-eyebrow text-[10px] text-paper/85"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Section 07 — Technology recap                                   */
/* ---------------------------------------------------------------- */

function TechnologyRecap() {
  return (
    <section className="bg-paper py-28 md:py-36">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-12 gap-14 items-center px-6 md:px-10 lg:px-14">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="font-eyebrow text-teal">Section 07 · Technology</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-editorial text-ink text-4xl md:text-5xl lg:text-6xl leading-[0.95]">
              EyegisGuard™
              <span className="block italic text-teal">optical filter.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-md font-light text-lg leading-relaxed text-ink/75">
              A precisely tuned coating that attenuates the 400–455 nm band of
              high-energy visible light without shifting natural colors. No
              amber tint. No compromise.
            </p>
          </Reveal>

          {/* mini spectrum */}
          <Reveal delay={280}>
            <div className="mt-10 space-y-3">
              <div className="relative h-2 w-full max-w-md overflow-hidden rounded-full bg-ink/10">
                <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#8a4bff] via-[#4b8fff] via-40% to-[#f6d76b]" />
                <div className="absolute inset-y-0 left-[6%] w-[16%] bg-teal-deep/85" />
              </div>
              <div className="flex max-w-md justify-between font-eyebrow text-[9px] text-ink/50">
                <span>380 nm</span>
                <span className="text-teal">400 – 455 nm · filtered</span>
                <span>780 nm</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <a
              href="/#technology"
              className="mt-10 inline-flex items-center gap-3 font-eyebrow text-teal hover:text-teal-deep transition-colors"
            >
              Learn More
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-md bg-paper-warm">
              <img
                src={guardLens}
                alt="EyegisGuard optical filter study"
                loading="lazy"
                className="h-full w-full object-cover float-slow"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(134,217,209,0.14),transparent_65%)]" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Section 08 — Reviews                                            */
/* ---------------------------------------------------------------- */

const REVIEWS = [
  {
    name: "Camille R.",
    role: "Product Designer · Paris",
    text: "I wear these ten hours a day. By evening I've simply forgotten they're there — which is the highest praise I can give a pair of glasses.",
  },
  {
    name: "Andrés L.",
    role: "Software Engineer · São Paulo",
    text: "Colors on my screen still look correct, and my eyes are genuinely less tired at the end of the day. Build quality feels premium.",
  },
  {
    name: "Sophie M.",
    role: "Architect · Lisbon",
    text: "The finish is impeccable and the frame is barely there on the face. Elegant enough for client meetings, quiet enough for the studio.",
  },
];

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" />
    </svg>
  );
}

function Reviews() {
  return (
    <section className="bg-paper-warm py-28 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="font-eyebrow text-teal">Section 08 · Reviews</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-4 font-editorial text-ink text-4xl md:text-6xl leading-[0.95]">
                From people who
                <span className="italic text-teal"> wear them.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <div className="lg:col-span-5 lg:text-right">
              <div className="inline-flex flex-col items-start lg:items-end gap-1">
                <div className="flex items-center gap-1 text-teal">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                <div className="font-editorial text-2xl text-ink">
                  4.8 · Overall Rating
                </div>
                <div className="font-eyebrow text-[10px] text-ink/50">
                  Based on verified purchases
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 100}>
              <article className="h-full rounded-md border border-ink/10 bg-paper p-8 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-teal">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} />
                    ))}
                  </div>
                  <span className="font-eyebrow text-[9px] text-teal">
                    ✓ Verified Purchase
                  </span>
                </div>
                <p className="font-light text-ink/80 leading-relaxed">
                  “{r.text}”
                </p>
                <div className="mt-auto border-t border-ink/10 pt-4">
                  <div className="font-editorial text-ink">{r.name}</div>
                  <div className="font-eyebrow text-[10px] text-ink/50">
                    {r.role}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Section 09 — FAQ                                                */
/* ---------------------------------------------------------------- */

const FAQ = [
  {
    q: "Are Meridian frames compatible with prescription lenses?",
    a: "Yes. Any optician can replace the demo lenses with your prescription. The EyegisGuard™ coating can also be added to prescription lenses on request.",
  },
  {
    q: "How should I clean the frame and lenses?",
    a: "Use the microfibre cloth included in the box, with lukewarm water and a drop of neutral soap when needed. Avoid alcohol-based cleaners on the coating.",
  },
  {
    q: "What does the 2-year warranty cover?",
    a: "Manufacturing defects on frame, hinges and coating. Accidental damage and normal wear are not covered.",
  },
  {
    q: "How fast is shipping?",
    a: "Meridian is fulfilled through Amazon. Standard delivery is 1–3 business days in most regions with Prime.",
  },
  {
    q: "Can I return them?",
    a: "Yes — through our 60-day comfort guarantee. If Meridian isn't right for you, return them for a full refund.",
  },
];

function FaqItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-t border-ink/10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-8 py-6 text-left"
        aria-expanded={open}
      >
        <span className="font-editorial text-ink text-xl md:text-2xl leading-snug">
          {q}
        </span>
        <span
          className={`grid h-9 w-9 place-items-center rounded-full border border-ink/20 text-ink transition-transform duration-500 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-700 ease-out ${
          open ? "grid-rows-[1fr] opacity-100 pb-8" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl font-light text-ink/70 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

function Faq() {
  return (
    <section className="bg-paper py-28 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14">
        <Reveal>
          <span className="font-eyebrow text-teal">Section 09 · FAQ</span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 font-editorial text-ink text-4xl md:text-6xl leading-[0.95]">
            Questions,
            <span className="italic text-teal"> answered.</span>
          </h2>
        </Reveal>

        <div className="mt-14">
          {FAQ.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
          ))}
          <div className="border-t border-ink/10" />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Section 10 — Final CTA                                          */
/* ---------------------------------------------------------------- */

function FinalCta() {
  return (
    <section className="relative bg-teal-deep py-28 md:py-40 text-paper overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(134,217,209,0.25),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14 text-center">
        <Reveal>
          <span className="font-eyebrow text-mint">Meridian · by Eyegis</span>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-6 font-editorial text-5xl md:text-7xl lg:text-[104px] leading-[0.92]">
            Ready to experience
            <span className="block italic text-mint">digital comfort?</span>
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-14 flex justify-center">
            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-6 rounded-full bg-mint px-10 py-6 text-teal-deep shadow-[0_30px_80px_-30px_rgba(134,217,209,0.6)] hover:-translate-y-0.5 transition-all duration-500"
            >
              <span className="font-eyebrow text-sm">Buy on Amazon</span>
              <span
                aria-hidden="true"
                className="grid h-9 w-9 place-items-center rounded-full bg-teal-deep/10 transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </Reveal>
        <Reveal delay={340}>
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 font-eyebrow text-[10px] text-paper/70">
            <span>Secure purchase through Amazon</span>
            <span className="hidden sm:inline">·</span>
            <span>Fast shipping</span>
            <span className="hidden sm:inline">·</span>
            <span>Trusted customer support</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Sticky mobile Buy Bar                                           */
/* ---------------------------------------------------------------- */

function StickyBuy() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 md:hidden transition-transform duration-500 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl px-4 py-3 flex items-center gap-3">
        <div className="flex-1">
          <div className="font-editorial text-ink text-base leading-tight">Meridian</div>
          <div className="font-eyebrow text-[9px] text-ink/60">by Eyegis</div>
        </div>
        <a
          href={AMAZON_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-teal px-5 py-3 font-eyebrow text-paper"
        >
          Buy on Amazon
        </a>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Page                                                            */
/* ---------------------------------------------------------------- */

function MeridianProduct() {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <MiniHeader />
      <ProductHero />
      <Gallery />
      <WhyLove />
      <FrameDetails />
      <Specifications />
      <Lifestyle />
      <TechnologyRecap />
      <Reviews />
      <Faq />
      <FinalCta />
      <StickyBuy />
    </main>
  );
}
