import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import heroImg from "@/assets/product-hero.jpg";
import qualityImg from "@/assets/science-lens-exploded.jpg";
import promiseImg from "@/assets/universe-eyewear.jpg";

export const Route = createFileRoute("/warranty")({
  head: () => ({
    meta: [
      { title: "Warranty & 60-Day Comfort Guarantee — Eyegis" },
      {
        name: "description",
        content:
          "Every pair of Eyegis is backed by a 2-Year Manufacturing Warranty and an exclusive 60-Day Comfort Guarantee. Designed to last, backed with confidence.",
      },
      { property: "og:title", content: "Warranty & 60-Day Comfort Guarantee — Eyegis" },
      {
        property: "og:description",
        content:
          "Premium engineering. 2-Year Warranty. 60-Day Comfort Guarantee. Buy Eyegis with complete confidence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WarrantyPage,
});

const OFFWHITE = "#F6F3EE";
const CHAMPAGNE = "#E9DFCC";
const INK = "#0E1613";
const TEAL = "#0C3B39";
const MUTED = "#6B6559";

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
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Rule({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span
        className="h-px w-10"
        style={{ background: light ? OFFWHITE : INK }}
      />
      <span
        className="text-[10px] uppercase tracking-[0.35em]"
        style={{ color: light ? OFFWHITE : INK, fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

// Minimal line icons
const Icon = {
  Shield: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M20 4 L34 10 V21 C34 29 27 34 20 36 C13 34 6 29 6 21 V10 Z" />
      <path d="M14 20 L18 24 L26 15" />
    </svg>
  ),
  Frame: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="12" cy="22" r="6" />
      <circle cx="28" cy="22" r="6" />
      <path d="M18 22 h4" />
      <path d="M2 20 l4 -2 M38 20 l-4 -2" />
    </svg>
  ),
  Hinge: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="6" y="16" width="12" height="8" />
      <rect x="22" y="16" width="12" height="8" />
      <circle cx="20" cy="20" r="2" />
    </svg>
  ),
  Lens: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="20" cy="20" r="12" />
      <path d="M14 16 c2 -2 6 -2 8 0" />
    </svg>
  ),
  Craft: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M20 4 L24 16 L36 16 L26 24 L30 36 L20 28 L10 36 L14 24 L4 16 L16 16 Z" />
    </svg>
  ),
  Material: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M6 12 L20 6 L34 12 L20 18 Z" />
      <path d="M6 12 V26 L20 32 V18" />
      <path d="M34 12 V26 L20 32" />
    </svg>
  ),
  Drop: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M20 6 C20 6 10 18 10 26 A10 10 0 0 0 30 26 C30 18 20 6 20 6 Z" />
    </svg>
  ),
  Crush: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M4 20 L36 20" />
      <path d="M8 12 L32 12" />
      <path d="M12 28 L28 28" />
    </svg>
  ),
  Scratch: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="20" cy="20" r="14" />
      <path d="M10 14 L28 22 M14 26 L24 12" />
    </svg>
  ),
  Clean: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M8 8 L32 32 M8 32 L32 8" />
    </svg>
  ),
  Heat: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M14 34 C10 28 18 24 16 16 C22 20 26 12 22 6 C28 12 30 22 26 30" />
    </svg>
  ),
  Mod: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M6 30 L24 12 L28 16 L10 34 Z" />
      <path d="M22 14 L30 6 L34 10 L26 18" />
    </svg>
  ),
  // Care icons
  Cloth: () => (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M6 10 Q24 4 42 10 L38 40 Q24 46 10 40 Z" />
      <path d="M12 18 Q24 14 36 18" />
      <path d="M14 26 Q24 22 34 26" />
    </svg>
  ),
  Case: () => (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="6" y="14" width="36" height="24" rx="12" />
      <path d="M6 24 h36" />
    </svg>
  ),
  Plane: () => (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M4 26 L44 12 L38 24 L44 36 Z" />
      <path d="M18 22 L22 32" />
    </svg>
  ),
  Sun: () => (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="24" cy="24" r="8" />
      <path d="M24 6 v6 M24 36 v6 M6 24 h6 M36 24 h6 M11 11 l4 4 M33 33 l4 4 M11 37 l4 -4 M33 15 l4 -4" />
    </svg>
  ),
  Headset: () => (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M8 26 A16 16 0 0 1 40 26" />
      <rect x="6" y="26" width="8" height="14" rx="2" />
      <rect x="34" y="26" width="8" height="14" rx="2" />
    </svg>
  ),
};

function WarrantyPage() {
  const serif = "'Cormorant Garamond', 'Times New Roman', serif";
  const sans = "'Inter', system-ui, sans-serif";

  const covered = [
    { icon: <Icon.Shield />, k: "Manufacturing defects", d: "Any defect arising from our production process." },
    { icon: <Icon.Frame />, k: "Frame construction", d: "Structural integrity of the frame body." },
    { icon: <Icon.Hinge />, k: "Hinges", d: "Titanium hinge assembly and screw fittings." },
    { icon: <Icon.Material />, k: "Material defects", d: "TR90, β-titanium and acetate irregularities." },
    { icon: <Icon.Lens />, k: "Lens manufacturing", d: "Coating adhesion and optical clarity defects." },
    { icon: <Icon.Craft />, k: "Craftsmanship", d: "Assembly, alignment and finishing issues." },
  ];

  const notCovered = [
    { icon: <Icon.Drop />, k: "Accidental damage" },
    { icon: <Icon.Drop />, k: "Drops" },
    { icon: <Icon.Crush />, k: "Crushing" },
    { icon: <Icon.Scratch />, k: "Normal scratches" },
    { icon: <Icon.Clean />, k: "Improper cleaning" },
    { icon: <Icon.Heat />, k: "Heat exposure" },
    { icon: <Icon.Mod />, k: "Unauthorized modifications" },
  ];

  const qc = [
    { k: "Lens Inspection", d: "Optical clarity, coating uniformity, blue-light filtration verified." },
    { k: "Frame Inspection", d: "Material integrity, weight tolerance, finish quality." },
    { k: "Assembly Verification", d: "Hinge torque, alignment, screw seating." },
    { k: "Comfort Inspection", d: "Weight balance, nose-pad geometry, temple curvature." },
    { k: "Final Quality Approval", d: "Individually signed off before packaging." },
  ];

  const care = [
    { icon: <Icon.Cloth />, k: "Cleaning", d: "Use only the microfiber cloth and lens spray supplied. Avoid alcohol and household glass cleaners." },
    { icon: <Icon.Case />, k: "Storage", d: "Return your Eyegis to its hardshell case whenever they're not on your face." },
    { icon: <Icon.Plane />, k: "Travel", d: "Never leave your frames in a hot car or in direct sunlight for long periods." },
    { icon: <Icon.Sun />, k: "Daily use", d: "Remove your glasses with both hands to protect hinge alignment." },
    { icon: <Icon.Headset />, k: "Headset compatibility", d: "Slim TR90 temples designed to sit comfortably under most gaming and audio headsets." },
  ];

  return (
    <main style={{ background: OFFWHITE, color: INK, fontFamily: sans }}>
      {/* HERO */}
      <section className="relative min-h-[88vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Eyegis frame in soft studio light" className="h-full w-full object-cover" style={{ filter: "saturate(0.9) contrast(1.02)" }} />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(14,22,19,0.05) 0%, rgba(246,243,238,0.35) 55%, rgba(246,243,238,0.95) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-[1400px] flex-col justify-between px-6 py-10 md:px-12 md:py-14">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-[11px] uppercase tracking-[0.4em]" style={{ color: INK }}>
              ← Eyegis
            </Link>
            <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: INK }}>
              Warranty & Care
            </span>
          </div>
          <div className="max-w-[1100px]">
            <Reveal>
              <span className="text-[11px] uppercase tracking-[0.5em]" style={{ color: TEAL }}>
                — Ownership
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h1
                className="mt-6 text-[44px] leading-[0.98] tracking-[-0.02em] md:text-[92px] lg:text-[116px]"
                style={{ fontFamily: serif, fontWeight: 400 }}
              >
                Designed to last.
                <br />
                Backed with confidence.
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 max-w-2xl text-[15px] leading-[1.75] md:text-[17px]" style={{ color: INK }}>
                Every pair of Eyegis glasses is engineered with premium materials and backed by a
                comprehensive warranty and comfort guarantee.
              </p>
            </Reveal>
            <Reveal delay={340}>
              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 text-[10px] uppercase tracking-[0.35em]" style={{ color: INK }}>
                <span>2-Year Warranty</span>
                <span>60-Day Comfort Guarantee</span>
                <span>Individually Inspected</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 01 — OUR PROMISE */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label="01 — Our Promise" />
        </Reveal>
        <Reveal delay={120}>
          <h2
            className="mt-10 max-w-[1200px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[76px] lg:text-[92px]"
            style={{ fontFamily: serif, fontWeight: 400 }}
          >
            Confidence begins
            <br />
            before your first wear.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <Reveal delay={160} className="md:col-span-5">
            <p className="text-[15px] leading-[1.85]" style={{ color: MUTED }}>
              Every Eyegis frame is covered by a 2-Year Manufacturing Warranty and our exclusive
              60-Day Comfort Guarantee — a commitment to the object you wear every day.
            </p>
          </Reveal>
          <Reveal delay={260} className="md:col-span-5 md:col-start-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div
                  className="text-[56px] leading-none tracking-[-0.02em]"
                  style={{ fontFamily: serif, color: TEAL }}
                >
                  2 yr
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.35em]" style={{ color: INK }}>
                  Manufacturing Warranty
                </div>
              </div>
              <div>
                <div
                  className="text-[56px] leading-none tracking-[-0.02em]"
                  style={{ fontFamily: serif, color: TEAL }}
                >
                  60 d
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.35em]" style={{ color: INK }}>
                  Comfort Guarantee
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 — 2-YEAR WARRANTY */}
      <section style={{ background: CHAMPAGNE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <Rule label="02 — 2-Year Warranty" />
          </Reveal>

          <div className="mt-14 grid gap-16 md:grid-cols-12 md:items-end">
            <Reveal delay={100} className="md:col-span-7">
              <h2
                className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[64px]"
                style={{ fontFamily: serif, fontWeight: 400 }}
              >
                What's covered.
              </h2>
            </Reveal>
            <Reveal delay={200} className="md:col-span-4 md:col-start-9">
              <p className="text-[13px] leading-[1.8]" style={{ color: MUTED }}>
                Two years of coverage from the date of purchase against defects in materials and
                workmanship — verified with proof of purchase from Amazon or an authorized retailer.
              </p>
            </Reveal>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: "rgba(14,22,19,0.12)" }}>
            {covered.map((c, i) => (
              <Reveal key={c.k} delay={(i % 3) * 100}>
                <div className="flex min-h-[260px] flex-col justify-between p-10" style={{ background: CHAMPAGNE, color: INK }}>
                  <div style={{ color: TEAL }}>{c.icon}</div>
                  <div>
                    <h3
                      className="text-[26px] leading-[1.1]"
                      style={{ fontFamily: serif, fontWeight: 400 }}
                    >
                      {c.k}
                    </h3>
                    <p className="mt-3 text-[13px] leading-[1.7]" style={{ color: MUTED }}>
                      {c.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — NOT COVERED */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label="03 — Outside the Warranty" />
        </Reveal>
        <div className="mt-14 grid gap-16 md:grid-cols-12 md:items-end">
          <Reveal delay={100} className="md:col-span-7">
            <h2
              className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[64px]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              Wear is part of the story.
            </h2>
          </Reveal>
          <Reveal delay={200} className="md:col-span-4 md:col-start-9">
            <p className="text-[13px] leading-[1.8]" style={{ color: MUTED }}>
              A few situations sit outside our warranty. Our care team is happy to help with
              replacement parts or paid repairs for any of the following.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-4 lg:grid-cols-7">
          {notCovered.map((n, i) => (
            <Reveal key={n.k} delay={(i % 4) * 80}>
              <div className="flex flex-col items-start">
                <div style={{ color: INK, opacity: 0.75 }}>{n.icon}</div>
                <p
                  className="mt-6 text-[13px] leading-[1.4]"
                  style={{ color: INK }}
                >
                  {n.k}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 04 — 60-DAY COMFORT GUARANTEE */}
      <section style={{ background: TEAL, color: OFFWHITE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <Rule label="04 — 60-Day Comfort Guarantee" light />
          </Reveal>

          <div className="mt-12 grid gap-16 md:grid-cols-12 md:items-center">
            <Reveal delay={120} className="md:col-span-7">
              <h2
                className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[76px] lg:text-[92px]"
                style={{ fontFamily: serif, fontWeight: 400, color: OFFWHITE }}
              >
                Comfort should never
                <br />
                be a gamble.
              </h2>
            </Reveal>
            <Reveal delay={240} className="md:col-span-4 md:col-start-9">
              <p className="text-[14px] leading-[1.85]" style={{ color: "rgba(246,243,238,0.8)" }}>
                If you don't experience the visual comfort you expect from Eyegis, our team will
                work directly with you to find the best solution — whether that's a fit
                adjustment, a different collection, or a full resolution through Amazon.
              </p>
              <p className="mt-6 text-[11px] uppercase tracking-[0.3em]" style={{ color: "rgba(246,243,238,0.55)" }}>
                A customer satisfaction commitment. Not a medical guarantee.
              </p>
            </Reveal>
          </div>

          <Reveal delay={340}>
            <a
              href="mailto:care@eyegis.com"
              className="mt-20 inline-flex items-center gap-4 border px-8 py-5 text-[11px] uppercase tracking-[0.35em] transition-colors hover:bg-[rgba(246,243,238,0.08)]"
              style={{ borderColor: OFFWHITE, color: OFFWHITE }}
            >
              <span>Reach the Care Team</span>
              <span>→</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* 05 — QUALITY CONTROL */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label="05 — Quality Control" />
        </Reveal>

        <div className="mt-14 grid gap-16 md:grid-cols-12 md:items-end">
          <Reveal delay={100} className="md:col-span-6">
            <h2
              className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[68px]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              Five checkpoints.
              <br />
              Every single pair.
            </h2>
          </Reveal>
          <Reveal delay={200} className="md:col-span-5 md:col-start-8">
            <p className="text-[14px] leading-[1.85]" style={{ color: MUTED }}>
              Before an Eyegis frame is boxed, it passes through a five-stage inspection process —
              each stage signed off by a real person, not a scanner.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-16 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-5">
            <img src={qualityImg} alt="Eyegis lens engineering detail" className="h-[70vh] w-full object-cover" />
          </Reveal>

          <div className="md:col-span-6 md:col-start-7">
            <ol className="relative border-l" style={{ borderColor: "rgba(14,22,19,0.15)" }}>
              {qc.map((s, i) => (
                <Reveal key={s.k} delay={i * 120}>
                  <li className="relative pl-10 pr-2 py-8">
                    <span
                      className="absolute -left-[6px] top-11 h-3 w-3 rounded-full"
                      style={{ background: TEAL }}
                    />
                    <div className="flex items-baseline justify-between gap-6">
                      <h3
                        className="text-[26px] leading-[1.1]"
                        style={{ fontFamily: serif, fontWeight: 400 }}
                      >
                        {s.k}
                      </h3>
                      <span
                        className="text-[10px] uppercase tracking-[0.35em]"
                        style={{ color: MUTED }}
                      >
                        Step 0{i + 1}
                      </span>
                    </div>
                    <p className="mt-3 max-w-lg text-[13px] leading-[1.75]" style={{ color: MUTED }}>
                      {s.d}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 06 — CARE GUIDE */}
      <section style={{ background: CHAMPAGNE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <Rule label="06 — Care Guide" />
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="mt-10 max-w-[1200px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[72px]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              Small rituals.
              <br />
              A frame that lasts.
            </h2>
          </Reveal>

          <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {care.map((c, i) => (
              <Reveal key={c.k} delay={(i % 3) * 100}>
                <article
                  className="flex h-full min-h-[340px] flex-col justify-between p-10"
                  style={{ background: OFFWHITE }}
                >
                  <div style={{ color: TEAL }}>{c.icon}</div>
                  <div>
                    <h3
                      className="text-[30px] leading-[1.05]"
                      style={{ fontFamily: serif, fontWeight: 400 }}
                    >
                      {c.k}
                    </h3>
                    <p className="mt-4 text-[13px] leading-[1.75]" style={{ color: MUTED }}>
                      {c.d}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — NEED HELP */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label="07 — Need Help" />
        </Reveal>

        <div className="mt-14 grid gap-16 md:grid-cols-12 md:items-end">
          <Reveal delay={100} className="md:col-span-7">
            <h2
              className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[64px]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              A team, not a form.
            </h2>
          </Reveal>
          <Reveal delay={200} className="md:col-span-4 md:col-start-9">
            <p className="text-[13px] leading-[1.8]" style={{ color: MUTED }}>
              Real people, responding within one business day. Choose the channel that suits you.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: "rgba(14,22,19,0.12)" }}>
          {[
            { k: "Contact Support", d: "care@eyegis.com", href: "mailto:care@eyegis.com" },
            { k: "Shipping & Returns", d: "Managed by Amazon", href: "https://www.amazon.com/gp/help/customer/display.html" },
            { k: "Amazon Orders", d: "Track & return orders", href: "https://www.amazon.com/gp/your-account/order-history" },
            { k: "FAQ", d: "Answers on lenses, fit & care", href: "/lenses" },
          ].map((b, i) => (
            <Reveal key={b.k} delay={i * 100}>
              <a
                href={b.href}
                target={b.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex h-full min-h-[220px] flex-col justify-between p-10 transition-colors hover:bg-[rgba(14,22,19,0.03)]"
                style={{ background: OFFWHITE, color: INK }}
              >
                <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: MUTED }}>
                  0{i + 1}
                </span>
                <div>
                  <h3
                    className="text-[26px] leading-[1.05]"
                    style={{ fontFamily: serif, fontWeight: 400 }}
                  >
                    {b.k}
                  </h3>
                  <p className="mt-3 text-[12px] leading-[1.7]" style={{ color: MUTED }}>
                    {b.d}
                  </p>
                </div>
                <span
                  className="mt-8 text-[11px] uppercase tracking-[0.35em] transition-transform group-hover:translate-x-1"
                  style={{ color: TEAL }}
                >
                  Open →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden" style={{ background: INK, color: OFFWHITE }}>
        <div className="absolute inset-0 opacity-25">
          <img src={promiseImg} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-32 md:px-12 md:py-52">
          <div className="grid gap-16 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-7">
              <h2
                className="text-[40px] leading-[1.02] tracking-[-0.02em] md:text-[92px]"
                style={{ fontFamily: serif, fontWeight: 400, color: OFFWHITE }}
              >
                Buy with
                <br />
                confidence.
              </h2>
              <p
                className="mt-8 max-w-md text-[14px] leading-[1.85]"
                style={{ color: "rgba(246,243,238,0.75)" }}
              >
                Every pair is protected by our 2-Year Warranty and 60-Day Comfort Guarantee.
              </p>
            </Reveal>
            <Reveal delay={120} className="md:col-span-5">
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.amazon.com/eyegis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-8 py-5 text-[12px] uppercase tracking-[0.3em] transition-colors"
                  style={{ background: OFFWHITE, color: INK }}
                >
                  <span>Buy on Amazon</span>
                  <span>↗</span>
                </a>
                <Link
                  to="/"
                  hash="collections"
                  className="inline-flex items-center justify-between border px-8 py-5 text-[12px] uppercase tracking-[0.3em] transition-colors hover:bg-[rgba(246,243,238,0.08)]"
                  style={{ borderColor: OFFWHITE, color: OFFWHITE }}
                >
                  <span>Explore Collections</span>
                  <span>→</span>
                </Link>
              </div>
            </Reveal>
          </div>

          <div
            className="mt-24 flex flex-col items-start justify-between gap-6 border-t pt-10 md:flex-row md:items-center"
            style={{ borderColor: "rgba(246,243,238,0.2)" }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "rgba(246,243,238,0.5)" }}>
              Eyegis © 2026 — Warranty & Care
            </span>
            <div className="flex gap-8 text-[10px] uppercase tracking-[0.4em]" style={{ color: "rgba(246,243,238,0.7)" }}>
              <Link to="/">Home</Link>
              <Link to="/lenses">Lenses</Link>
              <Link to="/about">About</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
