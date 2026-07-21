/**
 * SpectrumMark — signature editorial tick.
 * A recurring λ marker that ties every section header to Eyegis's
 * wavelength science. Becomes the brand's typographic signature.
 */
type Props = {
  nm?: number;
  label?: string;
  tone?: "ink" | "paper" | "mint";
  className?: string;
};

export function SpectrumMark({ nm = 445, label, tone = "ink", className = "" }: Props) {
  const stroke =
    tone === "paper" ? "rgba(246,243,238,0.7)" : tone === "mint" ? "#86D9D1" : "#1D252D";
  const text =
    tone === "paper" ? "text-paper/80" : tone === "mint" ? "text-mint" : "text-ink/70";

  // Position marker on 380–500 spectrum (0..1)
  const pos = Math.min(1, Math.max(0, (nm - 380) / 120));

  return (
    <span
      className={`inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase ${text} ${className}`}
      aria-label={`Wavelength ${nm} nanometers${label ? ` — ${label}` : ""}`}
    >
      <span className="inline-flex items-center gap-[3px]">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
          const step = i / 9;
          const active = Math.abs(step - pos) < 0.06;
          return (
            <span
              key={i}
              aria-hidden
              className="block"
              style={{
                width: 1,
                height: active ? 12 : 6,
                background: stroke,
                opacity: active ? 1 : 0.35,
                transition: "height 300ms ease, opacity 300ms ease",
              }}
            />
          );
        })}
      </span>
      <span>λ {nm}nm{label ? ` · ${label}` : ""}</span>
    </span>
  );
}
