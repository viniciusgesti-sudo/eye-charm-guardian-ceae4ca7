import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { useEffect, useMemo, useRef, useState } from "react";

import heroImg from "@/assets/universe-lens-macro.jpg?w=768;1200;1920;2400&format=avif;webp;jpg&as=picture";
import { Picture } from "@/components/eyegis/Picture";
import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

export const Route = createFileRoute("/faq")({
  head: () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: CONTENT.EN.categories.flatMap((c) =>
        c.items.map((i) => ({
          "@type": "Question",
          name: i.q,
          acceptedAnswer: { "@type": "Answer", text: i.a },
        })),
      ),
    };
    const seo = buildSeo({
      title: "FAQ & Knowledge Center — Eyegis",
      description:
        "Answers about Eyegis lenses, EyegisGuard™ technology, shipping, warranty, returns and lens care. The Eyegis Knowledge Center.",
      path: "/faq",
    });
    return {
      ...seo,
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },

  component: FAQPage,
});

const OFFWHITE = "#F6F3EE";
const CHAMPAGNE = "#E9DFCC";
const INK = "#0E1613";
const TEAL = "#0C3B39";
const MUTED = "#4A4437";

const serif = "'Cormorant Garamond', 'Times New Roman', serif";
const sans = "'Inter', system-ui, sans-serif";

type RelatedKey = "technology" | "warranty" | "lenses" | "shipping" | "collections" | "contact";
type CategoryId =
  | "technology"
  | "products"
  | "blue-light"
  | "orders"
  | "shipping"
  | "returns"
  | "warranty"
  | "lens-care"
  | "general";

const Icon = {
  Cpu: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="8" y="8" width="16" height="16" />
      <rect x="12" y="12" width="8" height="8" />
      <path d="M4 12 h4 M4 16 h4 M4 20 h4 M24 12 h4 M24 16 h4 M24 20 h4 M12 4 v4 M16 4 v4 M20 4 v4 M12 24 v4 M16 24 v4 M20 24 v4" />
    </svg>
  ),
  Frame: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="10" cy="18" r="5" />
      <circle cx="22" cy="18" r="5" />
      <path d="M15 18 h2" />
    </svg>
  ),
  Wave: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 20 Q8 12 14 20 T26 20 T30 18" />
    </svg>
  ),
  Bag: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 10 h20 l-2 18 H8 Z" />
      <path d="M12 10 v-2 a4 4 0 0 1 8 0 v2" />
    </svg>
  ),
  Truck: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 10 h15 v12 H3 z M18 14 h6 l4 5 v3 h-10" />
      <circle cx="9" cy="24" r="2.5" />
      <circle cx="22" cy="24" r="2.5" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 3 L28 8 V17 C28 24 22 28 16 30 C10 28 4 24 4 17 V8 Z" />
    </svg>
  ),
  Return: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 16 A10 10 0 1 1 16 26" />
      <path d="M6 8 v8 h8" />
    </svg>
  ),
  Cloth: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 8 Q16 4 28 8 L26 26 Q16 30 6 26 Z" />
      <path d="M8 14 Q16 11 24 14 M9 20 Q16 17 23 20" />
    </svg>
  ),
  Info: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="16" cy="16" r="12" />
      <path d="M16 14 v8 M16 10 v0.01" />
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" />
      <path d="M16 16 L21 21" />
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 10 h12 M10 4 v12" />
    </svg>
  ),
  Minus: () => (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 10 h12" />
    </svg>
  ),
};

const CATEGORY_META: { id: CategoryId; index: string; icon: React.ReactNode }[] = [
  { id: "technology", index: "01", icon: <Icon.Cpu /> },
  { id: "products", index: "02", icon: <Icon.Frame /> },
  { id: "blue-light", index: "03", icon: <Icon.Wave /> },
  { id: "orders", index: "04", icon: <Icon.Bag /> },
  { id: "shipping", index: "05", icon: <Icon.Truck /> },
  { id: "returns", index: "06", icon: <Icon.Return /> },
  { id: "warranty", index: "07", icon: <Icon.Shield /> },
  { id: "lens-care", index: "08", icon: <Icon.Cloth /> },
  { id: "general", index: "09", icon: <Icon.Info /> },
];

type CategoryContent = {
  id: CategoryId;
  label: string;
  items: { q: string; a: string; related: RelatedKey[] }[];
};

type PageContent = {
  knowledgeCenter: string;
  back: string;
  eyebrow: string;
  h1: [string, string];
  intro: string;
  searchPlaceholder: string;
  searchAria: string;
  noResultsPrefix: string;
  noResultsSuffix: string;
  contactUs: string;
  open: string;
  categoriesRule: string;
  categoryLabel: (n: string) => string;
  answersCount: (n: number) => string;
  related: string;
  relatedMap: Record<RelatedKey, { label: string; to: string; hash?: string }>;
  stillNeedRule: string;
  stillNeedH2: [string, string];
  stillNeedIntro: string;
  ctaContact: string;
  ctaAmazon: string;
  ctaLenses: string;
  footerRights: string;
  footer: { home: string; lenses: string; warranty: string; shipping: string; about: string; contact: string };
  categories: CategoryContent[];
};

const CONTENT: Record<Lang, PageContent> = {
  EN: {
    knowledgeCenter: "Knowledge Center",
    back: "← Eyegis",
    eyebrow: "— FAQ & Knowledge",
    h1: ["Questions,", "answered beautifully."],
    intro:
      "Everything you need to know about Eyegis — our lenses, shipping, warranty and digital eye comfort.",
    searchPlaceholder: "Search for answers...",
    searchAria: "Search FAQ",
    noResultsPrefix: "No results for",
    noResultsSuffix: "Try a different word — or",
    contactUs: "contact us",
    open: "Open →",
    categoriesRule: "Categories",
    categoryLabel: (n) => `Category ${n}`,
    answersCount: (n) => `${n} answers in this category.`,
    related: "Related",
    relatedMap: {
      technology: { label: "Learn About EyegisGuard™", to: "/lenses" },
      warranty: { label: "Warranty", to: "/warranty" },
      lenses: { label: "Choose Your Lens", to: "/lenses" },
      shipping: { label: "Shipping & Returns", to: "/shipping" },
      collections: { label: "Explore Collections", to: "/", hash: "collections" },
      contact: { label: "Contact Us", to: "/contact" },
    },
    stillNeedRule: "Still need help",
    stillNeedH2: ["Didn't find", "your answer?"],
    stillNeedIntro:
      "Our care team responds within one business day — from a real person, in your language when available.",
    ctaContact: "Contact Us",
    ctaAmazon: "Visit Amazon Store",
    ctaLenses: "Explore Technology",
    footerRights: "Eyegis © 2026 — Knowledge Center",
    footer: {
      home: "Home",
      lenses: "Lenses",
      warranty: "Warranty",
      shipping: "Shipping",
      about: "About",
      contact: "Contact",
    },
    categories: [
      {
        id: "technology",
        label: "Technology",
        items: [
          { q: "What is EyegisGuard™?", a: "EyegisGuard™ is our proprietary lens system — a selective blue-light filter engineered to reduce the highest-energy portion of visible blue light (around 400–450nm) without visibly altering colors on your screen.", related: ["technology", "lenses"] },
          { q: "How does selective blue light filtering work?", a: "The lens coating and substrate are tuned to attenuate a narrow band of high-energy visible light while remaining highly transparent across the rest of the spectrum. The result is measurable filtration without a yellow cast.", related: ["technology", "lenses"] },
          { q: "Do Eyegis lenses change colors?", a: "No. Colors on your screen and in the world remain accurate — which is essential for designers, photographers and anyone working with color.", related: ["lenses"] },
          { q: "Why don't your lenses have a yellow tint?", a: "Yellow-tinted lenses filter a wide portion of the blue spectrum, distorting whites and colors. EyegisGuard™ filters a narrower band selectively, preserving color fidelity.", related: ["technology", "lenses"] },
          { q: "What's different from ordinary blue-light glasses?", a: "Ordinary lenses often either filter too little to be measurable, or filter so aggressively that they distort color. Eyegis publishes third-party optical data and designs frames worthy of daily wear.", related: ["technology", "collections"] },
        ],
      },
      {
        id: "products",
        label: "Products",
        items: [
          { q: "Which collection is right for me?", a: "Use the Choose Your Lens experience — a short guided flow that recommends the best Eyegis collection based on how you actually use screens.", related: ["lenses", "collections"] },
          { q: "Can I wear Eyegis every day?", a: "Yes. Every frame is designed for all-day comfort and timeless style — not a technical accessory you take off between meetings.", related: ["collections"] },
          { q: "Are the frames lightweight?", a: "Eyegis frames are engineered with TR90 and β-titanium for an ultralight feel — designed to disappear on your face during long wear.", related: ["collections"] },
          { q: "What materials are used?", a: "Ultralight TR90, hypoallergenic β-titanium, Italian acetate and stainless spring hinges — chosen for longevity, comfort and repairability.", related: ["collections", "warranty"] },
          { q: "Can I wear them with headphones?", a: "Yes. Slim TR90 temples are designed to sit comfortably under most audio and gaming headsets.", related: ["collections"] },
        ],
      },
      {
        id: "blue-light",
        label: "Blue Light",
        items: [
          { q: "Do blue-light glasses really work?", a: "Independent lab data confirms that Eyegis lenses attenuate high-energy visible light in the 400–450nm band. Whether that improves personal comfort varies by individual — which is why we offer a 60-day comfort guarantee.", related: ["technology", "warranty"] },
          { q: "What does current research say?", a: "Peer-reviewed research on symptomatic relief remains mixed. We publish what our lenses do optically and let you decide, backed by our comfort guarantee.", related: ["technology"] },
          { q: "Does Eyegis make medical claims?", a: "No. Eyegis is a lifestyle eyewear brand. We do not diagnose, treat or cure any condition. Consult a qualified optometrist for medical advice.", related: ["technology"] },
          { q: "Why is Honest Science™ important?", a: "The blue-light category is full of unverifiable claims. Honest Science™ means every optical statement we make is measurable and independently verified.", related: ["technology"] },
        ],
      },
      {
        id: "orders",
        label: "Orders",
        items: [
          { q: "Where can I buy Eyegis?", a: "Eyegis is sold exclusively through the official Amazon Store in supported marketplaces.", related: ["shipping"] },
          { q: "Why do purchases happen through Amazon?", a: "Amazon offers secure checkout, fast global logistics and trusted returns — freeing us to focus on the product itself.", related: ["shipping"] },
          { q: "Can I use Amazon Prime?", a: "Yes. Where Prime is available, Eyegis products are eligible for Prime shipping and returns.", related: ["shipping"] },
          { q: "How do I track my order?", a: "All orders are tracked end-to-end inside your Amazon account.", related: ["shipping"] },
        ],
      },
      {
        id: "shipping",
        label: "Shipping",
        items: [
          { q: "How long does delivery take?", a: "Delivery times vary by country and Amazon marketplace and are quoted in real time at checkout.", related: ["shipping"] },
          { q: "Which countries are supported?", a: "Eyegis currently ships across the United States, Canada, United Kingdom, France, Germany, Italy, Spain and Brazil, with more markets on the roadmap.", related: ["shipping"] },
          { q: "How is shipping calculated?", a: "Shipping cost is calculated by Amazon based on your marketplace, delivery speed and Prime status.", related: ["shipping"] },
        ],
      },
      {
        id: "returns",
        label: "Returns",
        items: [
          { q: "How do returns work?", a: "Returns are managed by Amazon under your local marketplace's return window and process.", related: ["shipping", "warranty"] },
          { q: "Can I exchange products?", a: "Yes — initiate a return from your Amazon order page and reorder your preferred model or size.", related: ["shipping"] },
          { q: "What if my product arrives damaged?", a: "Report it inside your Amazon order within the return window — replacement is typically dispatched immediately.", related: ["shipping", "warranty"] },
        ],
      },
      {
        id: "warranty",
        label: "Warranty",
        items: [
          { q: "What does the warranty cover?", a: "Two years of coverage against manufacturing defects — frame construction, hinges, materials, lens manufacturing and craftsmanship.", related: ["warranty"] },
          { q: "What isn't covered?", a: "Accidental damage, drops, crushing, normal scratches, improper cleaning, heat exposure and unauthorized modifications sit outside the warranty. Paid repairs may still be available.", related: ["warranty"] },
          { q: "How do I request support?", a: "Email care@eyegis.com with your Amazon order ID. A member of the care team replies within one business day.", related: ["contact", "warranty"] },
        ],
      },
      {
        id: "lens-care",
        label: "Lens Care",
        items: [
          { q: "How should I clean my lenses?", a: "Use only the microfiber cloth and lens spray supplied. Rinse with lukewarm water first if the lens is dusty, then dry gently.", related: ["warranty"] },
          { q: "Can I use alcohol?", a: "No. Alcohol, ammonia and household glass cleaners will degrade lens coatings over time.", related: ["warranty"] },
          { q: "How should I store my glasses?", a: "Return your Eyegis to its hardshell case whenever they're not on your face.", related: ["warranty"] },
          { q: "Can I travel with them?", a: "Yes — but never leave your frames in a hot car or in direct sunlight for long periods, as heat can distort the frame material.", related: ["warranty", "shipping"] },
        ],
      },
      {
        id: "general",
        label: "General",
        items: [
          { q: "Is Eyegis a certified medical device?", a: "No. Eyegis is a premium lifestyle eyewear brand and does not sell medical devices.", related: ["technology"] },
          { q: "How do I contact the Eyegis team?", a: "Reach us at care@eyegis.com for product and care questions, or partners@eyegis.com for business enquiries.", related: ["contact"] },
        ],
      },
    ],
  },
  PT: {
    knowledgeCenter: "Central de Conhecimento",
    back: "← Eyegis",
    eyebrow: "— FAQ & Conhecimento",
    h1: ["Perguntas,", "respondidas com elegância."],
    intro:
      "Tudo o que você precisa saber sobre a Eyegis — nossas lentes, envio, garantia e conforto visual digital.",
    searchPlaceholder: "Buscar respostas...",
    searchAria: "Buscar no FAQ",
    noResultsPrefix: "Nenhum resultado para",
    noResultsSuffix: "Tente outra palavra — ou",
    contactUs: "fale conosco",
    open: "Abrir →",
    categoriesRule: "Categorias",
    categoryLabel: (n) => `Categoria ${n}`,
    answersCount: (n) => `${n} respostas nesta categoria.`,
    related: "Relacionados",
    relatedMap: {
      technology: { label: "Conheça o EyegisGuard™", to: "/lenses" },
      warranty: { label: "Garantia", to: "/warranty" },
      lenses: { label: "Escolha sua Lente", to: "/lenses" },
      shipping: { label: "Envio e Devoluções", to: "/shipping" },
      collections: { label: "Ver Coleções", to: "/", hash: "collections" },
      contact: { label: "Fale Conosco", to: "/contact" },
    },
    stillNeedRule: "Ainda precisa de ajuda",
    stillNeedH2: ["Não encontrou", "sua resposta?"],
    stillNeedIntro:
      "Nossa equipe responde em até um dia útil — por uma pessoa real, no seu idioma quando disponível.",
    ctaContact: "Fale Conosco",
    ctaAmazon: "Visitar a Loja na Amazon",
    ctaLenses: "Explorar a Tecnologia",
    footerRights: "Eyegis © 2026 — Central de Conhecimento",
    footer: {
      home: "Início",
      lenses: "Lentes",
      warranty: "Garantia",
      shipping: "Envio",
      about: "Sobre",
      contact: "Contato",
    },
    categories: [
      {
        id: "technology",
        label: "Tecnologia",
        items: [
          { q: "O que é o EyegisGuard™?", a: "O EyegisGuard™ é nosso sistema de lentes proprietário — um filtro seletivo de luz azul projetado para reduzir a faixa de maior energia da luz azul visível (cerca de 400–450nm) sem alterar visivelmente as cores da sua tela.", related: ["technology", "lenses"] },
          { q: "Como funciona a filtragem seletiva de luz azul?", a: "O revestimento e o substrato da lente são calibrados para atenuar uma faixa estreita de luz visível de alta energia, mantendo alta transparência no restante do espectro. O resultado é uma filtragem mensurável sem tom amarelado.", related: ["technology", "lenses"] },
          { q: "As lentes Eyegis alteram as cores?", a: "Não. As cores da sua tela e do mundo permanecem fiéis — essencial para designers, fotógrafos e qualquer profissional que trabalhe com cor.", related: ["lenses"] },
          { q: "Por que suas lentes não têm tom amarelo?", a: "Lentes amareladas filtram uma faixa ampla do espectro azul, distorcendo brancos e cores. O EyegisGuard™ filtra seletivamente uma faixa mais estreita, preservando a fidelidade cromática.", related: ["technology", "lenses"] },
          { q: "O que difere dos óculos anti-luz azul comuns?", a: "Lentes comuns costumam filtrar tão pouco que não é mensurável, ou filtram de forma tão agressiva que distorcem as cores. A Eyegis publica dados ópticos de laboratórios independentes e desenha armações à altura do uso diário.", related: ["technology", "collections"] },
        ],
      },
      {
        id: "products",
        label: "Produtos",
        items: [
          { q: "Qual coleção é ideal para mim?", a: "Use a experiência Escolha sua Lente — um guia curto que recomenda a melhor coleção Eyegis com base no seu uso real de telas.", related: ["lenses", "collections"] },
          { q: "Posso usar Eyegis todos os dias?", a: "Sim. Cada armação é desenhada para conforto o dia inteiro e estilo atemporal — não um acessório técnico que se tira entre reuniões.", related: ["collections"] },
          { q: "As armações são leves?", a: "As armações Eyegis são construídas em TR90 e β-titânio para uma sensação ultraleve — pensadas para desaparecer no rosto durante o uso prolongado.", related: ["collections"] },
          { q: "Quais materiais são utilizados?", a: "TR90 ultraleve, β-titânio hipoalergênico, acetato italiano e dobradiças de mola em aço inox — escolhidos por durabilidade, conforto e possibilidade de reparo.", related: ["collections", "warranty"] },
          { q: "Posso usar com fones de ouvido?", a: "Sim. As hastes finas em TR90 foram desenhadas para acomodar a maioria dos fones e headsets gamers.", related: ["collections"] },
        ],
      },
      {
        id: "blue-light",
        label: "Luz Azul",
        items: [
          { q: "Óculos anti-luz azul realmente funcionam?", a: "Dados de laboratórios independentes confirmam que as lentes Eyegis atenuam a luz visível de alta energia entre 400–450nm. Se isso melhora seu conforto pessoal varia caso a caso — por isso oferecemos a garantia de conforto de 60 dias.", related: ["technology", "warranty"] },
          { q: "O que a pesquisa atual diz?", a: "As evidências científicas sobre alívio de sintomas ainda são mistas. Publicamos o que nossas lentes fazem opticamente e deixamos você decidir, com a segurança da nossa garantia de conforto.", related: ["technology"] },
          { q: "A Eyegis faz alegações médicas?", a: "Não. A Eyegis é uma marca de eyewear lifestyle. Não diagnosticamos, tratamos ou curamos condições. Consulte um oftalmologista qualificado para orientação médica.", related: ["technology"] },
          { q: "Por que a Honest Science™ importa?", a: "A categoria de luz azul é cheia de promessas não verificáveis. Honest Science™ significa que cada afirmação óptica é mensurável e verificada por terceiros.", related: ["technology"] },
        ],
      },
      {
        id: "orders",
        label: "Pedidos",
        items: [
          { q: "Onde posso comprar Eyegis?", a: "A Eyegis é vendida exclusivamente pela loja oficial na Amazon nos marketplaces suportados.", related: ["shipping"] },
          { q: "Por que as compras são via Amazon?", a: "A Amazon oferece checkout seguro, logística global rápida e devoluções confiáveis — nos deixando livres para focar no produto.", related: ["shipping"] },
          { q: "Posso usar Amazon Prime?", a: "Sim. Onde o Prime estiver disponível, os produtos Eyegis são elegíveis a envio e devolução Prime.", related: ["shipping"] },
          { q: "Como acompanho meu pedido?", a: "Todos os pedidos são rastreados de ponta a ponta dentro da sua conta Amazon.", related: ["shipping"] },
        ],
      },
      {
        id: "shipping",
        label: "Envio",
        items: [
          { q: "Quanto tempo leva a entrega?", a: "Os prazos variam conforme o país e o marketplace da Amazon, sendo exibidos em tempo real no checkout.", related: ["shipping"] },
          { q: "Quais países são atendidos?", a: "Atualmente entregamos nos Estados Unidos, Canadá, Reino Unido, França, Alemanha, Itália, Espanha e Brasil, com mais mercados no roadmap.", related: ["shipping"] },
          { q: "Como é calculado o frete?", a: "O frete é calculado pela Amazon conforme seu marketplace, velocidade de entrega e status Prime.", related: ["shipping"] },
        ],
      },
      {
        id: "returns",
        label: "Devoluções",
        items: [
          { q: "Como funcionam as devoluções?", a: "As devoluções são gerenciadas pela Amazon, conforme a janela e o processo do seu marketplace local.", related: ["shipping", "warranty"] },
          { q: "Posso trocar produtos?", a: "Sim — inicie uma devolução na página do pedido na Amazon e refaça o pedido do modelo ou tamanho desejado.", related: ["shipping"] },
          { q: "E se o produto chegar danificado?", a: "Reporte pela sua página de pedido na Amazon dentro do prazo — a reposição costuma ser despachada imediatamente.", related: ["shipping", "warranty"] },
        ],
      },
      {
        id: "warranty",
        label: "Garantia",
        items: [
          { q: "O que a garantia cobre?", a: "Dois anos de cobertura contra defeitos de fabricação — armação, dobradiças, materiais, fabricação das lentes e acabamento.", related: ["warranty"] },
          { q: "O que não é coberto?", a: "Danos acidentais, quedas, esmagamento, arranhões normais, limpeza incorreta, exposição a calor e modificações não autorizadas ficam fora da garantia. Reparos pagos podem estar disponíveis.", related: ["warranty"] },
          { q: "Como solicito suporte?", a: "Escreva para care@eyegis.com com seu ID de pedido da Amazon. Nossa equipe responde em até um dia útil.", related: ["contact", "warranty"] },
        ],
      },
      {
        id: "lens-care",
        label: "Cuidado com as Lentes",
        items: [
          { q: "Como devo limpar minhas lentes?", a: "Use apenas o pano de microfibra e o spray fornecidos. Se estiver com poeira, enxágue com água morna antes e seque com cuidado.", related: ["warranty"] },
          { q: "Posso usar álcool?", a: "Não. Álcool, amônia e produtos de limpeza de vidro comuns degradam os revestimentos ao longo do tempo.", related: ["warranty"] },
          { q: "Como devo guardar meus óculos?", a: "Volte o Eyegis para o estojo rígido sempre que não estiver com ele no rosto.", related: ["warranty"] },
          { q: "Posso viajar com eles?", a: "Sim — mas nunca deixe as armações em carros quentes ou sob sol direto por longos períodos, pois o calor pode deformar o material.", related: ["warranty", "shipping"] },
        ],
      },
      {
        id: "general",
        label: "Geral",
        items: [
          { q: "A Eyegis é um dispositivo médico certificado?", a: "Não. A Eyegis é uma marca premium de eyewear lifestyle e não comercializa dispositivos médicos.", related: ["technology"] },
          { q: "Como falo com a equipe Eyegis?", a: "Fale com a gente em care@eyegis.com para dúvidas sobre produto e cuidados, ou partners@eyegis.com para parcerias comerciais.", related: ["contact"] },
        ],
      },
    ],
  },
  FR: {
    knowledgeCenter: "Centre de Connaissance",
    back: "← Eyegis",
    eyebrow: "— FAQ & Connaissance",
    h1: ["Vos questions,", "des réponses justes."],
    intro:
      "Tout ce qu'il faut savoir sur Eyegis — nos verres, la livraison, la garantie et le confort visuel numérique.",
    searchPlaceholder: "Rechercher une réponse...",
    searchAria: "Rechercher dans la FAQ",
    noResultsPrefix: "Aucun résultat pour",
    noResultsSuffix: "Essayez un autre mot — ou",
    contactUs: "contactez-nous",
    open: "Ouvrir →",
    categoriesRule: "Catégories",
    categoryLabel: (n) => `Catégorie ${n}`,
    answersCount: (n) => `${n} réponses dans cette catégorie.`,
    related: "En lien",
    relatedMap: {
      technology: { label: "Découvrir EyegisGuard™", to: "/lenses" },
      warranty: { label: "Garantie", to: "/warranty" },
      lenses: { label: "Choisir vos Verres", to: "/lenses" },
      shipping: { label: "Livraison & Retours", to: "/shipping" },
      collections: { label: "Voir les Collections", to: "/", hash: "collections" },
      contact: { label: "Nous Contacter", to: "/contact" },
    },
    stillNeedRule: "Besoin d'aide",
    stillNeedH2: ["Vous n'avez pas", "trouvé la réponse ?"],
    stillNeedIntro:
      "Notre équipe répond sous un jour ouvré — par une vraie personne, dans votre langue quand c'est possible.",
    ctaContact: "Nous Contacter",
    ctaAmazon: "Visiter la Boutique Amazon",
    ctaLenses: "Explorer la Technologie",
    footerRights: "Eyegis © 2026 — Centre de Connaissance",
    footer: {
      home: "Accueil",
      lenses: "Verres",
      warranty: "Garantie",
      shipping: "Livraison",
      about: "À propos",
      contact: "Contact",
    },
    categories: [
      {
        id: "technology",
        label: "Technologie",
        items: [
          { q: "Qu'est-ce qu'EyegisGuard™ ?", a: "EyegisGuard™ est notre système de verres propriétaire — un filtre sélectif de lumière bleue conçu pour réduire la portion à plus haute énergie de la lumière bleue visible (environ 400–450nm) sans altérer visiblement les couleurs de votre écran.", related: ["technology", "lenses"] },
          { q: "Comment fonctionne le filtrage sélectif ?", a: "Le traitement et le substrat du verre sont calibrés pour atténuer une bande étroite de lumière visible à haute énergie, tout en restant très transparents sur le reste du spectre. Résultat : une filtration mesurable, sans teinte jaune.", related: ["technology", "lenses"] },
          { q: "Les verres Eyegis modifient-ils les couleurs ?", a: "Non. Les couleurs de vos écrans et du monde restent fidèles — essentiel pour designers, photographes et tous les métiers de la couleur.", related: ["lenses"] },
          { q: "Pourquoi vos verres n'ont-ils pas de teinte jaune ?", a: "Les verres jaunes filtrent une large partie du spectre bleu et déforment blancs et couleurs. EyegisGuard™ filtre sélectivement une bande plus étroite, préservant la fidélité chromatique.", related: ["technology", "lenses"] },
          { q: "Quelle différence avec les lunettes anti-lumière bleue classiques ?", a: "Les verres classiques filtrent souvent trop peu pour être mesurables, ou trop agressivement au point de fausser les couleurs. Eyegis publie des données optiques de laboratoires indépendants et dessine des montures dignes du quotidien.", related: ["technology", "collections"] },
        ],
      },
      {
        id: "products",
        label: "Produits",
        items: [
          { q: "Quelle collection est faite pour moi ?", a: "Utilisez l'expérience Choisir vos Verres — un parcours guidé qui recommande la meilleure collection Eyegis selon votre usage réel des écrans.", related: ["lenses", "collections"] },
          { q: "Puis-je porter Eyegis tous les jours ?", a: "Oui. Chaque monture est pensée pour un confort toute la journée et un style intemporel — pas un accessoire technique à retirer entre deux réunions.", related: ["collections"] },
          { q: "Les montures sont-elles légères ?", a: "Les montures Eyegis sont conçues en TR90 et β-titane pour une sensation ultra-légère — pensées pour se faire oublier lors d'un port prolongé.", related: ["collections"] },
          { q: "Quels matériaux sont utilisés ?", a: "TR90 ultraléger, β-titane hypoallergénique, acétate italien et charnières à ressort en acier inoxydable — choisis pour la longévité, le confort et la réparabilité.", related: ["collections", "warranty"] },
          { q: "Puis-je les porter avec un casque ?", a: "Oui. Les branches fines en TR90 s'adaptent confortablement sous la plupart des casques audio et gaming.", related: ["collections"] },
        ],
      },
      {
        id: "blue-light",
        label: "Lumière Bleue",
        items: [
          { q: "Les lunettes anti-lumière bleue fonctionnent-elles ?", a: "Des données de laboratoires indépendants confirment que les verres Eyegis atténuent la lumière visible à haute énergie entre 400 et 450nm. L'amélioration ressentie varie selon chacun — d'où notre garantie confort de 60 jours.", related: ["technology", "warranty"] },
          { q: "Que dit la recherche actuelle ?", a: "Les études évaluées par les pairs sur le soulagement des symptômes restent mitigées. Nous publions ce que nos verres font optiquement et vous laissons décider, avec notre garantie confort.", related: ["technology"] },
          { q: "Eyegis fait-elle des allégations médicales ?", a: "Non. Eyegis est une marque de lunettes lifestyle. Nous ne diagnostiquons, ne traitons ni ne guérissons aucune condition. Consultez un ophtalmologiste qualifié pour un avis médical.", related: ["technology"] },
          { q: "Pourquoi Honest Science™ est important ?", a: "La catégorie anti-lumière bleue regorge de promesses invérifiables. Honest Science™ signifie que chaque affirmation optique est mesurable et vérifiée par des tiers.", related: ["technology"] },
        ],
      },
      {
        id: "orders",
        label: "Commandes",
        items: [
          { q: "Où puis-je acheter Eyegis ?", a: "Eyegis est vendu exclusivement sur la boutique officielle Amazon dans les marchés pris en charge.", related: ["shipping"] },
          { q: "Pourquoi les achats se font via Amazon ?", a: "Amazon offre un paiement sécurisé, une logistique mondiale rapide et des retours fiables — ce qui nous permet de nous concentrer sur le produit.", related: ["shipping"] },
          { q: "Puis-je utiliser Amazon Prime ?", a: "Oui. Là où Prime est disponible, les produits Eyegis sont éligibles à la livraison et aux retours Prime.", related: ["shipping"] },
          { q: "Comment suivre ma commande ?", a: "Toutes les commandes sont suivies de bout en bout depuis votre compte Amazon.", related: ["shipping"] },
        ],
      },
      {
        id: "shipping",
        label: "Livraison",
        items: [
          { q: "Quels sont les délais de livraison ?", a: "Les délais varient selon le pays et le marché Amazon, et sont indiqués en temps réel au paiement.", related: ["shipping"] },
          { q: "Quels pays sont desservis ?", a: "Eyegis livre actuellement aux États-Unis, au Canada, au Royaume-Uni, en France, Allemagne, Italie, Espagne et au Brésil, avec d'autres marchés en préparation.", related: ["shipping"] },
          { q: "Comment le prix de livraison est-il calculé ?", a: "Le prix de livraison est calculé par Amazon selon votre marché, la vitesse choisie et votre statut Prime.", related: ["shipping"] },
        ],
      },
      {
        id: "returns",
        label: "Retours",
        items: [
          { q: "Comment fonctionnent les retours ?", a: "Les retours sont gérés par Amazon selon la fenêtre et la procédure de votre marché local.", related: ["shipping", "warranty"] },
          { q: "Puis-je échanger mes produits ?", a: "Oui — initiez un retour depuis votre page de commande Amazon et recommandez le modèle ou la taille souhaités.", related: ["shipping"] },
          { q: "Que faire si mon produit arrive endommagé ?", a: "Signalez-le depuis votre commande Amazon dans la fenêtre de retour — le remplacement est généralement expédié immédiatement.", related: ["shipping", "warranty"] },
        ],
      },
      {
        id: "warranty",
        label: "Garantie",
        items: [
          { q: "Que couvre la garantie ?", a: "Deux ans de couverture contre les défauts de fabrication — construction de la monture, charnières, matériaux, fabrication des verres et finitions.", related: ["warranty"] },
          { q: "Qu'est-ce qui n'est pas couvert ?", a: "Dommages accidentels, chutes, écrasement, rayures normales, mauvais nettoyage, exposition à la chaleur et modifications non autorisées ne sont pas couverts. Des réparations payantes peuvent rester possibles.", related: ["warranty"] },
          { q: "Comment demander de l'aide ?", a: "Écrivez à care@eyegis.com avec votre numéro de commande Amazon. Notre équipe répond sous un jour ouvré.", related: ["contact", "warranty"] },
        ],
      },
      {
        id: "lens-care",
        label: "Entretien",
        items: [
          { q: "Comment nettoyer mes verres ?", a: "Utilisez uniquement le chiffon microfibre et le spray fournis. Si les verres sont poussiéreux, rincez d'abord à l'eau tiède, puis séchez délicatement.", related: ["warranty"] },
          { q: "Puis-je utiliser de l'alcool ?", a: "Non. L'alcool, l'ammoniaque et les nettoyants pour vitres domestiques dégradent les traitements au fil du temps.", related: ["warranty"] },
          { q: "Comment ranger mes lunettes ?", a: "Remettez vos Eyegis dans leur étui rigide dès que vous ne les portez pas.", related: ["warranty"] },
          { q: "Puis-je voyager avec ?", a: "Oui — mais ne laissez jamais vos montures dans une voiture chaude ou en plein soleil trop longtemps, la chaleur peut déformer le matériau.", related: ["warranty", "shipping"] },
        ],
      },
      {
        id: "general",
        label: "Général",
        items: [
          { q: "Eyegis est-elle un dispositif médical certifié ?", a: "Non. Eyegis est une marque premium de lunettes lifestyle et ne commercialise pas de dispositifs médicaux.", related: ["technology"] },
          { q: "Comment contacter l'équipe Eyegis ?", a: "Écrivez à care@eyegis.com pour les questions produit et entretien, ou partners@eyegis.com pour les demandes commerciales.", related: ["contact"] },
        ],
      },
    ],
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
  y = 20,
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
        transition: `opacity 800ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 800ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Rule({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-10" style={{ background: INK }} />
      <span
        className="text-[10px] uppercase tracking-[0.35em]"
        style={{ color: INK, fontFamily: sans }}
      >
        {label}
      </span>
    </div>
  );
}

function FAQPage() {
  const { lang } = useI18n();
  const c = CONTENT[lang];

  const categories = useMemo(
    () =>
      CATEGORY_META.map((meta) => {
        const localized = c.categories.find((x) => x.id === meta.id)!;
        return { ...meta, label: localized.label, items: localized.items };
      }),
    [c],
  );

  const allQuestions = useMemo(
    () =>
      categories.flatMap((cat) =>
        cat.items.map((i) => ({ ...i, category: cat.label, categoryId: cat.id })),
      ),
    [categories],
  );

  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>(categories[0].id);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!q) return null;
    return allQuestions
      .filter(
        (item) =>
          item.q.toLowerCase().includes(q) ||
          item.a.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q),
      )
      .slice(0, 12);
  }, [q, allQuestions]);

  const activeCategory = categories.find((cat) => cat.id === active)!;

  return (
    <main style={{ background: OFFWHITE, color: INK, fontFamily: sans }}>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Picture
            source={heroImg}
            alt=""
            aria-hidden="true"
            sizes="100vw"
            className="h-full w-full object-cover"
            style={{ filter: "saturate(0.85) contrast(1.02)" }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(246,243,238,0.85) 0%, rgba(246,243,238,0.95) 60%, rgba(246,243,238,1) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 pt-10 pb-16 md:px-12 md:pt-14 md:pb-24">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <Link
              to="/"
              className="min-w-0 truncate text-[11px] uppercase tracking-[0.4em]"
              style={{ color: INK }}
            >
              {c.back}
            </Link>
            <span
              className="shrink-0 text-[10px] uppercase tracking-[0.4em]"
              style={{ color: INK }}
            >
              {c.knowledgeCenter}
            </span>
          </div>

          <div className="mt-20 max-w-[1200px] md:mt-28">
            <Reveal>
              <span className="text-[11px] uppercase tracking-[0.5em]" style={{ color: TEAL }}>
                {c.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h1
                className="mt-6 text-[44px] leading-[0.98] tracking-[-0.02em] md:text-[96px] lg:text-[120px]"
                style={{ fontFamily: serif, fontWeight: 400 }}
              >
                {c.h1[0]}
                <br />
                {c.h1[1]}
              </h1>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-8 max-w-2xl text-[15px] leading-[1.75] md:text-[17px]" style={{ color: INK }}>
                {c.intro}
              </p>
            </Reveal>

            {/* SEARCH */}
            <Reveal delay={320}>
              <div
                className="mt-12 flex items-center gap-4 rounded-full px-6 py-4 md:px-8 md:py-5"
                style={{
                  background: OFFWHITE,
                  boxShadow: "0 30px 60px -30px rgba(14,22,19,0.25)",
                  border: "1px solid rgba(14,22,19,0.08)",
                }}
              >
                <span style={{ color: MUTED }}>
                  <Icon.Search />
                </span>
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value.slice(0, 120))}
                  placeholder={c.searchPlaceholder}
                  className="min-w-0 flex-1 bg-transparent text-[15px] outline-none md:text-[17px]"
                  style={{ color: INK }}
                  maxLength={120}
                  aria-label={c.searchAria}
                />
                <kbd
                  className="hidden shrink-0 rounded-md border px-2 py-1 text-[10px] uppercase tracking-[0.3em] md:inline-block"
                  style={{ borderColor: "rgba(14,22,19,0.2)", color: MUTED }}
                >
                  ⌘ K
                </kbd>
              </div>

              {filtered && (
                <div
                  className="mt-4 overflow-hidden rounded-2xl"
                  style={{
                    background: OFFWHITE,
                    border: "1px solid rgba(14,22,19,0.1)",
                    boxShadow: "0 20px 40px -30px rgba(14,22,19,0.2)",
                  }}
                >
                  {filtered.length === 0 ? (
                    <div className="px-6 py-8 text-[14px]" style={{ color: MUTED }}>
                      {c.noResultsPrefix} "{query}". {c.noResultsSuffix}{" "}
                      <Link to="/contact" style={{ color: TEAL }}>
                        {c.contactUs}
                      </Link>
                      .
                    </div>
                  ) : (
                    <ul>
                      {filtered.map((r) => (
                        <li
                          key={r.categoryId + r.q}
                          className="border-b last:border-b-0"
                          style={{ borderColor: "rgba(14,22,19,0.08)" }}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setActive(r.categoryId);
                              setOpenKey(r.categoryId + "::" + r.q);
                              setQuery("");
                              setTimeout(() => {
                                document
                                  .getElementById("faq-body")
                                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
                              }, 40);
                            }}
                            className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-6 px-6 py-4 text-left transition-colors hover:bg-[rgba(14,22,19,0.04)]"
                          >
                            <span className="min-w-0">
                              <span
                                className="block truncate text-[15px]"
                                style={{ fontFamily: serif, color: INK }}
                              >
                                {r.q}
                              </span>
                              <span
                                className="mt-1 block text-[10px] uppercase tracking-[0.3em]"
                                style={{ color: MUTED }}
                              >
                                {r.category}
                              </span>
                            </span>
                            <span
                              className="shrink-0 text-[11px] uppercase tracking-[0.3em]"
                              style={{ color: TEAL }}
                            >
                              {c.open}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* CATEGORY NAV + BODY */}
      <section id="faq-body" className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-32">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-16 md:grid-cols-12">
          <aside className="min-w-0 md:col-span-4 lg:col-span-3">
            <div className="sticky top-6">
              <Rule label={c.categoriesRule} />
              <nav className="mt-8 -mx-2 flex snap-x gap-2 overflow-x-auto md:mx-0 md:block md:overflow-visible">
                {categories.map((cat) => {
                  const on = cat.id === active;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setActive(cat.id);
                        setOpenKey(null);
                      }}
                      className="group flex shrink-0 snap-start items-center gap-3 whitespace-nowrap rounded-full px-4 py-2 text-[12px] uppercase tracking-[0.28em] transition-colors md:w-full md:shrink md:justify-between md:whitespace-normal md:rounded-none md:border-b md:px-0 md:py-4"
                      style={{
                        color: on ? INK : MUTED,
                        borderColor: on ? INK : "rgba(14,22,19,0.12)",
                        background: on ? CHAMPAGNE : "transparent",
                      }}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="shrink-0" style={{ color: on ? TEAL : MUTED }}>
                          {cat.icon}
                        </span>
                        <span className="truncate">{cat.label}</span>
                      </span>
                      <span
                        className="hidden shrink-0 text-[10px] tracking-[0.3em] md:inline"
                        style={{ color: on ? TEAL : MUTED }}
                      >
                        {cat.index}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <div className="min-w-0 md:col-span-8 lg:col-span-9">
            <div key={activeCategory.id} style={{ animation: "fade-in 0.4s ease-out both" }}>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4">
                <h2
                  className="min-w-0 text-[36px] leading-[1.05] tracking-[-0.01em] md:text-[64px]"
                  style={{ fontFamily: serif, fontWeight: 400 }}
                >
                  {activeCategory.label}
                </h2>
                <span
                  className="shrink-0 text-[10px] uppercase tracking-[0.35em]"
                  style={{ color: MUTED }}
                >
                  {c.categoryLabel(activeCategory.index)}
                </span>
              </div>
              <p className="mt-4 max-w-xl text-[13px] leading-[1.7]" style={{ color: MUTED }}>
                {c.answersCount(activeCategory.items.length)}
              </p>

              <div className="mt-10 border-t" style={{ borderColor: "rgba(14,22,19,0.15)" }}>
                {activeCategory.items.map((item) => {
                  const key = activeCategory.id + "::" + item.q;
                  const isOpen = openKey === key;
                  return (
                    <div
                      key={item.q}
                      className="border-b"
                      style={{ borderColor: "rgba(14,22,19,0.15)" }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenKey(isOpen ? null : key)}
                        className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-6 py-7 text-left"
                        aria-expanded={isOpen}
                      >
                        <span
                          className="min-w-0 text-[20px] leading-[1.2] md:text-[26px]"
                          style={{ fontFamily: serif, fontWeight: 400, color: INK }}
                        >
                          {item.q}
                        </span>
                        <span
                          className="shrink-0"
                          style={{ color: INK, transition: "transform 300ms" }}
                        >
                          {isOpen ? <Icon.Minus /> : <Icon.Plus />}
                        </span>
                      </button>
                      <div
                        className="overflow-hidden transition-all duration-500"
                        style={{ maxHeight: isOpen ? 600 : 0, opacity: isOpen ? 1 : 0 }}
                      >
                        <div className="pb-8">
                          <p className="max-w-2xl text-[15px] leading-[1.85]" style={{ color: MUTED }}>
                            {item.a}
                          </p>

                          {item.related.length > 0 && (
                            <div className="mt-8">
                              <div
                                className="text-[10px] uppercase tracking-[0.35em]"
                                style={{ color: TEAL }}
                              >
                                {c.related}
                              </div>
                              <div className="mt-4 flex flex-wrap gap-2">
                                {item.related.map((r) => {
                                  const rel = c.relatedMap[r];
                                  return (
                                    <Link
                                      key={r}
                                      to={rel.to}
                                      hash={rel.hash}
                                      className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.3em] transition-colors hover:bg-[rgba(14,22,19,0.04)]"
                                      style={{ borderColor: "rgba(14,22,19,0.25)", color: INK }}
                                    >
                                      <span>{rel.label}</span>
                                      <span style={{ color: TEAL }}>→</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STILL NEED HELP */}
      <section style={{ background: CHAMPAGNE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <div className="grid gap-16 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-7">
              <Rule label={c.stillNeedRule} />
              <h2
                className="mt-8 text-[40px] leading-[1.02] tracking-[-0.02em] md:text-[80px]"
                style={{ fontFamily: serif, fontWeight: 400 }}
              >
                {c.stillNeedH2[0]}
                <br />
                {c.stillNeedH2[1]}
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-[1.85]" style={{ color: MUTED }}>
                {c.stillNeedIntro}
              </p>
            </Reveal>
            <Reveal delay={120} className="md:col-span-5">
              <div className="flex flex-col gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-between px-8 py-5 text-[12px] uppercase tracking-[0.3em]"
                  style={{ background: INK, color: OFFWHITE }}
                >
                  <span>{c.ctaContact}</span>
                  <span>→</span>
                </Link>
                <a
                  href="https://www.amazon.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between border px-8 py-5 text-[12px] uppercase tracking-[0.3em] transition-colors hover:bg-[rgba(14,22,19,0.04)]"
                  style={{ borderColor: INK, color: INK }}
                >
                  <span>{c.ctaAmazon}</span>
                  <span>↗</span>
                </a>
                <Link
                  to="/lenses"
                  className="inline-flex items-center justify-between border px-8 py-5 text-[12px] uppercase tracking-[0.3em] transition-colors hover:bg-[rgba(14,22,19,0.04)]"
                  style={{ borderColor: "rgba(14,22,19,0.35)", color: INK }}
                >
                  <span>{c.ctaLenses}</span>
                  <span>→</span>
                </Link>
              </div>
            </Reveal>
          </div>

          <div
            className="mt-24 flex flex-col items-start justify-between gap-6 border-t pt-10 md:flex-row md:items-center"
            style={{ borderColor: "rgba(14,22,19,0.2)" }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
              {c.footerRights}
            </span>
            <div
              className="flex flex-wrap gap-8 text-[10px] uppercase tracking-[0.4em]"
              style={{ color: MUTED }}
            >
              <Link to="/">{c.footer.home}</Link>
              <Link to="/lenses">{c.footer.lenses}</Link>
              <Link to="/warranty">{c.footer.warranty}</Link>
              <Link to="/shipping">{c.footer.shipping}</Link>
              <Link to="/about">{c.footer.about}</Link>
              <Link to="/contact">{c.footer.contact}</Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
