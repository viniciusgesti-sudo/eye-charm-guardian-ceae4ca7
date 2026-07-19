import { Link, useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";
import { DEFAULT_AMAZON_URL } from "@/lib/amazon";

import { Logo } from "./Logo";
import { HighContrastToggle } from "./HighContrastToggle";

const LOCALES: Lang[] = ["PT", "EN", "FR"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const params = useParams({ strict: false }) as { locale?: string };
  const locale = (params.locale ?? "pt").toLowerCase();
  const localeUp = locale.toUpperCase() as Lang;
  const location = useLocation();
  const navigate = useNavigate();
  const { t, setLang } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Rotas com hero claro precisam de tinta escura desde o topo (antes do scroll).
  const path = location.pathname.replace(/^\/(pt|en|fr)/i, "");
  const lightHeroRoute = path === "/women" || path === "/kids" || path.startsWith("/about") || path.startsWith("/faq") || path.startsWith("/shipping") || path.startsWith("/warranty") || path.startsWith("/contact") || path.startsWith("/lenses");
  const useInk = scrolled || lightHeroRoute;

  const nav = [
    { key: "women", label: t("nav.women"), to: "/$locale/women" as const },
    { key: "men", label: t("nav.men"), to: "/$locale/men" as const },
    { key: "kids", label: t("nav.kids"), to: "/$locale/kids" as const },
    { key: "tech", label: t("nav.technology"), to: "/$locale/technology" as const },
    { key: "about", label: t("nav.about"), to: "/$locale/about" as const },
  ];

  const switchLocale = (target: Lang) => {
    setLang(target);
    const next = location.pathname.replace(
      /^\/(pt|en|fr)(?=\/|$)/i,
      `/${target.toLowerCase()}`,
    );
    navigate({ to: next.startsWith(`/${target.toLowerCase()}`) ? next : `/${target.toLowerCase()}` });
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-out ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/50"
          : lightHeroRoute
            ? "bg-paper/70 backdrop-blur-md border-b border-border/30"
            : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 md:px-8 md:py-5 lg:px-12">

        <Link
          to="/$locale"
          params={{ locale }}
          className="flex items-center gap-3 justify-self-start"
          aria-label="Eyegis home"
        >
          <Logo
            className={`h-6 w-auto transition-colors duration-500 ${
              useInk ? "text-ink" : "text-paper"
            }`}
          />
          <span
            className={`small-caps hidden text-[9px] xl:inline transition-colors duration-500 ${
              useInk ? "text-muted-foreground" : "text-paper/85"
            }`}
          >
            {t("nav.opticalScience")}
          </span>
        </Link>

        <nav
          className={`hidden lg:flex items-center gap-6 justify-self-center font-eyebrow transition-colors duration-500 ${
            useInk ? "text-ink/80" : "text-paper/90"
          }`}
        >
          {nav.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              params={{ locale }}
              activeProps={{ className: "font-semibold" }}
              className="relative py-1 whitespace-nowrap transition-colors duration-300 hover:opacity-70 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div
          className={`flex items-center gap-3 md:gap-5 justify-self-end font-eyebrow transition-colors duration-500 ${
            useInk ? "text-ink/80" : "text-paper/90"
          }`}
        >
          <div className="hidden xl:flex items-center gap-2">
            {LOCALES.map((l, i) => (
              <div key={l} className="flex items-center gap-2">
                {i > 0 && <span className="opacity-25">·</span>}
                <button
                  onClick={() => switchLocale(l)}
                  className={`transition-opacity ${
                    localeUp === l ? "opacity-100" : "opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Language: ${l}`}
                  aria-current={localeUp === l ? "true" : undefined}
                >
                  {l}
                </button>
              </div>
            ))}
          </div>
          <HighContrastToggle tone={useInk ? "light" : "dark"} />
          <a
            data-testid="header-cta"
            href={DEFAULT_AMAZON_URL}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`group inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] md:px-4 md:text-xs transition-all duration-500 ${
              useInk
                ? "border-teal/40 text-teal hover:bg-teal hover:text-paper"
                : "border-paper/40 text-paper hover:bg-paper hover:text-ink"
            }`}
            aria-label={t("nav.shopAmazon")}
          >
            <span className="whitespace-nowrap">{t("nav.shopAmazon")}</span>
            <span
              className="transition-transform duration-500 group-hover:translate-x-0.5"
              aria-hidden
            >
              →
            </span>
          </a>

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className={`lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500 ${
                  useInk
                    ? "border-ink/25 text-ink hover:bg-ink/5"
                    : "border-paper/40 text-paper hover:bg-paper/10"
                }`}
              >
                <Menu className="h-5 w-5" aria-hidden />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[86%] max-w-sm bg-paper text-ink flex flex-col gap-8 p-8"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex items-center justify-between">
                <Logo className="h-6 w-auto text-ink" />
              </div>
              <nav className="flex flex-col gap-1 font-editorial text-2xl leading-tight">
                {nav.map((item) => (
                  <SheetClose asChild key={item.key}>
                    <Link
                      to={item.to}
                      params={{ locale }}
                      onClick={() => setMobileOpen(false)}
                      className="py-3 border-b border-ink/10 hover:text-teal transition-colors"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="flex items-center gap-3 font-eyebrow text-xs">
                {LOCALES.map((l, i) => (
                  <div key={l} className="flex items-center gap-3">
                    {i > 0 && <span className="opacity-25">·</span>}
                    <button
                      onClick={() => {
                        switchLocale(l);
                        setMobileOpen(false);
                      }}
                      className={`transition-opacity ${
                        localeUp === l ? "opacity-100 text-teal" : "opacity-70 hover:opacity-100"
                      }`}
                      aria-current={localeUp === l ? "true" : undefined}
                    >
                      {l}
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 border-t border-ink/10 pt-6">
                <HighContrastToggle tone="light" />
                <span className="font-eyebrow text-[11px] text-ink/60">Honest Science mode</span>
              </div>
              <div className="mt-auto">
                <a
                  href={DEFAULT_AMAZON_URL}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-between gap-4 rounded-full bg-teal px-6 py-4 text-paper font-eyebrow text-sm shadow-[0_20px_50px_-20px_rgba(0,75,87,0.7)] hover:bg-teal-deep transition-all"
                >
                  <span>{t("nav.shopAmazon")}</span>
                  <span aria-hidden>→</span>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
