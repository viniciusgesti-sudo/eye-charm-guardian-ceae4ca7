import { useEffect, useRef, useState, type ElementType } from "react";

import lensFloat from "@/assets/guard-lens-float.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import lensMacro from "@/assets/products/solene-macro.jpg?w=320;480;800&format=avif;webp;jpg&as=picture";
import { Picture, type PictureSource } from "./Picture";
import comparisonImg from "@/assets/guard-comparison.jpg?w=768;1200;1920&format=avif;webp;jpg&as=picture";
import lifeCreative from "@/assets/guard-life-creative.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import lifeBusiness from "@/assets/guard-life-business.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import lifeStudent from "@/assets/guard-life-student.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import lifeGamer from "@/assets/guard-life-gamer.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

/* ---------- Copy ---------- */
type Callout = { n: string; title: string; body: string };
type LifeItem = { tag: string; title: string; body: string };
type Spec = { n: string; title: string; body: string };

type GuardCopy = {
  intro: {
    section: string;
    headline1: string;
    headlineAccent: string;
    body: string;
    tag: string;
  };
  s01: { label: string; title: string; body: string };
  s02: { label: string; title1: string; titleAccent: string; body: string; quote: string; filteredLabel: string };
  s03: {
    label: string;
    title1: string;
    titleAccent: string;
    body: string;
    withoutLabel: string;
    withLabel: string;
    pills: string[];
  };
  s04: { label: string; title1: string; titleAccent: string };
  s05: { label: string; title1: string; titleAccent: string };
  s06: { label: string; quoteA: string; quoteMid: string; quoteB: string; footer: string };
  callouts: Callout[];
  life: LifeItem[];
  specs: Spec[];
};

const COPY: Record<Lang, GuardCopy> = {
  EN: {
    intro: {
      section: "EyegisGuard™ Technology",
      headline1: "Engineered to protect.",
      headlineAccent: "Designed to preserve.",
      body:
        "EyegisGuard™ is our proprietary lens technology, developed to selectively filter specific wavelengths of blue light while preserving natural color accuracy, visual clarity and everyday comfort.",
      tag: "No hype. No fear. Just quiet optical engineering.",
    },
    s01: {
      label: "The Lens",
      title: "A single lens, five deliberate layers.",
      body:
        "Every EyegisGuard™ lens is built as a stack of considered choices — each one measurable, none of them cosmetic.",
    },
    s02: {
      label: "How It Works",
      title1: "We filter a slice of the spectrum —",
      titleAccent: " not the whole sky.",
      body:
        "A narrow, targeted band of high-energy blue light — attenuated with intent, so daylight, screens and skin tones still look like themselves.",
      quote:
        "\"Blocking as much blue light as possible is not the goal. Blocking the right amount, in the right place, is.\"",
      filteredLabel: "Filtered by EyegisGuard™",
    },
    s03: {
      label: "Preserve What Matters",
      title1: "Comfort you can see —",
      titleAccent: " without color you can't.",
      body:
        "Drag the handle. The difference is quiet, honest and never dramatic — exactly as an optical filter should behave.",
      withoutLabel: "Without EyegisGuard™",
      withLabel: "With EyegisGuard™",
      pills: ["Natural Colors", "Contrast Preservation", "Reduced Harsh Reflections", "Visual Comfort"],
    },
    s04: {
      label: "Designed For Everyday Digital Life",
      title1: "One lens.",
      titleAccent: " Many quiet lives.",
    },
    s05: {
      label: "Technical Specifications",
      title1: "Every detail,",
      titleAccent: " quietly stated.",
    },
    s06: {
      label: "Why the Difference Is Felt",
      quoteA: "Comfort is not measured by how much blue light you block.",
      quoteMid: " It is measured by what your eyes stop noticing —",
      quoteB: " glare, fatigue, the screen itself.",
      footer: "Eyegis Optical Studio · Design Charter",
    },
    callouts: [
      { n: "01", title: "Premium Optical Lens", body: "High-clarity optical resin, precision-polished for distortion-free vision." },
      { n: "02", title: "Selective Blue-Light Filter", body: "Attenuates a targeted portion of the 400–455 nm band without shifting color." },
      { n: "03", title: "Anti-Reflective Coating", body: "Multi-layer AR treatment reduces glare from screens and ambient light." },
      { n: "04", title: "Scratch-Resistant Surface", body: "Hard-coat finish protects the lens across years of daily wear." },
      { n: "05", title: "TR90 Lightweight Comfort", body: "Aerospace-grade thermoplastic frame — flexible, hypoallergenic, weightless." },
    ],
    life: [
      { tag: "For", title: "Creative Professionals", body: "Preserved color accuracy across long editing sessions — reds stay red, blacks stay black." },
      { tag: "For", title: "Business Professionals", body: "Comfort across back-to-back calls, spreadsheets and travel days." },
      { tag: "For", title: "Students", body: "Steady visual focus for reading, research and late-night writing." },
      { tag: "For", title: "Gamers", body: "Reduced glare and stable contrast during extended play — without color shift." },
    ],
    specs: [
      { n: "01", title: "Selective Blue-Light Filtering", body: "Targeted attenuation across 400–455 nm." },
      { n: "02", title: "Anti-Reflective Coating", body: "Multi-layer AR for glare-free clarity." },
      { n: "03", title: "TR90 Lightweight Frame", body: "Aerospace polymer — flexible, hypoallergenic." },
      { n: "04", title: "Premium Optical Clarity", body: "Distortion-free vision, edge to edge." },
      { n: "05", title: "Natural Color Preservation", body: "True whites. True skin tones. No yellow cast." },
      { n: "06", title: "Comfort for Long Sessions", body: "Balanced weight distribution and nose bridge." },
      { n: "07", title: "2-Year Warranty", body: "Frame integrity guaranteed against defects." },
      { n: "08", title: "60-Day Comfort Guarantee", body: "Wear them. If they do not feel right, return them." },
    ],
  },
  PT: {
    intro: {
      section: "Tecnologia EyegisGuard™",
      headline1: "Engenharia para proteger.",
      headlineAccent: "Design para preservar.",
      body:
        "EyegisGuard™ é nossa tecnologia proprietária de lente, desenvolvida para filtrar seletivamente comprimentos específicos de luz azul, preservando cor natural, clareza visual e conforto diário.",
      tag: "Sem alarde. Sem medo. Apenas engenharia óptica silenciosa.",
    },
    s01: {
      label: "A Lente",
      title: "Uma lente, cinco camadas deliberadas.",
      body:
        "Cada lente EyegisGuard™ é uma pilha de escolhas pensadas — todas mensuráveis, nenhuma decorativa.",
    },
    s02: {
      label: "Como Funciona",
      title1: "Filtramos uma fatia do espectro —",
      titleAccent: " não o céu inteiro.",
      body:
        "Uma faixa estreita e alvo de luz azul de alta energia — atenuada com intenção, para que luz do dia, telas e tons de pele continuem parecendo eles mesmos.",
      quote:
        "\"Bloquear o máximo possível de luz azul não é o objetivo. Bloquear a quantidade certa, no lugar certo, é.\"",
      filteredLabel: "Filtrado por EyegisGuard™",
    },
    s03: {
      label: "Preservar o que Importa",
      title1: "Conforto que se vê —",
      titleAccent: " sem alterar a cor.",
      body:
        "Arraste o controle. A diferença é discreta, honesta e nunca dramática — como um filtro óptico deve se comportar.",
      withoutLabel: "Sem EyegisGuard™",
      withLabel: "Com EyegisGuard™",
      pills: ["Cores Naturais", "Preservação de Contraste", "Menos Reflexos Duros", "Conforto Visual"],
    },
    s04: {
      label: "Feito para o Cotidiano Digital",
      title1: "Uma lente.",
      titleAccent: " Muitas vidas silenciosas.",
    },
    s05: {
      label: "Especificações Técnicas",
      title1: "Cada detalhe,",
      titleAccent: " discretamente declarado.",
    },
    s06: {
      label: "Por Que se Sente Diferente",
      quoteA: "Conforto não se conquista bloqueando o máximo possível de luz azul. Conquista-se na",
      quoteMid: " conversa silenciosa entre ergonomia da armação, ",
      quoteB: "qualidade óptica, filtragem seletiva e design pensado.",
      footer: "Eyegis Optical Studio · Carta de Design",
    },
    callouts: [
      { n: "01", title: "Lente Óptica Premium", body: "Resina óptica de alta clareza, polida com precisão para visão sem distorção." },
      { n: "02", title: "Filtro Seletivo de Luz Azul", body: "Atenua uma porção alvo da faixa 400–455 nm sem deslocar cor." },
      { n: "03", title: "Camada Antirreflexo", body: "Tratamento AR multicamadas reduz reflexos de telas e luz ambiente." },
      { n: "04", title: "Superfície Resistente a Arranhões", body: "Acabamento hard-coat protege a lente por anos de uso diário." },
      { n: "05", title: "Conforto Leve TR90", body: "Armação em termoplástico aeroespacial — flexível, hipoalergênica, quase imperceptível." },
    ],
    life: [
      { tag: "Para", title: "Profissionais Criativos", body: "Precisão de cor preservada em longas sessões de edição — vermelhos ficam vermelhos, pretos ficam pretos." },
      { tag: "Para", title: "Profissionais de Negócios", body: "Conforto em reuniões seguidas, planilhas e dias de viagem." },
      { tag: "Para", title: "Estudantes", body: "Foco visual estável para leitura, pesquisa e escrita madrugada adentro." },
      { tag: "Para", title: "Gamers", body: "Menos reflexo e contraste estável em sessões longas — sem deslocamento de cor." },
    ],
    specs: [
      { n: "01", title: "Filtragem Seletiva de Luz Azul", body: "Atenuação alvo em 400–455 nm." },
      { n: "02", title: "Camada Antirreflexo", body: "AR multicamadas para clareza sem reflexos." },
      { n: "03", title: "Armação Leve TR90", body: "Polímero aeroespacial — flexível, hipoalergênico." },
      { n: "04", title: "Clareza Óptica Premium", body: "Visão sem distorção, de ponta a ponta." },
      { n: "05", title: "Preservação Natural da Cor", body: "Brancos verdadeiros. Tons de pele fiéis. Sem tom amarelado." },
      { n: "06", title: "Conforto para Longas Sessões", body: "Distribuição equilibrada de peso e ponte nasal cuidada." },
      { n: "07", title: "Garantia de 2 Anos", body: "Integridade da armação garantida contra defeitos." },
      { n: "08", title: "60 Dias de Conforto Garantido", body: "Use. Se não sentir certo, devolva." },
    ],
  },
  FR: {
    intro: {
      section: "Technologie EyegisGuard™",
      headline1: "Conçu pour protéger.",
      headlineAccent: "Dessiné pour préserver.",
      body:
        "EyegisGuard™ est notre technologie propriétaire, développée pour filtrer sélectivement certaines longueurs d'onde de lumière bleue tout en préservant la justesse des couleurs, la clarté visuelle et le confort quotidien.",
      tag: "Ni battage, ni peur. Juste une ingénierie optique discrète.",
    },
    s01: {
      label: "Le Verre",
      title: "Un seul verre, cinq couches délibérées.",
      body:
        "Chaque verre EyegisGuard™ est un empilement de choix réfléchis — tous mesurables, aucun cosmétique.",
    },
    s02: {
      label: "Comment ça marche",
      title1: "Nous filtrons une part du spectre —",
      titleAccent: " pas le ciel entier.",
      body:
        "Une bande étroite et ciblée de lumière bleue à haute énergie — atténuée avec intention, pour que la lumière du jour, les écrans et les carnations restent eux-mêmes.",
      quote:
        "« Bloquer un maximum de lumière bleue n'est pas le but. Bloquer la juste quantité, au bon endroit, l'est. »",
      filteredLabel: "Filtré par EyegisGuard™",
    },
    s03: {
      label: "Préserver l'essentiel",
      title1: "Un confort visible —",
      titleAccent: " sans altérer la couleur.",
      body:
        "Déplacez la poignée. La différence est discrète, honnête, jamais spectaculaire — comme doit se comporter un filtre optique.",
      withoutLabel: "Sans EyegisGuard™",
      withLabel: "Avec EyegisGuard™",
      pills: ["Couleurs Naturelles", "Contraste Préservé", "Moins de Reflets Durs", "Confort Visuel"],
    },
    s04: {
      label: "Pensé pour la vie numérique quotidienne",
      title1: "Un seul verre.",
      titleAccent: " Beaucoup de vies discrètes.",
    },
    s05: {
      label: "Spécifications Techniques",
      title1: "Chaque détail,",
      titleAccent: " énoncé sobrement.",
    },
    s06: {
      label: "Pourquoi la Sensation Change",
      quoteA: "Le confort ne s'obtient pas en bloquant un maximum de lumière bleue. Il naît de la",
      quoteMid: " conversation silencieuse entre l'ergonomie de la monture, ",
      quoteB: "la qualité optique, le filtrage sélectif et un design réfléchi.",
      footer: "Eyegis Optical Studio · Charte de Design",
    },
    callouts: [
      { n: "01", title: "Verre Optique Premium", body: "Résine optique haute clarté, polie avec précision pour une vision sans distorsion." },
      { n: "02", title: "Filtre Sélectif de Lumière Bleue", body: "Atténue une portion ciblée de 400–455 nm sans dériver la couleur." },
      { n: "03", title: "Traitement Antireflet", body: "AR multicouches réduit les reflets d'écran et de lumière ambiante." },
      { n: "04", title: "Surface Anti-Rayures", body: "Finition hard-coat protège le verre à travers des années d'usage." },
      { n: "05", title: "Confort Léger TR90", body: "Monture thermoplastique aérospatiale — souple, hypoallergénique, aérienne." },
    ],
    life: [
      { tag: "Pour", title: "Créatifs Professionnels", body: "Fidélité des couleurs préservée sur de longues sessions — les rouges restent rouges, les noirs restent noirs." },
      { tag: "Pour", title: "Professionnels Business", body: "Confort à travers les réunions enchaînées, tableurs et jours de voyage." },
      { tag: "Pour", title: "Étudiants", body: "Concentration visuelle stable pour lire, chercher, écrire tard." },
      { tag: "Pour", title: "Gamers", body: "Moins de reflets, contraste stable en sessions longues — sans dérive chromatique." },
    ],
    specs: [
      { n: "01", title: "Filtrage Sélectif Bleu", body: "Atténuation ciblée sur 400–455 nm." },
      { n: "02", title: "Traitement Antireflet", body: "AR multicouches pour une clarté sans reflets." },
      { n: "03", title: "Monture Légère TR90", body: "Polymère aérospatial — souple, hypoallergénique." },
      { n: "04", title: "Clarté Optique Premium", body: "Vision sans distorsion, d'un bord à l'autre." },
      { n: "05", title: "Préservation Naturelle des Couleurs", body: "Blancs vrais. Carnations justes. Aucune teinte jaune." },
      { n: "06", title: "Confort pour Longues Sessions", body: "Répartition de poids équilibrée, pont nasal soigné." },
      { n: "07", title: "Garantie 2 Ans", body: "Intégrité de la monture garantie contre défauts." },
      { n: "08", title: "60 Jours Confort Garanti", body: "Portez-les. S'ils ne conviennent pas, retournez-les." },
    ],
  },
};

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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
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
      ref={ref as any}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}

function IndexMark({ n, label, tone = "light" }: { n: string; label: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className={`flex items-center gap-4 ${dark ? "text-paper/85" : "text-ink/60"}`}>
      <span className={`font-eyebrow ${dark ? "text-mint" : "text-teal"}`}>{n}</span>
      <span className={`h-px w-8 ${dark ? "bg-paper/40" : "bg-ink/25"}`} />
      <span className="font-eyebrow">{label}</span>
    </div>
  );
}

/* ---------- Callout positions (locale-agnostic) ---------- */
const CALLOUT_POS = [
  { x: "18%", y: "22%", side: "left" as const },
  { x: "82%", y: "34%", side: "right" as const },
  { x: "16%", y: "62%", side: "left" as const },
  { x: "84%", y: "72%", side: "right" as const },
  { x: "50%", y: "92%", side: "left" as const },
];

function LensStage({ callouts }: { callouts: Callout[] }) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [rot, setRot] = useState(-8);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const p = (rect.top + rect.height / 2 - vh / 2) / vh;
        const clamped = Math.max(-0.6, Math.min(0.6, p));
        setRot(-clamped * 40);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={stageRef} className="relative mx-auto w-full max-w-[1100px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(60% 55% at 50% 50%, rgba(226,209,195,0.55), rgba(249,249,249,0) 70%)",
        }}
      />
      <div className="relative aspect-square w-full">
        <Picture
          source={lensFloat}
          alt="EyegisGuard™ optical lens — floating study"
          sizes="(min-width:1024px) 45vw, 100vw"
          className="h-full w-full object-contain will-change-transform"
          style={{
            transform: `rotate(${rot.toFixed(2)}deg)`,
            transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
        {callouts.map((c, i) => {
          const pos = CALLOUT_POS[i];
          return <CalloutBadge key={c.n} c={c} pos={pos} delay={200 + i * 120} />;
        })}
      </div>
    </div>
  );
}

function CalloutBadge({
  c,
  pos,
  delay,
}: {
  c: Callout;
  pos: (typeof CALLOUT_POS)[number];
  delay: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute hidden md:block"
      style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
    >
      <div
        className={`reveal ${visible ? "reveal-in" : ""} flex items-center gap-4 ${
          pos.side === "right" ? "flex-row-reverse text-right" : ""
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <div className={`flex items-center gap-3 ${pos.side === "right" ? "flex-row-reverse" : ""}`}>
          <span className="block h-1.5 w-1.5 rounded-full bg-teal" />
          <span className="block h-px w-16 bg-teal/40" />
        </div>
        <div className="min-w-[190px] max-w-[220px] rounded-md bg-paper/85 px-4 py-3 backdrop-blur-md ring-1 ring-ink/10 shadow-[0_10px_30px_-18px_rgba(29,37,45,0.35)]">
          <div className={`flex items-baseline gap-2 ${pos.side === "right" ? "justify-end" : ""}`}>
            <span className="font-eyebrow text-[9px] text-teal">{c.n}</span>
            <span className="font-editorial text-[17px] leading-tight text-ink">{c.title}</span>
          </div>
          <p className="mt-1 text-[12px] leading-snug text-muted-foreground">{c.body}</p>
        </div>
      </div>
    </div>
  );
}

function Spectrum({ filteredLabel }: { filteredLabel: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const total = 700;
  const startPct = ((400 - 300) / total) * 100;
  const endPct = ((455 - 300) / total) * 100;
  return (
    <div ref={ref} className="relative">
      <div className="relative h-[140px] w-full">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink/15" />
        <div
          className="absolute inset-x-0 top-1/2 h-[14px] -translate-y-1/2 rounded-full overflow-hidden ring-1 ring-ink/10"
          style={{
            background:
              "linear-gradient(90deg, #4B3B6B 0%, #3E5C86 18%, #86D9D1 34%, #C9D6B4 55%, #E7C79A 74%, #C08466 92%, #7A3B34 100%)",
            filter: "saturate(0.55) brightness(1.02)",
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-[52px] rounded-md ring-1 ring-teal/40"
          style={{
            left: `${startPct}%`,
            width: `${endPct - startPct}%`,
            background: "linear-gradient(180deg, rgba(0,75,87,0.14), rgba(0,75,87,0.02))",
            transform: `translateY(-50%) scaleX(${visible ? 1 : 0})`,
            transformOrigin: "left center",
            transition: "transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
        <div
          className="absolute -top-2 flex -translate-y-full flex-col items-center"
          style={{ left: `${(startPct + endPct) / 2}%`, transform: `translate(-50%, -100%)` }}
        >
          <span className="font-eyebrow text-[9px] text-teal">{filteredLabel}</span>
          <span className="mt-1 font-editorial italic text-teal text-[15px]">400 – 455 nm</span>
          <span className="mt-1 block h-3 w-px bg-teal/50" />
        </div>
        {[
          { nm: 300, label: "UV" },
          { nm: 450, label: "Blue" },
          { nm: 550, label: "Visible" },
          { nm: 700, label: "Red" },
          { nm: 1000, label: "IR" },
        ].map((t) => {
          const p = ((t.nm - 300) / total) * 100;
          return (
            <div
              key={t.nm}
              className="absolute top-1/2 flex flex-col items-center"
              style={{ left: `${p}%`, transform: "translate(-50%, 24px)" }}
            >
              <span className="block h-2 w-px bg-ink/30" />
              <span className="mt-2 font-eyebrow text-[9px] text-ink/70">{t.label}</span>
              <span className="mt-1 font-mono text-[10px] text-ink/40">{t.nm} nm</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ComparisonSlider({ withoutLabel, withLabel }: { withoutLabel: string; withLabel: string }) {
  const [pos, setPos] = useState(52);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const setFromClientX = (clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(6, Math.min(94, p)));
  };
  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      setFromClientX(x);
    };
    const onUp = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);
  return (
    <div
      ref={wrapRef}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-sm ring-1 ring-ink/10 select-none"
      onMouseDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        dragging.current = true;
        setFromClientX(e.touches[0].clientX);
      }}
    >
      <Picture source={comparisonImg} alt={withLabel} sizes="100vw" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <Picture
          source={comparisonImg}
          alt={withoutLabel}
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter: "hue-rotate(-6deg) saturate(1.25) contrast(1.12) brightness(1.06)",
            width: `${(100 / pos) * 100}%`,
            maxWidth: "none",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(120,160,220,0.16), rgba(120,160,220,0.06))",
            mixBlendMode: "screen",
          }}
        />
      </div>
      <span className="absolute left-5 top-5 font-eyebrow text-[10px] text-paper drop-shadow">{withoutLabel}</span>
      <span className="absolute right-5 top-5 font-eyebrow text-[10px] text-ink/80">{withLabel}</span>
      <div className="absolute inset-y-0 z-10" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="relative h-full w-px bg-paper/85 shadow-[0_0_0_1px_rgba(29,37,45,0.15)]" />
        <button
          type="button"
          aria-label="Drag to compare"
          className="absolute top-1/2 left-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink ring-1 ring-ink/15 shadow-[0_10px_30px_-10px_rgba(29,37,45,0.35)]"
          onMouseDown={(e) => {
            e.stopPropagation();
            dragging.current = true;
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            dragging.current = true;
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M6 4 2 9l4 5M12 4l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* Icons */
function IconAperture() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 2 6 10l4 8M10 2l4 8-4 8M2 10h16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function IconBriefcase() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="2.5" y="6" width="15" height="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 6V4h6v2M2.5 11h15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function IconBook() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3 4h6a2 2 0 0 1 2 2v10H5a2 2 0 0 1-2-2V4Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 4h-6a2 2 0 0 0-2 2v10h6a2 2 0 0 0 2-2V4Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function IconTarget() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}

const LIFE_META: { img: PictureSource; Icon: ElementType }[] = [
  { img: lifeCreative, Icon: IconAperture },
  { img: lifeBusiness, Icon: IconBriefcase },
  { img: lifeStudent, Icon: IconBook },
  { img: lifeGamer, Icon: IconTarget },
];

export function EyegisGuard() {
  const { lang } = useI18n();
  const copy = COPY[lang];
  return (
    <section id="technology" className="relative bg-paper text-ink">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 pt-32 md:pt-44 pb-20 md:pb-28">
        <Reveal>
          <IndexMark n="§ 04" label={copy.intro.section} />
        </Reveal>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <Reveal delay={120} className="lg:col-span-8">
            <h2 className="font-editorial text-ink text-balance-tight text-fluid-hero leading-[0.9]">
              {copy.intro.headline1}
              <br />
              <span className="italic text-teal">{copy.intro.headlineAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={260} className="lg:col-span-4">
            <p className="font-light text-base md:text-lg leading-relaxed text-ink/75 max-w-md">
              {copy.intro.body}
              <span className="mt-3 block text-ink/50">{copy.intro.tag}</span>
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative border-t border-ink/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 py-24 md:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16 lg:mb-24">
            <Reveal className="lg:col-span-3">
              <IndexMark n="01" label={copy.s01.label} />
            </Reveal>
            <Reveal delay={140} className="lg:col-span-6">
              <h3 className="font-editorial text-fluid-h1 leading-[0.95] text-ink">{copy.s01.title}</h3>
            </Reveal>
            <Reveal delay={280} className="lg:col-span-3">
              <p className="text-sm md:text-base leading-relaxed text-ink/65">{copy.s01.body}</p>
            </Reveal>
          </div>
          <LensStage callouts={copy.callouts} />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:hidden gap-6">
            {copy.callouts.map((c) => (
              <div key={c.n} className="border-t border-ink/15 pt-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-eyebrow text-[9px] text-teal">{c.n}</span>
                  <span className="font-editorial text-lg text-ink">{c.title}</span>
                </div>
                <p className="mt-1 text-sm text-ink/65">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative bg-paper-warm">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14 py-28 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-20">
            <Reveal className="lg:col-span-3">
              <IndexMark n="02" label={copy.s02.label} />
            </Reveal>
            <Reveal delay={140} className="lg:col-span-6">
              <h3 className="font-editorial text-fluid-h1 leading-[0.95] text-ink">
                {copy.s02.title1}
                <span className="italic text-teal">{copy.s02.titleAccent}</span>
              </h3>
            </Reveal>
            <Reveal delay={280} className="lg:col-span-3">
              <p className="text-sm md:text-base leading-relaxed text-ink/65">{copy.s02.body}</p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <Spectrum filteredLabel={copy.s02.filteredLabel} />
          </Reveal>
          <Reveal delay={400}>
            <p className="mt-16 max-w-2xl font-editorial italic text-ink/60 text-lg leading-relaxed">{copy.s02.quote}</p>
          </Reveal>
        </div>
      </div>

      <div className="relative border-t border-ink/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 py-28 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
            <Reveal className="lg:col-span-3">
              <IndexMark n="03" label={copy.s03.label} />
            </Reveal>
            <Reveal delay={140} className="lg:col-span-6">
              <h3 className="font-editorial text-fluid-h1 leading-[0.95] text-ink">
                {copy.s03.title1}
                <span className="italic text-teal">{copy.s03.titleAccent}</span>
              </h3>
            </Reveal>
            <Reveal delay={280} className="lg:col-span-3">
              <p className="text-sm md:text-base leading-relaxed text-ink/65">{copy.s03.body}</p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <ComparisonSlider withoutLabel={copy.s03.withoutLabel} withLabel={copy.s03.withLabel} />
          </Reveal>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8">
            {copy.s03.pills.map((t, i) => (
              <Reveal key={t} delay={i * 120}>
                <div className="border-t border-ink/15 pt-4">
                  <span className="font-editorial text-lg md:text-xl text-ink">{t}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="relative bg-paper-warm">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 py-28 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
            <Reveal className="lg:col-span-3">
              <IndexMark n="04" label={copy.s04.label} />
            </Reveal>
            <Reveal delay={140} className="lg:col-span-6">
              <h3 className="font-editorial text-fluid-h1 leading-[0.95] text-ink">
                {copy.s04.title1}
                <span className="italic text-teal">{copy.s04.titleAccent}</span>
              </h3>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-x-12">
            {copy.life.map((l, i) => {
              const meta = LIFE_META[i];
              const Icon = meta.Icon;
              return (
                <Reveal key={l.title} delay={i * 120}>
                  <article className="group">
                    <div className="relative overflow-hidden bg-ink/5 aspect-[4/5]">
                      <Picture
                        source={meta.img}
                        alt={`${l.title} — Eyegis`}
                        sizes="(min-width:768px) 50vw, 100vw"
                        className="h-full w-full object-cover img-hover group-hover:img-hover-in"
                      />
                    </div>
                    <div className="mt-6 flex items-start gap-6">
                      <div className="mt-1 text-teal">
                        <Icon />
                      </div>
                      <div className="flex-1">
                        <span className="font-eyebrow text-[10px] text-ink/50">{l.tag}</span>
                        <h4 className="mt-2 font-editorial text-2xl md:text-3xl text-ink">{l.title}</h4>
                        <p className="mt-3 max-w-md text-sm md:text-base leading-relaxed text-ink/65">{l.body}</p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative border-t border-ink/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 py-28 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
            <Reveal className="lg:col-span-3">
              <IndexMark n="05" label={copy.s05.label} />
            </Reveal>
            <Reveal delay={140} className="lg:col-span-6">
              <h3 className="font-editorial text-fluid-h1 leading-[0.95] text-ink">
                {copy.s05.title1}
                <span className="italic text-teal">{copy.s05.titleAccent}</span>
              </h3>
            </Reveal>
            <Reveal delay={280} className="lg:col-span-3">
              <div className="overflow-hidden rounded-sm bg-ink/[0.03] p-4 ring-1 ring-ink/10">
                <div className="aspect-square w-full overflow-hidden rounded-sm">
                  <Picture
                    source={lensMacro}
                    alt="EyegisGuard™ lens macro detail"
                    sizes="(min-width: 1024px) 25vw, 60vw"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10">
            {copy.specs.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="h-full bg-paper p-8 transition-colors duration-500 hover:bg-paper-warm">
                  <div className="flex items-baseline justify-between">
                    <span className="font-eyebrow text-[10px] text-teal">{s.n}</span>
                    <span className="h-px w-8 bg-ink/25" />
                  </div>
                  <h4 className="mt-8 font-editorial text-xl md:text-[22px] leading-tight text-ink">{s.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="relative bg-teal-deep text-paper">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14 py-32 md:py-48">
          <Reveal>
            <IndexMark n="06" label={copy.s06.label} tone="dark" />
          </Reveal>
          <Reveal delay={180}>
            <blockquote className="mt-12 max-w-5xl font-editorial text-paper text-fluid-display leading-[1.02] text-balance-tight">
              {copy.s06.quoteA}
              <span className="italic text-mint">{copy.s06.quoteMid}</span>
              {copy.s06.quoteB}
            </blockquote>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-14 flex items-center gap-4 text-paper/60">
              <span className="h-px w-14 bg-paper/40" />
              <span className="font-eyebrow text-[10px]">{copy.s06.footer}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default EyegisGuard;
