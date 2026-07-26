import { Check } from "lucide-react";

const TEAL = "#004B57";
const MINT = "#86D9D1";
const INK = "#1D252D";
const PAPER = "#F9F9F9";

type Item = { title: string; desc: string };

const ITEMS: Item[] = [
  {
    title: "Full Spectral Transmission (280–780 nm)",
    desc: "Measures exactly how much light passes through the lens at every wavelength, allowing us to evaluate both retinal and circadian filtering performance.",
  },
  {
    title: "UV Protection",
    desc: "Verifies that harmful UVA and UVB radiation is effectively blocked while maintaining high visible-light transmission.",
  },
  {
    title: "Visible Light Transmission (Tv)",
    desc: "Determines how much visible light reaches your eyes, ensuring the lens provides the intended balance between comfort and brightness.",
  },
  {
    title: "Color Fidelity",
    desc: "Evaluates chromatic performance using internationally recognized colorimetric standards to preserve a natural viewing experience. Including Tsig Traffic Signal Recognition that confirms accurate recognition of red, yellow, and green traffic signals.",
  },
  {
    title: "International Standards Compliance",
    desc: "Our lenses are tested against: ANSI Z80.3 (United States), EN ISO 12312-1 (Europe), AS/NZS 1067.1 (Australia & New Zealand).",
  },
];

function Card({ item, index }: { item: Item; index: number }) {
  return (
    <article
      className="group relative flex flex-col rounded-2xl bg-white p-8 ring-1 transition-transform duration-500 hover:-translate-y-1"
      style={{
        borderColor: `${TEAL}18`,
        boxShadow: "0 30px 80px -50px rgba(0,75,87,0.35)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${MINT}, transparent)`,
        }}
      />
      <div className="flex items-center justify-between">
        <span
          className="grid h-12 w-12 place-items-center rounded-full"
          style={{ background: `${MINT}22`, color: TEAL }}
        >
          <Check className="h-5 w-5" strokeWidth={3} />
        </span>
        <span
          className="font-mono text-[10px] uppercase tracking-[0.28em]"
          style={{ color: `${TEAL}80` }}
        >
          Test · {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3
        className="mt-8 font-editorial text-xl leading-tight md:text-2xl"
        style={{ color: TEAL }}
      >
        {item.title}
      </h3>
      <p
        className="mt-4 text-[14px] leading-relaxed"
        style={{ color: "rgba(29,37,45,0.78)" }}
      >
        {item.desc}
      </p>
    </article>
  );
}

export function ScienceInPractice() {
  return (
    <section
      id="science-in-practice"
      aria-label="Science in Practice"
      className="relative"
    >
      {/* HERO */}
      <div
        className="relative overflow-hidden px-6 py-10 md:px-12 md:py-12"
        style={{
          background: `linear-gradient(160deg, ${INK} 0%, ${TEAL} 100%)`,
          color: PAPER,
        }}
      >
        {/* Lab grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(${MINT} 1px, transparent 1px), linear-gradient(90deg, ${MINT} 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
          aria-hidden="true"
        />
        {/* Scanning beam */}
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 opacity-40 blur-2xl"
          style={{
            background: `linear-gradient(90deg, transparent, ${MINT}55, transparent)`,
          }}
          aria-hidden="true"
        />
        {/* Corner brackets */}
        <div className="pointer-events-none absolute inset-6 md:inset-10">
          {(["tl", "tr", "bl", "br"] as const).map((c) => (
            <span
              key={c}
              className={`absolute h-6 w-6 border-mint/40 ${
                c === "tl"
                  ? "left-0 top-0 border-l border-t"
                  : c === "tr"
                    ? "right-0 top-0 border-r border-t"
                    : c === "bl"
                      ? "bottom-0 left-0 border-b border-l"
                      : "bottom-0 right-0 border-b border-r"
              }`}
              style={{ borderColor: `${MINT}55` }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.32em]"
            style={{ color: MINT }}
          >
            § Science in Practice
          </span>
          <h2 className="mt-6 font-editorial text-4xl leading-[1.05] md:text-6xl">
            From scientific principles to{" "}
            <span className="italic" style={{ color: MINT }}>
              laboratory verification
            </span>
            .
          </h2>
          <p
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: "rgba(249,249,249,0.72)" }}
          >
            At Eyegis, we don't rely on marketing claims or estimated filtering
            percentages. Every lens design is verified through independent
            laboratory testing to measure how it performs across the entire
            visible spectrum.
          </p>
          <div
            className="mx-auto mt-10 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em]"
            style={{ color: `${MINT}CC` }}
          >
            <span
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ background: MINT }}
            />
            <span>Lab · λ 280–780 nm · Independent Verification</span>
          </div>
        </div>
      </div>

      {/* CHECKLIST */}
      <div
        className="relative px-6 py-10 md:px-12 md:py-12"
        style={{ background: PAPER }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${TEAL} 1px, transparent 1px), linear-gradient(90deg, ${TEAL} 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-2xl text-center">
            <span
              className="font-mono text-[11px] uppercase tracking-[0.28em]"
              style={{ color: TEAL }}
            >
              § Testing Checklist
            </span>
            <h3
              className="mt-5 font-editorial text-3xl leading-tight md:text-5xl"
              style={{ color: TEAL }}
            >
              Five independent measurements.
            </h3>
            <div
              className="mx-auto mt-6 h-px w-24"
              style={{
                background: `linear-gradient(90deg, transparent, ${TEAL}60, transparent)`,
              }}
            />
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ITEMS.map((item, i) => (
              <Card key={item.title} item={item} index={i} />
            ))}
          </div>

          {/* CLOSING STATEMENT */}
          <div className="mt-20 flex justify-center md:mt-28">
            <div
              className="relative max-w-3xl rounded-3xl bg-white p-10 text-center md:p-14"
              style={{
                boxShadow: "0 40px 100px -50px rgba(0,75,87,0.35)",
                border: `1px solid ${TEAL}20`,
              }}
            >
              {/* Corner accents */}
              {(["tl", "tr", "bl", "br"] as const).map((c) => (
                <span
                  key={c}
                  className={`absolute h-4 w-4 ${
                    c === "tl"
                      ? "left-4 top-4 border-l border-t"
                      : c === "tr"
                        ? "right-4 top-4 border-r border-t"
                        : c === "bl"
                          ? "bottom-4 left-4 border-b border-l"
                          : "bottom-4 right-4 border-b border-r"
                  }`}
                  style={{ borderColor: `${MINT}` }}
                />
              ))}

              <p
                className="font-editorial text-2xl italic leading-tight md:text-3xl"
                style={{ color: TEAL }}
              >
                "Because numbers only matter when they mean something."
              </p>

              <div
                className="mx-auto my-8 h-px w-16"
                style={{ background: `${TEAL}30` }}
              />

              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "rgba(29,37,45,0.78)" }}
              >
                A complete transmission spectrum reveals which wavelengths are
                filtered, how much visible light remains, how colors are
                preserved, and whether the lens complies with international
                safety standards.
              </p>

              <p
                className="mt-8 font-editorial text-lg leading-relaxed md:text-xl"
                style={{ color: INK }}
              >
                <strong>
                  We don't engineer lenses to maximize marketing numbers. We
                  engineer them to maximize the balance between science,
                  comfort and everyday usability.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
