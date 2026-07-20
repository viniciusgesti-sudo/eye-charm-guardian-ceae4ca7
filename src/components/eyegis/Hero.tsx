import { Link } from "@tanstack/react-router";

import heroSaoPaulo from "@/assets/hero-saopaulo-eyegis.jpg?w=768;1280;1920&format=avif;webp;jpg&as=picture";
import heroParis from "@/assets/hero-paris-eyegis.jpg?w=768;1280;1920&format=avif;webp;jpg&as=picture";
import { useI18n } from "@/i18n/context";

import { Picture } from "./Picture";

type Props = { locale: string };

const ALTS = {
  EN: {
    men: "Eyegis — a man at night in São Paulo, deep teal reflections, Octávio Frias bridge behind him.",
    women: "Eyegis — a woman in Paris at golden hour, Eiffel Tower silhouette in the background.",
  },
  PT: {
    men: "Eyegis — homem à noite em São Paulo, reflexos teal profundos, ponte Octávio Frias ao fundo.",
    women: "Eyegis — mulher em Paris na hora dourada, silhueta da Torre Eiffel ao fundo.",
  },
  FR: {
    men: "Eyegis — un homme la nuit à São Paulo, reflets teal profonds, pont Octávio Frias en arrière-plan.",
    women: "Eyegis — une femme à Paris à l'heure dorée, silhouette de la Tour Eiffel en arrière-plan.",
  },
} as const;

// Diagonal seam — top-left to bottom-right split between the two universes.
const CLIP_LEFT = "polygon(0 0, 62% 0, 38% 100%, 0 100%)";
const CLIP_RIGHT = "polygon(62% 0, 100% 0, 100% 100%, 38% 100%)";

export function Hero({ locale }: Props) {
  const { t, lang } = useI18n();
  const alts = ALTS[lang] ?? ALTS.EN;

  return (
    <section className="relative w-full overflow-hidden bg-ink text-paper">
      {/* Full viewport diagonal split */}
      <div className="relative h-[100svh] min-h-[640px] w-full">
        {/* Desktop diagonal panels */}
        <div className="absolute inset-0 hidden lg:block">
          {/* LEFT — São Paulo (teal / night) */}
          <div className="absolute inset-0" style={{ clipPath: CLIP_LEFT }}>
            <Picture
              source={heroSaoPaulo}
              alt={alts.men}
              priority
              sizes="100vw"
              className="hero-kenburns absolute inset-0 h-full w-full object-cover object-[50%_35%]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(6,20,36,0.15) 0%, rgba(3,14,26,0.55) 60%, rgba(2,10,20,0.9) 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-multiply"
              style={{ background: "linear-gradient(135deg, rgba(0,30,36,0.35), transparent 55%)" }}
            />
          </div>

          {/* RIGHT — Paris (champagne / golden) */}
          <div className="absolute inset-0" style={{ clipPath: CLIP_RIGHT }}>
            <Picture
              source={heroParis}
              alt={alts.women}
              priority
              sizes="100vw"
              className="hero-kenburns absolute inset-0 h-full w-full object-cover object-[50%_35%]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,240,220,0.1) 0%, rgba(226,209,195,0.35) 55%, rgba(80,55,35,0.55) 100%)",
              }}
            />
          </div>

          {/* Diagonal seam highlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, transparent calc(50% - 1px), rgba(255,255,255,0.35) 50%, transparent calc(50% + 1px))",
              mixBlendMode: "screen",
            }}
          />
        </div>

        {/* Mobile stack — São Paulo first, Paris second */}
        <div className="absolute inset-0 grid grid-rows-2 lg:hidden">
          <div className="relative overflow-hidden">
            <Picture
              source={heroSaoPaulo}
              alt={alts.men}
              priority
              sizes="100vw"
              className="hero-kenburns absolute inset-0 h-full w-full object-cover object-[50%_30%]"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(2,10,20,0.1), rgba(2,10,20,0.85))" }}
            />
          </div>
          <div className="relative overflow-hidden">
            <Picture
              source={heroParis}
              alt={alts.women}
              priority
              sizes="100vw"
              className="hero-kenburns absolute inset-0 h-full w-full object-cover object-[50%_35%]"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(226,209,195,0.2), rgba(80,55,35,0.75))" }}
            />
          </div>
        </div>

        {/* Editorial sliced typography */}
        <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-0">
            {/* LEFT stanza */}
            <div className="hero-rise lg:pr-16">
              <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-mint/90">
                São Paulo · {t("nav.men")}
              </span>
              <h1
                className="mt-5 font-editorial text-[13vw] leading-[0.9] text-paper sm:text-[9vw] lg:text-[6.4vw] xl:text-[92px]"
                style={{ textShadow: "0 2px 28px rgba(0,0,0,0.55)" }}
              >
                Engineered
                <br />
                <span className="italic text-mint">for Vision.</span>
              </h1>
            </div>

            {/* RIGHT stanza */}
            <div className="hero-rise lg:pl-16 lg:text-right" style={{ animationDelay: "220ms" }}>
              <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-paper/80 lg:text-teal-deep">
                Paris · {t("nav.women")}
              </span>
              <h1
                className="mt-5 font-editorial text-[13vw] leading-[0.9] text-paper sm:text-[9vw] lg:text-[6.4vw] xl:text-[92px] lg:text-ink"
                style={{ textShadow: "0 2px 28px rgba(0,0,0,0.35)" }}
              >
                Designed
                <br />
                <span className="italic lg:text-teal-deep">for Style.</span>
              </h1>
            </div>
          </div>

          {/* Supporting copy + CTAs */}
          <div className="hero-rise mt-10 grid gap-8 lg:mt-14 lg:grid-cols-2" style={{ animationDelay: "440ms" }}>
            <div className="pointer-events-auto lg:pr-16">
              <p className="max-w-md text-sm leading-relaxed text-paper/85 md:text-base">
                {t("hero.zenith.tag")}
              </p>
              <Link
                to="/$locale/men"
                params={{ locale }}
                className="mt-6 inline-flex items-center gap-5 rounded-full bg-teal-deep px-7 py-4 text-paper shadow-[0_20px_60px_-20px_rgba(0,180,255,0.55)] transition-all hover:-translate-y-0.5 hover:bg-teal"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
                  {t("hero.cta.men")}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-paper/10 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <div className="pointer-events-auto lg:pl-16 lg:text-right">
              <p className="ml-auto max-w-md text-sm leading-relaxed text-paper/90 md:text-base lg:text-ink/75">
                {t("hero.clarity.tag")}
              </p>
              <Link
                to="/$locale/women"
                params={{ locale }}
                className="mt-6 inline-flex items-center gap-5 rounded-full px-7 py-4 text-ink shadow-[0_20px_60px_-20px_rgba(180,149,107,0.55)] transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: "#E2D1C3" }}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
                  {t("hero.cta.women")}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink/10 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Minimal scroll indicator */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-paper/70">Scroll</span>
          <span className="relative block h-10 w-px overflow-hidden bg-paper/25">
            <span className="hero-scroll-line absolute inset-x-0 top-0 h-1/2 bg-paper" />
          </span>
        </div>
      </div>
    </section>
  );
}
