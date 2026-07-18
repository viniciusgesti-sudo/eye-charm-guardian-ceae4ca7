import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { useI18n } from "@/i18n/context";

import heroZenith from "@/assets/hero-zenith-man.jpg";
import heroClarity from "@/assets/hero-clarity-woman.jpg";
import { Universe } from "@/components/eyegis/Universe";
import { HonestScience } from "@/components/eyegis/HonestScience";
import { ScienceInPractice } from "@/components/eyegis/ScienceInPractice";
import { EyegisGuard } from "@/components/eyegis/EyegisGuard";
import { TechCore } from "@/components/eyegis/TechCore";
import { LifestyleUniverse } from "@/components/eyegis/LifestyleUniverse";
import { Collection } from "@/components/eyegis/Collection";
import { DigitalEyeScore } from "@/components/eyegis/DigitalEyeScore";
import { SocialProof } from "@/components/eyegis/SocialProof";
import { HowItWorks } from "@/components/eyegis/HowItWorks";
import { ShopOnAmazon } from "@/components/eyegis/ShopOnAmazon";
import { FAQ } from "@/components/eyegis/FAQ";
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
  return (
    <section className="relative w-full bg-ink text-paper">
      {/* ============ SPLIT SCREEN ============ */}
      <div className="relative flex min-h-[720px] w-full flex-col lg:h-[92vh] lg:min-h-[760px] lg:flex-row">
        {/* --- LEFT / ZENITH · Men --- */}
        <div className="group relative w-full overflow-hidden lg:w-1/2">
          <img
            src={heroZenith}
            alt="Eyegis Zenith — man wearing dark-frame glasses, São Paulo night"
            width={1024}
            height={1536}
            className="absolute inset-0 h-full w-full object-cover object-[60%_35%] transition-transform duration-[1600ms] ease-out group-hover:scale-105"
          />
          {/* Cyan night grade */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_30%_20%,rgba(0,180,255,0.18),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 mix-blend-multiply bg-[linear-gradient(180deg,rgba(2,12,20,0.35)_0%,rgba(2,12,20,0.55)_60%,rgba(2,12,20,0.9)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-teal-deep/25 mix-blend-color" />
          {/* HUD eyebrow */}
          <div className="absolute left-6 top-6 md:left-10 md:top-10 z-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-200/80">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
            <span>SP · 23:47 · Night Grid</span>
          </div>
          {/* Content */}
          <div className="relative z-10 mx-auto flex h-full min-h-[560px] max-w-xl flex-col justify-end px-6 pb-14 md:px-10 md:pb-16">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-cyan-200/90">
              Men · Zenith Universe
            </span>
            <h1 className="mt-4 font-editorial text-[13vw] leading-[0.88] text-paper sm:text-[9vw] lg:text-[5.2vw] xl:text-[80px]">
              ZENITH<br />
              <span className="italic text-cyan-200">LENS</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-paper/80 md:text-lg">
              High-Intensity Protection for the 24/7 Hustle.
            </p>
            <div className="mt-8">
              <a
                href="#men"
                className="group/cta inline-flex items-center gap-5 rounded-full bg-teal-deep px-7 py-4 text-paper shadow-[0_20px_60px_-20px_rgba(0,180,255,0.55)] transition-all hover:-translate-y-0.5 hover:bg-teal"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
                  Explore Men's Collection
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-paper/10 transition-transform group-hover/cta:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* --- RIGHT / CLARITY · Women --- */}
        <div className="group relative w-full overflow-hidden lg:w-1/2">
          <img
            src={heroClarity}
            alt="Eyegis Clarity — woman wearing light champagne acetate glasses, Paris golden hour"
            width={1024}
            height={1536}
            className="absolute inset-0 h-full w-full object-cover object-[45%_30%] transition-transform duration-[1600ms] ease-out group-hover:scale-105"
          />
          {/* Warm champagne grade */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_20%,rgba(255,220,170,0.22),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,235,205,0.05)_0%,rgba(226,209,195,0.35)_65%,rgba(226,209,195,0.85)_100%)]" />
          {/* Eyebrow */}
          <div className="absolute right-6 top-6 md:right-10 md:top-10 z-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-ink/70">
            <span>Golden Hour · Paris</span>
            <span className="h-2 w-2 rounded-full bg-[#B4956B]" />
          </div>
          <div className="relative z-10 mx-auto flex h-full min-h-[560px] max-w-xl flex-col justify-end px-6 pb-14 text-ink md:px-10 md:pb-16 lg:items-end lg:text-right">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-teal-deep/80">
              Women · Clarity Universe
            </span>
            <h2 className="mt-4 font-editorial text-[13vw] leading-[0.88] text-ink sm:text-[9vw] lg:text-[5.2vw] xl:text-[80px]">
              CLARITY<br />
              <span className="italic text-teal-deep">LENS</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink/75 md:text-lg">
              High-Fidelity Precision for the Visionary.
            </p>
            <div className="mt-8">
              <a
                href="#women"
                className="group/cta inline-flex items-center gap-5 rounded-full bg-sand px-7 py-4 text-ink shadow-[0_20px_60px_-20px_rgba(180,149,107,0.55)] transition-all hover:-translate-y-0.5 hover:bg-sand-warm"
                style={{ backgroundColor: "#E2D1C3" }}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
                  Explore Women's Collection
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink/10 transition-transform group-hover/cta:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* --- Seamless diagonal seam between the two panels (desktop only) --- */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-32 -translate-x-1/2 lg:block"
          style={{
            background:
              "linear-gradient(100deg, rgba(2,12,20,0.85) 0%, rgba(2,12,20,0.35) 40%, rgba(226,209,195,0.35) 60%, rgba(226,209,195,0.85) 100%)",
            mixBlendMode: "normal",
            clipPath: "polygon(45% 0, 100% 0, 55% 100%, 0 100%)",
          }}
        />
        {/* Hairline down the seam */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-paper/40 to-transparent lg:block"
        />
      </div>

      {/* ============ CENTERED BRAND STRIP BELOW SPLIT ============ */}
      <div className="relative overflow-hidden bg-off-white text-ink">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,75,87,0.35), transparent)",
          }}
        />
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-16 text-center md:py-20">
          {/* Wordmark */}
          <div className="flex items-center gap-3">
            <span
              className="font-editorial text-3xl tracking-[0.28em] md:text-4xl"
              style={{ color: "#004B57" }}
            >
              EYEGIS
            </span>
          </div>
          <div
            className="mt-4 h-px w-16"
            style={{ background: "rgba(0,75,87,0.35)" }}
          />
          <p className="mt-6 max-w-2xl font-editorial text-lg leading-relaxed text-ink/80 md:text-xl">
            Eyegis — Digital eye strain eyewear, engineered for vision,
            designed for style.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#women"
              className="group inline-flex items-center gap-4 rounded-full px-7 py-4 text-ink shadow-[0_20px_50px_-20px_rgba(180,149,107,0.55)] transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: "#E2D1C3" }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
                Explore CLARITY Lenses
              </span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink/10 transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#men"
              className="group inline-flex items-center gap-4 rounded-full px-7 py-4 text-paper shadow-[0_20px_50px_-20px_rgba(0,75,87,0.55)] transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: "#004B57" }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
                Explore ZENITH Lenses
              </span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-paper/15 transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60">
            <a
              href={DEFAULT_AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 transition-colors hover:text-teal-deep"
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
      <ScienceInPractice />
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
