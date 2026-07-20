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
    eyebrow: "Honest Science™ · Engineered for vision",
    title1: "Three principles,",
    title2: "no marketing myths.",
    steps: [
      { n: "01", title: "Selective filtering, not tinted glass", body: "E-Guard Retina™ and E-Guard Circadian™ lenses target the specific wavelengths involved in digital eye strain — while letting through the light your eyes need to see colors as they are." },
      { n: "02", title: "Designed to be worn all day",           body: "Lightweight TR90 frames, balanced hinges and clean silhouettes — made to disappear on your face and belong in your wardrobe." },
      { n: "03", title: "Comfort you can feel",                  body: "Less visual fatigue during screen time, softer transitions into the evening — supported by peer-reviewed optical principles, not overpromises." },
    ],
  },
  PT: {
    eyebrow: "Honest Science™ · Engenharia para a visão",
    title1: "Três princípios,",
    title2: "sem mitos de marketing.",
    steps: [
      { n: "01", title: "Filtragem seletiva, não lente colorida", body: "As lentes E-Guard Retina™ e E-Guard Circadian™ atuam sobre os comprimentos de onda envolvidos na fadiga visual digital — deixando passar a luz que seus olhos precisam para ver as cores como elas são." },
      { n: "02", title: "Feitas para o dia inteiro",              body: "Armações TR90 leves, charneiras equilibradas e silhuetas limpas — pensadas para desaparecer no rosto e pertencer ao seu guarda-roupa." },
      { n: "03", title: "Um conforto que você sente",             body: "Menos fadiga visual nas horas de tela, transições mais suaves para a noite — apoiado em princípios ópticos revisados por pares, sem promessas exageradas." },
    ],
  },
  FR: {
    eyebrow: "Honest Science™ · Pensé pour la vision",
    title1: "Trois principes,",
    title2: "aucun mythe marketing.",
    steps: [
      { n: "01", title: "Filtrage sélectif, pas un verre teinté", body: "Les verres E-Guard Retina™ et E-Guard Circadian™ ciblent les longueurs d'onde impliquées dans la fatigue visuelle numérique — tout en laissant passer la lumière dont vos yeux ont besoin pour voir les couleurs telles qu'elles sont." },
      { n: "02", title: "Conçues pour être portées toute la journée", body: "Montures TR90 légères, charnières équilibrées et silhouettes épurées — pensées pour s'oublier sur le visage et trouver leur place dans votre vestiaire." },
      { n: "03", title: "Un confort qui se ressent",              body: "Moins de fatigue visuelle face aux écrans, une transition plus douce vers le soir — soutenu par des principes optiques évalués par les pairs, sans promesses exagérées." },
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
