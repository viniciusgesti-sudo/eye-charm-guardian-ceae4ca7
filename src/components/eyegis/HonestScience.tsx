import { useEffect, useRef, useState } from "react";

import scienceLab from "@/assets/universe-science.jpg";
import scienceDevices from "@/assets/science-devices.jpg";
import scienceLensExploded from "@/assets/science-lens-exploded.jpg";
import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

/* ---------- Localized copy ---------- */
type HonestCopy = {
  chapter: string;
  title1: string;
  titleAccent: string;
  intro1: string;
  intro2: string;
  s01Label: string;
  s01Title1: string;
  s01Accent: string;
  s01Body1: string;
  s01Body2: string;
  figSpectrum: string;
  spectrum: {
    axisLabel: string;
    bandLabels: { visible: string; uv: string; ir: string };
    callout: { title: string; body: string };
  };
  s02Label: string;
  s02Title1: string;
  s02Accent: string;
  s02Title2: string;
  s02Body: string;
  factors: string[];
  fig02Caption: string;
  s03Label: string;
  s03Title1: string;
  s03Accent: string;
  s03Title2: string;
  s03Body: string;
  s03Metrics: string[];
  s03Cta: string;
  fig03Caption: string;
  s03LayerLabels: string[];
  s04Label: string;
  s04Title1: string;
  s04Accent: string;
  s04Body: string;
  tableHeaders: { topic: string; typical: string; eyegis: string };
  tableRows: { topic: string; typical: string; eyegis: string }[];
  s05Label: string;
  quote: string;
  quoteA: string;
  quoteB: string;
  quoteC: string;
  quoteFooter: string;
  fig04Caption: string;
  pillars: { title: string; copy: string }[];
  closing: string;
  closingCta: string;
};

const COPY: Record<Lang, HonestCopy> = {
  EN: {
    chapter: "Chapter IV · Honest Science™",
    title1: "Evidence.",
    titleAccent: "Not Marketing.",
    intro1:
      "Blue-light lenses can improve visual comfort — but not every claim made online is scientifically supported. At Eyegis we choose transparency over exaggerated promises.",
    intro2: "What follows is what we know, what we suspect, and what we still study.",
    s01Label: "Spectrum",
    s01Title1: "What is ",
    s01Accent: "Blue Light?",
    s01Body1:
      "Blue light exists naturally. The sun is, by a wide margin, its largest source. Digital screens emit significantly less blue light than daylight.",
    s01Body2:
      "Extended screen exposure may nonetheless contribute to digital visual discomfort in some people. The picture is nuanced — and so is our response to it.",
    figSpectrum: "Fig. 01 · Visible Spectrum",
    spectrum: {
      axisLabel: "Wavelength (nm)",
      bandLabels: { visible: "Visible Light", uv: "Ultraviolet", ir: "Infrared" },
      callout: {
        title: "Blue Light · 400 – 500 nm",
        body: "A narrow band within the visible spectrum, present in daylight and, in far smaller quantities, in modern screens.",
      },
    },
    s02Label: "Visual Comfort",
    s02Title1: "Digital eye strain is a ",
    s02Accent: "many-sided",
    s02Title2: " story.",
    s02Body:
      "Discomfort at the end of a long screen day is influenced by many factors. Blue light is only one of them. Eyegis addresses visual comfort as a whole — through thoughtful optical engineering.",
    factors: [
      "Long screen exposure",
      "Reduced blinking rate",
      "Viewing distance",
      "Ambient lighting",
      "Sustained focus fatigue",
      "Screen glare",
    ],
    fig02Caption: "Fig. 02 · Contemporary Visual Load",
    s03Label: "Technology",
    s03Title1: "EyegisGuard™ — ",
    s03Accent: "selective",
    s03Title2: ", not aggressive.",
    s03Body:
      "A proprietary lens treatment that filters a narrow band of higher-energy blue wavelengths while preserving color fidelity and contrast. No yellow tint. No distorted whites. No exaggerated filtering.",
    s03Metrics: ["Peak filtering at 435 nm", "Visible light transmission", "Refractive index"],
    s03Cta: "Learn More",
    fig03Caption: "Fig. 03 · EyegisGuard™ Exploded",
    s03LayerLabels: ["01 · AR Coating", "02 · Selective Filter", "03 · CR-39 Substrate"],
    s04Label: "The Difference",
    s04Title1: "A quiet comparison, ",
    s04Accent: "on our own terms.",
    s04Body:
      "We do not name competitors. We simply describe, honestly, what differentiates the objects we make from what is broadly available.",
    tableHeaders: { topic: "Topic", typical: "Typical Blue-Light Glasses", eyegis: "Eyegis" },
    tableRows: [
      { topic: "Color Accuracy", typical: "Yellow tint, shifted whites", eyegis: "Neutral tone, true-to-life color" },
      { topic: "Visual Comfort", typical: "Generic filtering", eyegis: "Selective, wavelength-tuned filtering" },
      { topic: "Lens Quality", typical: "Standard polycarbonate", eyegis: "Optical-grade CR-39 & mineral glass" },
      { topic: "Frame Quality", typical: "Injection plastic", eyegis: "Italian acetate & Japanese titanium" },
      { topic: "Design Language", typical: "Utilitarian", eyegis: "Editorial, timeless silhouettes" },
      { topic: "Transparency", typical: "Broad wellness claims", eyegis: "Documented specifications" },
      { topic: "Scientific Approach", typical: "Marketing-led", eyegis: "Research-informed engineering" },
    ],
    s05Label: "Research Philosophy",
    quote: "We continuously monitor peer-reviewed research in ",
    quoteA: "optics",
    quoteB: "ergonomics",
    quoteC: "visual comfort",
    quoteFooter: "Eyegis Optical Studio — Research Charter, 2026",
    fig04Caption: "Fig. 04 · Research Studio, São Paulo",
    pillars: [
      { title: "Documented specifications", copy: "Every lens ships with a plain-language technical sheet." },
      { title: "Careful language", copy: "We describe what our lenses do — never what they cure." },
      { title: "Product, not prescription", copy: "Eyegis is designed comfort-wear, not a medical device." },
      { title: "Whole-day thinking", copy: "Screens are one variable among many that we study." },
    ],
    closing: "Honest science makes better objects — and better wearers.",
    closingCta: "Choose Your Lens",
  },
  PT: {
    chapter: "Capítulo IV · Honest Science™",
    title1: "Evidência.",
    titleAccent: "Não Marketing.",
    intro1:
      "Lentes com filtro de luz azul podem melhorar o conforto visual — mas nem toda promessa feita online é cientificamente sustentada. Na Eyegis, escolhemos transparência em vez de exagero.",
    intro2: "A seguir: o que sabemos, o que suspeitamos e o que ainda estudamos.",
    s01Label: "Espectro",
    s01Title1: "O que é ",
    s01Accent: "luz azul?",
    s01Body1:
      "A luz azul existe naturalmente. O sol é, de longe, sua maior fonte. Telas digitais emitem significativamente menos luz azul do que a luz do dia.",
    s01Body2:
      "Ainda assim, exposição prolongada a telas pode contribuir para desconforto visual em algumas pessoas. O quadro é sutil — e nossa resposta também é.",
    figSpectrum: "Fig. 01 · Espectro Visível",
    spectrum: {
      axisLabel: "Comprimento de onda (nm)",
      bandLabels: { visible: "Luz Visível", uv: "Ultravioleta", ir: "Infravermelho" },
      callout: {
        title: "Luz Azul · 400 – 500 nm",
        body: "Uma faixa estreita dentro do espectro visível, presente na luz do dia e, em quantidades bem menores, em telas modernas.",
      },
    },
    s02Label: "Conforto Visual",
    s02Title1: "Fadiga visual digital é uma história ",
    s02Accent: "de vários lados",
    s02Title2: ".",
    s02Body:
      "O desconforto ao fim de um longo dia de tela é influenciado por muitos fatores. A luz azul é apenas um deles. A Eyegis aborda o conforto visual como um todo — via engenharia óptica cuidadosa.",
    factors: [
      "Exposição prolongada à tela",
      "Taxa de piscada reduzida",
      "Distância de visão",
      "Iluminação ambiente",
      "Fadiga por foco sustentado",
      "Reflexos na tela",
    ],
    fig02Caption: "Fig. 02 · Carga Visual Contemporânea",
    s03Label: "Tecnologia",
    s03Title1: "EyegisGuard™ — ",
    s03Accent: "seletivo",
    s03Title2: ", não agressivo.",
    s03Body:
      "Um tratamento proprietário de lente que filtra uma faixa estreita das ondas azuis de maior energia, preservando fidelidade de cor e contraste. Sem tonalidade amarela. Sem brancos distorcidos. Sem filtragem exagerada.",
    s03Metrics: ["Pico de filtragem em 435 nm", "Transmissão de luz visível", "Índice de refração"],
    s03Cta: "Saiba Mais",
    fig03Caption: "Fig. 03 · EyegisGuard™ Vista Explodida",
    s03LayerLabels: ["01 · Camada AR", "02 · Filtro Seletivo", "03 · Substrato CR-39"],
    s04Label: "A Diferença",
    s04Title1: "Uma comparação discreta, ",
    s04Accent: "nos nossos termos.",
    s04Body:
      "Não citamos concorrentes. Apenas descrevemos, com honestidade, o que diferencia o que fazemos do que se encontra amplamente.",
    tableHeaders: { topic: "Critério", typical: "Óculos Blue-Light Comuns", eyegis: "Eyegis" },
    tableRows: [
      { topic: "Precisão de Cor", typical: "Tom amarelado, brancos alterados", eyegis: "Tom neutro, cor fiel à realidade" },
      { topic: "Conforto Visual", typical: "Filtragem genérica", eyegis: "Filtragem seletiva, calibrada por comprimento de onda" },
      { topic: "Qualidade da Lente", typical: "Policarbonato padrão", eyegis: "CR-39 óptico e vidro mineral" },
      { topic: "Qualidade da Armação", typical: "Plástico injetado", eyegis: "Acetato italiano e titânio japonês" },
      { topic: "Linguagem de Design", typical: "Utilitária", eyegis: "Editorial, silhuetas atemporais" },
      { topic: "Transparência", typical: "Promessas amplas de bem-estar", eyegis: "Especificações documentadas" },
      { topic: "Abordagem Científica", typical: "Guiada por marketing", eyegis: "Engenharia baseada em pesquisa" },
    ],
    s05Label: "Filosofia de Pesquisa",
    quote: "Acompanhamos continuamente pesquisas revisadas por pares em ",
    quoteA: "óptica",
    quoteB: "ergonomia",
    quoteC: "conforto visual",
    quoteFooter: "Eyegis Optical Studio — Carta de Pesquisa, 2026",
    fig04Caption: "Fig. 04 · Estúdio de Pesquisa, São Paulo",
    pillars: [
      { title: "Especificações documentadas", copy: "Cada lente vem acompanhada de uma ficha técnica em linguagem clara." },
      { title: "Linguagem cuidadosa", copy: "Descrevemos o que nossas lentes fazem — nunca o que curam." },
      { title: "Produto, não prescrição", copy: "Eyegis é um item de conforto, não dispositivo médico." },
      { title: "Pensamento de dia inteiro", copy: "Telas são apenas uma entre as muitas variáveis que estudamos." },
    ],
    closing: "Ciência honesta gera objetos melhores — e usuários melhores.",
    closingCta: "Escolher Minha Lente",
  },
  FR: {
    chapter: "Chapitre IV · Honest Science™",
    title1: "L'évidence.",
    titleAccent: "Pas le marketing.",
    intro1:
      "Les verres filtrants peuvent améliorer le confort visuel — mais toutes les promesses en ligne ne sont pas fondées scientifiquement. Chez Eyegis, la transparence l'emporte sur l'exagération.",
    intro2: "Ce qui suit : ce que nous savons, ce que nous soupçonnons et ce que nous continuons d'étudier.",
    s01Label: "Spectre",
    s01Title1: "Qu'est-ce que la ",
    s01Accent: "lumière bleue ?",
    s01Body1:
      "La lumière bleue est naturelle. Le soleil en est, de très loin, la première source. Les écrans en émettent bien moins que la lumière du jour.",
    s01Body2:
      "Une exposition prolongée aux écrans peut néanmoins contribuer à un inconfort visuel chez certains. Le tableau est nuancé — notre réponse l'est aussi.",
    figSpectrum: "Fig. 01 · Spectre Visible",
    spectrum: {
      axisLabel: "Longueur d'onde (nm)",
      bandLabels: { visible: "Lumière Visible", uv: "Ultraviolet", ir: "Infrarouge" },
      callout: {
        title: "Lumière Bleue · 400 – 500 nm",
        body: "Une bande étroite du spectre visible, présente dans la lumière du jour et, en bien plus faible quantité, dans les écrans modernes.",
      },
    },
    s02Label: "Confort Visuel",
    s02Title1: "La fatigue visuelle numérique est une histoire ",
    s02Accent: "à plusieurs facettes",
    s02Title2: ".",
    s02Body:
      "L'inconfort en fin de journée d'écran dépend de nombreux facteurs. La lumière bleue n'en est qu'un. Eyegis aborde le confort visuel dans son ensemble — par une ingénierie optique réfléchie.",
    factors: [
      "Exposition prolongée aux écrans",
      "Fréquence de clignement réduite",
      "Distance de vision",
      "Éclairage ambiant",
      "Fatigue de concentration soutenue",
      "Reflets d'écran",
    ],
    fig02Caption: "Fig. 02 · Charge Visuelle Contemporaine",
    s03Label: "Technologie",
    s03Title1: "EyegisGuard™ — ",
    s03Accent: "sélectif",
    s03Title2: ", non agressif.",
    s03Body:
      "Un traitement propriétaire qui filtre une bande étroite des longueurs d'onde bleues à plus haute énergie, tout en préservant la fidélité des couleurs et le contraste. Aucune teinte jaune. Aucun blanc altéré. Aucun filtrage excessif.",
    s03Metrics: ["Pic de filtrage à 435 nm", "Transmission de lumière visible", "Indice de réfraction"],
    s03Cta: "En savoir plus",
    fig03Caption: "Fig. 03 · EyegisGuard™ Vue Éclatée",
    s03LayerLabels: ["01 · Traitement AR", "02 · Filtre Sélectif", "03 · Substrat CR-39"],
    s04Label: "La Différence",
    s04Title1: "Une comparaison sereine, ",
    s04Accent: "à nos conditions.",
    s04Body:
      "Nous ne nommons pas de concurrents. Nous décrivons simplement, honnêtement, ce qui distingue nos objets de ce que l'on trouve couramment.",
    tableHeaders: { topic: "Critère", typical: "Lunettes Blue-Light Classiques", eyegis: "Eyegis" },
    tableRows: [
      { topic: "Fidélité des Couleurs", typical: "Teinte jaune, blancs décalés", eyegis: "Ton neutre, couleur fidèle" },
      { topic: "Confort Visuel", typical: "Filtrage générique", eyegis: "Filtrage sélectif, calibré par longueur d'onde" },
      { topic: "Qualité du Verre", typical: "Polycarbonate standard", eyegis: "CR-39 optique et verre minéral" },
      { topic: "Qualité de la Monture", typical: "Plastique injecté", eyegis: "Acétate italien et titane japonais" },
      { topic: "Langage de Design", typical: "Utilitaire", eyegis: "Éditorial, silhouettes intemporelles" },
      { topic: "Transparence", typical: "Promesses de bien-être vagues", eyegis: "Spécifications documentées" },
      { topic: "Approche Scientifique", typical: "Guidée par le marketing", eyegis: "Ingénierie fondée sur la recherche" },
    ],
    s05Label: "Philosophie de Recherche",
    quote: "Nous suivons en continu la recherche évaluée par les pairs en ",
    quoteA: "optique",
    quoteB: "ergonomie",
    quoteC: "confort visuel",
    quoteFooter: "Eyegis Optical Studio — Charte de Recherche, 2026",
    fig04Caption: "Fig. 04 · Studio de Recherche, São Paulo",
    pillars: [
      { title: "Spécifications documentées", copy: "Chaque verre est livré avec une fiche technique en langage clair." },
      { title: "Langage mesuré", copy: "Nous décrivons ce que nos verres font — jamais ce qu'ils soigneraient." },
      { title: "Produit, pas prescription", copy: "Eyegis est un objet de confort, pas un dispositif médical." },
      { title: "Pensée « journée entière »", copy: "Les écrans ne sont qu'une variable parmi celles que nous étudions." },
    ],
    closing: "Une science honnête donne de meilleurs objets — et de meilleurs porteurs.",
    closingCta: "Choisir mes verres",
  },
};

/* ---------- Reveal ---------- */
function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
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
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
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
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- CountUp ---------- */
function CountUp({ to, suffix = "", duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const { ref, visible } = useReveal<HTMLSpanElement>(0.3);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, to, duration]);
  const display = to % 1 === 0 ? Math.round(n).toString() : n.toFixed(1);
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ---------- Spectrum diagram ---------- */
function SpectrumDiagram({ copy }: { copy: HonestCopy["spectrum"] }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.25);
  const bands = [
    { key: "UV", label: copy.bandLabels.uv, color: "#8E8FB3", start: 0, end: 18 },
    {
      key: "Visible",
      label: copy.bandLabels.visible,
      color: "linear-gradient(90deg,#6A5ACD,#2E8AC9,#3DC1B8,#E9D77A,#E58A5A,#C24A4A)",
      start: 18,
      end: 78,
    },
    { key: "Blue", label: "Blue", color: "#2E8AC9", start: 18, end: 34 },
    { key: "IR", label: copy.bandLabels.ir, color: "#B76A55", start: 78, end: 100 },
  ];
  return (
    <div ref={ref} className="w-full">
      <div className="flex items-baseline justify-between font-eyebrow text-ink/50 text-[10px]">
        <span>100 nm</span>
        <span>{copy.axisLabel}</span>
        <span>1 mm</span>
      </div>
      <div className="relative mt-6 h-14 w-full rounded-[3px] bg-[var(--paper-warm)] overflow-hidden">
        <div
          className="absolute top-0 h-full transition-[transform,opacity] duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] origin-left"
          style={{
            left: `${bands[1].start}%`,
            width: `${bands[1].end - bands[1].start}%`,
            background: bands[1].color,
            transform: visible ? "scaleX(1)" : "scaleX(0)",
            opacity: visible ? 1 : 0,
          }}
        />
        <div
          className="absolute top-0 h-full transition-[transform,opacity] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] origin-left"
          style={{
            left: `${bands[0].start}%`,
            width: `${bands[0].end - bands[0].start}%`,
            background: bands[0].color,
            transform: visible ? "scaleX(1)" : "scaleX(0)",
            opacity: visible ? 0.65 : 0,
            transitionDelay: "120ms",
          }}
        />
        <div
          className="absolute top-0 h-full transition-[transform,opacity] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] origin-right"
          style={{
            left: `${bands[3].start}%`,
            width: `${bands[3].end - bands[3].start}%`,
            background: bands[3].color,
            transform: visible ? "scaleX(1)" : "scaleX(0)",
            opacity: visible ? 0.7 : 0,
            transitionDelay: "180ms",
          }}
        />
        <div
          className="absolute top-0 h-full border-x border-ink/40 transition-opacity duration-[1200ms]"
          style={{
            left: `${bands[2].start}%`,
            width: `${bands[2].end - bands[2].start}%`,
            opacity: visible ? 1 : 0,
            transitionDelay: "900ms",
          }}
          aria-hidden="true"
        />
      </div>
      <div className="relative mt-4 h-8">
        {bands
          .filter((b) => b.key !== "Blue")
          .map((b, i) => {
            const center = (b.start + b.end) / 2;
            return (
              <div
                key={b.key}
                className="absolute -translate-x-1/2 text-center transition-opacity duration-1000"
                style={{ left: `${center}%`, opacity: visible ? 1 : 0, transitionDelay: `${400 + i * 120}ms` }}
              >
                <span className="font-eyebrow text-ink/70 text-[10px]">{b.label}</span>
              </div>
            );
          })}
      </div>
      <div
        className="mt-6 flex items-start gap-4 transition-[opacity,transform] duration-1000"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transitionDelay: "1100ms",
        }}
      >
        <div className="mt-1 h-3 w-3 rounded-full bg-[#2E8AC9]" aria-hidden="true" />
        <div className="max-w-md">
          <div className="font-eyebrow text-ink text-[10px]">{copy.callout.title}</div>
          <p className="mt-2 text-[14px] leading-[1.7] text-ink/70">{copy.callout.body}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Comparison table ---------- */
function ComparisonTable({ copy }: { copy: HonestCopy }) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-6 border-b border-ink/15 pb-6">
        <div className="col-span-4">
          <span className="font-eyebrow text-ink/50">{copy.tableHeaders.topic}</span>
        </div>
        <div className="col-span-4">
          <span className="font-eyebrow text-ink/50">{copy.tableHeaders.typical}</span>
        </div>
        <div className="col-span-4">
          <span className="font-eyebrow text-teal">{copy.tableHeaders.eyegis}</span>
        </div>
      </div>
      <div className="divide-y divide-ink/10">
        {copy.tableRows.map((r, i) => (
          <Reveal key={r.topic} delay={i * 60}>
            <div className="grid grid-cols-12 gap-6 py-6 md:py-7 items-baseline">
              <div className="col-span-12 md:col-span-4">
                <span className="font-editorial text-ink text-xl md:text-2xl tracking-[-0.01em]">{r.topic}</span>
              </div>
              <div className="col-span-12 md:col-span-4">
                <span className="text-[14px] md:text-[15px] leading-[1.65] text-ink/55">{r.typical}</span>
              </div>
              <div className="col-span-12 md:col-span-4">
                <span className="text-[14px] md:text-[15px] leading-[1.65] text-ink">{r.eyegis}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ---------- Icons ---------- */
const stroke = { stroke: "currentColor", strokeWidth: 1 } as const;
function IconSun() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" {...stroke} />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M19.5 4.5l-2 2M6.5 17.5l-2 2" {...stroke} />
    </svg>
  );
}
function IconScreen() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="1" {...stroke} />
      <path d="M8 20h8M12 16v4" {...stroke} />
    </svg>
  );
}
function IconEye() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" {...stroke} />
      <circle cx="12" cy="12" r="2.5" {...stroke} />
    </svg>
  );
}
function IconWave() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" {...stroke} />
    </svg>
  );
}
function IconDoc() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 3h9l4 4v14H6z" {...stroke} />
      <path d="M14 3v5h5M9 13h6M9 17h4" {...stroke} />
    </svg>
  );
}

/* ---------- Section ---------- */
export function HonestScience() {
  const { lang } = useI18n();
  const copy = COPY[lang];
  const pillarIcons = [<IconDoc />, <IconEye />, <IconScreen />, <IconSun />];

  return (
    <section id="honest-science" aria-labelledby="honest-title" className="relative bg-[var(--paper)] text-ink">
      {/* Title band */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 pt-32 md:pt-40 lg:pt-48">
        <Reveal className="flex items-center gap-4">
          <span className="h-px w-10 bg-ink/30" />
          <span className="font-eyebrow text-ink/60">{copy.chapter}</span>
        </Reveal>
        <div className="mt-14 grid grid-cols-12 gap-10 lg:gap-16 items-end">
          <Reveal delay={100} className="col-span-12 lg:col-span-8">
            <h2
              id="honest-title"
              className="font-editorial text-ink text-balance-tight leading-[0.92] tracking-[-0.02em] text-[14vw] sm:text-[11vw] md:text-[8.5vw] lg:text-[128px]"
            >
              {copy.title1}
              <br />
              <span className="italic text-teal">{copy.titleAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={220} className="col-span-12 lg:col-span-4">
            <p className="text-[15px] md:text-[16px] leading-[1.75] text-ink/70 max-w-md">
              {copy.intro1}
              <span className="block mt-4 text-ink/50">{copy.intro2}</span>
            </p>
          </Reveal>
        </div>
      </div>

      {/* § 01 */}
      <div className="mx-auto mt-32 md:mt-44 max-w-[1600px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 order-1 lg:order-2">
            <Reveal className="flex items-center gap-3">
              <span className="font-eyebrow text-ink/50">§ 01</span>
              <span className="h-px w-8 bg-ink/25" />
              <span className="font-eyebrow text-ink/50">{copy.s01Label}</span>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="mt-8 font-editorial text-ink text-[42px] md:text-[52px] leading-[1] tracking-[-0.02em] max-w-[14ch]">
                {copy.s01Title1}
                <span className="italic text-teal">{copy.s01Accent}</span>
              </h3>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-8 space-y-5 text-[15px] md:text-[16px] leading-[1.75] text-ink/70">
                <p>{copy.s01Body1}</p>
                <p>{copy.s01Body2}</p>
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-1 order-2 lg:order-1">
            <Reveal delay={80}>
              <div className="rounded-[6px] bg-[var(--paper-warm)] p-8 md:p-12">
                <div className="flex items-center justify-between">
                  <span className="font-eyebrow text-ink/60">{copy.figSpectrum}</span>
                  <IconWave />
                </div>
                <div className="mt-10">
                  <SpectrumDiagram copy={copy.spectrum} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* § 02 */}
      <div className="mx-auto mt-40 md:mt-52 max-w-[1600px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="col-span-12 lg:col-span-6 lg:col-start-1">
            <Reveal>
              <figure>
                <div className="relative overflow-hidden rounded-[6px] aspect-[4/5] md:aspect-square bg-[var(--paper-warm)]">
                  <img
                    src={scienceDevices}
                    alt="Overhead view of a laptop, tablet and phone on a minimal desk in soft window light"
                    loading="lazy"
                    width={1200}
                    height={1200}
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="mt-4 flex items-center justify-between font-eyebrow text-ink/55">
                  <span>{copy.fig02Caption}</span>
                  <span>N°02</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <Reveal className="flex items-center gap-3">
              <span className="font-eyebrow text-ink/50">§ 02</span>
              <span className="h-px w-8 bg-ink/25" />
              <span className="font-eyebrow text-ink/50">{copy.s02Label}</span>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="mt-8 font-editorial text-ink text-[42px] md:text-[52px] leading-[1] tracking-[-0.02em] max-w-[16ch]">
                {copy.s02Title1}
                <span className="italic text-teal">{copy.s02Accent}</span>
                {copy.s02Title2}
              </h3>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-8 text-[15px] md:text-[16px] leading-[1.75] text-ink/70">{copy.s02Body}</p>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {copy.factors.map((f, i) => (
                <Reveal key={f} delay={300 + i * 60}>
                  <div className="flex items-baseline gap-3 border-t border-ink/10 pt-3">
                    <span className="font-eyebrow text-ink/40 text-[10px]">0{i + 1}</span>
                    <span className="text-[14px] text-ink/80">{f}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* § 03 — EyegisGuard band */}
      <div className="mt-40 md:mt-52 bg-[var(--teal-deep)] text-paper">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 py-28 md:py-36">
          <div className="grid grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="col-span-12 lg:col-span-5">
              <Reveal className="flex items-center gap-3">
                <span className="font-eyebrow text-mint">§ 03</span>
                <span className="h-px w-8 bg-paper/25" />
                <span className="font-eyebrow text-paper/60">{copy.s03Label}</span>
              </Reveal>
              <Reveal delay={120}>
                <h3 className="mt-8 font-editorial text-paper text-[44px] md:text-[56px] leading-[0.98] tracking-[-0.02em] max-w-[14ch]">
                  {copy.s03Title1}
                  <span className="italic text-mint">{copy.s03Accent}</span>
                  {copy.s03Title2}
                </h3>
              </Reveal>
              <Reveal delay={220}>
                <p className="mt-8 text-[15px] md:text-[16px] leading-[1.75] text-paper/75 max-w-md">{copy.s03Body}</p>
              </Reveal>
              <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
                {[
                  { v: <CountUp to={38} suffix="%" />, k: copy.s03Metrics[0] },
                  { v: <CountUp to={99} suffix="%" />, k: copy.s03Metrics[1] },
                  { v: <CountUp to={1.6} />, k: copy.s03Metrics[2] },
                ].map((s, i) => (
                  <Reveal key={i} delay={320 + i * 100}>
                    <div className="flex flex-col gap-2 border-t border-paper/20 pt-4">
                      <span className="font-editorial text-paper text-3xl md:text-4xl tracking-tight">{s.v}</span>
                      <span className="font-eyebrow text-paper/55 text-[10px] leading-relaxed">{s.k}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={620}>
                <a href="#eyegisguard" className="mt-14 inline-flex items-center gap-4 font-eyebrow text-paper group">
                  <span className="relative">
                    {copy.s03Cta}
                    <span className="absolute inset-x-0 -bottom-1 h-px bg-paper/40" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid h-10 w-10 place-items-center rounded-full border border-paper/30 transition-[transform,background-color,color] duration-500 group-hover:bg-mint group-hover:text-teal-deep group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </Reveal>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <Reveal delay={80}>
                <figure className="relative">
                  <div className="relative overflow-hidden rounded-[6px] aspect-[5/4] bg-[color:rgba(255,255,255,0.03)]">
                    <img
                      src={scienceLensExploded}
                      alt="Exploded view of three curved optical layers that form an Eyegis lens"
                      loading="lazy"
                      width={1200}
                      height={1200}
                      className="h-full w-full object-cover mix-blend-screen opacity-95"
                    />
                    <svg
                      className="pointer-events-none absolute inset-0 h-full w-full"
                      viewBox="0 0 100 80"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <line x1="72" y1="26" x2="94" y2="18" stroke="rgba(134,217,209,0.6)" strokeWidth="0.15" vectorEffect="non-scaling-stroke" />
                      <line x1="70" y1="42" x2="94" y2="42" stroke="rgba(134,217,209,0.6)" strokeWidth="0.15" vectorEffect="non-scaling-stroke" />
                      <line x1="70" y1="60" x2="94" y2="68" stroke="rgba(134,217,209,0.6)" strokeWidth="0.15" vectorEffect="non-scaling-stroke" />
                    </svg>
                    <div className="pointer-events-none absolute right-3 top-[18%] font-eyebrow text-mint text-[10px]">
                      {copy.s03LayerLabels[0]}
                    </div>
                    <div className="pointer-events-none absolute right-3 top-[48%] font-eyebrow text-mint text-[10px]">
                      {copy.s03LayerLabels[1]}
                    </div>
                    <div className="pointer-events-none absolute right-3 top-[78%] font-eyebrow text-mint text-[10px]">
                      {copy.s03LayerLabels[2]}
                    </div>
                  </div>
                  <figcaption className="mt-4 flex items-center justify-between font-eyebrow text-paper/55">
                    <span>{copy.fig03Caption}</span>
                    <span>N°03</span>
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* § 04 — Comparison */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 pt-32 md:pt-44">
        <div className="grid grid-cols-12 gap-10 items-end">
          <Reveal className="col-span-12 md:col-span-7">
            <div className="flex items-center gap-3">
              <span className="font-eyebrow text-ink/50">§ 04</span>
              <span className="h-px w-8 bg-ink/25" />
              <span className="font-eyebrow text-ink/50">{copy.s04Label}</span>
            </div>
            <h3 className="mt-8 font-editorial text-ink text-[42px] md:text-[54px] leading-[1] tracking-[-0.02em] max-w-[18ch]">
              {copy.s04Title1}
              <span className="italic text-teal">{copy.s04Accent}</span>
            </h3>
          </Reveal>
          <Reveal delay={120} className="col-span-12 md:col-span-5">
            <p className="text-[15px] leading-[1.75] text-ink/65 max-w-md md:ml-auto">{copy.s04Body}</p>
          </Reveal>
        </div>
        <div className="mt-16 md:mt-20">
          <ComparisonTable copy={copy} />
        </div>
      </div>

      {/* § 05 — Research */}
      <div className="mx-auto mt-40 md:mt-52 max-w-[1600px] px-6 md:px-10 lg:px-14 pb-40 md:pb-52">
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="col-span-12 lg:col-span-5 lg:col-start-1">
            <Reveal>
              <figure>
                <div className="relative overflow-hidden rounded-[6px] aspect-[4/5] bg-[var(--paper-warm)]">
                  <img
                    src={scienceLab}
                    alt="A brass microscope on a concrete bench inside a quiet optical laboratory"
                    loading="lazy"
                    width={1200}
                    height={1200}
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="mt-4 flex items-center justify-between font-eyebrow text-ink/55">
                  <span>{copy.fig04Caption}</span>
                  <span>N°04</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Reveal className="flex items-center gap-3">
              <span className="font-eyebrow text-ink/50">§ 05</span>
              <span className="h-px w-8 bg-ink/25" />
              <span className="font-eyebrow text-ink/50">{copy.s05Label}</span>
            </Reveal>
            <Reveal delay={120}>
              <blockquote className="mt-10">
                <span className="font-editorial text-teal text-6xl md:text-7xl leading-none block" aria-hidden="true">
                  “
                </span>
                <p className="mt-2 font-editorial text-ink text-[32px] md:text-[42px] leading-[1.15] tracking-[-0.015em] max-w-[26ch]">
                  {copy.quote}
                  <span className="italic text-teal">{copy.quoteA}</span>,{" "}
                  <span className="italic text-teal">{copy.quoteB}</span>{" "}
                  &{" "}
                  <span className="italic text-teal">{copy.quoteC}</span>.
                </p>
                <footer className="mt-8 flex items-center gap-3 font-eyebrow text-ink/50">
                  <span className="h-px w-8 bg-ink/25" />
                  <span>{copy.quoteFooter}</span>
                </footer>
              </blockquote>
            </Reveal>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
              {copy.pillars.map((p, i) => (
                <Reveal key={p.title} delay={200 + i * 80}>
                  <div className="border-t border-ink/15 pt-5 flex items-start gap-4">
                    <span className="mt-1 text-ink/70">{pillarIcons[i]}</span>
                    <div>
                      <div className="font-editorial text-ink text-lg tracking-[-0.01em]">{p.title}</div>
                      <p className="mt-2 text-[13.5px] leading-[1.7] text-ink/65">{p.copy}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Closing */}
      <div className="bg-[var(--paper-warm)]">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 py-24 md:py-28 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <Reveal>
            <p className="font-editorial text-ink text-3xl md:text-4xl tracking-[-0.01em] leading-[1.05] max-w-[26ch]">
              {copy.closing}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <a href="#lenses" className="group inline-flex items-center gap-4 font-eyebrow text-ink">
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

export default HonestScience;
