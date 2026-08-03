import { Link, useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { Globe, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";


import { AmazonMark } from "./AmazonMark";
import { Logo } from "./Logo";
import globalData from "@/content/global.json";

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
      {globalData.topbar_pt && globalData.topbar_en && (
        <div className="bg-ink text-paper text-center py-1.5 px-4 font-eyebrow text-[9px] md:text-[10px] uppercase tracking-widest">
          {lang === "PT" ? globalData.topbar_pt : globalData.topbar_en}
        </div>
      )}
      <div className={`mx-auto grid max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 md:px-8 lg:px-12 ${compact ? "py-3 md:py-3.5" : "py-4 md:py-5"}`}>

        <Link
          to="/$locale"
          params={{ locale }}
          className="flex items-center gap-3 justify-self-start"
          aria-label="Eyegis home"
        >
          <Logo
            priority
            tone={useInk ? "dark" : "light"}
            className={`h-7 w-auto ${useInk ? "text-ink" : "text-white [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.55))]"}`}
          />

          <span
            className={`small-caps hidden whitespace-nowrap text-[9px] xl:inline ${
              useInk ? "text-muted-foreground" : "text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]"
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
          <label
            className={`relative inline-flex min-h-[36px] items-center rounded-full border transition-colors duration-500 ${
              useInk
                ? "border-ink/25 text-ink hover:bg-ink/5"
                : "border-paper/40 text-paper hover:bg-paper/10"
            }`}
          >
            <span className="sr-only">Language</span>
            <Globe className="pointer-events-none absolute left-2.5 h-3.5 w-3.5" aria-hidden />
            <select
              value={currentSeg}
              onChange={(event) => switchLocale(event.target.value as LocaleSeg)}
              aria-label={`Language: ${currentSeg.toUpperCase()}`}
              className="min-h-[36px] appearance-none rounded-full bg-transparent py-1.5 pr-3 pl-8 font-eyebrow text-[11px] uppercase tracking-[0.2em] outline-none focus-visible:ring-2 focus-visible:ring-teal/60"
            >
              {LOCALES.map((l) => (
                <option key={l} value={l} className="bg-paper text-ink">
                  {l.toUpperCase()}
                </option>
              ))}
            </select>
          </label>

          <a
            data-testid="header-cta"
            href="https://www.amazon.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className={`group hidden lg:inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] md:text-xs min-h-[40px] transition-all duration-500 ${
              useInk
                ? "border-teal/40 text-teal hover:bg-teal hover:text-paper"
                : "border-paper/40 text-paper hover:bg-paper hover:text-ink"
            }`}
            aria-label={t("nav.shopAmazon")}
          >
            <AmazonMark className="h-4 w-4" />
            <span className="whitespace-nowrap uppercase tracking-[0.2em]">{t("nav.shopAmazon")}</span>
            <span
              className="transition-transform duration-500 group-hover:translate-x-0.5"
              aria-hidden
            >
              →
            </span>
          </a>


          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className={`lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500 ${
              useInk
                ? "border-ink/25 text-ink hover:bg-ink/5"
                : "border-paper/40 text-paper hover:bg-paper/10"
            }`}
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col gap-8 bg-paper p-8 text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between gap-4">
              <Logo className="h-6 w-auto text-ink" />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/5"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <nav className="flex flex-col gap-1 font-editorial text-2xl leading-tight">
              {nav.map((item) => (
                <Link
                  key={item.key}
                  to={item.to}
                  params={{ locale }}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-ink/10 py-3 transition-colors hover:text-teal"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3 font-eyebrow text-xs">
              {LOCALES.map((l, i) => (
                <div key={l} className="flex items-center gap-3">
                  {i > 0 && <span className="text-ink/50" aria-hidden="true">·</span>}
                  <button
                    type="button"
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
                href="https://www.amazon.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[52px] w-full items-center justify-between gap-4 rounded-full bg-teal px-6 py-4 font-eyebrow text-sm uppercase tracking-[0.2em] text-paper shadow-[0_20px_50px_-20px_rgba(0,75,87,0.7)] transition-all hover:bg-teal-deep"
              >
                <span className="flex items-center gap-3">
                  <AmazonMark className="h-5 w-5 [filter:brightness(0)_invert(1)]" />
                  <span>{t("nav.shopAmazon")}</span>
                </span>
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
