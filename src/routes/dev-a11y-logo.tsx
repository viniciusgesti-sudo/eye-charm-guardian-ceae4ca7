import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/eyegis/Logo";

// Internal accessibility harness — not linked from the site. Renders the
// Logo mark + wordmark on every brand background token so a Playwright
// visual-regression script can sample the actual rendered pixels and verify
// WCAG contrast (AA graphics ≥ 3:1, AA text ≥ 4.5:1) at each breakpoint.

const SURFACES: { id: string; label: string; bg: string; hex: string }[] = [
  { id: "paper",       label: "paper",       bg: "bg-paper",       hex: "#F9F9F9" },
  { id: "champagne",   label: "champagne",   bg: "bg-champagne",   hex: "#E2D1C3" },
  { id: "mint",        label: "mint",        bg: "bg-mint",        hex: "#86D9D1" },
  { id: "copper",      label: "copper",      bg: "bg-copper",      hex: "#B4956B" },
  { id: "copper-deep", label: "copper-deep", bg: "bg-copper-deep", hex: "#8A6E4A" },
  { id: "teal",        label: "teal",        bg: "bg-teal",        hex: "#004B57" },
  { id: "teal-deep",   label: "teal-deep",   bg: "bg-teal-deep",   hex: "#003842" },
  { id: "ink",         label: "ink",         bg: "bg-ink",         hex: "#1D252D" },
  { id: "black",       label: "black",       bg: "bg-black",       hex: "#000000" },
];

function Harness() {
  return (
    <main className="min-h-screen bg-white p-6 font-sans">
      <h1 className="mb-6 text-lg font-semibold text-ink">
        Logo contrast harness
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {SURFACES.map((s) => (
          <section
            key={s.id}
            data-swatch={s.id}
            data-bg-hex={s.hex}
            className={`${s.bg} rounded-xl p-8`}
          >
            <div className="mb-4 flex items-center justify-between text-xs opacity-70">
              <span className="font-mono">{s.label}</span>
              <span className="font-mono">{s.hex}</span>
            </div>
            <div
              data-logo-slot="mark+word"
              className="flex h-12 items-center"
            >
              <Logo className="h-full text-base" />
            </div>
            <div
              data-logo-slot="mark-only"
              className="mt-6 flex h-10 items-center"
            >
              <Logo showWordmark={false} className="h-full" />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

export const Route = createFileRoute("/dev-a11y-logo")({
  head: () => ({
    meta: [
      { title: "Logo A11y Harness" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Harness,
});
