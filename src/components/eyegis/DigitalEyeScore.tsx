import { useEffect, useMemo, useRef, useState } from "react";

import meridianHero from "@/assets/products/meridian-hero.jpg";
import soleneFront from "@/assets/products/solene-front.jpg";
import maraisFront from "@/assets/products/marais-front.jpg";
import atelierFront from "@/assets/products/atelier-front.jpg";

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
/*  Questions                                                         */
/* ------------------------------------------------------------------ */

type Answer = { label: string; weight: number };
type Question = {
  eyebrow: string;
  title: string;
  hint?: string;
  options: Answer[];
  multi?: boolean;
};

const QUESTIONS: Question[] = [
  {
    eyebrow: "Question 01 · Exposure",
    title: "How many hours do you spend looking at screens every day?",
    options: [
      { label: "Less than 2", weight: 20 },
      { label: "2 – 4", weight: 14 },
      { label: "4 – 6", weight: 9 },
      { label: "6 – 8", weight: 5 },
      { label: "More than 8", weight: 2 },
    ],
  },
  {
    eyebrow: "Question 02 · Devices",
    title: "Which devices do you use most often?",
    hint: "Select all that apply",
    multi: true,
    options: [
      { label: "Laptop", weight: 3 },
      { label: "Desktop", weight: 3 },
      { label: "Phone", weight: 2 },
      { label: "Tablet", weight: 2 },
      { label: "Gaming Console", weight: 2 },
      { label: "Multiple devices", weight: 1 },
    ],
  },
  {
    eyebrow: "Question 03 · Lifestyle",
    title: "What best describes your lifestyle?",
    options: [
      { label: "Creative Professional", weight: 10 },
      { label: "Business Professional", weight: 10 },
      { label: "Student", weight: 10 },
      { label: "Gamer", weight: 8 },
      { label: "Remote Worker", weight: 9 },
      { label: "Digital Nomad", weight: 9 },
    ],
  },
  {
    eyebrow: "Question 04 · Symptoms",
    title: "Do you often experience any of these?",
    hint: "Select all that apply",
    multi: true,
    options: [
      { label: "Eye fatigue", weight: -3 },
      { label: "Dry eyes", weight: -3 },
      { label: "Headaches", weight: -3 },
      { label: "Difficulty focusing", weight: -3 },
      { label: "None of the above", weight: 8 },
    ],
  },
  {
    eyebrow: "Question 05 · Night use",
    title: "How often do you work or study at night?",
    options: [
      { label: "Rarely", weight: 14 },
      { label: "Sometimes", weight: 10 },
      { label: "Frequently", weight: 5 },
      { label: "Every day", weight: 2 },
    ],
  },
  {
    eyebrow: "Question 06 · Priorities",
    title: "What matters most to you?",
    options: [
      { label: "Comfort", weight: 10 },
      { label: "Style", weight: 10 },
      { label: "Productivity", weight: 10 },
      { label: "Gaming", weight: 9 },
      { label: "Reading", weight: 10 },
      { label: "Overall eye wellness", weight: 10 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Recommendation engine                                             */
/* ------------------------------------------------------------------ */

type Recommendation = {
  collection: string;
  productName: string;
  productLine: string;
  productDesc: string;
  productImage: string;
  summary: string;
};

function recommend(answers: string[][]): Recommendation {
  const lifestyle = answers[2]?.[0] ?? "";
  const priority = answers[5]?.[0] ?? "";
  const devices = answers[1] ?? [];

  // simple mapping
  if (lifestyle === "Gamer" || devices.includes("Gaming Console")) {
    return {
      collection: "Men · Gaming",
      productName: "Meridian",
      productLine: "by Eyegis",
      productDesc:
        "TR90 lightweight frame engineered for long sessions in front of the screen without visual fatigue.",
      productImage: meridianHero,
      summary:
        "Your routine involves extended focused sessions in front of the screen. Prioritize a lightweight frame with premium blue-light filtering to stay comfortable for hours.",
    };
  }
  if (lifestyle === "Business Professional" || priority === "Productivity") {
    return {
      collection: "Men · Business",
      productName: "Atelier",
      productLine: "by Eyegis",
      productDesc:
        "Architectural silhouette with EyegisGuard™ optical filter — quiet elegance for meetings and screen work alike.",
      productImage: atelierFront,
      summary:
        "Your day balances screens and presence. Choose a refined frame that supports long working hours while keeping natural color perception on every display.",
    };
  }
  if (lifestyle === "Creative Professional" || priority === "Style") {
    return {
      collection: "Women · Creative",
      productName: "Solène",
      productLine: "by Eyegis",
      productDesc:
        "A sculpted feminine profile with EyegisGuard™ filtering — designed to protect focus without dulling color.",
      productImage: soleneFront,
      summary:
        "Your work depends on color accuracy and long visual sessions. Look for a frame that filters high-energy light without shifting tones on screen.",
    };
  }
  if (lifestyle === "Student") {
    return {
      collection: "Kids & Teens",
      productName: "Marais",
      productLine: "by Eyegis",
      productDesc:
        "A youthful frame with the same optical-grade EyegisGuard™ filter — built for study hours and everyday wear.",
      productImage: maraisFront,
      summary:
        "Study hours quickly add up. Choose a light, resilient frame that supports focus during reading and screen sessions.",
    };
  }
  // default
  return {
    collection: "Women · Everyday",
    productName: "Solène",
    productLine: "by Eyegis",
    productDesc:
      "Everyday elegance with EyegisGuard™ blue-light filtering and true-to-life colors.",
    productImage: soleneFront,
    summary:
      "Your routine mixes work, travel and personal time in front of screens. A versatile frame with premium optical filtering fits every part of your day.",
  };
}

function calcScore(answers: string[][]): number {
  let s = 30; // baseline
  answers.forEach((set, qi) => {
    const q = QUESTIONS[qi];
    set.forEach((label) => {
      const opt = q.options.find((o) => o.label === label);
      if (opt) s += opt.weight;
    });
  });
  // Clamp 20-98
  return Math.max(20, Math.min(98, Math.round(s)));
}

const TIPS = [
  "Take a 20-second visual break every 20 minutes.",
  "Blink deliberately when your screen focus deepens.",
  "Match ambient lighting to your screen's brightness.",
  "Keep your screen roughly one arm's length away.",
  "Wear premium optical filtering for extended sessions.",
  "End the day with softer lighting an hour before sleep.",
];

/* ------------------------------------------------------------------ */
/*  UI                                                                */
/* ------------------------------------------------------------------ */

function Progress({ step, total }: { step: number; total: number }) {
  const pct = Math.min(100, ((step) / total) * 100);
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between font-eyebrow text-[10px] text-ink/55">
        <span>Digital Eye Score™ · Assessment</span>
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
  q,
  selected,
  onSelect,
  onNext,
}: {
  q: Question;
  selected: string[];
  onSelect: (label: string) => void;
  onNext: () => void;
}) {
  return (
    <div key={q.title} className="animate-[fadeUp_700ms_cubic-bezier(0.22,1,0.36,1)_both]">
      <span className="font-eyebrow text-teal">{q.eyebrow}</span>
      <h3 className="mt-6 font-editorial text-ink text-3xl md:text-5xl leading-[1.02] text-balance-tight">
        {q.title}
      </h3>
      {q.hint && (
        <p className="mt-4 font-eyebrow text-[10px] text-ink/50">{q.hint}</p>
      )}

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {q.options.map((opt) => {
          const active = selected.includes(opt.label);
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => onSelect(opt.label)}
              className={`group flex items-center justify-between gap-4 rounded-xl border px-6 py-5 text-left transition-all duration-500 ${
                active
                  ? "border-teal bg-teal text-paper shadow-[0_20px_60px_-30px_rgba(0,75,87,0.45)]"
                  : "border-ink/12 bg-paper/60 backdrop-blur-sm text-ink hover:border-ink/30 hover:-translate-y-0.5"
              }`}
            >
              <span className="font-editorial text-lg md:text-xl">{opt.label}</span>
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

      {q.multi && (
        <div className="mt-10 flex justify-end">
          <button
            type="button"
            onClick={onNext}
            disabled={selected.length === 0}
            className="inline-flex items-center gap-4 rounded-full bg-ink px-7 py-4 font-eyebrow text-paper transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-30 hover:-translate-y-0.5"
          >
            Continue
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  );
}

function CircularScore({ score }: { score: number }) {
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
      {/* soft glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(134,217,209,0.35), transparent 65%)",
        }}
      />
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="currentColor"
          className="text-ink/10"
          strokeWidth={stroke}
          fill="none"
        />
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
        <span className="font-eyebrow text-[10px] text-teal">Digital Eye Score</span>
        <span className="mt-2 font-editorial text-ink text-[88px] leading-none tabular-nums">
          {display}
        </span>
        <span className="mt-1 font-eyebrow text-[10px] text-ink/50">/ 100</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */

export function DigitalEyeScore() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const [step, setStep] = useState(0); // 0..QUESTIONS.length-1, then results
  const [answers, setAnswers] = useState<string[][]>(() =>
    QUESTIONS.map(() => [])
  );
  const [done, setDone] = useState(false);

  const total = QUESTIONS.length;
  const q = QUESTIONS[step];

  const handleSelect = (label: string) => {
    setAnswers((prev) => {
      const next = prev.map((a) => a.slice());
      if (q.multi) {
        const set = new Set(next[step]);
        if (set.has(label)) set.delete(label);
        else set.add(label);
        next[step] = Array.from(set);
      } else {
        next[step] = [label];
      }
      return next;
    });
    if (!q.multi) {
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
  const rec = useMemo(() => recommend(answers), [answers]);

  const reset = () => {
    setAnswers(QUESTIONS.map(() => []));
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

      {/* subtle backdrop wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_10%,rgba(134,217,209,0.15),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-[900px] px-6 md:px-10">
        {/* Header */}
        <div className="text-center">
          <span className="font-eyebrow text-teal">Digital Eye Score™</span>
          <h2 className="mt-6 font-editorial text-ink text-4xl md:text-6xl lg:text-7xl leading-[0.95]">
            How healthy are your
            <span className="block italic text-teal">digital habits?</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl font-light text-lg leading-relaxed text-ink/70">
            Discover your Digital Eye Score in less than a minute. Answer a few
            questions about your daily screen exposure and receive a
            personalized recommendation.
          </p>
          <p className="mx-auto mt-4 max-w-md font-eyebrow text-[10px] text-ink/45">
            Not a medical diagnosis. A lifestyle assessment designed to guide
            your choice of eyewear.
          </p>
        </div>

        {/* Card */}
        <div className="mt-16 rounded-2xl border border-ink/10 bg-paper/70 backdrop-blur-xl p-8 md:p-14 shadow-[0_40px_120px_-60px_rgba(0,56,66,0.35)]">
          {!done ? (
            <>
              <Progress step={step + 1} total={total} />
              <div className="mt-12">
                <QuestionCard
                  q={q}
                  selected={answers[step]}
                  onSelect={handleSelect}
                  onNext={advance}
                />
              </div>

              <div className="mt-12 flex items-center justify-between">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="font-eyebrow text-ink/55 hover:text-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <span className="font-eyebrow text-[10px] text-ink/40">
                  Less than 60 seconds
                </span>
              </div>
            </>
          ) : (
            <Results score={score} rec={rec} onReset={reset} />
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Results                                                           */
/* ------------------------------------------------------------------ */

function Results({
  score,
  rec,
  onReset,
}: {
  score: number;
  rec: Recommendation;
  onReset: () => void;
}) {
  return (
    <div className="animate-[fadeUp_800ms_cubic-bezier(0.22,1,0.36,1)_both]">
      <div className="text-center">
        <span className="font-eyebrow text-teal">Your result</span>
        <h3 className="mt-4 font-editorial text-ink text-3xl md:text-4xl leading-tight">
          Your Digital Eye Score
        </h3>
      </div>

      <div className="mt-12 flex justify-center">
        <CircularScore score={score} />
      </div>

      <p className="mx-auto mt-12 max-w-xl text-center font-light text-lg leading-relaxed text-ink/75">
        {rec.summary}
      </p>

      {/* Recommendation card */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-8 rounded-xl border border-ink/10 bg-paper p-6 md:p-8">
        <div className="md:col-span-2 relative overflow-hidden rounded-lg bg-paper-warm">
          <img
            src={rec.productImage}
            alt={`${rec.productName} — recommended by Eyegis`}
            className="h-full w-full object-cover"
            style={{ animation: "floaty 6s ease-in-out infinite" }}
            loading="lazy"
          />
        </div>
        <div className="md:col-span-3 flex flex-col justify-center">
          <span className="font-eyebrow text-teal">
            Recommended Collection · {rec.collection}
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
              EyegisGuard™
            </span>
            <span className="rounded-full border border-ink/15 px-3 py-1 font-eyebrow text-[10px] text-ink/70">
              60-Day Comfort
            </span>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="https://www.amazon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-between gap-4 rounded-full bg-teal px-6 py-4 text-paper hover:bg-teal-deep hover:-translate-y-0.5 transition-all duration-500"
            >
              <span className="font-eyebrow">Buy on Amazon</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="/product/meridian"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-ink/20 px-6 py-4 font-eyebrow text-ink hover:bg-ink hover:text-paper transition-colors duration-500"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-16">
        <span className="font-eyebrow text-teal">Personalized tips</span>
        <h4 className="mt-4 font-editorial text-ink text-2xl md:text-3xl leading-tight">
          Small habits, meaningful comfort.
        </h4>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
          {TIPS.map((t, i) => (
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

      {/* Final CTA */}
      <div className="mt-20 rounded-xl bg-teal-deep px-8 py-14 md:px-14 md:py-20 text-center text-paper">
        <span className="font-eyebrow text-mint">Digital Eye Score™</span>
        <h4 className="mx-auto mt-6 max-w-2xl font-editorial text-3xl md:text-5xl leading-[0.98]">
          Ready to experience a more comfortable
          <span className="block italic text-mint">digital life?</span>
        </h4>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="https://www.amazon.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-mint px-7 py-4 font-eyebrow text-teal-deep hover:-translate-y-0.5 transition-transform duration-500"
          >
            Buy on Amazon
          </a>
          <a
            href="#collections"
            className="rounded-full border border-paper/25 px-7 py-4 font-eyebrow text-paper hover:bg-paper/10 transition-colors"
          >
            Explore Collection
          </a>
          <a
            href="#technology"
            className="rounded-full border border-paper/25 px-7 py-4 font-eyebrow text-paper hover:bg-paper/10 transition-colors"
          >
            Learn About EyegisGuard™
          </a>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="mt-10 font-eyebrow text-[10px] text-paper/60 hover:text-paper transition-colors"
        >
          ↺ Retake the assessment
        </button>
      </div>
    </div>
  );
}
