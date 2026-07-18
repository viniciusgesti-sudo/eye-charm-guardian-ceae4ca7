import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { useI18n } from "@/i18n/context";

import heroSaoPaulo from "@/assets/hero-saopaulo-eyegis.jpg";
import heroParis from "@/assets/hero-paris-eyegis.jpg";
import { Universe } from "@/components/eyegis/Universe";
import { HonestScience } from "@/components/eyegis/HonestScience";
import { EyegisGuard } from "@/components/eyegis/EyegisGuard";
import { TechCore } from "@/components/eyegis/TechCore";
import { LifestyleUniverse } from "@/components/eyegis/LifestyleUniverse";
import { Collection } from "@/components/eyegis/Collection";
import { DigitalEyeScore } from "@/components/eyegis/DigitalEyeScore";
import { SocialProof } from "@/components/eyegis/SocialProof";
import { HowItWorks } from "@/components/eyegis/HowItWorks";
import { ShopOnAmazon } from "@/components/eyegis/ShopOnAmazon";
import { TechBar } from "@/components/eyegis/TechBar";
import { LiveStats } from "@/components/eyegis/LiveStats";
import { ModelRunway } from "@/components/eyegis/ModelRunway";
import { StickyBuyBar } from "@/components/eyegis/StickyBuyBar";
import { AMAZON_RATING, DEFAULT_AMAZON_URL } from "@/lib/amazon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eyegis — Engineered for Vision. Designed for Style." },
      {
        name: "description",
        content:
          "Premium blue-light filtering eyewear for the digital generation. Scientifically engineered. Timelessly designed.",
      },
    ],
  }),
  component: Index,
});

/* ------------------------------------------------------------------
   Header — minimal floating navigation
   Transparent → blurred on scroll
   ------------------------------------------------------------------ */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, langs, t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems: { key: string; label: string }[] = [
    { key: "men", label: t("nav.men") },
    { key: "women", label: t("nav.women") },
    { key: "kids", label: t("nav.kids") },
    { key: "technology", label: t("nav.technology") },
    { key: "honestScience", label: t("nav.honestScience") },
    { key: "about", label: t("nav.about") },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-[34px] md:top-[36px] z-50 transition-[background-color,backdrop-filter,border-color] duration-700 ease-out ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-3 items-center px-6 py-5 md:px-10 lg:px-14">
        {/* Logo */}
        <a href="/" className="flex items-baseline gap-2 justify-self-start">
          <span
            className={`font-editorial text-2xl tracking-tight transition-colors duration-500 ${
              scrolled ? "text-ink" : "text-paper"
            }`}
          >
            Eyegis
          </span>
          <span
            className={`font-eyebrow hidden text-[9px] sm:inline transition-colors duration-500 ${
              scrolled ? "text-muted-foreground" : "text-paper/60"
            }`}
          >
            {t("nav.opticalScience")}
          </span>
        </a>

        {/* Nav — centered */}
        <nav
          className={`hidden md:flex items-center gap-8 justify-self-center font-eyebrow transition-colors duration-500 ${
            scrolled ? "text-ink/80" : "text-paper/85"
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.key}
              href="#"
              className="relative py-1 whitespace-nowrap transition-colors duration-300 hover:text-current after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div
          className={`flex items-center gap-6 justify-self-end font-eyebrow transition-colors duration-500 ${
            scrolled ? "text-ink/80" : "text-paper/85"
          }`}
        >
          <div className="hidden sm:flex items-center gap-2">
            {langs.map((l, i) => (
              <div key={l} className="flex items-center gap-2">
                {i > 0 && <span className="opacity-25">·</span>}
                <button
                  onClick={() => setLang(l)}
                  className={`transition-opacity ${
                    lang === l ? "opacity-100" : "opacity-40 hover:opacity-70"
                  }`}
                  aria-label={`Language: ${l}`}
                  aria-current={lang === l ? "true" : undefined}
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
            <span className="transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function BagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 5h10l-.8 8.4a1 1 0 0 1-1 .9H4.8a1 1 0 0 1-1-.9L3 5Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M6 5V3.5a2 2 0 1 1 4 0V5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Hero — full viewport, diagonal split, dual universe
   ------------------------------------------------------------------ */

function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative h-screen min-h-[720px] w-full overflow-hidden bg-ink">
      {/* --- LEFT HALF : São Paulo / Man (teal side) --- */}
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-1/2 overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 100% 0, calc(100% - 40px) 100%, 0 100%)",
          WebkitClipPath: "polygon(0 0, 100% 0, calc(100% - 40px) 100%, 0 100%)",
        }}
      >
        <img
          src={heroSaoPaulo}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-55 blur-xl"
        />
        <img
          src={heroSaoPaulo}
          alt="Eyegis Men — São Paulo, night"
          width={1600}
          height={1920}
          className="absolute inset-0 h-full w-full object-cover object-[50%_50%]"
        />
        {/* Teal editorial cast */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,30,36,0.35)_0%,rgba(0,30,36,0.15)_45%,rgba(0,30,36,0.65)_100%)]" />
        <div className="absolute inset-0 mix-blend-multiply bg-teal-deep/30" />
      </div>

      {/* --- RIGHT HALF : Paris / Woman (natural side) --- */}
      <div
        className="absolute inset-y-0 right-0 hidden lg:block w-1/2 overflow-hidden"
        style={{
          clipPath: "polygon(40px 0, 100% 0, 100% 100%, 0 100%)",
          WebkitClipPath: "polygon(40px 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        <img
          src={heroParis}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-50 blur-xl"
        />
        <img
          src={heroParis}
          alt="Eyegis Women — Paris, golden hour"
          width={1600}
          height={1920}
          className="absolute inset-0 h-full w-full object-cover object-[48%_50%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(239,229,217,0.20)_0%,rgba(239,229,217,0.05)_45%,rgba(226,209,195,0.55)_100%)]" />
      </div>

      {/* --- Vertical seam hairline --- */}
      <div
        className="hidden lg:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-off-white/25 pointer-events-none z-10"
        aria-hidden="true"
      />


      {/* --- Mobile stack : Paris shown as a second block below --- */}
      <div className="lg:hidden absolute inset-x-0 top-1/2 bottom-0 curtain" style={{ animationDelay: "0.15s" }}>
        <img
          src={heroParis}
          alt="Eyegis Women — Paris, golden hour"
          className="h-full w-full object-cover object-[48%_45%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sand/70 via-transparent to-sand/20" />
      </div>

      {/* --- Panel eyebrows (top corners) --- */}
      <div className="absolute inset-x-0 top-24 md:top-28 z-20 mx-auto flex max-w-[1600px] items-start justify-between px-6 md:px-10 lg:px-14 text-paper">
        <div
          className="rise flex flex-col items-start gap-2"
          style={{ animationDelay: "1.2s" }}
        >
          <span className="font-eyebrow text-mint">{t("hero.chapter1")}</span>
          <span className="font-eyebrow text-paper/70">{t("hero.chapter1.location")}</span>
        </div>
        <div
          className="rise hidden lg:flex flex-col items-end gap-2 text-ink"
          style={{ animationDelay: "1.35s" }}
        >
          <span className="font-eyebrow text-teal">{t("hero.chapter2")}</span>
          <span className="font-eyebrow text-ink/60">{t("hero.chapter2.location")}</span>
        </div>
      </div>

      {/* --- Center editorial composition --- */}
      <div className="relative z-20 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-36 md:px-10 md:pb-32 lg:px-14 lg:pb-28">
        {/* Headline — split across the diagonal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end">
          {/* LEFT half */}
          <div className="max-w-xl">
            <h1 className="font-editorial text-paper leading-[0.88] text-balance-tight text-[15vw] sm:text-[11vw] md:text-[8.5vw] lg:text-[6.4vw] xl:text-[104px]">
              <span className="rise block" style={{ animationDelay: "0.5s" }}>
                {t("hero.headline1.line1")}
              </span>
              <span
                className="rise block italic text-mint"
                style={{ animationDelay: "0.75s" }}
              >
                {t("hero.headline1.line2")}
              </span>
            </h1>
          </div>

          {/* RIGHT half */}
          <div className="max-w-xl lg:justify-self-end lg:text-right">
            <h2 className="font-editorial text-paper lg:text-ink leading-[0.88] text-balance-tight text-[15vw] sm:text-[11vw] md:text-[8.5vw] lg:text-[6.4vw] xl:text-[104px]">
              <span className="rise block" style={{ animationDelay: "0.9s" }}>
                {t("hero.headline2.line1")}
              </span>
              <span
                className="rise block italic text-teal"
                style={{ animationDelay: "1.05s" }}
              >
                {t("hero.headline2.line2")}
              </span>
            </h2>
          </div>
        </div>

        {/* Sub-copy + CTA row */}
        <div className="mt-14 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <p
            className="rise lg:col-span-4 font-light text-base md:text-lg leading-relaxed text-paper/85 max-w-md"
            style={{ animationDelay: "1.5s" }}
          >
            {t("hero.subcopy.line1")}
            <span className="block mt-2 text-paper/60">
              {t("hero.subcopy.line2")}
            </span>
          </p>

          <div className="lg:col-span-8 flex flex-col sm:flex-row gap-4 lg:justify-end">
            <a
              href="#men"
              className="rise cta-lift group inline-flex items-center justify-between gap-6 rounded-full bg-teal px-8 py-5 text-paper shadow-[0_20px_50px_-20px_rgba(0,75,87,0.7)] hover:bg-teal-deep hover:-translate-y-0.5 hover:shadow-[0_28px_60px_-20px_rgba(0,56,66,0.85)]"
              style={{ animationDelay: "1.7s" }}
            >
              <span className="font-eyebrow">{t("hero.cta.men")}</span>
              <span
                className="grid h-8 w-8 place-items-center rounded-full bg-paper/10 transition-transform duration-500 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>

            <a
              href="#women"
              className="rise cta-lift group inline-flex items-center justify-between gap-6 rounded-full bg-sand px-8 py-5 text-ink shadow-[0_20px_50px_-20px_rgba(226,209,195,0.9)] hover:bg-sand-warm hover:-translate-y-0.5 hover:shadow-[0_28px_60px_-20px_rgba(226,209,195,1)]"
              style={{ animationDelay: "1.85s" }}
            >
              <span className="font-eyebrow">{t("hero.cta.women")}</span>
              <span
                className="grid h-8 w-8 place-items-center rounded-full bg-ink/10 transition-transform duration-500 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </div>
        </div>

        {/* Sales trust strip */}
        <div
          className="rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/70"
          style={{ animationDelay: "2s" }}
        >
          <a
            href={DEFAULT_AMAZON_URL}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 hover:text-mint transition-colors"
          >
            <span className="text-[#FF9900]">★ {AMAZON_RATING.stars}</span>
            <span>{AMAZON_RATING.count.toLocaleString("en")} Amazon reviews</span>
          </a>
          <span className="opacity-30">/</span>
          <span>Amazon's Choice</span>
          <span className="opacity-30">/</span>
          <span>Prime · 24h ship</span>
          <span className="opacity-30">/</span>
          <span>60-day guarantee</span>
        </div>
      </div>

      {/* --- Scroll indicator --- */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rise" style={{ animationDelay: "2.1s" }}>
        <div className="flex flex-col items-center gap-3">
          <span className="font-eyebrow text-[9px] text-paper/70">{t("hero.scroll")}</span>
          <div className="relative h-14 w-px overflow-hidden bg-paper/15">
            <span className="absolute inset-x-0 h-6 bg-paper scroll-line" />
          </div>
        </div>
      </div>

      {/* --- Corner brand marker --- */}
      <div
        className="rise absolute bottom-8 right-6 md:right-10 lg:right-14 z-20 hidden md:flex items-center gap-3 text-paper/70"
        style={{ animationDelay: "2.2s" }}
      >
        <span className="font-eyebrow text-[9px]">EST · MMXXIV</span>
        <span className="h-px w-8 bg-paper/40" />
        <span className="font-eyebrow text-[9px]">SP · PAR · PRT</span>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Page
   ------------------------------------------------------------------ */

function Index() {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <TechBar />
      <Header />
      <Hero />
      <HowItWorks />
      <LiveStats />
      <ModelRunway />
      <Universe />
      <HonestScience />
      <TechCore />
      <EyegisGuard />
      <LifestyleUniverse />
      <Collection />
      <DigitalEyeScore />
      <SocialProof />
      <ShopOnAmazon />
      <StickyBuyBar />
    </main>
  );
}
