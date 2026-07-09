import { useEffect, useRef, useState } from "react";

import lifeBusiness from "@/assets/life-business.jpg";
import lifeCreative from "@/assets/life-creative.jpg";
import lifeGaming from "@/assets/life-gaming.jpg";
import lifeStudent from "@/assets/life-student.jpg";
import lifeTravel from "@/assets/life-travel.jpg";
import lifestyleArch from "@/assets/lifestyle-architecture.jpg";
import lifestyleWork from "@/assets/lifestyle-work.jpg";
import lifestyleTravel from "@/assets/lifestyle-travel.jpg";
import portrait from "@/assets/universe-portrait.jpg";
import guardBusiness from "@/assets/guard-life-business.jpg";
import guardCreative from "@/assets/guard-life-creative.jpg";
import guardStudent from "@/assets/guard-life-student.jpg";
import guardGamer from "@/assets/guard-life-gamer.jpg";

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
/*  Gallery data                                                      */
/* ------------------------------------------------------------------ */

type Shot = {
  src: string;
  alt: string;
  caption: string;
  collection: string;
  product: string;
  span: string; // grid class
};

const SHOTS: Shot[] = [
  {
    src: lifeCreative,
    alt: "Creative studio · natural light",
    caption: "The studio at 4pm",
    collection: "Women · Creative",
    product: "Solène",
    span: "md:col-span-6 md:row-span-2 aspect-[4/5]",
  },
  {
    src: lifeBusiness,
    alt: "Business meeting in modern glass office",
    caption: "Between meetings",
    collection: "Men · Business",
    product: "Atelier",
    span: "md:col-span-3 aspect-[4/5]",
  },
  {
    src: lifestyleArch,
    alt: "Architectural interior with soft daylight",
    caption: "Concrete, glass, silence",
    collection: "Men · Everyday",
    product: "Meridian",
    span: "md:col-span-3 aspect-square",
  },
  {
    src: lifeStudent,
    alt: "Student reading with EyegisGuard glasses",
    caption: "Long reading hours",
    collection: "Kids & Teens",
    product: "Marais",
    span: "md:col-span-3 aspect-square",
  },
  {
    src: guardCreative,
    alt: "Photographer editing on laptop",
    caption: "Editing until midnight",
    collection: "Women · Creative",
    product: "Solène",
    span: "md:col-span-3 aspect-[4/5]",
  },
  {
    src: lifeTravel,
    alt: "Traveler in a train carriage at dusk",
    caption: "En route to Lisbon",
    collection: "Men · Everyday",
    product: "Meridian",
    span: "md:col-span-6 md:row-span-2 aspect-[16/11]",
  },
  {
    src: guardBusiness,
    alt: "Founder at standing desk",
    caption: "Morning deep-work",
    collection: "Men · Business",
    product: "Atelier",
    span: "md:col-span-3 aspect-[4/5]",
  },
  {
    src: guardGamer,
    alt: "Late night gaming session in ambient light",
    caption: "Session #47",
    collection: "Men · Gaming",
    product: "Meridian",
    span: "md:col-span-3 aspect-square",
  },
  {
    src: lifeGaming,
    alt: "Streamer setup with warm lighting",
    caption: "On stream",
    collection: "Men · Gaming",
    product: "Meridian",
    span: "md:col-span-3 aspect-square",
  },
  {
    src: lifestyleWork,
    alt: "Remote worker in a bright kitchen",
    caption: "Kitchen table office",
    collection: "Women · Everyday",
    product: "Solène",
    span: "md:col-span-3 aspect-[4/5]",
  },
  {
    src: lifestyleTravel,
    alt: "Airport terminal at golden hour",
    caption: "Gate B24 · 06:41",
    collection: "Men · Business",
    product: "Atelier",
    span: "md:col-span-3 aspect-[4/5]",
  },
  {
    src: portrait,
    alt: "Portrait of an Eyegis wearer",
    caption: "Off-duty",
    collection: "Women · Creative",
    product: "Solène",
    span: "md:col-span-6 aspect-[16/9]",
  },
];

/* ------------------------------------------------------------------ */
/*  Testimonials                                                      */
/* ------------------------------------------------------------------ */

type Testimonial = {
  name: string;
  role: string;
  country: string;
  rating: number;
  quote: string;
  portrait: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Camille",
    role: "Architect",
    country: "Paris, France",
    rating: 5,
    quote:
      "The frame is barely there. After ten hours in front of drawings, I still feel calm and focused.",
    portrait: lifeCreative,
  },
  {
    name: "Andrés",
    role: "Software Engineer",
    country: "São Paulo, Brazil",
    rating: 5,
    quote:
      "Colors on my screen stay accurate — my design work looks the same before and after wearing them.",
    portrait: guardBusiness,
  },
  {
    name: "Naomi",
    role: "Photographer",
    country: "Tokyo, Japan",
    rating: 5,
    quote:
      "I need true tones when I retouch. Eyegis is the first pair I trust for late-night editing sessions.",
    portrait: guardCreative,
  },
  {
    name: "Léa",
    role: "Financial Analyst",
    country: "Zurich, Switzerland",
    rating: 5,
    quote:
      "Elegant enough for the office, comfortable enough for the flight home. That's the whole story.",
    portrait: lifestyleTravel,
  },
  {
    name: "Miguel",
    role: "Graphic Designer",
    country: "Lisbon, Portugal",
    rating: 5,
    quote:
      "I forgot the amber tint I dreaded. Everything looks natural, my eyes just feel less tired.",
    portrait: guardStudent,
  },
  {
    name: "Priya",
    role: "Content Creator",
    country: "London, United Kingdom",
    rating: 5,
    quote:
      "Comfort I actually notice — plus a frame my audience keeps asking me about.",
    portrait: portrait,
  },
];

/* ------------------------------------------------------------------ */
/*  Stats                                                             */
/* ------------------------------------------------------------------ */

type Stat = {
  target: string;
  label: string;
  isNumber?: boolean;
  value?: number;
  suffix?: string;
};

const STATS: Stat[] = [
  { target: "100,000+", label: "Happy Customers", isNumber: true, value: 100000, suffix: "+" },
  { target: "4.9★", label: "Average Rating" },
  { target: "2-Year", label: "International Warranty" },
  { target: "60-Day", label: "Comfort Guarantee" },
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

function StatBlock({ stat }: { stat: Stat }) {
  const { ref, shown } = useReveal<HTMLDivElement>(0.4);
  const count = useCount(stat.value ?? 0, shown && !!stat.isNumber);
  const display = stat.isNumber
    ? `${count.toLocaleString("en-US")}${stat.suffix ?? ""}`
    : stat.target;
  return (
    <div ref={ref} className="border-t border-ink/10 pt-6">
      <div className="font-editorial text-ink text-5xl md:text-6xl leading-none tabular-nums">
        {display}
      </div>
      <div className="mt-4 font-eyebrow text-[10px] text-ink/55">{stat.label}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Lightbox                                                          */
/* ------------------------------------------------------------------ */

function Lightbox({ shot, onClose }: { shot: Shot; onClose: () => void }) {
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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 backdrop-blur-2xl px-4 py-6 animate-[fadeIn_400ms_ease-out_both]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        aria-label="Close"
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
          <div className="relative overflow-hidden rounded-md bg-ink">
            <img
              src={shot.src}
              alt={shot.alt}
              className="h-full max-h-[78vh] w-full object-cover animate-[zoomIn_800ms_cubic-bezier(0.22,1,0.36,1)_both]"
            />
          </div>
        </div>
        <div className="lg:col-span-2 flex flex-col justify-center text-paper">
          <span className="font-eyebrow text-mint">{shot.collection}</span>
          <h4 className="mt-4 font-editorial text-4xl md:text-5xl leading-[0.98]">
            {shot.product}
            <span className="block italic text-mint">by Eyegis</span>
          </h4>
          <p className="mt-6 font-light text-paper/75 leading-relaxed max-w-md">
            {shot.caption} — captured in an unretouched moment of everyday
            wear. EyegisGuard™ optical filter, TR90 frame, natural color
            perception.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="https://www.amazon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-6 rounded-full bg-mint px-6 py-4 text-teal-deep hover:-translate-y-0.5 transition-all duration-500"
            >
              <span className="font-eyebrow">Buy on Amazon</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="/product/meridian"
              className="inline-flex items-center justify-center rounded-full border border-paper/25 px-6 py-4 font-eyebrow text-paper hover:bg-paper/10 transition-colors"
            >
              Product Details
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
/*  World map (SVG, minimal dots)                                     */
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
      <svg
        viewBox="0 0 960 480"
        className="w-full h-auto text-ink/25"
        aria-hidden="true"
      >
        {/* subtle grid: horizontal latitude lines */}
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            x2="960"
            y1={80 + i * 60}
            y2={80 + i * 60}
            stroke="currentColor"
            strokeWidth="0.4"
            strokeDasharray="2 6"
          />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={`v${i}`}
            y1="40"
            y2="440"
            x1={40 + i * 88}
            x2={40 + i * 88}
            stroke="currentColor"
            strokeWidth="0.4"
            strokeDasharray="2 6"
          />
        ))}

        {/* simplified landmass silhouettes */}
        <g fill="currentColor" opacity="0.14">
          {/* North America */}
          <path d="M120,120 C160,110 220,105 260,120 C300,140 285,180 260,205 C230,235 210,255 175,245 C140,235 115,200 110,170 Z" />
          {/* South America */}
          <path d="M300,275 C325,270 355,285 355,320 C355,360 335,385 315,395 C295,400 285,375 285,340 C285,310 290,285 300,275 Z" />
          {/* Europe */}
          <path d="M470,150 C495,140 520,145 530,165 C540,190 520,205 500,210 C475,215 465,190 465,175 Z" />
          {/* Africa */}
          <path d="M500,220 C525,215 555,230 555,265 C555,305 530,335 510,340 C490,340 480,315 480,280 C480,250 490,225 500,220 Z" />
          {/* Middle East / Asia core */}
          <path d="M570,180 C620,170 700,175 745,195 C780,215 785,245 750,255 C700,265 640,255 605,240 C580,225 565,205 570,180 Z" />
          {/* East Asia */}
          <path d="M760,175 C795,170 830,185 835,210 C835,235 810,245 785,240 C760,235 750,215 750,195 Z" />
          {/* Australia */}
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
/*  Signals strip                                                     */
/* ------------------------------------------------------------------ */

const SIGNALS = [
  "Amazon",
  "CE Certified",
  "Premium Optical Standards",
  "TR90 Technology",
  "2-Year Warranty",
  "Worldwide Shipping",
];

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */

function StarRow({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-0.5 text-teal" aria-label={`${n} out of 5 stars`}>
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

export function SocialProof() {
  const [open, setOpen] = useState<Shot | null>(null);

  return (
    <section id="social-proof" className="relative bg-paper">
      {/* ---------- Intro ---------- */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 pt-28 md:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="font-eyebrow text-teal">
                Trusted by Modern Digital Professionals
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-6 font-editorial text-ink text-4xl md:text-6xl lg:text-7xl leading-[0.95]">
                See how Eyegis fits into
                <span className="block italic text-teal">everyday life.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={220}>
              <p className="font-light text-lg leading-relaxed text-ink/70">
                From creative professionals to entrepreneurs, students and
                gamers, thousands of people spend hours in front of screens
                every day.
              </p>
              <p className="mt-4 font-light text-lg leading-relaxed text-ink/70">
                Eyegis was created to help them do it more comfortably — without
                compromising style.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ---------- Editorial Masonry ---------- */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 mt-20 md:mt-28">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4">
          {SHOTS.map((s, i) => (
            <Reveal
              key={s.caption + i}
              delay={i * 60}
              className={`col-span-2 ${s.span} relative overflow-hidden rounded-md bg-paper-warm group`}
            >
              <button
                type="button"
                onClick={() => setOpen(s)}
                className="block h-full w-full text-left"
                aria-label={`Open ${s.caption}`}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-5 bottom-5 flex items-end justify-between text-paper opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <div>
                    <div className="font-eyebrow text-[9px] text-mint">
                      {s.collection}
                    </div>
                    <div className="mt-1 font-editorial text-lg leading-tight">
                      {s.caption}
                    </div>
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
          ))}
        </div>
      </div>

      {/* ---------- Oversized quote 01 ---------- */}
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-28 md:py-40">
        <Reveal>
          <p className="font-editorial text-ink text-4xl md:text-6xl lg:text-7xl leading-[1.02] text-balance-tight">
            <span className="text-teal">"</span>Finally, blue-light glasses I
            actually{" "}
            <span className="italic text-teal">want to wear.</span>
            <span className="text-teal">"</span>
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-8 flex items-center gap-3 font-eyebrow text-[10px] text-ink/50">
            <span className="h-px w-10 bg-ink/30" />
            Camille · Architect · Paris
          </div>
        </Reveal>
      </div>

      {/* ---------- Testimonials grid (first 3) ---------- */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <article className="h-full rounded-lg border border-ink/10 bg-paper-warm/60 backdrop-blur-sm p-8 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 overflow-hidden rounded-full bg-ink/10">
                    <img
                      src={t.portrait}
                      alt={`${t.name}, ${t.role}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="font-editorial text-ink text-lg leading-tight">
                      {t.name}
                    </div>
                    <div className="font-eyebrow text-[10px] text-ink/55">
                      {t.role} · {t.country}
                    </div>
                  </div>
                </div>
                <StarRow n={t.rating} />
                <p className="font-light text-ink/80 leading-relaxed">
                  "{t.quote}"
                </p>
                <span className="mt-auto font-eyebrow text-[9px] text-teal">
                  ✓ Verified purchase
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ---------- Oversized quote 02 ---------- */}
      <div className="bg-paper-warm mt-28 md:mt-40 py-28 md:py-40">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <Reveal>
            <p className="font-editorial text-ink text-4xl md:text-6xl lg:text-7xl leading-[1.02] text-balance-tight">
              <span className="text-teal">"</span>Comfort that doesn't{" "}
              <span className="italic text-teal">compromise style.</span>
              <span className="text-teal">"</span>
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-8 flex items-center gap-3 font-eyebrow text-[10px] text-ink/50">
              <span className="h-px w-10 bg-ink/30" />
              Naomi · Photographer · Tokyo
            </div>
          </Reveal>
        </div>
      </div>

      {/* ---------- Testimonials grid (next 3) ---------- */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 mt-20 md:mt-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(3).map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <article className="h-full rounded-lg border border-ink/10 bg-paper p-8 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 overflow-hidden rounded-full bg-ink/10">
                    <img
                      src={t.portrait}
                      alt={`${t.name}, ${t.role}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="font-editorial text-ink text-lg leading-tight">
                      {t.name}
                    </div>
                    <div className="font-eyebrow text-[10px] text-ink/55">
                      {t.role} · {t.country}
                    </div>
                  </div>
                </div>
                <StarRow n={t.rating} />
                <p className="font-light text-ink/80 leading-relaxed">
                  "{t.quote}"
                </p>
                <span className="mt-auto font-eyebrow text-[9px] text-teal">
                  ✓ Verified purchase
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ---------- Numbers ---------- */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 mt-28 md:mt-40">
        <Reveal>
          <span className="font-eyebrow text-teal">In numbers</span>
        </Reveal>
        <Reveal delay={100}>
          <h3 className="mt-4 max-w-3xl font-editorial text-ink text-3xl md:text-5xl leading-[0.98]">
            A quiet trust,
            <span className="italic text-teal"> built worldwide.</span>
          </h3>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {STATS.map((s) => (
            <StatBlock key={s.label} stat={s} />
          ))}
        </div>
      </div>

      {/* ---------- World map ---------- */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 mt-24 md:mt-32">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-4">
              <span className="font-eyebrow text-teal">Shipping worldwide</span>
              <h4 className="mt-4 font-editorial text-ink text-3xl md:text-4xl leading-tight">
                Available in 40+ countries.
              </h4>
              <p className="mt-4 font-light text-ink/65 leading-relaxed max-w-sm">
                From São Paulo to Tokyo, Eyegis reaches modern professionals
                across five continents.
              </p>
            </div>
            <div className="lg:col-span-8">
              <WorldMap />
            </div>
          </div>
        </Reveal>
      </div>

      {/* ---------- Signals strip ---------- */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 mt-24 md:mt-32">
        <Reveal>
          <div className="border-y border-ink/10 py-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {SIGNALS.map((s) => (
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

      {/* ---------- Final CTA ---------- */}
      <div className="mt-24 md:mt-32 bg-teal-deep text-paper">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-28 md:py-40 text-center">
          <Reveal>
            <span className="font-eyebrow text-mint">Eyegis · Everyday</span>
          </Reveal>
          <Reveal delay={120}>
            <h3 className="mt-6 font-editorial text-5xl md:text-7xl lg:text-[104px] leading-[0.92]">
              Ready to experience
              <span className="block italic text-mint">Eyegis?</span>
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
                <span className="font-eyebrow">Buy on Amazon</span>
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 place-items-center rounded-full bg-teal-deep/10 transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href="#collections"
                className="inline-flex items-center justify-center rounded-full border border-paper/25 px-9 py-5 font-eyebrow text-paper hover:bg-paper/10 transition-colors"
              >
                Explore Collections
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {open && <Lightbox shot={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
