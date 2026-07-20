import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

type Row = { label: string; eyegis: string; generic: string };
type Copy = {
  eyebrow: string;
  title1: string;
  title2: string;
  lead: string;
  colEyegis: string;
  colGeneric: string;
  rows: Row[];
  footnote: string;
};

const COPY: Record<Lang, Copy> = {
  EN: {
    eyebrow: "Why Eyegis",
    title1: "Not every pair",
    title2: "on Amazon is equal.",
    lead: "The blue-light category is crowded. This is where the difference actually lives — the details most listings never disclose.",
    colEyegis: "Eyegis Men's Collection",
    colGeneric: "Typical Amazon pair",
    rows: [
      { label: "Frame material",           eyegis: "TR90 aerospace-grade polymer",         generic: "Basic TR/plastic blend" },
      { label: "Feel on the face",         eyegis: "Lightweight, flexible build",          generic: "Noticeably heavier" },
      { label: "Blue-light filtration",    eyegis: "Selective HEV filter (400–455 nm), independently tested", generic: "Undisclosed methodology" },
      { label: "Color rendering",          eyegis: "Neutral — no yellow tint",             generic: "Visible yellow cast" },
      { label: "Anti-reflective coating",  eyegis: "Multilayer, both sides",               generic: "Single side or none" },
      { label: "Certification",            eyegis: "CE + independent lab report",          generic: "Rarely disclosed" },
      { label: "Warranty",                 eyegis: "2 years + 60-day comfort guarantee",   generic: "30 days or none" },
    ],
    footnote: "Qualitative comparison against widely available blue-light eyewear on Amazon. Independent lab methodology available on request. Honest Science™.",
  },
  PT: {
    eyebrow: "Por que Eyegis",
    title1: "Nem todo par",
    title2: "na Amazon é igual.",
    lead: "A categoria de luz azul é lotada. É aqui que a diferença aparece — nos detalhes que a maioria dos anúncios nunca revela.",
    colEyegis: "Eyegis Men's Collection",
    colGeneric: "Par comum na Amazon",
    rows: [
      { label: "Material da armação",       eyegis: "Polímero de grau aeroespacial TR90",   generic: "Mistura básica TR/plástico" },
      { label: "Sensação no rosto",         eyegis: "Leve e flexível",                       generic: "Perceptivelmente mais pesada" },
      { label: "Filtragem de luz azul",     eyegis: "Filtro seletivo HEV (400–455 nm), testado em laboratório independente", generic: "Metodologia não divulgada" },
      { label: "Reprodução de cor",         eyegis: "Neutra — sem tom amarelo",              generic: "Tom amarelado visível" },
      { label: "Antirreflexo",              eyegis: "Multicamadas, dos dois lados",          generic: "Um lado só ou nenhum" },
      { label: "Certificação",              eyegis: "CE + laudo independente",               generic: "Raramente divulgada" },
      { label: "Garantia",                  eyegis: "2 anos + garantia de conforto 60 dias", generic: "30 dias ou nenhuma" },
    ],
    footnote: "Comparação qualitativa com óculos de luz azul amplamente disponíveis na Amazon. Metodologia do laudo independente disponível sob pedido. Honest Science™.",
  },
  FR: {
    eyebrow: "Pourquoi Eyegis",
    title1: "Toutes les paires",
    title2: "sur Amazon ne se valent pas.",
    lead: "La catégorie lumière bleue est saturée. Voici où la différence se fait vraiment — les détails que la plupart des annonces ne divulguent jamais.",
    colEyegis: "Eyegis Men's Collection",
    colGeneric: "Paire courante sur Amazon",
    rows: [
      { label: "Matériau de la monture",    eyegis: "Polymère de qualité aérospatiale TR90", generic: "Mélange TR/plastique basique" },
      { label: "Sensation sur le visage",   eyegis: "Légère et flexible",                    generic: "Nettement plus lourde" },
      { label: "Filtration lumière bleue",  eyegis: "Filtre HEV sélectif (400–455 nm), testé en laboratoire indépendant", generic: "Méthodologie non divulguée" },
      { label: "Rendu des couleurs",        eyegis: "Neutre — sans teinte jaune",            generic: "Teinte jaune visible" },
      { label: "Traitement anti-reflet",    eyegis: "Multicouche, deux faces",               generic: "Une face ou aucun" },
      { label: "Certification",             eyegis: "CE + rapport de laboratoire indépendant", generic: "Rarement divulguée" },
      { label: "Garantie",                  eyegis: "2 ans + garantie confort 60 jours",     generic: "30 jours ou aucune" },
    ],
    footnote: "Comparaison qualitative avec des lunettes anti-lumière bleue largement disponibles sur Amazon. Méthodologie du laboratoire indépendant disponible sur demande. Honest Science™.",
  },
};

export function VsGenerics() {
  const { lang } = useI18n();
  const c = COPY[lang];
  return (
    <section className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <span className="font-eyebrow text-teal">{c.eyebrow}</span>
          <h2 className="mt-5 font-editorial text-ink leading-[0.95] text-fluid-h1">
            {c.title1}
            <span className="block italic text-teal">{c.title2}</span>
          </h2>
          <p className="mt-6 text-ink/70 leading-relaxed max-w-xl">{c.lead}</p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-ink/10">
          <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-ink text-paper">
            <div className="px-4 md:px-8 py-5 font-eyebrow text-[10px] text-paper/60">
              &nbsp;
            </div>
            <div className="px-4 md:px-8 py-5 font-eyebrow text-[11px] tracking-wider text-mint border-l border-paper/10">
              {c.colEyegis}
            </div>
            <div className="px-4 md:px-8 py-5 font-eyebrow text-[11px] tracking-wider text-paper/55 border-l border-paper/10">
              {c.colGeneric}
            </div>
          </div>
          {c.rows.map((r, i) => (
            <div
              key={r.label}
              className={`grid grid-cols-[1.2fr_1fr_1fr] ${
                i % 2 === 0 ? "bg-paper" : "bg-sand/25"
              }`}
            >
              <div className="px-4 md:px-8 py-5 font-eyebrow text-[10px] tracking-wider text-ink/60 border-t border-ink/8">
                {r.label}
              </div>
              <div className="px-4 md:px-8 py-5 text-sm md:text-base text-ink border-t border-l border-ink/8 flex items-center gap-2">
                <span className="text-teal shrink-0" aria-hidden="true">✓</span>
                <span>{r.eyegis}</span>
              </div>
              <div className="px-4 md:px-8 py-5 text-sm md:text-base text-ink/55 border-t border-l border-ink/8">
                {r.generic}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-ink/45 max-w-2xl">{c.footnote}</p>
      </div>
    </section>
  );
}
