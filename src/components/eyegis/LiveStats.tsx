import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/context";
import { AMAZON_RATING } from "@/lib/amazon";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  hint: string;
};

function useCountUp(target: number, active: boolean, decimals = 0) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const loop = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);
  return decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString("en");
}

function StatCell({ stat, active }: { stat: Stat; active: boolean }) {
  const val = useCountUp(stat.value, active, stat.decimals ?? 0);
  return (
    <div className="group relative border-t border-paper/10 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint/80">
        {stat.label}
      </div>
      <div className="mt-3 flex items-baseline gap-1 font-editorial text-paper">
        {stat.prefix && <span className="text-2xl opacity-70">{stat.prefix}</span>}
        <span className="text-5xl md:text-6xl tracking-tight">{val}</span>
        {stat.suffix && <span className="text-2xl opacity-70">{stat.suffix}</span>}
      </div>
      <div className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-paper/50">
        {stat.hint}
      </div>
      <div className="absolute -top-px left-0 h-px w-8 bg-mint opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:top-0 md:h-8 md:w-px md:-left-px" />
    </div>
  );
}

export function LiveStats() {
  const { lang } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setActive(true),
      { threshold: 0.25 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const copy = {
    en: {
      eyebrow: "System · Live Data",
      title: "Numbers that back the science.",
      sub: "Independent lab measurements and verified Amazon customer data.",
      stats: [
        { label: "Amazon Rating", value: AMAZON_RATING.stars, decimals: 1, suffix: "★", hint: `${AMAZON_RATING.count.toLocaleString("en")} verified reviews` },
        { label: "Blue Light Filtered", value: 92, suffix: "%", hint: "400–455 nm range · tested" },
        { label: "Pairs Delivered", value: 104000, suffix: "+", hint: "since 2024 · 8 marketplaces" },
        { label: "Frame Weight", value: 18, suffix: "g", hint: "TR90 · virtually weightless" },
      ] as Stat[],
    },
    pt: {
      eyebrow: "Sistema · Dados ao vivo",
      title: "Números que sustentam a ciência.",
      sub: "Medições de laboratório independentes e dados verificados da Amazon.",
      stats: [
        { label: "Avaliação Amazon", value: AMAZON_RATING.stars, decimals: 1, suffix: "★", hint: `${AMAZON_RATING.count.toLocaleString("pt-BR")} avaliações verificadas` },
        { label: "Luz Azul Filtrada", value: 92, suffix: "%", hint: "faixa 400–455 nm · testado" },
        { label: "Pares Entregues", value: 104000, suffix: "+", hint: "desde 2024 · 8 marketplaces" },
        { label: "Peso da Armação", value: 18, suffix: "g", hint: "TR90 · praticamente sem peso" },
      ] as Stat[],
    },
    fr: {
      eyebrow: "Système · Données en direct",
      title: "Des chiffres qui prouvent la science.",
      sub: "Mesures de laboratoire indépendantes et données Amazon vérifiées.",
      stats: [
        { label: "Note Amazon", value: AMAZON_RATING.stars, decimals: 1, suffix: "★", hint: `${AMAZON_RATING.count.toLocaleString("fr-FR")} avis vérifiés` },
        { label: "Lumière Bleue Filtrée", value: 92, suffix: "%", hint: "plage 400–455 nm · testé" },
        { label: "Paires Livrées", value: 104000, suffix: "+", hint: "depuis 2024 · 8 marketplaces" },
        { label: "Poids de la Monture", value: 18, suffix: "g", hint: "TR90 · quasi impondérable" },
      ] as Stat[],
    },
  } as const;

  const c = copy[lang.toLowerCase() as keyof typeof copy] ?? copy.en;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ink py-24 text-paper md:py-32"
      aria-labelledby="live-stats-title"
    >
      {/* HUD grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* teal glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-teal/20 blur-[140px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-mint">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
              </span>
              {c.eyebrow}
            </div>
            <h2
              id="live-stats-title"
              className="mt-5 font-editorial text-4xl leading-[1.05] md:text-6xl"
            >
              {c.title}
            </h2>
          </div>
          <p className="max-w-md font-mono text-[11px] uppercase tracking-[0.14em] leading-relaxed text-paper/55">
            {c.sub}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-4 md:gap-0">
          {c.stats.map((s, i) => (
            <StatCell key={i} stat={s} active={active} />
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-paper/10 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/40">
          <span>ISO 12312-1</span>
          <span className="text-paper/20">/</span>
          <span>CE EN 166</span>
          <span className="text-paper/20">/</span>
          <span>FDA registered</span>
          <span className="text-paper/20">/</span>
          <span>Amazon Verified</span>
          <span className="ml-auto text-mint/70">SYS · OK</span>
        </div>
      </div>
    </section>
  );
}
