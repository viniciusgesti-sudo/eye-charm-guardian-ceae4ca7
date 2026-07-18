import { useEffect, useMemo, useRef, useState } from "react";

import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

import meridianHero from "@/assets/products/meridian-hero.jpg?w=320;480;800&format=avif;webp;jpg&as=picture";
import soleneFront from "@/assets/products/solene-front.jpg?w=320;480;800&format=avif;webp;jpg&as=picture";
import maraisFront from "@/assets/products/marais-front.jpg?w=320;480;800&format=avif;webp;jpg&as=picture";
import atelierFront from "@/assets/products/atelier-front.jpg?w=320;480;800&format=avif;webp;jpg&as=picture";
import { Picture, type PictureSource } from "./Picture";

/* ------------------------------------------------------------------ */
/*  Reveal on scroll                                                  */
/* ------------------------------------------------------------------ */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

/* ------------------------------------------------------------------ */
/*  Answer keys (stable) + weights                                    */
/* ------------------------------------------------------------------ */

type QKey = "exposure" | "devices" | "lifestyle" | "symptoms" | "night" | "priority";

type QuestionMeta = {
  key: QKey;
  multi?: boolean;
  options: { key: string; weight: number }[];
};

const QUESTIONS_META: QuestionMeta[] = [
  {
    key: "exposure",
    options: [
      { key: "e1", weight: 20 },
      { key: "e2", weight: 14 },
      { key: "e3", weight: 9 },
      { key: "e4", weight: 5 },
      { key: "e5", weight: 2 },
    ],
  },
  {
    key: "devices",
    multi: true,
    options: [
      { key: "laptop", weight: 3 },
      { key: "desktop", weight: 3 },
      { key: "phone", weight: 2 },
      { key: "tablet", weight: 2 },
      { key: "console", weight: 2 },
      { key: "multi", weight: 1 },
    ],
  },
  {
    key: "lifestyle",
    options: [
      { key: "creative", weight: 10 },
      { key: "business", weight: 10 },
      { key: "student", weight: 10 },
      { key: "gamer", weight: 8 },
      { key: "remote", weight: 9 },
      { key: "nomad", weight: 9 },
    ],
  },
  {
    key: "symptoms",
    multi: true,
    options: [
      { key: "fatigue", weight: -3 },
      { key: "dry", weight: -3 },
      { key: "headache", weight: -3 },
      { key: "focus", weight: -3 },
      { key: "none", weight: 8 },
    ],
  },
  {
    key: "night",
    options: [
      { key: "rarely", weight: 14 },
      { key: "sometimes", weight: 10 },
      { key: "frequently", weight: 5 },
      { key: "every", weight: 2 },
    ],
  },
  {
    key: "priority",
    options: [
      { key: "comfort", weight: 10 },
      { key: "style", weight: 10 },
      { key: "productivity", weight: 10 },
      { key: "gaming", weight: 9 },
      { key: "reading", weight: 10 },
      { key: "wellness", weight: 10 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Localized copy                                                    */
/* ------------------------------------------------------------------ */

type QCopy = { eyebrow: string; title: string; hint?: string; options: Record<string, string> };
type RecCopy = { collection: string; productName: string; productLine: string; productDesc: string; summary: string };

type Copy = {
  badge: string;
  heroLine1: string;
  heroLine2: string;
  intro: string;
  disclaimer: string;
  progressLabel: string;
  continue: string;
  previous: string;
  underMinute: string;
  questions: Record<QKey, QCopy>;
  resultEyebrow: string;
  resultTitle: string;
  score: string;
  outOf: string;
  recEyebrowPrefix: string;
  learnMore: string;
  buyOnAmazon: string;
  tagEyegisGuard: string;
  tagComfort: string;
  tipsEyebrow: string;
  tipsTitle: string;
  tips: string[];
  finalEyebrow: string;
  finalLine1: string;
  finalLine2: string;
  ctaShop: string;
  ctaExplore: string;
  ctaLearn: string;
  retake: string;
  recommendations: {
    gamer: RecCopy;
    business: RecCopy;
    creative: RecCopy;
    student: RecCopy;
    default: RecCopy;
  };
};

const COPY: Record<Lang, Copy> = {
  EN: {
    badge: "Digital Eye Score™",
    heroLine1: "How healthy are your",
    heroLine2: "digital habits?",
    intro:
      "Discover your Digital Eye Score in less than a minute. Answer a few questions about your daily screen exposure and receive a personalized recommendation.",
    disclaimer:
      "Not a medical diagnosis. A lifestyle assessment designed to guide your choice of eyewear.",
    progressLabel: "Digital Eye Score™ · Assessment",
    continue: "Continue",
    previous: "← Previous",
    underMinute: "Less than 60 seconds",
    questions: {
      exposure: {
        eyebrow: "Question 01 · Exposure",
        title: "How many hours do you spend looking at screens every day?",
        options: { e1: "Less than 2", e2: "2 – 4", e3: "4 – 6", e4: "6 – 8", e5: "More than 8" },
      },
      devices: {
        eyebrow: "Question 02 · Devices",
        title: "Which devices do you use most often?",
        hint: "Select all that apply",
        options: { laptop: "Laptop", desktop: "Desktop", phone: "Phone", tablet: "Tablet", console: "Gaming Console", multi: "Multiple devices" },
      },
      lifestyle: {
        eyebrow: "Question 03 · Lifestyle",
        title: "What best describes your lifestyle?",
        options: { creative: "Creative Professional", business: "Business Professional", student: "Student", gamer: "Gamer", remote: "Remote Worker", nomad: "Digital Nomad" },
      },
      symptoms: {
        eyebrow: "Question 04 · Symptoms",
        title: "Do you often experience any of these?",
        hint: "Select all that apply",
        options: { fatigue: "Eye fatigue", dry: "Dry eyes", headache: "Headaches", focus: "Difficulty focusing", none: "None of the above" },
      },
      night: {
        eyebrow: "Question 05 · Night use",
        title: "How often do you work or study at night?",
        options: { rarely: "Rarely", sometimes: "Sometimes", frequently: "Frequently", every: "Every day" },
      },
      priority: {
        eyebrow: "Question 06 · Priorities",
        title: "What matters most to you?",
        options: { comfort: "Comfort", style: "Style", productivity: "Productivity", gaming: "Gaming", reading: "Reading", wellness: "Overall eye wellness" },
      },
    },
    resultEyebrow: "Your result",
    resultTitle: "Your Digital Eye Score",
    score: "Digital Eye Score",
    outOf: "/ 100",
    recEyebrowPrefix: "Recommended Collection ·",
    learnMore: "Learn More",
    buyOnAmazon: "Buy on Amazon",
    tagEyegisGuard: "EyegisGuard™",
    tagComfort: "60-Day Comfort",
    tipsEyebrow: "Personalized tips",
    tipsTitle: "Small habits, meaningful comfort.",
    tips: [
      "Take a 20-second visual break every 20 minutes.",
      "Blink deliberately when your screen focus deepens.",
      "Match ambient lighting to your screen's brightness.",
      "Keep your screen roughly one arm's length away.",
      "Wear premium optical filtering for extended sessions.",
      "End the day with softer lighting an hour before sleep.",
    ],
    finalEyebrow: "Digital Eye Score™",
    finalLine1: "Ready to experience a more comfortable",
    finalLine2: "digital life?",
    ctaShop: "Buy on Amazon",
    ctaExplore: "Explore Collection",
    ctaLearn: "Learn About EyegisGuard™",
    retake: "↺ Retake the assessment",
    recommendations: {
      gamer: {
        collection: "Men · Gaming",
        productName: "Meridian",
        productLine: "by Eyegis",
        productDesc: "TR90 lightweight frame engineered for long sessions in front of the screen without visual fatigue.",
        summary: "Your routine involves extended focused sessions in front of the screen. Prioritize a lightweight frame with premium blue-light filtering to stay comfortable for hours.",
      },
      business: {
        collection: "Men · Business",
        productName: "Atelier",
        productLine: "by Eyegis",
        productDesc: "Architectural silhouette with EyegisGuard™ optical filter — quiet elegance for meetings and screen work alike.",
        summary: "Your day balances screens and presence. Choose a refined frame that supports long working hours while keeping natural color perception on every display.",
      },
      creative: {
        collection: "Women · Creative",
        productName: "Solène",
        productLine: "by Eyegis",
        productDesc: "A sculpted feminine profile with EyegisGuard™ filtering — designed to protect focus without dulling color.",
        summary: "Your work depends on color accuracy and long visual sessions. Look for a frame that filters high-energy light without shifting tones on screen.",
      },
      student: {
        collection: "Kids & Teens",
        productName: "Marais",
        productLine: "by Eyegis",
        productDesc: "A youthful frame with the same optical-grade EyegisGuard™ filter — built for study hours and everyday wear.",
        summary: "Study hours quickly add up. Choose a light, resilient frame that supports focus during reading and screen sessions.",
      },
      default: {
        collection: "Women · Everyday",
        productName: "Solène",
        productLine: "by Eyegis",
        productDesc: "Everyday elegance with EyegisGuard™ blue-light filtering and true-to-life colors.",
        summary: "Your routine mixes work, travel and personal time in front of screens. A versatile frame with premium optical filtering fits every part of your day.",
      },
    },
  },
  PT: {
    badge: "Digital Eye Score™",
    heroLine1: "Quão saudáveis são seus",
    heroLine2: "hábitos digitais?",
    intro:
      "Descubra seu Digital Eye Score em menos de um minuto. Responda a algumas perguntas sobre sua exposição diária às telas e receba uma recomendação personalizada.",
    disclaimer:
      "Não é um diagnóstico médico. Uma avaliação de estilo de vida para orientar sua escolha de óculos.",
    progressLabel: "Digital Eye Score™ · Avaliação",
    continue: "Continuar",
    previous: "← Voltar",
    underMinute: "Menos de 60 segundos",
    questions: {
      exposure: {
        eyebrow: "Pergunta 01 · Exposição",
        title: "Quantas horas por dia você passa em frente a telas?",
        options: { e1: "Menos de 2", e2: "2 – 4", e3: "4 – 6", e4: "6 – 8", e5: "Mais de 8" },
      },
      devices: {
        eyebrow: "Pergunta 02 · Dispositivos",
        title: "Quais dispositivos você mais usa?",
        hint: "Selecione todos que se aplicam",
        options: { laptop: "Notebook", desktop: "Desktop", phone: "Celular", tablet: "Tablet", console: "Console de jogos", multi: "Vários dispositivos" },
      },
      lifestyle: {
        eyebrow: "Pergunta 03 · Estilo de vida",
        title: "O que melhor descreve seu estilo de vida?",
        options: { creative: "Profissional Criativo", business: "Profissional de Negócios", student: "Estudante", gamer: "Gamer", remote: "Trabalho Remoto", nomad: "Nômade Digital" },
      },
      symptoms: {
        eyebrow: "Pergunta 04 · Sintomas",
        title: "Com que frequência você sente algum destes?",
        hint: "Selecione todos que se aplicam",
        options: { fatigue: "Fadiga visual", dry: "Olhos secos", headache: "Dores de cabeça", focus: "Dificuldade de foco", none: "Nenhum dos anteriores" },
      },
      night: {
        eyebrow: "Pergunta 05 · Uso noturno",
        title: "Com que frequência você trabalha ou estuda à noite?",
        options: { rarely: "Raramente", sometimes: "Às vezes", frequently: "Com frequência", every: "Todos os dias" },
      },
      priority: {
        eyebrow: "Pergunta 06 · Prioridades",
        title: "O que é mais importante para você?",
        options: { comfort: "Conforto", style: "Estilo", productivity: "Produtividade", gaming: "Jogos", reading: "Leitura", wellness: "Bem-estar visual" },
      },
    },
    resultEyebrow: "Seu resultado",
    resultTitle: "Seu Digital Eye Score",
    score: "Digital Eye Score",
    outOf: "/ 100",
    recEyebrowPrefix: "Coleção recomendada ·",
    learnMore: "Saiba mais",
    buyOnAmazon: "Comprar na Amazon",
    tagEyegisGuard: "EyegisGuard™",
    tagComfort: "60 dias de conforto",
    tipsEyebrow: "Dicas personalizadas",
    tipsTitle: "Pequenos hábitos, conforto real.",
    tips: [
      "Faça uma pausa visual de 20 segundos a cada 20 minutos.",
      "Pisque conscientemente quando o foco na tela se aprofundar.",
      "Ajuste a iluminação do ambiente ao brilho da sua tela.",
      "Mantenha a tela à distância de um braço.",
      "Use filtro óptico premium em sessões longas.",
      "Encerre o dia com luz mais suave uma hora antes de dormir.",
    ],
    finalEyebrow: "Digital Eye Score™",
    finalLine1: "Pronto para viver uma vida digital",
    finalLine2: "mais confortável?",
    ctaShop: "Comprar na Amazon",
    ctaExplore: "Explorar a Coleção",
    ctaLearn: "Conhecer o EyegisGuard™",
    retake: "↺ Refazer a avaliação",
    recommendations: {
      gamer: {
        collection: "Homem · Gaming",
        productName: "Meridian",
        productLine: "by Eyegis",
        productDesc: "Armação TR90 leve, pensada para longas sessões em frente à tela sem fadiga visual.",
        summary: "Sua rotina inclui longas sessões de foco na tela. Priorize uma armação leve com filtro premium de luz azul para se manter confortável por horas.",
      },
      business: {
        collection: "Homem · Business",
        productName: "Atelier",
        productLine: "by Eyegis",
        productDesc: "Silhueta arquitetônica com filtro óptico EyegisGuard™ — elegância discreta para reuniões e trabalho em tela.",
        summary: "Seu dia mistura telas e presença. Escolha uma armação refinada que sustente longas jornadas mantendo cores naturais em qualquer display.",
      },
      creative: {
        collection: "Mulher · Criativa",
        productName: "Solène",
        productLine: "by Eyegis",
        productDesc: "Perfil feminino esculpido com filtro EyegisGuard™ — projetada para proteger o foco sem apagar as cores.",
        summary: "Seu trabalho depende de fidelidade de cor e longas sessões visuais. Procure uma armação que filtre luz de alta energia sem alterar os tons na tela.",
      },
      student: {
        collection: "Kids & Teens",
        productName: "Marais",
        productLine: "by Eyegis",
        productDesc: "Uma armação jovem com o mesmo filtro EyegisGuard™ de nível óptico — pensada para horas de estudo.",
        summary: "As horas de estudo somam rápido. Escolha uma armação leve e resistente que apoie o foco na leitura e nas telas.",
      },
      default: {
        collection: "Mulher · Todo dia",
        productName: "Solène",
        productLine: "by Eyegis",
        productDesc: "Elegância diária com filtro de luz azul EyegisGuard™ e cores fiéis à realidade.",
        summary: "Sua rotina mistura trabalho, viagens e tempo pessoal em frente a telas. Uma armação versátil com filtro óptico premium acompanha cada parte do dia.",
      },
    },
  },
  FR: {
    badge: "Digital Eye Score™",
    heroLine1: "Vos habitudes numériques",
    heroLine2: "sont-elles saines ?",
    intro:
      "Découvrez votre Digital Eye Score en moins d'une minute. Répondez à quelques questions sur votre exposition quotidienne aux écrans et recevez une recommandation personnalisée.",
    disclaimer:
      "Ce n'est pas un diagnostic médical. Une évaluation de mode de vie pour guider votre choix de lunettes.",
    progressLabel: "Digital Eye Score™ · Évaluation",
    continue: "Continuer",
    previous: "← Précédent",
    underMinute: "Moins de 60 secondes",
    questions: {
      exposure: {
        eyebrow: "Question 01 · Exposition",
        title: "Combien d'heures passez-vous devant un écran chaque jour ?",
        options: { e1: "Moins de 2", e2: "2 – 4", e3: "4 – 6", e4: "6 – 8", e5: "Plus de 8" },
      },
      devices: {
        eyebrow: "Question 02 · Appareils",
        title: "Quels appareils utilisez-vous le plus ?",
        hint: "Sélectionnez tout ce qui s'applique",
        options: { laptop: "Ordinateur portable", desktop: "Ordinateur de bureau", phone: "Téléphone", tablet: "Tablette", console: "Console de jeu", multi: "Plusieurs appareils" },
      },
      lifestyle: {
        eyebrow: "Question 03 · Mode de vie",
        title: "Qu'est-ce qui décrit le mieux votre mode de vie ?",
        options: { creative: "Créatif professionnel", business: "Professionnel d'affaires", student: "Étudiant", gamer: "Gamer", remote: "Télétravail", nomad: "Nomade numérique" },
      },
      symptoms: {
        eyebrow: "Question 04 · Symptômes",
        title: "Ressentez-vous souvent l'un de ces symptômes ?",
        hint: "Sélectionnez tout ce qui s'applique",
        options: { fatigue: "Fatigue oculaire", dry: "Yeux secs", headache: "Maux de tête", focus: "Difficulté à se concentrer", none: "Aucun de ces symptômes" },
      },
      night: {
        eyebrow: "Question 05 · Usage nocturne",
        title: "À quelle fréquence travaillez-vous ou étudiez-vous la nuit ?",
        options: { rarely: "Rarement", sometimes: "Parfois", frequently: "Souvent", every: "Tous les jours" },
      },
      priority: {
        eyebrow: "Question 06 · Priorités",
        title: "Qu'est-ce qui compte le plus pour vous ?",
        options: { comfort: "Confort", style: "Style", productivity: "Productivité", gaming: "Jeu", reading: "Lecture", wellness: "Bien-être visuel" },
      },
    },
    resultEyebrow: "Votre résultat",
    resultTitle: "Votre Digital Eye Score",
    score: "Digital Eye Score",
    outOf: "/ 100",
    recEyebrowPrefix: "Collection recommandée ·",
    learnMore: "En savoir plus",
    buyOnAmazon: "Acheter sur Amazon",
    tagEyegisGuard: "EyegisGuard™",
    tagComfort: "Essai confort 60 jours",
    tipsEyebrow: "Conseils personnalisés",
    tipsTitle: "De petites habitudes, un vrai confort.",
    tips: [
      "Faites une pause visuelle de 20 secondes toutes les 20 minutes.",
      "Clignez volontairement des yeux quand vous êtes très concentré.",
      "Adaptez la lumière ambiante à la luminosité de votre écran.",
      "Gardez votre écran à environ une longueur de bras.",
      "Portez un filtre optique premium pour les sessions prolongées.",
      "Terminez la journée avec une lumière douce une heure avant le coucher.",
    ],
    finalEyebrow: "Digital Eye Score™",
    finalLine1: "Prêt à vivre une vie numérique",
    finalLine2: "plus confortable ?",
    ctaShop: "Acheter sur Amazon",
    ctaExplore: "Découvrir la Collection",
    ctaLearn: "En savoir plus sur EyegisGuard™",
    retake: "↺ Recommencer l'évaluation",
    recommendations: {
      gamer: {
        collection: "Homme · Gaming",
        productName: "Meridian",
        productLine: "by Eyegis",
        productDesc: "Monture TR90 légère, conçue pour de longues sessions devant l'écran sans fatigue visuelle.",
        summary: "Votre routine comprend de longues sessions concentrées devant l'écran. Privilégiez une monture légère avec un filtre lumière bleue premium pour rester confortable.",
      },
      business: {
        collection: "Homme · Business",
        productName: "Atelier",
        productLine: "by Eyegis",
        productDesc: "Silhouette architecturale avec filtre optique EyegisGuard™ — élégance discrète pour les réunions comme pour le travail sur écran.",
        summary: "Votre journée mêle écrans et présence. Choisissez une monture raffinée qui accompagne les longues heures de travail tout en préservant les couleurs.",
      },
      creative: {
        collection: "Femme · Créative",
        productName: "Solène",
        productLine: "by Eyegis",
        productDesc: "Un profil féminin sculpté avec le filtre EyegisGuard™ — pensé pour protéger la concentration sans ternir les couleurs.",
        summary: "Votre travail dépend de la fidélité des couleurs et de longues sessions visuelles. Cherchez une monture qui filtre la lumière à haute énergie sans altérer les tons.",
      },
      student: {
        collection: "Enfants & Ados",
        productName: "Marais",
        productLine: "by Eyegis",
        productDesc: "Une monture jeune avec le même filtre optique EyegisGuard™ — pensée pour les heures d'étude et le quotidien.",
        summary: "Les heures d'étude s'additionnent vite. Choisissez une monture légère et résistante qui soutient la concentration en lecture comme devant l'écran.",
      },
      default: {
        collection: "Femme · Quotidien",
        productName: "Solène",
        productLine: "by Eyegis",
        productDesc: "Élégance au quotidien avec le filtre lumière bleue EyegisGuard™ et des couleurs fidèles à la réalité.",
        summary: "Votre routine mêle travail, voyages et temps personnel devant les écrans. Une monture polyvalente avec filtre optique premium accompagne chaque partie de la journée.",
      },
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Recommendation engine                                             */
/* ------------------------------------------------------------------ */

function recKey(answers: string[][]): keyof Copy["recommendations"] {
  const lifestyle = answers[2]?.[0] ?? "";
  const priority = answers[5]?.[0] ?? "";
  const devices = answers[1] ?? [];

  if (lifestyle === "gamer" || devices.includes("console")) return "gamer";
  if (lifestyle === "business" || priority === "productivity") return "business";
  if (lifestyle === "creative" || priority === "style") return "creative";
  if (lifestyle === "student") return "student";
  return "default";
}

const REC_IMAGES: Record<keyof Copy["recommendations"], string> = {
  gamer: meridianHero,
  business: atelierFront,
  creative: soleneFront,
  student: maraisFront,
  default: soleneFront,
};

function calcScore(answers: string[][]): number {
  let s = 30;
  answers.forEach((set, qi) => {
    const q = QUESTIONS_META[qi];
    set.forEach((key) => {
      const opt = q.options.find((o) => o.key === key);
      if (opt) s += opt.weight;
    });
  });
  return Math.max(20, Math.min(98, Math.round(s)));
}

/* ------------------------------------------------------------------ */
/*  UI                                                                */
/* ------------------------------------------------------------------ */

function Progress({ step, total, label }: { step: number; total: number; label: string }) {
  const pct = Math.min(100, (step / total) * 100);
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between font-eyebrow text-[10px] text-ink/55">
        <span>{label}</span>
        <span>
          {String(Math.min(step, total)).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-3 h-px w-full overflow-hidden bg-ink/10">
        <div
          className="h-full bg-teal transition-[width] duration-[900ms] ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function QuestionCard({
  qMeta,
  qCopy,
  selected,
  onSelect,
  onNext,
  continueLabel,
}: {
  qMeta: QuestionMeta;
  qCopy: QCopy;
  selected: string[];
  onSelect: (key: string) => void;
  onNext: () => void;
  continueLabel: string;
}) {
  return (
    <div key={qMeta.key} className="animate-[fadeUp_700ms_cubic-bezier(0.22,1,0.36,1)_both]">
      <span className="font-eyebrow text-teal">{qCopy.eyebrow}</span>
      <h3 className="mt-6 font-editorial text-ink text-3xl md:text-5xl leading-[1.02] text-balance-tight">
        {qCopy.title}
      </h3>
      {qCopy.hint && (
        <p className="mt-4 font-eyebrow text-[10px] text-ink/50">{qCopy.hint}</p>
      )}

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {qMeta.options.map((opt) => {
          const active = selected.includes(opt.key);
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onSelect(opt.key)}
              className={`group flex items-center justify-between gap-4 rounded-xl border px-6 py-5 text-left transition-all duration-500 ${
                active
                  ? "border-teal bg-teal text-paper shadow-[0_20px_60px_-30px_rgba(0,75,87,0.45)]"
                  : "border-ink/12 bg-paper/60 backdrop-blur-sm text-ink hover:border-ink/30 hover:-translate-y-0.5"
              }`}
            >
              <span className="font-editorial text-lg md:text-xl">{qCopy.options[opt.key]}</span>
              <span
                aria-hidden="true"
                className={`grid h-8 w-8 place-items-center rounded-full border transition-colors ${
                  active
                    ? "border-paper/40 bg-paper/10 text-paper"
                    : "border-ink/20 text-ink/50 group-hover:text-ink"
                }`}
              >
                {active ? "✓" : "→"}
              </span>
            </button>
          );
        })}
      </div>

      {qMeta.multi && (
        <div className="mt-10 flex justify-end">
          <button
            type="button"
            onClick={onNext}
            disabled={selected.length === 0}
            className="inline-flex items-center gap-4 rounded-full bg-ink px-7 py-4 font-eyebrow text-paper transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-30 hover:-translate-y-0.5"
          >
            {continueLabel}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  );
}

function CircularScore({ score, label, outOf }: { score: number; label: string; outOf: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * score));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const size = 280;
  const stroke = 2;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (display / 100) * c;

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(134,217,209,0.35), transparent 65%)",
        }}
      />
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="currentColor" className="text-ink/10" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="currentColor"
          className="text-teal"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-eyebrow text-[10px] text-teal">{label}</span>
        <span className="mt-2 font-editorial text-ink text-[88px] leading-none tabular-nums">
          {display}
        </span>
        <span className="mt-1 font-eyebrow text-[10px] text-ink/50">{outOf}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */

export function DigitalEyeScore() {
  const { lang } = useI18n();
  const copy = COPY[lang];
  const { ref, shown } = useReveal<HTMLDivElement>();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[][]>(() => QUESTIONS_META.map(() => []));
  const [done, setDone] = useState(false);

  const total = QUESTIONS_META.length;
  const qMeta = QUESTIONS_META[step];
  const qCopy = copy.questions[qMeta.key];

  const handleSelect = (key: string) => {
    setAnswers((prev) => {
      const next = prev.map((a) => a.slice());
      if (qMeta.multi) {
        const set = new Set(next[step]);
        if (set.has(key)) set.delete(key);
        else set.add(key);
        next[step] = Array.from(set);
      } else {
        next[step] = [key];
      }
      return next;
    });
    if (!qMeta.multi) {
      window.setTimeout(() => advance(), 320);
    }
  };

  const advance = () => {
    if (step < total - 1) setStep((s) => s + 1);
    else setDone(true);
  };

  const back = () => {
    if (done) setDone(false);
    else if (step > 0) setStep((s) => s - 1);
  };

  const score = useMemo(() => calcScore(answers), [answers]);
  const rKey = useMemo(() => recKey(answers), [answers]);
  const rec = copy.recommendations[rKey];
  const recImage = REC_IMAGES[rKey];

  const reset = () => {
    setAnswers(QUESTIONS_META.map(() => []));
    setStep(0);
    setDone(false);
  };

  return (
    <section
      id="digital-eye-score"
      ref={ref}
      className={`relative bg-paper-warm py-28 md:py-40 transition-opacity duration-1000 ${
        shown ? "opacity-100" : "opacity-0"
      }`}
    >
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_10%,rgba(134,217,209,0.15),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-[900px] px-6 md:px-10">
        <div className="text-center">
          <span className="font-eyebrow text-teal">{copy.badge}</span>
          <h2 className="mt-6 font-editorial text-ink text-4xl md:text-6xl lg:text-7xl leading-[0.95]">
            {copy.heroLine1}
            <span className="block italic text-teal">{copy.heroLine2}</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl font-light text-lg leading-relaxed text-ink/70">
            {copy.intro}
          </p>
          <p className="mx-auto mt-4 max-w-md font-eyebrow text-[10px] text-ink/45">
            {copy.disclaimer}
          </p>
        </div>

        <div className="mt-16 rounded-2xl border border-ink/10 bg-paper/70 backdrop-blur-xl p-8 md:p-14 shadow-[0_40px_120px_-60px_rgba(0,56,66,0.35)]">
          {!done ? (
            <>
              <Progress step={step + 1} total={total} label={copy.progressLabel} />
              <div className="mt-12">
                <QuestionCard
                  qMeta={qMeta}
                  qCopy={qCopy}
                  selected={answers[step]}
                  onSelect={handleSelect}
                  onNext={advance}
                  continueLabel={copy.continue}
                />
              </div>

              <div className="mt-12 flex items-center justify-between">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="font-eyebrow text-ink/55 hover:text-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {copy.previous}
                </button>
                <span className="font-eyebrow text-[10px] text-ink/40">
                  {copy.underMinute}
                </span>
              </div>
            </>
          ) : (
            <Results
              score={score}
              rec={rec}
              recImage={recImage}
              onReset={reset}
              copy={copy}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function Results({
  score,
  rec,
  recImage,
  onReset,
  copy,
}: {
  score: number;
  rec: RecCopy;
  recImage: string;
  onReset: () => void;
  copy: Copy;
}) {
  return (
    <div className="animate-[fadeUp_800ms_cubic-bezier(0.22,1,0.36,1)_both]">
      <div className="text-center">
        <span className="font-eyebrow text-teal">{copy.resultEyebrow}</span>
        <h3 className="mt-4 font-editorial text-ink text-3xl md:text-4xl leading-tight">
          {copy.resultTitle}
        </h3>
      </div>

      <div className="mt-12 flex justify-center">
        <CircularScore score={score} label={copy.score} outOf={copy.outOf} />
      </div>

      <p className="mx-auto mt-12 max-w-xl text-center font-light text-lg leading-relaxed text-ink/75">
        {rec.summary}
      </p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-8 rounded-xl border border-ink/10 bg-paper p-6 md:p-8">
        <div className="md:col-span-2 relative overflow-hidden rounded-lg bg-paper-warm">
          <img
            src={recImage}
            alt={`${rec.productName} — recommended Eyegis eyewear based on your Digital Eye Score`}
            width={1200}
            height={1500}
            className="h-full w-full object-cover"
            style={{ animation: "floaty 6s ease-in-out infinite" }}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="md:col-span-3 flex flex-col justify-center">
          <span className="font-eyebrow text-teal">
            {copy.recEyebrowPrefix} {rec.collection}
          </span>
          <h4 className="mt-4 font-editorial text-ink text-3xl md:text-4xl leading-tight">
            {rec.productName}
            <span className="italic text-teal"> {rec.productLine}</span>
          </h4>
          <p className="mt-4 font-light text-ink/70 leading-relaxed max-w-md">
            {rec.productDesc}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-teal/30 bg-teal/5 px-3 py-1 font-eyebrow text-[10px] text-teal">
              {copy.tagEyegisGuard}
            </span>
            <span className="rounded-full border border-ink/15 px-3 py-1 font-eyebrow text-[10px] text-ink/70">
              {copy.tagComfort}
            </span>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="https://www.amazon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-between gap-4 rounded-full bg-teal px-6 py-4 text-paper hover:bg-teal-deep hover:-translate-y-0.5 transition-all duration-500"
            >
              <span className="font-eyebrow">{copy.buyOnAmazon}</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="/product/meridian"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-ink/20 px-6 py-4 font-eyebrow text-ink hover:bg-ink hover:text-paper transition-colors duration-500"
            >
              {copy.learnMore}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <span className="font-eyebrow text-teal">{copy.tipsEyebrow}</span>
        <h4 className="mt-4 font-editorial text-ink text-2xl md:text-3xl leading-tight">
          {copy.tipsTitle}
        </h4>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
          {copy.tips.map((t, i) => (
            <div
              key={t}
              className="flex items-start gap-4 rounded-lg border border-ink/10 bg-paper/70 backdrop-blur-sm p-5"
            >
              <span className="mt-1 font-eyebrow text-[10px] text-teal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-light text-ink/80 leading-relaxed">{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 rounded-xl bg-teal-deep px-8 py-14 md:px-14 md:py-20 text-center text-paper">
        <span className="font-eyebrow text-mint">{copy.finalEyebrow}</span>
        <h4 className="mx-auto mt-6 max-w-2xl font-editorial text-3xl md:text-5xl leading-[0.98]">
          {copy.finalLine1}
          <span className="block italic text-mint">{copy.finalLine2}</span>
        </h4>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="https://www.amazon.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-mint px-7 py-4 font-eyebrow text-teal-deep hover:-translate-y-0.5 transition-transform duration-500"
          >
            {copy.ctaShop}
          </a>
          <a
            href="/#collections"
            className="rounded-full border border-paper/25 px-7 py-4 font-eyebrow text-paper hover:bg-paper/10 transition-colors"
          >
            {copy.ctaExplore}
          </a>
          <a
            href="/#technology"
            className="rounded-full border border-paper/25 px-7 py-4 font-eyebrow text-paper hover:bg-paper/10 transition-colors"
          >
            {copy.ctaLearn}
          </a>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="mt-10 font-eyebrow text-[10px] text-paper/60 hover:text-paper transition-colors"
        >
          {copy.retake}
        </button>
      </div>
    </div>
  );
}
