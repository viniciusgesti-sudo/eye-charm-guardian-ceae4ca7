/**
 * HonestScience — comprehensive scientific credibility section.
 * Palette: Deep Teal #004B57, Champagne #E2D1C3, Mint #86D9D1, Obsidian #1D252D, Off-white #F9F9F9
 */
import { Check } from "lucide-react";

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
      <circle cx="32" cy="32" r="28" stroke={TEAL} strokeWidth="1.2" opacity="0.4" />
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
      <circle cx="32" cy="32" r="28" stroke={TEAL} strokeWidth="1.2" opacity="0.4" />
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
      <circle cx="32" cy="32" r="28" stroke={TEAL} strokeWidth="1.2" opacity="0.4" />
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
      <circle cx="32" cy="32" r="28" stroke={TEAL} strokeWidth="1.2" opacity="0.4" />
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
      className="relative overflow-hidden px-6 py-32 md:px-12 md:py-40"
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
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
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
          className="mx-auto mt-10 h-px w-24"
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
      className="relative px-6 py-28 md:px-12 md:py-36"
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

        <div className="mt-16">
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
            className="mt-14 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em]"
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

/* 3. Retina vs Circadian */
function RetinaVsCircadian() {
  return (
    <section
      className="relative px-6 py-28 md:px-12 md:py-36"
      style={{ background: PAPER, borderTop: `1px solid ${TEAL}15` }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <SectionLabel n="§ 02">Two mechanisms</SectionLabel>
          <h3
            className="mt-4 font-editorial text-3xl leading-tight md:text-5xl"
            style={{ color: TEAL }}
          >
            Retina vs Circadian.
          </h3>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <article className="relative rounded-2xl bg-white p-10 shadow-[0_30px_80px_-40px_rgba(0,75,87,0.25)] ring-1 ring-[#004B57]/10">
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
              className="mt-6 text-[15px] leading-relaxed"
              style={{ color: "rgba(29,37,45,0.8)" }}
            >
              Research on photobiological hazards identifies a peak sensitivity
              in the blue-violet region, around <strong>435–440 nm</strong>.
            </p>
            <p
              className="mt-6 border-t pt-4 font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ borderColor: `${TEAL}20`, color: "rgba(29,37,45,0.55)" }}
            >
              Ref. ICNIRP 2013 · ANSI 2015
            </p>
          </article>

          <article
            className="relative rounded-2xl p-10 shadow-[0_30px_80px_-40px_rgba(0,75,87,0.4)] ring-1"
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
              className="mt-6 text-[15px] leading-relaxed"
              style={{ color: "rgba(249,249,249,0.85)" }}
            >
              The body's internal clock is most sensitive to slightly longer
              blue wavelengths, centered around roughly <strong>480 nm</strong>.
            </p>
            <p
              className="mt-6 border-t pt-4 font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ borderColor: `${MINT}30`, color: "rgba(249,249,249,0.55)" }}
            >
              Ref. CIE S 026/E:2018
            </p>
          </article>
        </div>

        <p
          className="mx-auto mt-14 max-w-2xl text-center font-editorial text-xl italic md:text-2xl"
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
      className="relative px-6 py-28 md:px-12 md:py-36"
      style={{ background: INK, color: PAPER }}
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start gap-4">
          <div className="[&_svg_*]:!stroke-[#86D9D1]">
            <PictoSpectrum />
          </div>
          <div>
            <div
              className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{ color: MINT }}
            >
              <span className="opacity-60">§ 03</span>
              <span className="h-px w-8" style={{ background: MINT, opacity: 0.4 }} />
              <span>Selective filtering</span>
            </div>
            <h3 className="mt-4 font-editorial text-3xl leading-tight md:text-5xl">
              Why selective filtering{" "}
              <span className="italic" style={{ color: MINT }}>
                matters
              </span>
              .
            </h3>
          </div>
        </div>

        <div
          className="mt-10 space-y-8 text-[15px] leading-relaxed md:text-base"
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
            className="font-editorial text-xl italic md:text-2xl"
            style={{ color: MINT }}
          >
            Eyegis measures performance where it actually matters, not where it
            inflates a marketing claim.
          </p>
        </div>
      </div>
    </section>
  );
}

/* 5. Orange distortion */
function OrangeDistortion() {
  const issues = [
    "Reddish or amber screens",
    "Reduced color accuracy",
    "Altered white balance",
    "Distorted visual experience",
  ];
  return (
    <section
      className="relative px-6 py-28 md:px-12 md:py-36"
      style={{ background: PAPER, color: INK }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-14 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <SectionLabel n="§ 04">Color fidelity</SectionLabel>
            <h3
              className="mt-4 font-editorial text-3xl leading-tight md:text-5xl"
              style={{ color: TEAL }}
            >
              Why heavy orange lenses{" "}
              <span className="italic">distort colors</span>.
            </h3>
            <p
              className="mt-6 text-[15px] leading-relaxed"
              style={{ color: "rgba(29,37,45,0.75)" }}
            >
              When a lens aggressively strips away all blue light, color
              accuracy vanishes.
            </p>
          </div>

          <div className="relative flex items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <div
                className="h-32 w-32 rounded-full ring-1"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, #FFC983, #E08A3C 65%, #A24E1D)",
                  borderColor: `${TEAL}30`,
                }}
              />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: "rgba(29,37,45,0.55)" }}
              >
                Heavy amber
              </span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div
                className="h-32 w-32 rounded-full ring-1"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, #E9F7F5, #C9E9E4 60%, #86D9D1)",
                  borderColor: `${TEAL}30`,
                }}
              />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: TEAL }}
              >
                Eyegis · true tone
              </span>
            </div>
          </div>
        </div>

        <ul className="mt-14 grid gap-3 md:grid-cols-2">
          {issues.map((t) => (
            <li
              key={t}
              className="flex items-center gap-3 rounded-xl border bg-white px-5 py-4"
              style={{ borderColor: `${TEAL}18` }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "#C25E2C" }}
              />
              <span className="text-sm" style={{ color: "rgba(29,37,45,0.8)" }}>
                {t}
              </span>
            </li>
          ))}
        </ul>

        <p
          className="mt-10 max-w-2xl text-[15px] leading-relaxed"
          style={{ color: "rgba(29,37,45,0.75)" }}
        >
          For some applications, that trade-off may be acceptable. For many
          users, it is not.
        </p>
      </div>
    </section>
  );
}

/* 6. Middle ground */
function MiddleGround() {
  const items = [
    "Targeted filtering",
    "Superior color fidelity",
    "More comfortable everyday use",
    "No extreme orange tint",
  ];
  return (
    <section
      className="relative px-6 py-28 md:px-12 md:py-36"
      style={{ background: CHAMPAGNE, color: INK }}
    >
      <div className="mx-auto max-w-5xl text-center">
        <SectionLabel n="§ 05">
          <span style={{ color: TEAL }}>The middle ground</span>
        </SectionLabel>
        <h3
          className="mt-6 font-editorial text-3xl leading-tight md:text-5xl"
          style={{ color: TEAL }}
        >
          Protection <span className="italic">without compromise</span>.
        </h3>

        <div className="mx-auto mt-14 grid max-w-3xl gap-4 md:grid-cols-2">
          {items.map((t) => (
            <div
              key={t}
              className="flex items-center gap-4 rounded-2xl bg-white/70 px-6 py-5 text-left ring-1 ring-white/60 backdrop-blur-sm"
            >
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                style={{ background: `${MINT}30`, color: TEAL }}
              >
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              <span className="font-editorial text-lg" style={{ color: INK }}>
                {t}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 7. E-Guard Scores */
function EGuardScores() {
  return (
    <section
      className="relative px-6 py-28 md:px-12 md:py-36"
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
          className="mt-10 space-y-6 text-[15px] leading-relaxed"
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

        <div className="mt-12 grid gap-4 md:grid-cols-2">
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
      className="relative px-6 py-20 md:px-12"
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
              <span className="font-mono opacity-50">
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
