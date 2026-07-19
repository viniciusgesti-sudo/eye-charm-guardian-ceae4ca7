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
    title: "A ciência por trás das lentes.",
    titleAccent: "Sem os mitos de marketing.",
    bullets: [
      "Luz azul não é uma coisa só — são espectros diferentes com efeitos diferentes.",
      "Filtragem seletiva importa mais do que porcentagens de marketing infladas.",
      "Cada lente é verificada em laboratório independente contra padrões internacionais.",
    ],
    cta: "Leia a ciência completa",
  },
  EN: {
    eyebrow: "Honest Science™",
    title: "The science behind the lenses.",
    titleAccent: "Without the marketing myths.",
    bullets: [
      "Blue light isn't one thing — it's different wavelengths with different effects.",
      "Selective filtering matters more than inflated marketing percentages.",
      "Every lens is verified in an independent lab against international standards.",
    ],
    cta: "Read the full science",
  },
  FR: {
    eyebrow: "Honest Science™",
    title: "La science derrière les verres.",
    titleAccent: "Sans les mythes marketing.",
    bullets: [
      "La lumière bleue n'est pas une seule chose — plusieurs longueurs d'onde, effets distincts.",
      "Un filtrage sélectif compte plus que des pourcentages marketing gonflés.",
      "Chaque verre est vérifié en laboratoire indépendant selon les normes internationales.",
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
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: eyebrow + heading */}
          <div className="lg:col-span-6">
            <span
              className="small-caps text-[11px] font-semibold"
              style={{ color: "#86D9D1", letterSpacing: "0.15em" }}
            >
              {c.eyebrow}
            </span>
            <h2 className="mt-6 font-editorial text-3xl md:text-5xl leading-[1.05] tracking-tight">
              {c.title}
              <br />
              <span className="italic text-[#004B57]">{c.titleAccent}</span>
            </h2>
          </div>

          {/* Right: bullets + CTA */}
          <div className="lg:col-span-6">
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
