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
    eyebrow: "Honest Science™",
    title1: "Three principles.",
    title2: "Nothing invented.",
    steps: [
      { n: "01", title: "Selective filtering, not a tint",         body: "E-Guard Retina™ and E-Guard Circadian™ act only on the wavelengths where high-energy blue light lives — and leave the rest of the visible spectrum to your eyes, so colours stay honest." },
      { n: "02", title: "Frames built to be forgotten",            body: "Featherweight TR90 architecture, balanced hinges, quiet silhouettes — an object designed to sit on your face all day and belong in your wardrobe at night." },
      { n: "03", title: "Backed by optics, not slogans",           body: "Every lens is engineered against peer-reviewed optical principles — ICNIRP, CIE S 026, ANSI Z80.3 — and verified in an independent laboratory. No inflated percentages. No overpromises." },
    ],
  },
  PT: {
    eyebrow: "Honest Science™",
    title1: "Três princípios.",
    title2: "Nada inventado.",
    steps: [
      { n: "01", title: "Filtragem seletiva, não é lente colorida", body: "As lentes E-Guard Retina™ e E-Guard Circadian™ atuam apenas nos comprimentos de onda onde vive a luz azul de alta energia — e deixam o restante do espectro visível passar, para as cores continuarem fiéis." },
      { n: "02", title: "Armações feitas para desaparecer",         body: "Arquitetura TR90 leve, charneiras equilibradas, silhuetas silenciosas — um objeto pensado para ficar no rosto o dia inteiro e pertencer ao guarda-roupa à noite." },
      { n: "03", title: "Apoio na óptica, não no marketing",        body: "Cada lente é projetada segundo princípios ópticos revisados por pares — ICNIRP, CIE S 026, ANSI Z80.3 — e verificada em laboratório independente. Sem porcentagens infladas. Sem promessas exageradas." },
    ],
  },
  FR: {
    eyebrow: "Honest Science™",
    title1: "Trois principes.",
    title2: "Rien d'inventé.",
    steps: [
      { n: "01", title: "Filtrage sélectif, pas un verre teinté",   body: "Les verres E-Guard Retina™ et E-Guard Circadian™ n'agissent que sur les longueurs d'onde où vit la lumière bleue haute énergie — et laissent passer le reste du spectre visible, pour que les couleurs restent fidèles." },
      { n: "02", title: "Des montures faites pour s'oublier",       body: "Architecture TR90 légère, charnières équilibrées, silhouettes silencieuses — un objet pensé pour rester sur le visage toute la journée et trouver sa place dans votre vestiaire le soir." },
      { n: "03", title: "L'optique, pas les slogans",               body: "Chaque verre est conçu selon des principes optiques évalués par les pairs — ICNIRP, CIE S 026, ANSI Z80.3 — et vérifié en laboratoire indépendant. Aucun pourcentage gonflé. Aucune promesse exagérée." },
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
