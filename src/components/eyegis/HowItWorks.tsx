import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

type Copy = {
  eyebrow: string;
  title1: string;
  title2: string;
  steps: { n: string; title: string; body: string }[];
};

const COPY: Record<Lang, Copy> = {
  EN: {
    eyebrow: "Why Eyegis makes a difference",
    title1: "Three things",
    title2: "that make the difference.",
    steps: [
      { n: "01", title: "EyegisGuard™ Technology",  body: "Selective blue-light filtering lenses designed to protect your eyes while preserving true colors and natural contrast." },
      { n: "02", title: "Comfort & Style",           body: "Thoughtfully designed frames combining premium aesthetics with all-day comfort in lightweight TR90." },
      { n: "03", title: "Focus & Performance",       body: "Helps reduce digital eye strain and headaches while supporting healthier sleep." },
    ],
  },
  PT: {
    eyebrow: "Por que a Eyegis faz diferença",
    title1: "Três coisas",
    title2: "que fazem a diferença.",
    steps: [
      { n: "01", title: "Tecnologia EyegisGuard™",   body: "Lentes com filtragem seletiva de luz azul, desenhadas para proteger os olhos preservando cores verdadeiras e contraste natural." },
      { n: "02", title: "Conforto & Estilo",         body: "Armações pensadas para unir estética premium e conforto o dia todo, em TR90 ultraleve." },
      { n: "03", title: "Foco & Performance",        body: "Ajuda a reduzir fadiga visual digital e dores de cabeça, favorecendo um sono mais saudável." },
    ],
  },
  FR: {
    eyebrow: "Pourquoi Eyegis fait la différence",
    title1: "Trois choses",
    title2: "qui font la différence.",
    steps: [
      { n: "01", title: "Technologie EyegisGuard™",  body: "Verres à filtrage sélectif de lumière bleue, conçus pour protéger les yeux tout en préservant les vraies couleurs et le contraste naturel." },
      { n: "02", title: "Confort & Style",           body: "Des montures pensées pour allier esthétique premium et confort toute la journée, en TR90 léger." },
      { n: "03", title: "Focus & Performance",       body: "Aide à réduire la fatigue visuelle numérique et les maux de tête, en soutenant un sommeil plus sain." },
    ],
  },
};

export function HowItWorks() {
  const { lang } = useI18n();
  const c = COPY[lang];

  return (
    <section className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14">
        <div className="mb-16 md:mb-20 max-w-3xl">
          <span className="font-eyebrow text-teal">{c.eyebrow}</span>
          <h2 className="mt-5 font-editorial text-ink leading-[0.95] text-fluid-h1">
            {c.title1}
            <span className="block italic text-teal">{c.title2}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {c.steps.map((s) => (
            <article key={s.n} className="group relative flex flex-col gap-5 border-t border-ink/15 pt-8">
              <div className="flex items-baseline justify-between">
                <span className="font-editorial text-6xl text-ink/55 tabular-nums">{s.n}</span>
                <span className="h-2 w-2 rounded-full bg-teal transition-transform duration-500 group-hover:scale-150" aria-hidden="true" />
              </div>
              <h3 className="font-editorial text-2xl md:text-3xl leading-tight text-ink">{s.title}</h3>
              <p className="text-ink/70 leading-relaxed max-w-sm">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
