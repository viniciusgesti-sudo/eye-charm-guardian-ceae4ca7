import { useI18n } from "@/i18n/context";
import { AMAZON_RATING, DEFAULT_AMAZON_URL } from "@/lib/amazon";

/**
 * Above-the-fold-ish social proof bar shown right after the Hero.
 * Purpose: convert Amazon-driven visitors within the first 5s scroll.
 */
export function TrustStrip() {
  const { lang } = useI18n();
  const copy = {
    en: {
      reviews: "verified reviews on Amazon",
      prime: "Prime shipping",
      returns: "30-day free returns",
      warranty: "2-year warranty",
      cta: "Shop on Amazon",
    },
    pt: {
      reviews: "avaliações verificadas na Amazon",
      prime: "Entrega Prime",
      returns: "Devolução grátis em 30 dias",
      warranty: "Garantia de 2 anos",
      cta: "Comprar na Amazon",
    },
    fr: {
      reviews: "avis vérifiés sur Amazon",
      prime: "Livraison Prime",
      returns: "Retour gratuit 30 jours",
      warranty: "Garantie 2 ans",
      cta: "Acheter sur Amazon",
    },
  } as const;
  const c = copy[lang.toLowerCase() as keyof typeof copy] ?? copy.en;

  const chips = [c.prime, c.returns, c.warranty];

  return (
    <section aria-label="Amazon trust" className="border-y border-ink/10 bg-paper">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-5 md:flex-row md:justify-between md:gap-8 md:py-4">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
          <span className="text-[#FF9900] text-base leading-none">★★★★★</span>
          <span className="font-semibold">{AMAZON_RATING.stars}</span>
          <span className="text-ink/40">·</span>
          <span className="text-ink/70">
            {AMAZON_RATING.count.toLocaleString("en")}+ {c.reviews}
          </span>
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70">
          {chips.map((label) => (
            <li key={label} className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-teal-deep" />
              {label}
            </li>
          ))}
        </ul>
        <a
          href={DEFAULT_AMAZON_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-3 rounded-full bg-[#FF9900] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink shadow-md shadow-[#FF9900]/25 hover:-translate-y-0.5 transition-transform"
        >
          {c.cta}
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
