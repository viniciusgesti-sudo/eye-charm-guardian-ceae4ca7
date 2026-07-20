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
    men: { tag: "Zenith · São Paulo · Nocturne", title: "Engineered", em: "for Vision.", cta: "Shop Men" },
    women: { tag: "Clarity · Paris · Golden Hour", title: "Designed", em: "for Style.", cta: "Shop Women" },
    sub: "Premium eyewear that filters the light of modern life — without ever asking you to compromise the way you look.",
  },
  PT: {
    eyebrow: "O Manifesto Eyegis",
    men: { tag: "Zenith · São Paulo · Noite", title: "Engenharia", em: "para a Visão.", cta: "Ver Masculino" },
    women: { tag: "Clarity · Paris · Hora Dourada", title: "Design", em: "para o Estilo.", cta: "Ver Feminino" },
    sub: "Eyewear premium que filtra a luz da vida moderna — sem nunca pedir que você abra mão do seu estilo.",
  },
  FR: {
    eyebrow: "Le Manifeste Eyegis",
    men: { tag: "Zenith · São Paulo · Nocturne", title: "L'ingénierie", em: "de la vision.", cta: "Homme" },
    women: { tag: "Clarity · Paris · Heure Dorée", title: "Le design", em: "du style.", cta: "Femme" },
    sub: "Une lunetterie premium qui filtre la lumière de la vie moderne — sans compromis sur votre style.",
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
      className="relative isolate w-full overflow-hidden bg-[#0e1418]"
    >
      {/* Split 50/50 — Men (São Paulo nocturne) × Women (Paris golden hour) */}
      <div className="grid h-[100svh] min-h-[720px] w-full grid-cols-1 md:grid-cols-2">
        {/* LEFT — MEN / ZENITH */}
        <Link
          to="/$locale/men"
          params={{ locale }}
          aria-label={alts.men}
          className="group relative block h-full w-full overflow-hidden bg-[#0b1620]"
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
          {/* Teal nocturne wash for cohesion + copy legibility */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(120%_80%_at_30%_40%,rgba(0,75,87,0.25),transparent_60%),linear-gradient(180deg,rgba(10,18,24,0.15)_0%,rgba(10,18,24,0.75)_75%,rgba(10,18,24,0.92)_100%)]"
          />
          <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-10">
            <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.32em] text-[#86D9D1]">
              <span className="inline-block h-px w-8 bg-[#86D9D1]/70" />
              {t.men.tag}
            </div>
            <div>
              <h2 className="font-[Montserrat] text-[clamp(2.25rem,5.5vw,5rem)] font-light leading-[0.95] tracking-[-0.02em] text-white">
                <span className="block">{t.men.title}</span>
                <span className="block italic text-[#86D9D1]">{t.men.em}</span>
              </h2>
              <span className="mt-6 inline-flex items-center gap-3 border-b border-white/40 pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors group-hover:border-[#86D9D1] group-hover:text-[#86D9D1]">
                {t.men.cta}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </div>
        </Link>

        {/* RIGHT — WOMEN / CLARITY */}
        <Link
          to="/$locale/women"
          params={{ locale }}
          aria-label={alts.women}
          className="group relative block h-full w-full overflow-hidden bg-[#231a13]"
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
          {/* Champagne golden-hour wash */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_40%,rgba(226,209,195,0.22),transparent_60%),linear-gradient(180deg,rgba(28,20,14,0.10)_0%,rgba(28,20,14,0.70)_75%,rgba(28,20,14,0.92)_100%)]"
          />
          <div className="relative z-10 flex h-full flex-col justify-between p-6 md:items-end md:p-10 md:text-right">
            <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.32em] text-[#E2D1C3]">
              <span className="inline-block h-px w-8 bg-[#E2D1C3]/70" />
              {t.women.tag}
            </div>
            <div>
              <h2 className="font-[Montserrat] text-[clamp(2.25rem,5.5vw,5rem)] font-light leading-[0.95] tracking-[-0.02em] text-white">
                <span className="block">{t.women.title}</span>
                <span className="block italic text-[#E2D1C3]">{t.women.em}</span>
              </h2>
              <span className="mt-6 inline-flex items-center gap-3 border-b border-white/40 pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors group-hover:border-[#E2D1C3] group-hover:text-[#E2D1C3]">
                {t.women.cta}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Center brand seam + shared subtitle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/25 to-transparent md:block"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-3 px-6 pb-6 text-center md:pb-8">
        <div className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/70">
          {t.eyebrow}
        </div>
        <p className="max-w-xl font-[Lato] text-sm leading-relaxed text-white/75 md:text-[15px]">
          {t.sub}
        </p>
      </div>
    </section>
  );
}
