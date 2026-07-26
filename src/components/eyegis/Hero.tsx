import { Link } from "@tanstack/react-router";

import heroSaoPaulo from "@/assets/hero-saopaulo-glasses.jpg?w=768;1280;1920&format=avif;webp;jpg&as=picture";
import heroParis from "@/assets/hero-paris-glasses.jpg?w=768;1280;1920&format=avif;webp;jpg&as=picture";
import { useI18n } from "@/i18n/context";

import { Picture } from "./Picture";

type Props = { locale: string };

const ALTS = {
  EN: {
    men: "Eyegis Men's Collection — glossy acetate frame worn in São Paulo's night skyline.",
    women: "Eyegis Women's Collection — tortoise acetate frame in Paris golden hour.",
  },
  PT: {
    men: "Coleção Masculina Eyegis — armação de acetato brilhante, à noite em São Paulo.",
    women: "Coleção Feminina Eyegis — armação de acetato tartaruga, hora dourada em Paris.",
  },
  FR: {
    men: "Collection Homme Eyegis — monture acétate brillant, nuit à São Paulo.",
    women: "Collection Femme Eyegis — monture acétate écaille, heure dorée à Paris.",
  },
} as const;

const COPY = {
  EN: {
    eyebrow: "The Eyegis Manifesto",
    headline: "Eyegis, engineered for vision and designed for style.",
    manifesto: "Eyewear engineered for vision. Designed for the way you live.",
    men: {
      tag: "São Paulo · Night",
      product: "Men's Collection",
      cta: "Enter the Men's Collection",
    },
    women: {
      tag: "Paris · Golden Hour",
      product: "Women's Collection",
      cta: "Enter the Women's Collection",
    },
  },
  PT: {
    eyebrow: "Manifesto Eyegis",
    headline: "Eyegis, engenharia para a visão e design para o estilo.",
    manifesto: "Óculos com engenharia para a visão. Design para o seu jeito de viver.",
    men: {
      tag: "São Paulo · Noite",
      product: "Coleção Masculina",
      cta: "Entrar na Coleção Masculina",
    },
    women: {
      tag: "Paris · Hora Dourada",
      product: "Coleção Feminina",
      cta: "Entrar na Coleção Feminina",
    },
  },
  FR: {
    eyebrow: "Manifeste Eyegis",
    headline: "Eyegis, l'ingénierie de la vision et le design du style.",
    manifesto: "Des lunettes pensées pour la vision. Dessinées pour votre façon de vivre.",
    men: {
      tag: "São Paulo · Nuit",
      product: "Collection Homme",
      cta: "Entrer dans la Collection Homme",
    },
    women: {
      tag: "Paris · Heure Dorée",
      product: "Collection Femme",
      cta: "Entrer dans la Collection Femme",
    },
  },
} as const;



export function Hero({ locale }: Props) {
  const { lang: language } = useI18n();
  const lang = (language as keyof typeof COPY) ?? "EN";
  const t = COPY[lang];
  const alts = ALTS[lang];

  return (
    <section
      aria-label="Eyegis manifesto hero"
      className="relative isolate w-full overflow-hidden bg-ink text-paper"
    >
      <div className="relative z-20 grid min-h-[clamp(300px,36svh,390px)] w-full place-items-center border-b border-paper/10 bg-ink px-5 pt-24 pb-10 text-center sm:px-7 md:min-h-[clamp(330px,34svh,430px)] md:px-10 md:pt-28 md:pb-12">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto flex min-w-0 items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-paper/72 sm:tracking-[0.38em]">
            <span aria-hidden className="h-px w-8 bg-mint/70 sm:w-10" />
            <span className="min-w-0 truncate">{t.eyebrow}</span>
            <span aria-hidden className="h-px w-8 bg-champagne/70 sm:w-10" />
          </div>

          <h1 className="mx-auto mt-5 max-w-[22ch] text-balance font-editorial text-[clamp(2rem,8vw,3.45rem)] font-extralight leading-[1.08] text-paper sm:max-w-[26ch] sm:text-[clamp(2.55rem,5vw,4.35rem)] md:max-w-[28ch]">
            {t.headline}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-balance font-sans text-sm leading-7 text-paper/72 sm:text-base">
            {t.manifesto}
          </p>
        </div>
      </div>

      {/*
        Image panels stay completely clean: no headline, CTA, or metadata sits on
        top of the faces/glasses area. Collection actions live in the band below.
      */}
      <div className="relative grid w-full grid-cols-1 md:grid-cols-2">
        {/* LEFT — MEN */}
        <Link
          to="/$locale/men"
          params={{ locale }}
          aria-label={alts.men}
          className="group relative block h-[48svh] min-h-[390px] w-full overflow-hidden bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-mint sm:min-h-[460px] md:h-[clamp(430px,52svh,620px)] md:min-h-0"
        >
          <Picture
            source={heroSaoPaulo}
            alt={alts.men}
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            width={1280}
            height={1920}
            /* keep the glasses/eyes area in view on both mobile and desktop */
            className="absolute inset-0 h-full w-full object-cover object-[46%_32%] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04] motion-safe:animate-[kenburns-left_28s_ease-in-out_infinite_alternate]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(120%_80%_at_28%_38%,rgba(0,75,87,0.22),transparent_62%),linear-gradient(180deg,rgba(10,18,24,0.16)_0%,rgba(10,18,24,0.28)_62%,rgba(10,18,24,0.54)_100%)]"
          />
        </Link>

        {/* RIGHT — WOMEN */}
        <Link
          to="/$locale/women"
          params={{ locale }}
          aria-label={alts.women}
          className="group relative block h-[48svh] min-h-[390px] w-full overflow-hidden bg-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-champagne sm:min-h-[460px] md:h-[clamp(430px,52svh,620px)] md:min-h-0"
        >
          <Picture
            source={heroParis}
            alt={alts.women}
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            width={1280}
            height={1920}
            className="absolute inset-0 h-full w-full object-cover object-[54%_32%] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04] motion-safe:animate-[kenburns-right_28s_ease-in-out_infinite_alternate]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(120%_80%_at_72%_38%,rgba(226,209,195,0.16),transparent_62%),linear-gradient(180deg,rgba(28,20,14,0.12)_0%,rgba(28,20,14,0.28)_62%,rgba(28,20,14,0.52)_100%)]"
          />
        </Link>

        {/* Seam divisor — scoped to image panels only. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-champagne/25 to-transparent md:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-champagne/20 to-transparent md:hidden"
        />
      </div>

      <div className="relative z-20 grid border-y border-paper/10 bg-ink lg:grid-cols-2">
        <Link
          to="/$locale/men"
          params={{ locale }}
          className="group grid min-h-24 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-paper/10 px-5 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-mint sm:px-8 lg:min-h-28 lg:border-r lg:border-b-0 lg:px-10"
        >
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-3 font-mono text-[10px] uppercase tracking-[0.26em] text-mint sm:tracking-[0.34em]">
              <span className="inline-block h-px w-8 shrink-0 bg-mint/70 sm:w-10" />
              <span className="min-w-0 truncate">{t.men.tag}</span>
            </div>
            <div className="mt-3 flex min-w-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.20em] text-paper/85 sm:tracking-[0.24em]">
              <span aria-hidden className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
              <span className="min-w-0 truncate">{t.men.product}</span>
            </div>
          </div>

          <div className="inline-flex min-h-11 max-w-[42vw] shrink-0 items-center justify-center gap-2 rounded-full bg-paper px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink transition group-hover:bg-mint sm:max-w-none sm:px-6 sm:text-[11px] sm:tracking-[0.18em] xl:tracking-[0.22em]">
            <span className="hidden max-w-[28ch] truncate xl:inline">{t.men.cta}</span>
            <span className="max-w-[16ch] truncate xl:hidden">{t.men.product}</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </Link>

        <Link
          to="/$locale/women"
          params={{ locale }}
          className="group grid min-h-24 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-champagne sm:px-8 lg:min-h-28 lg:px-10"
        >
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-3 font-mono text-[10px] uppercase tracking-[0.26em] text-champagne sm:tracking-[0.34em]">
              <span className="inline-block h-px w-8 shrink-0 bg-champagne/70 sm:w-10" />
              <span className="min-w-0 truncate">{t.women.tag}</span>
            </div>
            <div className="mt-3 flex min-w-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.20em] text-paper/85 sm:tracking-[0.24em]">
              <span aria-hidden className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
              <span className="min-w-0 truncate">{t.women.product}</span>
            </div>
          </div>

          <div className="inline-flex min-h-11 max-w-[42vw] shrink-0 items-center justify-center gap-2 rounded-full bg-paper px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink transition group-hover:bg-champagne sm:max-w-none sm:px-6 sm:text-[11px] sm:tracking-[0.18em] xl:tracking-[0.22em]">
            <span className="hidden max-w-[28ch] truncate xl:inline">{t.women.cta}</span>
            <span className="max-w-[16ch] truncate xl:hidden">{t.women.product}</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </Link>
      </div>

      {/* Mobile scroll cue */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center md:hidden"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.42em] text-paper/55 motion-safe:animate-bounce">
          ↓
        </span>
      </div>

    </section>
  );
}
