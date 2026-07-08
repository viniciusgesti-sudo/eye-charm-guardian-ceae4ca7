import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import heroSaoPaulo from "@/assets/hero-saopaulo.jpg";
import heroParis from "@/assets/hero-paris.jpg";

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
  const [lang, setLang] = useState<"EN" | "PT" | "FR">("EN");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-700 ease-out ${
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
            ® Optical Science
          </span>
        </a>

        {/* Nav — centered */}
        <nav
          className={`hidden md:flex items-center gap-8 justify-self-center font-eyebrow transition-colors duration-500 ${
            scrolled ? "text-ink/80" : "text-paper/85"
          }`}
        >
          {["Men", "Women", "Kids", "Technology", "Honest Science™", "About"].map((item) => (
            <a
              key={item}
              href="#"
              className="relative py-1 transition-colors duration-300 hover:text-current after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
            >
              {item}
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
            {(["EN", "PT", "FR"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`transition-opacity ${
                  lang === l ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
                aria-label={`Language: ${l}`}
              >
                {l}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 hover:opacity-70 transition-opacity" aria-label="Shopping bag">
            <BagIcon />
            <span className="hidden sm:inline">Bag (0)</span>
          </button>
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
    <section className="relative h-screen min-h-[720px] w-full overflow-hidden bg-ink">
      {/* --- BASE LAYER : São Paulo (left, full width) --- */}
      <div className="absolute inset-0 curtain">
        <img
          src={heroSaoPaulo}
          alt="Eyegis Men — São Paulo, night"
          width={1600}
          height={1920}
          className="h-full w-full object-cover object-[65%_center] kenburns-left"
        />
        {/* Editorial gradient for legibility + teal cast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(0,56,66,0.15),rgba(0,30,36,0.75))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/80 via-teal-deep/10 to-teal-deep/50" />
      </div>

      {/* --- DIAGONAL PANEL : Paris (right, clipped) --- */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          clipPath: "polygon(58% 0, 100% 0, 100% 100%, 42% 100%)",
          WebkitClipPath: "polygon(58% 0, 100% 0, 100% 100%, 42% 100%)",
        }}
      >
        <img
          src={heroParis}
          alt="Eyegis Women — Paris, golden hour"
          width={1600}
          height={1920}
          className="h-full w-full object-cover object-[40%_center] kenburns-right"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(239,229,217,0.15),rgba(226,209,195,0.55))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-sand/60 via-transparent to-sand/25" />
      </div>




      {/* --- Diagonal seam hairline --- */}
      <div
        className="hidden lg:block absolute inset-0 pointer-events-none z-10"
        aria-hidden="true"
      >
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <line
            x1="58"
            y1="0"
            x2="42"
            y2="100"
            stroke="rgba(249,249,249,0.22)"
            strokeWidth="0.08"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* --- Mobile stack : Paris shown as a second block below --- */}
      <div className="lg:hidden absolute inset-x-0 top-1/2 bottom-0 curtain" style={{ animationDelay: "0.15s" }}>
        <img
          src={heroParis}
          alt="Eyegis Women — Paris, golden hour"
          className="h-full w-full object-cover object-[40%_center] kenburns-right"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sand/70 via-transparent to-sand/20" />
      </div>

      {/* --- Panel eyebrows (top corners) --- */}
      <div className="absolute inset-x-0 top-24 md:top-28 z-20 mx-auto flex max-w-[1600px] items-start justify-between px-6 md:px-10 lg:px-14 text-paper">
        <div
          className="rise flex flex-col items-start gap-2"
          style={{ animationDelay: "1.2s" }}
        >
          <span className="font-eyebrow text-mint">Chapter I · Meridian</span>
          <span className="font-eyebrow text-paper/70">São Paulo · 22:41</span>
        </div>
        <div
          className="rise hidden lg:flex flex-col items-end gap-2 text-ink"
          style={{ animationDelay: "1.35s" }}
        >
          <span className="font-eyebrow text-teal">Chapter II · Solène</span>
          <span className="font-eyebrow text-ink/60">Paris · 17:12</span>
        </div>
      </div>

      {/* --- Center editorial composition --- */}
      <div className="relative z-20 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-32 md:px-10 md:pb-24 lg:px-14 lg:pb-20">
        {/* Headline — split across the diagonal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end">
          {/* LEFT half */}
          <div className="max-w-xl">
            <h1 className="font-editorial text-paper leading-[0.88] text-balance-tight text-[15vw] sm:text-[11vw] md:text-[8.5vw] lg:text-[6.4vw] xl:text-[104px]">
              <span className="rise block" style={{ animationDelay: "0.5s" }}>
                Engineered
              </span>
              <span
                className="rise block italic text-mint"
                style={{ animationDelay: "0.75s" }}
              >
                for Vision.
              </span>
            </h1>
          </div>

          {/* RIGHT half */}
          <div className="max-w-xl lg:justify-self-end lg:text-right">
            <h2 className="font-editorial text-paper lg:text-ink leading-[0.88] text-balance-tight text-[15vw] sm:text-[11vw] md:text-[8.5vw] lg:text-[6.4vw] xl:text-[104px]">
              <span className="rise block" style={{ animationDelay: "0.9s" }}>
                Designed
              </span>
              <span
                className="rise block italic text-teal"
                style={{ animationDelay: "1.05s" }}
              >
                for Style.
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
            Premium blue-light filtering eyewear created for the digital generation.
            <span className="block mt-2 text-paper/60">
              Scientifically engineered. Timelessly designed.
            </span>
          </p>

          <div className="lg:col-span-8 flex flex-col sm:flex-row gap-4 lg:justify-end">
            <a
              href="#men"
              className="rise cta-lift group inline-flex items-center justify-between gap-6 rounded-full bg-teal px-8 py-5 text-paper shadow-[0_20px_50px_-20px_rgba(0,75,87,0.7)] hover:bg-teal-deep hover:-translate-y-0.5 hover:shadow-[0_28px_60px_-20px_rgba(0,56,66,0.85)]"
              style={{ animationDelay: "1.7s" }}
            >
              <span className="font-eyebrow">Explore Men's Collection</span>
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
              <span className="font-eyebrow">Explore Women's Collection</span>
              <span
                className="grid h-8 w-8 place-items-center rounded-full bg-ink/10 transition-transform duration-500 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* --- Scroll indicator --- */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rise" style={{ animationDelay: "2.1s" }}>
        <div className="flex flex-col items-center gap-3">
          <span className="font-eyebrow text-[9px] text-paper/70">Scroll</span>
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
      <Header />
      <Hero />
    </main>
  );
}
