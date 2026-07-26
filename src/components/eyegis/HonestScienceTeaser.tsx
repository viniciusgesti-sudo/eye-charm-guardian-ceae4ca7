import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

const COPY: Record<Lang, {
  eyebrow: string;
  title: string;
  titleAccent: string;
  bullets: string[];
  cta: string;
}> = {
  PT: {
    eyebrow: "Honest Science™",
    title: "A ciência antes",
    titleAccent: "de qualquer promessa.",
    bullets: [
      "Luz azul não é uma só — são vários comprimentos de onda, com efeitos distintos sobre a retina e o ritmo circadiano.",
      "O que importa é filtrar o certo, na medida certa — não estampar uma porcentagem grande na caixa.",
      "Cada lente passa por laboratório independente contra padrões internacionais: ICNIRP, CIE S 026, ANSI Z80.3.",
    ],
    cta: "Ler a ciência completa",
  },
  EN: {
    eyebrow: "Honest Science™",
    title: "The science first.",
    titleAccent: "Then the promise.",
    bullets: [
      "Blue light isn't one thing — it's several wavelengths, with distinct effects on the retina and the circadian rhythm.",
      "What matters is filtering the right nanometres, in the right measure — not printing a big percentage on the box.",
      "Every lens passes through an independent laboratory against international standards: ICNIRP, CIE S 026, ANSI Z80.3.",
    ],
    cta: "Read the full science",
  },
  FR: {
    eyebrow: "Honest Science™",
    title: "La science d'abord.",
    titleAccent: "La promesse ensuite.",
    bullets: [
      "La lumière bleue n'est pas une seule chose — plusieurs longueurs d'onde, aux effets distincts sur la rétine et le rythme circadien.",
      "Ce qui compte, c'est filtrer les bons nanomètres, dans la juste mesure — pas imprimer un grand pourcentage sur la boîte.",
      "Chaque verre passe par un laboratoire indépendant selon les normes internationales : ICNIRP, CIE S 026, ANSI Z80.3.",
    ],
    cta: "Lire la science complète",
  },
};

export function HonestScienceTeaser() {
  const { lang } = useI18n();
  const c = COPY[lang];

  return (
    <section
      aria-label="Honest Science teaser"
      className="bg-[#F9F9F9] text-[#1D252D]"
    >
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-12 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start relative">
          {/* Left: eyebrow + heading */}
          <div className="lg:col-span-6 lg:pr-8">
            <span
              className="small-caps text-[11px] font-semibold"
              style={{ color: "#004B57", letterSpacing: "0.15em" }}
            >
              {c.eyebrow}
            </span>
            <h2 className="mt-6 font-editorial text-3xl md:text-5xl leading-[1.05] tracking-tight">
              {c.title}
              <br />
              <span className="italic text-[#004B57]">{c.titleAccent}</span>
            </h2>
          </div>

          {/* Vertical rule — Champagne 12% */}
          <div
            aria-hidden
            className="hidden lg:block absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(226,209,195,0.55), transparent)" }}
          />

          {/* Right: bullets + CTA */}
          <div className="lg:col-span-6 lg:pl-8">
            <ul className="space-y-5">
              {c.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="mt-1 inline-grid h-6 w-6 shrink-0 place-items-center rounded-full text-[12px] font-bold"
                    style={{ backgroundColor: "#86D9D1", color: "#004B57" }}
                  >
                    ✓
                  </span>
                  <p className="text-base md:text-[17px] leading-relaxed text-[#1D252D]/85 font-light">
                    {b}
                  </p>
                </li>
              ))}
            </ul>

            <Link
              to="/technology"
              hash="honest-science"
              className="group mt-10 inline-flex items-center gap-3 border-b-2 pb-1 font-eyebrow text-[12px] tracking-[0.2em] uppercase transition-colors"
              style={{ color: "#004B57", borderColor: "#004B57" }}
            >
              <span>{c.cta}</span>
              <span
                aria-hidden
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
