/**
 * Local fallbacks for every CMS key.
 *
 * These are the exact texts and image references the site currently ships
 * hard-coded. When a Wix CMS field is empty (or the CMS is unreachable),
 * the frontend falls back to these values so the page never breaks.
 *
 * Keep this table in sync with the Wix `SiteContent` collection.
 */

import type { CmsEntry, CmsKey } from "./types";

type Fallbacks = Record<CmsKey, CmsEntry>;

export const fallbacks: Fallbacks = {
  "home.hero.center": {
    key: "home.hero.center",
    title: "Manifesto Eyegis",
    text: "Engenharia para a visão. Design para o estilo.",
    subtitle:
      "Óculos com engenharia para a visão. Design para o seu jeito de viver.",
  },
  "home.hero.men": {
    key: "home.hero.men",
    title: "Coleção Masculina",
    text: "São Paulo · Noite",
    buttonText: "Ver coleção",
    buttonLink: "/men",
    image: {
      src: "/hero-saopaulo-glasses.jpg",
      alt: "Coleção Masculina Eyegis — armação de acetato brilhante, à noite em São Paulo.",
    },
  },
  "home.hero.women": {
    key: "home.hero.women",
    title: "Coleção Feminina",
    text: "Paris · Hora Dourada",
    buttonText: "Ver coleção",
    buttonLink: "/women",
    image: {
      src: "/hero-paris-glasses.jpg",
      alt: "Coleção Feminina Eyegis — armação de acetato tartaruga, hora dourada em Paris.",
    },
  },
  "home.collection.men": {
    key: "home.collection.men",
    title: "Coleção Masculina",
    subtitle: "Presença. Precisão. Presente.",
    description:
      "Armações masculinas desenhadas para o trabalho digital e o ritmo noturno.",
    buttonText: "Ver coleção",
    buttonLink: "/men",
  },
  "home.collection.men.amazon": {
    key: "home.collection.men.amazon",
    buttonText: "Comprar na Amazon",
    buttonLink: "https://www.amazon.com.br/",
  },
  "home.collection.women": {
    key: "home.collection.women",
    title: "Coleção Feminina",
    subtitle: "Serenidade em cada detalhe.",
    description:
      "Silhuetas atemporais para quem transita entre o físico e o digital.",
    buttonText: "Ver coleção",
    buttonLink: "/women",
  },
  "home.collection.women.amazon": {
    key: "home.collection.women.amazon",
    buttonText: "Comprar na Amazon",
    buttonLink: "https://www.amazon.com.br/",
  },
  "home.collection.kids": {
    key: "home.collection.kids",
    title: "Kids & Teens",
    subtitle: "Proteção que acompanha o crescimento.",
    buttonText: "Ver coleção",
    buttonLink: "/kids",
  },
  "home.science": {
    key: "home.science",
    title: "Honest Science™",
    subtitle: "Ciência que respeita a inteligência.",
    description:
      "Sem promessas absolutas. Apenas engenharia óptica verificável.",
    buttonText: "Conhecer",
    buttonLink: "/technology",
  },
  "home.reviews.header": {
    key: "home.reviews.header",
    title: "Certificação Laboratorial",
    subtitle: "Cada lente é auditada de forma independente.",
  },
  "home.reviews.1": { key: "home.reviews.1", title: "ISO 12312-1", text: "Segurança óptica geral" },
  "home.reviews.2": { key: "home.reviews.2", title: "ANSI Z87.1", text: "Impacto e clareza" },
  "home.reviews.3": { key: "home.reviews.3", title: "Blue Light Lab", text: "Filtragem verificada" },
  "home.cta.amazon": {
    key: "home.cta.amazon",
    title: "Disponível na Amazon",
    buttonText: "Ver na Amazon",
    buttonLink: "https://www.amazon.com.br/",
  },
  "home.sticky.bar": {
    key: "home.sticky.bar",
    text: "Frete grátis · Garantia 60 dias",
    buttonText: "Comprar agora",
    buttonLink: "https://www.amazon.com.br/",
  },
  "home.lifestyle.1": { key: "home.lifestyle.1", title: "Business", text: "Do briefing ao boardroom." },
  "home.lifestyle.2": { key: "home.lifestyle.2", title: "Creative", text: "Do estúdio à edição noturna." },
  "home.lifestyle.3": { key: "home.lifestyle.3", title: "Gaming", text: "Sessions longas, foco estável." },
  "home.lifestyle.4": { key: "home.lifestyle.4", title: "Student", text: "Aulas híbridas sem fadiga." },
  "home.lifestyle.5": { key: "home.lifestyle.5", title: "Travel", text: "Do voo à conexão remota." },
  "home.lifestyle.6": { key: "home.lifestyle.6", title: "Everyday", text: "Do metrô ao home office." },
};
