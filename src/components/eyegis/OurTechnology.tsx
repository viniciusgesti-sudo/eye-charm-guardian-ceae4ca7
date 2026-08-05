import { Check, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";

const TECH_HERO_COPY = {
  br: {
    kicker: "§ Tecnologia Central",
    titleA: "Duas lentes.",
    titleB: "Duas horas do dia.",
    sub: "E-Guard Retina™ para o dia diante das telas. E-Guard Circadian™ para a chegada da noite. Dois sistemas ópticos dedicados, um único padrão honesto.",
  },
  en: {
    kicker: "§ Core Technology",
    titleA: "Two lenses.",
    titleB: "Two hours of the day.",
    sub: "E-Guard Retina™ for the screen-lit day. E-Guard Circadian™ for the fall of night. Two dedicated optical systems, one honest standard.",
  },
  fr: {
    kicker: "§ Technologie Centrale",
    titleA: "Deux verres.",
    titleB: "Deux heures du jour.",
    sub: "E-Guard Retina™ pour la journée devant les écrans. E-Guard Circadian™ pour la tombée de la nuit. Deux systèmes optiques dédiés, un seul standard honnête.",
  },
} as const;

/* ————————————————————————————————————————————————
   Premium certification-style shield badge
   Inspired by the reference banners: deep teal body,
   inner ring, tick marks, and a central symbol.
———————————————————————————————————————————————— */
function ShieldBadge({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="relative inline-flex flex-col items-center">
      <div className="relative h-24 w-24">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 rounded-full bg-mint/25 blur-2xl"
          aria-hidden="true"
        />
        <svg
          viewBox="0 0 144 160"
          className="relative h-full w-full drop-shadow-[0_18px_40px_rgba(0,75,87,0.35)]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="shieldBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#005E6C" />
              <stop offset="55%" stopColor="#004B57" />
              <stop offset="100%" stopColor="#00323B" />
            </linearGradient>
            <linearGradient id="shieldRim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E2D1C3" />
              <stop offset="50%" stopColor="#86D9D1" />
              <stop offset="100%" stopColor="#004B57" />
            </linearGradient>
            <linearGradient id="shieldHighlight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Shield body */}
          <path
            d="M72 4 L134 24 V78 C134 118 108 144 72 156 C36 144 10 118 10 78 V24 Z"
            fill="url(#shieldBody)"
            stroke="url(#shieldRim)"
            strokeWidth="2"
          />
          {/* Top highlight */}
          <path
            d="M72 4 L134 24 V50 C110 42 88 40 72 40 C56 40 34 42 10 50 V24 Z"
            fill="url(#shieldHighlight)"
          />
          {/* Inner engraved ring */}
          <path
            d="M72 16 L122 32 V76 C122 110 100 132 72 143 C44 132 22 110 22 76 V32 Z"
            fill="none"
            stroke="#86D9D1"
            strokeOpacity="0.35"
            strokeWidth="0.9"
          />
          {/* Certification ticks around inner ring */}
          {Array.from({ length: 40 }).map((_, i) => {
            const t = i / 40;
            const angle = t * Math.PI * 2 - Math.PI / 2;
            const rx = 54;
            const ry = 60;
            const cx = 72;
            const cy = 82;
            const x1 = cx + Math.cos(angle) * rx;
            const y1 = cy + Math.sin(angle) * ry;
            const x2 = cx + Math.cos(angle) * (rx + 3.2);
            const y2 = cy + Math.sin(angle) * (ry + 3.2);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#86D9D1"
                strokeOpacity={i % 5 === 0 ? 0.85 : 0.35}
                strokeWidth={i % 5 === 0 ? 0.9 : 0.5}
              />
            );
          })}
          {/* Bottom banner ribbon */}
          <path
            d="M30 132 L72 148 L114 132 L108 142 L72 156 L36 142 Z"
            fill="#00323B"
            stroke="#86D9D1"
            strokeOpacity="0.4"
            strokeWidth="0.6"
          />
        </svg>
        {/* Central symbol overlay */}
        <div className="absolute inset-0 flex items-start justify-center pt-5 text-mint">
          {children}
        </div>
      </div>
      <span className="mt-3 font-mono text-[9px] uppercase tracking-[0.24em] text-teal">
        {label}
      </span>
    </div>
  );
}

function EyeInsignia() {
  return (
    <svg viewBox="0 0 80 80" className="h-11 w-11" fill="none" aria-hidden="true">
      <path
        d="M6 40 C18 20 30 14 40 14 C50 14 62 20 74 40 C62 60 50 66 40 66 C30 66 18 60 6 40 Z"
        stroke="#86D9D1"
        strokeWidth="2.2"
      />
      <circle cx="40" cy="40" r="12" stroke="#86D9D1" strokeWidth="2.2" />
      <circle cx="40" cy="40" r="5" fill="#86D9D1" />
      <circle cx="43.5" cy="36.5" r="1.6" fill="#F9F9F9" />
      {/* Radiating lashes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x1 = 40 + Math.cos(angle) * 20;
        const y1 = 40 + Math.sin(angle) * 20;
        const x2 = 40 + Math.cos(angle) * 24;
        const y2 = 40 + Math.sin(angle) * 24;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#86D9D1"
            strokeOpacity="0.6"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

function MoonStarsInsignia() {
  return (
    <svg viewBox="0 0 80 80" className="h-11 w-11" fill="none" aria-hidden="true">
      {/* Crescent moon */}
      <path
        d="M52 18 A22 22 0 1 0 62 52 A18 18 0 0 1 52 18 Z"
        stroke="#86D9D1"
        strokeWidth="2.2"
        fill="none"
      />
      {/* Stars / dots */}
      <g fill="#86D9D1">
        <circle cx="16" cy="20" r="1.6" />
        <circle cx="24" cy="14" r="1" />
        <circle cx="12" cy="52" r="1.2" />
        <circle cx="66" cy="66" r="1.4" />
        <circle cx="20" cy="68" r="1" />
        <circle cx="70" cy="30" r="1" />
      </g>
      {/* 4-point sparkle */}
      <path
        d="M22 40 L23.4 43.4 L26.8 44.8 L23.4 46.2 L22 49.6 L20.6 46.2 L17.2 44.8 L20.6 43.4 Z"
        fill="#86D9D1"
        opacity="0.9"
      />
      <path
        d="M62 12 L62.9 14.2 L65.1 15.1 L62.9 16 L62 18.2 L61.1 16 L58.9 15.1 L61.1 14.2 Z"
        fill="#86D9D1"
        opacity="0.7"
      />
    </svg>
  );
}

function SunGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="7" stroke="currentColor" strokeWidth="1.6" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const x1 = 24 + Math.cos(a) * 12;
        const y1 = 24 + Math.sin(a) * 12;
        const x2 = 24 + Math.cos(a) * 17;
        const y2 = 24 + Math.sin(a) * 17;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

function MoonGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <path
        d="M32 8 A16 16 0 1 0 40 32 A13 13 0 0 1 32 8 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <circle cx="14" cy="14" r="1" fill="currentColor" />
      <circle cx="10" cy="30" r="1" fill="currentColor" />
      <circle cx="20" cy="40" r="1" fill="currentColor" />
    </svg>
  );
}

/* Brand-tinted progress-bar accent (Deep Teal → Mint) */
function TealAccent() {
  return (
    <div className="mt-4 h-[3px] w-24 overflow-hidden rounded-full bg-champagne">
      <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-teal-deep via-teal to-mint" />
    </div>
  );
}

function Benefit({ title, desc }: { title: string; desc: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-500/30">
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
      <p className="text-[15px] leading-relaxed text-ink/85">
        <span className="font-semibold text-ink">{title}:</span> {desc}
      </p>
    </li>
  );
}

export function OurTechnology() {
  const { lang } = useI18n();
  const h = TECH_HERO_COPY[(lang.toLowerCase() as "br" | "en" | "fr") in TECH_HERO_COPY ? (lang.toLowerCase() as "br" | "en" | "fr") : "en"];
  return (
    <section
      id="our-technology"
      className="relative overflow-hidden bg-[#F9F9F9] py-10 md:py-36"
    >
      {/* Grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#004B57 1px, transparent 1px), linear-gradient(90deg, #004B57 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10 lg:px-14">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal">
            {h.kicker}
          </span>
          <h1 className="mt-5 font-editorial text-4xl leading-[1.05] text-[#004B57] md:text-6xl">
            {h.titleA}{" "}
            <span className="italic">{h.titleB}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/70">
            {h.sub}
          </p>
          <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-teal/60 to-transparent" />
        </div>

        {/* Two sub-sections */}
        <div className="mt-9 grid gap-8 lg:mt-10 lg:grid-cols-2">
          {/* E-Guard Retina */}
          <article className="relative rounded-3xl border border-teal/10 bg-white p-6 md:p-8 shadow-[0_30px_80px_-40px_rgba(0,75,87,0.25)] transition-transform duration-500 hover:-translate-y-1">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint/60 to-transparent" />
            <div className="flex flex-col items-center text-center">
              <ShieldBadge label="Certified · Daytime">
                <EyeInsignia />
              </ShieldBadge>
              <h3 className="mt-5 text-xl font-bold uppercase tracking-[0.12em] text-[#004B57] md:text-2xl">
                E-Guard™ Retina
              </h3>
              <p className="mt-2 max-w-xs text-[12px] leading-relaxed text-ink/70">
                Protection du bleu-violet haute énergie
                <span className="mx-2 text-ink/30">·</span>
                Protect visual comfort during long screen sessions
              </p>
              <TealAccent />
            </div>

            <p className="mt-5 text-[14px] leading-relaxed text-ink/80">
              E-Guard Retina selectively filters part of the blue-violet
              wavelengths responsible for digital eye strain during prolonged
              screen sessions, while preserving color perception.
            </p>

            <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-[#E2D1C3] to-transparent" />

            <ul className="space-y-3">
              <Benefit
                title="Defeats Screen Fatigue"
                desc="Minimizes dry, itchy, and red eyes"
              />
              <Benefit
                title="Precision Filtering"
                desc="Targets only the harsh blue-violet light"
              />
              <Benefit
                title="Built for High-Output"
                desc="Ideal for long workdays, binge watching, and intense gaming"
              />
            </ul>
          </article>

          {/* E-Guard Circadian */}
          <article className="relative rounded-3xl border border-teal/10 bg-white p-6 md:p-8 shadow-[0_30px_80px_-40px_rgba(0,75,87,0.25)] transition-transform duration-500 hover:-translate-y-1">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint/60 to-transparent" />
            <div className="flex flex-col items-center text-center">
              <ShieldBadge label="Certified · Nighttime">
                <MoonStarsInsignia />
              </ShieldBadge>
              <h3 className="mt-5 text-xl font-bold uppercase tracking-[0.12em] text-[#004B57] md:text-2xl">
                E-Guard™ Circadian
              </h3>
              <p className="mt-2 max-w-xs text-[12px] leading-relaxed text-ink/70">
                Soutien du rythme circadien et du confort visuel
                <span className="mx-2 text-ink/30">·</span>
                Sunset Mode &amp; Sleep Protection
              </p>
              <TealAccent />
            </div>

            <p className="mt-5 text-[14px] leading-relaxed text-ink/80">
              Exposure to high-energy blue light after dark tricks your brain
              into thinking it's still noon, disrupting your natural sleep
              cycle. E-Guard Circadian™ mitigates these specific evening
              wavelengths while maintaining a natural viewing experience.
            </p>

            <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-[#E2D1C3] to-transparent" />

            <ul className="space-y-3">
              <Benefit
                title="Protects Melatonin"
                desc="Limits evening light disruption to support deeper, uninterrupted sleep"
              />
              <Benefit
                title="True-to-Life Colors"
                desc="Maximum circadian protection with significantly less color distortion than traditional amber lenses"
              />
              <Benefit
                title="Smarter Night Routines"
                desc="Built for late-night gaming, work, streaming, and scrolling"
              />
            </ul>
          </article>
        </div>

        {/* Why Both Matter — champagne panel */}
        <div className="mt-8 md:mt-12">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[1.5rem] bg-[#E2D1C3]/60 px-5 py-6 md:px-10 md:py-8">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, #004B57 1px, transparent 1px), radial-gradient(circle at 80% 80%, #004B57 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <div className="text-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-teal">
                  § Why Both Matter
                </span>
                <h3 className="mt-3 font-editorial text-2xl leading-tight text-[#004B57] md:text-3xl">
                  Why both matter.
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink/75">
                  Most blue-light eyewear treat all blue light as if it were the
                  same. At Eyegis we see it as two very different challenges.
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {/* Daytime */}
                <div className="rounded-xl bg-white/70 p-5 ring-1 ring-white/60 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-champagne text-teal-deep">
                      <SunGlyph className="h-4.5 w-4.5" />
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink/60">
                      The Daytime Challenge
                    </span>
                  </div>
                  <p className="mt-4 font-editorial text-xl leading-tight text-ink md:text-2xl">
                    Eye strain &amp; fatigue.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-teal">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                      Solved by
                    </span>
                    <span className="h-px w-6 bg-teal/40" />
                    <span className="font-editorial text-base">
                      E-Guard Retina™
                    </span>
                  </div>
                </div>

                {/* Nighttime */}
                <div className="rounded-xl bg-[#004B57] p-5 text-paper ring-1 ring-teal/40">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-mint/15 text-mint">
                      <MoonGlyph className="h-4.5 w-4.5" />
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-paper/60">
                      The Nighttime Challenge
                    </span>
                  </div>
                  <p className="mt-4 font-editorial text-xl leading-tight md:text-2xl">
                    Sleep disruption &amp; biological clock.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-mint">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                      Solved by
                    </span>
                    <span className="h-px w-6 bg-mint/40" />
                    <span className="font-editorial text-base">
                      E-Guard Circadian™
                    </span>
                  </div>
                </div>
              </div>

              <p className="mx-auto mt-6 max-w-xl text-center font-editorial text-lg italic text-[#004B57] md:text-xl">
                Different wavelengths. Different effects.
                <br />
                <span className="text-ink/70">Two dedicated solutions.</span>
              </p>

              <div className="mt-6 flex justify-center">
                <Link
                  to="/"
                  hash="honest-science"
                  className="group inline-flex items-center gap-2 rounded-full border border-teal/30 bg-white/60 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-teal transition hover:bg-white"
                >
                  Explore Honest Science with Eyegis
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
