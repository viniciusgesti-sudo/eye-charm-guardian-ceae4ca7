import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { useEffect, useRef, useState } from "react";

import heroImg from "@/assets/contact-concierge.jpg?w=640;960;1200;1600&format=avif;webp;jpg&as=picture";
import { Picture } from "@/components/eyegis/Picture";
import compareImg from "@/assets/guard-comparison.jpg?w=768;1200;1920&format=avif;webp;jpg&as=picture";
import lifeBusiness from "@/assets/persona-executive.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import lifeCreative from "@/assets/persona-creative.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import lifeGaming from "@/assets/persona-gamer.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import meridianHero from "@/assets/products/meridian-hero.jpg?w=480;800;1200&format=avif;webp;jpg&as=picture";
import atelierFront from "@/assets/products/atelier-front.jpg?w=480;800;1200&format=avif;webp;jpg&as=picture";
import soleneFront from "@/assets/products/solene-front.jpg?w=480;800;1200&format=avif;webp;jpg&as=picture";
import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

export const Route = createFileRoute("/lenses")({
  head: () =>
    buildSeo({
      title: "Choose Your Lenses — Eyegis",
      description:
        "Find the perfect Eyegis lens for the way you live. A premium, interactive guide to visual comfort, color accuracy and screen exposure.",
      path: "/lenses",
    }),

  component: LensesPage,
});

const AMAZON_URL = "https://www.amazon.com.br/";

/* ------------------------------------------------------------------ */
/*  Localized copy                                                    */
/* ------------------------------------------------------------------ */

type PersonaId = "everyday" | "creative" | "max";

type PersonaCopy = {
  id: PersonaId;
  label: string;
  eyebrow: string;
  hours: string;
  contexts: string[];
  desc: string;
  collection: string;
  cta: string;
  product: { name: string; line: string; desc: string };
};

type LensCopy = {
  key: "clear" | "shield" | "pro";
  name: string;
  tagline: string;
  bestFor: string[];
  scoresLabel: string; // "Best for"
};

type Copy = {
  nav: { home: string; buy: string };
  hero: {
    eyebrow: string;
    h1a: string;
    h1b: string;
    sub: string;
    start: string;
    assessment: string;
    heroAlt: string;
  };
  how: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    selected: string;
  };
  personas: PersonaCopy[];
  compare: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    mostPopular: string;
    lensTier: string;
    bestFor: string;
    choose: string;
    criteria: string[];
  };
  lenses: LensCopy[];
  demo: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    body: string;
    without: string;
    with: string;
    drag: string;
  };
  who: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    see: string;
    items: { label: string; note: string; target: PersonaId }[];
  };
  faq: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    items: { q: string; a: string }[];
  };
  reco: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    collection: string;
    buy: string;
    learn: string;
    guard: string;
    comfort: string;
    warranty: string;
  };
  cta: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    body: string;
    take: string;
    browse: string;
    buy: string;
  };
};

const CONTENT: Record<Lang, Copy> = {
  EN: {
    nav: { home: "← Home", buy: "Buy on Amazon" },
    hero: {
      eyebrow: "Choose Your Lenses",
      h1a: "Find the perfect lens",
      h1b: "for the way you live.",
      sub: "Every digital lifestyle is different. Discover which Eyegis lens best matches your daily routine — from short reading sessions to full days on multiple monitors.",
      start: "Start comparing",
      assessment: "Take the Assessment",
      heroAlt: "A professional wearing Eyegis at a bright workspace",
    },
    how: {
      eyebrow: "Section 01 · How to choose",
      h2a: "Start with your day,",
      h2b: " not the spec sheet.",
      selected: "✓ Selected",
    },
    personas: [
      {
        id: "everyday",
        label: "Everyday Digital Life",
        eyebrow: "Card 01 · 3–6 hours daily",
        hours: "3 – 6 h",
        contexts: ["Office", "Email", "Browsing", "Meetings"],
        desc: "For people who spend a moderate part of the day in front of screens and value elegance in everyday wear.",
        collection: "Men · Everyday",
        cta: "Discover Meridian",
        product: {
          name: "Meridian",
          line: "by Eyegis",
          desc: "A quiet architectural silhouette with EyegisGuard™ optical filter. Effortless for daily wear.",
        },
      },
      {
        id: "creative",
        label: "Creative Performance",
        eyebrow: "Card 02 · 6–8 hours daily",
        hours: "6 – 8 h",
        contexts: ["Designers", "Editors", "Photographers", "Architects", "Developers"],
        desc: "For long creative sessions where accurate color perception and sustained comfort matter most.",
        collection: "Women · Creative",
        cta: "Discover Solène",
        product: {
          name: "Solène",
          line: "by Eyegis",
          desc: "A sculpted profile designed for creative professionals. Precision optical clarity, no color shift.",
        },
      },
      {
        id: "max",
        label: "Maximum Screen Exposure",
        eyebrow: "Card 03 · 8+ hours daily",
        hours: "8 h +",
        contexts: ["Gamers", "Streamers", "Remote work", "Traders", "Multi-monitor"],
        desc: "For people whose daily routine involves multiple screens, extended focus and demanding sessions.",
        collection: "Men · Business",
        cta: "Discover Atelier",
        product: {
          name: "Atelier",
          line: "by Eyegis",
          desc: "Balanced weight distribution and premium filtration for the longest, most demanding sessions.",
        },
      },
    ],
    compare: {
      eyebrow: "Section 02 · Comparison",
      h2a: "Three lenses.",
      h2b: " One perfect fit.",
      mostPopular: "Most popular",
      lensTier: "Lens tier",
      bestFor: "Best for",
      choose: "Choose this lens",
      criteria: [
        "Visual Comfort",
        "Color Accuracy",
        "Screen Exposure",
        "Everyday Use",
        "Creative Work",
        "Gaming",
        "Reading",
        "Long Sessions",
      ],
    },
    lenses: [
      {
        key: "clear",
        name: "EyegisGuard™ Clear",
        tagline: "For everyday moderate screen use.",
        bestFor: ["Office", "Reading", "Meetings"],
        scoresLabel: "Best for",
      },
      {
        key: "shield",
        name: "EyegisGuard™ Shield",
        tagline: "For creative professionals and long sessions.",
        bestFor: ["Design", "Photography", "Editing"],
        scoresLabel: "Best for",
      },
      {
        key: "pro",
        name: "EyegisGuard™ Pro",
        tagline: "For maximum daily screen exposure.",
        bestFor: ["Gaming", "Trading", "Streaming"],
        scoresLabel: "Best for",
      },
    ],
    demo: {
      eyebrow: "Section 03 · Demonstration",
      h2a: "A quieter screen,",
      h2b: " in true color.",
      body: "Drag the slider to see how EyegisGuard™ filters high-energy blue light without introducing an amber tint. Subtle, precise, honest.",
      without: "Without Eyegis",
      with: "With Eyegis",
      drag: "Drag to compare",
    },
    who: {
      eyebrow: "Section 04 · Who it's for",
      h2a: "Made for",
      h2b: " every kind of screen day.",
      see: "See recommendation →",
      items: [
        { label: "Creative Professionals", note: "Design, editing, photography.", target: "creative" },
        { label: "Business", note: "Meetings, presentations, deep focus.", target: "everyday" },
        { label: "Students", note: "Reading, notes, lectures.", target: "everyday" },
        { label: "Gaming", note: "Long sessions, competitive play.", target: "max" },
        { label: "Travel", note: "Airports, flights, hotels.", target: "everyday" },
        { label: "Healthcare", note: "Screens between shifts.", target: "creative" },
        { label: "Education", note: "Teaching, research, tutoring.", target: "everyday" },
        { label: "Remote Work", note: "Video calls, all-day monitors.", target: "max" },
      ],
    },
    faq: {
      eyebrow: "Section 05 · Questions",
      h2a: "Questions",
      h2b: " people ask.",
      items: [
        { q: "Can I wear them all day?", a: "Yes. Eyegis frames are designed for continuous wear — lightweight TR90 build, balanced weight distribution and coatings tuned for long sessions." },
        { q: "Can I drive with them?", a: "Yes. EyegisGuard™ lenses preserve natural color perception and are safe for daytime driving." },
        { q: "Do they change colors on my screen?", a: "No. The filter is tuned to attenuate high-energy blue light without introducing a visible amber tint — color-critical work stays accurate." },
        { q: "Can I wear them with contact lenses?", a: "Yes. Eyegis frames pair comfortably with soft or rigid contact lenses." },
        { q: "Are they compatible with gaming headsets?", a: "Yes. The temple arms are slim enough to sit comfortably under most on-ear and over-ear gaming headsets." },
        { q: "Can I use them while reading?", a: "Yes — the coating supports both screen and print. Many readers find them noticeably more comfortable at night." },
      ],
    },
    reco: {
      eyebrow: "Section 06 · Recommendation",
      h2a: "Based on your day,",
      h2b: " we suggest…",
      collection: "Collection",
      buy: "Buy on Amazon",
      learn: "Learn More",
      guard: "EyegisGuard™",
      comfort: "60-Day Comfort",
      warranty: "2-Year Warranty",
    },
    cta: {
      eyebrow: "Still deciding?",
      h2a: "Take the",
      h2b: "Digital Eye Score™.",
      body: "A one-minute personalized assessment. It maps your daily habits to the Eyegis lens that fits you best.",
      take: "Take the Assessment",
      browse: "Browse Products",
      buy: "Buy on Amazon",
    },
  },
  PT: {
    nav: { home: "← Início", buy: "Comprar na Amazon" },
    hero: {
      eyebrow: "Escolha as Suas Lentes",
      h1a: "Encontre a lente ideal",
      h1b: "para o seu estilo de vida.",
      sub: "Cada rotina digital é única. Descubra qual lente Eyegis se ajusta melhor ao seu dia a dia — de leituras curtas a jornadas completas em múltiplos monitores.",
      start: "Começar a comparar",
      assessment: "Fazer a Avaliação",
      heroAlt: "Um profissional usando Eyegis em um espaço de trabalho iluminado",
    },
    how: {
      eyebrow: "Seção 01 · Como escolher",
      h2a: "Comece pelo seu dia,",
      h2b: " não pela ficha técnica.",
      selected: "✓ Selecionado",
    },
    personas: [
      {
        id: "everyday",
        label: "Vida Digital Diária",
        eyebrow: "Cartão 01 · 3–6 horas por dia",
        hours: "3 – 6 h",
        contexts: ["Escritório", "E-mail", "Navegação", "Reuniões"],
        desc: "Para quem passa uma parte moderada do dia em frente às telas e valoriza elegância no uso diário.",
        collection: "Homem · Diário",
        cta: "Conhecer Meridian",
        product: {
          name: "Meridian",
          line: "por Eyegis",
          desc: "Uma silhueta arquitetônica discreta com filtro óptico EyegisGuard™. Perfeita para o dia a dia.",
        },
      },
      {
        id: "creative",
        label: "Performance Criativa",
        eyebrow: "Cartão 02 · 6–8 horas por dia",
        hours: "6 – 8 h",
        contexts: ["Designers", "Editores", "Fotógrafos", "Arquitetos", "Desenvolvedores"],
        desc: "Para sessões criativas longas, onde percepção precisa de cor e conforto contínuo são essenciais.",
        collection: "Mulher · Criativo",
        cta: "Conhecer Solène",
        product: {
          name: "Solène",
          line: "por Eyegis",
          desc: "Um perfil esculpido para profissionais criativos. Clareza óptica de precisão, sem alteração de cor.",
        },
      },
      {
        id: "max",
        label: "Exposição Máxima a Telas",
        eyebrow: "Cartão 03 · 8+ horas por dia",
        hours: "8 h +",
        contexts: ["Gamers", "Streamers", "Trabalho remoto", "Traders", "Multi-monitores"],
        desc: "Para quem convive com múltiplas telas, foco prolongado e sessões exigentes.",
        collection: "Homem · Business",
        cta: "Conhecer Atelier",
        product: {
          name: "Atelier",
          line: "por Eyegis",
          desc: "Distribuição de peso equilibrada e filtragem premium para as sessões mais longas e exigentes.",
        },
      },
    ],
    compare: {
      eyebrow: "Seção 02 · Comparação",
      h2a: "Três lentes.",
      h2b: " Uma escolha certa.",
      mostPopular: "Mais popular",
      lensTier: "Nível de lente",
      bestFor: "Ideal para",
      choose: "Escolher esta lente",
      criteria: [
        "Conforto Visual",
        "Precisão de Cor",
        "Exposição a Telas",
        "Uso Diário",
        "Trabalho Criativo",
        "Gaming",
        "Leitura",
        "Sessões Longas",
      ],
    },
    lenses: [
      {
        key: "clear",
        name: "EyegisGuard™ Clear",
        tagline: "Para uso moderado diário de telas.",
        bestFor: ["Escritório", "Leitura", "Reuniões"],
        scoresLabel: "Ideal para",
      },
      {
        key: "shield",
        name: "EyegisGuard™ Shield",
        tagline: "Para profissionais criativos e sessões longas.",
        bestFor: ["Design", "Fotografia", "Edição"],
        scoresLabel: "Ideal para",
      },
      {
        key: "pro",
        name: "EyegisGuard™ Pro",
        tagline: "Para máxima exposição diária a telas.",
        bestFor: ["Gaming", "Trading", "Streaming"],
        scoresLabel: "Ideal para",
      },
    ],
    demo: {
      eyebrow: "Seção 03 · Demonstração",
      h2a: "Uma tela mais silenciosa,",
      h2b: " em cores reais.",
      body: "Arraste o controle para ver como o EyegisGuard™ filtra a luz azul de alta energia sem adicionar tom âmbar. Sutil, preciso, honesto.",
      without: "Sem Eyegis",
      with: "Com Eyegis",
      drag: "Arraste para comparar",
    },
    who: {
      eyebrow: "Seção 04 · Para quem é",
      h2a: "Feito para",
      h2b: " todo tipo de dia em frente à tela.",
      see: "Ver recomendação →",
      items: [
        { label: "Profissionais Criativos", note: "Design, edição, fotografia.", target: "creative" },
        { label: "Negócios", note: "Reuniões, apresentações, foco profundo.", target: "everyday" },
        { label: "Estudantes", note: "Leituras, anotações, aulas.", target: "everyday" },
        { label: "Gaming", note: "Sessões longas, jogo competitivo.", target: "max" },
        { label: "Viagens", note: "Aeroportos, voos, hotéis.", target: "everyday" },
        { label: "Saúde", note: "Telas entre plantões.", target: "creative" },
        { label: "Educação", note: "Ensino, pesquisa, tutoria.", target: "everyday" },
        { label: "Trabalho Remoto", note: "Videochamadas, monitores o dia todo.", target: "max" },
      ],
    },
    faq: {
      eyebrow: "Seção 05 · Perguntas",
      h2a: "Perguntas",
      h2b: " que as pessoas fazem.",
      items: [
        { q: "Posso usar o dia inteiro?", a: "Sim. As armações Eyegis são feitas para uso contínuo — construção leve em TR90, distribuição de peso equilibrada e tratamentos pensados para sessões longas." },
        { q: "Posso dirigir usando?", a: "Sim. As lentes EyegisGuard™ preservam a percepção natural de cor e são seguras para dirigir durante o dia." },
        { q: "Alteram as cores da tela?", a: "Não. O filtro atenua a luz azul de alta energia sem introduzir tom âmbar visível — trabalhos com cor crítica permanecem precisos." },
        { q: "Posso usar com lentes de contato?", a: "Sim. As armações Eyegis convivem bem com lentes de contato gelatinosas ou rígidas." },
        { q: "São compatíveis com headsets gamer?", a: "Sim. As hastes são finas o suficiente para acomodar a maioria dos headsets on-ear e over-ear." },
        { q: "Posso usar para ler?", a: "Sim — o tratamento funciona tanto para telas quanto para papel. Muitos leitores relatam mais conforto à noite." },
      ],
    },
    reco: {
      eyebrow: "Seção 06 · Recomendação",
      h2a: "Com base no seu dia,",
      h2b: " sugerimos…",
      collection: "Coleção",
      buy: "Comprar na Amazon",
      learn: "Saber mais",
      guard: "EyegisGuard™",
      comfort: "Conforto de 60 dias",
      warranty: "Garantia de 2 anos",
    },
    cta: {
      eyebrow: "Ainda em dúvida?",
      h2a: "Faça o",
      h2b: "Digital Eye Score™.",
      body: "Uma avaliação personalizada de um minuto. Ela conecta seus hábitos diários à lente Eyegis ideal para você.",
      take: "Fazer a Avaliação",
      browse: "Ver Produtos",
      buy: "Comprar na Amazon",
    },
  },
  FR: {
    nav: { home: "← Accueil", buy: "Acheter sur Amazon" },
    hero: {
      eyebrow: "Choisissez Vos Verres",
      h1a: "Trouvez le verre parfait",
      h1b: "pour votre mode de vie.",
      sub: "Chaque vie numérique est différente. Découvrez quel verre Eyegis correspond le mieux à votre quotidien — de courtes lectures à de longues journées sur plusieurs écrans.",
      start: "Commencer la comparaison",
      assessment: "Faire l'évaluation",
      heroAlt: "Un professionnel portant Eyegis dans un espace de travail lumineux",
    },
    how: {
      eyebrow: "Section 01 · Comment choisir",
      h2a: "Partez de votre journée,",
      h2b: " pas de la fiche technique.",
      selected: "✓ Sélectionné",
    },
    personas: [
      {
        id: "everyday",
        label: "Vie numérique quotidienne",
        eyebrow: "Carte 01 · 3–6 heures par jour",
        hours: "3 – 6 h",
        contexts: ["Bureau", "E-mail", "Navigation", "Réunions"],
        desc: "Pour celles et ceux qui passent une part modérée de leur journée devant un écran et recherchent l'élégance au quotidien.",
        collection: "Homme · Quotidien",
        cta: "Découvrir Meridian",
        product: {
          name: "Meridian",
          line: "par Eyegis",
          desc: "Une silhouette architecturale discrète avec le filtre optique EyegisGuard™. Idéal pour un port quotidien.",
        },
      },
      {
        id: "creative",
        label: "Performance créative",
        eyebrow: "Carte 02 · 6–8 heures par jour",
        hours: "6 – 8 h",
        contexts: ["Designers", "Monteurs", "Photographes", "Architectes", "Développeurs"],
        desc: "Pour de longues sessions créatives où la précision des couleurs et le confort prolongé sont essentiels.",
        collection: "Femme · Créatif",
        cta: "Découvrir Solène",
        product: {
          name: "Solène",
          line: "par Eyegis",
          desc: "Un profil sculpté pour les professionnels créatifs. Clarté optique de précision, sans dérive de couleur.",
        },
      },
      {
        id: "max",
        label: "Exposition maximale aux écrans",
        eyebrow: "Carte 03 · 8h+ par jour",
        hours: "8 h +",
        contexts: ["Gamers", "Streamers", "Télétravail", "Traders", "Multi-écrans"],
        desc: "Pour celles et ceux dont la routine implique plusieurs écrans, une concentration prolongée et des sessions exigeantes.",
        collection: "Homme · Business",
        cta: "Découvrir Atelier",
        product: {
          name: "Atelier",
          line: "par Eyegis",
          desc: "Répartition équilibrée du poids et filtration premium pour les sessions les plus longues et exigeantes.",
        },
      },
    ],
    compare: {
      eyebrow: "Section 02 · Comparaison",
      h2a: "Trois verres.",
      h2b: " Un choix parfait.",
      mostPopular: "Le plus populaire",
      lensTier: "Niveau de verre",
      bestFor: "Idéal pour",
      choose: "Choisir ce verre",
      criteria: [
        "Confort visuel",
        "Précision des couleurs",
        "Exposition aux écrans",
        "Usage quotidien",
        "Travail créatif",
        "Gaming",
        "Lecture",
        "Longues sessions",
      ],
    },
    lenses: [
      {
        key: "clear",
        name: "EyegisGuard™ Clear",
        tagline: "Pour un usage quotidien modéré des écrans.",
        bestFor: ["Bureau", "Lecture", "Réunions"],
        scoresLabel: "Idéal pour",
      },
      {
        key: "shield",
        name: "EyegisGuard™ Shield",
        tagline: "Pour les professionnels créatifs et les longues sessions.",
        bestFor: ["Design", "Photographie", "Montage"],
        scoresLabel: "Idéal pour",
      },
      {
        key: "pro",
        name: "EyegisGuard™ Pro",
        tagline: "Pour une exposition maximale aux écrans.",
        bestFor: ["Gaming", "Trading", "Streaming"],
        scoresLabel: "Idéal pour",
      },
    ],
    demo: {
      eyebrow: "Section 03 · Démonstration",
      h2a: "Un écran plus doux,",
      h2b: " en couleurs fidèles.",
      body: "Faites glisser le curseur pour voir comment EyegisGuard™ filtre la lumière bleue haute énergie sans ajouter de teinte ambrée. Subtil, précis, honnête.",
      without: "Sans Eyegis",
      with: "Avec Eyegis",
      drag: "Glisser pour comparer",
    },
    who: {
      eyebrow: "Section 04 · Pour qui",
      h2a: "Conçu pour",
      h2b: " toute journée devant un écran.",
      see: "Voir la recommandation →",
      items: [
        { label: "Professionnels créatifs", note: "Design, montage, photographie.", target: "creative" },
        { label: "Business", note: "Réunions, présentations, concentration.", target: "everyday" },
        { label: "Étudiants", note: "Lecture, notes, cours.", target: "everyday" },
        { label: "Gaming", note: "Sessions longues, jeu compétitif.", target: "max" },
        { label: "Voyages", note: "Aéroports, vols, hôtels.", target: "everyday" },
        { label: "Santé", note: "Écrans entre les gardes.", target: "creative" },
        { label: "Éducation", note: "Enseignement, recherche, tutorat.", target: "everyday" },
        { label: "Télétravail", note: "Visio, écrans toute la journée.", target: "max" },
      ],
    },
    faq: {
      eyebrow: "Section 05 · Questions",
      h2a: "Questions",
      h2b: " fréquentes.",
      items: [
        { q: "Puis-je les porter toute la journée ?", a: "Oui. Les montures Eyegis sont conçues pour un port continu — construction TR90 légère, répartition équilibrée du poids et traitements pensés pour les longues sessions." },
        { q: "Puis-je conduire avec ?", a: "Oui. Les verres EyegisGuard™ préservent la perception naturelle des couleurs et sont sûrs pour la conduite de jour." },
        { q: "Modifient-ils les couleurs de l'écran ?", a: "Non. Le filtre atténue la lumière bleue haute énergie sans introduire de teinte ambrée visible — le travail chromatique reste précis." },
        { q: "Compatibles avec des lentilles de contact ?", a: "Oui. Les montures Eyegis se portent confortablement avec des lentilles souples ou rigides." },
        { q: "Compatibles avec des casques de gaming ?", a: "Oui. Les branches sont assez fines pour passer sous la plupart des casques on-ear et over-ear." },
        { q: "Utilisables pour la lecture ?", a: "Oui — le traitement fonctionne aussi bien pour l'écran que pour le papier. De nombreux lecteurs les trouvent plus confortables le soir." },
      ],
    },
    reco: {
      eyebrow: "Section 06 · Recommandation",
      h2a: "En fonction de votre journée,",
      h2b: " nous suggérons…",
      collection: "Collection",
      buy: "Acheter sur Amazon",
      learn: "En savoir plus",
      guard: "EyegisGuard™",
      comfort: "Confort 60 jours",
      warranty: "Garantie 2 ans",
    },
    cta: {
      eyebrow: "Encore hésitant ?",
      h2a: "Faites le",
      h2b: "Digital Eye Score™.",
      body: "Une évaluation personnalisée d'une minute. Elle relie vos habitudes quotidiennes au verre Eyegis qui vous convient le mieux.",
      take: "Faire l'évaluation",
      browse: "Voir les produits",
      buy: "Acheter sur Amazon",
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Data (scores keyed by criterion index — language independent)     */
/* ------------------------------------------------------------------ */

// Scores per lens per criterion index (aligned with compare.criteria order)
const LENS_SCORES: Record<"clear" | "shield" | "pro", number[]> = {
  clear:  [4, 5, 3, 5, 4, 3, 5, 3],
  shield: [5, 5, 5, 4, 5, 4, 4, 5],
  pro:    [5, 4, 5, 4, 4, 5, 4, 5],
};

import type { PictureSource } from "@/components/eyegis/Picture";

const PERSONA_IMAGES: Record<PersonaId, PictureSource> = {
  everyday: lifeBusiness,
  creative: lifeCreative,
  max: lifeGaming,
};

const PERSONA_PRODUCT_IMAGES: Record<PersonaId, PictureSource> = {
  everyday: meridianHero,
  creative: soleneFront,
  max: atelierFront,
};

/* ------------------------------------------------------------------ */
/*  Reveal                                                            */
/* ------------------------------------------------------------------ */

function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (setShown(true), io.disconnect())),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, shown };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
      }}
      className={`transition-all duration-[1100ms] ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                            */
/* ------------------------------------------------------------------ */

function MiniHeader({ c }: { c: Copy }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60"
          : "bg-background/40 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10 lg:px-14">
        <Link to="/" className="flex items-baseline gap-2 text-ink">
          <span className="font-editorial text-2xl tracking-tight">Eyegis</span>
          <span className="font-eyebrow hidden text-[9px] text-muted-foreground sm:inline">
            ® Optical Science
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-eyebrow text-ink/70">
          <Link to="/" className="hover:text-ink transition-colors">
            {c.nav.home}
          </Link>
        </nav>
        <a
          href={AMAZON_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-teal px-5 py-2.5 font-eyebrow text-paper hover:bg-teal-deep transition-colors"
        >
          {c.nav.buy}
        </a>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                              */
/* ------------------------------------------------------------------ */

function Hero({ c }: { c: Copy }) {
  return (
    <section className="relative bg-paper pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-12 gap-12 items-center px-6 md:px-10 lg:px-14">
        <div className="lg:col-span-6">
          <Reveal>
            <span className="font-eyebrow text-teal">{c.hero.eyebrow}</span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 font-editorial text-ink leading-[0.9] text-[13vw] sm:text-[9vw] lg:text-[6.4vw] xl:text-[104px]">
              {c.hero.h1a}
              <span className="block italic text-teal">{c.hero.h1b}</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-lg font-light text-lg leading-relaxed text-ink/75">
              {c.hero.sub}
            </p>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#compare"
                className="group inline-flex items-center gap-6 rounded-full bg-teal px-8 py-5 text-paper hover:bg-teal-deep hover:-translate-y-0.5 transition-all duration-500"
              >
                <span className="font-eyebrow">{c.hero.start}</span>
                <span aria-hidden="true">→</span>
              </a>
              <Link
                to="/"
                hash="digital-eye-score"
                className="inline-flex items-center justify-center rounded-full border border-ink/20 px-8 py-5 font-eyebrow text-ink hover:bg-ink hover:text-paper transition-colors"
              >
                {c.hero.assessment}
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={200}>
            <div className="relative aspect-[5/6] overflow-hidden rounded-md bg-paper-warm">
              <Picture
                source={heroImg}
                alt={c.hero.heroAlt}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(134,217,209,0.14),transparent_60%)]" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  How to choose (3 cards)                                           */
/* ------------------------------------------------------------------ */

function PersonaIcon({ id }: { id: PersonaId }) {
  if (id === "everyday") {
    return (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="8" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 12h2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (id === "creative") {
    return (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 18l6-10 4 6 3-4 3 8H4Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="8" height="6" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="6" width="8" height="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 12v3 M17 12v3 M5 18h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HowToChoose({
  c,
  onPick,
  active,
}: {
  c: Copy;
  onPick: (id: PersonaId) => void;
  active: PersonaId;
}) {
  return (
    <section className="bg-paper-warm py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <Reveal>
          <span className="font-eyebrow text-teal">{c.how.eyebrow}</span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 max-w-3xl font-editorial text-ink text-4xl md:text-6xl leading-[0.95]">
            {c.how.h2a}
            <span className="italic text-teal">{c.how.h2b}</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.personas.map((p, i) => {
            const isActive = active === p.id;
            return (
              <Reveal key={p.id} delay={i * 100}>
                <button
                  type="button"
                  onClick={() => onPick(p.id)}
                  className={`group relative w-full text-left overflow-hidden rounded-2xl border transition-all duration-500 ${
                    isActive
                      ? "border-teal bg-paper shadow-[0_40px_100px_-40px_rgba(0,75,87,0.4)] -translate-y-1"
                      : "border-ink/10 bg-paper hover:-translate-y-1 hover:border-ink/25"
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Picture
                      source={PERSONA_IMAGES[p.id]}
                      alt={`${p.label} — persona wearing Eyegis eyewear during ${p.hours}`}
                      sizes="(min-width:1024px) 33vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 rounded-full bg-paper/85 backdrop-blur px-3 py-1 font-eyebrow text-[9px] text-teal">
                      {p.hours}
                    </div>
                  </div>
                  <div className="p-7 flex flex-col gap-5 text-teal">
                    <div className="flex items-center justify-between font-eyebrow text-ink/50">
                      <span>{p.eyebrow}</span>
                      <PersonaIcon id={p.id} />
                    </div>
                    <h3 className="font-editorial text-ink text-2xl md:text-3xl leading-tight">
                      {p.label}
                    </h3>
                    <p className="font-light text-ink/70 leading-relaxed">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.contexts.map((cx) => (
                        <span
                          key={cx}
                          className="rounded-full border border-ink/12 px-2.5 py-0.5 font-eyebrow text-[9px] text-ink/60"
                        >
                          {cx}
                        </span>
                      ))}
                    </div>
                    <div
                      className={`mt-2 inline-flex items-center gap-3 font-eyebrow text-sm transition-colors ${
                        isActive ? "text-teal" : "text-ink/70 group-hover:text-teal"
                      }`}
                    >
                      {p.cta}
                      <span
                        className={`transition-transform duration-500 ${
                          isActive ? "translate-x-1" : "group-hover:translate-x-1"
                        }`}
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                  </div>
                  {isActive && (
                    <span className="absolute top-4 right-4 font-eyebrow text-[9px] text-teal">
                      {c.how.selected}
                    </span>
                  )}
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Interactive Comparison                                            */
/* ------------------------------------------------------------------ */

function ScoreBar({ v }: { v: number }) {
  const pct = (v / 5) * 100;
  return (
    <div className="relative h-[3px] w-full overflow-hidden bg-ink/10 rounded-full">
      <div
        className="absolute inset-y-0 left-0 bg-teal transition-[width] duration-[900ms] ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function Comparison({ c }: { c: Copy }) {
  return (
    <section id="compare" className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <Reveal>
          <span className="font-eyebrow text-teal">{c.compare.eyebrow}</span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 max-w-3xl font-editorial text-ink text-4xl md:text-6xl leading-[0.95]">
            {c.compare.h2a}
            <span className="italic text-teal">{c.compare.h2b}</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {c.lenses.map((l, i) => {
            const scores = LENS_SCORES[l.key];
            return (
              <Reveal key={l.key} delay={i * 100}>
                <article
                  className={`group h-full rounded-2xl p-8 md:p-10 flex flex-col gap-8 transition-all duration-500 ${
                    l.key === "shield"
                      ? "bg-teal-deep text-paper shadow-[0_50px_120px_-50px_rgba(0,56,66,0.55)]"
                      : "bg-paper-warm text-ink border border-ink/10 hover:-translate-y-1"
                  }`}
                >
                  <div>
                    <span
                      className={`font-eyebrow text-[10px] ${
                        l.key === "shield" ? "text-mint" : "text-teal"
                      }`}
                    >
                      {l.key === "shield" ? c.compare.mostPopular : c.compare.lensTier}
                    </span>
                    <h3
                      className={`mt-4 font-editorial text-3xl md:text-4xl leading-tight ${
                        l.key === "shield" ? "text-paper" : "text-ink"
                      }`}
                    >
                      {l.name}
                    </h3>
                    <p
                      className={`mt-3 font-light leading-relaxed ${
                        l.key === "shield" ? "text-paper/75" : "text-ink/70"
                      }`}
                    >
                      {l.tagline}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {c.compare.criteria.map((crit, idx) => (
                      <div key={crit}>
                        <div
                          className={`flex items-center justify-between font-eyebrow text-[10px] ${
                            l.key === "shield" ? "text-paper/70" : "text-ink/55"
                          }`}
                        >
                          <span>{crit}</span>
                          <span className="tabular-nums">{scores[idx]}/5</span>
                        </div>
                        <div className="mt-1.5">
                          {l.key === "shield" ? (
                            <div className="relative h-[3px] w-full overflow-hidden bg-paper/15 rounded-full">
                              <div
                                className="absolute inset-y-0 left-0 bg-mint transition-[width] duration-[900ms] ease-out"
                                style={{ width: `${(scores[idx] / 5) * 100}%` }}
                              />
                            </div>
                          ) : (
                            <ScoreBar v={scores[idx]} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div
                      className={`font-eyebrow text-[10px] ${
                        l.key === "shield" ? "text-mint" : "text-teal"
                      }`}
                    >
                      {c.compare.bestFor}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {l.bestFor.map((b) => (
                        <span
                          key={b}
                          className={`rounded-full px-2.5 py-0.5 font-eyebrow text-[9px] ${
                            l.key === "shield"
                              ? "border border-paper/25 text-paper/85"
                              : "border border-ink/15 text-ink/70"
                          }`}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                    <a
                      href={AMAZON_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-8 inline-flex items-center gap-4 rounded-full px-6 py-3.5 font-eyebrow font-semibold tracking-[0.15em] shadow-sm transition-all duration-500 ${
                        l.key === "shield"
                          ? "bg-teal-deep text-mint ring-1 ring-teal-deep/20 hover:bg-ink hover:-translate-y-0.5"
                          : "bg-ink text-paper hover:-translate-y-0.5"
                      }`}
                    >
                      {c.compare.choose}
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Visual Demonstration (before/after slider)                        */
/* ------------------------------------------------------------------ */

function BeforeAfter({ c }: { c: Copy }) {
  const [pos, setPos] = useState(52);
  const dragging = useRef(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const move = (clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = Math.max(4, Math.min(96, ((clientX - rect.left) / rect.width) * 100));
    setPos(p);
  };

  useEffect(() => {
    const up = () => (dragging.current = false);
    const mm = (e: MouseEvent) => dragging.current && move(e.clientX);
    const tm = (e: TouchEvent) =>
      dragging.current && e.touches[0] && move(e.touches[0].clientX);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    window.addEventListener("mousemove", mm);
    window.addEventListener("touchmove", tm, { passive: true });
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("touchmove", tm);
    };
  }, []);

  return (
    <section className="bg-paper-warm py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="font-eyebrow text-teal">{c.demo.eyebrow}</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-4 font-editorial text-ink text-4xl md:text-6xl leading-[0.95]">
                {c.demo.h2a}
                <span className="italic text-teal">{c.demo.h2b}</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200} className="lg:col-span-5 lg:col-start-8">
            <p className="font-light text-ink/70 leading-relaxed">{c.demo.body}</p>
          </Reveal>
        </div>

        <Reveal>
          <div
            ref={wrapRef}
            className="relative aspect-[16/9] w-full overflow-hidden rounded-md bg-ink select-none"
          >
            <Picture
              source={compareImg}
              alt={c.demo.with}
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${pos}%` }}
            >
              <Picture
                source={compareImg}
                alt={c.demo.without}
                sizes="100vw"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ filter: "saturate(1.15) contrast(1.12) hue-rotate(-8deg)" }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(120,170,255,0.28), transparent 60%)",
                  mixBlendMode: "screen",
                }}
              />
            </div>

            <div className="pointer-events-none absolute top-5 left-5 rounded-full bg-ink/60 backdrop-blur px-3 py-1 font-eyebrow text-[10px] text-paper">
              {c.demo.without}
            </div>
            <div className="pointer-events-none absolute top-5 right-5 rounded-full bg-mint/85 px-3 py-1 font-eyebrow text-[10px] text-teal-deep">
              {c.demo.with}
            </div>

            <div
              className="absolute inset-y-0 z-10 w-px bg-paper/80"
              style={{ left: `${pos}%` }}
            >
              <button
                type="button"
                onMouseDown={() => (dragging.current = true)}
                onTouchStart={() => (dragging.current = true)}
                aria-label={c.demo.drag}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-paper text-teal shadow-[0_20px_40px_-15px_rgba(0,56,66,0.4)] cursor-ew-resize"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 6l-4 6 4 6 M15 6l4 6-4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Who is it for                                                     */
/* ------------------------------------------------------------------ */

function WhoFor({ c, onPick }: { c: Copy; onPick: (id: PersonaId) => void }) {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <Reveal>
          <span className="font-eyebrow text-teal">{c.who.eyebrow}</span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 max-w-3xl font-editorial text-ink text-4xl md:text-6xl leading-[0.95]">
            {c.who.h2a}
            <span className="italic text-teal">{c.who.h2b}</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {c.who.items.map((l, i) => (
            <Reveal key={l.label} delay={i * 50}>
              <button
                type="button"
                onClick={() => onPick(l.target)}
                className="group w-full text-left rounded-xl border border-ink/10 bg-paper-warm/60 backdrop-blur-sm p-6 transition-all duration-500 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_20px_50px_-30px_rgba(0,75,87,0.35)]"
              >
                <div className="font-eyebrow text-[10px] text-teal">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-4 font-editorial text-ink text-xl leading-tight">
                  {l.label}
                </div>
                <p className="mt-2 font-light text-ink/65 leading-relaxed">
                  {l.note}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-eyebrow text-[10px] text-ink/50 transition-colors group-hover:text-teal">
                  {c.who.see}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                               */
/* ------------------------------------------------------------------ */

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-t border-ink/10">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-8 py-6 text-left"
        aria-expanded={open}
      >
        <span className="font-editorial text-ink text-xl md:text-2xl leading-snug">{q}</span>
        <span
          aria-hidden="true"
          className={`grid h-9 w-9 place-items-center rounded-full border border-ink/20 text-ink transition-transform duration-500 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-700 ease-out ${
          open ? "grid-rows-[1fr] opacity-100 pb-8" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl font-light text-ink/70 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

function Faq({ c }: { c: Copy }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-paper-warm py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <span className="font-eyebrow text-teal">{c.faq.eyebrow}</span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 font-editorial text-ink text-4xl md:text-6xl leading-[0.95]">
            {c.faq.h2a}
            <span className="italic text-teal">{c.faq.h2b}</span>
          </h2>
        </Reveal>
        <div className="mt-14">
          {c.faq.items.map((f, i) => (
            <FaqItem
              key={f.q}
              q={f.q}
              a={f.a}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
          <div className="border-t border-ink/10" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Recommended product (reacts to selected persona)                  */
/* ------------------------------------------------------------------ */

function Recommended({ c, persona }: { c: Copy; persona: PersonaCopy }) {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <Reveal>
          <span className="font-eyebrow text-teal">{c.reco.eyebrow}</span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 max-w-3xl font-editorial text-ink text-4xl md:text-6xl leading-[0.95]">
            {c.reco.h2a}
            <span className="italic text-teal">{c.reco.h2b}</span>
          </h2>
        </Reveal>

        <div
          key={persona.id}
          className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-10 rounded-2xl border border-ink/10 bg-paper-warm/60 backdrop-blur-sm p-6 md:p-10 animate-[fadeUp_700ms_cubic-bezier(0.22,1,0.36,1)_both]"
        >
          <div className="md:col-span-2 relative overflow-hidden rounded-xl bg-paper">
            <Picture
              source={PERSONA_PRODUCT_IMAGES[persona.id]}
              alt={`${persona.product.name} — recommended Eyegis eyewear for ${c.reco.eyebrow}`}
              sizes="(min-width:768px) 40vw, 100vw"
              className="h-full w-full object-cover"
              style={{ animation: "floaty 6s ease-in-out infinite" }}
            />
          </div>
          <div className="md:col-span-3 flex flex-col justify-center">
            <span className="font-eyebrow text-teal">
              {c.reco.collection} · {persona.collection}
            </span>
            <h3 className="mt-4 font-editorial text-ink text-3xl md:text-5xl leading-tight">
              {persona.product.name}
              <span className="italic text-teal"> {persona.product.line}</span>
            </h3>
            <p className="mt-4 max-w-md font-light text-ink/70 leading-relaxed">
              {persona.product.desc}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-teal/30 bg-teal/5 px-3 py-1 font-eyebrow text-[10px] text-teal">
                {c.reco.guard}
              </span>
              <span className="rounded-full border border-ink/15 px-3 py-1 font-eyebrow text-[10px] text-ink/70">
                {c.reco.comfort}
              </span>
              <span className="rounded-full border border-ink/15 px-3 py-1 font-eyebrow text-[10px] text-ink/70">
                {c.reco.warranty}
              </span>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={AMAZON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-6 rounded-full bg-teal px-6 py-4 text-paper hover:bg-teal-deep hover:-translate-y-0.5 transition-all duration-500"
              >
                <span className="font-eyebrow">{c.reco.buy}</span>
                <span aria-hidden="true">→</span>
              </a>
              <Link
                to="/product/meridian"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-ink/20 px-6 py-4 font-eyebrow text-ink hover:bg-ink hover:text-paper transition-colors duration-500"
              >
                {c.reco.learn}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floaty {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Final CTA                                                         */
/* ------------------------------------------------------------------ */

function FinalCta({ c }: { c: Copy }) {
  return (
    <section className="relative bg-teal-deep py-20 md:py-28 text-paper overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(134,217,209,0.22),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10 text-center">
        <Reveal>
          <span className="font-eyebrow text-mint">{c.cta.eyebrow}</span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-6 font-editorial text-5xl md:text-7xl lg:text-[96px] leading-[0.94]">
            {c.cta.h2a}
            <span className="block italic text-mint">{c.cta.h2b}</span>
          </h2>
        </Reveal>
        <Reveal delay={220}>
          <p className="mx-auto mt-8 max-w-xl font-light text-paper/75 leading-relaxed">
            {c.cta.body}
          </p>
        </Reveal>
        <Reveal delay={340}>
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/"
              hash="digital-eye-score"
              className="rounded-full bg-mint px-8 py-4 font-eyebrow text-teal-deep hover:-translate-y-0.5 transition-transform duration-500"
            >
              {c.cta.take}
            </Link>
            <Link
              to="/"
              hash="collections"
              className="rounded-full border border-paper/25 px-8 py-4 font-eyebrow text-paper hover:bg-paper/10 transition-colors"
            >
              {c.cta.browse}
            </Link>
            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-paper/25 px-8 py-4 font-eyebrow text-paper hover:bg-paper/10 transition-colors"
            >
              {c.cta.buy}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

function LensesPage() {
  const { lang } = useI18n();
  const c = CONTENT[lang];
  const [active, setActive] = useState<PersonaId>("creative");

  const persona = c.personas.find((p) => p.id === active) ?? c.personas[1];

  const pickAndScroll = (id: PersonaId) => {
    setActive(id);
    if (typeof window !== "undefined") {
      const el = document.getElementById("recommendation");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <MiniHeader c={c} />
      <Hero c={c} />
      <HowToChoose c={c} active={active} onPick={setActive} />
      <Comparison c={c} />
      <BeforeAfter c={c} />
      <WhoFor c={c} onPick={pickAndScroll} />
      <Faq c={c} />
      <div id="recommendation">
        <Recommended c={c} persona={persona} />
      </div>
      <FinalCta c={c} />
    </main>
  );
}
