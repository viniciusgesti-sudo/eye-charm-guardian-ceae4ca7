import { Link } from "@tanstack/react-router";

import heroSaoPaulo from "@/assets/hero-saopaulo-glasses.jpg?w=768;1280;1920&format=avif;webp;jpg&as=picture";
import heroParis from "@/assets/hero-paris-glasses.jpg?w=768;1280;1920&format=avif;webp;jpg&as=picture";
import { useI18n } from "@/i18n/context";
import { useCms } from "@/lib/cms";

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
      cta: "View Collection",
    },
    women: {
      tag: "Paris · Golden Hour",
      product: "Women's Collection",
      cta: "View Collection",
    },
  },
  PT: {
    eyebrow: "Manifesto Eyegis",
    headline: "Eyegis, engenharia para a visão e design para o estilo.",
    manifesto: "Óculos com engenharia para a visão. Design para o seu jeito de viver.",
    men: {
      tag: "São Paulo · Noite",
      product: "Coleção Masculina",
      cta: "Ver coleção",
    },
    women: {
      tag: "Paris · Hora Dourada",
      product: "Coleção Feminina",
      cta: "Ver coleção",
    },
  },
  FR: {
    eyebrow: "Manifeste Eyegis",
    headline: "Eyegis, l'ingénierie de la vision et le design du style.",
    manifesto: "Des lunettes pensées pour la vision. Dessinées pour votre façon de vivre.",
    men: {
      tag: "São Paulo · Nuit",
      product: "Collection Homme",
      cta: "Voir la collection",
    },
    women: {
      tag: "Paris · Heure Dorée",
      product: "Collection Femme",
      cta: "Voir la collection",
    },
  },
} as const;



export function Hero({ locale }: Props) {
  const { lang: language } = useI18n();
  const lang = (language as keyof typeof COPY) ?? "EN";
  const t = COPY[lang];
  const alts = ALTS[lang];

  // CMS overrides (Wix) — silently fall back to the locale COPY above.
  const cmsCenter = useCms("home.hero.center");
  const cmsMen = useCms("home.hero.men");
  const cmsWomen = useCms("home.hero.women");
  const headline = cmsCenter.text ?? t.headline;

  const menTag = cmsMen.text ?? t.men.tag;
  const menProduct = cmsMen.title ?? t.men.product;
  const menCta = cmsMen.buttonText ?? t.men.cta;
  const menAlt = cmsMen.image?.alt ?? alts.men;
  const womenTag = cmsWomen.text ?? t.women.tag;
  const womenProduct = cmsWomen.title ?? t.women.product;
  const womenCta = cmsWomen.buttonText ?? t.women.cta;
  const womenAlt = cmsWomen.image?.alt ?? alts.women;

  return (
    <section
      aria-label="Eyegis manifesto hero"
      className="relative isolate min-h-[76svh] w-full overflow-hidden bg-ink text-paper lg:min-h-[min(64svh,500px)]"
    >
      <div className="relative grid min-h-[76svh] w-full grid-cols-1 md:grid-cols-2 lg:min-h-[min(64svh,500px)]">
        {/* LEFT — MEN */}
        <Link
          to="/$locale/men"
          params={{ locale }}
          aria-label={menAlt}
          className="group relative block min-h-[42svh] w-full overflow-hidden bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-mint md:min-h-[76svh] lg:min-h-[min(64svh,500px)]"
        >
          <Picture
            source={heroSaoPaulo}
            alt={menAlt}
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            width={1280}
            height={1920}
            /* keep the glasses/eyes area in view on both mobile and desktop */
            className="absolute inset-0 h-full w-full object-cover object-[47%_34%] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04] motion-safe:animate-[kenburns-left_28s_ease-in-out_infinite_alternate] lg:object-[47%_42%]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(110%_68%_at_44%_36%,transparent_0%,rgba(0,75,87,0.10)_58%,rgba(6,12,18,0.66)_100%),linear-gradient(180deg,rgba(6,12,18,0.34)_0%,rgba(6,12,18,0.04)_28%,rgba(6,12,18,0.10)_52%,rgba(6,12,18,0.78)_100%)]"
          />
          <div className="absolute inset-x-0 bottom-0 z-10 p-5 pt-28 sm:p-7 sm:pt-32 md:p-10 lg:p-12">
            <div className="max-w-[500px]">
              <div className="flex min-w-0 items-center gap-3 font-mono text-[10px] uppercase tracking-[0.26em] text-mint sm:tracking-[0.34em]">
                <span className="inline-block h-px w-8 shrink-0 bg-mint/70 sm:w-10" />
                <span className="min-w-0 truncate">{menTag}</span>
              </div>
              <div className="mt-4 flex min-w-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.20em] text-paper/85 sm:tracking-[0.24em]">
                <span aria-hidden className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                <span className="min-w-0 truncate">{menProduct}</span>
              </div>
              <div className="mt-5 inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-paper px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink transition group-hover:bg-mint sm:px-6 sm:text-[11px] sm:tracking-[0.20em]">
                <span className="whitespace-nowrap">{menCta}</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Top contrast scrim — guarantees readable text without touching faces/glasses */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[42svh] bg-gradient-to-b from-[rgba(6,12,18,0.85)] via-[rgba(6,12,18,0.45)] to-transparent md:h-[38vh] lg:h-[30vh]"
        />

        {/* HEADLINE — top safe zone, above eye-line, over dark sky scrim */}
        <div className="pointer-events-none absolute inset-x-0 top-20 z-20 px-5 text-center sm:top-24 sm:px-7 md:top-24 md:px-10 lg:top-20">
          <div className="mx-auto w-full max-w-5xl">
            <h1 className="mx-auto max-w-[20ch] text-balance font-editorial text-[clamp(1.375rem,5vw,1.875rem)] font-extralight leading-[1.1] text-paper [text-shadow:0_2px_24px_rgba(0,0,0,0.65)] sm:max-w-[26ch] md:max-w-[30ch] md:text-[clamp(1.5rem,2.4vw,2.125rem)] md:leading-[1.08] lg:text-[clamp(1.625rem,1.9vw,2.25rem)]">
              {headline}
            </h1>
          </div>
        </div>




        {/* RIGHT — WOMEN */}
        <Link
          to="/$locale/women"
          params={{ locale }}
          aria-label={womenAlt}
          className="group relative block min-h-[42svh] w-full overflow-hidden bg-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-champagne md:min-h-[76svh] lg:min-h-[min(64svh,500px)]"
        >
          <Picture
            source={heroParis}
            alt={womenAlt}
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            width={1280}
            height={1920}
            className="absolute inset-0 h-full w-full object-cover object-[53%_34%] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04] motion-safe:animate-[kenburns-right_28s_ease-in-out_infinite_alternate] lg:object-[53%_42%]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(110%_68%_at_55%_36%,transparent_0%,rgba(226,209,195,0.06)_58%,rgba(20,12,8,0.58)_100%),linear-gradient(180deg,rgba(20,12,8,0.22)_0%,rgba(20,12,8,0.02)_28%,rgba(20,12,8,0.10)_52%,rgba(20,12,8,0.74)_100%)]"
          />
          <div className="absolute inset-x-0 bottom-0 z-10 p-5 pt-24 sm:p-7 sm:pt-28 md:p-10 lg:p-12">
            <div className="ml-auto max-w-[500px] text-left md:text-right">
              <div className="flex min-w-0 items-center gap-3 font-mono text-[10px] uppercase tracking-[0.26em] text-champagne sm:tracking-[0.34em] md:justify-end">
                <span className="inline-block h-px w-8 shrink-0 bg-champagne/70 sm:w-10 md:order-2" />
                <span className="min-w-0 truncate">{womenTag}</span>
              </div>
              <div className="mt-4 flex min-w-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.20em] text-paper/85 sm:tracking-[0.24em] md:justify-end">
                <span aria-hidden className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
                <span className="min-w-0 truncate">{womenProduct}</span>
              </div>
              <div className="mt-5 inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-paper px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink transition group-hover:bg-champagne sm:px-6 sm:text-[11px] sm:tracking-[0.20em]">
                <span className="whitespace-nowrap">{womenCta}</span>
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
