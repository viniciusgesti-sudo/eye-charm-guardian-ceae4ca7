import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";
import { MARKETPLACES, amazonUrl, DEFAULT_AMAZON_URL, AMAZON_RATING } from "@/lib/amazon";

type Copy = {
  eyebrow: string;
  title1: string;
  title2: string;
  body: string;
  primary: string;
  comingSoon: string;
  reviews: string;
  trust: string[];
};

const COPY: Record<Lang, Copy> = {
  EN: {
    eyebrow: "Available now on Amazon",
    title1: "Shop Eyegis",
    title2: "in your marketplace.",
    body: "Every pair ships from Amazon's premium logistics network — with secure checkout, fast delivery and hassle-free returns in your country.",
    primary: "Shop on Amazon",
    comingSoon: "Coming soon",
    reviews: "verified reviews on Amazon",
    trust: ["Prime delivery", "60-day comfort guarantee", "2-year warranty", "Trusted marketplace"],
  },
  PT: {
    eyebrow: "Disponível agora na Amazon",
    title1: "Compre Eyegis",
    title2: "na sua região.",
    body: "Cada par é enviado pela logística premium da Amazon — com checkout seguro, entrega rápida e trocas sem burocracia no seu país.",
    primary: "Comprar na Amazon",
    comingSoon: "Em breve",
    reviews: "avaliações verificadas na Amazon",
    trust: ["Entrega Prime", "Garantia de conforto 60 dias", "Garantia 2 anos", "Marketplace confiável"],
  },
  FR: {
    eyebrow: "Disponible maintenant sur Amazon",
    title1: "Achetez Eyegis",
    title2: "dans votre pays.",
    body: "Chaque paire est expédiée via la logistique premium d'Amazon — paiement sécurisé, livraison rapide et retours sans souci dans votre pays.",
    primary: "Acheter sur Amazon",
    comingSoon: "Bientôt disponible",
    reviews: "avis vérifiés sur Amazon",
    trust: ["Livraison Prime", "Garantie confort 60 jours", "Garantie 2 ans", "Marketplace de confiance"],
  },
};

export function ShopOnAmazon() {
  const { lang } = useI18n();
  const c = COPY[lang];

  return (
    <section id="shop-amazon" className="relative bg-teal-deep text-paper py-24 md:py-32 overflow-hidden">
      {/* soft ambient light */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(200,222,220,0.10),transparent_60%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_90%,rgba(200,222,220,0.08),transparent_55%)]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end mb-16 md:mb-20">
          <div className="lg:col-span-7">
            <span className="font-eyebrow text-mint">{c.eyebrow}</span>
            <h2 className="mt-5 font-editorial leading-[0.92] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.6vw] xl:text-[76px]">
              {c.title1}
              <span className="block italic text-mint">{c.title2}</span>
            </h2>
            <p className="mt-8 max-w-xl text-paper/75 leading-relaxed text-lg">{c.body}</p>
          </div>

          <div className="lg:col-span-5 lg:justify-self-end w-full">
            <a
              href={DEFAULT_AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group inline-flex w-full sm:w-auto items-center justify-between gap-6 rounded-full bg-mint px-8 py-5 text-ink shadow-[0_20px_60px_-20px_rgba(200,222,220,0.6)] hover:-translate-y-0.5 hover:bg-paper transition-all duration-500"
            >
              <span className="font-eyebrow">{c.primary}</span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink/10 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">→</span>
            </a>

            {/* Amazon rating */}
            <a
              href={AMAZON_RATING.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-6 inline-flex items-center gap-3 text-paper/75 hover:text-paper transition-colors"
            >
              <span className="text-mint text-lg tracking-widest" aria-hidden="true">★★★★★</span>
              <span className="font-eyebrow text-xs">
                {AMAZON_RATING.stars} · {AMAZON_RATING.count.toLocaleString()} {c.reviews} →
              </span>
            </a>
          </div>
        </div>

        {/* Marketplace grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MARKETPLACES.map((m) => {
            const commonClass =
              "group flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 transition-all duration-500";
            const inner = (
              <>
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl leading-none" aria-hidden="true">{m.flag}</span>
                  <div className="min-w-0">
                    <div className="font-eyebrow text-xs text-paper truncate">{m.label}</div>
                    <div className="text-[10px] text-paper/50 truncate">
                      {m.active ? m.domain : c.comingSoon}
                    </div>
                  </div>
                </div>
                <span className="text-paper/60 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
                  {m.active ? "→" : "·"}
                </span>
              </>
            );
            return m.active ? (
              <a
                key={m.code}
                href={amazonUrl(m.domain)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={`${commonClass} border-paper/15 bg-paper/[0.04] hover:bg-paper/[0.09] hover:border-paper/30`}
              >
                {inner}
              </a>
            ) : (
              <div
                key={m.code}
                aria-disabled="true"
                className={`${commonClass} border-paper/10 bg-paper/[0.02] opacity-60 cursor-not-allowed`}
              >
                {inner}
              </div>
            );
          })}
        </div>

        {/* Trust row */}
        <ul className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-paper/60 font-eyebrow text-[10px]">
          {c.trust.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-mint" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
