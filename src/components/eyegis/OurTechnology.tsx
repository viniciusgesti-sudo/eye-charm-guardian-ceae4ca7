import { Check } from "lucide-react";

/* Premium certification-style shield with custom inner symbol */
function TechShield({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="relative inline-flex flex-col items-center">
      <div className="relative h-32 w-32">
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full bg-mint/20 blur-2xl" aria-hidden="true" />
        {/* Shield SVG */}
        <svg
          viewBox="0 0 128 128"
          className="relative h-full w-full drop-shadow-[0_10px_30px_rgba(0,75,87,0.35)]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#004B57" />
              <stop offset="100%" stopColor="#00323B" />
            </linearGradient>
            <linearGradient id="shieldRim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86D9D1" />
              <stop offset="100%" stopColor="#004B57" />
            </linearGradient>
          </defs>
          {/* Shield body */}
          <path
            d="M64 6 L112 22 V64 C112 92 90 114 64 122 C38 114 16 92 16 64 V22 Z"
            fill="url(#shieldGrad)"
            stroke="url(#shieldRim)"
            strokeWidth="1.5"
          />
          {/* Inner ring */}
          <path
            d="M64 16 L102 29 V63 C102 86 84 104 64 111 C44 104 26 86 26 63 V29 Z"
            fill="none"
            stroke="#86D9D1"
            strokeOpacity="0.35"
            strokeWidth="0.8"
          />
          {/* Tiny certification ticks */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * Math.PI * 2 - Math.PI / 2;
            const x1 = 64 + Math.cos(angle) * 46;
            const y1 = 64 + Math.sin(angle) * 46;
            const x2 = 64 + Math.cos(angle) * 49;
            const y2 = 64 + Math.sin(angle) * 49;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#86D9D1"
                strokeOpacity="0.5"
                strokeWidth="0.6"
              />
            );
          })}
        </svg>
        {/* Inner symbol */}
        <div className="absolute inset-0 flex items-center justify-center text-mint">
          {children}
        </div>
      </div>
      <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-teal">
        {label}
      </span>
    </div>
  );
}

function EyeSymbol() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none" aria-hidden="true">
      <path
        d="M4 32 C14 16 26 12 32 12 C38 12 50 16 60 32 C50 48 38 52 32 52 C26 52 14 48 4 32 Z"
        stroke="#86D9D1"
        strokeWidth="2"
      />
      <circle cx="32" cy="32" r="9" stroke="#86D9D1" strokeWidth="2" />
      <circle cx="32" cy="32" r="3.5" fill="#86D9D1" />
      <circle cx="35" cy="29" r="1.2" fill="#F9F9F9" />
    </svg>
  );
}

function MoonSymbol() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none" aria-hidden="true">
      <path
        d="M42 12 A22 22 0 1 0 52 42 A18 18 0 0 1 42 12 Z"
        stroke="#86D9D1"
        strokeWidth="2"
        fill="none"
      />
      {/* Orbit cycle */}
      <ellipse
        cx="32"
        cy="34"
        rx="26"
        ry="8"
        stroke="#86D9D1"
        strokeOpacity="0.45"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      <circle cx="8" cy="34" r="1.6" fill="#86D9D1" />
      <circle cx="56" cy="34" r="1.6" fill="#86D9D1" />
    </svg>
  );
}

function Benefit({ title, desc }: { title: string; desc: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint/20 text-teal ring-1 ring-mint/40">
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
      <p className="text-sm leading-relaxed text-ink/85">
        <span className="font-medium text-ink">{title}:</span> {desc}
      </p>
    </li>
  );
}

export function OurTechnology() {
  return (
    <section
      id="our-technology"
      className="relative overflow-hidden bg-[#F9F9F9] py-28 md:py-36"
    >
      {/* Subtle grid backdrop */}
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
        {/* Eyebrow + title */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal">
            § Core Technology
          </span>
          <h2 className="mt-5 font-editorial text-4xl leading-[1.05] text-[#004B57] md:text-6xl">
            Our Technology —{" "}
            <span className="italic">Engineered for Vision</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/70">
            Two dedicated optical systems. Two distinct challenges of modern
            digital life. One uncompromising standard of visual protection.
          </p>
          <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-teal/60 to-transparent" />
        </div>

        {/* Two sub-sections */}
        <div className="mt-20 grid gap-8 lg:mt-24 lg:grid-cols-2">
          {/* E-Guard Retina */}
          <article className="relative rounded-3xl border border-teal/10 bg-white p-8 md:p-12 shadow-[0_30px_80px_-40px_rgba(0,75,87,0.25)] transition-transform duration-500 hover:-translate-y-1">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint/60 to-transparent" />
            <div className="flex flex-col items-center text-center">
              <TechShield label="Certified · Daytime">
                <EyeSymbol />
              </TechShield>
              <h3 className="mt-8 font-editorial text-3xl text-[#004B57] md:text-4xl">
                E-Guard Retina™
              </h3>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-teal/80">
                Protect visual comfort during long screen sessions
              </p>
            </div>

            <p className="mt-8 text-[15px] leading-relaxed text-ink/80">
              E-Guard Retina selectively filters part of the blue-violet
              wavelengths responsible for digital eye strain during prolonged
              screen sessions, while preserving color perception.
            </p>

            <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-[#E2D1C3] to-transparent" />

            <ul className="space-y-4">
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
          <article className="relative rounded-3xl border border-teal/10 bg-white p-8 md:p-12 shadow-[0_30px_80px_-40px_rgba(0,75,87,0.25)] transition-transform duration-500 hover:-translate-y-1">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint/60 to-transparent" />
            <div className="flex flex-col items-center text-center">
              <TechShield label="Certified · Nighttime">
                <MoonSymbol />
              </TechShield>
              <h3 className="mt-8 font-editorial text-3xl text-[#004B57] md:text-4xl">
                E-Guard Circadian™
              </h3>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-teal/80">
                Sunset Mode &amp; Sleep Protection
              </p>
            </div>

            <p className="mt-8 text-[15px] leading-relaxed text-ink/80">
              Exposure to high-energy blue light after dark tricks your brain
              into thinking it's still noon, disrupting your natural sleep cycle
              and biological clock. E-Guard Circadian™ is designed to mitigate
              these specific evening wavelengths while maintaining a natural
              viewing experience.
            </p>

            <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-[#E2D1C3] to-transparent" />

            <ul className="space-y-4">
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

        {/* Why Both Matter */}
        <div className="mt-24 md:mt-32">
          <div className="text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal">
              § Why Both Matter
            </span>
            <h3 className="mt-4 font-editorial text-3xl text-[#004B57] md:text-5xl">
              One day. Two very different lights.
            </h3>
          </div>

          <div className="relative mt-14 grid gap-6 md:grid-cols-2">
            {/* Daytime */}
            <div className="rounded-3xl bg-[#E2D1C3]/40 p-10 ring-1 ring-[#E2D1C3]">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#F5B841]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/60">
                  Daytime Challenge
                </span>
              </div>
              <p className="mt-6 font-editorial text-2xl leading-tight text-ink md:text-3xl">
                Eye strain &amp; fatigue from hours on screens.
              </p>
              <div className="mt-8 flex items-center gap-3 text-teal">
                <span className="font-mono text-xs uppercase tracking-[0.2em]">
                  Solved by
                </span>
                <span className="h-px w-8 bg-teal/40" />
                <span className="font-editorial text-lg">E-Guard Retina™</span>
              </div>
            </div>

            {/* Nighttime */}
            <div className="rounded-3xl bg-[#004B57] p-10 text-paper">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-mint" />
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/60">
                  Nighttime Challenge
                </span>
              </div>
              <p className="mt-6 font-editorial text-2xl leading-tight md:text-3xl">
                Sleep disruption &amp; biological clock offset after dark.
              </p>
              <div className="mt-8 flex items-center gap-3 text-mint">
                <span className="font-mono text-xs uppercase tracking-[0.2em]">
                  Solved by
                </span>
                <span className="h-px w-8 bg-mint/40" />
                <span className="font-editorial text-lg">
                  E-Guard Circadian™
                </span>
              </div>
            </div>
          </div>

          {/* Closing */}
          <p className="mx-auto mt-14 max-w-2xl text-center font-editorial text-xl italic text-[#004B57] md:text-2xl">
            Different wavelengths. Different effects.
            <br />
            <span className="text-ink/70">Two dedicated solutions.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
