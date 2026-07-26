import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/context";

/**
 * Consolidates the deep-dive tech sections behind a tabbed panel so the
 * /technology page collapses from ~27 screens to ~7. Only the active tab
 * mounts its heavy subtree; switching tabs lazy-loads the next one and
 * unmounts the previous. No content is lost — everything remains reachable.
 *
 * Order and grouping mirror the previous linear flow:
 *   1. Spectrum   → SpectrumSignature (interactive lens)
 *   2. Science    → HonestScience + ScienceInPractice (references)
 *   3. Guard      → EyegisGuard (Retina vs Circadian comparison)
 *   4. Macro      → (rendered inline where relevant elsewhere) → HowItWorks
 *   5. Flow       → HowItWorks step-by-step
 */

const SpectrumSignature = lazy(() =>
  import("@/components/eyegis/SpectrumSignature").then((m) => ({ default: m.SpectrumSignature })),
);
const HonestScience = lazy(() =>
  import("@/components/eyegis/HonestScience").then((m) => ({ default: m.HonestScience })),
);
const ScienceInPractice = lazy(() =>
  import("@/components/eyegis/ScienceInPractice").then((m) => ({ default: m.ScienceInPractice })),
);
const EyegisGuard = lazy(() =>
  import("@/components/eyegis/EyegisGuard").then((m) => ({ default: m.EyegisGuard })),
);
const HowItWorks = lazy(() =>
  import("@/components/eyegis/HowItWorks").then((m) => ({ default: m.HowItWorks })),
);

type TabId = "spectrum" | "science" | "guard" | "flow";

const LABELS: Record<"PT" | "EN" | "FR", Record<TabId, string>> = {
  PT: { spectrum: "Espectro", science: "Ciência", guard: "E-Guard", flow: "Como funciona" },
  EN: { spectrum: "Spectrum", science: "Science", guard: "E-Guard", flow: "How it works" },
  FR: { spectrum: "Spectre", science: "Science", guard: "E-Guard", flow: "Fonctionnement" },
};

const EYEBROW: Record<"PT" | "EN" | "FR", string> = {
  PT: "Aprofunde-se",
  EN: "Go deeper",
  FR: "Approfondir",
};

const TABS: TabId[] = ["spectrum", "science", "guard", "flow"];

export function TechnologyDeepDive() {
  const { lang } = useI18n();
  const labels = LABELS[lang] ?? LABELS.EN;
  const eyebrow = EYEBROW[lang] ?? EYEBROW.EN;

  // Hydrate initial tab from URL (?tab=science) so anchors + shares work.
  const [active, setActive] = useState<TabId>(() => {
    if (typeof window === "undefined") return "spectrum";
    const q = new URL(window.location.href).searchParams.get("tab") as TabId | null;
    return q && TABS.includes(q) ? q : "spectrum";
  });

  const panelRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<Record<TabId, HTMLButtonElement | null>>({
    spectrum: null,
    science: null,
    guard: null,
    flow: null,
  });

  // Reflect active tab in URL without a reload (share-friendly, back-safe).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const current = url.searchParams.get("tab");
    if (active === "spectrum" && current) {
      url.searchParams.delete("tab");
      window.history.replaceState(window.history.state, "", url.toString());
    } else if (active !== "spectrum" && current !== active) {
      url.searchParams.set("tab", active);
      window.history.replaceState(window.history.state, "", url.toString());
    }
  }, [active]);

  function onKeyDown(e: React.KeyboardEvent) {
    const i = TABS.indexOf(active);
    if (i < 0) return;
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % TABS.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    else return;
    e.preventDefault();
    const id = TABS[next];
    setActive(id);
    // Move focus to the newly active tab per WAI-ARIA tabs pattern.
    requestAnimationFrame(() => tabsRef.current[id]?.focus());
  }

  return (
    <section
      id="deep-dive"
      aria-labelledby="deep-dive-title"
      className="relative"
      style={{ background: "#F9F9F9" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <header className="text-center">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.32em]"
            style={{ color: "#004B57" }}
          >
            {eyebrow}
          </span>
          <h2
            id="deep-dive-title"
            className="mt-3 text-balance text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1]"
            style={{ color: "#1D252D", fontFamily: "Montserrat, system-ui, sans-serif" }}
          >
            {lang === "PT"
              ? "Explore cada camada da nossa engenharia"
              : lang === "FR"
                ? "Explorez chaque couche de notre ingénierie"
                : "Explore each layer of our engineering"}
          </h2>
        </header>

        {/* Tab strip */}
        <div
          role="tablist"
          aria-label={labels.spectrum}
          onKeyDown={onKeyDown}
          className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2 rounded-full border border-black/5 bg-white p-1.5 shadow-sm"
        >
          {TABS.map((id) => {
            const isActive = id === active;
            return (
              <button
                key={id}
                ref={(el) => {
                  tabsRef.current[id] = el;
                }}
                role="tab"
                type="button"
                id={`tab-${id}`}
                aria-selected={isActive}
                aria-controls={`panel-${id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(id)}
                className="rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004B57]/40"
                style={{
                  background: isActive ? "#004B57" : "transparent",
                  color: isActive ? "#F9F9F9" : "#1D252D",
                }}
              >
                {labels[id]}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          ref={panelRef}
          role="tabpanel"
          id={`panel-${active}`}
          aria-labelledby={`tab-${active}`}
          className="mt-10"
        >
          <Suspense
            fallback={
              <div
                aria-hidden
                className="mx-auto h-64 max-w-4xl animate-pulse rounded-2xl bg-black/5"
              />
            }
          >
            {active === "spectrum" && <SpectrumSignature />}
            {active === "science" && (
              <>
                <HonestScience />
                <ScienceInPractice />
              </>
            )}
            {active === "guard" && <EyegisGuard />}
            {active === "flow" && <HowItWorks />}
          </Suspense>
        </div>
      </div>
    </section>
  );
}
