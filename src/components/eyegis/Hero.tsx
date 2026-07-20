import { Link } from "@tanstack/react-router";

import heroZenith from "@/assets/hero-saopaulo-eyegis.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import heroClarity from "@/assets/hero-paris-eyegis.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import { useI18n } from "@/i18n/context";
import { LAB_CERTIFICATIONS } from "@/lib/amazon";

import { Logo } from "./Logo";
import { Picture } from "./Picture";

type Props = { locale: string };

const ALTS = {
  EN: {
    men: "Eyegis Zenith — a man at night in São Paulo, cyan neon reflections on his square acetate frame, Octávio Frias bridge behind him.",
    women: "Eyegis Clarity — a chic woman in Paris in a champagne cat-eye frame, the Eiffel Tower rising in the background.",
  },
  PT: {
    men: "Eyegis Zenith — homem à noite em São Paulo, reflexos neon ciano na armação quadrada, ponte Octávio Frias ao fundo.",
    women: "Eyegis Clarity — mulher chique em Paris com armação gatinho champanhe, Torre Eiffel ao fundo.",
  },
  FR: {
    men: "Eyegis Zenith — un homme la nuit à São Paulo, reflets néon cyan sur sa monture carrée, pont Octávio Frias en arrière-plan.",
    women: "Eyegis Clarity — une femme chic à Paris avec une monture œil-de-chat champagne, la Tour Eiffel en arrière-plan.",
  },
} as const;

export function Hero({ locale }: Props) {
  const { t, lang } = useI18n();
  const alts = ALTS[lang] ?? ALTS.EN;

  return (
    <section className="relative w-full bg-ink text-paper">
      {/* Split-screen editorial hero: Zenith (Men, blue nocturnal) × Clarity (Women, champagne tower) */}
      <div className="relative grid w-full grid-cols-1 lg:grid-cols-2">
        {/* LEFT — Zenith / Men */}
        <Link
          to="/$locale/men"
          params={{ locale }}
          aria-label={t("hero.cta.men")}
          className="group relative block overflow-hidden bg-[#0A1420]"
        >
          <div className="relative aspect-[4/5] w-full min-h-[560px] lg:aspect-auto lg:h-[92vh] lg:min-h-[720px]">
            <Picture
              source={heroZenith}
              alt={alts.men}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover object-[50%_30%] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
            {/* Blue nocturnal wash */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(6,20,40,0.15) 0%, rgba(4,16,32,0.55) 60%, rgba(2,10,22,0.95) 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-overlay"
              style={{ background: "radial-gradient(120% 80% at 50% 30%, rgba(0,120,200,0.25), transparent 70%)" }}
            />
            {/* HUD tag */}
            <div className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 rounded-full bg-ink/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.32em] text-mint/90 backdrop-blur-sm md:left-10 md:top-8">
              <span className="h-2 w-2 animate-pulse rounded-full bg-mint" />
              <span>Zenith · Men</span>
            </div>
            {/* Copy block */}
            <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-14 md:px-10 md:pb-16">
              <span className="font-mono text-[11px] uppercase tracking-[0.36em] text-mint/90">
                {t("nav.men")}
              </span>
              <h2
                className="mt-4 font-editorial text-[13vw] leading-[0.9] text-paper sm:text-[9vw] lg:text-[5.5vw] xl:text-[76px]"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
              >
                ZENITH
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/85 md:text-base">
                {t("hero.zenith.tag")}
              </p>
              <span className="mt-6 inline-flex w-fit items-center gap-4 rounded-full bg-teal-deep px-6 py-3.5 text-paper shadow-[0_20px_60px_-20px_rgba(0,180,255,0.55)] transition-all group-hover:-translate-y-0.5 group-hover:bg-teal">
                <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
                  {t("hero.cta.men")}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-paper/10 transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </div>
        </Link>

        {/* RIGHT — Clarity / Women */}
        <Link
          to="/$locale/women"
          params={{ locale }}
          aria-label={t("hero.cta.women")}
          className="group relative block overflow-hidden bg-[#E2D1C3]"
        >
          <div className="relative aspect-[4/5] w-full min-h-[560px] lg:aspect-auto lg:h-[92vh] lg:min-h-[720px]">
            <Picture
              source={heroClarity}
              alt={alts.women}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover object-[50%_30%] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
            {/* Champagne warm wash */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,240,220,0.05) 0%, rgba(180,149,107,0.25) 55%, rgba(60,40,25,0.85) 100%)",
              }}
            />
            {/* HUD tag */}
            <div className="absolute right-6 top-6 z-10 inline-flex items-center gap-2 rounded-full bg-paper/75 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.32em] text-ink/80 backdrop-blur-sm md:right-10 md:top-8">
              <span>Clarity · Women</span>
              <span className="h-2 w-2 rounded-full bg-[#B4956B]" />
            </div>
            {/* Copy block */}
            <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-14 text-paper md:px-10 md:pb-16">
              <span className="font-mono text-[11px] uppercase tracking-[0.36em]" style={{ color: "#F2E6D6" }}>
                {t("nav.women")}
              </span>
              <h2
                className="mt-4 font-editorial italic text-[13vw] leading-[0.9] sm:text-[9vw] lg:text-[5.5vw] xl:text-[76px]"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}
              >
                Clarity
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/90 md:text-base">
                {t("hero.clarity.tag")}
              </p>
              <span
                className="mt-6 inline-flex w-fit items-center gap-4 rounded-full px-6 py-3.5 text-ink shadow-[0_20px_60px_-20px_rgba(180,149,107,0.6)] transition-all group-hover:-translate-y-0.5"
                style={{ backgroundColor: "#E2D1C3" }}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
                  {t("hero.cta.women")}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink/10 transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </div>
        </Link>

        {/* Center divider line on desktop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 lg:block"
          style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.25), transparent)" }}
        />
      </div>

      {/* Brand strip */}
      <div className="relative overflow-hidden bg-paper text-ink">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,75,87,0.35), transparent)" }}
        />
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-16 text-center md:py-20">
          <Logo className="h-10 w-auto text-[#004B57] md:h-12" />
          <div className="mt-4 h-px w-16" style={{ background: "rgba(0,75,87,0.35)" }} />
          <h1 className="mt-6 font-editorial text-3xl leading-[1.05] text-ink md:text-4xl">
            ZENITH <span className="italic text-teal-deep">×</span> CLARITY
          </h1>
          <p className="mt-4 max-w-2xl font-editorial text-lg leading-relaxed text-ink/80 md:text-xl">
            {t("hero.subcopy.line1")} {t("hero.subcopy.line2")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/70">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#004B57]/25 bg-mint/15 px-3 py-1.5 text-teal-deep">
              <span aria-hidden className="inline-grid h-3.5 w-3.5 place-items-center rounded-full bg-mint text-[9px] font-bold text-teal-deep">✓</span>
              {LAB_CERTIFICATIONS.short}
            </span>
            <span className="opacity-30">/</span>
            <span>Independent optical lab tested</span>
            <span className="opacity-30">/</span>
            <span>60-day guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
}
