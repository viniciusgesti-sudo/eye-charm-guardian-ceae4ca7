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
      className="relative isolate w-full overflow-hidden bg-ink"
    >
      <div className="relative z-20 flex min-h-[32svh] w-full items-end border-b border-paper/10 bg-ink px-5 pt-28 pb-8 text-center sm:px-7 md:min-h-[30svh] md:px-10 md:pt-32 md:pb-10">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mx-auto flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.34em] text-paper/72 sm:tracking-[0.42em]">
            <span aria-hidden className="h-px w-8 bg-mint/70 sm:w-10" />
            <span>{t.eyebrow}</span>
            <span aria-hidden className="h-px w-8 bg-champagne/70 sm:w-10" />
          </div>

          <h1 className="mx-auto mt-5 max-w-[18ch] text-balance font-editorial text-[clamp(2rem,9vw,3.65rem)] font-extralight leading-[0.98] text-paper sm:max-w-[30ch] sm:text-[clamp(2.55rem,5vw,4.5rem)]">
            {t.headline}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-balance font-sans text-sm leading-relaxed text-paper/72 sm:text-base">
            {t.manifesto}
          </p>
        </div>
      </div>

      {/*
        Mobile: two stacked panels kept clean under the editorial headline.
        Desktop: side-by-side image split fills the remaining first viewport.
      */}
      <div className="relative grid w-full grid-cols-1 md:h-[70svh] md:min-h-[560px] md:grid-cols-2">
        {/* LEFT — MEN */}
        <Link
          to="/$locale/men"
          params={{ locale }}
          aria-label={alts.men}
          className="group relative block h-[52svh] min-h-[420px] w-full overflow-hidden bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-mint md:h-full md:min-h-0"
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
          {/* Contrast wash — stronger at the bottom where copy sits */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(120%_80%_at_28%_38%,rgba(0,75,87,0.30),transparent_62%),linear-gradient(180deg,rgba(10,18,24,0.28)_0%,rgba(10,18,24,0.65)_55%,rgba(10,18,24,0.95)_92%,rgba(10,18,24,1)_100%)]"
          />
          {/* Readability scrim behind copy */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[rgba(6,12,18,0.8)] via-[rgba(6,12,18,0.4)] to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black_55%,transparent_100%)]"
          />
          <div className="relative z-10 flex h-full flex-col justify-between px-5 pt-8 pb-14 sm:px-7 sm:pt-10 md:px-12 md:pt-10 md:pb-16">

            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-mint sm:tracking-[0.36em]">
              <span className="inline-block h-px w-8 bg-mint/70 sm:w-10" />
              <span className="truncate">{t.men.tag}</span>
            </div>

            <div className="max-w-[520px] text-center md:text-left mx-auto md:mx-0">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.20em] text-paper/85 sm:tracking-[0.24em] justify-center md:justify-start">
                <span aria-hidden className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                <span className="min-w-0">{t.men.product}</span>
              </div>

              <div className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-paper px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink shadow-[0_20px_50px_-20px_rgba(134,217,209,0.55)] transition group-hover:bg-mint group-hover:text-ink sm:px-7 sm:py-3.5 sm:tracking-[0.24em]">
                {t.men.cta}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>


          </div>
        </Link>

        {/* RIGHT — WOMEN */}
        <Link
          to="/$locale/women"
          params={{ locale }}
          aria-label={alts.women}
          className="group relative block h-[52svh] min-h-[420px] w-full overflow-hidden bg-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-champagne md:h-full md:min-h-0"
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
            className="absolute inset-0 bg-[radial-gradient(120%_80%_at_72%_38%,rgba(226,209,195,0.20),transparent_62%),linear-gradient(180deg,rgba(28,20,14,0.25)_0%,rgba(28,20,14,0.65)_55%,rgba(28,20,14,0.94)_92%,rgba(28,20,14,1)_100%)]"
          />
          {/* Readability scrim behind copy — blurred backdrop for AA contrast on bright imagery */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[rgba(15,10,6,0.75)] via-[rgba(15,10,6,0.35)] to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black_55%,transparent_100%)]"
          />
          <div className="relative z-10 flex h-full flex-col justify-between px-5 pt-8 pb-14 sm:px-7 sm:pt-10 md:items-center md:px-12 md:pt-10 md:pb-16 md:text-center">

            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-champagne sm:tracking-[0.36em]">
              <span className="inline-block h-px w-8 bg-champagne/70 sm:w-10" />
              <span className="truncate">{t.women.tag}</span>
            </div>

            <div className="max-w-[520px] text-center mx-auto">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.20em] text-paper/85 sm:tracking-[0.24em] justify-center">
                <span aria-hidden className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
                <span className="min-w-0">{t.women.product}</span>
              </div>

              <div className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-paper px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink shadow-[0_20px_50px_-20px_rgba(226,209,195,0.6)] transition group-hover:bg-champagne group-hover:text-ink sm:px-7 sm:py-3.5 sm:tracking-[0.24em]">
                {t.women.cta}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>


          </div>
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
