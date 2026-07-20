import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { useEffect, useRef, useState } from "react";

import heroImg from "@/assets/shipping-unboxing.jpg?w=768;1200;1920;2400&format=avif;webp;jpg&as=picture";
import deliveryImg from "@/assets/lifestyle-travel.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import { Picture } from "@/components/eyegis/Picture";
import storeImg from "@/assets/products/meridian-hero.jpg?w=768;1200;1920;2400&format=avif;webp;jpg&as=picture";
import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

type ShippingCopy = {
  nav: { back: string; tag: string };
  hero: { kicker: string; title: [string, string, string]; lead: string };
  why: {
    rule: string;
    title: string;
    lead: string;
    cards: { k: string; d: string }[];
    tileIndex: (n: number) => string;
  };
  steps: { rule: string; title: [string, string]; stepLabel: (n: number) => string; items: { k: string; d: string }[] };
  delivery: { rule: string; title: [string, string]; paragraphs: [string, string, string] };
  returns: { rule: string; title: [string, string]; items: { tag: string; k: string; d: string }[] };
  countries: {
    rule: string;
    title: string;
    lead: string;
    soonSuffix: string;
    names: Record<string, string>;
  };
  faq: {
    rule: string;
    title: [string, string];
    lead: string;
    items: { q: string; a: string }[];
  };
  support: {
    rule: string;
    title: [string, string];
    lead: string;
    tiles: { k: string; d: string; href: string }[];
    openLabel: string;
    tileIndex: (n: number) => string;
  };
  store: {
    rule: string;
    title: [string, string];
    bullets: [string, string, string, string];
    amazon: string;
    collections: string;
    footer: string;
    home: string;
    warranty: string;
    about: string;
    lenses: string;
  };
};

const COUNTRY_KEYS = [
  "United States",
  "Canada",
  "United Kingdom",
  "France",
  "Germany",
  "Italy",
  "Spain",
  "Brazil",
  "Japan",
  "Australia",
  "UAE",
  "Mexico",
];

const CONTENT: Record<Lang, ShippingCopy> = {
  EN: {
    nav: { back: "← Eyegis", tag: "Shipping & Returns" },
    hero: {
      kicker: "— Fulfilled by Amazon",
      title: ["Simple.", "Fast.", "Trusted."],
      lead:
        "Every Eyegis purchase is fulfilled through Amazon — providing a secure shopping experience, fast delivery and reliable customer support in every marketplace we serve.",
    },
    why: {
      rule: "01 — Why Amazon",
      title: "The most trusted checkout in the world.",
      lead:
        "We chose Amazon as our official retail partner so that every Eyegis order is protected by the same standards you already know and trust.",
      cards: [
        { k: "Secure Checkout", d: "Industry-leading payment security, protected by Amazon Pay." },
        { k: "Fast Delivery", d: "Backed by Amazon's global logistics and Prime-eligible where available." },
        { k: "Easy Returns", d: "A simple, transparent return process managed through your Amazon account." },
        { k: "Trusted Platform", d: "Hundreds of millions of customers worldwide already trust Amazon." },
      ],
      tileIndex: (n) => `0${n}`,
    },
    steps: {
      rule: "02 — How Your Order Works",
      title: ["Six quiet steps", "from click to comfort."],
      stepLabel: (n) => `Step 0${n}`,
      items: [
        { k: "Choose your frame", d: "Discover the collection that fits your life." },
        { k: "Click Buy on Amazon", d: "One click sends you to the official Eyegis store." },
        { k: "Secure purchase", d: "Complete checkout with Amazon Pay." },
        { k: "Amazon prepares your order", d: "Your Eyegis is picked, verified and boxed." },
        { k: "Fast delivery", d: "Shipped to your address via Amazon logistics." },
        { k: "Enjoy your Eyegis", d: "Wear, work, create — comfortably." },
      ],
    },
    delivery: {
      rule: "03 — Delivery",
      title: ["Delivered by the world's", "largest logistics network."],
      paragraphs: [
        "Delivery times vary depending on your country and Amazon marketplace, and are quoted in real time at checkout.",
        "Amazon Prime members may benefit from faster, complimentary shipping wherever Prime is available.",
        "Every Eyegis order is dispatched from an Amazon fulfilment center and tracked end-to-end inside your Amazon account.",
      ],
    },
    returns: {
      rule: "04 — Returns",
      title: ["Three scenarios,", "one calm answer."],
      items: [
        { tag: "01 — Arrives damaged", k: "If your product arrives damaged", d: "Amazon's standard return policy applies. Report the issue directly from your Amazon order — replacement or refund handled end-to-end." },
        { tag: "02 — Change of mind", k: "If you simply change your mind", d: "Return within your local Amazon return window. No questions, no forms, no friction." },
        { tag: "03 — Comfort concerns", k: "If you experience comfort issues", d: "Reach out to Eyegis Customer Support — we'll help you find the right frame, fit or collection under our 60-Day Comfort Guarantee." },
      ],
    },
    countries: {
      rule: "05 — Countries",
      title: "Available in eight marketplaces.",
      lead: "Eyegis ships through Amazon's regional marketplaces today, with more markets on the roadmap.",
      soonSuffix: "Soon",
      names: {
        "United States": "United States",
        Canada: "Canada",
        "United Kingdom": "United Kingdom",
        France: "France",
        Germany: "Germany",
        Italy: "Italy",
        Spain: "Spain",
        Brazil: "Brazil",
        Japan: "Japan",
        Australia: "Australia",
        UAE: "UAE",
        Mexico: "Mexico",
      },
    },
    faq: {
      rule: "06 — Questions",
      title: ["Everything else,", "answered."],
      lead: "Still stuck? The Eyegis Care team responds within one business day.",
      items: [
        { q: "Can I use Amazon Prime?", a: "Yes. Where Prime is available, Eyegis products are eligible for Prime shipping and returns." },
        { q: "Can I track my order?", a: "All orders are tracked directly inside your Amazon account, from dispatch to delivery." },
        { q: "Can I exchange sizes?", a: "Yes — initiate an exchange or return from your Amazon order page, then reorder your preferred size." },
        { q: "Who handles returns?", a: "Returns are managed by Amazon under your local marketplace's return window and process." },
        { q: "Who provides support?", a: "Amazon handles shipping and return logistics. Eyegis Care handles product, comfort and warranty questions." },
        { q: "What if my product arrives damaged?", a: "Report it inside your Amazon order within the return window — replacement is typically dispatched immediately." },
      ],
    },
    support: {
      rule: "07 — Customer Support",
      title: ["Need help?", "A real person is waiting."],
      lead: "For product, comfort or warranty questions — write to us. For shipping or refunds, open your Amazon order directly.",
      tiles: [
        { k: "Contact Eyegis", d: "care@eyegis.com", href: "mailto:care@eyegis.com" },
        { k: "Visit Amazon Store", d: "Shop the full collection", href: "https://www.amazon.com.br/" },
        { k: "Warranty", d: "2 years + 60-day comfort", href: "/warranty" },
        { k: "FAQ", d: "Lenses, fit & care", href: "/lenses" },
      ],
      openLabel: "Open →",
      tileIndex: (n) => `0${n}`,
    },
    store: {
      rule: "08 — Official Amazon Store",
      title: ["The official", "Eyegis store."],
      bullets: ["Verified Products", "Secure Checkout", "Fast Delivery", "Trusted Reviews"],
      amazon: "Buy on Amazon",
      collections: "Explore Collections",
      footer: "Eyegis © 2026 — Shipping & Returns",
      home: "Home",
      warranty: "Warranty",
      about: "About",
      lenses: "Lenses",
    },
  },
  PT: {
    nav: { back: "← Eyegis", tag: "Envio & Devoluções" },
    hero: {
      kicker: "— Entregue pela Amazon",
      title: ["Simples.", "Rápido.", "Confiável."],
      lead:
        "Cada compra Eyegis é processada pela Amazon — proporcionando uma experiência segura, entrega rápida e suporte confiável em cada mercado que atendemos.",
    },
    why: {
      rule: "01 — Por que Amazon",
      title: "O checkout mais confiável do mundo.",
      lead:
        "Escolhemos a Amazon como nosso parceiro oficial de varejo para que cada pedido Eyegis seja protegido pelos mesmos padrões que você já conhece e confia.",
      cards: [
        { k: "Checkout Seguro", d: "Segurança de pagamento líder do setor, protegida pelo Amazon Pay." },
        { k: "Entrega Rápida", d: "Suportada pela logística global da Amazon e elegível ao Prime onde disponível." },
        { k: "Devoluções Fáceis", d: "Um processo de devolução simples e transparente gerenciado pela sua conta Amazon." },
        { k: "Plataforma Confiável", d: "Centenas de milhões de clientes no mundo já confiam na Amazon." },
      ],
      tileIndex: (n) => `0${n}`,
    },
    steps: {
      rule: "02 — Como Funciona Seu Pedido",
      title: ["Seis passos tranquilos", "do clique ao conforto."],
      stepLabel: (n) => `Etapa 0${n}`,
      items: [
        { k: "Escolha sua armação", d: "Descubra a coleção que combina com sua vida." },
        { k: "Clique em Comprar na Amazon", d: "Um clique leva você à loja oficial Eyegis." },
        { k: "Compra segura", d: "Finalize o checkout com Amazon Pay." },
        { k: "A Amazon prepara seu pedido", d: "Seu Eyegis é separado, verificado e embalado." },
        { k: "Entrega rápida", d: "Enviado ao seu endereço pela logística Amazon." },
        { k: "Aproveite seu Eyegis", d: "Use, trabalhe, crie — com conforto." },
      ],
    },
    delivery: {
      rule: "03 — Entrega",
      title: ["Entregue pela maior", "rede logística do mundo."],
      paragraphs: [
        "Os prazos de entrega variam de acordo com seu país e marketplace Amazon, e são calculados em tempo real no checkout.",
        "Membros Amazon Prime podem se beneficiar de envio mais rápido e gratuito onde o Prime estiver disponível.",
        "Cada pedido Eyegis é despachado de um centro de distribuição Amazon e rastreado de ponta a ponta na sua conta Amazon.",
      ],
    },
    returns: {
      rule: "04 — Devoluções",
      title: ["Três cenários,", "uma resposta tranquila."],
      items: [
        { tag: "01 — Chega danificado", k: "Se seu produto chegar danificado", d: "A política padrão de devolução da Amazon se aplica. Reporte o problema diretamente do seu pedido Amazon — substituição ou reembolso tratados de ponta a ponta." },
        { tag: "02 — Mudança de ideia", k: "Se você simplesmente mudar de ideia", d: "Devolva dentro do prazo do seu marketplace Amazon local. Sem perguntas, sem formulários, sem atrito." },
        { tag: "03 — Questões de conforto", k: "Se sentir problemas de conforto", d: "Entre em contato com o Suporte Eyegis — vamos ajudar você a encontrar a armação, ajuste ou coleção certa sob nossa Garantia de Conforto de 60 Dias." },
      ],
    },
    countries: {
      rule: "05 — Países",
      title: "Disponível em oito marketplaces.",
      lead: "A Eyegis envia hoje pelos marketplaces regionais da Amazon, com mais mercados no roadmap.",
      soonSuffix: "Em breve",
      names: {
        "United States": "Estados Unidos",
        Canada: "Canadá",
        "United Kingdom": "Reino Unido",
        France: "França",
        Germany: "Alemanha",
        Italy: "Itália",
        Spain: "Espanha",
        Brazil: "Brasil",
        Japan: "Japão",
        Australia: "Austrália",
        UAE: "Emirados",
        Mexico: "México",
      },
    },
    faq: {
      rule: "06 — Perguntas",
      title: ["Todo o resto,", "respondido."],
      lead: "Ainda com dúvidas? A equipe Eyegis Care responde em até um dia útil.",
      items: [
        { q: "Posso usar Amazon Prime?", a: "Sim. Onde o Prime estiver disponível, os produtos Eyegis são elegíveis para envio e devoluções Prime." },
        { q: "Posso rastrear meu pedido?", a: "Todos os pedidos são rastreados diretamente na sua conta Amazon, do despacho à entrega." },
        { q: "Posso trocar de tamanho?", a: "Sim — inicie uma troca ou devolução na página do seu pedido Amazon e depois refaça o pedido no tamanho desejado." },
        { q: "Quem cuida das devoluções?", a: "As devoluções são gerenciadas pela Amazon sob o prazo e processo do seu marketplace local." },
        { q: "Quem fornece suporte?", a: "A Amazon cuida da logística de envio e devolução. A Eyegis Care cuida de perguntas sobre produto, conforto e garantia." },
        { q: "E se meu produto chegar danificado?", a: "Reporte no seu pedido Amazon dentro do prazo de devolução — a substituição normalmente é despachada imediatamente." },
      ],
    },
    support: {
      rule: "07 — Suporte ao Cliente",
      title: ["Precisa de ajuda?", "Uma pessoa real está esperando."],
      lead: "Para dúvidas de produto, conforto ou garantia — escreva-nos. Para envio ou reembolsos, abra seu pedido Amazon diretamente.",
      tiles: [
        { k: "Contato Eyegis", d: "care@eyegis.com", href: "mailto:care@eyegis.com" },
        { k: "Visitar Loja Amazon", d: "Compre a coleção completa", href: "https://www.amazon.com.br/" },
        { k: "Garantia", d: "2 anos + 60 dias de conforto", href: "/warranty" },
        { k: "FAQ", d: "Lentes, ajuste e cuidados", href: "/lenses" },
      ],
      openLabel: "Abrir →",
      tileIndex: (n) => `0${n}`,
    },
    store: {
      rule: "08 — Loja Oficial Amazon",
      title: ["A loja oficial", "Eyegis."],
      bullets: ["Produtos Verificados", "Checkout Seguro", "Entrega Rápida", "Avaliações Confiáveis"],
      amazon: "Comprar na Amazon",
      collections: "Explorar Coleções",
      footer: "Eyegis © 2026 — Envio & Devoluções",
      home: "Início",
      warranty: "Garantia",
      about: "Sobre",
      lenses: "Lentes",
    },
  },
  FR: {
    nav: { back: "← Eyegis", tag: "Livraison & Retours" },
    hero: {
      kicker: "— Expédié par Amazon",
      title: ["Simple.", "Rapide.", "De confiance."],
      lead:
        "Chaque achat Eyegis est expédié via Amazon — offrant une expérience d'achat sécurisée, une livraison rapide et un support fiable dans chaque marché que nous servons.",
    },
    why: {
      rule: "01 — Pourquoi Amazon",
      title: "Le checkout le plus fiable au monde.",
      lead:
        "Nous avons choisi Amazon comme partenaire officiel afin que chaque commande Eyegis soit protégée par les mêmes standards que vous connaissez.",
      cards: [
        { k: "Paiement Sécurisé", d: "Sécurité de paiement de pointe, protégée par Amazon Pay." },
        { k: "Livraison Rapide", d: "Soutenue par la logistique mondiale d'Amazon et éligible Prime quand disponible." },
        { k: "Retours Faciles", d: "Un processus de retour simple et transparent géré via votre compte Amazon." },
        { k: "Plateforme de Confiance", d: "Des centaines de millions de clients font déjà confiance à Amazon." },
      ],
      tileIndex: (n) => `0${n}`,
    },
    steps: {
      rule: "02 — Comment Fonctionne Votre Commande",
      title: ["Six étapes tranquilles", "du clic au confort."],
      stepLabel: (n) => `Étape 0${n}`,
      items: [
        { k: "Choisissez votre monture", d: "Découvrez la collection qui correspond à votre vie." },
        { k: "Cliquez sur Acheter sur Amazon", d: "Un clic vous mène à la boutique officielle Eyegis." },
        { k: "Achat sécurisé", d: "Finalisez le paiement avec Amazon Pay." },
        { k: "Amazon prépare votre commande", d: "Votre Eyegis est prélevé, vérifié et emballé." },
        { k: "Livraison rapide", d: "Expédié à votre adresse via la logistique Amazon." },
        { k: "Profitez de votre Eyegis", d: "Portez, travaillez, créez — confortablement." },
      ],
    },
    delivery: {
      rule: "03 — Livraison",
      title: ["Livré par le plus grand", "réseau logistique au monde."],
      paragraphs: [
        "Les délais de livraison varient selon votre pays et le marketplace Amazon, et sont indiqués en temps réel au checkout.",
        "Les membres Amazon Prime peuvent bénéficier d'une livraison plus rapide et gratuite là où Prime est disponible.",
        "Chaque commande Eyegis est expédiée depuis un centre Amazon et suivie de bout en bout dans votre compte Amazon.",
      ],
    },
    returns: {
      rule: "04 — Retours",
      title: ["Trois scénarios,", "une réponse sereine."],
      items: [
        { tag: "01 — Arrive endommagé", k: "Si votre produit arrive endommagé", d: "La politique standard de retour d'Amazon s'applique. Signalez le problème directement depuis votre commande Amazon — remplacement ou remboursement pris en charge de bout en bout." },
        { tag: "02 — Changement d'avis", k: "Si vous changez simplement d'avis", d: "Retournez dans le délai de votre marketplace Amazon local. Sans questions, sans formulaires, sans friction." },
        { tag: "03 — Problèmes de confort", k: "Si vous rencontrez des problèmes de confort", d: "Contactez le Service Client Eyegis — nous vous aiderons à trouver la bonne monture, ajustement ou collection sous notre Garantie Confort 60 jours." },
      ],
    },
    countries: {
      rule: "05 — Pays",
      title: "Disponible dans huit marketplaces.",
      lead: "Eyegis expédie aujourd'hui via les marketplaces régionaux d'Amazon, avec plus de marchés à venir.",
      soonSuffix: "Bientôt",
      names: {
        "United States": "États-Unis",
        Canada: "Canada",
        "United Kingdom": "Royaume-Uni",
        France: "France",
        Germany: "Allemagne",
        Italy: "Italie",
        Spain: "Espagne",
        Brazil: "Brésil",
        Japan: "Japon",
        Australia: "Australie",
        UAE: "Émirats",
        Mexico: "Mexique",
      },
    },
    faq: {
      rule: "06 — Questions",
      title: ["Tout le reste,", "répondu."],
      lead: "Encore bloqué ? L'équipe Eyegis Care répond sous un jour ouvré.",
      items: [
        { q: "Puis-je utiliser Amazon Prime ?", a: "Oui. Là où Prime est disponible, les produits Eyegis sont éligibles à la livraison et aux retours Prime." },
        { q: "Puis-je suivre ma commande ?", a: "Toutes les commandes sont suivies directement dans votre compte Amazon, de l'expédition à la livraison." },
        { q: "Puis-je échanger les tailles ?", a: "Oui — initiez un échange ou retour depuis votre page de commande Amazon, puis recommandez la taille souhaitée." },
        { q: "Qui gère les retours ?", a: "Les retours sont gérés par Amazon selon les délais et le processus de votre marketplace local." },
        { q: "Qui fournit le support ?", a: "Amazon gère la logistique de livraison et de retour. Eyegis Care gère les questions de produit, confort et garantie." },
        { q: "Et si mon produit arrive endommagé ?", a: "Signalez-le dans votre commande Amazon dans le délai de retour — le remplacement est généralement expédié immédiatement." },
      ],
    },
    support: {
      rule: "07 — Service Client",
      title: ["Besoin d'aide ?", "Une vraie personne vous attend."],
      lead: "Pour les questions produit, confort ou garantie — écrivez-nous. Pour la livraison ou les remboursements, ouvrez directement votre commande Amazon.",
      tiles: [
        { k: "Contact Eyegis", d: "care@eyegis.com", href: "mailto:care@eyegis.com" },
        { k: "Visiter la Boutique Amazon", d: "Voir toute la collection", href: "https://www.amazon.com.br/" },
        { k: "Garantie", d: "2 ans + confort 60 jours", href: "/warranty" },
        { k: "FAQ", d: "Verres, ajustement et entretien", href: "/lenses" },
      ],
      openLabel: "Ouvrir →",
      tileIndex: (n) => `0${n}`,
    },
    store: {
      rule: "08 — Boutique Officielle Amazon",
      title: ["La boutique officielle", "Eyegis."],
      bullets: ["Produits Vérifiés", "Paiement Sécurisé", "Livraison Rapide", "Avis de Confiance"],
      amazon: "Acheter sur Amazon",
      collections: "Explorer les Collections",
      footer: "Eyegis © 2026 — Livraison & Retours",
      home: "Accueil",
      warranty: "Garantie",
      about: "À propos",
      lenses: "Verres",
    },
  },
};


export const Route = createFileRoute("/shipping")({
  head: () =>
    buildSeo({
      title: "Shipping, Returns & Amazon Experience — Eyegis",
      description:
        "Every Eyegis purchase is fulfilled through Amazon — secure checkout, fast delivery, easy returns and trusted global support.",
      path: "/shipping",
    }),

  component: ShippingPage,
});

const OFFWHITE = "#F6F3EE";
const CHAMPAGNE = "#E9DFCC";
const INK = "#0E1613";
const TEAL = "#0C3B39";
const MUTED = "#6B6559";

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
      <span className="h-px w-10" style={{ background: light ? OFFWHITE : INK }} />
      <span
        className="text-[10px] uppercase tracking-[0.35em]"
        style={{ color: light ? OFFWHITE : INK, fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

const Icon = {
  Lock: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="8" y="18" width="24" height="16" rx="1.5" />
      <path d="M13 18 v-4 a7 7 0 0 1 14 0 v4" />
      <circle cx="20" cy="26" r="1.5" />
    </svg>
  ),
  Truck: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 12 h18 v14 H4 z" />
      <path d="M22 16 h8 l4 6 v4 h-12" />
      <circle cx="12" cy="28" r="3" />
      <circle cx="28" cy="28" r="3" />
    </svg>
  ),
  Return: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 20 A12 12 0 1 1 20 32" />
      <path d="M8 12 v8 h8" />
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 5 L24 15 L35 16 L27 24 L29 35 L20 30 L11 35 L13 24 L5 16 L16 15 Z" />
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 10 h12" />
      <path d="M10 4 v12" />
    </svg>
  ),
  Minus: () => (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 10 h12" />
    </svg>
  ),
};

const COUNTRY_COORDS: Record<string, { x: number; y: number; live: boolean }> = {
  "United States": { x: 205, y: 165, live: true },
  Canada: { x: 200, y: 130, live: true },
  "United Kingdom": { x: 425, y: 138, live: true },
  France: { x: 430, y: 150, live: true },
  Germany: { x: 470, y: 148, live: true },
  Italy: { x: 460, y: 165, live: true },
  Spain: { x: 415, y: 170, live: true },
  Brazil: { x: 260, y: 250, live: true },
  Japan: { x: 685, y: 175, live: false },
  Australia: { x: 720, y: 285, live: false },
  UAE: { x: 555, y: 195, live: false },
  Mexico: { x: 185, y: 210, live: false },
};

const WHY_ICONS = [<Icon.Lock />, <Icon.Truck />, <Icon.Return />, <Icon.Star />];

function ShippingPage() {
  const { lang } = useI18n();
  const c = CONTENT[lang];
  const serif = "'Cormorant Garamond', 'Times New Roman', serif";
  const sans = "'Inter', system-ui, sans-serif";

  const countries = COUNTRY_KEYS.map((key) => ({
    k: key,
    label: c.countries.names[key] ?? key,
    ...COUNTRY_COORDS[key],
  }));

  return (
    <main style={{ background: OFFWHITE, color: INK, fontFamily: sans }}>
      {/* HERO */}
      <section className="relative min-h-[74vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Picture
            source={heroImg}
            alt="Eyegis lifestyle scene — minimalist desk with Eyegis eyewear ready to ship"
            sizes="100vw"
            className="h-full w-full object-cover"
            style={{ filter: "saturate(0.92) contrast(1.02)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(14,22,19,0.10) 0%, rgba(246,243,238,0.4) 55%, rgba(246,243,238,0.95) 100%)" }} />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[74vh] max-w-[1400px] flex-col justify-between px-6 py-10 md:px-12 md:py-14">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <Link to="/" className="min-w-0 truncate text-[11px] uppercase tracking-[0.4em]" style={{ color: INK }}>
              {c.nav.back}
            </Link>
            <span className="shrink-0 text-[10px] uppercase tracking-[0.4em]" style={{ color: INK }}>
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
              <h1 className="mt-6 text-[52px] leading-[0.95] tracking-[-0.02em] md:text-[120px] lg:text-[152px]" style={{ fontFamily: serif, fontWeight: 400 }}>
                {c.hero.title[0]}
                <br />
                {c.hero.title[1]}
                <br />
                {c.hero.title[2]}
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 max-w-2xl text-[15px] leading-[1.75] md:text-[17px]" style={{ color: INK }}>
                {c.hero.lead}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 01 — WHY AMAZON */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label={c.why.rule} />
        </Reveal>
        <div className="mt-14 grid gap-16 md:grid-cols-12 md:items-end">
          <Reveal delay={100} className="md:col-span-7">
            <h2 className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[76px]" style={{ fontFamily: serif, fontWeight: 400 }}>
              {c.why.title}
            </h2>
          </Reveal>
          <Reveal delay={200} className="md:col-span-4 md:col-start-9">
            <p className="text-[13px] leading-[1.8]" style={{ color: MUTED }}>
              {c.why.lead}
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: "rgba(14,22,19,0.12)" }}>
          {c.why.cards.map((card, i) => (
            <Reveal key={card.k} delay={(i % 4) * 100}>
              <div className="group flex h-full min-h-[300px] flex-col justify-between p-10 transition-transform duration-700 hover:-translate-y-1" style={{ background: OFFWHITE }}>
                <div style={{ color: TEAL }}>{WHY_ICONS[i]}</div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: MUTED }}>
                    {c.why.tileIndex(i + 1)}
                  </span>
                  <h3 className="mt-3 text-[26px] leading-[1.05]" style={{ fontFamily: serif, fontWeight: 400 }}>
                    {card.k}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.7]" style={{ color: MUTED }}>
                    {card.d}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 02 — HOW YOUR ORDER WORKS */}
      <section style={{ background: CHAMPAGNE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <Rule label={c.steps.rule} />
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-10 max-w-[1100px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[72px]" style={{ fontFamily: serif, fontWeight: 400 }}>
              {c.steps.title[0]}
              <br />
              {c.steps.title[1]}
            </h2>
          </Reveal>

          <div className="mt-20">
            <div className="grid gap-0 md:grid-cols-6">
              {c.steps.items.map((s, i) => (
                <Reveal key={s.k} delay={i * 120}>
                  <div className="relative border-t px-2 py-8 md:border-t-0 md:border-l md:px-6 md:py-2" style={{ borderColor: "rgba(14,22,19,0.18)" }}>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 md:block">
                      <span className="min-w-0 text-[10px] uppercase tracking-[0.35em]" style={{ color: MUTED }}>
                        {c.steps.stepLabel(i + 1)}
                      </span>
                      <span className="shrink-0 text-[10px] tracking-[0.3em] md:hidden" style={{ color: MUTED }}>
                        {i < c.steps.items.length - 1 ? "↓" : "•"}
                      </span>
                    </div>
                    <h3 className="mt-4 text-[24px] leading-[1.05] md:mt-10 md:text-[28px]" style={{ fontFamily: serif, fontWeight: 400 }}>
                      {s.k}
                    </h3>
                    <p className="mt-3 text-[13px] leading-[1.7]" style={{ color: MUTED }}>
                      {s.d}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 — DELIVERY */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label={c.delivery.rule} />
        </Reveal>
        <div className="mt-16 grid gap-16 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-6">
            <Picture
              source={deliveryImg}
              alt="Eyegis premium package in transit — sealed and protected for global delivery"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-[70vh] w-full object-cover"
            />
          </Reveal>
          <div className="md:col-span-5 md:col-start-8">
            <Reveal delay={120}>
              <h2 className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[60px]" style={{ fontFamily: serif, fontWeight: 400 }}>
                {c.delivery.title[0]}
                <br />
                {c.delivery.title[1]}
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-10 space-y-6 text-[14px] leading-[1.85]" style={{ color: MUTED }}>
                {c.delivery.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 04 — RETURNS */}
      <section style={{ background: CHAMPAGNE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <Rule label={c.returns.rule} />
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-10 max-w-[1100px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[68px]" style={{ fontFamily: serif, fontWeight: 400 }}>
              {c.returns.title[0]}
              <br />
              {c.returns.title[1]}
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {c.returns.items.map((r, i) => (
              <Reveal key={r.k} delay={i * 120}>
                <article className="flex h-full min-h-[360px] flex-col justify-between p-10" style={{ background: OFFWHITE }}>
                  <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: TEAL }}>
                    {r.tag}
                  </span>
                  <div>
                    <h3 className="text-[26px] leading-[1.1]" style={{ fontFamily: serif, fontWeight: 400 }}>
                      {r.k}
                    </h3>
                    <p className="mt-4 text-[13px] leading-[1.75]" style={{ color: MUTED }}>
                      {r.d}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — COUNTRIES */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label={c.countries.rule} />
        </Reveal>
        <div className="mt-16 grid gap-16 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <Reveal delay={100}>
              <h2 className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[60px]" style={{ fontFamily: serif, fontWeight: 400 }}>
                {c.countries.title}
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-md text-[14px] leading-[1.85]" style={{ color: MUTED }}>
                {c.countries.lead}
              </p>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-10 grid grid-cols-2 gap-y-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: INK }}>
                {countries.filter(x => x.live).map((x) => (
                  <div key={x.k} className="flex items-center gap-3">
                    <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: TEAL }} />
                    <span className="truncate">{x.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-y-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: MUTED }}>
                {countries.filter(x => !x.live).map((x) => (
                  <div key={x.k} className="flex items-center gap-3">
                    <span className="inline-block h-1.5 w-1.5 rounded-full border" style={{ borderColor: MUTED }} />
                    <span className="truncate">{x.label} · {c.countries.soonSuffix}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={220} className="md:col-span-7">
            <WorldMap countries={countries} />
          </Reveal>
        </div>
      </section>

      {/* 06 — QUESTIONS */}
      <section style={{ background: CHAMPAGNE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <Rule label={c.faq.rule} />
          </Reveal>
          <div className="mt-14 grid gap-16 md:grid-cols-12">
            <Reveal delay={100} className="md:col-span-5">
              <h2 className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[60px]" style={{ fontFamily: serif, fontWeight: 400 }}>
                {c.faq.title[0]}
                <br />
                {c.faq.title[1]}
              </h2>
              <p className="mt-8 max-w-md text-[13px] leading-[1.8]" style={{ color: MUTED }}>
                {c.faq.lead}
              </p>
            </Reveal>
            <div className="md:col-span-7">
              <FAQList items={c.faq.items} />
            </div>
          </div>
        </div>
      </section>

      {/* 07 — CUSTOMER SUPPORT */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label={c.support.rule} />
        </Reveal>
        <div className="mt-14 grid gap-16 md:grid-cols-12 md:items-end">
          <Reveal delay={100} className="md:col-span-7">
            <h2 className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[68px]" style={{ fontFamily: serif, fontWeight: 400 }}>
              {c.support.title[0]}
              <br />
              {c.support.title[1]}
            </h2>
          </Reveal>
          <Reveal delay={200} className="md:col-span-4 md:col-start-9">
            <p className="text-[13px] leading-[1.8]" style={{ color: MUTED }}>
              {c.support.lead}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: "rgba(14,22,19,0.12)" }}>
          {c.support.tiles.map((b, i) => (
            <Reveal key={b.k} delay={i * 100}>
              <a
                href={b.href}
                target={b.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex h-full min-h-[220px] flex-col justify-between p-10 transition-colors hover:bg-[rgba(14,22,19,0.03)]"
                style={{ background: OFFWHITE, color: INK }}
              >
                <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: MUTED }}>
                  {c.support.tileIndex(i + 1)}
                </span>
                <div>
                  <h3 className="text-[26px] leading-[1.05]" style={{ fontFamily: serif, fontWeight: 400 }}>
                    {b.k}
                  </h3>
                  <p className="mt-3 text-[12px] leading-[1.7]" style={{ color: MUTED }}>
                    {b.d}
                  </p>
                </div>
                <span className="mt-8 text-[11px] uppercase tracking-[0.35em] transition-transform group-hover:translate-x-1" style={{ color: TEAL }}>
                  {c.support.openLabel}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 08 — OFFICIAL AMAZON STORE */}
      <section className="relative overflow-hidden" style={{ background: INK, color: OFFWHITE }}>
        <div className="absolute inset-0 opacity-30">
          <Picture
            source={storeImg}
            alt=""
            aria-hidden="true"
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-32 md:px-12 md:py-52">
          <Reveal>
            <Rule label={c.store.rule} light />
          </Reveal>

          <div className="mt-12 grid gap-16 md:grid-cols-12 md:items-end">
            <Reveal delay={120} className="md:col-span-7">
              <h2 className="text-[40px] leading-[1.02] tracking-[-0.02em] md:text-[92px]" style={{ fontFamily: serif, fontWeight: 400, color: OFFWHITE }}>
                {c.store.title[0]}
                <br />
                {c.store.title[1]}
              </h2>
              <ul className="mt-10 grid max-w-lg grid-cols-2 gap-y-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: "rgba(246,243,238,0.85)" }}>
                {c.store.bullets.map((k) => (
                  <li key={k} className="flex items-center gap-3">
                    <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: OFFWHITE }} />
                    <span className="truncate">{k}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={240} className="md:col-span-5">
              <a
                href="https://www.amazon.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-between px-8 py-6 text-[12px] uppercase tracking-[0.3em] transition-colors"
                style={{ background: OFFWHITE, color: INK }}
              >
                <span>{c.store.amazon}</span>
                <span>↗</span>
              </a>
              <Link
                to="/"
                hash="collections"
                className="mt-3 inline-flex w-full items-center justify-between border px-8 py-6 text-[12px] uppercase tracking-[0.3em] transition-colors hover:bg-[rgba(246,243,238,0.08)]"
                style={{ borderColor: OFFWHITE, color: OFFWHITE }}
              >
                <span>{c.store.collections}</span>
                <span>→</span>
              </Link>
            </Reveal>
          </div>

          <div className="mt-24 flex flex-col items-start justify-between gap-6 border-t pt-10 md:flex-row md:items-center" style={{ borderColor: "rgba(246,243,238,0.2)" }}>
            <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "rgba(246,243,238,0.5)" }}>
              {c.store.footer}
            </span>
            <div className="flex flex-wrap gap-8 text-[10px] uppercase tracking-[0.4em]" style={{ color: "rgba(246,243,238,0.7)" }}>
              <Link to="/">{c.store.home}</Link>
              <Link to="/warranty">{c.store.warranty}</Link>
              <Link to="/about">{c.store.about}</Link>
              <Link to="/lenses">{c.store.lenses}</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


function FAQList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t" style={{ borderColor: "rgba(14,22,19,0.2)" }}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className="border-b" style={{ borderColor: "rgba(14,22,19,0.2)" }}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-6 py-7 text-left"
            >
              <span
                className="min-w-0 text-[22px] leading-[1.15] md:text-[28px]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: INK }}
              >
                {it.q}
              </span>
              <span className="shrink-0" style={{ color: INK }}>
                {isOpen ? <Icon.Minus /> : <Icon.Plus />}
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-500"
              style={{ maxHeight: isOpen ? 320 : 0, opacity: isOpen ? 1 : 0 }}
            >
              <p className="pb-8 pr-10 text-[14px] leading-[1.85]" style={{ color: MUTED }}>
                {it.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function WorldMap({ countries }: { countries: { x: number; y: number; k: string; label: string; live: boolean }[] }) {
  const dots: { x: number; y: number }[] = [];
  const seed = (x: number, y: number) =>
    Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
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
          <circle key={i} cx={d.x} cy={d.y} r={1.1} fill="rgba(14,22,19,0.22)" />
        ))}
        {countries.map((c, i) => (
          <g key={c.k}>
            <circle
              cx={c.x}
              cy={c.y}
              r={4}
              fill={c.live ? TEAL : "transparent"}
              stroke={TEAL}
              strokeWidth={c.live ? 0 : 1}
            />
            {c.live && (
              <circle cx={c.x} cy={c.y} r={4} fill={TEAL}>
                <animate
                  attributeName="r"
                  values="4;14;4"
                  dur="3.2s"
                  begin={`${i * 0.25}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.5;0;0.5"
                  dur="3.2s"
                  begin={`${i * 0.25}s`}
                  repeatCount="indefinite"
                />
              </circle>
            )}
            <text
              x={c.x + 10}
              y={c.y + 4}
              fontSize="9"
              fill={c.live ? INK : MUTED}
              style={{ letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}
            >
              {c.label}

            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
