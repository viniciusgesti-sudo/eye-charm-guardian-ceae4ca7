import { useRef, useState } from "react";

type Props = {
  before: string;
  after: string;
  alt: string;
  label?: string;
  /** Zoom multiplier on hover. Default 2.5x */
  zoom?: number;
};

/**
 * Lado a lado (sem slider) com zoom em hover.
 * Ao passar o mouse sobre uma imagem, ela amplia mantendo o ponto sob o cursor.
 * Em telas pequenas, empilha verticalmente.
 */
export function SideBySide({ before, after, alt, label, zoom = 2.5 }: Props) {
  return (
    <figure className="w-full">
      {label && (
        <figcaption className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.15em] text-[color:var(--primary)]">
          <span>{label}</span>
          <span className="text-[10px] tracking-widest text-black/50">
            hover para ampliar {zoom}×
          </span>
        </figcaption>
      )}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ZoomPane src={before} alt={`${alt} — antes`} tag="Antes" tagTone="dark" zoom={zoom} />
        <ZoomPane src={after} alt={`${alt} — depois`} tag="Depois" tagTone="light" zoom={zoom} />
      </div>
    </figure>
  );
}

function ZoomPane({
  src,
  alt,
  tag,
  tagTone,
  zoom,
}: {
  src: string;
  alt: string;
  tag: string;
  tagTone: "dark" | "light";
  zoom: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  const onMove = (clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setOrigin({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-lg border border-black/10 bg-black"
      style={{ aspectRatio: "3 / 2" }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseMove={(e) => onMove(e.clientX, e.clientY)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
      onTouchMove={(e) => {
        const t = e.touches[0];
        if (t) onMove(t.clientX, t.clientY);
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-150 ease-out will-change-transform"
        style={{
          transform: active ? `scale(${zoom})` : "scale(1)",
          transformOrigin: `${origin.x}% ${origin.y}%`,
        }}
      />
      <span
        className={`pointer-events-none absolute left-3 top-3 rounded px-2 py-1 text-[10px] uppercase tracking-widest ${
          tagTone === "dark" ? "bg-black/70 text-white" : "bg-white/90 text-black"
        }`}
      >
        {tag}
      </span>
      {active && (
        <span className="pointer-events-none absolute right-3 top-3 rounded bg-[color:var(--primary)] px-2 py-1 text-[10px] uppercase tracking-widest text-white">
          {zoom}×
        </span>
      )}
    </div>
  );
}
