import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dev-tokens")({
  component: DevTokensPage,
  head: () => ({
    meta: [
      { title: "Design Tokens · Eyegis" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

/* ------------------------------------------------------------------ */
/*  Palette                                                            */
/* ------------------------------------------------------------------ */

type Token = {
  key: string;
  name: string;
  hex: string;
  role: string;
  onLight: boolean; // safe to use as foreground on light surfaces
  onDark: boolean; // safe to use as foreground on dark surfaces
};

const TOKENS: Token[] = [
  { key: "teal-deep", name: "Deep Teal (deep)", hex: "#003842", role: "Primary shade / dark surface", onLight: true, onDark: false },
  { key: "teal",      name: "Deep Teal",        hex: "#004B57", role: "Primary / brand",              onLight: true, onDark: false },
  { key: "champagne", name: "Champagne",        hex: "#E2D1C3", role: "Secondary / warm surface",     onLight: false, onDark: true },
  { key: "mint",      name: "Mint",             hex: "#86D9D1", role: "Accent",                       onLight: false, onDark: true },
  { key: "ink",       name: "Obsidian (Ink)",   hex: "#1D252D", role: "Body text / dark surface",     onLight: true, onDark: false },
  { key: "paper",     name: "Off-White (Paper)",hex: "#F9F9F9", role: "Base background",              onLight: false, onDark: true },
];

const SURFACES: Array<{ key: string; label: string; bg: string; fg: string; scheme: "light" | "dark" }> = [
  { key: "paper",     label: "Off-White",   bg: "#F9F9F9", fg: "#1D252D", scheme: "light" },
  { key: "champagne", label: "Champagne",   bg: "#E2D1C3", fg: "#1D252D", scheme: "light" },
  { key: "teal",      label: "Deep Teal",   bg: "#004B57", fg: "#F9F9F9", scheme: "dark"  },
  { key: "teal-deep", label: "Deep Teal ▼", bg: "#003842", fg: "#F9F9F9", scheme: "dark"  },
  { key: "ink",       label: "Obsidian",    bg: "#1D252D", fg: "#F9F9F9", scheme: "dark"  },
];

/* ------------------------------------------------------------------ */
/*  Contrast utils (WCAG 2.1)                                          */
/* ------------------------------------------------------------------ */

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function lin(c: number) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}
function luminance(hex: string) {
  const [r, g, b] = hexToRgb(hex).map(lin) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a: string, b: string) {
  const la = luminance(a), lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}
function grade(r: number): { text: string; ui: string; tone: string } {
  const text = r >= 7 ? "AAA" : r >= 4.5 ? "AA" : "FAIL";
  const ui = r >= 3 ? "AA" : "FAIL";
  const tone = r >= 7 ? "bg-emerald-500/15 text-emerald-700" : r >= 4.5 ? "bg-emerald-500/10 text-emerald-700" : r >= 3 ? "bg-amber-500/15 text-amber-700" : "bg-rose-500/15 text-rose-700";
  return { text, ui, tone };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

function DevTokensPage() {
  return (
    <main className="min-h-dvh bg-[#F9F9F9] text-[#1D252D]">
      <header className="mx-auto max-w-[1280px] px-6 py-14 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#004B57]">§ Internal · noindex</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Design Tokens — Visual Review</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#1D252D]/70">
          Deep Teal · Champagne · Mint · Obsidian · Off-White — visualizados como superfícies, tipografia,
          links, bordas e botões com estados <em>hover</em>, <em>active</em>, <em>focus</em> e <em>disabled</em>.
          Cada célula mostra a razão de contraste e a nota WCAG.
        </p>
      </header>

      {/* Palette swatches */}
      <Section title="1 · Palette">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {TOKENS.map((t) => (
            <div key={t.key} className="overflow-hidden rounded-2xl border border-[#1D252D]/10 bg-white shadow-sm">
              <div className="h-24" style={{ background: t.hex }} />
              <div className="space-y-1 p-4">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="font-mono text-[11px] text-[#1D252D]/60">{t.hex}</p>
                <p className="font-mono text-[11px] text-[#1D252D]/60">--{t.key}</p>
                <p className="mt-2 text-[12px] leading-snug text-[#1D252D]/70">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Contrast matrix */}
      <Section title="2 · Contrast Matrix (WCAG 2.1)">
        <div className="overflow-x-auto rounded-2xl border border-[#1D252D]/10 bg-white">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="bg-[#F3EFE9] text-left">
                <th className="p-3 font-semibold">Foreground ↓ / Background →</th>
                {SURFACES.map((s) => (
                  <th key={s.key} className="p-3 text-center font-semibold">
                    <span className="inline-block h-3 w-3 rounded-sm align-middle" style={{ background: s.bg, outline: "1px solid rgba(0,0,0,.15)" }} />{" "}
                    {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOKENS.map((t) => (
                <tr key={t.key} className="border-t border-[#1D252D]/5">
                  <th className="p-3 text-left font-medium">
                    <span className="inline-block h-3 w-3 rounded-sm align-middle" style={{ background: t.hex, outline: "1px solid rgba(0,0,0,.15)" }} /> {t.name}
                  </th>
                  {SURFACES.map((s) => {
                    const r = contrast(t.hex, s.bg);
                    const g = grade(r);
                    return (
                      <td key={s.key} className="p-2 text-center align-middle">
                        <div className="rounded-lg px-3 py-3 text-[13px]" style={{ background: s.bg, color: t.hex }}>
                          <div className="font-semibold">Aa</div>
                          <div className="mt-1 font-mono text-[11px] opacity-80">{r.toFixed(2)}:1</div>
                          <div className={`mt-1 inline-block rounded-full px-2 py-[2px] font-mono text-[10px] ${g.tone}`}>
                            text {g.text} · ui {g.ui}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Typography */}
      <Section title="3 · Typography on every surface">
        <div className="grid gap-4 lg:grid-cols-2">
          {SURFACES.map((s) => (
            <article key={s.key} className="rounded-2xl border border-[#1D252D]/10 p-8" style={{ background: s.bg, color: s.fg }}>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] opacity-70">{s.label} · {s.bg}</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight">Vision, engineered with honesty.</h3>
              <p className="mt-3 text-[15px] leading-relaxed opacity-90">
                Body copy at 15px. Eyegis lenses filter high-energy blue-violet light while preserving color accuracy —
                a calm, editorial read on every brand surface.
              </p>
              <p className="mt-2 text-[13px] opacity-70">Muted / secondary copy at 13px — captions, footnotes, metadata.</p>
              <p className="mt-4 text-[15px]">
                Inline{" "}
                <a
                  href="#"
                  className="underline decoration-2 underline-offset-4 transition-colors hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ color: s.scheme === "dark" ? "#86D9D1" : "#004B57", outlineColor: s.scheme === "dark" ? "#86D9D1" : "#004B57" }}
                >
                  link with underline
                </a>{" "}
                — hover, focus-visible with 2px outline.
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Buttons */}
      <Section title="4 · Buttons — states (hover · active · focus · disabled)">
        <div className="grid gap-4 lg:grid-cols-2">
          {SURFACES.map((s) => (
            <div key={s.key} className="rounded-2xl border border-[#1D252D]/10 p-8" style={{ background: s.bg, color: s.fg }}>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] opacity-70">{s.label}</p>
              <div className="flex flex-wrap gap-3">
                <BtnPrimary scheme={s.scheme}>Primary</BtnPrimary>
                <BtnSecondary scheme={s.scheme}>Secondary</BtnSecondary>
                <BtnGhost scheme={s.scheme}>Ghost</BtnGhost>
                <BtnPrimary scheme={s.scheme} disabled>Disabled</BtnPrimary>
              </div>
              <p className="mt-3 text-[11px] opacity-60">Hover, click e Tab para verificar estados.</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Borders + Inputs */}
      <Section title="5 · Borders, dividers & inputs">
        <div className="grid gap-4 lg:grid-cols-2">
          {SURFACES.map((s) => (
            <div key={s.key} className="rounded-2xl border border-[#1D252D]/10 p-8" style={{ background: s.bg, color: s.fg }}>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] opacity-70">{s.label}</p>

              <div className="space-y-3">
                {["#004B57", "#86D9D1", "#1D252D", "#E2D1C3", "#F9F9F9"].map((c) => (
                  <div key={c} className="flex items-center gap-3">
                    <div className="h-px flex-1" style={{ background: c }} />
                    <span className="font-mono text-[10px] opacity-70">{c}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-[11px] font-mono uppercase tracking-[0.2em] opacity-80">Email</label>
                <input
                  type="email"
                  placeholder="you@eyegis.com"
                  className="w-full rounded-lg border bg-transparent px-4 py-2.5 text-[14px] outline-none transition-colors placeholder:opacity-50 focus:outline-2 focus:outline-offset-2"
                  style={{
                    borderColor: s.scheme === "dark" ? "rgba(249,249,249,0.35)" : "rgba(29,37,45,0.25)",
                    color: s.fg,
                    outlineColor: s.scheme === "dark" ? "#86D9D1" : "#004B57",
                  }}
                />
                <p className="mt-2 text-[11px] opacity-60">Focus mostra outline em Mint (dark) ou Deep Teal (light).</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <footer className="mx-auto max-w-[1280px] px-6 py-16 md:px-10">
        <p className="text-[12px] text-[#1D252D]/60">
          Página interna — <span className="font-mono">/dev-tokens</span> · noindex, nofollow.
        </p>
      </footer>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-8 md:px-10">
      <h2 className="mb-6 text-[13px] font-mono uppercase tracking-[0.28em] text-[#004B57]">{title}</h2>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Buttons                                                            */
/* ------------------------------------------------------------------ */

type BtnProps = { scheme: "light" | "dark"; disabled?: boolean; children: React.ReactNode };

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2";

function BtnPrimary({ scheme, disabled, children }: BtnProps) {
  const dark = scheme === "dark";
  return (
    <button
      disabled={disabled}
      className={`group relative rounded-full px-5 py-2.5 text-[13px] font-medium uppercase tracking-[0.14em] transition-all ${focusRing} disabled:cursor-not-allowed disabled:opacity-40`}
      style={{
        background: dark ? "#86D9D1" : "#004B57",
        color: dark ? "#003842" : "#F9F9F9",
        outlineColor: dark ? "#F9F9F9" : "#004B57",
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(0)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <span className="relative">{children}</span>
    </button>
  );
}

function BtnSecondary({ scheme, disabled, children }: BtnProps) {
  const dark = scheme === "dark";
  return (
    <button
      disabled={disabled}
      className={`rounded-full border px-5 py-2.5 text-[13px] font-medium uppercase tracking-[0.14em] transition-colors hover:bg-current/10 ${focusRing} disabled:cursor-not-allowed disabled:opacity-40`}
      style={{
        borderColor: dark ? "#E2D1C3" : "#004B57",
        color: dark ? "#E2D1C3" : "#004B57",
        outlineColor: dark ? "#86D9D1" : "#004B57",
      }}
    >
      {children}
    </button>
  );
}

function BtnGhost({ scheme, disabled, children }: BtnProps) {
  const dark = scheme === "dark";
  return (
    <button
      disabled={disabled}
      className={`rounded-full px-4 py-2.5 text-[13px] font-medium uppercase tracking-[0.14em] transition-colors ${focusRing} disabled:cursor-not-allowed disabled:opacity-40`}
      style={{
        color: dark ? "#F9F9F9" : "#1D252D",
        outlineColor: dark ? "#86D9D1" : "#004B57",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = dark ? "rgba(249,249,249,0.08)" : "rgba(29,37,45,0.06)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {children}
    </button>
  );
}
