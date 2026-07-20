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
    "nav.kids": "Kids & Teens",
    "nav.technology": "Our Technology",
    "nav.honestScience": "Honest Science™",
    "nav.about": "About Eyegis",
    "nav.lenses": "Choose your lenses",
    "nav.social": "Social Networks",
    "nav.bag": "Bag",
    "nav.shopAmazon": "Coming soon on Amazon",
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
    "hero.zenith.tag": "High-intensity blue-light and glare protection for the 24/7 hustle.",
    "hero.clarity.tag": "High-fidelity color and champagne acetate lightness for those who create in daylight.",
  },
  PT: {
    // Navigation
    "nav.men": "Homem",
    "nav.women": "Mulher",
    "nav.kids": "Kids & Teens",
    "nav.technology": "Nossa Tecnologia",
    "nav.honestScience": "Honest Science™",
    "nav.about": "Sobre a Eyegis",
    "nav.lenses": "Escolha suas lentes",
    "nav.social": "Redes Sociais",
    "nav.bag": "Sacola",
    "nav.shopAmazon": "Em breve na Amazon",
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
    "hero.zenith.tag": "Proteção intensa contra luz azul e reflexos para a rotina 24/7.",
    "hero.clarity.tag": "Alta fidelidade de cor e leveza de acetato champagne para quem cria à luz do dia.",
  },
  FR: {
    // Navigation
    "nav.men": "Homme",
    "nav.women": "Femme",
    "nav.kids": "Enfants & Ados",
    "nav.technology": "Notre Technologie",
    "nav.honestScience": "Honest Science™",
    "nav.about": "À propos d'Eyegis",
    "nav.lenses": "Choisir ses verres",
    "nav.social": "Réseaux sociaux",
    "nav.bag": "Panier",
    "nav.shopAmazon": "Bientôt sur Amazon",
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
    "hero.zenith.tag": "Protection intense contre la lumière bleue et les reflets pour le rythme 24/7.",
    "hero.clarity.tag": "Haute fidélité des couleurs et légèreté de l'acétate champagne pour créer à la lumière du jour.",
  },
};

export function detectBrowserLang(): Lang {
  if (typeof navigator === "undefined") return "EN";
  const raw = (navigator.language || "en").slice(0, 2).toLowerCase();
  if (raw === "pt" || raw === "br") return "PT";
  if (raw === "fr") return "FR";
  return "EN";
}
