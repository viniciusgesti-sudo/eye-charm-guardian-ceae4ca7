import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/context";
import { AMAZON_RATING, DEFAULT_AMAZON_URL } from "@/lib/amazon";

/**
 * Floating buy-now bar. Mobile: full width. Desktop: bottom-right pill.
 * Appears after the user scrolls past the hero.
 */
export function StickyBuyBar() {
  const { lang } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Mobile: visible from load. Desktop: after user scrolls past the hero.
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const onScroll = () => setVisible(isMobile || window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copy = {
    en: { label: "Buy on Amazon", sub: "Prime · Free 30-day returns", rating: "verified reviews" },
    pt: { label: "Comprar na Amazon", sub: "Prime · Devolução grátis 30 dias", rating: "avaliações" },
    fr: { label: "Acheter sur Amazon", sub: "Prime · Retours gratuits 30 jours", rating: "avis vérifiés" },
  } as const;
  const c = copy[lang.toLowerCase() as keyof typeof copy] ?? copy.en;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[55] transition-all duration-500 md:inset-auto md:bottom-6 md:right-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 md:translate-y-4"
      }`}
      aria-hidden={!visible}
    >
      {/* Mobile bar */}
      <div className="md:hidden border-t border-ink/10 bg-paper/95 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/70">
              <span className="text-[#FF9900]">★ {AMAZON_RATING.stars}</span>
              <span className="text-ink/30">·</span>
              <span className="truncate">
                {AMAZON_RATING.count.toLocaleString("en")} {c.rating}
              </span>
            </div>
            <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/45">
              {c.sub}
            </div>
          </div>
          <a
            href={DEFAULT_AMAZON_URL}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF9900] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink shadow-lg shadow-[#FF9900]/30 active:scale-95 transition-transform"
          >
            {c.label}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Desktop pill */}
      <a
        href={DEFAULT_AMAZON_URL}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="hidden md:inline-flex group items-center gap-4 rounded-full bg-ink/95 py-3 pl-3 pr-5 shadow-2xl shadow-ink/30 backdrop-blur-xl ring-1 ring-paper/10 hover:bg-ink transition-all"
      >
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#FF9900] font-mono text-[13px] font-bold text-ink">
          a
        </span>
        <span className="flex flex-col leading-tight">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-mint">
            ★ {AMAZON_RATING.stars} · {AMAZON_RATING.count.toLocaleString("en")}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper">
            {c.label}
          </span>
        </span>
        <span className="text-paper/70 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
      </a>
    </div>
  );
}
