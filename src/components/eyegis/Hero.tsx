import { Link } from "@tanstack/react-router";

import heroSaoPaulo from "@/assets/hero-saopaulo-glasses.jpg?w=768;1280;1920&format=avif;webp;jpg&as=picture";
import heroParis from "@/assets/hero-paris-glasses.jpg?w=768;1280;1920&format=avif;webp;jpg&as=picture";
import { useI18n } from "@/i18n/context";

import { Picture } from "./Picture";

type Props = { locale: string };

const ALTS = {
  EN: {
    men: "Eyegis Zenith — polished titanium eyewear, champagne-tinted lenses catching São Paulo's teal bridge lights at night.",
    women: "Eyegis Clarity — polished gold round eyewear, champagne-tinted lenses catching Parisian golden hour with the Eiffel Tower behind.",
  },
  PT: {
    men: "Eyegis Zenith — armação de titânio polido, lentes champanhe refletindo as luzes teal da ponte de São Paulo à noite.",
    women: "Eyegis Clarity — armação redonda dourada, lentes champanhe refletindo a hora dourada de Paris com a Torre Eiffel ao fundo.",
  },
  FR: {
    men: "Eyegis Zenith — lunettes en titane poli, verres teintés champagne captant les lumières teal du pont de São Paulo la nuit.",
    women: "Eyegis Clarity — lunettes rondes dorées, verres teintés champagne captant l'heure dorée parisienne, Tour Eiffel en arrière-plan.",
  },
} as const;

const COPY = {
  EN: {
    eyebrow: "The Eyegis Manifesto",
    manifesto: "Two cities. Two lights. One promise: eyewear engineered for vision, designed for style.",
    men: {
      tag: "Zenith · São Paulo · Nocturne",
      titleA: "Engineered",
      titleB: "for Vision.",
      product: "Zenith — titanium 6.8g · E-Guard Retina™",
      cta: "Shop Men",
    },
    women: {
      tag: "Clarity · Paris · Golden Hour",
      titleA: "Designed",
      titleB: "for Style.",
      product: "Clarity — gold-tone acetate · E-Guard Circadian™",
      cta: "Shop Women",
    },
  },
  PT: {
    eyebrow: "O Manifesto Eyegis",
    manifesto: "Duas cidades. Duas luzes. Uma promessa: eyewear com engenharia para a visão e design para o estilo.",
    men: {
      tag: "Zenith · São Paulo · Noite",
      titleA: "Engenharia",
      titleB: "para a Visão.",
      product: "Zenith — titânio 6,8g · E-Guard Retina™",
      cta: "Ver Masculino",
    },
    women: {
      tag: "Clarity · Paris · Hora Dourada",
      titleA: "Design",
      titleB: "para o Estilo.",
      product: "Clarity — acetato dourado · E-Guard Circadian™",
      cta: "Ver Feminino",
    },
  },
  FR: {
    eyebrow: "Le Manifeste Eyegis",
    manifesto: "Deux villes. Deux lumières. Une promesse : une lunetterie d'ingénierie et de style.",
    men: {
      tag: "Zenith · São Paulo · Nocturne",
      titleA: "L'ingénierie",
      titleB: "de la vision.",
      product: "Zenith — titane 6,8g · E-Guard Retina™",
      cta: "Homme",
    },
    women: {
      tag: "Clarity · Paris · Heure Dorée",
      titleA: "Le design",
      titleB: "du style.",
      product: "Clarity — acétate doré · E-Guard Circadian™",
      cta: "Femme",
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
      <div className="grid h-[100svh] min-h-[760px] w-full grid-cols-1 md:grid-cols-2">
        {/* LEFT — MEN / ZENITH */}
        <Link
          to="/$locale/men"
          params={{ locale }}
          aria-label={alts.men}
          className="group relative block h-full w-full overflow-hidden bg-[#0b1620] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-mint"
        >
          <Picture
            source={heroSaoPaulo}
            alt={alts.men}
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            width={1280}
            height={1920}
            className="absolute inset-0 h-full w-full object-cover object-[42%_35%] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04] motion-safe:animate-[kenburns-left_28s_ease-in-out_infinite_alternate]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(120%_80%_at_28%_38%,rgba(0,75,87,0.28),transparent_62%),linear-gradient(180deg,rgba(10,18,24,0.15)_0%,rgba(10,18,24,0.78)_78%,rgba(10,18,24,0.95)_100%)]"
          />
          <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-12">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.36em] text-mint">
              <span className="inline-block h-px w-10 bg-mint/70" />
              {t.men.tag}
            </div>

            <div className="max-w-[520px]">
              <h2 className="font-editorial text-[clamp(2.75rem,6vw,5.75rem)] font-light leading-[0.92] tracking-[-0.02em] text-paper">
                <span className="block">{t.men.titleA}</span>
                <span className="block italic text-mint">{t.men.titleB}</span>
              </h2>

              <div className="mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-paper/70">
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-mint" />
                {t.men.product}
              </div>

              <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-paper px-7 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-ink shadow-[0_20px_50px_-20px_rgba(134,217,209,0.55)] transition group-hover:bg-mint group-hover:text-ink">
                {t.men.cta}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          </div>
        </Link>

        {/* RIGHT — WOMEN / CLARITY */}
        <Link
          to="/$locale/women"
          params={{ locale }}
          aria-label={alts.women}
          className="group relative block h-full w-full overflow-hidden bg-[#231a13] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-champagne"
        >
          <Picture
            source={heroParis}
            alt={alts.women}
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            width={1280}
            height={1920}
            className="absolute inset-0 h-full w-full object-cover object-[58%_35%] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04] motion-safe:animate-[kenburns-right_28s_ease-in-out_infinite_alternate]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(120%_80%_at_72%_38%,rgba(226,209,195,0.24),transparent_62%),linear-gradient(180deg,rgba(28,20,14,0.10)_0%,rgba(28,20,14,0.75)_78%,rgba(28,20,14,0.95)_100%)]"
          />
          <div className="relative z-10 flex h-full flex-col justify-between p-6 md:items-end md:p-12 md:text-right">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.36em] text-champagne">
              <span className="inline-block h-px w-10 bg-champagne/70" />
              {t.women.tag}
            </div>

            <div className="max-w-[520px]">
              <h2 className="font-editorial text-[clamp(2.75rem,6vw,5.75rem)] font-light leading-[0.92] tracking-[-0.02em] text-paper">
                <span className="block">{t.women.titleA}</span>
                <span className="block italic text-champagne">{t.women.titleB}</span>
              </h2>

              <div className="mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-paper/70 md:justify-end">
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-champagne" />
                {t.women.product}
              </div>

              <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-paper px-7 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-ink shadow-[0_20px_50px_-20px_rgba(226,209,195,0.6)] transition group-hover:bg-champagne group-hover:text-ink">
                {t.women.cta}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Center seam with monogram medallion */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-paper/25 to-transparent md:block"
      />

      {/* Bottom manifesto strip */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-2 px-6 pb-6 text-center md:pb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.42em] text-paper/70">
          {t.eyebrow}
        </div>
        <p className="max-w-xl font-sans text-sm leading-relaxed text-paper/75 md:text-[15px]">
          {t.manifesto}
        </p>
      </div>
    </section>
  );
}
