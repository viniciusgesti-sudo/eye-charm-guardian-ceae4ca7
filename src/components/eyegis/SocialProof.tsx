import { useEffect, useRef, useState } from "react";

import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";
import { AMAZON_RATING } from "@/lib/amazon";

import lifeBusiness from "@/assets/life-business.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture";
import lifeCreative from "@/assets/life-creative.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture";
import lifeGaming from "@/assets/life-gaming.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture";
import lifeStudent from "@/assets/life-student.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture";
import lifeTravel from "@/assets/life-travel.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture";
import lifestyleArch from "@/assets/lifestyle-architecture.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture";
import lifestyleWork from "@/assets/lifestyle-work.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture";
import lifestyleTravel from "@/assets/lifestyle-travel.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture";
import portrait from "@/assets/universe-portrait.jpg?w=160;320;480&format=avif;webp;jpg&as=picture";
import guardBusiness from "@/assets/guard-life-business.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture";
import guardCreative from "@/assets/guard-life-creative.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture";
import guardStudent from "@/assets/guard-life-student.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture";
import guardGamer from "@/assets/guard-life-gamer.jpg?w=480;768;1200&format=avif;webp;jpg&as=picture";

import { Picture, type PictureSource } from "./Picture";

/* ------------------------------------------------------------------ */
/*  Reveal hook                                                       */
/* ------------------------------------------------------------------ */

function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
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
/*  Gallery data (imagery static; captions/collection localized)      */
/* ------------------------------------------------------------------ */

type ShotMeta = {
  id: string;
  src: PictureSource;
  alt: string;
  collectionKey: keyof Copy["collections"];
  product: string;
  span: string;
};

const SHOTS: ShotMeta[] = [
  { id: "creative-studio", src: lifeCreative, alt: "Creative studio", collectionKey: "womenCreative", product: "Solène", span: "md:col-span-6 md:row-span-2 aspect-[4/5]" },
  { id: "business-meeting", src: lifeBusiness, alt: "Business meeting", collectionKey: "menBusiness", product: "Atelier", span: "md:col-span-3 aspect-[4/5]" },
  { id: "architecture", src: lifestyleArch, alt: "Architectural interior", collectionKey: "menEveryday", product: "Meridian", span: "md:col-span-3 aspect-square" },
  { id: "student", src: lifeStudent, alt: "Student reading", collectionKey: "kids", product: "Marais", span: "md:col-span-3 aspect-square" },
  { id: "editing", src: guardCreative, alt: "Photographer editing", collectionKey: "womenCreative", product: "Solène", span: "md:col-span-3 aspect-[4/5]" },
  { id: "travel", src: lifeTravel, alt: "Traveler on a train", collectionKey: "menEveryday", product: "Meridian", span: "md:col-span-6 md:row-span-2 aspect-[16/11]" },
  { id: "founder", src: guardBusiness, alt: "Founder at standing desk", collectionKey: "menBusiness", product: "Atelier", span: "md:col-span-3 aspect-[4/5]" },
  { id: "gaming-late", src: guardGamer, alt: "Late-night gaming", collectionKey: "menGaming", product: "Meridian", span: "md:col-span-3 aspect-square" },
  { id: "streamer", src: lifeGaming, alt: "Streamer setup", collectionKey: "menGaming", product: "Meridian", span: "md:col-span-3 aspect-square" },
  { id: "kitchen", src: lifestyleWork, alt: "Remote worker in kitchen", collectionKey: "womenEveryday", product: "Solène", span: "md:col-span-3 aspect-[4/5]" },
  { id: "airport", src: lifestyleTravel, alt: "Airport terminal", collectionKey: "menBusiness", product: "Atelier", span: "md:col-span-3 aspect-[4/5]" },
  { id: "portrait", src: portrait, alt: "Portrait", collectionKey: "womenCreative", product: "Solène", span: "md:col-span-3 aspect-[4/5]" },
];

type TestimonialMeta = {
  id: string;
  name: string;
  country: string;
  rating: number;
  portrait: PictureSource;
};

const TESTIMONIALS: TestimonialMeta[] = [
  { id: "camille", name: "Camille", country: "Paris, France", rating: 5, portrait: lifeCreative },
  { id: "andres", name: "Andrés", country: "São Paulo, Brazil", rating: 5, portrait: guardBusiness },
  { id: "naomi", name: "Naomi", country: "Tokyo, Japan", rating: 5, portrait: guardCreative },
  { id: "lea", name: "Léa", country: "Zurich, Switzerland", rating: 5, portrait: lifestyleTravel },
  { id: "miguel", name: "Miguel", country: "Lisbon, Portugal", rating: 5, portrait: guardStudent },
  { id: "priya", name: "Priya", country: "London, United Kingdom", rating: 5, portrait: portrait },
];

/* ------------------------------------------------------------------ */
/*  Stats                                                             */
/* ------------------------------------------------------------------ */

type StatMeta = { id: "customers" | "rating" | "warranty" | "comfort"; isNumber?: boolean; value?: number; suffix?: string; target?: string };

const STATS: StatMeta[] = [
  { id: "customers", isNumber: true, value: 100000, suffix: "+" },
  { id: "rating", target: "4.9★" },
  { id: "warranty", target: "2-Year" },
  { id: "comfort", target: "60-Day" },
];

function useCount(target: number, active: boolean, duration = 1600) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return n;
}

/* ------------------------------------------------------------------ */
/*  Localized copy                                                    */
/* ------------------------------------------------------------------ */

type Copy = {
  intro: { eyebrow: string; headline1: string; headline2: string; p1: string; p2: string };
  collections: {
    womenCreative: string;
    menBusiness: string;
    menEveryday: string;
    kids: string;
    menGaming: string;
    womenEveryday: string;
  };
  captions: Record<string, string>;
  lightbox: { body: (caption: string) => string; buyOnAmazon: string; details: string; close: string; open: (caption: string) => string };
  quote1Prefix: string;
  quote1Italic: string;
  quote1Attribution: string;
  quote2Prefix: string;
  quote2Italic: string;
  quote2Attribution: string;
  roles: Record<string, string>;
  quotes: Record<string, string>;
  verified: string;
  ratingAria: (n: number) => string;
  numbersEyebrow: string;
  numbersHeadline1: string;
  numbersHeadline2: string;
  stats: Record<StatMeta["id"], string>;
  shippingEyebrow: string;
  shippingHeadline: string;
  shippingLead: string;
  signals: string[];
  finalEyebrow: string;
  finalHeadline1: string;
  finalHeadline2: string;
  ctaBuy: string;
  ctaExplore: string;
};

const COPY: Record<Lang, Copy> = {
  EN: {
    intro: {
      eyebrow: "Trusted by Modern Digital Professionals",
      headline1: "See how Eyegis fits into",
      headline2: "everyday life.",
      p1: "From creative professionals to entrepreneurs, students and gamers, thousands of people spend hours in front of screens every day.",
      p2: "Eyegis was created to help them do it more comfortably — without compromising style.",
    },
    collections: {
      womenCreative: "Women · Creative",
      menBusiness: "Men · Business",
      menEveryday: "Men · Everyday",
      kids: "Kids & Teens",
      menGaming: "Men · Gaming",
      womenEveryday: "Women · Everyday",
    },
    captions: {
      "creative-studio": "The studio at 4pm",
      "business-meeting": "Between meetings",
      "architecture": "Concrete, glass, silence",
      "student": "Long reading hours",
      "editing": "Editing until midnight",
      "travel": "En route to Lisbon",
      "founder": "Morning deep-work",
      "gaming-late": "Session #47",
      "streamer": "On stream",
      "kitchen": "Kitchen table office",
      "airport": "Gate B24 · 06:41",
      "portrait": "Off-duty",
    },
    lightbox: {
      body: (caption) =>
        `${caption} — captured in an unretouched moment of everyday wear. EyegisGuard™ optical filter, TR90 frame, natural color perception.`,
      buyOnAmazon: "Buy on Amazon",
      details: "Product Details",
      close: "Close",
      open: (caption) => `Open ${caption}`,
    },
    quote1Prefix: "Finally, blue-light glasses I actually",
    quote1Italic: "want to wear.",
    quote1Attribution: "Camille · Architect · Paris",
    quote2Prefix: "Comfort that doesn't",
    quote2Italic: "compromise style.",
    quote2Attribution: "Naomi · Photographer · Tokyo",
    roles: {
      camille: "Architect",
      andres: "Software Engineer",
      naomi: "Photographer",
      lea: "Financial Analyst",
      miguel: "Graphic Designer",
      priya: "Content Creator",
    },
    quotes: {
      camille: "The frame is barely there. After ten hours in front of drawings, I still feel calm and focused.",
      andres: "Colors on my screen stay accurate — my design work looks the same before and after wearing them.",
      naomi: "I need true tones when I retouch. Eyegis is the first pair I trust for late-night editing sessions.",
      lea: "Elegant enough for the office, comfortable enough for the flight home. That's the whole story.",
      miguel: "I forgot the amber tint I dreaded. Everything looks natural, my eyes just feel less tired.",
      priya: "Comfort I actually notice — plus a frame my audience keeps asking me about.",
    },
    verified: "✓ Verified purchase",
    ratingAria: (n) => `${n} out of 5 stars`,
    numbersEyebrow: "In numbers",
    numbersHeadline1: "A quiet trust,",
    numbersHeadline2: "built worldwide.",
    stats: {
      customers: "Happy Customers",
      rating: "Average Rating",
      warranty: "International Warranty",
      comfort: "Comfort Guarantee",
    },
    shippingEyebrow: "Shipping worldwide",
    shippingHeadline: "Available in 40+ countries.",
    shippingLead: "From São Paulo to Tokyo, Eyegis reaches modern professionals across five continents.",
    signals: ["Amazon", "CE Certified", "Premium Optical Standards", "TR90 Technology", "2-Year Warranty", "Worldwide Shipping"],
    finalEyebrow: "Eyegis · Everyday",
    finalHeadline1: "Ready to experience",
    finalHeadline2: "Eyegis?",
    ctaBuy: "Buy on Amazon",
    ctaExplore: "Explore Collections",
  },
  PT: {
    intro: {
      eyebrow: "Escolha de profissionais digitais modernos",
      headline1: "Veja como a Eyegis se encaixa",
      headline2: "no dia a dia.",
      p1: "De criativos a empreendedores, estudantes e gamers, milhares de pessoas passam horas em frente a telas todos os dias.",
      p2: "A Eyegis foi criada para tornar isso mais confortável — sem abrir mão do estilo.",
    },
    collections: {
      womenCreative: "Mulher · Criativa",
      menBusiness: "Homem · Business",
      menEveryday: "Homem · Todo dia",
      kids: "Kids & Teens",
      menGaming: "Homem · Gaming",
      womenEveryday: "Mulher · Todo dia",
    },
    captions: {
      "creative-studio": "O estúdio às 16h",
      "business-meeting": "Entre reuniões",
      "architecture": "Concreto, vidro, silêncio",
      "student": "Longas horas de leitura",
      "editing": "Editando até meia-noite",
      "travel": "A caminho de Lisboa",
      "founder": "Foco profundo pela manhã",
      "gaming-late": "Sessão #47",
      "streamer": "Ao vivo",
      "kitchen": "Escritório na mesa da cozinha",
      "airport": "Portão B24 · 06:41",
      "portrait": "Fora do expediente",
    },
    lightbox: {
      body: (caption) =>
        `${caption} — um instante cotidiano capturado sem retoque. Filtro óptico EyegisGuard™, armação TR90, percepção natural de cor.`,
      buyOnAmazon: "Comprar na Amazon",
      details: "Detalhes do produto",
      close: "Fechar",
      open: (caption) => `Abrir ${caption}`,
    },
    quote1Prefix: "Finalmente, óculos de luz azul que eu",
    quote1Italic: "quero usar.",
    quote1Attribution: "Camille · Arquiteta · Paris",
    quote2Prefix: "Conforto que não",
    quote2Italic: "compromete o estilo.",
    quote2Attribution: "Naomi · Fotógrafa · Tóquio",
    roles: {
      camille: "Arquiteta",
      andres: "Engenheiro de Software",
      naomi: "Fotógrafa",
      lea: "Analista Financeira",
      miguel: "Designer Gráfico",
      priya: "Criadora de Conteúdo",
    },
    quotes: {
      camille: "A armação quase não está lá. Após dez horas em frente aos desenhos, ainda me sinto calma e focada.",
      andres: "As cores da minha tela continuam fiéis — meu trabalho de design fica igual antes e depois de usá-los.",
      naomi: "Preciso de tons verdadeiros ao retocar. A Eyegis é a primeira em que confio para sessões noturnas.",
      lea: "Elegantes para o escritório, confortáveis para o voo de volta. É essa a história.",
      miguel: "Esqueci o tom âmbar que eu temia. Tudo parece natural, e meus olhos cansam menos.",
      priya: "Conforto que sinto de verdade — e uma armação que meu público sempre pergunta.",
    },
    verified: "✓ Compra verificada",
    ratingAria: (n) => `${n} de 5 estrelas`,
    numbersEyebrow: "Em números",
    numbersHeadline1: "Uma confiança silenciosa,",
    numbersHeadline2: "construída no mundo todo.",
    stats: {
      customers: "Clientes Felizes",
      rating: "Avaliação Média",
      warranty: "Garantia Internacional",
      comfort: "Garantia de Conforto",
    },
    shippingEyebrow: "Envio para o mundo",
    shippingHeadline: "Disponível em mais de 40 países.",
    shippingLead: "De São Paulo a Tóquio, a Eyegis alcança profissionais modernos nos cinco continentes.",
    signals: ["Amazon", "Certificação CE", "Padrões Ópticos Premium", "Tecnologia TR90", "2 Anos de Garantia", "Envio Mundial"],
    finalEyebrow: "Eyegis · Todo dia",
    finalHeadline1: "Pronto para viver",
    finalHeadline2: "a Eyegis?",
    ctaBuy: "Comprar na Amazon",
    ctaExplore: "Explorar Coleções",
  },
  FR: {
    intro: {
      eyebrow: "Choisie par les professionnels du numérique",
      headline1: "Voyez comment Eyegis s'inscrit",
      headline2: "dans la vie quotidienne.",
      p1: "Des créatifs aux entrepreneurs, en passant par les étudiants et les gamers, des milliers de personnes passent des heures devant un écran chaque jour.",
      p2: "Eyegis a été créée pour les aider à le faire plus confortablement — sans renoncer au style.",
    },
    collections: {
      womenCreative: "Femme · Créative",
      menBusiness: "Homme · Business",
      menEveryday: "Homme · Quotidien",
      kids: "Enfants & Ados",
      menGaming: "Homme · Gaming",
      womenEveryday: "Femme · Quotidien",
    },
    captions: {
      "creative-studio": "Le studio à 16h",
      "business-meeting": "Entre deux réunions",
      "architecture": "Béton, verre, silence",
      "student": "De longues heures de lecture",
      "editing": "Retouches jusqu'à minuit",
      "travel": "En route pour Lisbonne",
      "founder": "Deep-work du matin",
      "gaming-late": "Session #47",
      "streamer": "En live",
      "kitchen": "Bureau sur la table de cuisine",
      "airport": "Porte B24 · 06:41",
      "portrait": "En pause",
    },
    lightbox: {
      body: (caption) =>
        `${caption} — un instant du quotidien capté sans retouche. Filtre optique EyegisGuard™, monture TR90, perception naturelle des couleurs.`,
      buyOnAmazon: "Acheter sur Amazon",
      details: "Détails du produit",
      close: "Fermer",
      open: (caption) => `Ouvrir ${caption}`,
    },
    quote1Prefix: "Enfin des lunettes anti-lumière bleue que",
    quote1Italic: "j'ai envie de porter.",
    quote1Attribution: "Camille · Architecte · Paris",
    quote2Prefix: "Un confort qui ne",
    quote2Italic: "sacrifie pas le style.",
    quote2Attribution: "Naomi · Photographe · Tokyo",
    roles: {
      camille: "Architecte",
      andres: "Ingénieur logiciel",
      naomi: "Photographe",
      lea: "Analyste financière",
      miguel: "Designer graphique",
      priya: "Créatrice de contenu",
    },
    quotes: {
      camille: "La monture se fait oublier. Après dix heures sur des plans, je reste calme et concentrée.",
      andres: "Les couleurs de mon écran restent justes — mon travail de design est identique avant et après.",
      naomi: "J'ai besoin de tons vrais pour retoucher. Eyegis est la première paire à laquelle je fais confiance la nuit.",
      lea: "Élégantes pour le bureau, confortables pour le vol retour. Tout est dit.",
      miguel: "Fini la teinte ambre que je redoutais. Tout paraît naturel et mes yeux fatiguent moins.",
      priya: "Un confort que je remarque vraiment — et une monture dont mon audience me parle sans cesse.",
    },
    verified: "✓ Achat vérifié",
    ratingAria: (n) => `${n} étoiles sur 5`,
    numbersEyebrow: "En chiffres",
    numbersHeadline1: "Une confiance discrète,",
    numbersHeadline2: "bâtie dans le monde entier.",
    stats: {
      customers: "Clients satisfaits",
      rating: "Note moyenne",
      warranty: "Garantie internationale",
      comfort: "Essai confort",
    },
    shippingEyebrow: "Livraison mondiale",
    shippingHeadline: "Disponible dans plus de 40 pays.",
    shippingLead: "De São Paulo à Tokyo, Eyegis accompagne les professionnels modernes sur cinq continents.",
    signals: ["Amazon", "Certifié CE", "Standards optiques premium", "Technologie TR90", "Garantie 2 ans", "Livraison mondiale"],
    finalEyebrow: "Eyegis · Quotidien",
    finalHeadline1: "Prêt à découvrir",
    finalHeadline2: "Eyegis ?",
    ctaBuy: "Acheter sur Amazon",
    ctaExplore: "Découvrir les collections",
  },
};

/* ------------------------------------------------------------------ */
/*  Stat block                                                        */
/* ------------------------------------------------------------------ */

function StatBlock({ stat, label, lang }: { stat: StatMeta; label: string; lang: Lang }) {
  const { ref, shown } = useReveal<HTMLDivElement>(0.4);
  const count = useCount(stat.value ?? 0, shown && !!stat.isNumber);
  const locale = lang === "PT" ? "pt-BR" : lang === "FR" ? "fr-FR" : "en-US";
  const display = stat.isNumber
    ? `${count.toLocaleString(locale)}${stat.suffix ?? ""}`
    : stat.target ?? "";
  return (
    <div ref={ref} className="border-t border-ink/10 pt-6">
      <div className="font-editorial text-ink text-5xl md:text-6xl leading-none tabular-nums">
        {display}
      </div>
      <div className="mt-4 font-eyebrow text-[10px] text-ink/55">{label}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Lightbox                                                          */
/* ------------------------------------------------------------------ */

function Lightbox({ shot, copy, onClose }: { shot: ShotMeta; copy: Copy; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const caption = copy.captions[shot.id] ?? shot.id;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 backdrop-blur-2xl px-4 py-6 animate-[fadeIn_400ms_ease-out_both]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        aria-label={copy.lightbox.close}
        onClick={onClose}
        className="absolute top-6 right-6 grid h-10 w-10 place-items-center rounded-full border border-paper/25 text-paper hover:bg-paper/10 transition-colors"
      >
        ✕
      </button>

      <div
        className="grid w-full max-w-[1200px] grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lg:col-span-3">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-ink">
            <Picture
              source={shot.src}
              alt={shot.alt}
              sizes="(min-width:1024px) 60vw, 100vw"
              priority
              className="h-full max-h-[78vh] w-full object-cover animate-[zoomIn_800ms_cubic-bezier(0.22,1,0.36,1)_both]"
            />
          </div>
        </div>
        <div className="lg:col-span-2 flex flex-col justify-center text-paper">
          <span className="font-eyebrow text-mint">{copy.collections[shot.collectionKey]}</span>
          <h4 className="mt-4 font-editorial text-4xl md:text-5xl leading-[0.98]">
            {shot.product}
            <span className="block italic text-mint">by Eyegis</span>
          </h4>
          <p className="mt-6 font-light text-paper/75 leading-relaxed max-w-md">
            {copy.lightbox.body(caption)}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="https://www.amazon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-6 rounded-full bg-mint px-6 py-4 text-teal-deep hover:-translate-y-0.5 transition-all duration-500"
            >
              <span className="font-eyebrow">{copy.lightbox.buyOnAmazon}</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="/product/meridian"
              className="inline-flex items-center justify-center rounded-full border border-paper/25 px-6 py-4 font-eyebrow text-paper hover:bg-paper/10 transition-colors"
            >
              {copy.lightbox.details}
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(1.04) }
          to   { opacity: 1; transform: scale(1) }
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  World map                                                         */
/* ------------------------------------------------------------------ */

const COUNTRIES = [
  { name: "USA", x: 205, y: 195 },
  { name: "Brazil", x: 340, y: 320 },
  { name: "Portugal", x: 470, y: 195 },
  { name: "France", x: 495, y: 175 },
  { name: "UK", x: 485, y: 155 },
  { name: "Switzerland", x: 505, y: 180 },
  { name: "Germany", x: 512, y: 168 },
  { name: "Italy", x: 515, y: 195 },
  { name: "UAE", x: 605, y: 235 },
  { name: "Japan", x: 815, y: 205 },
  { name: "Singapore", x: 760, y: 300 },
  { name: "Australia", x: 810, y: 380 },
  { name: "Canada", x: 220, y: 130 },
  { name: "Mexico", x: 195, y: 240 },
  { name: "Spain", x: 475, y: 195 },
];

function WorldMap() {
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 960 480" className="w-full h-auto text-ink/25" aria-hidden="true">
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1="0" x2="960" y1={80 + i * 60} y2={80 + i * 60} stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 6" />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} y1="40" y2="440" x1={40 + i * 88} x2={40 + i * 88} stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 6" />
        ))}
        <g fill="currentColor" opacity="0.14">
          <path d="M120,120 C160,110 220,105 260,120 C300,140 285,180 260,205 C230,235 210,255 175,245 C140,235 115,200 110,170 Z" />
          <path d="M300,275 C325,270 355,285 355,320 C355,360 335,385 315,395 C295,400 285,375 285,340 C285,310 290,285 300,275 Z" />
          <path d="M470,150 C495,140 520,145 530,165 C540,190 520,205 500,210 C475,215 465,190 465,175 Z" />
          <path d="M500,220 C525,215 555,230 555,265 C555,305 530,335 510,340 C490,340 480,315 480,280 C480,250 490,225 500,220 Z" />
          <path d="M570,180 C620,170 700,175 745,195 C780,215 785,245 750,255 C700,265 640,255 605,240 C580,225 565,205 570,180 Z" />
          <path d="M760,175 C795,170 830,185 835,210 C835,235 810,245 785,240 C760,235 750,215 750,195 Z" />
          <path d="M780,360 C805,355 840,365 845,385 C845,405 820,415 795,410 C775,405 770,385 775,370 Z" />
        </g>

        {COUNTRIES.map((c, i) => (
          <g key={c.name}>
            <circle
              cx={c.x}
              cy={c.y}
              r="8"
              fill="currentColor"
              className="text-teal"
              opacity="0.15"
              style={{
                animation: `mapPulse 3.4s ease-in-out ${i * 0.15}s infinite`,
                transformOrigin: `${c.x}px ${c.y}px`,
              }}
            />
            <circle cx={c.x} cy={c.y} r="2.4" className="text-teal" fill="currentColor" />
          </g>
        ))}
      </svg>

      <style>{`
        @keyframes mapPulse {
          0%,100% { transform: scale(1); opacity: 0.15; }
          50%     { transform: scale(1.8); opacity: 0.02; }
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stars                                                             */
/* ------------------------------------------------------------------ */

function StarRow({ n, aria }: { n: number; aria: string }) {
  return (
    <div className="flex items-center gap-0.5 text-teal" aria-label={aria}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={i < n ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1"
          aria-hidden="true"
        >
          <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */

export function SocialProof() {
  const { lang } = useI18n();
  const copy = COPY[lang];
  const [open, setOpen] = useState<ShotMeta | null>(null);

  const testimonial = (t: TestimonialMeta) => (
    <article className="h-full rounded-lg border border-ink/10 bg-paper-warm/60 backdrop-blur-sm p-8 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 overflow-hidden rounded-full bg-ink/10">
          <Picture source={t.portrait} alt={`${t.name}, ${copy.roles[t.id]}`} sizes="56px" className="h-full w-full object-cover" />
        </div>
        <div>
          <div className="font-editorial text-ink text-lg leading-tight">{t.name}</div>
          <div className="font-eyebrow text-[10px] text-ink/55">
            {copy.roles[t.id]} · {t.country}
          </div>
        </div>
      </div>
      <StarRow n={t.rating} aria={copy.ratingAria(t.rating)} />
      <p className="font-light text-ink/80 leading-relaxed">"{copy.quotes[t.id]}"</p>
      <span className="mt-auto font-eyebrow text-[9px] text-teal">{copy.verified}</span>
    </article>
  );

  return (
    <section id="social-proof" className="relative bg-paper">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 pt-28 md:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="font-eyebrow text-teal">{copy.intro.eyebrow}</span>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-6 font-editorial text-ink text-4xl md:text-6xl lg:text-7xl leading-[0.95]">
                {copy.intro.headline1}
                <span className="block italic text-teal">{copy.intro.headline2}</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={220}>
              <p className="font-light text-lg leading-relaxed text-ink/70">{copy.intro.p1}</p>
              <p className="mt-4 font-light text-lg leading-relaxed text-ink/70">{copy.intro.p2}</p>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 mt-20 md:mt-28">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4">
          {SHOTS.map((s, i) => {
            const caption = copy.captions[s.id] ?? s.id;
            return (
              <Reveal
                key={s.id}
                delay={i * 60}
                className={`col-span-2 ${s.span} relative overflow-hidden rounded-md bg-paper-warm group`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(s)}
                  className="block h-full w-full text-left aspect-[3/4] bg-teal-deep/10"
                  aria-label={copy.lightbox.open(caption)}
                >
                  <Picture
                    source={s.src}
                    alt={s.alt}
                    sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                    className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-x-5 bottom-5 flex items-end justify-between text-paper opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    <div>
                      <div className="font-eyebrow text-[9px] text-mint">
                        {copy.collections[s.collectionKey]}
                      </div>
                      <div className="mt-1 font-editorial text-lg leading-tight">{caption}</div>
                    </div>
                    <span
                      aria-hidden="true"
                      className="grid h-9 w-9 place-items-center rounded-full bg-paper/15 backdrop-blur-md"
                    >
                      ↗
                    </span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-28 md:py-40">
        <Reveal>
          <p className="font-editorial text-ink text-4xl md:text-6xl lg:text-7xl leading-[1.02] text-balance-tight">
            <span className="text-teal">"</span>
            {copy.quote1Prefix}{" "}
            <span className="italic text-teal">{copy.quote1Italic}</span>
            <span className="text-teal">"</span>
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-8 flex items-center gap-3 font-eyebrow text-[10px] text-ink/50">
            <span className="h-px w-10 bg-ink/30" />
            {copy.quote1Attribution}
          </div>
        </Reveal>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <Reveal key={t.id} delay={i * 100}>
              {testimonial(t)}
            </Reveal>
          ))}
        </div>
      </div>

      <div className="bg-paper-warm mt-28 md:mt-40 py-28 md:py-40">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <Reveal>
            <p className="font-editorial text-ink text-4xl md:text-6xl lg:text-7xl leading-[1.02] text-balance-tight">
              <span className="text-teal">"</span>
              {copy.quote2Prefix}{" "}
              <span className="italic text-teal">{copy.quote2Italic}</span>
              <span className="text-teal">"</span>
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-8 flex items-center gap-3 font-eyebrow text-[10px] text-ink/50">
              <span className="h-px w-10 bg-ink/30" />
              {copy.quote2Attribution}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 mt-20 md:mt-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(3).map((t, i) => (
            <Reveal key={t.id} delay={i * 100}>
              {testimonial(t)}
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 mt-28 md:mt-40">
        <Reveal>
          <span className="font-eyebrow text-teal">{copy.numbersEyebrow}</span>
        </Reveal>
        <Reveal delay={100}>
          <h3 className="mt-4 max-w-3xl font-editorial text-ink text-3xl md:text-5xl leading-[0.98]">
            {copy.numbersHeadline1}
            <span className="italic text-teal"> {copy.numbersHeadline2}</span>
          </h3>
        </Reveal>
        <Reveal delay={180}>
          <a
            href={AMAZON_RATING.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="mt-8 inline-flex items-center gap-4 rounded-full border border-ink/15 bg-paper/60 px-5 py-3 hover:border-teal/60 hover:bg-paper transition-all duration-500 group"
          >
            <span className="text-teal text-lg tracking-widest" aria-hidden="true">★★★★★</span>
            <span className="font-eyebrow text-[11px] text-ink/75">
              {AMAZON_RATING.stars} · {AMAZON_RATING.count.toLocaleString()} reviews · Amazon
            </span>
            <span className="text-ink/50 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </a>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {STATS.map((s) => (
            <StatBlock key={s.id} stat={s} label={copy.stats[s.id]} lang={lang} />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 mt-24 md:mt-32">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-4">
              <span className="font-eyebrow text-teal">{copy.shippingEyebrow}</span>
              <h4 className="mt-4 font-editorial text-ink text-3xl md:text-4xl leading-tight">
                {copy.shippingHeadline}
              </h4>
              <p className="mt-4 font-light text-ink/65 leading-relaxed max-w-sm">
                {copy.shippingLead}
              </p>
            </div>
            <div className="lg:col-span-8">
              <WorldMap />
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 mt-24 md:mt-32">
        <Reveal>
          <div className="border-y border-ink/10 py-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {copy.signals.map((s) => (
              <span
                key={s}
                className="font-eyebrow text-[10px] tracking-[0.22em] text-ink/45 hover:text-ink/80 transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="mt-24 md:mt-32 bg-teal-deep text-paper">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-28 md:py-40 text-center">
          <Reveal>
            <span className="font-eyebrow text-mint">{copy.finalEyebrow}</span>
          </Reveal>
          <Reveal delay={120}>
            <h3 className="mt-6 font-editorial text-5xl md:text-7xl lg:text-[104px] leading-[0.92]">
              {copy.finalHeadline1}
              <span className="block italic text-mint">{copy.finalHeadline2}</span>
            </h3>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-14 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://www.amazon.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-6 rounded-full bg-mint px-9 py-5 text-teal-deep hover:-translate-y-0.5 transition-all duration-500"
              >
                <span className="font-eyebrow">{copy.ctaBuy}</span>
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 place-items-center rounded-full bg-teal-deep/10 transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href="/#collections"
                className="inline-flex items-center justify-center rounded-full border border-paper/25 px-9 py-5 font-eyebrow text-paper hover:bg-paper/10 transition-colors"
              >
                {copy.ctaExplore}
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {open && <Lightbox shot={open} copy={copy} onClose={() => setOpen(null)} />}
    </section>
  );
}
