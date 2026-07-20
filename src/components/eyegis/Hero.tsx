import { Link } from "@tanstack/react-router";

import heroParis from "@/assets/hero-paris-fullbody.jpg?w=768;1280;1920&format=avif;webp;jpg&as=picture";
import { useI18n } from "@/i18n/context";

import { Picture } from "./Picture";

type Props = { locale: string };

const ALT = {
  EN: "Eyegis — a woman standing on a Parisian rooftop at golden hour, Eiffel Tower behind her.",
  PT: "Eyegis — mulher em pé em um terraço parisiense na hora dourada, com a Torre Eiffel ao fundo.",
  FR: "Eyegis — une femme debout sur un toit parisien à l'heure dorée, la Tour Eiffel derrière elle.",
} as const;

const COPY = {
  EN: {
    eyebrow: "The Eyegis Manifesto",
    lineA: "Engineered",
    lineB: "for Vision.",
    lineC: "Designed for Style.",
    sub: "Premium eyewear that filters the light of modern life — without ever asking you to compromise the way you look.",
    ctaPrimary: "Discover the Collection",
    ctaSecondary: "Our Technology",
    scroll: "Scroll",
  },
  PT: {
    eyebrow: "O Manifesto Eyegis",
    lineA: "Engenharia",
    lineB: "para a Visão.",
    lineC: "Design para o Estilo.",
    sub: "Eyewear premium que filtra a luz da vida moderna — sem nunca pedir que você abra mão do seu estilo.",
    ctaPrimary: "Descobrir a Coleção",
    ctaSecondary: "Nossa Tecnologia",
    scroll: "Rolar",
  },
  FR: {
    eyebrow: "Le Manifeste Eyegis",
    lineA: "L'ingénierie",
    lineB: "de la vision.",
    lineC: "Le design du style.",
    sub: "Une lunetterie premium qui filtre la lumière de la vie moderne — sans jamais demander de compromis sur votre style.",
    ctaPrimary: "Découvrir la Collection",
    ctaSecondary: "Notre Technologie",
    scroll: "Défiler",
  },
} as const;

export function Hero({ locale }: Props) {
  const { lang: language } = useI18n();
  const lang = (language as keyof typeof COPY) ?? "EN";
  const t = COPY[lang];
  const alt = ALT[lang];

  return (
    <section
      aria-label="Eyegis manifesto hero"
      className="relative isolate h-[100svh] min-h-[720px] w-full overflow-hidden bg-[#1a1410]"
    >
      {/* Full-bleed editorial image */}
      <Picture
        source={heroParis}
        alt={alt}
        priority
        sizes="100vw"
        width={1536}
        height={1920}
        className="absolute inset-0 h-full w-full object-cover object-[65%_center] motion-safe:animate-[kenburns-right_24s_ease-in-out_infinite_alternate]"
      />


      {/* Cinematic warm-to-dark gradient anchoring copy on the left */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,15,10,0.82)_0%,rgba(20,15,10,0.55)_28%,rgba(20,15,10,0.15)_55%,transparent_78%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(20,15,10,0.7))]"
      />

      {/* Copy column */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-between px-6 py-10 md:px-12 md:py-14">
        {/* Top bar — eyebrow */}
        <div className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.32em] text-[#E2D1C3]/85">
          <span className="inline-block h-px w-10 bg-[#E2D1C3]/60" />
          {t.eyebrow}
        </div>

        {/* Headline block */}
        <div className="max-w-[640px]">
          <h1 className="font-[Montserrat] text-[clamp(2.75rem,7vw,6.25rem)] font-light leading-[0.95] tracking-[-0.02em] text-white">
            <span className="block">{t.lineA}</span>
            <span className="block italic text-[#E2D1C3]">{t.lineB}</span>
            <span className="mt-3 block text-[clamp(1.25rem,2.2vw,1.75rem)] font-light tracking-[0.02em] text-white/85">
              {t.lineC}
            </span>
          </h1>

          <p className="mt-8 max-w-[440px] font-[Lato] text-base leading-relaxed text-white/75 md:text-[17px]">
            {t.sub}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              to="/$locale/women"
              params={{ locale }}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-[#1D252D] transition hover:bg-[#E2D1C3]"
            >
              {t.ctaPrimary}
              <span aria-hidden className="transition group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/$locale/technology"
              params={{ locale }}
              className="inline-flex items-center gap-3 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white/10"
            >
              {t.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Bottom row — scroll cue + brand mark */}
        <div className="flex items-end justify-between gap-6">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.32em] text-white/70">
            <span className="relative block h-10 w-px overflow-hidden bg-white/25">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-white/90 motion-safe:animate-[scrollcue_2.4s_ease-in-out_infinite]" />
            </span>
            {t.scroll}
          </div>
          <div className="hidden text-right font-[Montserrat] text-[10px] uppercase tracking-[0.4em] text-white/60 md:block">
            Paris · Golden Hour · Clarity
          </div>
        </div>
      </div>
    </section>
  );
}
