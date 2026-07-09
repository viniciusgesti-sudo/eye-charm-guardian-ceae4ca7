import { useEffect, useRef, useState, type ElementType } from "react";

import lifeCreative from "@/assets/life-creative.jpg";
import lifeBusiness from "@/assets/life-business.jpg";
import lifeGaming from "@/assets/life-gaming.jpg";
import lifeStudent from "@/assets/life-student.jpg";
import lifeTravel from "@/assets/life-travel.jpg";
import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

/* ---------- Reveal ---------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLElement>();
  const Comp = Tag as ElementType;
  return (
    <Comp
      ref={ref as unknown as React.Ref<HTMLElement>}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}

/* ---------- Icons ---------- */
function IconCreative() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M3 19 13 5l4 3-10 14H3v-3Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path d="M13 5l2-2 4 3-2 2" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
function IconBusiness() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x="3" y="7" width="16" height="11" stroke="currentColor" strokeWidth="1" />
      <path d="M8 7V4h6v3M3 12h16" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
function IconGaming() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x="3" y="6" width="16" height="10" rx="5" stroke="currentColor" strokeWidth="1" />
      <path d="M7 11h3M8.5 9.5v3M14 10.5h.01M16 12.5h.01" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
function IconStudent() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M2 8l9-4 9 4-9 4-9-4Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path d="M6 10v5c0 1.5 2.5 3 5 3s5-1.5 5-3v-5M19 8v6" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
function IconTravel() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M3 14l16-8-4 12-4-4-4 3-1-2-3-1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Data ---------- */
type Tone = "paper" | "champagne" | "teal";
type Panel = {
  index: string;
  eyebrow: string;
  tags: string[];
  title: string;
  script: string;
  body: string;
  cta: string;
  image: string;
  imageAlt: string;
  align: "left" | "right";
  tone: Tone;
  Icon: React.FC;
};

type LifestyleCopy = {
  sectionEyebrow: string;
  headline1: string;
  headline2: string;
  introBody1: string;
  introBody2: string;
  panels: {
    eyebrow: string;
    tags: string[];
    title: string;
    script: string;
    body: string;
    cta: string;
    imageAlt: string;
  }[];
  finalEyebrow: string;
  finalHeadline1: string;
  finalHeadline2: string;
  finalBody: string;
  buttonPrefix: string;
  btnMen: string;
  btnWomen: string;
  btnKids: string;
  continueLabel: string;
  continueTarget: string;
};

const LIFESTYLE_COPY: Record<Lang, LifestyleCopy> = {
  EN: {
    sectionEyebrow: "Designed for Every Digital Life",
    headline1: "Whatever your screen.",
    headline2: "Wherever your ambition.",
    introBody1:
      "Every profession, every passion and every creative journey deserves visual comfort without compromising style.",
    introBody2:
      "Eyegis is designed to support the modern digital life — from focused work to creative expression, from competitive play to everyday productivity.",
    panels: [
      {
        eyebrow: "Creative Professionals",
        tags: ["Photography", "Architecture", "Graphic Design", "Video Editing", "Fashion", "Creative Studios"],
        title: "Designed for",
        script: "creators.",
        body: "Long hours creating deserve uncompromised visual comfort. Color accuracy stays honest — from the first sketch to the final export.",
        cta: "Explore Creative Collection",
        imageAlt: "Creative professional in a linen shirt reviewing prints in a sunlit studio",
      },
      {
        eyebrow: "Business Professionals",
        tags: ["Executives", "Finance", "Developers", "Consultants", "Remote Workers"],
        title: "Designed for",
        script: "performance.",
        body: "Stay focused through meetings, spreadsheets, presentations and long workdays — from Faria Lima to a hotel desk in Paris.",
        cta: "Explore Business Collection",
        imageAlt: "Executive at a marble desk overlooking the São Paulo skyline at dusk",
      },
      {
        eyebrow: "Gaming",
        tags: ["Curved Monitor", "Mechanical Keyboard", "Architectural Lighting", "Modern Apartment"],
        title: "Designed for",
        script: "immersion.",
        body: "Long sessions demand clarity, comfort and focus. Reduced glare and stable contrast — without color shift, without theatrics.",
        cta: "Explore Gaming Collection",
        imageAlt: "Luxury minimal gaming setup in a modern apartment with warm architectural lighting",
      },
      {
        eyebrow: "Students",
        tags: ["Laptop", "Tablet", "Notebook", "Natural Light", "Modern Library"],
        title: "Designed for",
        script: "learning.",
        body: "From morning lectures to late-night study sessions — visual comfort that lets ideas, not fatigue, lead the day.",
        cta: "Explore Student Collection",
        imageAlt: "Student reading in a sunlit university library beside a laptop and tablet",
      },
      {
        eyebrow: "Travel & Digital Nomads",
        tags: ["Airport Lounge", "Luxury Hotel", "Coffee Shop", "Business Class"],
        title: "Designed to",
        script: "move.",
        body: "Your work travels with you. Your comfort should too. A lightweight TR90 frame, a considered case, a lens that behaves the same at 35,000 feet.",
        cta: "Discover Travel Collection",
        imageAlt: "Traveler in a wool coat working on a laptop in a dusk airport lounge",
      },
    ],
    finalEyebrow: "A Frame For Every Life",
    finalHeadline1: "Find the collection",
    finalHeadline2: "that fits your lifestyle.",
    finalBody: "Three families. One optical philosophy. Shaped for the way you live, work and see the world.",
    buttonPrefix: "Explore",
    btnMen: "Men",
    btnWomen: "Women",
    btnKids: "Kids & Teens",
    continueLabel: "Continue",
    continueTarget: "The Collections",
  },
  PT: {
    sectionEyebrow: "Feito para Toda Vida Digital",
    headline1: "Qualquer que seja sua tela.",
    headline2: "Onde quer que sua ambição vá.",
    introBody1:
      "Cada profissão, cada paixão e cada jornada criativa merece conforto visual sem abrir mão do estilo.",
    introBody2:
      "Eyegis é feito para acompanhar a vida digital moderna — do trabalho focado à expressão criativa, do jogo competitivo à produtividade cotidiana.",
    panels: [
      {
        eyebrow: "Profissionais Criativos",
        tags: ["Fotografia", "Arquitetura", "Design Gráfico", "Edição de Vídeo", "Moda", "Estúdios Criativos"],
        title: "Feito para",
        script: "criadores.",
        body: "Longas horas criando merecem conforto visual sem concessão. Cores permanecem honestas — do primeiro esboço à exportação final.",
        cta: "Explorar Coleção Criativa",
        imageAlt: "Profissional criativo de camisa de linho revisando impressões em um estúdio iluminado",
      },
      {
        eyebrow: "Profissionais de Negócios",
        tags: ["Executivos", "Financeiro", "Desenvolvedores", "Consultores", "Trabalho Remoto"],
        title: "Feito para",
        script: "performance.",
        body: "Foco em reuniões, planilhas, apresentações e longos dias de trabalho — da Faria Lima à mesa de um hotel em Paris.",
        cta: "Explorar Coleção Business",
        imageAlt: "Executivo em uma mesa de mármore com vista para o skyline de São Paulo ao entardecer",
      },
      {
        eyebrow: "Gaming",
        tags: ["Monitor Curvo", "Teclado Mecânico", "Iluminação Arquitetônica", "Apartamento Moderno"],
        title: "Feito para",
        script: "imersão.",
        body: "Sessões longas exigem clareza, conforto e foco. Menos reflexo, contraste estável — sem alteração de cor, sem teatro.",
        cta: "Explorar Coleção Gaming",
        imageAlt: "Setup gamer minimalista em apartamento moderno com iluminação arquitetônica quente",
      },
      {
        eyebrow: "Estudantes",
        tags: ["Laptop", "Tablet", "Caderno", "Luz Natural", "Biblioteca Moderna"],
        title: "Feito para",
        script: "aprender.",
        body: "Das aulas da manhã aos estudos madrugada adentro — conforto visual que deixa as ideias, não o cansaço, guiarem o dia.",
        cta: "Explorar Coleção Estudante",
        imageAlt: "Estudante lendo em biblioteca universitária iluminada, com laptop e tablet ao lado",
      },
      {
        eyebrow: "Viagem & Nômades Digitais",
        tags: ["Sala VIP", "Hotel de Luxo", "Cafeteria", "Classe Executiva"],
        title: "Feito para",
        script: "mover.",
        body: "Seu trabalho viaja com você. Seu conforto também. Armação TR90 leve, um estojo pensado, uma lente que se comporta igual a 35.000 pés.",
        cta: "Descobrir Coleção Viagem",
        imageAlt: "Viajante de sobretudo trabalhando no laptop em sala de embarque ao entardecer",
      },
    ],
    finalEyebrow: "Uma Armação para Cada Vida",
    finalHeadline1: "Encontre a coleção",
    finalHeadline2: "que se encaixa no seu estilo.",
    finalBody: "Três famílias. Uma filosofia óptica. Moldadas para o modo como você vive, trabalha e enxerga o mundo.",
    buttonPrefix: "Explorar",
    btnMen: "Homem",
    btnWomen: "Mulher",
    btnKids: "Kids & Teens",
    continueLabel: "Continuar",
    continueTarget: "As Coleções",
  },
  FR: {
    sectionEyebrow: "Pensé pour chaque vie numérique",
    headline1: "Quel que soit votre écran.",
    headline2: "Où que vous mène votre ambition.",
    introBody1:
      "Chaque métier, chaque passion, chaque parcours créatif mérite un confort visuel sans compromis sur le style.",
    introBody2:
      "Eyegis accompagne la vie numérique contemporaine — du travail concentré à l'expression créative, du jeu exigeant à la productivité quotidienne.",
    panels: [
      {
        eyebrow: "Créatifs & Studios",
        tags: ["Photographie", "Architecture", "Design Graphique", "Montage Vidéo", "Mode", "Studios Créatifs"],
        title: "Conçu pour",
        script: "les créateurs.",
        body: "Les longues heures de création méritent un confort visuel sans compromis. La fidélité des couleurs reste honnête — de la première esquisse à l'export final.",
        cta: "Explorer la Collection Créative",
        imageAlt: "Créatif en chemise de lin examinant des tirages dans un studio ensoleillé",
      },
      {
        eyebrow: "Professionnels & Cadres",
        tags: ["Direction", "Finance", "Développeurs", "Consultants", "Télétravail"],
        title: "Conçu pour",
        script: "la performance.",
        body: "Rester concentré : réunions, tableurs, présentations, longues journées — de Faria Lima à un bureau d'hôtel parisien.",
        cta: "Explorer la Collection Business",
        imageAlt: "Cadre à un bureau en marbre surplombant les gratte-ciel de São Paulo au crépuscule",
      },
      {
        eyebrow: "Gaming",
        tags: ["Écran Courbe", "Clavier Mécanique", "Éclairage d'Architecte", "Appartement Moderne"],
        title: "Conçu pour",
        script: "l'immersion.",
        body: "Les longues sessions exigent clarté, confort et concentration. Moins d'éblouissement, un contraste stable — sans dérive de couleur, sans effet de manche.",
        cta: "Explorer la Collection Gaming",
        imageAlt: "Setup gaming minimaliste dans un appartement moderne à l'éclairage chaud",
      },
      {
        eyebrow: "Étudiants",
        tags: ["Ordinateur", "Tablette", "Cahier", "Lumière Naturelle", "Bibliothèque Moderne"],
        title: "Conçu pour",
        script: "apprendre.",
        body: "Des cours du matin aux révisions tardives — un confort visuel qui laisse les idées, pas la fatigue, mener la journée.",
        cta: "Explorer la Collection Étudiant",
        imageAlt: "Étudiante lisant dans une bibliothèque universitaire lumineuse, laptop et tablette à ses côtés",
      },
      {
        eyebrow: "Voyage & Nomades Numériques",
        tags: ["Salon d'Aéroport", "Hôtel de Luxe", "Café", "Classe Affaires"],
        title: "Conçu pour",
        script: "bouger.",
        body: "Votre travail voyage avec vous. Votre confort aussi. Une monture TR90 légère, un étui pensé, un verre qui se comporte pareil à 35 000 pieds.",
        cta: "Découvrir la Collection Voyage",
        imageAlt: "Voyageur en manteau de laine travaillant sur un laptop dans un salon d'aéroport au crépuscule",
      },
    ],
    finalEyebrow: "Une monture pour chaque vie",
    finalHeadline1: "Trouvez la collection",
    finalHeadline2: "qui épouse votre style de vie.",
    finalBody: "Trois familles. Une même philosophie optique. Façonnées pour votre façon de vivre, de travailler et de voir le monde.",
    buttonPrefix: "Découvrir",
    btnMen: "Homme",
    btnWomen: "Femme",
    btnKids: "Enfant & Ado",
    continueLabel: "Continuer",
    continueTarget: "Les Collections",
  },
};

/* Panel/Tone types are declared above near the copy dictionary. */

const PANEL_META = [
  { image: lifeCreative, align: "right" as const, tone: "paper" as const, Icon: IconCreative },
  { image: lifeBusiness, align: "left" as const, tone: "champagne" as const, Icon: IconBusiness },
  { image: lifeGaming, align: "right" as const, tone: "teal" as const, Icon: IconGaming },
  { image: lifeStudent, align: "left" as const, tone: "paper" as const, Icon: IconStudent },
  { image: lifeTravel, align: "right" as const, tone: "champagne" as const, Icon: IconTravel },
];

function buildPanels(copy: LifestyleCopy): Panel[] {
  return copy.panels.map((p, i) => ({
    index: String(i + 1).padStart(2, "0"),
    eyebrow: p.eyebrow,
    tags: p.tags,
    title: p.title,
    script: p.script,
    body: p.body,
    cta: p.cta,
    image: PANEL_META[i].image,
    imageAlt: p.imageAlt,
    align: PANEL_META[i].align,
    tone: PANEL_META[i].tone,
    Icon: PANEL_META[i].Icon,
  }));
}

const TONE_STYLES: Record<Tone, { bg: string; text: string; muted: string; hairline: string; script: string; eyebrow: string; ctaBase: string; ctaHover: string; badge: string }> = {
  paper: {
    bg: "bg-paper",
    text: "text-ink",
    muted: "text-ink/65",
    hairline: "bg-ink/20",
    script: "text-teal",
    eyebrow: "text-ink/50",
    ctaBase: "text-ink",
    ctaHover: "hover:text-teal",
    badge: "text-ink/60 ring-ink/15",
  },
  champagne: {
    bg: "bg-paper-warm",
    text: "text-ink",
    muted: "text-ink/65",
    hairline: "bg-ink/20",
    script: "text-teal",
    eyebrow: "text-ink/55",
    ctaBase: "text-ink",
    ctaHover: "hover:text-teal",
    badge: "text-ink/65 ring-ink/15",
  },
  teal: {
    bg: "bg-teal-deep",
    text: "text-paper",
    muted: "text-paper/70",
    hairline: "bg-paper/25",
    script: "text-mint",
    eyebrow: "text-paper/60",
    ctaBase: "text-paper",
    ctaHover: "hover:text-mint",
    badge: "text-paper/70 ring-paper/25",
  },
};

/* ---------- One panel ---------- */
function LifestylePanel({ panel, i }: { panel: Panel; i: number }) {
  const t = TONE_STYLES[panel.tone];
  const { ref, visible } = useReveal<HTMLDivElement>();

  const textOrder = panel.align === "right" ? "lg:order-1" : "lg:order-2";
  const imageOrder = panel.align === "right" ? "lg:order-2" : "lg:order-1";

  return (
    <section
      ref={ref}
      className={`${t.bg} ${t.text} relative overflow-hidden`}
    >
      {/* subtle top hairline between panels */}
      {i > 0 && <div className={`absolute inset-x-6 top-0 h-px ${t.hairline} opacity-40 md:inset-x-14`} />}

      <div className="mx-auto grid min-h-[92vh] max-w-[1600px] grid-cols-1 items-center gap-12 px-6 py-28 md:px-10 md:py-36 lg:grid-cols-12 lg:gap-16 lg:px-14">
        {/* IMAGE */}
        <div className={`relative ${imageOrder} lg:col-span-7`}>
          <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[5/6] lg:aspect-[4/5]">
            <img
              src={panel.image}
              alt={panel.imageAlt}
              width={1800}
              height={1200}
              loading="lazy"
              className={`h-full w-full object-cover transition-[transform,filter] duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                visible ? "scale-100" : "scale-[1.06]"
              }`}
              style={{ filter: visible ? "none" : "brightness(0.92)" }}
            />
            {/* index marker overlay */}
            <div className={`absolute left-5 top-5 flex items-center gap-3 font-eyebrow text-[10px] ${panel.tone === "teal" ? "text-paper/80" : "text-paper/85"} drop-shadow`}>
              <span>N° {panel.index}</span>
              <span className="h-px w-8 bg-current opacity-60" />
              <span>{panel.eyebrow}</span>
            </div>
          </div>
        </div>

        {/* COPY */}
        <div className={`${textOrder} lg:col-span-5`}>
          <Reveal delay={120}>
            <div className={`flex items-center gap-3 font-eyebrow ${t.eyebrow}`}>
              <span className={t.script}>
                <panel.Icon />
              </span>
              <span>{panel.eyebrow}</span>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <h3 className={`mt-8 font-editorial leading-[0.92] text-balance-tight text-[13vw] sm:text-[9vw] lg:text-[5.4vw] xl:text-[86px] ${t.text}`}>
              {panel.title}
              <br />
              <span className={`italic ${t.script}`}>{panel.script}</span>
            </h3>
          </Reveal>

          <Reveal delay={340}>
            <p className={`mt-8 max-w-md font-light text-base md:text-lg leading-relaxed ${t.muted}`}>
              {panel.body}
            </p>
          </Reveal>

          <Reveal delay={440}>
            <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-2">
              {panel.tags.map((tag) => (
                <li
                  key={tag}
                  className={`font-eyebrow text-[9px] px-3 py-1.5 rounded-full ring-1 ${t.badge}`}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={560}>
            <a
              href="#collections"
              className={`group mt-12 inline-flex items-center gap-5 ${t.ctaBase} ${t.ctaHover} transition-colors duration-500`}
            >
              <span className="font-eyebrow">{panel.cta}</span>
              <span className="relative block h-px w-16 overflow-hidden bg-current/40">
                <span className="absolute inset-0 origin-left scale-x-0 bg-current transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              </span>
              <span className="inline-block translate-x-0 transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Main ---------- */
export function LifestyleUniverse() {
  const { lang } = useI18n();
  const copy = LIFESTYLE_COPY[lang];
  const panels = buildPanels(copy);
  return (
    <section id="lifestyles" className="relative">
      {/* ============ INTRO ============ */}
      <div className="bg-paper text-ink">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 pt-32 md:pt-44 pb-16 md:pb-24 border-t border-ink/10">
          <Reveal>
            <div className="flex items-center gap-4 text-ink/60">
              <span className="font-eyebrow text-teal">§ 05</span>
              <span className="h-px w-8 bg-ink/25" />
              <span className="font-eyebrow">{copy.sectionEyebrow}</span>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <Reveal delay={120} className="lg:col-span-8">
              <h2 className="font-editorial text-ink text-balance-tight text-[12vw] sm:text-[9vw] md:text-[7vw] lg:text-[6vw] xl:text-[96px] leading-[0.9]">
                {copy.headline1}
                <br />
                <span className="italic text-teal">{copy.headline2}</span>
              </h2>
            </Reveal>
            <Reveal delay={260} className="lg:col-span-4">
              <p className="font-light text-base md:text-lg leading-relaxed text-ink/75 max-w-md">
                {copy.introBody1}
                <span className="mt-3 block text-ink/55">
                  {copy.introBody2}
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ============ PANELS ============ */}
      {panels.map((p, i) => (
        <LifestylePanel key={p.index} panel={p} i={i} />
      ))}

      {/* ============ FINAL CTA — TRANSITION TO COLLECTIONS ============ */}
      <div className="relative bg-paper text-ink">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14 py-32 md:py-48 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-4 text-ink/60">
              <span className="h-px w-14 bg-ink/25" />
              <span className="font-eyebrow">A Frame For Every Life</span>
              <span className="h-px w-14 bg-ink/25" />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h3 className="mt-12 font-editorial text-ink text-balance-tight text-[10vw] sm:text-[7vw] md:text-[5.6vw] lg:text-[4.8vw] xl:text-[76px] leading-[0.95]">
              Find the collection
              <br />
              <span className="italic text-teal">that fits your lifestyle.</span>
            </h3>
          </Reveal>

          <Reveal delay={360}>
            <p className="mx-auto mt-8 max-w-xl font-light text-base md:text-lg leading-relaxed text-ink/65">
              Three families. One optical philosophy. Shaped for the way you live,
              work and see the world.
            </p>
          </Reveal>

          <Reveal delay={520}>
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
              {[
                { label: "Men", href: "#men", variant: "teal" as const },
                { label: "Women", href: "#women", variant: "sand" as const },
                { label: "Kids & Teens", href: "#kids", variant: "outline" as const },
              ].map((b) => (
                <a
                  key={b.label}
                  href={b.href}
                  className={`cta-lift group inline-flex items-center justify-between gap-6 rounded-full px-8 py-5 min-w-[260px] transition-all duration-500 ${
                    b.variant === "teal"
                      ? "bg-teal text-paper shadow-[0_20px_50px_-20px_rgba(0,75,87,0.6)] hover:bg-teal-deep hover:-translate-y-0.5"
                      : b.variant === "sand"
                      ? "bg-sand text-ink shadow-[0_20px_50px_-20px_rgba(226,209,195,0.9)] hover:bg-sand-warm hover:-translate-y-0.5"
                      : "bg-transparent text-ink ring-1 ring-ink/25 hover:bg-ink hover:text-paper hover:-translate-y-0.5"
                  }`}
                >
                  <span className="font-eyebrow">Explore {b.label}</span>
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-full transition-transform duration-500 group-hover:translate-x-1 ${
                      b.variant === "teal"
                        ? "bg-paper/10"
                        : b.variant === "sand"
                        ? "bg-ink/10"
                        : "bg-ink/10 group-hover:bg-paper/15"
                    }`}
                    aria-hidden
                  >
                    →
                  </span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={680}>
            <div className="mt-16 flex items-center justify-center gap-4 font-eyebrow text-[9px] text-ink/50">
              <span>Continue</span>
              <span className="block h-px w-10 bg-ink/25" />
              <span>The Collections</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
