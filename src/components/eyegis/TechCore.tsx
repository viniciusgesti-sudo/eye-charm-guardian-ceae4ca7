import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

/* ------------------------------------------------------------------
   TechCore — dark HUD tech showcase for EyegisGuard™
   Grid backdrop · scanlines · live telemetry · animated spectrum ·
   labeled lens cross-section · monospaced identifiers.
   ------------------------------------------------------------------ */

type Copy = {
  eyebrow: string;
  headline1: string;
  headline2: string;
  sub: string;
  telemetry: { k: string; v: string; u: string }[];
  spectrum: { title: string; caption: string; filter: string; pass: string };
  stack: { title: string; layers: { code: string; name: string; desc: string }[] };
  console: { title: string; lines: string[] };
  footer: string;
};

const COPY: Record<Lang, Copy> = {
  EN: {
    eyebrow: "§ 04 · Core Technology",
    headline1: "The lens,",
    headline2: "instrumented.",
    sub: "EyegisGuard™ is a measurable optical system. Every layer, every nanometer, every gram — logged, tested, disclosed.",
    telemetry: [
      { k: "Filter band", v: "400–455", u: "nm" },
      { k: "Peak attenuation", v: "45", u: "%" },
      { k: "Visible transmission", v: "94", u: "%TLv" },
      { k: "Color shift ΔE", v: "< 1.8", u: "CIE" },
      { k: "Refractive index", v: "1.56", u: "nD" },
      { k: "Frame mass", v: "17.4", u: "g" },
    ],
    spectrum: {
      title: "Wavelength filter · live",
      caption: "Selective attenuation across the harmful HEV band while preserving photopic response.",
      filter: "HEV cut",
      pass: "Photopic pass",
    },
    stack: {
      title: "Lens stack · cross section",
      layers: [
        { code: "L01", name: "Hydrophobic top coat", desc: "Repels fingerprints, water, cosmetic oils." },
        { code: "L02", name: "Anti-reflective (AR)",  desc: "Sub-1% residual reflection, both surfaces." },
        { code: "L03", name: "EyegisGuard™ HEV filter", desc: "Absorptive dye tuned to 400–455 nm." },
        { code: "L04", name: "CR-39 optical substrate", desc: "1.56 index, ISO 8980-1 tolerances." },
        { code: "L05", name: "Scratch-resistant primer", desc: "Bayer abrasion ratio ≥ 3.2." },
      ],
    },
    console: {
      title: "System log",
      lines: [
        "boot   eyegisguard.optics v3.2",
        "load   substrate CR-39 ✓",
        "load   HEV filter 400–455nm ✓",
        "calib  ΔE color shift = 1.62",
        "test   photopic Tv = 94.0%",
        "cert   ISO 8980-1 / CE EN166 ✓",
        "ready  serial EGS-24-#0000",
      ],
    },
    footer: "Optical Science · Porto · Est. MMXXIV",
  },
  PT: {
    eyebrow: "§ 04 · Tecnologia Central",
    headline1: "A lente,",
    headline2: "instrumentada.",
    sub: "EyegisGuard™ é um sistema óptico mensurável. Cada camada, cada nanômetro, cada grama — registrado, testado, divulgado.",
    telemetry: [
      { k: "Faixa de filtro", v: "400–455", u: "nm" },
      { k: "Atenuação de pico", v: "45", u: "%" },
      { k: "Transmissão visível", v: "94", u: "%TLv" },
      { k: "Desvio de cor ΔE", v: "< 1,8", u: "CIE" },
      { k: "Índice de refração", v: "1,56", u: "nD" },
      { k: "Massa da armação", v: "17,4", u: "g" },
    ],
    spectrum: {
      title: "Filtro de comprimento de onda · ao vivo",
      caption: "Atenuação seletiva na banda HEV nociva, preservando a resposta fotópica.",
      filter: "Corte HEV",
      pass: "Passa fotópica",
    },
    stack: {
      title: "Pilha da lente · seção transversal",
      layers: [
        { code: "L01", name: "Camada hidrofóbica", desc: "Repele digitais, água e oleosidade." },
        { code: "L02", name: "Antirreflexo (AR)", desc: "Reflexão residual sub-1%, ambas as faces." },
        { code: "L03", name: "Filtro HEV EyegisGuard™", desc: "Corante absortivo sintonizado 400–455 nm." },
        { code: "L04", name: "Substrato óptico CR-39", desc: "Índice 1,56, tolerâncias ISO 8980-1." },
        { code: "L05", name: "Primer anti-riscos", desc: "Razão de abrasão Bayer ≥ 3,2." },
      ],
    },
    console: {
      title: "Log do sistema",
      lines: [
        "boot   eyegisguard.optics v3.2",
        "load   substrato CR-39 ✓",
        "load   filtro HEV 400–455nm ✓",
        "calib  ΔE desvio de cor = 1,62",
        "test   Tv fotópica = 94,0%",
        "cert   ISO 8980-1 / CE EN166 ✓",
        "ready  série EGS-24-#0000",
      ],
    },
    footer: "Ciência Óptica · Porto · Est. MMXXIV",
  },
  FR: {
    eyebrow: "§ 04 · Technologie centrale",
    headline1: "Le verre,",
    headline2: "instrumenté.",
    sub: "EyegisGuard™ est un système optique mesurable. Chaque couche, chaque nanomètre, chaque gramme — consigné, testé, divulgué.",
    telemetry: [
      { k: "Bande de filtrage", v: "400–455", u: "nm" },
      { k: "Atténuation pic", v: "45", u: "%" },
      { k: "Transmission visible", v: "94", u: "%TLv" },
      { k: "Écart couleur ΔE", v: "< 1,8", u: "CIE" },
      { k: "Indice de réfraction", v: "1,56", u: "nD" },
      { k: "Masse monture", v: "17,4", u: "g" },
    ],
    spectrum: {
      title: "Filtre de longueur d'onde · direct",
      caption: "Atténuation sélective de la bande HEV nocive, en préservant la réponse photopique.",
      filter: "Coupe HEV",
      pass: "Passe photopique",
    },
    stack: {
      title: "Empilement du verre · coupe",
      layers: [
        { code: "L01", name: "Couche hydrophobe", desc: "Repousse traces, eau et gras." },
        { code: "L02", name: "Antireflet (AR)", desc: "Réflexion résiduelle sous 1%, deux faces." },
        { code: "L03", name: "Filtre HEV EyegisGuard™", desc: "Colorant absorbant réglé 400–455 nm." },
        { code: "L04", name: "Substrat optique CR-39", desc: "Indice 1,56, tolérances ISO 8980-1." },
        { code: "L05", name: "Primaire anti-rayures", desc: "Ratio d'abrasion Bayer ≥ 3,2." },
      ],
    },
    console: {
      title: "Journal système",
      lines: [
        "boot   eyegisguard.optics v3.2",
        "load   substrat CR-39 ✓",
        "load   filtre HEV 400–455nm ✓",
        "calib  ΔE écart couleur = 1,62",
        "test   Tv photopique = 94,0%",
        "cert   ISO 8980-1 / CE EN166 ✓",
        "ready  série EGS-24-#0000",
      ],
    },
    footer: "Science Optique · Porto · Est. MMXXIV",
  },
};

/* ------------------- helpers ------------------- */

function useInView<T extends HTMLElement>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

/* ------------------- spectrum SVG ------------------- */

function Spectrum({ filterLabel, passLabel }: { filterLabel: string; passLabel: string }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="relative">
      <svg viewBox="0 0 800 240" className="w-full h-auto">
        <defs>
          <linearGradient id="visSpectrum" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#7B3AA8" />
            <stop offset="0.15" stopColor="#3B4BC4" />
            <stop offset="0.32" stopColor="#3AA0FF" />
            <stop offset="0.5" stopColor="#4ED9A2" />
            <stop offset="0.65" stopColor="#F4E45E" />
            <stop offset="0.82" stopColor="#F4863A" />
            <stop offset="1" stopColor="#D94040" />
          </linearGradient>
          <linearGradient id="hevBand" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#86D9D1" stopOpacity="0.55" />
            <stop offset="1" stopColor="#86D9D1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* baseline curve (photopic, no filter) */}
        <path
          d="M 40 190 Q 200 60 400 60 Q 600 60 760 190"
          fill="none"
          stroke="rgba(249,249,249,0.35)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        {/* filtered curve — draws in */}
        <path
          d="M 40 190 Q 120 170 180 165 Q 240 160 260 150 L 300 150 Q 340 150 380 90 Q 440 55 500 65 Q 620 80 760 190"
          fill="none"
          stroke="#86D9D1"
          strokeWidth="1.6"
          style={{
            strokeDasharray: 1600,
            strokeDashoffset: seen ? 0 : 1600,
            transition: "stroke-dashoffset 2.4s cubic-bezier(.2,.7,.2,1) .1s",
          }}
        />

        {/* HEV band highlight (400-455nm ≈ x 60–160) */}
        <rect
          x="60"
          y="20"
          width={seen ? 100 : 0}
          height="200"
          fill="url(#hevBand)"
          style={{ transition: "width 1.4s ease-out" }}
        />
        {/* HEV cut brackets */}
        <line x1="60" x2="60" y1="18" y2="222" stroke="#86D9D1" strokeWidth="0.8" />
        <line x1="160" x2="160" y1="18" y2="222" stroke="#86D9D1" strokeWidth="0.8" />

        {/* axis */}
        <line x1="40" x2="760" y1="220" y2="220" stroke="rgba(249,249,249,0.25)" strokeWidth="0.5" />
        {/* visible spectrum bar */}
        <rect x="60" y="226" width="680" height="4" fill="url(#visSpectrum)" opacity="0.85" />

        {/* labels */}
        {[400, 450, 500, 550, 600, 650, 700].map((nm) => {
          const x = 60 + ((nm - 400) / 300) * 680;
          return (
            <g key={nm}>
              <line x1={x} x2={x} y1="230" y2="234" stroke="rgba(249,249,249,0.4)" strokeWidth="0.5" />
              <text
                x={x}
                y="245"
                fill="rgba(249,249,249,0.5)"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
                textAnchor="middle"
              >
                {nm}
              </text>
            </g>
          );
        })}

        {/* callouts */}
        <text x="110" y="14" fill="#86D9D1" fontSize="9" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
          {filterLabel} · 400–455nm
        </text>
        <text x="500" y="50" fill="rgba(249,249,249,0.7)" fontSize="9" fontFamily="JetBrains Mono, monospace">
          {passLabel}
        </text>

        {/* scanning marker */}
        <line
          x1="0"
          x2="0"
          y1="30"
          y2="220"
          stroke="#86D9D1"
          strokeWidth="0.6"
          opacity="0.7"
          style={{
            transform: seen ? "translateX(760px)" : "translateX(40px)",
            transition: "transform 2.4s cubic-bezier(.2,.7,.2,1)",
          }}
        />
      </svg>
    </div>
  );
}

/* ------------------- lens cross-section ------------------- */

function LensStack({ layers }: { layers: Copy["stack"]["layers"] }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  const colors = ["#86D9D1", "#5EBFB8", "#3DA69E", "#004B57", "#003842"];

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 md:gap-10 items-stretch">
      {/* Futuristic lens viewport */}
      <div className="relative aspect-square md:aspect-auto md:min-h-[520px] rounded-sm border border-mint/30 overflow-hidden bg-[radial-gradient(circle_at_50%_50%,#032329_0%,#010b0f_60%,#000306_100%)]">
        {/* HUD grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(134,217,209,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(134,217,209,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* corner brackets */}
        <span className="absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-mint" />
        <span className="absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-mint" />
        <span className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-mint" />
        <span className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-mint" />

        {/* HUD labels */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.28em] text-mint/80">
          ● REC · OPTICAL SCAN
        </div>
        <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.16em] text-mint/70">
          Ø 52.00mm · biconvex
        </div>
        <div className="absolute bottom-4 right-4 font-mono text-[9px] uppercase tracking-[0.16em] text-mint/70">
          LAT 41.157 · LON −8.629
        </div>
        <div className="absolute top-1/2 left-4 -translate-y-1/2 font-mono text-[9px] uppercase tracking-[0.2em] text-mint/50 [writing-mode:vertical-rl] rotate-180">
          λ 400—700 nm
        </div>
        <div className="absolute top-1/2 right-4 -translate-y-1/2 font-mono text-[9px] uppercase tracking-[0.2em] text-mint/50 [writing-mode:vertical-rl]">
          EGS-3.2 · CR-39
        </div>

        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="lensIris" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#86D9D1" stopOpacity="0.35" />
              <stop offset="45%" stopColor="#004B57" stopOpacity="0.55" />
              <stop offset="85%" stopColor="#01131A" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#000" stopOpacity="1" />
            </radialGradient>
            <radialGradient id="hevGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#86D9D1" stopOpacity="0" />
              <stop offset="60%" stopColor="#86D9D1" stopOpacity="0.15" />
              <stop offset="85%" stopColor="#86D9D1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#86D9D1" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="scanBeam" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#86D9D1" stopOpacity="0" />
              <stop offset="0.5" stopColor="#86D9D1" stopOpacity="0.9" />
              <stop offset="1" stopColor="#86D9D1" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* faint outer HUD circles */}
          <circle cx="200" cy="200" r="185" fill="none" stroke="rgba(134,217,209,0.15)" strokeWidth="0.6" strokeDasharray="2 6" />
          <circle cx="200" cy="200" r="170" fill="none" stroke="rgba(134,217,209,0.1)" strokeWidth="0.4" />

          {/* rotating tick ring */}
          <g style={{ transformOrigin: "200px 200px", animation: "techRotate 40s linear infinite" }}>
            {Array.from({ length: 60 }).map((_, i) => {
              const angle = (i * 6 * Math.PI) / 180;
              const inner = i % 5 === 0 ? 148 : 154;
              const outer = 160;
              return (
                <line
                  key={i}
                  x1={200 + Math.cos(angle) * inner}
                  y1={200 + Math.sin(angle) * inner}
                  x2={200 + Math.cos(angle) * outer}
                  y2={200 + Math.sin(angle) * outer}
                  stroke="#86D9D1"
                  strokeWidth={i % 5 === 0 ? 1 : 0.5}
                  opacity={i % 5 === 0 ? 0.9 : 0.4}
                />
              );
            })}
          </g>

          {/* Layer arcs — each layer is a concentric ring */}
          {layers.map((l, i) => {
            const r = 138 - i * 22;
            const dash = 2 * Math.PI * r;
            return (
              <g key={l.code}>
                <circle
                  cx="200"
                  cy="200"
                  r={r}
                  fill="none"
                  stroke={colors[i]}
                  strokeWidth="2.5"
                  opacity="0.85"
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${dash}`}
                  style={{
                    strokeDashoffset: seen ? 0 : dash,
                    transition: `stroke-dashoffset 1.4s cubic-bezier(.2,.7,.2,1) ${0.15 * i}s`,
                    filter: `drop-shadow(0 0 6px ${colors[i]}80)`,
                  }}
                />
                {/* small marker on ring */}
                <circle
                  cx={200 + r}
                  cy="200"
                  r="3"
                  fill={colors[i]}
                  opacity={seen ? 1 : 0}
                  style={{
                    transition: `opacity .4s ease ${0.6 + i * 0.15}s`,
                    filter: `drop-shadow(0 0 4px ${colors[i]})`,
                  }}
                />
              </g>
            );
          })}

          {/* Iris core */}
          <circle cx="200" cy="200" r="40" fill="url(#lensIris)" />
          <circle
            cx="200"
            cy="200"
            r="40"
            fill="none"
            stroke="#86D9D1"
            strokeWidth="1"
            opacity="0.8"
            style={{
              transformOrigin: "200px 200px",
              animation: seen ? "techPulse 3s ease-in-out infinite" : "none",
            }}
          />
          {/* HEV glow overlay */}
          <circle cx="200" cy="200" r="140" fill="url(#hevGlow)" opacity={seen ? 1 : 0} style={{ transition: "opacity 1.5s ease .8s" }} />

          {/* crosshair */}
          <g stroke="#86D9D1" strokeWidth="0.6" opacity="0.5">
            <line x1="200" y1="20" x2="200" y2="60" />
            <line x1="200" y1="340" x2="200" y2="380" />
            <line x1="20" y1="200" x2="60" y2="200" />
            <line x1="340" y1="200" x2="380" y2="200" />
          </g>
          {/* center reticle */}
          <circle cx="200" cy="200" r="6" fill="none" stroke="#86D9D1" strokeWidth="0.8" />
          <circle cx="200" cy="200" r="1.5" fill="#86D9D1" />

          {/* sweeping scan beam */}
          <g style={{ transformOrigin: "200px 200px", animation: seen ? "techSweep 4s linear infinite" : "none" }}>
            <path d="M 200 200 L 200 40 A 160 160 0 0 1 320 120 Z" fill="url(#hevGlow)" opacity="0.6" />
            <line x1="200" y1="200" x2="200" y2="40" stroke="url(#scanBeam)" strokeWidth="2" />
          </g>

          {/* orbital particle */}
          <g style={{ transformOrigin: "200px 200px", animation: seen ? "techRotate 8s linear infinite reverse" : "none" }}>
            <circle cx="316" cy="200" r="2.5" fill="#86D9D1" style={{ filter: "drop-shadow(0 0 6px #86D9D1)" }} />
          </g>
          <g style={{ transformOrigin: "200px 200px", animation: seen ? "techRotate 12s linear infinite" : "none" }}>
            <circle cx="272" cy="200" r="2" fill="#5EBFB8" style={{ filter: "drop-shadow(0 0 5px #5EBFB8)" }} />
          </g>
        </svg>

        <style>{`
          @keyframes techRotate { to { transform: rotate(360deg); } }
          @keyframes techSweep  { to { transform: rotate(360deg); } }
          @keyframes techPulse  {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50%      { transform: scale(1.08); opacity: 0.4; }
          }
        `}</style>
      </div>

      {/* Layer list */}
      <ul className="flex flex-col divide-y divide-paper/10 border-t border-b border-paper/10">
        {layers.map((l, i) => (
          <li
            key={l.code}
            className="group grid grid-cols-[56px_1fr_auto] items-center gap-4 py-5 px-1 transition-colors hover:bg-mint/5"
            style={{
              opacity: seen ? 1 : 0,
              transform: seen ? "translateY(0)" : "translateY(8px)",
              transition: `opacity .5s ease ${0.2 + i * 0.08}s, transform .5s ease ${0.2 + i * 0.08}s`,
            }}
          >
            <span className="font-mono text-[10px] text-mint">{l.code}</span>
            <div>
              <div className="font-editorial text-lg text-paper leading-tight">{l.name}</div>
              <div className="mt-1 text-[12px] leading-relaxed text-paper/55">{l.desc}</div>
            </div>
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: colors[i], boxShadow: `0 0 8px ${colors[i]}` }}
              aria-hidden="true"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------- terminal-style console ------------------- */

function Console({ title, lines }: { title: string; lines: string[] }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const id = setInterval(() => {
      setVisible((v) => (v >= lines.length ? v : v + 1));
    }, 220);
    return () => clearInterval(id);
  }, [seen, lines.length]);

  return (
    <div
      ref={ref}
      className="rounded-sm border border-mint/25 bg-[#020a0d] p-5 shadow-[0_0_40px_-15px_rgba(134,217,209,0.4)] overflow-hidden"
    >
      <div className="flex items-center justify-between border-b border-mint/15 pb-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-mint animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mint/80">{title}</span>
        </div>
        <span className="font-mono text-[10px] text-paper/40">/eyegisguard/optics</span>
      </div>
      <pre className="mt-3 font-mono text-[11.5px] leading-[1.7] text-mint/90 whitespace-pre-wrap min-h-[178px]">
        {lines.slice(0, visible).map((l, i) => (
          <div key={i}>
            <span className="text-paper/35">$ </span>
            {l}
          </div>
        ))}
        {visible < lines.length && (
          <span className="inline-block h-3 w-1.5 bg-mint animate-pulse align-middle" />
        )}
      </pre>
    </div>
  );
}

/* ------------------- telemetry counter ------------------- */

function TelemetryCard({ k, v, u, i }: { k: string; v: string; u: string; i: number }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="group relative border border-paper/10 bg-paper/[0.02] p-5 backdrop-blur-sm transition-all hover:border-mint/40 hover:bg-mint/[0.04]"
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(10px)",
        transition: `opacity .5s ease ${i * 0.06}s, transform .5s ease ${i * 0.06}s, background-color .3s, border-color .3s`,
      }}
    >
      {/* corner brackets */}
      <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-mint/60" />
      <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-mint/60" />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-mint/60" />
      <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-mint/60" />

      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/50">{k}</span>
        <span className="h-1 w-1 rounded-full bg-mint" />
      </div>
      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-editorial text-4xl md:text-5xl text-paper tabular-nums">{v}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-mint/80">{u}</span>
      </div>
    </div>
  );
}

/* ------------------- main ------------------- */

export function TechCore() {
  const { lang } = useI18n();
  const c = COPY[lang];

  return (
    <section
      id="tech-core"
      className="relative overflow-hidden bg-[#01131A] text-paper"
      aria-label="EyegisGuard technology"
    >
      {/* grid backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(134,217,209,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(134,217,209,0.09) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 40%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 40%, black 40%, transparent 85%)",
        }}
      />
      {/* teal glow */}
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[900px] rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgba(0,75,87,0.9), transparent)" }}
      />
      {/* scanlines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,1) 0, rgba(255,255,255,1) 1px, transparent 1px, transparent 3px)",
        }}
      />

      <div className="relative mx-auto max-w-[1500px] px-6 md:px-10 lg:px-14 py-28 md:py-40">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-mint">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              {c.eyebrow}
            </div>
            <h2 className="mt-6 font-editorial text-paper leading-[0.9] text-fluid-hero">
              {c.headline1}
              <br />
              <span className="italic text-mint">{c.headline2}</span>
            </h2>
          </div>
          <p className="max-w-sm text-paper/70 leading-relaxed text-base">
            {c.sub}
          </p>
        </div>

        {/* Telemetry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {c.telemetry.map((t, i) => (
            <TelemetryCard key={t.k} k={t.k} v={t.v} u={t.u} i={i} />
          ))}
        </div>

        {/* Spectrum + Console row */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-sm border border-paper/10 bg-paper/[0.02] p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint/90">
                {c.spectrum.title}
              </span>
              <span className="font-mono text-[10px] text-paper/40">λ · nm</span>
            </div>
            <Spectrum filterLabel={c.spectrum.filter} passLabel={c.spectrum.pass} />
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-paper/60">{c.spectrum.caption}</p>
          </div>

          <div className="lg:col-span-1">
            <Console title={c.console.title} lines={c.console.lines} />
          </div>
        </div>

        {/* Lens stack */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint/90">
              {c.stack.title}
            </span>
            <span className="font-mono text-[10px] text-paper/40">EGS-3.2 · CR-39</span>
          </div>
          <LensStack layers={c.stack.layers} />
        </div>

        {/* Footer bar */}
        <div className="mt-20 flex items-center justify-between border-t border-paper/10 pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">
          <span>{c.footer}</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
            SYSTEM · NOMINAL
          </span>
        </div>
      </div>
    </section>
  );
}

export default TechCore;
