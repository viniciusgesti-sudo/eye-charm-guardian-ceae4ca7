import { Link, useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { Check, Globe, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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


import { Logo } from "./Logo";

type LocaleSeg = "br" | "en" | "fr";
const LOCALES: LocaleSeg[] = ["br", "en", "fr"];
const LOCALE_LABEL: Record<LocaleSeg, string> = { br: "Português", en: "English", fr: "Français" };
const segToLang = (s: LocaleSeg): Lang => (s === "br" ? "PT" : (s.toUpperCase() as Lang));

export function Header({ variant = "default" }: { variant?: "default" | "compact" } = {}) {
  const compact = variant === "compact";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const params = useParams({ strict: false }) as { locale?: string };
  const locale = (params.locale ?? "br").toLowerCase();
  const currentSeg = (LOCALES as string[]).includes(locale) ? (locale as LocaleSeg) : "br";
  const location = useLocation();
  const navigate = useNavigate();
  const { t, setLang, lang } = useI18n();

  // Sincroniza o idioma com o segmento /$locale da URL para evitar
  // que rotas /br/* renderizem textos EN (que estouram no mobile).
  useEffect(() => {
    const target = segToLang(currentSeg);
    if (lang !== target) setLang(target);
  }, [currentSeg, lang, setLang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Rotas com hero claro precisam de tinta escura desde o topo (antes do scroll).
  const path = location.pathname.replace(/^\/(br|pt|en|fr)/i, "");
  const lightHeroRoute = path === "/women" || path.startsWith("/technology") || path.startsWith("/about") || path.startsWith("/faq") || path.startsWith("/shipping") || path.startsWith("/warranty") || path.startsWith("/contact") || path.startsWith("/lenses");
  const useInk = compact || scrolled || lightHeroRoute;

  const nav = [
    { key: "men", label: t("nav.men"), to: "/$locale/men" as const },
    { key: "women", label: t("nav.women"), to: "/$locale/women" as const },
    { key: "kids", label: t("nav.kids"), to: "/$locale/kids" as const },
    { key: "lenses", label: t("nav.lenses"), to: "/$locale/lenses" as const },
    { key: "tech", label: t("nav.technology"), to: "/$locale/technology" as const },
    { key: "about", label: t("nav.about"), to: "/$locale/about" as const },
  ];

  const switchLocale = (seg: LocaleSeg) => {
    setLang(segToLang(seg));
    const next = location.pathname.replace(/^\/(br|pt|en|fr)(?=\/|$)/i, `/${seg}`);
    navigate({ to: next.startsWith(`/${seg}`) ? next : `/${seg}` });
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
      <div className={`mx-auto grid max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 md:px-8 lg:px-12 ${compact ? "py-3 md:py-3.5" : "py-4 md:py-5"}`}>

        <Link
          to="/$locale"
          params={{ locale }}
          className="flex items-center gap-3 justify-self-start"
          aria-label="Eyegis home"
        >
          <Logo
            priority
            className={`h-6 w-auto transition-colors duration-500 ${
              useInk ? "text-ink" : "text-paper"
            }`}
          />
          <span
            className={`small-caps hidden whitespace-nowrap text-[9px] xl:inline transition-colors duration-500 ${
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
            useInk ? "text-ink" : "text-paper"
          }`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label={`Language: ${currentSeg.toUpperCase()}`}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 md:px-3 text-[11px] uppercase tracking-[0.2em] transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60 min-h-[36px] ${
                  useInk
                    ? "border-ink/25 text-ink hover:bg-ink/5"
                    : "border-paper/40 text-paper hover:bg-paper/10"
                }`}
              >
                <Globe className="h-3.5 w-3.5" aria-hidden />
                <span>{currentSeg}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[9rem] bg-paper text-ink border-ink/10">
              {LOCALES.map((l) => (
                <DropdownMenuItem
                  key={l}
                  onSelect={() => switchLocale(l)}
                  className="flex items-center justify-between gap-4 uppercase tracking-[0.2em] text-[11px] cursor-pointer"
                  aria-current={currentSeg === l ? "true" : undefined}
                >
                  <span>{LOCALE_LABEL[l]}</span>
                  {currentSeg === l && <Check className="h-3.5 w-3.5 text-teal" aria-hidden />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            data-testid="header-cta"
            href="#coming-soon"
            data-coming-soon
            className={`group hidden md:inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] md:px-4 md:text-xs min-h-[40px] transition-all duration-500 ${
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
                    {i > 0 && <span className="text-ink/50" aria-hidden="true">·</span>}
                    <button
                      onClick={() => {
                        switchLocale(l);
                        setMobileOpen(false);
                      }}
                      className={`uppercase transition-colors ${
                        currentSeg === l
                          ? "text-teal font-semibold underline underline-offset-4"
                          : "text-ink hover:text-teal"
                      }`}
                      aria-current={currentSeg === l ? "true" : undefined}
                    >
                      {l}
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-auto">
                <a
                  href="#coming-soon"
                  data-coming-soon
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-between gap-4 rounded-full bg-teal px-6 py-4 text-paper font-eyebrow text-sm shadow-[0_20px_50px_-20px_rgba(0,75,87,0.7)] hover:bg-teal-deep transition-all min-h-[52px]"
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
