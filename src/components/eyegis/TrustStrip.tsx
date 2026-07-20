import { useI18n } from "@/i18n/context";
import { COMING_SOON_HREF, LAB_CERTIFICATIONS } from "@/lib/amazon";

/**
 * Above-the-fold-ish trust bar shown right after the Hero.
 * Uses verifiable lab certifications (no fabricated reviews).
 */
export function TrustStrip() {
  const { lang } = useI18n();
  const copy = {
    en: {
      chips: ["ANSI Z80.3 · EN ISO 12312-1 · AS/NZS 1067.1", "60-day comfort guarantee", "2-year warranty"],
      cta: "Coming soon on Amazon",
    },
    pt: {
      chips: ["ANSI Z80.3 · EN ISO 12312-1 · AS/NZS 1067.1", "Garantia de conforto 60 dias", "Garantia de 2 anos"],
      cta: "Em breve na Amazon",
    },
    fr: {
      chips: ["ANSI Z80.3 · EN ISO 12312-1 · AS/NZS 1067.1", "Garantie confort 60 jours", "Garantie 2 ans"],
      cta: "Bientôt sur Amazon",
    },
  } as const;
  const c = copy[lang.toLowerCase() as keyof typeof copy] ?? copy.en;
  const certCopy = LAB_CERTIFICATIONS.long[(lang.toLowerCase() as "en" | "pt" | "fr")] ?? LAB_CERTIFICATIONS.long.en;

  return (
    <section aria-label="Verified certifications" className="border-y border-ink/10 bg-paper">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-5 md:flex-row md:justify-between md:gap-8 md:py-4">
        <div
          className="inline-flex items-center gap-3 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em]"
          style={{ borderColor: "rgba(0,75,87,0.25)", color: "#004B57", backgroundColor: "rgba(134,217,209,0.12)" }}
        >
          <span
            aria-hidden
            className="inline-grid h-4 w-4 place-items-center rounded-full text-[10px] font-bold"
            style={{ backgroundColor: "#86D9D1", color: "#004B57" }}
          >
            ✓
          </span>
          <span className="font-semibold">{certCopy}</span>
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70">
          {c.chips.map((label) => (
            <li key={label} className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-teal-deep" />
              {label}
            </li>
          ))}
        </ul>
        <a
          href={COMING_SOON_HREF}
          className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper shadow-md transition-transform hover:-translate-y-0.5"
          style={{ backgroundColor: "#004B57", boxShadow: "0 12px 30px -12px rgba(0,75,87,0.55)" }}
         target="_blank" rel="noopener noreferrer">
          {c.cta}
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
