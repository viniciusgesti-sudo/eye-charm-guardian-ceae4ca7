import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { useEffect, useRef, useState } from "react";

import heroImg from "@/assets/product-hero.jpg?w=768;1200;1920;2400&format=avif;webp;jpg&as=picture";
import qualityImg from "@/assets/science-lens-exploded.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import promiseImg from "@/assets/universe-eyewear.jpg?w=768;1200;1920;2400&format=avif;webp;jpg&as=picture";
import { Picture } from "@/components/eyegis/Picture";
import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

export const Route = createFileRoute("/warranty")({
  head: () => ({
    meta: [
      { title: "Warranty & 60-Day Comfort Guarantee — Eyegis" },
      {
        name: "description",
        content:
          "Every pair of Eyegis is backed by a 2-Year Manufacturing Warranty and an exclusive 60-Day Comfort Guarantee. Designed to last, backed with confidence.",
      },
      { property: "og:title", content: "Warranty & 60-Day Comfort Guarantee — Eyegis" },
      {
        property: "og:description",
        content:
          "Premium engineering. 2-Year Warranty. 60-Day Comfort Guarantee. Buy Eyegis with complete confidence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WarrantyPage,
});

const OFFWHITE = "#F6F3EE";
const CHAMPAGNE = "#E9DFCC";
const INK = "#0E1613";
const TEAL = "#0C3B39";
const MUTED = "#6B6559";

type WarrantyCopy = {
  nav: { back: string; tag: string };
  hero: {
    kicker: string;
    title: [string, string];
    lead: string;
    badges: [string, string, string];
  };
  promise: {
    rule: string;
    title: [string, string];
    lead: string;
    stats: { yr: string; yrLabel: string; day: string; dayLabel: string };
  };
  warranty: {
    rule: string;
    title: string;
    lead: string;
    covered: { k: string; d: string }[];
  };
  notCovered: {
    rule: string;
    title: string;
    lead: string;
    items: string[];
  };
  comfort: {
    rule: string;
    title: [string, string];
    lead: string;
    disclaimer: string;
    cta: string;
  };
  qc: {
    rule: string;
    title: [string, string];
    lead: string;
    steps: { k: string; d: string }[];
    stepLabel: (n: number) => string;
  };
  care: {
    rule: string;
    title: [string, string];
    items: { k: string; d: string }[];
  };
  help: {
    rule: string;
    title: string;
    lead: string;
    tiles: { k: string; d: string; href: string }[];
    openLabel: string;
    tileIndex: (n: number) => string;
  };
  cta: {
    title: [string, string];
    lead: string;
    amazon: string;
    collections: string;
    footer: string;
    home: string;
    lenses: string;
    about: string;
  };
};

const CONTENT: Record<Lang, WarrantyCopy> = {
  EN: {
    nav: { back: "← Eyegis", tag: "Warranty & Care" },
    hero: {
      kicker: "— Ownership",
      title: ["Designed to last.", "Backed with confidence."],
      lead:
        "Every pair of Eyegis glasses is engineered with premium materials and backed by a comprehensive warranty and comfort guarantee.",
      badges: ["2-Year Warranty", "60-Day Comfort Guarantee", "Individually Inspected"],
    },
    promise: {
      rule: "01 — Our Promise",
      title: ["Confidence begins", "before your first wear."],
      lead:
        "Every Eyegis frame is covered by a 2-Year Manufacturing Warranty and our exclusive 60-Day Comfort Guarantee — a commitment to the object you wear every day.",
      stats: { yr: "2 yr", yrLabel: "Manufacturing Warranty", day: "60 d", dayLabel: "Comfort Guarantee" },
    },
    warranty: {
      rule: "02 — 2-Year Warranty",
      title: "What's covered.",
      lead:
        "Two years of coverage from the date of purchase against defects in materials and workmanship — verified with proof of purchase from Amazon or an authorized retailer.",
      covered: [
        { k: "Manufacturing defects", d: "Any defect arising from our production process." },
        { k: "Frame construction", d: "Structural integrity of the frame body." },
        { k: "Hinges", d: "Titanium hinge assembly and screw fittings." },
        { k: "Material defects", d: "TR90, β-titanium and acetate irregularities." },
        { k: "Lens manufacturing", d: "Coating adhesion and optical clarity defects." },
        { k: "Craftsmanship", d: "Assembly, alignment and finishing issues." },
      ],
    },
    notCovered: {
      rule: "03 — Outside the Warranty",
      title: "Wear is part of the story.",
      lead:
        "A few situations sit outside our warranty. Our care team is happy to help with replacement parts or paid repairs for any of the following.",
      items: [
        "Accidental damage",
        "Drops",
        "Crushing",
        "Normal scratches",
        "Improper cleaning",
        "Heat exposure",
        "Unauthorized modifications",
      ],
    },
    comfort: {
      rule: "04 — 60-Day Comfort Guarantee",
      title: ["Comfort should never", "be a gamble."],
      lead:
        "If you don't experience the visual comfort you expect from Eyegis, our team will work directly with you to find the best solution — whether that's a fit adjustment, a different collection, or a full resolution through Amazon.",
      disclaimer: "A customer satisfaction commitment. Not a medical guarantee.",
      cta: "Reach the Care Team",
    },
    qc: {
      rule: "05 — Quality Control",
      title: ["Five checkpoints.", "Every single pair."],
      lead:
        "Before an Eyegis frame is boxed, it passes through a five-stage inspection process — each stage signed off by a real person, not a scanner.",
      steps: [
        { k: "Lens Inspection", d: "Optical clarity, coating uniformity, blue-light filtration verified." },
        { k: "Frame Inspection", d: "Material integrity, weight tolerance, finish quality." },
        { k: "Assembly Verification", d: "Hinge torque, alignment, screw seating." },
        { k: "Comfort Inspection", d: "Weight balance, nose-pad geometry, temple curvature." },
        { k: "Final Quality Approval", d: "Individually signed off before packaging." },
      ],
      stepLabel: (n) => `Step 0${n}`,
    },
    care: {
      rule: "06 — Care Guide",
      title: ["Small rituals.", "A frame that lasts."],
      items: [
        { k: "Cleaning", d: "Use only the microfiber cloth and lens spray supplied. Avoid alcohol and household glass cleaners." },
        { k: "Storage", d: "Return your Eyegis to its hardshell case whenever they're not on your face." },
        { k: "Travel", d: "Never leave your frames in a hot car or in direct sunlight for long periods." },
        { k: "Daily use", d: "Remove your glasses with both hands to protect hinge alignment." },
        { k: "Headset compatibility", d: "Slim TR90 temples designed to sit comfortably under most gaming and audio headsets." },
      ],
    },
    help: {
      rule: "07 — Need Help",
      title: "A team, not a form.",
      lead: "Real people, responding within one business day. Choose the channel that suits you.",
      tiles: [
        { k: "Contact Support", d: "care@eyegis.com", href: "mailto:care@eyegis.com" },
        { k: "Shipping & Returns", d: "Managed by Amazon", href: "https://www.amazon.com/gp/help/customer/display.html" },
        { k: "Amazon Orders", d: "Track & return orders", href: "https://www.amazon.com/gp/your-account/order-history" },
        { k: "FAQ", d: "Answers on lenses, fit & care", href: "/lenses" },
      ],
      openLabel: "Open →",
      tileIndex: (n) => `0${n}`,
    },
    cta: {
      title: ["Buy with", "confidence."],
      lead: "Every pair is protected by our 2-Year Warranty and 60-Day Comfort Guarantee.",
      amazon: "Buy on Amazon",
      collections: "Explore Collections",
      footer: "Eyegis © 2026 — Warranty & Care",
      home: "Home",
      lenses: "Lenses",
      about: "About",
    },
  },
  PT: {
    nav: { back: "← Eyegis", tag: "Garantia & Cuidados" },
    hero: {
      kicker: "— Propriedade",
      title: ["Feito para durar.", "Respaldado com confiança."],
      lead:
        "Cada par de óculos Eyegis é projetado com materiais premium e respaldado por uma garantia abrangente e uma garantia de conforto.",
      badges: ["Garantia de 2 Anos", "Garantia de Conforto de 60 Dias", "Inspecionado Individualmente"],
    },
    promise: {
      rule: "01 — Nosso Compromisso",
      title: ["A confiança começa", "antes do primeiro uso."],
      lead:
        "Cada armação Eyegis é coberta por uma Garantia de Fabricação de 2 Anos e nossa Garantia exclusiva de Conforto de 60 Dias — um compromisso com o objeto que você usa todos os dias.",
      stats: { yr: "2 anos", yrLabel: "Garantia de Fabricação", day: "60 dias", dayLabel: "Garantia de Conforto" },
    },
    warranty: {
      rule: "02 — Garantia de 2 Anos",
      title: "O que está coberto.",
      lead:
        "Dois anos de cobertura a partir da data de compra contra defeitos de materiais e fabricação — verificado com comprovante de compra da Amazon ou revendedor autorizado.",
      covered: [
        { k: "Defeitos de fabricação", d: "Qualquer defeito originado do nosso processo de produção." },
        { k: "Construção da armação", d: "Integridade estrutural do corpo da armação." },
        { k: "Dobradiças", d: "Conjunto de dobradiças de titânio e parafusos." },
        { k: "Defeitos de material", d: "Irregularidades em TR90, β-titânio e acetato." },
        { k: "Fabricação das lentes", d: "Defeitos de adesão do revestimento e clareza óptica." },
        { k: "Acabamento", d: "Questões de montagem, alinhamento e acabamento." },
      ],
    },
    notCovered: {
      rule: "03 — Fora da Garantia",
      title: "O uso faz parte da história.",
      lead:
        "Algumas situações ficam fora da nossa garantia. Nossa equipe de atendimento terá prazer em ajudar com peças de reposição ou reparos pagos para qualquer uma das seguintes.",
      items: [
        "Danos acidentais",
        "Quedas",
        "Amassamento",
        "Riscos normais",
        "Limpeza inadequada",
        "Exposição ao calor",
        "Modificações não autorizadas",
      ],
    },
    comfort: {
      rule: "04 — Garantia de Conforto de 60 Dias",
      title: ["O conforto nunca deve", "ser uma aposta."],
      lead:
        "Se você não sentir o conforto visual que espera do Eyegis, nossa equipe trabalhará diretamente com você para encontrar a melhor solução — seja um ajuste, uma coleção diferente ou uma resolução completa pela Amazon.",
      disclaimer: "Um compromisso de satisfação do cliente. Não é uma garantia médica.",
      cta: "Falar com o Atendimento",
    },
    qc: {
      rule: "05 — Controle de Qualidade",
      title: ["Cinco verificações.", "Cada par."],
      lead:
        "Antes de uma armação Eyegis ser embalada, ela passa por um processo de inspeção em cinco etapas — cada etapa aprovada por uma pessoa real, não um scanner.",
      steps: [
        { k: "Inspeção das Lentes", d: "Clareza óptica, uniformidade do revestimento e filtragem de luz azul verificadas." },
        { k: "Inspeção da Armação", d: "Integridade do material, tolerância de peso, qualidade do acabamento." },
        { k: "Verificação da Montagem", d: "Torque das dobradiças, alinhamento, assentamento dos parafusos." },
        { k: "Inspeção de Conforto", d: "Equilíbrio de peso, geometria das plaquetas, curvatura das hastes." },
        { k: "Aprovação Final de Qualidade", d: "Aprovado individualmente antes do empacotamento." },
      ],
      stepLabel: (n) => `Etapa 0${n}`,
    },
    care: {
      rule: "06 — Guia de Cuidados",
      title: ["Pequenos rituais.", "Uma armação que dura."],
      items: [
        { k: "Limpeza", d: "Use apenas o pano de microfibra e o spray de lentes fornecidos. Evite álcool e produtos de limpeza domésticos." },
        { k: "Armazenamento", d: "Guarde seu Eyegis no estojo rígido sempre que não estiver usando." },
        { k: "Viagem", d: "Nunca deixe suas armações em um carro quente ou sob luz solar direta por longos períodos." },
        { k: "Uso diário", d: "Retire seus óculos com as duas mãos para proteger o alinhamento das dobradiças." },
        { k: "Compatibilidade com headsets", d: "Hastes finas em TR90 projetadas para se ajustar confortavelmente sob a maioria dos headsets de jogos e áudio." },
      ],
    },
    help: {
      rule: "07 — Precisa de Ajuda",
      title: "Uma equipe, não um formulário.",
      lead: "Pessoas reais, respondendo em até um dia útil. Escolha o canal que preferir.",
      tiles: [
        { k: "Contato Suporte", d: "care@eyegis.com", href: "mailto:care@eyegis.com" },
        { k: "Envio & Devoluções", d: "Gerenciado pela Amazon", href: "https://www.amazon.com/gp/help/customer/display.html" },
        { k: "Pedidos na Amazon", d: "Rastrear e devolver pedidos", href: "https://www.amazon.com/gp/your-account/order-history" },
        { k: "FAQ", d: "Respostas sobre lentes, ajuste e cuidados", href: "/lenses" },
      ],
      openLabel: "Abrir →",
      tileIndex: (n) => `0${n}`,
    },
    cta: {
      title: ["Compre com", "confiança."],
      lead: "Cada par é protegido pela nossa Garantia de 2 Anos e Garantia de Conforto de 60 Dias.",
      amazon: "Comprar na Amazon",
      collections: "Explorar Coleções",
      footer: "Eyegis © 2026 — Garantia & Cuidados",
      home: "Início",
      lenses: "Lentes",
      about: "Sobre",
    },
  },
  FR: {
    nav: { back: "← Eyegis", tag: "Garantie & Entretien" },
    hero: {
      kicker: "— Possession",
      title: ["Conçu pour durer.", "Soutenu avec confiance."],
      lead:
        "Chaque paire de lunettes Eyegis est conçue avec des matériaux premium et soutenue par une garantie complète et une garantie de confort.",
      badges: ["Garantie 2 ans", "Garantie confort 60 jours", "Inspecté individuellement"],
    },
    promise: {
      rule: "01 — Notre Promesse",
      title: ["La confiance commence", "avant votre premier port."],
      lead:
        "Chaque monture Eyegis est couverte par une Garantie de Fabrication de 2 ans et notre Garantie exclusive de Confort de 60 jours — un engagement envers l'objet que vous portez chaque jour.",
      stats: { yr: "2 ans", yrLabel: "Garantie de Fabrication", day: "60 j", dayLabel: "Garantie de Confort" },
    },
    warranty: {
      rule: "02 — Garantie 2 ans",
      title: "Ce qui est couvert.",
      lead:
        "Deux ans de couverture à partir de la date d'achat contre les défauts de matériaux et de fabrication — vérifié avec la preuve d'achat d'Amazon ou d'un revendeur autorisé.",
      covered: [
        { k: "Défauts de fabrication", d: "Tout défaut provenant de notre processus de production." },
        { k: "Construction de la monture", d: "Intégrité structurelle du corps de la monture." },
        { k: "Charnières", d: "Assemblage des charnières en titane et vis." },
        { k: "Défauts de matériaux", d: "Irrégularités du TR90, β-titane et acétate." },
        { k: "Fabrication des verres", d: "Défauts d'adhésion du revêtement et de clarté optique." },
        { k: "Finition", d: "Problèmes d'assemblage, d'alignement et de finition." },
      ],
    },
    notCovered: {
      rule: "03 — Hors Garantie",
      title: "L'usure fait partie de l'histoire.",
      lead:
        "Certaines situations sont hors garantie. Notre équipe se fera un plaisir d'aider avec des pièces de rechange ou des réparations payantes pour ce qui suit.",
      items: [
        "Dommages accidentels",
        "Chutes",
        "Écrasement",
        "Rayures normales",
        "Nettoyage inapproprié",
        "Exposition à la chaleur",
        "Modifications non autorisées",
      ],
    },
    comfort: {
      rule: "04 — Garantie Confort 60 jours",
      title: ["Le confort ne doit jamais", "être un pari."],
      lead:
        "Si vous ne ressentez pas le confort visuel attendu d'Eyegis, notre équipe travaillera directement avec vous pour trouver la meilleure solution — que ce soit un ajustement, une autre collection ou une résolution complète via Amazon.",
      disclaimer: "Un engagement de satisfaction client. Pas une garantie médicale.",
      cta: "Contacter le Service",
    },
    qc: {
      rule: "05 — Contrôle Qualité",
      title: ["Cinq contrôles.", "Chaque paire."],
      lead:
        "Avant qu'une monture Eyegis ne soit emballée, elle passe par un processus d'inspection en cinq étapes — chaque étape validée par une personne réelle, pas un scanner.",
      steps: [
        { k: "Inspection des verres", d: "Clarté optique, uniformité du revêtement, filtrage de la lumière bleue vérifiés." },
        { k: "Inspection de la monture", d: "Intégrité du matériau, tolérance de poids, qualité de finition." },
        { k: "Vérification de l'assemblage", d: "Couple des charnières, alignement, serrage des vis." },
        { k: "Inspection du confort", d: "Équilibre du poids, géométrie des plaquettes, courbure des branches." },
        { k: "Approbation Finale", d: "Validé individuellement avant emballage." },
      ],
      stepLabel: (n) => `Étape 0${n}`,
    },
    care: {
      rule: "06 — Guide d'Entretien",
      title: ["Petits rituels.", "Une monture qui dure."],
      items: [
        { k: "Nettoyage", d: "Utilisez uniquement le chiffon microfibre et le spray fournis. Évitez l'alcool et les nettoyants ménagers." },
        { k: "Rangement", d: "Rangez vos Eyegis dans leur étui rigide dès que vous ne les portez pas." },
        { k: "Voyage", d: "Ne laissez jamais vos montures dans une voiture chaude ou en plein soleil longtemps." },
        { k: "Usage quotidien", d: "Retirez vos lunettes à deux mains pour protéger l'alignement des charnières." },
        { k: "Compatibilité casque", d: "Branches fines en TR90 conçues pour s'ajuster sous la plupart des casques de jeu et audio." },
      ],
    },
    help: {
      rule: "07 — Besoin d'Aide",
      title: "Une équipe, pas un formulaire.",
      lead: "De vraies personnes, répondant sous un jour ouvré. Choisissez le canal qui vous convient.",
      tiles: [
        { k: "Contact Support", d: "care@eyegis.com", href: "mailto:care@eyegis.com" },
        { k: "Livraison & Retours", d: "Géré par Amazon", href: "https://www.amazon.com/gp/help/customer/display.html" },
        { k: "Commandes Amazon", d: "Suivre et retourner les commandes", href: "https://www.amazon.com/gp/your-account/order-history" },
        { k: "FAQ", d: "Réponses sur verres, ajustement et entretien", href: "/lenses" },
      ],
      openLabel: "Ouvrir →",
      tileIndex: (n) => `0${n}`,
    },
    cta: {
      title: ["Achetez en toute", "confiance."],
      lead: "Chaque paire est protégée par notre Garantie 2 ans et notre Garantie Confort 60 jours.",
      amazon: "Acheter sur Amazon",
      collections: "Explorer les Collections",
      footer: "Eyegis © 2026 — Garantie & Entretien",
      home: "Accueil",
      lenses: "Verres",
      about: "À propos",
    },
  },
};

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
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
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Rule({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span
        className="h-px w-10"
        style={{ background: light ? OFFWHITE : INK }}
      />
      <span
        className="text-[10px] uppercase tracking-[0.35em]"
        style={{ color: light ? OFFWHITE : INK, fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

// Minimal line icons
const Icon = {
  Shield: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M20 4 L34 10 V21 C34 29 27 34 20 36 C13 34 6 29 6 21 V10 Z" />
      <path d="M14 20 L18 24 L26 15" />
    </svg>
  ),
  Frame: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="12" cy="22" r="6" />
      <circle cx="28" cy="22" r="6" />
      <path d="M18 22 h4" />
      <path d="M2 20 l4 -2 M38 20 l-4 -2" />
    </svg>
  ),
  Hinge: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="6" y="16" width="12" height="8" />
      <rect x="22" y="16" width="12" height="8" />
      <circle cx="20" cy="20" r="2" />
    </svg>
  ),
  Lens: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="20" cy="20" r="12" />
      <path d="M14 16 c2 -2 6 -2 8 0" />
    </svg>
  ),
  Craft: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M20 4 L24 16 L36 16 L26 24 L30 36 L20 28 L10 36 L14 24 L4 16 L16 16 Z" />
    </svg>
  ),
  Material: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M6 12 L20 6 L34 12 L20 18 Z" />
      <path d="M6 12 V26 L20 32 V18" />
      <path d="M34 12 V26 L20 32" />
    </svg>
  ),
  Drop: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M20 6 C20 6 10 18 10 26 A10 10 0 0 0 30 26 C30 18 20 6 20 6 Z" />
    </svg>
  ),
  Crush: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M4 20 L36 20" />
      <path d="M8 12 L32 12" />
      <path d="M12 28 L28 28" />
    </svg>
  ),
  Scratch: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="20" cy="20" r="14" />
      <path d="M10 14 L28 22 M14 26 L24 12" />
    </svg>
  ),
  Clean: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M8 8 L32 32 M8 32 L32 8" />
    </svg>
  ),
  Heat: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M14 34 C10 28 18 24 16 16 C22 20 26 12 22 6 C28 12 30 22 26 30" />
    </svg>
  ),
  Mod: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M6 30 L24 12 L28 16 L10 34 Z" />
      <path d="M22 14 L30 6 L34 10 L26 18" />
    </svg>
  ),
  Cloth: () => (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M6 10 Q24 4 42 10 L38 40 Q24 46 10 40 Z" />
      <path d="M12 18 Q24 14 36 18" />
      <path d="M14 26 Q24 22 34 26" />
    </svg>
  ),
  Case: () => (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="6" y="14" width="36" height="24" rx="12" />
      <path d="M6 24 h36" />
    </svg>
  ),
  Plane: () => (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M4 26 L44 12 L38 24 L44 36 Z" />
      <path d="M18 22 L22 32" />
    </svg>
  ),
  Sun: () => (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="24" cy="24" r="8" />
      <path d="M24 6 v6 M24 36 v6 M6 24 h6 M36 24 h6 M11 11 l4 4 M33 33 l4 4 M11 37 l4 -4 M33 15 l4 -4" />
    </svg>
  ),
  Headset: () => (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M8 26 A16 16 0 0 1 40 26" />
      <rect x="6" y="26" width="8" height="14" rx="2" />
      <rect x="34" y="26" width="8" height="14" rx="2" />
    </svg>
  ),
};

const COVERED_ICONS = [<Icon.Shield />, <Icon.Frame />, <Icon.Hinge />, <Icon.Material />, <Icon.Lens />, <Icon.Craft />];
const NOT_COVERED_ICONS = [<Icon.Drop />, <Icon.Drop />, <Icon.Crush />, <Icon.Scratch />, <Icon.Clean />, <Icon.Heat />, <Icon.Mod />];
const CARE_ICONS = [<Icon.Cloth />, <Icon.Case />, <Icon.Plane />, <Icon.Sun />, <Icon.Headset />];

function WarrantyPage() {
  const { lang } = useI18n();
  const c = CONTENT[lang];
  const serif = "'Cormorant Garamond', 'Times New Roman', serif";
  const sans = "'Inter', system-ui, sans-serif";

  return (
    <main style={{ background: OFFWHITE, color: INK, fontFamily: sans }}>
      {/* HERO */}
      <section className="relative min-h-[88vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Picture
            source={heroImg}
            alt="Eyegis eyewear in soft studio light — hero image for warranty page"
            sizes="100vw"
            className="h-full w-full object-cover"
            style={{ filter: "saturate(0.9) contrast(1.02)" }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(14,22,19,0.05) 0%, rgba(246,243,238,0.35) 55%, rgba(246,243,238,0.95) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-[1400px] flex-col justify-between px-6 py-10 md:px-12 md:py-14">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-[11px] uppercase tracking-[0.4em]" style={{ color: INK }}>
              {c.nav.back}
            </Link>
            <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: INK }}>
              {c.nav.tag}
            </span>
          </div>
          <div className="max-w-[1100px]">
            <Reveal>
              <span className="text-[11px] uppercase tracking-[0.5em]" style={{ color: TEAL }}>
                {c.hero.kicker}
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h1
                className="mt-6 text-[44px] leading-[0.98] tracking-[-0.02em] md:text-[92px] lg:text-[116px]"
                style={{ fontFamily: serif, fontWeight: 400 }}
              >
                {c.hero.title[0]}
                <br />
                {c.hero.title[1]}
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 max-w-2xl text-[15px] leading-[1.75] md:text-[17px]" style={{ color: INK }}>
                {c.hero.lead}
              </p>
            </Reveal>
            <Reveal delay={340}>
              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 text-[10px] uppercase tracking-[0.35em]" style={{ color: INK }}>
                {c.hero.badges.map((b) => <span key={b}>{b}</span>)}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 01 — OUR PROMISE */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label={c.promise.rule} />
        </Reveal>
        <Reveal delay={120}>
          <h2
            className="mt-10 max-w-[1200px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[76px] lg:text-[92px]"
            style={{ fontFamily: serif, fontWeight: 400 }}
          >
            {c.promise.title[0]}
            <br />
            {c.promise.title[1]}
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <Reveal delay={160} className="md:col-span-5">
            <p className="text-[15px] leading-[1.85]" style={{ color: MUTED }}>
              {c.promise.lead}
            </p>
          </Reveal>
          <Reveal delay={260} className="md:col-span-5 md:col-start-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-[56px] leading-none tracking-[-0.02em]" style={{ fontFamily: serif, color: TEAL }}>
                  {c.promise.stats.yr}
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.35em]" style={{ color: INK }}>
                  {c.promise.stats.yrLabel}
                </div>
              </div>
              <div>
                <div className="text-[56px] leading-none tracking-[-0.02em]" style={{ fontFamily: serif, color: TEAL }}>
                  {c.promise.stats.day}
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.35em]" style={{ color: INK }}>
                  {c.promise.stats.dayLabel}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 — 2-YEAR WARRANTY */}
      <section style={{ background: CHAMPAGNE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <Rule label={c.warranty.rule} />
          </Reveal>

          <div className="mt-14 grid gap-16 md:grid-cols-12 md:items-end">
            <Reveal delay={100} className="md:col-span-7">
              <h2 className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[64px]" style={{ fontFamily: serif, fontWeight: 400 }}>
                {c.warranty.title}
              </h2>
            </Reveal>
            <Reveal delay={200} className="md:col-span-4 md:col-start-9">
              <p className="text-[13px] leading-[1.8]" style={{ color: MUTED }}>
                {c.warranty.lead}
              </p>
            </Reveal>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: "rgba(14,22,19,0.12)" }}>
            {c.warranty.covered.map((item, i) => (
              <Reveal key={item.k} delay={(i % 3) * 100}>
                <div className="flex min-h-[260px] flex-col justify-between p-10" style={{ background: CHAMPAGNE, color: INK }}>
                  <div style={{ color: TEAL }}>{COVERED_ICONS[i]}</div>
                  <div>
                    <h3 className="text-[26px] leading-[1.1]" style={{ fontFamily: serif, fontWeight: 400 }}>
                      {item.k}
                    </h3>
                    <p className="mt-3 text-[13px] leading-[1.7]" style={{ color: MUTED }}>
                      {item.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — NOT COVERED */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label={c.notCovered.rule} />
        </Reveal>
        <div className="mt-14 grid gap-16 md:grid-cols-12 md:items-end">
          <Reveal delay={100} className="md:col-span-7">
            <h2 className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[64px]" style={{ fontFamily: serif, fontWeight: 400 }}>
              {c.notCovered.title}
            </h2>
          </Reveal>
          <Reveal delay={200} className="md:col-span-4 md:col-start-9">
            <p className="text-[13px] leading-[1.8]" style={{ color: MUTED }}>
              {c.notCovered.lead}
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-4 lg:grid-cols-7">
          {c.notCovered.items.map((k, i) => (
            <Reveal key={k + i} delay={(i % 4) * 80}>
              <div className="flex flex-col items-start">
                <div style={{ color: INK, opacity: 0.75 }}>{NOT_COVERED_ICONS[i]}</div>
                <p className="mt-6 text-[13px] leading-[1.4]" style={{ color: INK }}>
                  {k}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 04 — 60-DAY COMFORT GUARANTEE */}
      <section style={{ background: TEAL, color: OFFWHITE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <Rule label={c.comfort.rule} light />
          </Reveal>

          <div className="mt-12 grid gap-16 md:grid-cols-12 md:items-center">
            <Reveal delay={120} className="md:col-span-7">
              <h2
                className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[76px] lg:text-[92px]"
                style={{ fontFamily: serif, fontWeight: 400, color: OFFWHITE }}
              >
                {c.comfort.title[0]}
                <br />
                {c.comfort.title[1]}
              </h2>
            </Reveal>
            <Reveal delay={240} className="md:col-span-4 md:col-start-9">
              <p className="text-[14px] leading-[1.85]" style={{ color: "rgba(246,243,238,0.8)" }}>
                {c.comfort.lead}
              </p>
              <p className="mt-6 text-[11px] uppercase tracking-[0.3em]" style={{ color: "rgba(246,243,238,0.55)" }}>
                {c.comfort.disclaimer}
              </p>
            </Reveal>
          </div>

          <Reveal delay={340}>
            <a
              href="mailto:care@eyegis.com"
              className="mt-20 inline-flex items-center gap-4 border px-8 py-5 text-[11px] uppercase tracking-[0.35em] transition-colors hover:bg-[rgba(246,243,238,0.08)]"
              style={{ borderColor: OFFWHITE, color: OFFWHITE }}
            >
              <span>{c.comfort.cta}</span>
              <span>→</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* 05 — QUALITY CONTROL */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label={c.qc.rule} />
        </Reveal>

        <div className="mt-14 grid gap-16 md:grid-cols-12 md:items-end">
          <Reveal delay={100} className="md:col-span-6">
            <h2 className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[68px]" style={{ fontFamily: serif, fontWeight: 400 }}>
              {c.qc.title[0]}
              <br />
              {c.qc.title[1]}
            </h2>
          </Reveal>
          <Reveal delay={200} className="md:col-span-5 md:col-start-8">
            <p className="text-[14px] leading-[1.85]" style={{ color: MUTED }}>
              {c.qc.lead}
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-16 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-5">
            <Picture
              source={qualityImg}
              alt="Eyegis lens engineering detail — precision QC inspection close-up"
              sizes="(min-width:768px) 42vw, 100vw"
              className="h-[70vh] w-full object-cover"
            />
          </Reveal>

          <div className="md:col-span-6 md:col-start-7">
            <ol className="relative border-l" style={{ borderColor: "rgba(14,22,19,0.15)" }}>
              {c.qc.steps.map((s, i) => (
                <Reveal key={s.k} delay={i * 120}>
                  <li className="relative pl-10 pr-2 py-8">
                    <span className="absolute -left-[6px] top-11 h-3 w-3 rounded-full" style={{ background: TEAL }} />
                    <div className="flex items-baseline justify-between gap-6">
                      <h3 className="text-[26px] leading-[1.1]" style={{ fontFamily: serif, fontWeight: 400 }}>
                        {s.k}
                      </h3>
                      <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: MUTED }}>
                        {c.qc.stepLabel(i + 1)}
                      </span>
                    </div>
                    <p className="mt-3 max-w-lg text-[13px] leading-[1.75]" style={{ color: MUTED }}>
                      {s.d}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 06 — CARE GUIDE */}
      <section style={{ background: CHAMPAGNE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <Rule label={c.care.rule} />
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="mt-10 max-w-[1200px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[72px]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              {c.care.title[0]}
              <br />
              {c.care.title[1]}
            </h2>
          </Reveal>

          <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {c.care.items.map((item, i) => (
              <Reveal key={item.k} delay={(i % 3) * 100}>
                <article className="flex h-full min-h-[340px] flex-col justify-between p-10" style={{ background: OFFWHITE }}>
                  <div style={{ color: TEAL }}>{CARE_ICONS[i]}</div>
                  <div>
                    <h3 className="text-[30px] leading-[1.05]" style={{ fontFamily: serif, fontWeight: 400 }}>
                      {item.k}
                    </h3>
                    <p className="mt-4 text-[13px] leading-[1.75]" style={{ color: MUTED }}>
                      {item.d}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — NEED HELP */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label={c.help.rule} />
        </Reveal>

        <div className="mt-14 grid gap-16 md:grid-cols-12 md:items-end">
          <Reveal delay={100} className="md:col-span-7">
            <h2 className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[64px]" style={{ fontFamily: serif, fontWeight: 400 }}>
              {c.help.title}
            </h2>
          </Reveal>
          <Reveal delay={200} className="md:col-span-4 md:col-start-9">
            <p className="text-[13px] leading-[1.8]" style={{ color: MUTED }}>
              {c.help.lead}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: "rgba(14,22,19,0.12)" }}>
          {c.help.tiles.map((b, i) => (
            <Reveal key={b.k} delay={i * 100}>
              <a
                href={b.href}
                target={b.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex h-full min-h-[220px] flex-col justify-between p-10 transition-colors hover:bg-[rgba(14,22,19,0.03)]"
                style={{ background: OFFWHITE, color: INK }}
              >
                <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: MUTED }}>
                  {c.help.tileIndex(i + 1)}
                </span>
                <div>
                  <h3 className="text-[26px] leading-[1.05]" style={{ fontFamily: serif, fontWeight: 400 }}>
                    {b.k}
                  </h3>
                  <p className="mt-3 text-[12px] leading-[1.7]" style={{ color: MUTED }}>
                    {b.d}
                  </p>
                </div>
                <span
                  className="mt-8 text-[11px] uppercase tracking-[0.35em] transition-transform group-hover:translate-x-1"
                  style={{ color: TEAL }}
                >
                  {c.help.openLabel}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden" style={{ background: INK, color: OFFWHITE }}>
        <div className="absolute inset-0 opacity-25">
          <Picture
            source={promiseImg}
            alt=""
            aria-hidden="true"
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-32 md:px-12 md:py-52">
          <div className="grid gap-16 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-7">
              <h2
                className="text-[40px] leading-[1.02] tracking-[-0.02em] md:text-[92px]"
                style={{ fontFamily: serif, fontWeight: 400, color: OFFWHITE }}
              >
                {c.cta.title[0]}
                <br />
                {c.cta.title[1]}
              </h2>
              <p className="mt-8 max-w-md text-[14px] leading-[1.85]" style={{ color: "rgba(246,243,238,0.75)" }}>
                {c.cta.lead}
              </p>
            </Reveal>
            <Reveal delay={120} className="md:col-span-5">
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.amazon.com/eyegis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-8 py-5 text-[12px] uppercase tracking-[0.3em] transition-colors"
                  style={{ background: OFFWHITE, color: INK }}
                >
                  <span>{c.cta.amazon}</span>
                  <span>↗</span>
                </a>
                <Link
                  to="/"
                  hash="collections"
                  className="inline-flex items-center justify-between border px-8 py-5 text-[12px] uppercase tracking-[0.3em] transition-colors hover:bg-[rgba(246,243,238,0.08)]"
                  style={{ borderColor: OFFWHITE, color: OFFWHITE }}
                >
                  <span>{c.cta.collections}</span>
                  <span>→</span>
                </Link>
              </div>
            </Reveal>
          </div>

          <div
            className="mt-24 flex flex-col items-start justify-between gap-6 border-t pt-10 md:flex-row md:items-center"
            style={{ borderColor: "rgba(246,243,238,0.2)" }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "rgba(246,243,238,0.5)" }}>
              {c.cta.footer}
            </span>
            <div className="flex gap-8 text-[10px] uppercase tracking-[0.4em]" style={{ color: "rgba(246,243,238,0.7)" }}>
              <Link to="/">{c.cta.home}</Link>
              <Link to="/lenses">{c.cta.lenses}</Link>
              <Link to="/about">{c.cta.about}</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
