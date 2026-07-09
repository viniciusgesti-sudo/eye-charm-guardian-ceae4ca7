// Central translation dictionary — EN / PT / FR
// Add new keys here and consume via useI18n().t("path.to.key")

export type Lang = "EN" | "PT" | "FR";

export const LANGS: readonly Lang[] = ["EN", "PT", "FR"] as const;

type Dict = Record<string, string>;

export const translations: Record<Lang, Dict> = {
  EN: {
    // Navigation
    "nav.men": "Men",
    "nav.women": "Women",
    "nav.kids": "Kids",
    "nav.technology": "Technology",
    "nav.honestScience": "Honest Science™",
    "nav.about": "About",
    "nav.bag": "Bag",
    "nav.opticalScience": "® Optical Science",

    // Hero
    "hero.chapter1": "Chapter I · Meridian",
    "hero.chapter1.location": "São Paulo · 22:41",
    "hero.chapter2": "Chapter II · Solène",
    "hero.chapter2.location": "Paris · 17:12",
    "hero.headline1.line1": "Engineered",
    "hero.headline1.line2": "for Vision.",
    "hero.headline2.line1": "Designed",
    "hero.headline2.line2": "for Style.",
    "hero.subcopy.line1": "Premium blue-light filtering eyewear created for the digital generation.",
    "hero.subcopy.line2": "Scientifically engineered. Timelessly designed.",
    "hero.cta.men": "Explore Men's Collection",
    "hero.cta.women": "Explore Women's Collection",
    "hero.scroll": "Scroll",
  },
  PT: {
    // Navigation
    "nav.men": "Homem",
    "nav.women": "Mulher",
    "nav.kids": "Kids",
    "nav.technology": "Tecnologia",
    "nav.honestScience": "Honest Science™",
    "nav.about": "Sobre",
    "nav.bag": "Sacola",
    "nav.opticalScience": "® Ciência Óptica",

    // Hero
    "hero.chapter1": "Capítulo I · Meridian",
    "hero.chapter1.location": "São Paulo · 22:41",
    "hero.chapter2": "Capítulo II · Solène",
    "hero.chapter2.location": "Paris · 17:12",
    "hero.headline1.line1": "Engenharia",
    "hero.headline1.line2": "para a visão.",
    "hero.headline2.line1": "Desenho",
    "hero.headline2.line2": "para o estilo.",
    "hero.subcopy.line1": "Óculos premium com filtro de luz azul, criados para a geração digital.",
    "hero.subcopy.line2": "Cientificamente desenvolvidos. Atemporais no design.",
    "hero.cta.men": "Explorar Coleção Masculina",
    "hero.cta.women": "Explorar Coleção Feminina",
    "hero.scroll": "Role",
  },
  FR: {
    // Navigation
    "nav.men": "Homme",
    "nav.women": "Femme",
    "nav.kids": "Enfant",
    "nav.technology": "Technologie",
    "nav.honestScience": "Honest Science™",
    "nav.about": "À propos",
    "nav.bag": "Panier",
    "nav.opticalScience": "® Science Optique",

    // Hero
    "hero.chapter1": "Chapitre I · Meridian",
    "hero.chapter1.location": "São Paulo · 22h41",
    "hero.chapter2": "Chapitre II · Solène",
    "hero.chapter2.location": "Paris · 17h12",
    "hero.headline1.line1": "Conçu",
    "hero.headline1.line2": "pour la vision.",
    "hero.headline2.line1": "Dessiné",
    "hero.headline2.line2": "pour le style.",
    "hero.subcopy.line1": "Des lunettes premium à filtre de lumière bleue, pensées pour la génération numérique.",
    "hero.subcopy.line2": "Ingénierie scientifique. Design intemporel.",
    "hero.cta.men": "Découvrir la Collection Homme",
    "hero.cta.women": "Découvrir la Collection Femme",
    "hero.scroll": "Défiler",
  },
};

export function detectBrowserLang(): Lang {
  if (typeof navigator === "undefined") return "EN";
  const raw = (navigator.language || "en").slice(0, 2).toLowerCase();
  if (raw === "pt") return "PT";
  if (raw === "fr") return "FR";
  return "EN";
}
