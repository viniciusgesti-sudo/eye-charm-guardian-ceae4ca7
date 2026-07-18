/**
 * HonestScience — comprehensive science section.
 * Palette: Deep Teal #004B57, Champagne #E2D1C3, Mint #86D9D1, Obsidian #1D252D, Off-white #F9F9F9
 */

const TEAL = "#004B57";
const CHAMPAGNE = "#E2D1C3";
const MINT = "#86D9D1";
const INK = "#1D252D";
const PAPER = "#F9F9F9";

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]"
      style={{ color: TEAL }}
    >
      <span className="opacity-60">{n}</span>
      <span className="h-px w-8" style={{ background: TEAL, opacity: 0.4 }} />
      <span>{children}</span>
    </div>
  );
}

/* ---------- 1. Hero ---------- */
function Hero() {
  return (
    <section
      className="relative overflow-hidden px-6 py-32 md:px-12 md:py-40 lg:py-48"
      style={{ background: CHAMPAGNE, color: INK }}
    >
      <div className="mx-auto max-w-5xl">
        <SectionLabel n="00">Honest Science™</SectionLabel>
        <h2
          className="mt-8 font-editorial leading-[0.95] text-balance-tight"
          style={{ fontSize: "clamp(2.75rem, 7vw, 6rem)" }}
        >
          The science behind the lenses.{" "}
          <span className="italic" style={{ color: TEAL }}>
            Without the marketing myths.
          </span>
        </h2>
        <p className="mt-10 max-w-2xl text-lg font-light leading-relaxed opacity-80">
          A plain-language explanation of what blue light actually is, what
          modern research says, and how Eyegis chooses to filter it — without
          overselling or distorting your vision.
        </p>
      </div>
    </section>
  );
}

/* ---------- 2. Blue light spectrum ---------- */
function SpectrumSection() {
  return (
    <section className="px-6 py-28 md:px-12 md:py-36" style={{ background: PAPER, color: INK }}>
      <div className="mx-auto max-w-5xl">
        <SectionLabel n="01">Foundations</SectionLabel>
        <h3
          className="mt-6 font-editorial leading-[1] text-balance-tight"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
        >
          Blue light is <span className="italic" style={{ color: TEAL }}>not one single thing.</span>
        </h3>
        <p className="mt-8 max-w-3xl text-base md:text-lg leading-relaxed opacity-80">
          "Blue light" is a category, not a single wavelength. It spans roughly
          <strong> 380 to 500 nanometres</strong> of the visible spectrum — and
          different wavelengths inside that band behave very differently in the
          human eye and brain.
        </p>

        {/* Spectrum bar */}
        <figure className="mt-14">
          <div
            className="relative h-16 w-full overflow-hidden rounded-full"
            style={{
              background:
                "linear-gradient(90deg,#6B21A8 0%,#4338CA 18%,#2563EB 42%,#0EA5E9 68%,#22D3EE 88%,#67E8F9 100%)",
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)",
            }}
          >
            {/* Retina peak marker */}
            <div
              className="absolute inset-y-0 w-px"
              style={{ left: "27%", background: INK, opacity: 0.5 }}
            />
            {/* Circadian peak marker */}
            <div
              className="absolute inset-y-0 w-px"
              style={{ left: "56%", background: INK, opacity: 0.5 }}
            />
          </div>
          {/* Axis */}
          <div className="relative mt-3 h-4 font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
            <span className="absolute left-0">380 nm</span>
            <span className="absolute" style={{ left: "27%", transform: "translateX(-50%)" }}>
              435–440
            </span>
            <span className="absolute" style={{ left: "56%", transform: "translateX(-50%)" }}>
              ~480
            </span>
            <span className="absolute right-0">500 nm</span>
          </div>
          <div className="relative mt-6 grid grid-cols-2 gap-6 text-sm">
            <div className="rounded-lg border border-black/10 p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: TEAL }}>
                Blue-violet · 435–440 nm
              </div>
              <div className="mt-1 opacity-80">Retinal / photobiological sensitivity peak.</div>
            </div>
            <div className="rounded-lg border border-black/10 p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: TEAL }}>
                Blue-cyan · ~480 nm
              </div>
              <div className="mt-1 opacity-80">Circadian / melatonin regulation peak.</div>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}

/* ---------- 3. Retina vs Circadian ---------- */
function RetinaVsCircadian() {
  return (
    <section
      className="px-6 py-28 md:px-12 md:py-36"
      style={{ background: INK, color: PAPER }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: MINT }}>
          <span className="opacity-60">02</span>
          <span className="h-px w-8" style={{ background: MINT, opacity: 0.4 }} />
          <span>Two wavelengths · Two effects</span>
        </div>
        <h3
          className="mt-6 font-editorial leading-[1] text-balance-tight"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
        >
          Retina <span className="italic opacity-60">vs</span>{" "}
          <span className="italic" style={{ color: MINT }}>
            Circadian.
          </span>
        </h3>

        <div className="mt-14 grid grid-cols-1 gap-px md:grid-cols-2" style={{ background: "rgba(255,255,255,0.1)" }}>
          {/* Retina */}
          <div className="p-8 md:p-12" style={{ background: INK }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: MINT }}>
              435 – 440 nm
            </div>
            <h4 className="mt-4 font-editorial text-4xl">Retina</h4>
            <p className="mt-6 text-base md:text-lg leading-relaxed opacity-85">
              Research on <em>photobiological hazards</em> identifies a peak
              sensitivity in the blue-violet region, around{" "}
              <strong style={{ color: MINT }}>435–440 nm</strong>. This is the
              range most associated with cumulative retinal stress during long
              screen sessions.
            </p>
            <div className="mt-8 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
              Ref · ICNIRP 2013 · ANSI/IESNA RP-27 2015
            </div>
          </div>

          {/* Circadian */}
          <div className="p-8 md:p-12" style={{ background: INK }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: MINT }}>
              ~ 480 nm
            </div>
            <h4 className="mt-4 font-editorial text-4xl">Circadian</h4>
            <p className="mt-6 text-base md:text-lg leading-relaxed opacity-85">
              The body's internal clock is most sensitive to slightly longer
              blue wavelengths, centred around roughly{" "}
              <strong style={{ color: MINT }}>480 nm</strong>. Exposure here in
              the evening can suppress melatonin and shift sleep timing.
            </p>
            <div className="mt-8 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
              Ref · CIE S 026/E:2018
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. Why selective filtering matters ---------- */
function SelectiveFiltering() {
  return (
    <section className="px-6 py-28 md:px-12 md:py-36" style={{ background: PAPER, color: INK }}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel n="03">Marketing vs Reality</SectionLabel>
          <h3
            className="mt-6 font-editorial leading-[1] text-balance-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            Why <span className="italic" style={{ color: TEAL }}>selective filtering</span> matters.
          </h3>
        </div>
        <div className="lg:col-span-7 space-y-6 text-base md:text-lg leading-relaxed opacity-85">
          <p>
            Claims like <em>"Blocks 40%"</em> or <em>"Blocks 90% of blue light"</em>{" "}
            are almost meaningless in isolation — the number depends entirely
            on which wavelengths were included in the math. A lens can report
            "90%" simply by counting a narrow slice that is already blocked by
            the human eye.
          </p>
          <p>
            The <strong>cornea and crystalline lens</strong> already filter close
            to <strong>100% of light between roughly 380–400 nm</strong>. Filtering
            wavelengths your own eye never lets in isn't protection — it's
            marketing.
          </p>
          <div
            className="mt-4 rounded-xl border p-5 font-mono text-xs leading-relaxed"
            style={{ borderColor: TEAL, color: TEAL, background: `${MINT}22` }}
          >
            Honest filtering measures <strong>which</strong> wavelengths are
            attenuated, <strong>by how much</strong>, and <strong>with what
            impact on colour perception</strong> — not one flattering percentage.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. Why heavy orange lenses distort colors ---------- */
function OrangeLenses() {
  const problems = [
    { t: "Reddish / amber screens", d: "Interfaces designed in neutral tones are pushed into warm hues." },
    { t: "Reduced color accuracy", d: "Critical for creators, photographers, editors, designers, developers." },
    { t: "Altered white balance", d: "White surfaces appear tinted, breaking visual reference points." },
    { t: "Distorted visual experience", d: "Photos, video, art and daily browsing all look 'off'." },
  ];
  return (
    <section
      className="px-6 py-28 md:px-12 md:py-36"
      style={{ background: CHAMPAGNE, color: INK }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionLabel n="04">The Orange Problem</SectionLabel>
        <h3
          className="mt-6 max-w-4xl font-editorial leading-[1] text-balance-tight"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
        >
          Why heavy orange lenses{" "}
          <span className="italic" style={{ color: TEAL }}>distort your world.</span>
        </h3>
        <p className="mt-8 max-w-3xl text-base md:text-lg leading-relaxed opacity-80">
          Aggressive amber lenses do block a lot of blue light — but they
          rewrite everything you see along the way.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-px sm:grid-cols-2" style={{ background: "rgba(29,37,45,0.15)" }}>
          {problems.map((p, i) => (
            <div key={p.t} className="p-8" style={{ background: CHAMPAGNE }}>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: TEAL }}>
                Issue · 0{i + 1}
              </div>
              <div className="mt-3 font-editorial text-2xl">{p.t}</div>
              <div className="mt-3 text-sm opacity-75 leading-relaxed">{p.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. The middle ground ---------- */
function MiddleGround() {
  const items = [
    { t: "Targeted filtering", d: "Focus on the wavelengths that actually matter — not everything blue." },
    { t: "Superior color fidelity", d: "Screens, skin tones and daylight stay true." },
    { t: "More comfortable everyday use", d: "Wearable from morning meetings to evening reading." },
    { t: "No extreme orange tint", d: "Discreet, near-clear lenses — designed to disappear on your face." },
  ];
  return (
    <section
      className="px-6 py-28 md:px-12 md:py-36"
      style={{ background: TEAL, color: PAPER }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: MINT }}>
          <span className="opacity-70">05</span>
          <span className="h-px w-8" style={{ background: MINT, opacity: 0.4 }} />
          <span>The Eyegis Approach</span>
        </div>
        <h3
          className="mt-6 max-w-4xl font-editorial leading-[1] text-balance-tight"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
        >
          The <span className="italic" style={{ color: MINT }}>middle ground.</span>
        </h3>
        <p className="mt-8 max-w-3xl text-base md:text-lg leading-relaxed opacity-85">
          Enough filtering to matter. Not so much that it steals your colours.
          This is where Eyegis lives.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {items.map((it) => (
            <div
              key={it.t}
              className="flex gap-5 rounded-xl border p-6"
              style={{ borderColor: "rgba(134,217,209,0.3)", background: "rgba(255,255,255,0.03)" }}
            >
              <div
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
                style={{ background: MINT, color: TEAL }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="font-editorial text-xl">{it.t}</div>
                <div className="mt-2 text-sm opacity-80 leading-relaxed">{it.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. Understanding E-Guard Scores ---------- */
function EGuardScores() {
  return (
    <section className="px-6 py-28 md:px-12 md:py-36" style={{ background: PAPER, color: INK }}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel n="06">Transparency</SectionLabel>
          <h3
            className="mt-6 font-editorial leading-[1] text-balance-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            Understanding{" "}
            <span className="italic" style={{ color: TEAL }}>E-Guard Scores.</span>
          </h3>
        </div>
        <div className="lg:col-span-7 space-y-6 text-base md:text-lg leading-relaxed opacity-85">
          <p>
            The <strong>E-Guard Retina</strong> and{" "}
            <strong>E-Guard Circadian</strong> scores are proprietary indicators
            developed by Eyegis, inspired by CIE metrics and circadian light
            exposure research.
          </p>
          <p>
            They exist to communicate <em>what a lens is actually doing</em> at
            the two wavelengths that matter most — clearly, and without inflated
            percentages.
          </p>
          <div
            className="rounded-xl border-l-4 p-5 text-sm font-mono uppercase tracking-[0.15em]"
            style={{ borderColor: TEAL, background: `${CHAMPAGNE}80`, color: INK }}
          >
            E-Guard Scores are internal Eyegis indicators.
            <br />
            They are <strong>not medical certifications</strong> and do not
            replace professional eye care.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 8. References ---------- */
function References() {
  const refs = [
    {
      title: "International Commission on Illumination (CIE)",
      note: "Blue Light Hazard",
      href: "https://cie.co.at/",
    },
    {
      title: "Harvard Medical School",
      note: "Blue Light Has a Dark Side",
      href: "https://www.health.harvard.edu/staying-healthy/blue-light-has-a-dark-side",
    },
    {
      title: "National Sleep Foundation",
      note: "Light and Sleep",
      href: "https://www.thensf.org/",
    },
    {
      title: "CIE",
      note: "Melanopic Metrics · CIE S 026/E:2018",
      href: "https://cie.co.at/publications/cie-system-metrology-optical-radiation-iprgc-influenced-responses-light-0",
    },
  ];
  return (
    <section
      className="px-6 py-24 md:px-12 md:py-32"
      style={{ background: INK, color: PAPER }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: MINT }}>
          <span className="opacity-70">07</span>
          <span className="h-px w-8" style={{ background: MINT, opacity: 0.4 }} />
          <span>References</span>
        </div>
        <h3
          className="mt-6 font-editorial leading-[1]"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
        >
          Sources & further reading.
        </h3>

        <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {refs.map((r, i) => (
            <li key={r.title}>
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 py-6 transition-colors hover:bg-white/[0.03]"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-50">
                    0{i + 1}
                  </span>
                  <div>
                    <div className="font-editorial text-lg md:text-xl">{r.title}</div>
                    <div className="mt-1 text-sm opacity-70">{r.note}</div>
                  </div>
                </div>
                <span
                  className="font-mono text-xs uppercase tracking-[0.2em] transition-transform group-hover:translate-x-1"
                  style={{ color: MINT }}
                >
                  Read →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Export ---------- */
export function HonestScience() {
  return (
    <div id="honest-science">
      <Hero />
      <SpectrumSection />
      <RetinaVsCircadian />
      <SelectiveFiltering />
      <OrangeLenses />
      <MiddleGround />
      <EGuardScores />
      <References />
    </div>
  );
}
