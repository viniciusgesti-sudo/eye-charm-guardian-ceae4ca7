import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import heroImg from "@/assets/lifestyle-architecture.jpg";
import beliefImg from "@/assets/universe-portrait.jpg";
import whyImg1 from "@/assets/science-devices.jpg";
import whyImg2 from "@/assets/universe-lens-macro.jpg";
import philo1 from "@/assets/science-lens-exploded.jpg";
import philo2 from "@/assets/universe-eyewear.jpg";
import philo3 from "@/assets/guard-lens-float.jpg";
import life1 from "@/assets/life-creative.jpg";
import life2 from "@/assets/life-business.jpg";
import life3 from "@/assets/life-student.jpg";
import life4 from "@/assets/life-travel.jpg";
import life5 from "@/assets/life-gaming.jpg";
import life6 from "@/assets/lifestyle-work.jpg";
import life7 from "@/assets/lifestyle-travel.jpg";
import life8 from "@/assets/hero-paris.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Eyegis — Designed for the Way We Live Today" },
      {
        name: "description",
        content:
          "Eyegis is a premium eyewear brand built for the digital generation — pairing evidence-based optical engineering with timeless design.",
      },
      { property: "og:title", content: "About Eyegis — Designed for the Way We Live Today" },
      {
        property: "og:description",
        content:
          "A premium eyewear brand built for the digital generation. Honest science, timeless design, engineered comfort.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Reveal({
  children,
  delay = 0,
  y = 24,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  as?: any;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

const OFFWHITE = "#F6F3EE";
const CHAMPAGNE = "#E9DFCC";
const INK = "#0E1613";
const TEAL = "#0C3B39";
const MUTED = "#6B6559";

function Rule({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-10" style={{ background: INK }} />
      <span
        className="text-[10px] uppercase tracking-[0.35em]"
        style={{ color: INK, fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

function AboutPage() {
  const serif = "'Cormorant Garamond', 'Times New Roman', serif";
  const sans = "'Inter', system-ui, sans-serif";

  const philosophy = [
    {
      idx: "01",
      title: "Honest Science™",
      sub: "Evidence before marketing.",
      body: "We publish what our lenses do — and what they don't. No inflated claims, no theatrical numbers. Only measurable optical performance.",
      img: philo1,
    },
    {
      idx: "02",
      title: "Timeless Design",
      sub: "Created to be worn every day.",
      body: "Silhouettes designed to outlast trends. Proportions studied for a decade of wear, not a season of hype.",
      img: philo2,
    },
    {
      idx: "03",
      title: "Engineered Comfort",
      sub: "Technology should disappear.",
      body: "Ultralight TR90 frames, titanium hinges, hypoallergenic pads. When comfort is right, the frame simply fades away.",
      img: philo3,
    },
  ];

  const values = [
    { k: "Transparency", d: "Independent lab data, published openly. If we can't measure it, we don't claim it." },
    { k: "Quality", d: "Materials chosen for longevity — TR90, β-titanium, CR-39 optical resin, real hinge screws." },
    { k: "Craftsmanship", d: "Every frame is inspected by hand. Every lens is tested against ISO optical standards." },
    { k: "Human-Centered Design", d: "We design for real faces, real screens and real hours — not for a studio render." },
  ];

  const process = [
    { k: "Research", d: "Ergonomics, optics, dwell time." },
    { k: "Design", d: "Silhouette, proportion, weight." },
    { k: "Engineering", d: "Materials, hinges, coatings." },
    { k: "Testing", d: "Independent optical labs." },
    { k: "Refinement", d: "Iterate. Reduce. Perfect." },
    { k: "Final Product", d: "Ready for everyday life." },
  ];

  const people = [
    { img: life1, label: "Creative Professionals" },
    { img: life2, label: "Entrepreneurs" },
    { img: life3, label: "Students" },
    { img: life6, label: "Developers" },
    { img: heroImg, label: "Architects" },
    { img: life4, label: "Photographers" },
    { img: life8, label: "Business Leaders" },
    { img: life7, label: "Remote Workers" },
    { img: life5, label: "Gamers" },
    { img: beliefImg, label: "Digital Creators" },
    { img: whyImg2, label: "Travelers" },
    { img: whyImg1, label: "Every Digital Life" },
  ];

  return (
    <main
      style={{
        background: OFFWHITE,
        color: INK,
        fontFamily: sans,
      }}
    >
      {/* HERO */}
      <section className="relative min-h-[92vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Modern architecture bathed in natural light"
            className="h-full w-full object-cover"
            style={{ filter: "saturate(0.92) contrast(1.02)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(14,22,19,0.15) 0%, rgba(14,22,19,0.05) 40%, rgba(246,243,238,0.85) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-[1400px] flex-col justify-between px-6 py-10 md:px-12 md:py-14">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-[11px] uppercase tracking-[0.4em]"
              style={{ color: "#F6F3EE", fontFamily: sans }}
            >
              ← Eyegis
            </Link>
            <span
              className="text-[10px] uppercase tracking-[0.4em]"
              style={{ color: "#F6F3EE" }}
            >
              About / Est. 2024
            </span>
          </div>

          <div className="max-w-[1100px]">
            <Reveal>
              <span
                className="text-[11px] uppercase tracking-[0.5em]"
                style={{ color: INK }}
              >
                — Our Story
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h1
                className="mt-6 text-[44px] leading-[0.98] tracking-[-0.02em] md:text-[92px] lg:text-[120px]"
                style={{ fontFamily: serif, color: INK, fontWeight: 400 }}
              >
                Designed for the
                <br />
                way we live today.
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p
                className="mt-8 max-w-2xl text-[15px] leading-[1.7] md:text-[17px]"
                style={{ color: INK }}
              >
                Eyegis was created for a generation that spends more time looking at screens
                than ever before. Our mission is to make digital life more comfortable —
                without sacrificing timeless design.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 01 — OUR BELIEF */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label="01 — Our Belief" />
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="mt-10 max-w-[1200px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[76px] lg:text-[96px]"
            style={{ fontFamily: serif, fontWeight: 400 }}
          >
            Protection should never
            <br />
            compromise style.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <Reveal delay={120} className="md:col-span-5">
            <p className="text-[15px] leading-[1.85]" style={{ color: MUTED }}>
              Modern life has changed. We work, study, create, communicate and play — almost
              entirely through digital devices. Yet the objects designed to protect our eyes
              still feel like an afterthought.
            </p>
          </Reveal>
          <Reveal delay={220} className="md:col-span-5 md:col-start-8">
            <p className="text-[15px] leading-[1.85]" style={{ color: MUTED }}>
              Eyegis believes visual comfort should be part of everyday life — not a medical
              accessory, not a gimmick. Simply a beautifully engineered object you'd want to
              wear anyway.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 02 — WHY WE CREATED EYEGIS */}
      <section style={{ background: CHAMPAGNE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <Rule label="02 — Why We Created Eyegis" />
          </Reveal>

          <div className="mt-20 grid items-center gap-16 md:grid-cols-12">
            <Reveal className="md:col-span-6">
              <img
                src={whyImg1}
                alt="Screens surround modern life"
                className="h-[70vh] w-full object-cover"
              />
            </Reveal>
            <div className="md:col-span-5 md:col-start-8">
              <Reveal delay={120}>
                <h3
                  className="text-[32px] leading-[1.05] tracking-[-0.01em] md:text-[56px]"
                  style={{ fontFamily: serif, fontWeight: 400 }}
                >
                  Digital lifestyles have changed. Eyewear hasn't.
                </h3>
              </Reveal>
              <Reveal delay={220}>
                <p className="mt-8 text-[15px] leading-[1.85]" style={{ color: MUTED }}>
                  We spend eight to twelve hours a day in front of screens — phones, laptops,
                  monitors, tablets, consoles. And still, most blue-light eyewear feels stuck
                  in another decade.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-32 grid items-center gap-16 md:grid-cols-12">
            <div className="md:col-span-5 md:order-1 order-2">
              <Reveal delay={120}>
                <h3
                  className="text-[32px] leading-[1.05] tracking-[-0.01em] md:text-[56px]"
                  style={{ fontFamily: serif, fontWeight: 400 }}
                >
                  Between the lab
                  <br />
                  and the object.
                </h3>
              </Reveal>
              <Reveal delay={220}>
                <p className="mt-8 text-[15px] leading-[1.85]" style={{ color: MUTED }}>
                  Most blue-light glasses either look overly technical — or make exaggerated
                  promises they can't measure. Eyegis was created to bridge that gap: honest
                  optical engineering, expressed through timeless design.
                </p>
              </Reveal>
            </div>
            <Reveal className="md:col-span-6 md:col-start-7 md:order-2 order-1">
              <img
                src={whyImg2}
                alt="Macro detail of Eyegis lens"
                className="h-[70vh] w-full object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 — OUR PHILOSOPHY */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label="03 — Our Philosophy" />
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="mt-10 max-w-[1000px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[68px]"
            style={{ fontFamily: serif, fontWeight: 400 }}
          >
            Three principles.
            <br />
            No shortcuts.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {philosophy.map((p, i) => (
            <Reveal key={p.idx} delay={i * 120}>
              <article className="group flex h-full flex-col">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-8">
                  <span
                    className="text-[10px] uppercase tracking-[0.4em]"
                    style={{ color: MUTED }}
                  >
                    {p.idx}
                  </span>
                  <h3
                    className="mt-4 text-[34px] leading-[1.05] tracking-[-0.01em] md:text-[42px]"
                    style={{ fontFamily: serif, fontWeight: 400 }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="mt-3 text-[13px] uppercase tracking-[0.2em]"
                    style={{ color: TEAL }}
                  >
                    {p.sub}
                  </p>
                  <p
                    className="mt-6 text-[14px] leading-[1.8]"
                    style={{ color: MUTED }}
                  >
                    {p.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 04 — OUR VALUES */}
      <section style={{ background: INK, color: OFFWHITE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10" style={{ background: OFFWHITE }} />
              <span
                className="text-[10px] uppercase tracking-[0.35em]"
                style={{ color: OFFWHITE }}
              >
                04 — Our Values
              </span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="mt-10 max-w-[1100px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[76px]"
              style={{ fontFamily: serif, fontWeight: 400, color: OFFWHITE }}
            >
              Four principles that guide every decision.
            </h2>
          </Reveal>

          <div className="mt-24 grid gap-px" style={{ background: "rgba(246,243,238,0.15)" }}>
            <div className="grid gap-px md:grid-cols-2" style={{ background: "rgba(246,243,238,0.15)" }}>
              {values.map((v, i) => (
                <Reveal key={v.k} delay={i * 100}>
                  <div
                    className="flex min-h-[280px] flex-col justify-between p-10 md:min-h-[360px] md:p-16"
                    style={{ background: INK }}
                  >
                    <span
                      className="text-[10px] uppercase tracking-[0.4em]"
                      style={{ color: "rgba(246,243,238,0.55)" }}
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <h3
                        className="text-[36px] leading-[1] tracking-[-0.01em] md:text-[54px]"
                        style={{ fontFamily: serif, fontWeight: 400 }}
                      >
                        {v.k}
                      </h3>
                      <p
                        className="mt-6 max-w-md text-[14px] leading-[1.8]"
                        style={{ color: "rgba(246,243,238,0.7)" }}
                      >
                        {v.d}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 05 — DESIGN PROCESS */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label="05 — Design Process" />
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="mt-10 max-w-[1000px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[68px]"
            style={{ fontFamily: serif, fontWeight: 400 }}
          >
            From first sketch
            <br />
            to final object.
          </h2>
        </Reveal>

        <div className="mt-20 md:mt-28">
          <div className="grid gap-0 md:grid-cols-6">
            {process.map((s, i) => (
              <Reveal key={s.k} delay={i * 120}>
                <div className="relative border-t px-2 py-8 md:border-t-0 md:border-l md:px-6 md:py-0" style={{ borderColor: "rgba(14,22,19,0.15)" }}>
                  <div className="hidden md:block">
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: TEAL }}
                      />
                      <span
                        className="text-[10px] uppercase tracking-[0.35em]"
                        style={{ color: MUTED }}
                      >
                        Step 0{i + 1}
                      </span>
                    </div>
                    <h3
                      className="mt-10 text-[28px] leading-[1]"
                      style={{ fontFamily: serif, fontWeight: 400 }}
                    >
                      {s.k}
                    </h3>
                    <p className="mt-4 text-[13px] leading-[1.7]" style={{ color: MUTED }}>
                      {s.d}
                    </p>
                  </div>
                  <div className="md:hidden">
                    <div className="flex items-baseline justify-between">
                      <h3
                        className="text-[28px] leading-[1]"
                        style={{ fontFamily: serif, fontWeight: 400 }}
                      >
                        {s.k}
                      </h3>
                      <span
                        className="text-[10px] uppercase tracking-[0.35em]"
                        style={{ color: MUTED }}
                      >
                        0{i + 1}
                      </span>
                    </div>
                    <p className="mt-3 text-[13px] leading-[1.7]" style={{ color: MUTED }}>
                      {s.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — THE PEOPLE WE DESIGN FOR */}
      <section style={{ background: CHAMPAGNE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <Rule label="06 — The People We Design For" />
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="mt-10 max-w-[1100px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[72px]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              A global community
              <br />
              of digital lives.
            </h2>
          </Reveal>

          <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {people.map((p, i) => (
              <Reveal key={p.label} delay={(i % 4) * 100}>
                <figure className="group relative overflow-hidden">
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.label}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <figcaption
                    className="mt-3 text-[11px] uppercase tracking-[0.3em]"
                    style={{ color: INK }}
                  >
                    {p.label}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — GLOBAL VISION */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label="07 — Global Vision" />
        </Reveal>
        <div className="mt-16 grid items-center gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal delay={100}>
              <h2
                className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[64px]"
                style={{ fontFamily: serif, fontWeight: 400 }}
              >
                Built for the global digital generation.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-md text-[15px] leading-[1.85]" style={{ color: MUTED }}>
                International mindset. Timeless products. Premium quality — worn from Tokyo to
                São Paulo, from Paris to Los Angeles.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: INK }}>
                <span>Paris</span>
                <span>Tokyo</span>
                <span>New York</span>
                <span>Milan</span>
                <span>São Paulo</span>
                <span>London</span>
                <span>Seoul</span>
                <span>Berlin</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="md:col-span-7">
            <WorldMap />
          </Reveal>
        </div>
      </section>

      {/* 08 — OUR PROMISE */}
      <section style={{ background: TEAL, color: OFFWHITE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 md:py-52">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10" style={{ background: OFFWHITE }} />
              <span className="text-[10px] uppercase tracking-[0.35em]">08 — Our Promise</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <blockquote
              className="mt-14 max-w-[1200px] text-[32px] leading-[1.15] tracking-[-0.01em] md:text-[64px] lg:text-[80px]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              "Every pair of Eyegis glasses is designed with one simple purpose —
              help you enjoy your digital life more comfortably, while looking your best."
            </blockquote>
          </Reveal>
          <Reveal delay={240}>
            <div
              className="mt-16 text-[11px] uppercase tracking-[0.4em]"
              style={{ color: "rgba(246,243,238,0.7)" }}
            >
              — The Eyegis Team
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <div className="grid gap-16 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <h2
              className="text-[40px] leading-[1.02] tracking-[-0.02em] md:text-[88px]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              Ready to experience
              <br />
              Eyegis?
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-5">
            <p className="text-[14px] leading-[1.8]" style={{ color: MUTED }}>
              Discover the collections designed for how you actually live — or read about the
              engineering behind every lens.
            </p>
            <div className="mt-10 flex flex-col gap-3">
              <a
                href="https://www.amazon.com/eyegis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-8 py-5 text-[12px] uppercase tracking-[0.3em] transition-colors"
                style={{ background: INK, color: OFFWHITE }}
              >
                <span>Buy on Amazon</span>
                <span>↗</span>
              </a>
              <Link
                to="/"
                hash="collections"
                className="inline-flex items-center justify-between border px-8 py-5 text-[12px] uppercase tracking-[0.3em] transition-colors hover:bg-[rgba(14,22,19,0.04)]"
                style={{ borderColor: INK, color: INK }}
              >
                <span>Explore Collections</span>
                <span>→</span>
              </Link>
              <Link
                to="/lenses"
                className="inline-flex items-center justify-between border px-8 py-5 text-[12px] uppercase tracking-[0.3em] transition-colors hover:bg-[rgba(14,22,19,0.04)]"
                style={{ borderColor: "rgba(14,22,19,0.35)", color: INK }}
              >
                <span>Learn About Our Technology</span>
                <span>→</span>
              </Link>
            </div>
          </Reveal>
        </div>

        <div
          className="mt-32 flex flex-col items-start justify-between gap-6 border-t pt-10 md:flex-row md:items-center"
          style={{ borderColor: "rgba(14,22,19,0.15)" }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.4em]"
            style={{ color: MUTED }}
          >
            Eyegis © 2026 — Designed for the digital generation.
          </span>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
            <Link to="/">Home</Link>
            <Link to="/lenses">Lenses</Link>
            <Link to="/product/meridian">Meridian</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function WorldMap() {
  // Minimalist dotted world map (stylized) with pulsing city dots.
  const cities = [
    { x: 205, y: 165, name: "New York" },
    { x: 235, y: 260, name: "São Paulo" },
    { x: 430, y: 150, name: "Paris" },
    { x: 445, y: 165, name: "Milan" },
    { x: 425, y: 138, name: "London" },
    { x: 470, y: 155, name: "Berlin" },
    { x: 685, y: 175, name: "Tokyo" },
    { x: 665, y: 185, name: "Seoul" },
  ];
  const dots: { x: number; y: number }[] = [];
  const seed = (x: number, y: number) => Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
  for (let y = 40; y < 320; y += 10) {
    for (let x = 40; x < 800; x += 10) {
      const nx = (x - 420) / 380;
      const ny = (y - 180) / 140;
      const r = nx * nx + ny * ny * 1.35;
      if (r < 0.95 && seed(x, y) > 0.55) dots.push({ x, y });
    }
  }
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 840 360" className="w-full">
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={1.1}
            fill="rgba(14,22,19,0.28)"
          />
        ))}
        {cities.map((c, i) => (
          <g key={c.name}>
            <circle cx={c.x} cy={c.y} r={4} fill={TEAL} />
            <circle cx={c.x} cy={c.y} r={4} fill={TEAL}>
              <animate
                attributeName="r"
                values="4;14;4"
                dur="3.2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.5;0;0.5"
                dur="3.2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
            <text
              x={c.x + 10}
              y={c.y + 4}
              fontSize="9"
              fill={INK}
              style={{ letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}
            >
              {c.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
