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
    manifesto: "Eyewear engineered for vision. Designed for the way you live.",
    titleA: "Engineered for Vision.",
    titleB: "Designed for Style.",
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
    manifesto: "Óculos com engenharia para a visão. Design para o seu jeito de viver.",
    titleA: "Engenharia para a Visão.",
    titleB: "Design para o Estilo.",
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
    manifesto: "Des lunettes pensées pour la vision. Dessinées pour votre façon de vivre.",
    titleA: "L'ingénierie de la vision.",
    titleB: "Le design du style.",
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
      {/* Single, page-level H1 for SEO / a11y; visually hidden — the split panels
          use H2s for the men/women collections. */}
      <h1 className="sr-only">{t.manifesto}</h1>
      {/*
        Mobile: two stacked panels, each ~70svh so both faces and glasses stay
        in frame without forcing a 200svh scroll.
        Desktop: side-by-side 100svh split with a subtle seam.
      */}
      <div className="grid w-full grid-cols-1 md:grid-cols-2 md:h-[100svh] md:min-h-[720px]">
        {/* LEFT — MEN */}
        <Link
          to="/$locale/men"
          params={{ locale }}
          aria-label={alts.men}
          className="group relative block h-[58svh] min-h-[460px] w-full overflow-hidden bg-[#0b1620] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-mint md:h-full md:min-h-0"
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
          <div className="relative z-10 flex h-full flex-col justify-between px-5 pt-24 pb-14 sm:px-7 sm:pt-28 md:px-12 md:pt-32 md:pb-16">

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
          className="group relative block h-[58svh] min-h-[460px] w-full overflow-hidden bg-[#231a13] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-champagne md:h-full md:min-h-0"
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
          <div className="relative z-10 flex h-full flex-col justify-between px-5 pt-24 pb-14 sm:px-7 sm:pt-28 md:items-center md:px-12 md:pt-32 md:pb-16 md:text-center">

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
      </div>

      {/* Centered unified headline — positioned in the upper safe area so it never
          crosses the models' faces (which sit around the vertical mid-line). */}
      <div className="pointer-events-none absolute inset-x-0 top-20 z-20 flex flex-col items-center px-6 text-center sm:top-24 md:top-[14svh]">
        <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.38em] text-paper/70 sm:text-[10px] sm:tracking-[0.42em] md:mb-4">
          {t.eyebrow}
        </div>
        <h2 className="mx-auto max-w-[18ch] font-editorial font-extralight leading-[1.1] tracking-[-0.02em] text-paper text-balance [text-shadow:0_2px_28px_rgba(0,0,0,0.55)] text-[clamp(1.5rem,7vw,3.75rem)] sm:max-w-[24ch] sm:leading-[1.05]">
          <span className="block italic text-champagne sm:inline">
            {t.titleA.replace(/\.$/, "")}
          </span>
          <span
            aria-hidden
            className="mx-3 hidden align-middle text-paper/45 sm:inline-block"
          >
            ·
          </span>
          <span className="block italic text-mint sm:inline">
            {t.titleB.replace(/\.$/, "")}
          </span>
        </h2>
        <span aria-hidden className="mt-4 block h-px w-12 bg-paper/40 sm:mt-5 sm:w-16 md:w-24" />
      </div>




      {/* Seam divisor — vertical on desktop, horizontal on mobile between stacked panels */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-champagne/25 to-transparent md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-champagne/20 to-transparent md:hidden"
      />

      {/* Mobile scroll cue — encourages exploration past the split hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center md:hidden"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.42em] text-paper/55 motion-safe:animate-bounce">
          ↓
        </span>
      </div>

      {/* Bottom manifesto strip — only rendered on md+ so it never overlaps
          the stacked-panel CTAs on mobile. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden flex-col items-center gap-2 px-6 pb-6 text-center md:flex md:pb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.42em] text-paper/70">
          {t.eyebrow}
        </div>
        <p className="max-w-xl font-sans text-sm leading-relaxed text-paper/80 md:text-[15px]">
          {t.manifesto}
        </p>
      </div>
    </section>
  );
}
