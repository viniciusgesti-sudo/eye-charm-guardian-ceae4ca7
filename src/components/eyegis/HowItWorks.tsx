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
    eyebrow: "How Eyegis works",
    title1: "Three things",
    title2: "that make the difference.",
    steps: [
      { n: "01", title: "Filters the harmful spectrum",  body: "Blocks up to 45% of blue light between 400–455 nm — the range clinical studies link to digital eye fatigue." },
      { n: "02", title: "Keeps colors natural",           body: "EyegisGuard™ preserves color accuracy. No yellow tint, no distortion — what you see is what you get." },
      { n: "03", title: "Feels weightless all day",       body: "Aerospace-grade TR90 frame under 18g. You forget you're wearing them within the first hour." },
    ],
  },
  PT: {
    eyebrow: "Como funciona a Eyegis",
    title1: "Três coisas",
    title2: "que fazem a diferença.",
    steps: [
      { n: "01", title: "Filtra o espectro nocivo",       body: "Bloqueia até 45% da luz azul entre 400–455 nm — a faixa que estudos clínicos associam à fadiga visual digital." },
      { n: "02", title: "Mantém as cores naturais",       body: "EyegisGuard™ preserva a fidelidade das cores. Sem tom amarelo, sem distorção — o que você vê é real." },
      { n: "03", title: "Leve o dia inteiro",             body: "Armação TR90 de grau aeroespacial abaixo de 18g. Você esquece que está usando na primeira hora." },
    ],
  },
  FR: {
    eyebrow: "Comment fonctionne Eyegis",
    title1: "Trois choses",
    title2: "qui font la différence.",
    steps: [
      { n: "01", title: "Filtre le spectre nocif",        body: "Bloque jusqu'à 45% de la lumière bleue entre 400–455 nm — la plage associée à la fatigue visuelle numérique." },
      { n: "02", title: "Conserve les couleurs naturelles", body: "EyegisGuard™ préserve la fidélité des couleurs. Sans teinte jaune, sans distorsion." },
      { n: "03", title: "Léger toute la journée",         body: "Monture TR90 de qualité aérospatiale, moins de 18g. Vous l'oubliez dès la première heure." },
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
