import { useEffect, useState } from "react";

const STORAGE_KEY = "eyegis:hc";

export function HighContrastToggle({ tone = "auto" }: { tone?: "auto" | "light" | "dark" }) {
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) === "1";
    setOn(saved);
    setReady(true);
    document.documentElement.classList.toggle("hc", saved);
  }, []);

  const toggle = () => {
    const next = !on;
    setOn(next);
    document.documentElement.classList.toggle("hc", next);
    localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  };

  if (!ready) return null;

  const dark = tone === "dark" || (tone === "auto" && !on);
  const base = dark
    ? "border-paper/40 text-paper hover:bg-paper/10"
    : "border-ink/30 text-ink hover:bg-ink/5";
  const active = on ? "!bg-[#FFB300] !text-ink !border-[#FFB300]" : "";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={`High contrast mode ${on ? "on" : "off"}`}
      title="Toggle high-contrast mode"
      className={`inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-[11px] font-medium uppercase tracking-[0.15em] transition ${base} ${active}`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 3 A9 9 0 0 1 12 21 Z" fill="currentColor" />
      </svg>
      <span>HC</span>
    </button>
  );
}
