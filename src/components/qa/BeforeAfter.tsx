import { useRef, useState } from "react";

type Props = {
  before: string;
  after: string;
  alt: string;
  label?: string;
};

export function BeforeAfter({ before, after, alt, label }: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  };

  return (
    <figure className="w-full">
      {label && (
        <figcaption className="mb-2 text-xs uppercase tracking-[0.15em] text-[color:var(--primary)]">
          {label}
        </figcaption>
      )}
      <div
        ref={ref}
        className="relative w-full overflow-hidden rounded-lg border border-black/10 bg-black select-none"
        style={{ aspectRatio: "3 / 2" }}
        onMouseMove={(e) => e.buttons === 1 && onMove(e.clientX)}
        onMouseDown={(e) => onMove(e.clientX)}
        onTouchMove={(e) => onMove(e.touches[0].clientX)}
      >
        <img
          src={after}
          alt={`${alt} — depois`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <img
            src={before}
            alt={`${alt} — antes`}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ width: `${ref.current?.clientWidth ?? 0}px`, maxWidth: "none" }}
            loading="lazy"
          />
          <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 text-[10px] uppercase tracking-widest text-white">
            Antes
          </span>
        </div>
        <span className="absolute right-3 top-3 rounded bg-white/90 px-2 py-1 text-[10px] uppercase tracking-widest text-black">
          Depois
        </span>
        <div
          className="pointer-events-none absolute inset-y-0 w-[2px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.4)]"
          style={{ left: `calc(${pos}% - 1px)` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white text-black text-xs font-semibold flex items-center justify-center shadow">
            ↔
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Comparador ${alt}`}
          className="absolute inset-x-0 bottom-0 h-10 w-full cursor-ew-resize opacity-0"
        />
      </div>
    </figure>
  );
}
