import { useEffect, useRef, useState } from "react";

import universePortraitSrc from "@/assets/universe-portrait.jpg?w=480;768;1024&format=avif;webp;jpg&as=picture";
import universeLens from "@/assets/products/solene-macro.jpg?w=480;800;1200&format=avif;webp;jpg&as=picture";
import universeScience from "@/assets/universe-science.jpg?w=480;800;1200&format=avif;webp;jpg&as=picture";
import universeEyewear from "@/assets/products/collection-family.jpg?w=480;800;1200&format=avif;webp;jpg&as=picture";
import { Picture, type PictureSource } from "./Picture";
import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

/* ---------- Localized copy ---------- */
type UniverseCopy = {
  chapter: string;
  title1: string;
  titleAccent: string;
  tagline: string;
  noteEyebrow: string;
  noteHeadline1: string;
  noteHeadlineAccent: string;
  noteHeadline2: string;
  noteBody1: string;
  noteBody2: string;
  stats: { k: string; v: string }[];
  portraitCaption1: string;
  portraitCaption2: string;
  principlesEyebrow: string;
  principlesLine: string;
  panels: {
    index: string;
    eyebrow: string;
    headline: string;
    description: string;
    cta: string;
    imageAlt: string;
  }[];
  closingLine: string;
  closingCta: string;
};

const UNIVERSE_COPY: Record<Lang, UniverseCopy> = {
  EN: {
    chapter: "Chapter III",
    title1: "The Eyegis",
    titleAccent: "Universe",
    tagline: "Vision · Science · Style",
    noteEyebrow: "A Note on Purpose",
    noteHeadline1: "At Eyegis, we believe eye protection should never come at the expense of ",
    noteHeadlineAccent: "style",
    noteHeadline2: ".",
    noteBody1:
      "Our mission is simple: protect the eyes of the digital generation with scientifically engineered lenses and timeless eyewear designed to be worn every day.",
    noteBody2:
      "We combine optical engineering, honest science and thoughtful design to create products that help you work, create and play more comfortably — without compromising your style.",
    stats: [],
    portraitCaption1: "Eyegis — Le Women's Collection, Paris",
    portraitCaption2: "Portrait N°04",
    principlesEyebrow: "Three Principles",
    principlesLine: "Technology, science and style — quietly held in balance.",
    panels: [
      {
        index: "Panel 01",
        eyebrow: "EyegisGuard™",
        headline: "Two lenses. Two purposes.",
        description:
          "E-Guard Retina™ protects visual comfort during long screen sessions. E-Guard Circadian™ mitigates evening wavelengths to support healthier sleep. Different wavelengths. Different effects. Two dedicated solutions.",
        cta: "Explore the Technology",
        imageAlt: "Eyegis lens macro, showing the selective blue-light filtering coating",
      },
      {
        index: "Panel 02",
        eyebrow: "Honest Science™",
        headline: "Evidence before marketing.",
        description:
          "No exaggerated promises. No pseudoscience. Only transparent, evidence-based optical engineering.",
        cta: "Explore the Science",
        imageAlt: "Minimal optical laboratory with a brass microscope on a concrete bench",
      },
      {
        index: "Panel 03",
        eyebrow: "Choose Your Lens",
        headline: "Find your perfect lens.",
        description:
          "Compare every Eyegis lens and discover the right balance between protection, comfort and style.",
        cta: "Choose Your Lens",
        imageAlt: "The Eyegis collection — premium acetate frames arranged with signature packaging",
      },
    ],
    closingLine: "Continue into the science that makes it possible.",
    closingCta: "Read Honest Science™",
  },
  PT: {
    chapter: "Capítulo III",
    title1: "O Universo",
    titleAccent: "Eyegis",
    tagline: "Visão · Ciência · Estilo",
    noteEyebrow: "Uma Nota Sobre Propósito",
    noteHeadline1: "Na Eyegis, acreditamos que proteger os olhos nunca deve custar o ",
    noteHeadlineAccent: "estilo",
    noteHeadline2: ".",
    noteBody1:
      "Nossa missão é simples: proteger os olhos da geração digital com lentes desenvolvidas cientificamente e eyewear atemporal, feito para o uso diário.",
    noteBody2:
      "Combinamos engenharia óptica, ciência honesta e design pensado para criar produtos que ajudam você a trabalhar, criar e viver com mais conforto — sem abrir mão do estilo.",
    stats: [],
    portraitCaption1: "Eyegis — Le Women's Collection, Paris",
    portraitCaption2: "Retrato N°04",
    principlesEyebrow: "Três Princípios",
    principlesLine: "Tecnologia, ciência e estilo — em silencioso equilíbrio.",
    panels: [
      {
        index: "Painel 01",
        eyebrow: "EyegisGuard™",
        headline: "Duas lentes. Dois propósitos.",
        description:
          "E-Guard Retina™ protege o conforto visual em longas sessões de tela. E-Guard Circadian™ atenua as ondas noturnas para favorecer um sono mais saudável. Comprimentos de onda diferentes. Efeitos diferentes. Duas soluções dedicadas.",
        cta: "Conhecer a Tecnologia",
        imageAlt: "Macro de uma lente Eyegis, mostrando o revestimento de filtragem seletiva",
      },
      {
        index: "Painel 02",
        eyebrow: "Honest Science™",
        headline: "Evidência antes do marketing.",
        description:
          "Sem promessas exageradas. Sem pseudociência. Apenas engenharia óptica transparente, baseada em evidência.",
        cta: "Explorar a Ciência",
        imageAlt: "Laboratório óptico minimalista com microscópio de latão sobre bancada de concreto",
      },
      {
        index: "Painel 03",
        eyebrow: "Escolha Sua Lente",
        headline: "Encontre a lente perfeita para você.",
        description:
          "Compare cada lente Eyegis e descubra o equilíbrio certo entre proteção, conforto e estilo.",
        cta: "Escolher Minha Lente",
        imageAlt: "A coleção Eyegis — armações premium em acetato com embalagem assinatura",
      },
    ],
    closingLine: "Continue pela ciência que torna tudo isso possível.",
    closingCta: "Ler Honest Science™",
  },
  FR: {
    chapter: "Chapitre III",
    title1: "L'Univers",
    titleAccent: "Eyegis",
    tagline: "Vision · Science · Style",
    noteEyebrow: "Une Note d'Intention",
    noteHeadline1: "Chez Eyegis, protéger les yeux ne doit jamais se faire au détriment du ",
    noteHeadlineAccent: "style",
    noteHeadline2: ".",
    noteBody1:
      "Notre mission est simple : protéger les yeux de la génération numérique grâce à des verres pensés scientifiquement et une lunetterie intemporelle, faite pour être portée chaque jour.",
    noteBody2:
      "Nous conjuguons ingénierie optique, science honnête et design réfléchi pour créer des produits qui aident à travailler, créer et vivre plus confortablement — sans compromis sur le style.",
    stats: [],
    portraitCaption1: "Eyegis — Le Women's Collection, Paris",
    portraitCaption2: "Portrait N°04",
    principlesEyebrow: "Trois Principes",
    principlesLine: "Technologie, science et style — en équilibre silencieux.",
    panels: [
      {
        index: "Panneau 01",
        eyebrow: "EyegisGuard™",
        headline: "Deux verres. Deux missions.",
        description:
          "E-Guard Retina™ protège le confort visuel lors des longues sessions d'écran. E-Guard Circadian™ atténue les longueurs d'onde du soir pour un sommeil plus sain. Longueurs d'onde différentes. Effets différents. Deux solutions dédiées.",
        cta: "Découvrir la technologie",
        imageAlt: "Macro d'un verre Eyegis, montrant le traitement filtrant sélectif",
      },
      {
        index: "Panneau 02",
        eyebrow: "Honest Science™",
        headline: "L'évidence avant le marketing.",
        description:
          "Aucune promesse exagérée. Aucune pseudo-science. Uniquement une ingénierie optique transparente, fondée sur la preuve.",
        cta: "Explorer la Science",
        imageAlt: "Laboratoire optique minimaliste avec un microscope en laiton sur béton",
      },
      {
        index: "Panneau 03",
        eyebrow: "Choisir vos verres",
        headline: "Trouvez le verre qui vous ressemble.",
        description:
          "Comparez chaque verre Eyegis et découvrez le juste équilibre entre protection, confort et style.",
        cta: "Choisir mes verres",
        imageAlt: "La collection Eyegis — montures acétate premium avec l'étui signature",
      },
    ],
    closingLine: "Poursuivez avec la science qui rend tout cela possible.",
    closingCta: "Lire Honest Science™",
  },
};


/* ------------------------------------------------------------------
   Reveal on scroll — subtle editorial fade + rise
   ------------------------------------------------------------------ */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  as: As = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Tag = As as any;
  return (
    <Tag
      ref={ref as any}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Icons — minimal outline
   ------------------------------------------------------------------ */
function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l8 3v6c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V6l8-3z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function IconFlask() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 3h6M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21.5h11.6a2 2 0 0 0 1.7-3L14 9V3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function IconLens() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="8" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 14h.01M4 10l2-3h12l2 3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Panel — editorial luxury tile
   ------------------------------------------------------------------ */
type Panel = {
  index: string;
  eyebrow: string;
  headline: string;
  description: React.ReactNode;
  cta: string;
  href: string;
  image: PictureSource;
  imageAlt: string;
  icon: React.ReactNode;
  tone: "paper" | "champagne";
  aspect: string; // Tailwind aspect class
};

function EditorialPanel({ panel, delay = 0 }: { panel: Panel; delay?: number }) {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <article
      ref={ref as any}
      className="group relative"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={`relative overflow-hidden rounded-[6px] ${panel.aspect} ${
          panel.tone === "champagne" ? "bg-[var(--paper-warm)]" : "bg-[var(--paper)]"
        } shadow-[0_1px_0_rgba(29,37,45,0.04)] transition-[box-shadow,transform] duration-700 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_40px_60px_-40px_rgba(29,37,45,0.25)]`}
      >
        <Picture
          source={panel.image}
          alt={panel.imageAlt}
          sizes="(min-width: 1024px) 33vw, 100vw"
          className={`h-full w-full object-cover transition-[transform,filter] duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
            visible ? "scale-100" : "scale-[1.06]"
          } group-hover:scale-[1.05]`}
        />
        {/* Index marker */}
        <div className="absolute left-6 top-6 flex items-center gap-3 text-paper mix-blend-difference">
          <span className="font-eyebrow text-[10px] tracking-[0.28em]">
            {panel.index}
          </span>
          <span className="h-px w-8 bg-paper/70" />
        </div>
        {/* Icon marker */}
        <div className="absolute right-6 top-6 text-paper mix-blend-difference opacity-90">
          {panel.icon}
        </div>
      </div>

      {/* Editorial caption */}
      <div className="mt-8 md:mt-10 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4">
          <span className="font-eyebrow text-ink/60">{panel.eyebrow}</span>
        </div>
        <div className="col-span-12 md:col-span-8 max-w-[46ch]">
          <h3 className="font-editorial text-ink text-3xl md:text-[38px] leading-[1] tracking-[-0.02em]">
            {panel.headline}
          </h3>
          <p className="mt-5 text-[15px] leading-[1.7] text-ink/70">
            {panel.description}
          </p>
          <a
            href={panel.href}
            className="mt-8 inline-flex items-center gap-3 font-eyebrow text-ink group/cta"
          >
            <span className="relative">
              {panel.cta}
              <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-100 bg-ink/40 transition-transform duration-500 group-hover/cta:scale-x-0" />
              <span className="absolute inset-x-0 -bottom-1 h-px origin-right scale-x-0 bg-ink transition-transform duration-500 group-hover/cta:origin-left group-hover/cta:scale-x-100" />
            </span>
            <span
              aria-hidden="true"
              className="inline-block translate-x-0 transition-transform duration-500 group-hover/cta:translate-x-1.5"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------
   Section
   ------------------------------------------------------------------ */
export function Universe() {
  const { lang } = useI18n();
  const copy = UNIVERSE_COPY[lang];
  const panelMeta = [
    { href: "#eyegisguard", image: universeLens, icon: <IconShield />, tone: "paper" as const, aspect: "aspect-[4/5]" },
    { href: "/#honest-science", image: universeScience, icon: <IconFlask />, tone: "champagne" as const, aspect: "aspect-[4/5]" },
    { href: "#lenses", image: universeEyewear, icon: <IconLens />, tone: "paper" as const, aspect: "aspect-[4/5]" },
  ];
  const panels: Panel[] = copy.panels.map((p, i) => ({
    index: p.index,
    eyebrow: p.eyebrow,
    headline: p.headline,
    description: p.description,
    cta: p.cta,
    href: panelMeta[i].href,
    image: panelMeta[i].image,
    imageAlt: p.imageAlt,
    icon: panelMeta[i].icon,
    tone: panelMeta[i].tone,
    aspect: panelMeta[i].aspect,
  }));

  return (
    <section
      id="universe"
      aria-labelledby="universe-title"
      className="relative bg-[var(--paper)] text-ink"
    >
      {/* --------- Editorial title band --------- */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 pt-32 md:pt-40 lg:pt-48">
        <Reveal className="flex items-center gap-4">
          <span className="h-px w-10 bg-ink/30" />
          <span className="font-eyebrow text-ink/60">{copy.chapter}</span>
        </Reveal>

        <Reveal delay={120}>
          <h2
            id="universe-title"
            className="mt-8 font-editorial text-center text-ink text-balance-tight leading-[0.92] tracking-[-0.02em] text-[13vw] sm:text-[10vw] md:text-[7.5vw] lg:text-[112px]"
          >
            {copy.title1} <span className="italic text-teal">{copy.titleAccent}</span>
          </h2>
        </Reveal>

        <Reveal delay={220} className="mt-10 flex justify-center">
          <span className="font-eyebrow text-ink/50">
            {copy.tagline}
          </span>
        </Reveal>
      </div>

      {/* --------- Editorial intro : two-column asymmetric --------- */}
      <div className="mx-auto mt-24 md:mt-32 lg:mt-40 max-w-[1600px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-12 gap-6 md:gap-10 lg:gap-16 items-start">
          {/* Left — Editorial content (7 col, offset 1) */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-1 order-2 lg:order-1">
            <Reveal delay={80} className="flex items-center gap-4">
              <span className="font-eyebrow text-ink/50">{copy.noteEyebrow}</span>
              <span className="h-px w-8 bg-ink/25" />
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 font-editorial text-ink text-balance-tight leading-[1.05] tracking-[-0.02em] text-[28px] sm:text-[36px] md:text-[46px] lg:text-[54px] md:max-w-[18ch]">
                {copy.noteHeadline1}
                <span className="italic text-teal">{copy.noteHeadlineAccent}</span>
                {copy.noteHeadline2}
              </p>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-12 max-w-[62ch] space-y-6 text-[16px] md:text-[17px] leading-[1.75] text-ink/75">
                <p>{copy.noteBody1}</p>
                <p>{copy.noteBody2}</p>
              </div>
            </Reveal>

            <Reveal delay={380}>
              <div className="mt-14 grid grid-cols-3 gap-8 max-w-lg">
                {copy.stats.map((s) => (
                  <div key={s.k} className="flex flex-col gap-2 border-t border-ink/15 pt-4">
                    <span className="font-eyebrow text-ink/50 text-[10px]">
                      {s.k}
                    </span>
                    <span className="font-editorial text-ink text-lg tracking-tight">
                      {s.v}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — Lifestyle image (5 col) */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 order-1 lg:order-2">
            <Reveal delay={40}>
              <figure className="relative">
                <div className="relative overflow-hidden rounded-[6px] aspect-[4/5] bg-[var(--paper-warm)]">
                  <Picture
                    source={universePortraitSrc}
                    alt="An Eyegis wearer resting by a window in a minimal concrete and oak interior, Paris"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="h-full w-full object-cover"
                  />

                </div>
                <figcaption className="mt-5 flex items-center justify-between font-eyebrow text-ink/55">
                  <span>{copy.portraitCaption1}</span>
                  <span>{copy.portraitCaption2}</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>

      {/* --------- Section transition rule --------- */}
      <div className="mx-auto mt-32 md:mt-40 lg:mt-48 max-w-[1600px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
          <Reveal className="col-span-12 md:col-span-6 flex items-center gap-4">
            <span className="font-eyebrow text-ink/50">{copy.principlesEyebrow}</span>
            <span className="h-px w-16 bg-ink/25" />
          </Reveal>
          <Reveal delay={120} className="col-span-12 md:col-span-6 md:text-right">
            <p className="font-editorial text-ink text-2xl md:text-3xl tracking-[-0.01em] leading-tight max-w-[32ch] md:ml-auto">
              {copy.principlesLine}
            </p>
          </Reveal>
        </div>
      </div>

      {/* --------- Editorial panels grid --------- */}
      <div className="mx-auto mt-20 md:mt-28 max-w-[1600px] px-6 md:px-10 lg:px-14 pb-40 md:pb-48">
        {/* Asymmetric editorial grid — not equal-height cards */}
        <div className="grid grid-cols-12 gap-x-8 lg:gap-x-14 gap-y-28 md:gap-y-36">
          {/* Panel 01 — column span 5, top */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-1">
            <EditorialPanel panel={panels[0]} />
          </div>

          {/* Panel 02 — column span 6, offset right, pushed down */}
          <div className="col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-7 lg:mt-32">
            <EditorialPanel panel={panels[1]} delay={80} />
          </div>

          {/* Panel 03 — column span 7, centered-ish, wider */}
          <div className="col-span-12 md:col-span-12 lg:col-span-7 lg:col-start-3">
            <EditorialPanel panel={panels[2]} delay={40} />
          </div>
        </div>
      </div>

      {/* --------- Champagne closing rule --------- */}
      <div className="bg-[var(--paper-warm)]">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 py-24 md:py-28 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <Reveal>
            <p className="font-editorial text-ink text-3xl md:text-4xl tracking-[-0.01em] leading-[1.05] max-w-[24ch]">
              {copy.closingLine}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <a
              href="/#honest-science"
              className="group inline-flex items-center gap-4 font-eyebrow text-ink"
            >
              <span className="relative">
                {copy.closingCta}
                <span className="absolute inset-x-0 -bottom-1 h-px bg-ink/40" />
              </span>
              <span
                aria-hidden="true"
                className="grid h-10 w-10 place-items-center rounded-full border border-ink/25 transition-[transform,background-color,color] duration-500 group-hover:bg-ink group-hover:text-paper group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Universe;
