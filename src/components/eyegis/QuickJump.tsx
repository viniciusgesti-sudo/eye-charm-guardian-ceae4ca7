import { Link, useRouterState } from "@tanstack/react-router";
import { Cpu, Eye, Info } from "lucide-react";
import { useEffect } from "react";
import { useI18n } from "@/i18n/context";


/**
 * Sticky anchor / quick-jump bar under the header.
 * Lets visitors jump straight to Technology, Lenses and About
 * without long scrolls. Hidden on those pages themselves.
 */
export function QuickJump() {
  const { lang, t } = useI18n();
  const locale = lang.toLowerCase();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const items = [
    { to: "/$locale/technology" as const, label: t("nav.technology"), Icon: Cpu, match: "/technology" },
    { to: "/$locale/lenses" as const, label: t("nav.lenses"), Icon: Eye, match: "/lenses" },
    { to: "/$locale/about" as const, label: t("nav.about"), Icon: Info, match: "/about" },
  ];

  // Hide the strip when the visitor is already on one of these pages.
  const onTargetPage = items.some((i) => pathname.endsWith(i.match));

  // Sync a body attribute so global scroll-padding-top drops the QuickJump
  // share on pages where the strip is not rendered.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.dataset.quickjump = onTargetPage ? "off" : "on";
    return () => {
      delete document.body.dataset.quickjump;
    };
  }, [onTargetPage]);

  if (onTargetPage) return null;


  return (
    <nav
      aria-label="Quick navigation"
      className="sticky top-14 z-30 border-b border-black/5 bg-[#F9F9F9]/85 backdrop-blur-md md:top-16"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 md:justify-center md:gap-2 md:px-6">
        <span className="mr-2 hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.28em] text-[#003842]/60 md:inline">
          {t("nav.technology") ? "↳" : ""}
        </span>
        {items.map(({ to, label, Icon }) => (
          <Link
            key={to}
            to={to}
            params={{ locale }}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-transparent px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1D252D] transition-colors hover:border-[#004B57]/25 hover:bg-white hover:text-[#004B57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004B57]/40"
            activeProps={{ className: "border-[#004B57]/40 bg-white text-[#004B57]" }}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
