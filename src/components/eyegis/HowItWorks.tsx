import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

import { Logo } from "./Logo";

type Copy = {
  title1: string;
  title2: string;
  steps: { n: string; title: string; body: string }[];
};

const COPY: Record<Lang, Copy> = {
  EN: {
    title1: "The Eyegis",
    title2: "Difference.",
    steps: [
      { n: "01", title: "EyegisGuard™ Technology", body: "Selective blue light filtering that preserves true colors and natural contrast." },
      { n: "02", title: "Style & Comfort",         body: "Premium polymer frames engineered for lightweight comfort and timeless style, designed to be worn all day." },
      { n: "03", title: "Designed for Digital Life", body: "Helps reduce digital eye strain and headaches while supporting healthier sleep." },
    ],
  },
  PT: {
    title1: "A diferença",
    title2: "Eyegis.",
    steps: [
      { n: "01", title: "Tecnologia EyegisGuard™", body: "Filtragem seletiva de luz azul que preserva as cores reais e o contraste natural." },
      { n: "02", title: "Estilo e conforto",       body: "Armações em polímeros premium, projetadas para conforto leve e estilo atemporal, feitas para usar o dia inteiro." },
      { n: "03", title: "Feito para a vida digital", body: "Ajuda a reduzir o cansaço visual digital e as dores de cabeça, favorecendo um sono mais saudável." },
    ],
  },
  FR: {
    title1: "La différence",
    title2: "Eyegis.",
    steps: [
      { n: "01", title: "Technologie EyegisGuard™", body: "Filtrage sélectif de la lumière bleue qui préserve les couleurs réelles et le contraste naturel." },
      { n: "02", title: "Style et confort",         body: "Montures en polymères premium, conçues pour un confort léger et un style intemporel, à porter toute la journée." },
      { n: "03", title: "Pensé pour la vie numérique", body: "Aide à réduire la fatigue visuelle numérique et les maux de tête, tout en favorisant un sommeil plus sain." },
    ],
  },
};


export function HowItWorks() {
  const { lang } = useI18n();
  const c = COPY[lang];

  return (
    <section className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14">
        <div className="mb-14 md:mb-20 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl">
            <h2 className="font-editorial text-ink leading-[0.95] text-fluid-h1">
              {c.title1}
              <span className="block italic text-teal">{c.title2}</span>
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-3 font-eyebrow text-[10px] text-ink/50">
            <span className="h-px w-16 bg-ink/25" aria-hidden />
            <span>§ 01 — 03</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-12 md:gap-y-0">
          {c.steps.map((s, i) => (
            <article
              key={s.n}
              className={`group relative flex flex-col gap-5 pt-8 border-t border-ink/15 ${
                i > 0 ? "md:border-l md:border-t-0 md:pt-0 md:pl-10" : ""
              }`}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-editorial text-6xl md:text-7xl font-light text-ink/70 tabular-nums leading-none">
                  {s.n}
                </span>
                <span
                  className="h-1.5 w-1.5 rounded-full bg-teal transition-transform duration-500 group-hover:scale-[2]"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-editorial text-2xl md:text-[1.75rem] leading-[1.15] text-ink">
                {s.title}
              </h3>
              <p className="text-ink/70 leading-relaxed max-w-sm text-[15px]">{s.body}</p>
              {i === 0 && (
                <Logo className="mt-1 h-6 w-auto" tone="dark" showWordmark={false} />
              )}

            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

