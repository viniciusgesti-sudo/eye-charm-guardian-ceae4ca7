import { Link } from "@tanstack/react-router";

import heroZenith from "@/assets/hero-zenith-man.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import heroClarity from "@/assets/hero-clarity-woman.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import { useI18n } from "@/i18n/context";
import { LAB_CERTIFICATIONS } from "@/lib/amazon";

import { Logo } from "./Logo";
import { Picture } from "./Picture";

type Props = { locale: string };

const HERO_ALTS = {
  EN: {
    zenith: "Eyegis Zenith men's blue-light glasses — dark TR90 frame photographed on a São Paulo skyline at night, showing anti-glare coating and neutral color fidelity.",
    clarity: "Eyegis Clarity women's blue-light glasses — champagne acetate frame photographed in Paris at golden hour, showing lightweight design and true-tone lenses.",
  },
  PT: {
    zenith: "Óculos com filtro de luz azul Eyegis Zenith masculino — armação TR90 escura fotografada em frente ao skyline de São Paulo à noite, destacando o revestimento antirreflexo e a fidelidade natural das cores.",
    clarity: "Óculos com filtro de luz azul Eyegis Clarity feminino — armação de acetato champanhe fotografada em Paris na hora dourada, destacando o design leve e as lentes de tons reais.",
  },
  FR: {
    zenith: "Lunettes anti-lumière bleue Eyegis Zenith pour homme — monture TR90 sombre photographiée devant le skyline de São Paulo la nuit, mettant en avant le traitement antireflet et la fidélité chromatique.",
    clarity: "Lunettes anti-lumière bleue Eyegis Clarity pour femme — monture en acétate champagne photographiée à Paris à l'heure dorée, mettant en avant le design léger et les verres à tons naturels.",
  },
} as const;

export function Hero({ locale }: Props) {
  const { t, lang } = useI18n();
  const alts = HERO_ALTS[lang] ?? HERO_ALTS.EN;
  return (
    <section className="relative w-full bg-ink text-paper">
      <div className="relative flex min-h-[760px] w-full flex-col lg:h-[94vh] lg:min-h-[820px] lg:flex-row">
        {/* Zenith · Men */}
        <div className="group relative w-full overflow-hidden lg:w-1/2">
          <Picture
            source={heroZenith}
            alt={alts.zenith}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover object-[52%_28%] transition-transform duration-[1600ms] ease-out group-hover:scale-[1.03]"
          />
          {/* Bottom-anchored gradient — keeps face fully visible, only fades where copy sits */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-[linear-gradient(180deg,rgba(2,12,20,0)_0%,rgba(2,12,20,0.55)_45%,rgba(2,12,20,0.92)_100%)]" />
          <div data-testid="hero-hud" data-hud="left" className="absolute left-6 top-24 md:left-10 md:top-28 z-10 flex items-center gap-3 rounded-full bg-ink/35 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.32em] text-mint/90 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-mint" />
            <span>SP · 23:47 · Night Grid</span>
          </div>
          <div className="relative z-10 mx-auto flex h-full min-h-[560px] max-w-xl flex-col justify-end px-6 pb-14 md:px-10 md:pb-16">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-mint/90">
              {t("nav.men")} · Zenith Universe
            </span>
            <h1
              className="mt-4 font-editorial text-[13vw] leading-[0.88] text-paper sm:text-[9vw] lg:text-[4.6vw] xl:text-[72px]"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
            >
              ZENITH<br />
              <span className="italic text-mint">LENS</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-paper/85 md:text-lg">
              {t("hero.zenith.tag")}
            </p>
            <div className="mt-8">
              <Link
                to="/$locale/men"
                params={{ locale }}
                className="group/cta inline-flex items-center gap-5 rounded-full bg-teal-deep px-7 py-4 text-paper shadow-[0_20px_60px_-20px_rgba(0,180,255,0.55)] transition-all hover:-translate-y-0.5 hover:bg-teal"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
                  {t("hero.cta.men")}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-paper/10 transition-transform group-hover/cta:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Clarity · Women */}
        <div className="group relative w-full overflow-hidden lg:w-1/2">
          <Picture
            source={heroClarity}
            alt={alts.clarity}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover object-[50%_32%] transition-transform duration-[1600ms] ease-out group-hover:scale-[1.03]"
          />
          {/* Bottom-anchored warm fade — image reads clean up top */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-[linear-gradient(180deg,rgba(226,209,195,0)_0%,rgba(226,209,195,0.55)_50%,rgba(226,209,195,0.92)_100%)]" />
          <div data-testid="hero-hud" data-hud="right" className="absolute right-6 top-24 md:right-10 md:top-28 z-10 flex items-center gap-3 rounded-full bg-paper/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.32em] text-ink/75 backdrop-blur-sm">
            <span>Golden Hour · Paris</span>
            <span className="h-2 w-2 rounded-full bg-[#B4956B]" />
          </div>
          <div className="relative z-10 mx-auto flex h-full min-h-[560px] max-w-xl flex-col justify-end px-6 pb-14 text-ink md:px-10 md:pb-16 lg:items-end lg:text-right">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-teal-deep/80">
              {t("nav.women")} · Clarity Universe
            </span>
            <h2
              className="mt-4 font-editorial text-[13vw] leading-[0.88] text-ink sm:text-[9vw] lg:text-[4.6vw] xl:text-[72px]"
              style={{ textShadow: "0 2px 24px rgba(255,255,255,0.45)" }}
            >
              CLARITY<br />
              <span className="italic text-teal-deep">LENS</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink/80 md:text-lg">
              {t("hero.clarity.tag")}
            </p>
            <div className="mt-8">
              <Link
                to="/$locale/women"
                params={{ locale }}
                className="group/cta inline-flex items-center gap-5 rounded-full px-7 py-4 text-ink shadow-[0_20px_60px_-20px_rgba(180,149,107,0.55)] transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: "#E2D1C3" }}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
                  {t("hero.cta.women")}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink/10 transition-transform group-hover/cta:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Thin vertical divider only — no heavy diagonal wash covering the images */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-paper/50 to-transparent lg:block"
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
          <p className="mt-6 max-w-2xl font-editorial text-lg leading-relaxed text-ink/80 md:text-xl">
            {t("hero.subcopy.line1")} {t("hero.subcopy.line2")}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              to="/$locale/women"
              params={{ locale }}
              className="group inline-flex items-center gap-4 rounded-full px-7 py-4 text-ink shadow-[0_20px_50px_-20px_rgba(180,149,107,0.55)] transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: "#E2D1C3" }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
                {t("hero.cta.women")}
              </span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink/10 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              to="/$locale/men"
              params={{ locale }}
              className="group inline-flex items-center gap-4 rounded-full px-7 py-4 text-paper shadow-[0_20px_50px_-20px_rgba(0,75,87,0.55)] transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: "#004B57" }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
                {t("hero.cta.men")}
              </span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-paper/15 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
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
