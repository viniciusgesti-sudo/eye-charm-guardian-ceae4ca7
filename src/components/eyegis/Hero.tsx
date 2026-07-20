import { Link } from "@tanstack/react-router";

import heroDuo from "@/assets/hero-duo-eyegis.jpg?w=768;1280;1920&format=avif;webp;jpg&as=picture";
import { useI18n } from "@/i18n/context";
import { LAB_CERTIFICATIONS } from "@/lib/amazon";

import { Logo } from "./Logo";
import { Picture } from "./Picture";

type Props = { locale: string };

const HERO_ALTS = {
  EN: "Eyegis eyewear campaign — a man in a dark navy square acetate frame and a woman in a champagne cat-eye frame, side by side against a teal-and-champagne studio backdrop.",
  PT: "Campanha Eyegis — um homem com armação quadrada azul-marinho e uma mulher com armação gatinho champanhe, lado a lado sobre fundo de estúdio em teal e champanhe.",
  FR: "Campagne Eyegis — un homme portant une monture carrée bleu marine et une femme portant une monture œil-de-chat champagne, côte à côte sur un fond studio teal et champagne.",
} as const;

export function Hero({ locale }: Props) {
  const { t, lang } = useI18n();
  const alt = HERO_ALTS[lang] ?? HERO_ALTS.EN;

  return (
    <section className="relative w-full bg-ink text-paper">
      {/* Full-bleed unified frame */}
      <div className="relative w-full overflow-hidden">
        <div className="relative aspect-[16/10] w-full min-h-[560px] lg:aspect-auto lg:h-[92vh] lg:min-h-[720px]">
          <Picture
            source={heroDuo}
            alt={alt}
            priority
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover object-[50%_35%]"
          />

          {/* Vignette + bottom fade so copy reads without covering faces or glasses */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_35%,transparent_45%,rgba(0,0,0,0.35)_100%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,rgba(2,12,20,0)_0%,rgba(2,12,20,0.55)_55%,rgba(2,12,20,0.95)_100%)]"
          />

          {/* Top HUD strip */}
          <div className="absolute inset-x-0 top-6 z-10 flex items-center justify-between px-6 md:top-8 md:px-10">
            <div className="flex items-center gap-3 rounded-full bg-ink/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.32em] text-mint/90 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-mint" />
              <span>Zenith · Men</span>
            </div>
            <div className="hidden items-center gap-3 rounded-full bg-paper/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.32em] text-ink/80 backdrop-blur-sm md:flex">
              <span>Clarity · Women</span>
              <span className="h-2 w-2 rounded-full bg-[#B4956B]" />
            </div>
          </div>

          {/* Centered editorial copy — sits below the faces */}
          <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-14 text-center md:pb-20">
            <span className="mx-auto font-mono text-[11px] uppercase tracking-[0.36em] text-mint/90">
              {t("nav.men")} · {t("nav.women")} · One Vision
            </span>
            <h1
              className="mx-auto mt-5 max-w-4xl font-editorial text-[11vw] leading-[0.9] text-paper sm:text-[7.5vw] lg:text-[5vw] xl:text-[80px]"
              style={{ textShadow: "0 2px 28px rgba(0,0,0,0.55)" }}
            >
              ZENITH <span className="italic text-mint">×</span> CLARITY
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-paper/85 md:text-lg">
              {t("hero.zenith.tag")} · {t("hero.clarity.tag")}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/$locale/men"
                params={{ locale }}
                className="group/cta inline-flex items-center gap-5 rounded-full bg-teal-deep px-7 py-4 text-paper shadow-[0_20px_60px_-20px_rgba(0,180,255,0.55)] transition-all hover:-translate-y-0.5 hover:bg-teal"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
                  {t("hero.cta.men")}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-paper/10 transition-transform group-hover/cta:translate-x-1">→</span>
              </Link>
              <Link
                to="/$locale/women"
                params={{ locale }}
                className="group/cta inline-flex items-center gap-5 rounded-full px-7 py-4 text-ink shadow-[0_20px_60px_-20px_rgba(180,149,107,0.55)] transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: "#E2D1C3" }}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
                  {t("hero.cta.women")}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink/10 transition-transform group-hover/cta:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
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
