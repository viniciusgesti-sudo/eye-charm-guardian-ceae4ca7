/**
 * HonestScience — comprehensive scientific credibility section.
 * Palette: Deep Teal #004B57, Champagne #E2D1C3, Mint #86D9D1, Obsidian #1D252D, Off-white #F9F9F9
 */
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import lensScene from "@/assets/lens-scene.jpg.asset.json";

const TEAL = "#004B57";
const CHAMPAGNE = "#E2D1C3";
const MINT = "#86D9D1";
const INK = "#1D252D";
const PAPER = "#F9F9F9";

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em]"
      style={{ color: TEAL }}
    >
      <span style={{ color: "#4A5560" }}>{n}</span>
      <span className="h-px w-8" style={{ background: TEAL, opacity: 0.4 }} />
      <span>{children}</span>
    </div>
  );
}

/* ————— Pictograms ————— */
function PictoSpectrum() {
  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="28" stroke={TEAL} strokeWidth="1.5" opacity="0.4" />
      {[16, 22, 28, 34, 40, 46].map((x, i) => (
        <line
          key={i}
          x1={x}
          x2={x}
          y1={22 + i}
          y2={42 - i}
          stroke={TEAL}
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
function PictoEye() {
  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="28" stroke={TEAL} strokeWidth="1.5" opacity="0.4" />
      <path
        d="M12 32 C20 20 26 18 32 18 C38 18 44 20 52 32 C44 44 38 46 32 46 C26 46 20 44 12 32 Z"
        stroke={TEAL}
        strokeWidth="1.8"
      />
      <circle cx="32" cy="32" r="7" stroke={TEAL} strokeWidth="1.8" />
      <circle cx="32" cy="32" r="2.5" fill={TEAL} />
    </svg>
  );
}
function PictoMoon() {
  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="28" stroke={TEAL} strokeWidth="1.5" opacity="0.4" />
      <path
        d="M42 18 A16 16 0 1 0 50 44 A13 13 0 0 1 42 18 Z"
        stroke={TEAL}
        strokeWidth="1.8"
      />
      <circle cx="20" cy="22" r="1.2" fill={TEAL} />
      <circle cx="18" cy="42" r="1" fill={TEAL} />
    </svg>
  );
}
function PictoShield() {
  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="28" stroke={TEAL} strokeWidth="1.5" opacity="0.4" />
      <path
        d="M32 12 L48 18 V34 C48 42 41 50 32 53 C23 50 16 42 16 34 V18 Z"
        stroke={TEAL}
        strokeWidth="1.8"
      />
      <path
        d="M25 32 L30 37 L40 26"
        stroke={TEAL}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* 1. Hero */
function Hero() {
  return (
    <section
      className="relative overflow-hidden px-6 py-16 md:px-12 md:py-40"
      style={{ background: INK, color: PAPER }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(${MINT} 1px, transparent 1px), linear-gradient(90deg, ${MINT} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[360px] w-[360px] max-w-full -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${TEAL}55, transparent 65%)` }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <span
          className="font-mono text-[11px] uppercase tracking-[0.32em]"
          style={{ color: MINT }}
        >
          § Honest Science™
        </span>
        <h2 className="mt-6 font-editorial text-4xl leading-[1.05] md:text-6xl">
          The science behind the lenses.{" "}
          <span className="italic" style={{ color: MINT }}>
            Without the marketing myths.
          </span>
        </h2>
        <p
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed md:text-lg"
          style={{ color: "rgba(249,249,249,0.72)" }}
        >
          The blue-light market is filled with confusion, exaggerated claims,
          and misleading numbers. Our goal is simple: explain what we know,
          what we don't know, and how our lenses are engineered.
        </p>
        <div
          className="mx-auto mt-8 h-px w-24"
          style={{
            background: `linear-gradient(90deg, transparent, ${MINT}, transparent)`,
          }}
        />
      </div>
    </section>
  );
}

/* 2. Spectrum */
function SpectrumSection() {
  return (
    <section
      className="relative px-6 py-10 md:px-12 md:py-36"
      style={{ background: PAPER, color: INK }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex items-start gap-4">
          <PictoSpectrum />
          <div>
            <SectionLabel n="§ 01">Spectrum</SectionLabel>
            <h3
              className="mt-4 font-editorial text-3xl leading-tight md:text-5xl"
              style={{ color: TEAL }}
            >
              Blue light is not <span className="italic">one single thing</span>.
            </h3>
          </div>
        </div>

        <p
          className="mt-8 max-w-3xl text-[15px] leading-relaxed md:text-base"
          style={{ color: "rgba(29,37,45,0.78)" }}
        >
          "Blue light" is often marketed as one specific threat. In reality, it
          spans a broad spectrum of visible wavelengths between{" "}
          <strong>380 and 500 nanometers</strong>. Think of it like UV light:
          it's a category, not a single wavelength.
        </p>

        <div className="mt-8">
          <div className="relative">
            <div
              className="h-14 w-full rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
              style={{
                background:
                  "linear-gradient(90deg, #3B1F6B 0%, #4B2AA0 15%, #3D3FD1 30%, #2960E8 50%, #1E8BFF 72%, #22C6E5 100%)",
              }}
            />
            {/* Retina zone marker (~435-440nm) */}
            <div
              className="absolute -top-2 flex h-[68px] w-[8%] flex-col items-center"
              style={{ left: "26%" }}
            >
              <div
                className="h-full w-full rounded-md"
                style={{ boxShadow: `inset 0 0 0 2px ${MINT}, 0 0 0 2px ${MINT}` }}
              />
            </div>
            <div
              className="absolute font-mono text-[9px] uppercase tracking-[0.2em]"
              style={{ left: "26%", top: "76px", color: TEAL }}
            >
              Retina · 435–440
            </div>

            {/* Circadian zone marker (~480nm) */}
            <div
              className="absolute -top-2 flex h-[68px] w-[8%] flex-col items-center"
              style={{ left: "78%" }}
            >
              <div
                className="h-full w-full rounded-md"
                style={{ boxShadow: `inset 0 0 0 2px ${MINT}, 0 0 0 2px ${MINT}` }}
              />
            </div>
            <div
              className="absolute font-mono text-[9px] uppercase tracking-[0.2em]"
              style={{ right: "10%", top: "76px", color: TEAL }}
            >
              Circadian · ~480
            </div>
          </div>

          <div
            className="mt-8 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: "#3A4450" }}

          >
            <span>380 nm</span>
            <span>400</span>
            <span>420</span>
            <span>440</span>
            <span>460</span>
            <span>480</span>
            <span>500 nm</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 3. Retina vs Circadian — driven by a wavelength slider */
function RetinaVsCircadian() {
  const [nm, setNm] = useState(437);
  const mode: "retina" | "circadian" = nm <= 460 ? "retina" : "circadian";

  return (
    <section
      className="relative px-6 py-10 md:px-12 md:py-24"
      style={{ background: PAPER, borderTop: `1px solid ${TEAL}15` }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <SectionLabel n="§ 02">Two mechanisms</SectionLabel>
          <h3
            className="mt-4 font-editorial text-3xl leading-tight md:text-4xl"
            style={{ color: TEAL }}
          >
            Retina vs Circadian.
          </h3>
        </div>

        {/* Wavelength selector */}
        <div className="mt-6 max-w-2xl">
          <div
            className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: "rgba(29,37,45,0.55)" }}
          >
            <span>380 nm</span>
            <span style={{ color: TEAL }}>
              λ {nm} nm · {mode === "retina" ? "Retina zone" : "Circadian zone"}
            </span>
            <span>500 nm</span>
          </div>
          <input
            type="range"
            min={380}
            max={500}
            step={1}
            value={nm}
            onChange={(e) => setNm(Number(e.target.value))}
            aria-label="Wavelength selector, 380 to 500 nanometres"
            className="mt-3 h-2 w-full cursor-ew-resize appearance-none rounded-full accent-[#004B57]"
            style={{
              background:
                "linear-gradient(90deg,#3B1F6B 0%,#4B2AA0 15%,#3D3FD1 30%,#2960E8 50%,#1E8BFF 72%,#22C6E5 100%)",
            }}
          />
        </div>

        <div className="mt-6">
          {mode === "retina" ? (
            <article className="relative rounded-2xl bg-white p-8 shadow-[0_30px_80px_-40px_rgba(0,75,87,0.25)] ring-1 ring-[#004B57]/10">
              <div className="flex items-center gap-4">
                <PictoEye />
                <div>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.28em]"
                    style={{ color: TEAL }}
                  >
                    Retina
                  </span>
                  <h4 className="mt-1 font-editorial text-2xl" style={{ color: INK }}>
                    Photobiological hazard
                  </h4>
                </div>
              </div>
              <p
                className="mt-5 max-w-2xl text-[15px] leading-relaxed"
                style={{ color: "rgba(29,37,45,0.8)" }}
              >
                Research on photobiological hazards identifies a peak sensitivity
                in the blue-violet region, around <strong>435–440 nm</strong>.
              </p>
              <p
                className="mt-5 border-t pt-4 font-mono text-[10px] uppercase tracking-[0.2em]"
                style={{ borderColor: `${TEAL}20`, color: "rgba(29,37,45,0.55)" }}
              >
                Ref. ICNIRP 2013 · ANSI 2015
              </p>
            </article>
          ) : (
            <article
              className="relative rounded-2xl p-8 shadow-[0_30px_80px_-40px_rgba(0,75,87,0.4)] ring-1"
              style={{ background: TEAL, color: PAPER, borderColor: `${MINT}30` }}
            >
              <div className="flex items-center gap-4">
                <div className="[&_svg_*]:!stroke-[#86D9D1] [&_svg_circle:last-child]:!fill-[#86D9D1]">
                  <PictoMoon />
                </div>
                <div>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.28em]"
                    style={{ color: MINT }}
                  >
                    Circadian
                  </span>
                  <h4 className="mt-1 font-editorial text-2xl">Biological clock</h4>
                </div>
              </div>
              <p
                className="mt-5 max-w-2xl text-[15px] leading-relaxed"
                style={{ color: "rgba(249,249,249,0.85)" }}
              >
                The body's internal clock is most sensitive to slightly longer
                blue wavelengths, centered around roughly <strong>480 nm</strong>.
              </p>
              <p
                className="mt-5 border-t pt-4 font-mono text-[10px] uppercase tracking-[0.2em]"
                style={{ borderColor: `${MINT}30`, color: "rgba(249,249,249,0.55)" }}
              >
                Ref. CIE S 026/E:2018
              </p>
            </article>
          )}
        </div>

        <p
          className="mx-auto mt-6 max-w-2xl text-center font-editorial text-lg italic md:text-xl"
          style={{ color: TEAL }}
        >
          Because the biological mechanisms and wavelengths are different,
          Eyegis targets them as{" "}
          <span style={{ color: INK }}>two separate problems</span>.
        </p>
      </div>
    </section>
  );
}

/* 4. Selective filtering */
function SelectiveFiltering() {
  return (
    <section
      className="relative px-6 py-10 md:px-12 md:py-24"
      style={{ background: INK, color: PAPER }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div>
          <div className="flex items-start gap-4">
            <div className="[&_svg_*]:!stroke-[#86D9D1]">
              <PictoSpectrum />
            </div>
            <div>
              <div
                className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em]"
                style={{ color: MINT }}
              >
                <span>§ 03</span>
                <span className="h-px w-8" style={{ background: MINT, opacity: 0.4 }} />
                <span>Selective filtering</span>
              </div>
              <h3 className="mt-4 font-editorial text-3xl leading-tight md:text-4xl">
                Why selective filtering{" "}
                <span className="italic" style={{ color: MINT }}>
                  matters
                </span>
                .
              </h3>
            </div>
          </div>

          <div
            className="mt-6 space-y-5 text-[15px] leading-relaxed"
            style={{ color: "rgba(249,249,249,0.78)" }}
          >
            <p>
              Many brands advertise a single, catch-all number:{" "}
              <em>"Blocks 40%"</em>, <em>"Blocks 60%"</em>, or{" "}
              <em>"Blocks 90%"</em>. These metrics are highly misleading because
              they depend entirely on which wavelengths are included in the math.
            </p>
            <p>
              A lens could block large amounts of relatively less relevant
              wavelengths while allowing much of the critical range to pass
              through. Actually, the cornea already filters close to 100% of
              blue-light on the lowest wavelengths (~380 nm to 400 nm).
            </p>
            <p
              className="font-editorial text-xl italic"
              style={{ color: MINT }}
            >
              Eyegis measures performance where it actually matters, not where it
              inflates a marketing claim.
            </p>
          </div>
        </div>

        {/* Comparison table — heavy vs selective filtering */}
        <FilteringComparison />
      </div>
    </section>
  );
}

/* Heavy vs selective filtering — editorial comparison table */
function FilteringComparison() {
  const rows = [
    {
      heavy: {
        title: "Blocks a wide range of wavelengths",
        body: "Including beneficial blue and turquoise light.",
      },
      selective: {
        title: "Targets high-energy blue light",
        body: "Preserves the wavelengths that support well-being.",
      },
    },
    {
      heavy: {
        title: "Lower color fidelity",
        body: "Colors appear less vibrant, more amber.",
      },
      selective: {
        title: "High color fidelity",
        body: "Natural, true-to-life colors with no amber cast.",
      },
    },
    {
      heavy: {
        title: "Altered visual experience",
        body: "Can impact depth perception and overall comfort.",
      },
      selective: {
        title: "Optimized visual comfort",
        body: "Designed for all-day use in digital environments.",
      },
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-white/10">
      <div className="grid grid-cols-2">
        <div className="border-b border-r px-5 py-4" style={{ borderColor: `${TEAL}18` }}>
          <div
            className="font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: "#C07A2E" }}
          >
            Heavy filtering
          </div>
          <div className="mt-1 text-[11px]" style={{ color: "rgba(29,37,45,0.6)" }}>
            Broad wavelength reduction
          </div>
        </div>
        <div className="border-b px-5 py-4" style={{ borderColor: `${TEAL}18` }}>
          <div
            className="font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: TEAL }}
          >
            Selective filtering
          </div>
          <div className="mt-1 text-[11px]" style={{ color: "rgba(29,37,45,0.6)" }}>
            Targeted wavelength reduction
          </div>
        </div>

        {rows.map((row) => (
          <Fragment key={row.heavy.title}>
            <div
              className="border-b border-r px-5 py-4"
              style={{ borderColor: `${TEAL}12` }}
            >
              <div className="text-[13px] font-semibold" style={{ color: INK }}>
                {row.heavy.title}
              </div>
              <div
                className="mt-1 text-[12px] leading-relaxed"
                style={{ color: "rgba(29,37,45,0.6)" }}
              >
                {row.heavy.body}
              </div>
            </div>
            <div className="border-b px-5 py-4" style={{ borderColor: `${TEAL}12` }}>
              <div className="text-[13px] font-semibold" style={{ color: INK }}>
                {row.selective.title}
              </div>
              <div
                className="mt-1 text-[12px] leading-relaxed"
                style={{ color: "rgba(29,37,45,0.6)" }}
              >
                {row.selective.body}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
/* 4. The right balance */
function RightBalance() {
  const lenses = [
    {
      label: "Heavy orange lens",
      note: "Broad spectrum filtering",
      filter: "sepia(0.55) saturate(1.5) hue-rotate(-18deg) contrast(1.02)",
    },
    {
      label: "EyegisGuard™ lens",
      note: "Targeted filtering",
      filter: "saturate(1.04) contrast(1.03)",
    },
    {
      label: "Clear lens",
      note: "No filtering",
      filter: "saturate(1.08) hue-rotate(6deg)",
    },
  ];

  const practice = [
    { title: "Targeted filtering", body: "Focus on what matters most." },
    { title: "Superior color fidelity", body: "Natural colors you can trust." },
    { title: "More comfortable everyday use", body: "Less strain, more well-being." },
    { title: "No extreme orange tint", body: "Clear appearance, confident look." },
  ];

  return (
    <section
      className="relative px-6 py-10 md:px-12 md:py-20"
      style={{ background: PAPER, color: INK }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionLabel n="§ 04">Science</SectionLabel>
            <h3
              className="mt-4 font-editorial text-3xl leading-tight md:text-4xl"
              style={{ color: INK }}
            >
              The <span style={{ color: TEAL }}>right</span> balance.
            </h3>
            <div className="mt-4 h-px w-10" style={{ background: `${TEAL}60` }} />

            <div
              className="mt-6 space-y-4 text-[14px] leading-relaxed"
              style={{ color: "rgba(29,37,45,0.75)" }}
            >
              <p>
                At Eyegis, we believe in a balanced and honest approach to
                blue-light filtering. While reaching 100% blue-light filtering is
                possible, it is at the cost of major light and color distortions.
              </p>
              <p>
                Our goal is to provide{" "}
                <span style={{ color: TEAL }}>targeted filtering</span> where
                scientific evidence suggests it matters most while preserving a
                natural visual experience, finding the{" "}
                <span style={{ color: TEAL }}>right balance</span> between
                filtering and comfort of use.
              </p>
            </div>

            <p
              className="mt-8 font-mono text-[10px] uppercase tracking-[0.24em]"
              style={{ color: TEAL }}
            >
              In practice, this means:
            </p>
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:grid-cols-2">
              {practice.map((p) => (
                <div key={p.title}>
                  <span
                    className="grid h-8 w-8 place-items-center rounded-full"
                    style={{ background: `${MINT}25`, color: TEAL }}
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <div
                    className="mt-3 font-mono text-[9px] uppercase leading-snug tracking-[0.16em]"
                    style={{ color: INK }}
                  >
                    {p.title}
                  </div>
                  <div
                    className="mt-1 text-[11px] leading-relaxed"
                    style={{ color: "rgba(29,37,45,0.6)" }}
                  >
                    {p.body}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Three-lens comparison */}
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {lenses.map((l) => (
              <figure key={l.label}>
                <figcaption>
                  <div
                    className="font-mono text-[9px] uppercase tracking-[0.18em]"
                    style={{ color: l.label.startsWith("Heavy") ? "#C07A2E" : TEAL }}
                  >
                    {l.label}
                  </div>
                  <div
                    className="mt-1 text-[10px]"
                    style={{ color: "rgba(29,37,45,0.55)" }}
                  >
                    {l.note}
                  </div>
                </figcaption>
                <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-[#004B57]/10">
                  <img
                    src={lensScene.url}
                    alt={`Mountain lake seen through a ${l.label}`}
                    loading="lazy"
                    width={768}
                    height={1024}
                    className="aspect-[3/4] w-full object-cover"
                    style={{ filter: l.filter }}
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>

        {/* Closing strip */}
        <div
          className="mt-10 flex flex-col gap-6 rounded-2xl bg-white px-6 py-6 ring-1 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: `${TEAL}18` }}
        >
          <div className="flex items-center gap-4">
            <PictoShield />
            <p className="text-sm" style={{ color: "rgba(29,37,45,0.8)" }}>
              Balance is not a compromise.
              <br />
              <span className="font-editorial italic" style={{ color: TEAL }}>
                It's precision.
              </span>
            </p>
          </div>
          <p
            className="max-w-xs text-[12px] leading-relaxed"
            style={{ color: "rgba(29,37,45,0.6)" }}
          >
            EyegisGuard™ is engineered to filter what matters most while
            preserving what matters to you.
          </p>
          <a
            href="#our-technology"
            className="group inline-flex items-center gap-2 self-start rounded-full border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] transition hover:bg-[#004B57] hover:text-white"
            style={{ borderColor: `${TEAL}40`, color: TEAL }}
          >
            Discover EyegisGuard™ Technology
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* 7. E-Guard Scores */
function EGuardScores() {
  return (
    <section
      className="relative px-6 py-10 md:px-12 md:py-36"
      style={{ background: PAPER, color: INK }}
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start gap-4">
          <PictoShield />
          <div>
            <SectionLabel n="§ 06">E-Guard Scores</SectionLabel>
            <h3
              className="mt-4 font-editorial text-3xl leading-tight md:text-5xl"
              style={{ color: TEAL }}
            >
              Understanding <span className="italic">E-Guard Scores</span>.
            </h3>
          </div>
        </div>

        <div
          className="mt-8 space-y-6 text-[15px] leading-relaxed"
          style={{ color: "rgba(29,37,45,0.78)" }}
        >
          <p>
            The <strong>E-Guard Retina</strong> and{" "}
            <strong>E-Guard Circadian</strong> scores are proprietary Eyegis
            indicators. They are inspired by published scientific literature,
            including work from the CIE and research on circadian light
            exposure.
          </p>
          <p
            className="rounded-xl border-l-4 px-5 py-4 italic"
            style={{
              borderColor: MINT,
              background: `${MINT}12`,
              color: TEAL,
            }}
          >
            They are <strong>not medical certifications</strong> and should not
            be interpreted as medical claims.
          </p>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-2">
          <div
            className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1"
            style={{ borderColor: `${TEAL}18` }}
          >
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full font-mono text-sm font-bold"
              style={{ background: TEAL, color: MINT }}
            >
              R
            </span>
            <div>
              <div className="font-editorial text-lg" style={{ color: TEAL }}>
                E-Guard Retina
              </div>
              <div
                className="mt-0.5 text-xs"
                style={{ color: "rgba(29,37,45,0.6)" }}
              >
                Blue-violet filtering
              </div>
            </div>
          </div>
          <div
            className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1"
            style={{ borderColor: `${TEAL}18` }}
          >
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full font-mono text-sm font-bold"
              style={{ background: TEAL, color: MINT }}
            >
              C
            </span>
            <div>
              <div className="font-editorial text-lg" style={{ color: TEAL }}>
                E-Guard Circadian
              </div>
              <div
                className="mt-0.5 text-xs"
                style={{ color: "rgba(29,37,45,0.6)" }}
              >
                Circadian-related blue-light filtering
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 8. References */
function References() {
  const refs = [
    "International Commission on Illumination (CIE) — Blue Light Hazard",
    "Harvard Medical School — Blue Light Has a Dark Side",
    "National Sleep Foundation — Light and Sleep",
    "CIE — Melanopic Metrics",
  ];
  return (
    <section
      className="relative px-6 py-9 md:px-12"
      style={{ background: INK, color: "rgba(249,249,249,0.7)" }}
    >
      <div className="mx-auto max-w-4xl">
        <div
          className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em]"
          style={{ color: MINT }}
        >
          <span>§ References</span>
          <span className="h-px flex-1" style={{ background: `${MINT}30` }} />
        </div>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {refs.map((r, i) => (
            <li
              key={r}
              className="flex items-start gap-3 text-xs leading-relaxed"
            >
              <span className="font-mono opacity-90">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HonestScience() {
  return (
    <section id="honest-science" aria-label="Honest Science">
      <Hero />
      <SpectrumSection />
      <RetinaVsCircadian />
      <SelectiveFiltering />
      <OrangeDistortion />
      <MiddleGround />
      <EGuardScores />
      <References />
    </section>
  );
}
