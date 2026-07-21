import { useMemo, useRef, useState, useEffect } from "react";
import { useI18n } from "@/i18n/context";
import { SpectrumMark } from "./SpectrumMark";

/**
 * SpectrumSignature — Eyegis's signature interactive ritual.
 *
 * A full-bleed editorial band the visitor can drag across 380–500nm.
 * As the wavelength shifts, the entire strip responds live:
 *  · a real spectrum gradient behind the type
 *  · a moving "focus lens" that lifts the harmful HEV segment
 *  · the science caption re-writes itself (Retina vs Circadian territory)
 *  · a mint chip appears the moment the reader lands on the E-Guard sweet spot
 *
 * No other eyewear brand ships this. It becomes the site's motion identity
 * and a shareable proof point for Honest Science™.
 */

const COPY = {
  PT: {
    eyebrow: "Ritual da Marca",
    title: (
      <>
        Arraste pelo espectro.<br />
        <span className="italic text-mint">Sinta onde a Eyegis atua.</span>
      </>
    ),
    subtitle:
      "380 a 500 nanômetros. É onde a luz azul de alta energia mora. Mova a lente e leia o que muda para a retina — e para o seu ritmo circadiano.",
    hint: "Arraste ↔",
    zoneRetina: "Zona Retina · HEV alta",
    zoneCircadian: "Zona Circadiana · azul-turquesa",
    zoneVisible: "Luz visível segura",
    sweetLabel: "Ponto ideal E-Guard",
    footnote: "Referências ICNIRP · CIE S 026 · ANSI Z80.3",
  },
  EN: {
    eyebrow: "Brand Ritual",
    title: (
      <>
        Drag across the spectrum.<br />
        <span className="italic text-mint">Feel where Eyegis works.</span>
      </>
    ),
    subtitle:
      "380 to 500 nanometres. Where high-energy blue light lives. Move the lens and read what changes for the retina — and for your circadian rhythm.",
    hint: "Drag ↔",
    zoneRetina: "Retina zone · high HEV",
    zoneCircadian: "Circadian zone · turquoise-blue",
    zoneVisible: "Safe visible light",
    sweetLabel: "E-Guard sweet spot",
    footnote: "Refs. ICNIRP · CIE S 026 · ANSI Z80.3",
  },
  FR: {
    eyebrow: "Rituel de Marque",
    title: (
      <>
        Glissez sur le spectre.<br />
        <span className="italic text-mint">Sentez où Eyegis agit.</span>
      </>
    ),
    subtitle:
      "380 à 500 nanomètres. Là où vit la lumière bleue haute énergie. Déplacez la lentille et lisez ce qui change pour la rétine — et pour votre rythme circadien.",
    hint: "Glissez ↔",
    zoneRetina: "Zone Rétine · HEV élevée",
    zoneCircadian: "Zone Circadienne · bleu-turquoise",
    zoneVisible: "Lumière visible sûre",
    sweetLabel: "Point idéal E-Guard",
    footnote: "Réfs. ICNIRP · CIE S 026 · ANSI Z80.3",
  },
} as const;

// Approximate visible-spectrum gradient covering 380 → 700nm.
// We only expose the 380–500 slice interactively, but paint the full band
// behind so the eye reads the science.
const SPECTRUM =
  "linear-gradient(90deg, " +
  "#3a0f5c 0%," +   // 380nm — deep violet
  "#4a1fb8 8%," +   // 405
  "#2b57ff 18%," +  // 430
  "#00a3ff 28%," +  // 460
  "#00d4c2 40%," +  // 490
  "#3ee06b 55%," +  // 530 (green)
  "#f5d400 72%," +  // 580 (yellow)
  "#ff7a2b 86%," +  // 620 (orange)
  "#c8112b 100%" +  // 700 (red)
  ")";

export function SpectrumSignature() {
  const { lang } = useI18n();
  const c = COPY[lang];

  const bandRef = useRef<HTMLDivElement>(null);
  const [nm, setNm] = useState(445);
  const [dragging, setDragging] = useState(false);

  // Map 380..500 to 0..1 relative to the FULL 380..700 band we paint.
  const focusLeftPct = useMemo(() => ((nm - 380) / 320) * 100, [nm]);

  // Interactive slider is scoped to the 380..500 slice (the science-relevant one).
  const sliderPct = useMemo(() => ((nm - 380) / 120) * 100, [nm]);

  const zone: "retina" | "circadian" | "safe" =
    nm <= 430 ? "retina" : nm <= 470 ? "circadian" : "safe";

  const zoneLabel =
    zone === "retina" ? c.zoneRetina : zone === "circadian" ? c.zoneCircadian : c.zoneVisible;

  const inSweetSpot = nm >= 435 && nm <= 455;

  const setFromClientX = (clientX: number) => {
    const el = bandRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    setNm(Math.round(380 + ratio * 120));
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => setFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging]);

  return (
    <section className="relative bg-ink text-paper overflow-hidden">
      {/* faint grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 25% 30%, #fff 40%, transparent 60%), radial-gradient(1px 1px at 70% 60%, #fff 40%, transparent 60%)",
          backgroundSize: "3px 3px, 4px 4px",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 pt-24 md:pt-32 pb-20 md:pb-28">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 mb-14 md:mb-20">
          <div className="lg:col-span-5">
            <SpectrumMark nm={nm} label={c.eyebrow} tone="paper" />
            <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.01em] text-balance">
              {c.title}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <p className="font-sans text-base md:text-lg leading-relaxed text-paper/75 max-w-[52ch] text-pretty">
              {c.subtitle}
            </p>
          </div>
        </div>

        {/* Spectrum band */}
        <div className="relative">
          {/* Live science caption above band */}
          <div className="flex items-center justify-between mb-4 font-mono text-[10px] tracking-[0.24em] uppercase text-paper/60">
            <span>380nm</span>
            <span
              className={`transition-colors duration-300 ${
                inSweetSpot ? "text-mint" : "text-paper/80"
              }`}
            >
              {inSweetSpot ? `${c.sweetLabel} · λ ${nm}nm` : `${zoneLabel} · λ ${nm}nm`}
            </span>
            <span>700nm</span>
          </div>

          <div
            ref={bandRef}
            className="relative h-24 md:h-32 rounded-sm select-none touch-none cursor-ew-resize"
            style={{ background: SPECTRUM }}
            onPointerDown={(e) => {
              (e.target as Element).setPointerCapture?.(e.pointerId);
              setDragging(true);
              setFromClientX(e.clientX);
            }}
            role="slider"
            aria-label="Wavelength selector, 380 to 500 nanometres"
            aria-valuemin={380}
            aria-valuemax={500}
            aria-valuenow={nm}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") setNm((n) => Math.min(500, n + 5));
              if (e.key === "ArrowLeft") setNm((n) => Math.max(380, n - 5));
            }}
          >
            {/* Dim the >500nm region — Eyegis only acts on the HEV slice */}
            <div
              aria-hidden
              className="absolute inset-y-0 right-0 bg-ink/55 pointer-events-none"
              style={{ width: `${100 - (120 / 320) * 100}%` }}
            />

            {/* HEV interaction rail markings (380 / 415 / 445 / 475 / 500) */}
            <div
              aria-hidden
              className="absolute inset-x-0 -bottom-6 flex justify-between font-mono text-[9px] tracking-[0.2em] uppercase text-paper/50"
              style={{ width: `${(120 / 320) * 100}%` }}
            >
              {[380, 415, 445, 475, 500].map((tick) => (
                <span key={tick}>{tick}</span>
              ))}
            </div>

            {/* Focus lens — signature circular reveal following drag */}
            <div
              aria-hidden
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none transition-transform duration-75 ease-out"
              style={{ left: `${focusLeftPct}%` }}
            >
              <div
                className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-paper/70"
                style={{
                  boxShadow:
                    "0 0 0 6px rgba(10,16,14,0.35), 0 20px 60px -20px rgba(0,0,0,0.6), inset 0 0 30px rgba(134,217,209,0.35)",
                  backdropFilter: "contrast(1.15) saturate(1.25)",
                  WebkitBackdropFilter: "contrast(1.15) saturate(1.25)",
                }}
              />
              {/* mint dot at exact λ */}
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                  inSweetSpot ? "bg-mint scale-100" : "bg-paper scale-90"
                }`}
                style={{ width: 8, height: 8, boxShadow: "0 0 0 4px rgba(10,16,14,0.55)" }}
              />
            </div>

            {/* HEV bracket label */}
            <div
              aria-hidden
              className="absolute -top-6 left-0 font-mono text-[9px] tracking-[0.24em] uppercase text-mint"
              style={{ width: `${(120 / 320) * 100}%` }}
            >
              <div className="flex items-center gap-2">
                <span className="h-px flex-1 bg-mint/60" />
                <span>HEV · E-Guard</span>
                <span className="h-px flex-1 bg-mint/60" />
              </div>
            </div>
          </div>

          {/* Drag hint */}
          <div className="mt-10 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-paper/45">
              {c.hint}
            </span>
            <div
              className="h-[1px] flex-1 mx-6 bg-paper/15 relative overflow-hidden"
              aria-hidden
            >
              <div
                className="absolute inset-y-0 bg-mint transition-[width] duration-150 ease-out"
                style={{ width: `${sliderPct}%` }}
              />
            </div>
            <SpectrumMark nm={nm} tone="mint" />
          </div>

          <p className="mt-10 font-mono text-[10px] tracking-[0.28em] uppercase text-paper/40">
            {c.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
