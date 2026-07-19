import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/context";
import { COMING_SOON_HREF } from "@/lib/amazon";

/**
 * Floating notify-me bar. Mobile: full width. Desktop: bottom-right pill.
 * Appears after the user scrolls past the hero. No fabricated ratings —
 * the store isn't live yet, so the CTA opens the ComingSoonModal.
 */
export function StickyBuyBar() {
  const { lang } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const onScroll = () => setVisible(isMobile || window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copy = {
    en: { label: "Coming soon — Notify me", sub: "Priority access · Amazon launch" },
    pt: { label: "Em breve — Seja notificado", sub: "Acesso prioritário · Lançamento Amazon" },
    fr: { label: "Bientôt — Prévenez-moi", sub: "Accès prioritaire · Lancement Amazon" },
  } as const;
  const c = copy[lang.toLowerCase() as keyof typeof copy] ?? copy.en;

  return (
    <div
      data-testid="sticky-buy-bar"
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
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-teal-deep">
              <span
                aria-hidden
                className="inline-grid h-3.5 w-3.5 place-items-center rounded-full text-[9px] font-bold"
                style={{ backgroundColor: "#86D9D1", color: "#004B57" }}
              >
                ✓
              </span>
              <span className="truncate">ANSI · EN ISO · AS/NZS</span>
            </div>
            <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/55">
              {c.sub}
            </div>
          </div>
          <a
            href={COMING_SOON_HREF}
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper shadow-lg active:scale-95 transition-transform"
            style={{ backgroundColor: "#004B57", boxShadow: "0 12px 30px -12px rgba(0,75,87,0.55)" }}
          >
            {c.label}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Desktop pill */}
      <a
        href={COMING_SOON_HREF}
        className="hidden md:inline-flex group items-center gap-4 rounded-full py-3 pl-3 pr-5 shadow-2xl backdrop-blur-xl ring-1 ring-paper/10 transition-all hover:brightness-110"
        style={{ backgroundColor: "#004B57" }}
      >
        <span
          aria-hidden
          className="grid h-10 w-10 place-items-center rounded-full text-[13px] font-bold"
          style={{ backgroundColor: "#FF9900", color: "#1A1A2E" }}
        >
          a
        </span>
        <span className="flex flex-col leading-tight">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-mint">
            Priority · Amazon launch
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
