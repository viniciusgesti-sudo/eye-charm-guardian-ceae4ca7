import { useI18n } from "@/i18n/context";
import { AMAZON_RATING, DEFAULT_AMAZON_URL } from "@/lib/amazon";

/**
 * Thin tech / sales announcement bar at the very top of the site.
 * Deep-teal background, mono type, rotating messages via CSS marquee.
 */
export function TechBar() {
  const { lang } = useI18n();

  const messages: Record<string, string[]> = {
    en: [
      `★ ${AMAZON_RATING.stars} · ${AMAZON_RATING.count.toLocaleString("en")} verified Amazon reviews`,
      "Amazon's Choice · Blue-light eyewear",
      "Free Prime shipping · Ships in 24h",
      "60-day comfort guarantee · Free returns",
      "TR90 · CR-39 lenses · CE certified",
    ],
    pt: [
      `★ ${AMAZON_RATING.stars} · ${AMAZON_RATING.count.toLocaleString("pt-BR")} avaliações verificadas na Amazon`,
      "Amazon's Choice · Óculos com filtro de luz azul",
      "Frete Prime grátis · Envio em 24h",
      "60 dias de garantia de conforto · Devolução grátis",
      "TR90 · Lentes CR-39 · Certificado CE",
    ],
    fr: [
      `★ ${AMAZON_RATING.stars} · ${AMAZON_RATING.count.toLocaleString("fr-FR")} avis vérifiés sur Amazon`,
      "Amazon's Choice · Lunettes anti-lumière bleue",
      "Livraison Prime offerte · Expédié sous 24h",
      "Garantie confort 60 jours · Retours gratuits",
      "TR90 · Verres CR-39 · Certifié CE",
    ],
  };

  const items = messages[lang.toLowerCase()] ?? messages.en;
  const track = [...items, ...items];

  return (
    <div className="relative z-[60] w-full overflow-hidden border-b border-paper/10 bg-teal-deep text-paper">
      <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-6 py-2 md:px-10 lg:px-14">
        {/* status dot */}
        <span className="hidden sm:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-mint">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
          </span>
          LIVE
        </span>

        {/* marquee */}
        <div className="relative flex-1 overflow-hidden">
          <div className="flex min-w-max animate-[techmarquee_38s_linear_infinite] gap-10 font-mono text-[10.5px] uppercase tracking-[0.16em] text-paper/85">
            {track.map((m, i) => (
              <span key={i} className="whitespace-nowrap">
                {m}
                <span className="mx-6 text-paper/25">◆</span>
              </span>
            ))}
          </div>
        </div>

        <a
          href={DEFAULT_AMAZON_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="hidden md:inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#FF9900] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink hover:bg-[#ffb84d] transition-colors"
        >
          <span>a</span>
          <span>{lang === "PT" ? "Comprar" : lang === "FR" ? "Acheter" : "Buy"}</span>
        </a>
      </div>

      <style>{`
        @keyframes techmarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
