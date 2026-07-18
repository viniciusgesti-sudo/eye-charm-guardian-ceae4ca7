import { Link, useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";
import { DEFAULT_AMAZON_URL } from "@/lib/amazon";

import { Logo } from "./Logo";

const LOCALES: Lang[] = ["PT", "EN", "FR"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-out ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-3 items-center px-6 py-5 md:px-10 lg:px-14">
        <Link
          to="/$locale"
          params={{ locale }}
          className="flex items-center gap-3 justify-self-start"
          aria-label="Eyegis home"
        >
          <Logo
            className={`h-6 w-auto transition-colors duration-500 ${
              scrolled ? "text-ink" : "text-paper"
            }`}
          />
          <span
            className={`small-caps hidden text-[9px] sm:inline transition-colors duration-500 ${
              scrolled ? "text-muted-foreground" : "text-paper/60"
            }`}
          >
            {t("nav.opticalScience")}
          </span>
        </Link>

        <nav
          className={`hidden md:flex items-center gap-8 justify-self-center font-eyebrow transition-colors duration-500 ${
            scrolled ? "text-ink/80" : "text-paper/90"
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
          className={`flex items-center gap-6 justify-self-end font-eyebrow transition-colors duration-500 ${
            scrolled ? "text-ink/80" : "text-paper/90"
          }`}
        >
          <div className="hidden sm:flex items-center gap-2">
            {LOCALES.map((l, i) => (
              <div key={l} className="flex items-center gap-2">
                {i > 0 && <span className="opacity-25">·</span>}
                <button
                  onClick={() => switchLocale(l)}
                  className={`transition-opacity ${
                    localeUp === l ? "opacity-100" : "opacity-40 hover:opacity-70"
                  }`}
                  aria-label={`Language: ${l}`}
                  aria-current={localeUp === l ? "true" : undefined}
                >
                  {l}
                </button>
              </div>
            ))}
          </div>
          <a
            href={DEFAULT_AMAZON_URL}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-500 ${
              scrolled
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
        </div>
      </div>
    </header>
  );
}
