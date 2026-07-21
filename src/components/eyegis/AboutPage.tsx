import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroImgSrc from "@/assets/about-hero-eyegis.jpg?w=768;1200;1920;2400&format=avif;webp;jpg&as=picture";
import { Picture } from "@/components/eyegis/Picture";
import whyImg1 from "@/assets/science-devices.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import whyImg2 from "@/assets/universe-lens-macro.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import philo1 from "@/assets/science-lens-exploded.jpg?w=320;480;800;1200&format=avif;webp;jpg&as=picture";
import philo2 from "@/assets/universe-eyewear.jpg?w=320;480;800;1200&format=avif;webp;jpg&as=picture";
import philo3 from "@/assets/guard-lens-float.jpg?w=320;480;800;1200&format=avif;webp;jpg&as=picture";
import life1 from "@/assets/persona-creative.jpg?w=320;480;800&format=avif;webp;jpg&as=picture";
import life2 from "@/assets/persona-executive.jpg?w=320;480;800&format=avif;webp;jpg&as=picture";
import life3 from "@/assets/life-student.jpg?w=320;480;800&format=avif;webp;jpg&as=picture";
import life4 from "@/assets/life-travel.jpg?w=320;480;800&format=avif;webp;jpg&as=picture";
import life5 from "@/assets/persona-gamer.jpg?w=320;480;800&format=avif;webp;jpg&as=picture";
import life6 from "@/assets/shipping-unboxing.jpg?w=320;480;800&format=avif;webp;jpg&as=picture";
import life7 from "@/assets/collection-women.jpg?w=320;480;800&format=avif;webp;jpg&as=picture";
import life8 from "@/assets/models-focus-eyegis.jpg?w=320;480;800&format=avif;webp;jpg&as=picture";
import peopleHeroImg from "@/assets/collection-men.jpg?w=320;480;800&format=avif;webp;jpg&as=picture";
import lifeConcierge from "@/assets/contact-concierge.jpg?w=320;480;800&format=avif;webp;jpg&as=picture";
import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";





/* ------------------------------------------------------------------ */
/*  Localized copy                                                    */
/* ------------------------------------------------------------------ */

type Copy = {
  nav: { back: string; about: string };
  hero: { eyebrow: string; h1a: string; h1b: string; sub: string; alt: string };
  belief: {
    rule: string;
    h2a: string;
    h2b: string;
    p1: string;
    p2: string;
  };
  why: {
    rule: string;
    alt1: string;
    alt2: string;
    h1: string;
    p1: string;
    h2a: string;
    h2b: string;
    p2: string;
  };
  philosophy: {
    rule: string;
    h2a: string;
    h2b: string;
    items: { idx: string; title: string; sub: string; body: string }[];
  };
  values: {
    rule: string;
    h2: string;
    items: { k: string; d: string }[];
  };
  process: {
    rule: string;
    h2a: string;
    h2b: string;
    step: string;
    items: { k: string; d: string }[];
  };
  people: {
    rule: string;
    h2a: string;
    h2b: string;
    labels: string[]; // 12 labels
  };
  global: {
    rule: string;
    h2: string;
    p: string;
  };
  promise: { rule: string; quote: string; sign: string };
  cta: {
    h1a: string;
    h1b: string;
    p: string;
    buy: string;
    collections: string;
    tech: string;
    footer: string;
    home: string;
    lenses: string;
    meridian: string;
  };
};

const CONTENT: Record<Lang, Copy> = {
  EN: {
    nav: { back: "← Eyegis", about: "About / Est. 2024" },
    hero: {
      eyebrow: "— Our Story",
      h1a: "Designed for the",
      h1b: "way we live today.",
      sub: "Eyegis was created for a generation that spends more time looking at screens than ever before. Our mission is to make digital life more comfortable — without sacrificing timeless design.",
      alt: "Eyegis campaign — couple wearing Men's Collection and Women's Collection frames",
    },
    belief: {
      rule: "01 — Our Belief",
      h2a: "Protection should never",
      h2b: "compromise style.",
      p1: "Modern life has changed. We work, study, create, communicate and play — almost entirely through digital devices. Yet the objects designed to protect our eyes still feel like an afterthought.",
      p2: "Eyegis believes visual comfort should be part of everyday life — not a medical accessory, not a gimmick. Simply a beautifully engineered object you'd want to wear anyway.",
    },
    why: {
      rule: "02 — Why We Created Eyegis",
      alt1: "Screens surround modern life",
      alt2: "Macro detail of Eyegis lens",
      h1: "Digital lifestyles have changed. Eyewear hasn't.",
      p1: "We spend eight to twelve hours a day in front of screens — phones, laptops, monitors, tablets, consoles. And still, most blue-light eyewear feels stuck in another decade.",
      h2a: "Between the lab",
      h2b: "and the object.",
      p2: "Most blue-light glasses either look overly technical — or make exaggerated promises they can't measure. Eyegis was created to bridge that gap: honest optical engineering, expressed through timeless design.",
    },
    philosophy: {
      rule: "03 — Our Philosophy",
      h2a: "Three principles.",
      h2b: "No shortcuts.",
      items: [
        { idx: "01", title: "Honest Science™", sub: "Evidence before marketing.", body: "We publish what our lenses do — and what they don't. No inflated claims, no theatrical numbers. Only measurable optical performance." },
        { idx: "02", title: "Timeless Design", sub: "Created to be worn every day.", body: "Silhouettes designed to outlast trends. Proportions studied for a decade of wear, not a season of hype." },
        { idx: "03", title: "Engineered Comfort", sub: "Technology should disappear.", body: "Ultralight TR90 frames, titanium hinges, hypoallergenic pads. When comfort is right, the frame simply fades away." },
      ],
    },
    values: {
      rule: "04 — Our Values",
      h2: "Four principles that guide every decision.",
      items: [
        { k: "Transparency", d: "Independent lab data, published openly. If we can't measure it, we don't claim it." },
        { k: "Quality", d: "Materials chosen for longevity — TR90, β-titanium, CR-39 optical resin, real hinge screws." },
        { k: "Craftsmanship", d: "Every frame is inspected by hand. Every lens is tested against ISO optical standards." },
        { k: "Human-Centered Design", d: "We design for real faces, real screens and real hours — not for a studio render." },
      ],
    },
    process: {
      rule: "05 — Design Process",
      h2a: "From first sketch",
      h2b: "to final object.",
      step: "Step",
      items: [
        { k: "Research", d: "Ergonomics, optics, dwell time." },
        { k: "Design", d: "Silhouette, proportion, weight." },
        { k: "Engineering", d: "Materials, hinges, coatings." },
        { k: "Testing", d: "Independent optical labs." },
        { k: "Refinement", d: "Iterate. Reduce. Perfect." },
        { k: "Final Product", d: "Ready for everyday life." },
      ],
    },
    people: {
      rule: "06 — The People We Design For",
      h2a: "A global community",
      h2b: "of digital lives.",
      labels: [
        "Creative Professionals", "Entrepreneurs", "Students", "Developers",
        "Architects", "Photographers", "Business Leaders", "Remote Workers",
        "Gamers", "Digital Creators", "Travelers", "Every Digital Life",
      ],
    },
    global: {
      rule: "07 — Global Vision",
      h2: "Built for the global digital generation.",
      p: "International mindset. Timeless products. Premium quality — worn from Tokyo to São Paulo, from Paris to Los Angeles.",
    },
    promise: {
      rule: "08 — Our Promise",
      quote: "\"Every pair of Eyegis glasses is designed with one simple purpose — help you enjoy your digital life more comfortably, while looking your best.\"",
      sign: "— The Eyegis Team",
    },
    cta: {
      h1a: "Ready to experience",
      h1b: "Eyegis?",
      p: "Discover the collections designed for how you actually live — or read about the engineering behind every lens.",
      buy: "Buy on Amazon",
      collections: "Explore Collections",
      tech: "Learn About Our Technology",
      footer: "Eyegis © 2026 — Designed for the digital generation.",
      home: "Home",
      lenses: "Lenses",
      meridian: "Men's Collection",
    },
  },
  PT: {
    nav: { back: "← Eyegis", about: "Sobre / Fundada em 2024" },
    hero: {
      eyebrow: "— Nossa História",
      h1a: "Feito para o",
      h1b: "modo como vivemos hoje.",
      sub: "A Eyegis foi criada para uma geração que passa mais tempo diante de telas do que nunca. Nossa missão é tornar a vida digital mais confortável — sem abrir mão de um design atemporal.",
      alt: "Campanha Eyegis — casal usando modelos Men's Collection e Women's Collection",
    },
    belief: {
      rule: "01 — Nossa Crença",
      h2a: "Proteção nunca deve",
      h2b: "comprometer o estilo.",
      p1: "A vida moderna mudou. Trabalhamos, estudamos, criamos, nos comunicamos e jogamos — quase inteiramente por meio de dispositivos digitais. Ainda assim, os objetos feitos para proteger nossos olhos parecem um detalhe secundário.",
      p2: "A Eyegis acredita que conforto visual deve fazer parte do dia a dia — não um acessório médico, nem um truque. Apenas um objeto bem projetado que você quer usar de qualquer forma.",
    },
    why: {
      rule: "02 — Por que criamos a Eyegis",
      alt1: "Telas cercam a vida moderna",
      alt2: "Detalhe macro de uma lente Eyegis",
      h1: "Estilos de vida digitais mudaram. Os óculos, não.",
      p1: "Passamos de oito a doze horas por dia em frente a telas — celulares, notebooks, monitores, tablets, consoles. Mesmo assim, a maioria dos óculos de luz azul parece presa em outra década.",
      h2a: "Entre o laboratório",
      h2b: "e o objeto.",
      p2: "A maior parte dos óculos de luz azul parece técnica demais — ou faz promessas exageradas que não conseguem mensurar. A Eyegis nasceu para preencher essa lacuna: engenharia óptica honesta, expressa em design atemporal.",
    },
    philosophy: {
      rule: "03 — Nossa Filosofia",
      h2a: "Três princípios.",
      h2b: "Sem atalhos.",
      items: [
        { idx: "01", title: "Honest Science™", sub: "Evidência antes do marketing.", body: "Publicamos o que nossas lentes fazem — e o que não fazem. Sem promessas infladas, sem números teatrais. Apenas performance óptica mensurável." },
        { idx: "02", title: "Design Atemporal", sub: "Criado para uso diário.", body: "Silhuetas pensadas para durar além das tendências. Proporções estudadas para uma década de uso, não uma temporada de hype." },
        { idx: "03", title: "Conforto de Engenharia", sub: "A tecnologia deve desaparecer.", body: "Armações ultraleves em TR90, dobradiças de titânio, apoios hipoalergênicos. Quando o conforto está certo, a armação simplesmente desaparece." },
      ],
    },
    values: {
      rule: "04 — Nossos Valores",
      h2: "Quatro princípios que guiam toda decisão.",
      items: [
        { k: "Transparência", d: "Dados de laboratório independente, publicados abertamente. Se não conseguimos medir, não afirmamos." },
        { k: "Qualidade", d: "Materiais escolhidos para durar — TR90, β-titânio, resina óptica CR-39, parafusos reais nas dobradiças." },
        { k: "Ofício", d: "Cada armação é inspecionada à mão. Cada lente é testada contra padrões ópticos ISO." },
        { k: "Design Centrado nas Pessoas", d: "Projetamos para rostos reais, telas reais e horas reais — não para um render de estúdio." },
      ],
    },
    process: {
      rule: "05 — Processo de Design",
      h2a: "Do primeiro esboço",
      h2b: "ao objeto final.",
      step: "Etapa",
      items: [
        { k: "Pesquisa", d: "Ergonomia, óptica, tempo de uso." },
        { k: "Design", d: "Silhueta, proporção, peso." },
        { k: "Engenharia", d: "Materiais, dobradiças, tratamentos." },
        { k: "Testes", d: "Laboratórios ópticos independentes." },
        { k: "Refinamento", d: "Iterar. Reduzir. Aperfeiçoar." },
        { k: "Produto Final", d: "Pronto para o dia a dia." },
      ],
    },
    people: {
      rule: "06 — Para quem projetamos",
      h2a: "Uma comunidade global",
      h2b: "de vidas digitais.",
      labels: [
        "Profissionais Criativos", "Empreendedores", "Estudantes", "Desenvolvedores",
        "Arquitetos", "Fotógrafos", "Líderes de Negócio", "Trabalho Remoto",
        "Gamers", "Criadores Digitais", "Viajantes", "Toda Vida Digital",
      ],
    },
    global: {
      rule: "07 — Visão Global",
      h2: "Feita para a geração digital global.",
      p: "Mentalidade internacional. Produtos atemporais. Qualidade premium — usada de Tóquio a São Paulo, de Paris a Los Angeles.",
    },
    promise: {
      rule: "08 — Nossa Promessa",
      quote: "\"Cada par de óculos Eyegis é projetado com um único propósito — ajudar você a aproveitar sua vida digital com mais conforto, sempre com o seu melhor visual.\"",
      sign: "— A Equipe Eyegis",
    },
    cta: {
      h1a: "Pronto para viver",
      h1b: "a Eyegis?",
      p: "Descubra as coleções pensadas para o modo como você realmente vive — ou conheça a engenharia por trás de cada lente.",
      buy: "Comprar na Amazon",
      collections: "Ver Coleções",
      tech: "Conhecer a Tecnologia",
      footer: "Eyegis © 2026 — Feita para a geração digital.",
      home: "Início",
      lenses: "Lentes",
      meridian: "Men's Collection",
    },
  },
  FR: {
    nav: { back: "← Eyegis", about: "À propos / Créée en 2024" },
    hero: {
      eyebrow: "— Notre Histoire",
      h1a: "Pensée pour la",
      h1b: "vie que nous vivons aujourd'hui.",
      sub: "Eyegis a été créée pour une génération qui passe plus de temps devant les écrans que jamais. Notre mission : rendre la vie numérique plus confortable, sans jamais sacrifier un design intemporel.",
      alt: "Campagne Eyegis — couple portant les modèles Men's Collection et Women's Collection",
    },
    belief: {
      rule: "01 — Notre Conviction",
      h2a: "La protection ne doit jamais",
      h2b: "compromettre le style.",
      p1: "La vie moderne a changé. Nous travaillons, étudions, créons, communiquons et jouons — presque entièrement via des appareils numériques. Pourtant, les objets censés protéger nos yeux ressemblent encore à un détail secondaire.",
      p2: "Eyegis pense que le confort visuel doit faire partie de la vie quotidienne — pas un accessoire médical, pas un gadget. Simplement un objet magnifiquement conçu, que l'on a envie de porter.",
    },
    why: {
      rule: "02 — Pourquoi nous avons créé Eyegis",
      alt1: "Les écrans entourent la vie moderne",
      alt2: "Détail macro d'un verre Eyegis",
      h1: "Les vies numériques ont changé. Pas les lunettes.",
      p1: "Nous passons huit à douze heures par jour devant des écrans — téléphones, ordinateurs, moniteurs, tablettes, consoles. Et pourtant, la plupart des lunettes anti-lumière bleue semblent figées dans une autre décennie.",
      h2a: "Entre le laboratoire",
      h2b: "et l'objet.",
      p2: "La plupart des lunettes anti-lumière bleue paraissent trop techniques — ou multiplient les promesses invérifiables. Eyegis a été créée pour combler ce fossé : une ingénierie optique honnête, portée par un design intemporel.",
    },
    philosophy: {
      rule: "03 — Notre Philosophie",
      h2a: "Trois principes.",
      h2b: "Aucun raccourci.",
      items: [
        { idx: "01", title: "Honest Science™", sub: "La preuve avant le marketing.", body: "Nous publions ce que font nos verres — et ce qu'ils ne font pas. Aucune promesse gonflée, aucun chiffre théâtral. Seulement des performances optiques mesurables." },
        { idx: "02", title: "Design intemporel", sub: "Conçu pour être porté chaque jour.", body: "Des silhouettes pensées pour survivre aux tendances. Des proportions étudiées pour une décennie d'usage, pas une saison de hype." },
        { idx: "03", title: "Confort d'ingénierie", sub: "La technologie doit disparaître.", body: "Montures TR90 ultra-légères, charnières en titane, plaquettes hypoallergéniques. Quand le confort est juste, la monture s'efface." },
      ],
    },
    values: {
      rule: "04 — Nos Valeurs",
      h2: "Quatre principes qui guident chaque décision.",
      items: [
        { k: "Transparence", d: "Données de laboratoire indépendantes, publiées ouvertement. Si nous ne pouvons pas le mesurer, nous ne le prétendons pas." },
        { k: "Qualité", d: "Matériaux choisis pour durer — TR90, β-titane, résine optique CR-39, vraies vis de charnière." },
        { k: "Savoir-faire", d: "Chaque monture est inspectée à la main. Chaque verre est testé selon les normes optiques ISO." },
        { k: "Design centré humain", d: "Nous concevons pour de vrais visages, de vrais écrans et de vraies heures — pas pour un rendu de studio." },
      ],
    },
    process: {
      rule: "05 — Processus de Design",
      h2a: "Du premier croquis",
      h2b: "à l'objet final.",
      step: "Étape",
      items: [
        { k: "Recherche", d: "Ergonomie, optique, temps d'usage." },
        { k: "Design", d: "Silhouette, proportion, poids." },
        { k: "Ingénierie", d: "Matériaux, charnières, traitements." },
        { k: "Tests", d: "Laboratoires optiques indépendants." },
        { k: "Affinage", d: "Itérer. Réduire. Perfectionner." },
        { k: "Produit final", d: "Prêt pour la vie quotidienne." },
      ],
    },
    people: {
      rule: "06 — Ceux pour qui nous concevons",
      h2a: "Une communauté mondiale",
      h2b: "de vies numériques.",
      labels: [
        "Professionnels créatifs", "Entrepreneurs", "Étudiants", "Développeurs",
        "Architectes", "Photographes", "Dirigeants", "Télétravailleurs",
        "Gamers", "Créateurs numériques", "Voyageurs", "Toute vie numérique",
      ],
    },
    global: {
      rule: "07 — Vision globale",
      h2: "Conçue pour la génération numérique mondiale.",
      p: "Esprit international. Produits intemporels. Qualité premium — portée de Tokyo à São Paulo, de Paris à Los Angeles.",
    },
    promise: {
      rule: "08 — Notre Promesse",
      quote: "« Chaque paire Eyegis est conçue dans un seul but — vous aider à profiter plus confortablement de votre vie numérique, tout en étant à votre avantage. »",
      sign: "— L'équipe Eyegis",
    },
    cta: {
      h1a: "Prêt à découvrir",
      h1b: "Eyegis ?",
      p: "Découvrez les collections pensées pour votre vraie vie — ou plongez dans l'ingénierie derrière chaque verre.",
      buy: "Acheter sur Amazon",
      collections: "Voir les Collections",
      tech: "Découvrir notre Technologie",
      footer: "Eyegis © 2026 — Pensée pour la génération numérique.",
      home: "Accueil",
      lenses: "Verres",
      meridian: "Men's Collection",
    },
  },
};

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(true);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Reveal({
  children,
  delay = 0,
  y = 24,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  as?: any;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

// Brand palette tokens (mirror of --paper / --champagne / --ink / --teal in src/styles.css).
// Kept as local constants because this page uses inline style() heavily for
// section-scoped backgrounds; values MUST match the design system.
const OFFWHITE = "#F9F9F9";   // --paper
const CHAMPAGNE = "#E2D1C3";  // --champagne
const INK = "#1D252D";        // --ink
const TEAL = "#004B57";       // --teal
const MUTED = "#4A4438";

function Rule({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-10" style={{ background: INK }} />
      <span
        className="text-[10px] uppercase tracking-[0.35em]"
        style={{ color: INK, fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

const PEOPLE_IMAGES = [life1, life2, life3, life6, peopleHeroImg, life4, life8, life7, life5, lifeConcierge, whyImg2, whyImg1];

export function AboutPage() {
  const { lang } = useI18n();
  const c = CONTENT[lang];
  const serif = "'Cormorant Garamond', 'Times New Roman', serif";
  const sans = "'Inter', system-ui, sans-serif";

  return (
    <main
      style={{
        background: OFFWHITE,
        color: INK,
        fontFamily: sans,
      }}
    >
      {/* HERO */}
      <section className="relative min-h-[78vh] w-full overflow-hidden" style={{ background: "#0E1613" }}>
        <div className="absolute inset-0">
          <Picture
            source={heroImgSrc}
            alt={c.hero.alt}
            sizes="100vw"
            className="h-full w-full object-cover"
            style={{ filter: "saturate(0.95) contrast(1.05) brightness(0.9)" }}
          />
          {/* Left-to-right dark scrim for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,16,14,0.82) 0%, rgba(10,16,14,0.65) 38%, rgba(10,16,14,0.25) 65%, rgba(10,16,14,0.05) 100%)",
            }}
          />
          {/* Subtle bottom fade into page background */}
          <div
            className="absolute inset-x-0 bottom-0 h-32"
            style={{
              background:
                "linear-gradient(180deg, rgba(246,243,238,0) 0%, rgba(246,243,238,0.9) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-[1400px] flex-col justify-between px-6 py-10 md:px-12 md:py-14">
          <div className="max-w-[760px]">
            <Reveal>
              <span
                className="text-[11px] uppercase tracking-[0.5em]"
                style={{ color: "#E8D9B8" }}
              >
                {c.hero.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h1
                className="mt-6 text-[44px] leading-[0.98] tracking-[-0.02em] md:text-[88px] lg:text-[108px]"
                style={{ fontFamily: serif, color: "#F6F3EE", fontWeight: 400, textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
              >
                {c.hero.h1a}
                <br />
                {c.hero.h1b}
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p
                className="mt-8 max-w-2xl text-[15px] leading-[1.7] md:text-[17px]"
                style={{ color: "rgba(246,243,238,0.92)" }}
              >
                {c.hero.sub}
              </p>
            </Reveal>
          </div>
        </div>
      </section>


      {/* 01 — OUR BELIEF */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label={c.belief.rule} />
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="mt-10 max-w-[1200px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[76px] lg:text-[96px]"
            style={{ fontFamily: serif, fontWeight: 400 }}
          >
            {c.belief.h2a}
            <br />
            {c.belief.h2b}
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <Reveal delay={120} className="md:col-span-5">
            <p className="text-[15px] leading-[1.85]" style={{ color: MUTED }}>
              {c.belief.p1}
            </p>
          </Reveal>
          <Reveal delay={220} className="md:col-span-5 md:col-start-8">
            <p className="text-[15px] leading-[1.85]" style={{ color: MUTED }}>
              {c.belief.p2}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 02 — WHY WE CREATED EYEGIS */}
      <section style={{ background: CHAMPAGNE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <Rule label={c.why.rule} />
          </Reveal>

          <div className="mt-20 grid items-center gap-16 md:grid-cols-12">
            <Reveal className="md:col-span-6">
              <Picture
                source={whyImg1}
                alt={c.why.alt1}
                sizes="(min-width:768px) 50vw, 100vw"
                className="h-[70vh] w-full object-cover"
              />
            </Reveal>
            <div className="md:col-span-5 md:col-start-8">
              <Reveal delay={120}>
                <h3
                  className="text-[32px] leading-[1.05] tracking-[-0.01em] md:text-[56px]"
                  style={{ fontFamily: serif, fontWeight: 400 }}
                >
                  {c.why.h1}
                </h3>
              </Reveal>
              <Reveal delay={220}>
                <p className="mt-8 text-[15px] leading-[1.85]" style={{ color: MUTED }}>
                  {c.why.p1}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-32 grid items-center gap-16 md:grid-cols-12">
            <div className="md:col-span-5 md:order-1 order-2">
              <Reveal delay={120}>
                <h3
                  className="text-[32px] leading-[1.05] tracking-[-0.01em] md:text-[56px]"
                  style={{ fontFamily: serif, fontWeight: 400 }}
                >
                  {c.why.h2a}
                  <br />
                  {c.why.h2b}
                </h3>
              </Reveal>
              <Reveal delay={220}>
                <p className="mt-8 text-[15px] leading-[1.85]" style={{ color: MUTED }}>
                  {c.why.p2}
                </p>
              </Reveal>
            </div>
            <Reveal className="md:col-span-6 md:col-start-7 md:order-2 order-1">
              <Picture
                source={whyImg2}
                alt={c.why.alt2}
                sizes="(min-width:768px) 50vw, 100vw"
                className="h-[70vh] w-full object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 — OUR PHILOSOPHY */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label={c.philosophy.rule} />
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="mt-10 max-w-[1000px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[68px]"
            style={{ fontFamily: serif, fontWeight: 400 }}
          >
            {c.philosophy.h2a}
            <br />
            {c.philosophy.h2b}
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {c.philosophy.items.map((p, i) => {
            const imgs = [philo1, philo2, philo3];
            return (
              <Reveal key={p.idx} delay={i * 120}>
                <article className="group flex h-full flex-col">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Picture
                      source={imgs[i]}
                      alt={`${p.title} — Eyegis philosophy portrait`}
                      sizes="(min-width:768px) 33vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-8">
                    <span
                      className="text-[10px] uppercase tracking-[0.4em]"
                      style={{ color: MUTED }}
                    >
                      {p.idx}
                    </span>
                    <h3
                      className="mt-4 text-[34px] leading-[1.05] tracking-[-0.01em] md:text-[42px]"
                      style={{ fontFamily: serif, fontWeight: 400 }}
                    >
                      {p.title}
                    </h3>
                    <p
                      className="mt-3 text-[13px] uppercase tracking-[0.2em]"
                      style={{ color: TEAL }}
                    >
                      {p.sub}
                    </p>
                    <p
                      className="mt-6 text-[14px] leading-[1.8]"
                      style={{ color: MUTED }}
                    >
                      {p.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 04 — OUR VALUES */}
      <section style={{ background: INK, color: OFFWHITE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10" style={{ background: OFFWHITE }} />
              <span
                className="text-[10px] uppercase tracking-[0.35em]"
                style={{ color: OFFWHITE }}
              >
                {c.values.rule}
              </span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="mt-10 max-w-[1100px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[76px]"
              style={{ fontFamily: serif, fontWeight: 400, color: OFFWHITE }}
            >
              {c.values.h2}
            </h2>
          </Reveal>

          <div className="mt-24 grid gap-px" style={{ background: "rgba(246,243,238,0.15)" }}>
            <div className="grid gap-px md:grid-cols-2" style={{ background: "rgba(246,243,238,0.15)" }}>
              {c.values.items.map((v, i) => (
                <Reveal key={v.k} delay={i * 100}>
                  <div
                    className="flex min-h-[280px] flex-col justify-between p-10 md:min-h-[360px] md:p-16"
                    style={{ background: INK }}
                  >
                    <span
                      className="text-[10px] uppercase tracking-[0.4em]"
                      style={{ color: "rgba(246,243,238,0.55)" }}
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <h3
                        className="text-[36px] leading-[1] tracking-[-0.01em] md:text-[54px]"
                        style={{ fontFamily: serif, fontWeight: 400 }}
                      >
                        {v.k}
                      </h3>
                      <p
                        className="mt-6 max-w-md text-[14px] leading-[1.8]"
                        style={{ color: "rgba(246,243,238,0.7)" }}
                      >
                        {v.d}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 05 — DESIGN PROCESS */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label={c.process.rule} />
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="mt-10 max-w-[1000px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[68px]"
            style={{ fontFamily: serif, fontWeight: 400 }}
          >
            {c.process.h2a}
            <br />
            {c.process.h2b}
          </h2>
        </Reveal>

        <div className="mt-20 md:mt-28">
          <div className="grid gap-0 md:grid-cols-6">
            {c.process.items.map((s, i) => (
              <Reveal key={s.k} delay={i * 120}>
                <div className="relative border-t px-2 py-8 md:border-t-0 md:border-l md:px-6 md:py-0" style={{ borderColor: "rgba(14,22,19,0.15)" }}>
                  <div className="hidden md:block">
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: TEAL }}
                      />
                      <span
                        className="text-[10px] uppercase tracking-[0.35em]"
                        style={{ color: MUTED }}
                      >
                        {c.process.step} 0{i + 1}
                      </span>
                    </div>
                    <h3
                      className="mt-10 text-[28px] leading-[1]"
                      style={{ fontFamily: serif, fontWeight: 400 }}
                    >
                      {s.k}
                    </h3>
                    <p className="mt-4 text-[13px] leading-[1.7]" style={{ color: MUTED }}>
                      {s.d}
                    </p>
                  </div>
                  <div className="md:hidden">
                    <div className="flex items-baseline justify-between">
                      <h3
                        className="text-[28px] leading-[1]"
                        style={{ fontFamily: serif, fontWeight: 400 }}
                      >
                        {s.k}
                      </h3>
                      <span
                        className="text-[10px] uppercase tracking-[0.35em]"
                        style={{ color: MUTED }}
                      >
                        0{i + 1}
                      </span>
                    </div>
                    <p className="mt-3 text-[13px] leading-[1.7]" style={{ color: MUTED }}>
                      {s.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — THE PEOPLE WE DESIGN FOR */}
      <section style={{ background: CHAMPAGNE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <Rule label={c.people.rule} />
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="mt-10 max-w-[1100px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[72px]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              {c.people.h2a}
              <br />
              {c.people.h2b}
            </h2>
          </Reveal>

          <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {c.people.labels.map((label, i) => (
              <Reveal key={label} delay={(i % 4) * 100}>
                <figure className="group relative overflow-hidden">
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <Picture
                      source={PEOPLE_IMAGES[i]}
                      alt={`${label} wearing Eyegis eyewear`}
                      sizes="(min-width:768px) 25vw, 50vw"
                      className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <figcaption
                    className="mt-3 text-[11px] uppercase tracking-[0.3em]"
                    style={{ color: INK }}
                  >
                    {label}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — GLOBAL VISION */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label={c.global.rule} />
        </Reveal>
        <div className="mt-16 grid items-center gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal delay={100}>
              <h2
                className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[64px]"
                style={{ fontFamily: serif, fontWeight: 400 }}
              >
                {c.global.h2}
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-md text-[15px] leading-[1.85]" style={{ color: MUTED }}>
                {c.global.p}
              </p>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: INK }}>
                <span>Paris</span>
                <span>Tokyo</span>
                <span>New York</span>
                <span>Milan</span>
                <span>São Paulo</span>
                <span>London</span>
                <span>Seoul</span>
                <span>Berlin</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="md:col-span-7">
            <WorldMap />
          </Reveal>
        </div>
      </section>

      {/* 08 — OUR PROMISE */}
      <section style={{ background: TEAL, color: OFFWHITE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 md:py-52">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10" style={{ background: OFFWHITE }} />
              <span className="text-[10px] uppercase tracking-[0.35em]">{c.promise.rule}</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <blockquote
              className="mt-14 max-w-[1200px] text-[32px] leading-[1.15] tracking-[-0.01em] md:text-[64px] lg:text-[80px]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              {c.promise.quote}
            </blockquote>
          </Reveal>
          <Reveal delay={240}>
            <div
              className="mt-16 text-[11px] uppercase tracking-[0.4em]"
              style={{ color: "rgba(246,243,238,0.7)" }}
            >
              {c.promise.sign}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <div className="grid gap-16 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <h2
              className="text-[40px] leading-[1.02] tracking-[-0.02em] md:text-[88px]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              {c.cta.h1a}
              <br />
              {c.cta.h1b}
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-5">
            <p className="text-[14px] leading-[1.8]" style={{ color: MUTED }}>
              {c.cta.p}
            </p>
            <div className="mt-10 flex flex-col gap-3">
              <a
                href="https://www.amazon.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-8 py-5 text-[12px] font-medium uppercase tracking-[0.3em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB300] hover:bg-[#1F2A26]"
                style={{ background: INK, color: OFFWHITE }}
              >
                <span>{c.cta.buy}</span>
                <span aria-hidden>↗</span>
              </a>
              <Link
                to="/"
                hash="collections"
                className="inline-flex items-center justify-between border-2 px-8 py-5 text-[12px] font-medium uppercase tracking-[0.3em] transition-colors hover:bg-[rgba(14,22,19,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB300]"
                style={{ borderColor: INK, color: INK }}
              >
                <span>{c.cta.collections}</span>
                <span aria-hidden>→</span>
              </Link>
              <Link
                to="/lenses"
                className="inline-flex items-center justify-between border-2 px-8 py-5 text-[12px] font-medium uppercase tracking-[0.3em] transition-colors hover:bg-[rgba(14,22,19,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB300]"
                style={{ borderColor: "rgba(14,22,19,0.6)", color: INK }}
              >
                <span>{c.cta.tech}</span>
                <span aria-hidden>→</span>
              </Link>

            </div>
          </Reveal>
        </div>

        <div
          className="mt-32 flex flex-col items-start justify-between gap-6 border-t pt-10 md:flex-row md:items-center"
          style={{ borderColor: "rgba(14,22,19,0.15)" }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.4em]"
            style={{ color: MUTED }}
          >
            {c.cta.footer}
          </span>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[10px] uppercase tracking-[0.4em]">
            {[
              { to: "/", label: c.cta.home },
              { to: "/lenses", label: c.cta.lenses },
              { to: "/product/meridian", label: c.cta.meridian },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="underline decoration-[rgba(14,22,19,0.3)] decoration-1 underline-offset-[6px] transition-colors hover:decoration-[color:var(--ink,#0E1613)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB300]"
                style={{ color: INK }}
              >
                {l.label}
              </Link>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}

function WorldMap() {
  const cities = [
    { x: 205, y: 165, name: "New York" },
    { x: 235, y: 260, name: "São Paulo" },
    { x: 430, y: 150, name: "Paris" },
    { x: 445, y: 165, name: "Milan" },
    { x: 425, y: 138, name: "London" },
    { x: 470, y: 155, name: "Berlin" },
    { x: 685, y: 175, name: "Tokyo" },
    { x: 665, y: 185, name: "Seoul" },
  ];
  const dots: { x: number; y: number }[] = [];
  const seed = (x: number, y: number) => Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
  for (let y = 40; y < 320; y += 10) {
    for (let x = 40; x < 800; x += 10) {
      const nx = (x - 420) / 380;
      const ny = (y - 180) / 140;
      const r = nx * nx + ny * ny * 1.35;
      if (r < 0.95 && seed(x, y) > 0.55) dots.push({ x, y });
    }
  }
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 840 360" className="w-full">
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={1.1}
            fill="rgba(14,22,19,0.28)"
          />
        ))}
        {cities.map((city, i) => (
          <g key={city.name}>
            <circle cx={city.x} cy={city.y} r={4} fill={TEAL} />
            <circle cx={city.x} cy={city.y} r={4} fill={TEAL}>
              <animate
                attributeName="r"
                values="4;14;4"
                dur="3.2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.5;0;0.5"
                dur="3.2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
            <text
              x={city.x + 10}
              y={city.y + 4}
              fontSize="9"
              fill={INK}
              style={{ letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}
            >
              {city.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

