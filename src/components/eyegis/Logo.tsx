import shieldColorImg from "@/assets/brand/eyegis-shield-color.jpg";

/**
 * Eyegis brand mark + wordmark.
 *
 * The mark is an inline SVG recreation of the OFFICIAL Eyegis shield-E crest
 * from the brand kit (Drive › Logos › Making Of › Eyegis_mono_black.png).
 * Being inline SVG, the shield inherits `currentColor` and scales cleanly on
 * any background — no PNG rasterization, no blend-mode hacks.
 *
 * variant="color" swaps to the cyan gradient hero version (raster) for
 * decorative uses like the loading splash or share cards.
 */
export function Logo({
  className,
  showMark = true,
  showWordmark = true,
  variant = "mono",
  title = "Eyegis",
}: {
  className?: string;
  showMark?: boolean;
  showWordmark?: boolean;
  variant?: "mono" | "color";
  title?: string;
}) {
  return (
    <span
      role="img"
      aria-label={title}
      className={"inline-flex items-center gap-2 " + (className ?? "")}
      style={{ color: "currentColor" }}
    >
      {showMark &&
        (variant === "color" ? (
          <img
            src={shieldColorImg}
            alt=""
            aria-hidden="true"
            className="h-full w-auto object-contain"
            draggable={false}
          />
        ) : (
          <ShieldMark title={title} />
        ))}

      {showWordmark && (
        <span
          style={{
            fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif",
            fontWeight: 600,
            letterSpacing: "0.32em",
            color: "currentColor",
            lineHeight: 1,
          }}
        >
          EYEGIS
        </span>
      )}
    </span>
  );
}

/** Inline SVG shield-E crest, uses currentColor. */
function ShieldMark({ title }: { title: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label={title}
      className="h-full w-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* Shield outline — rounded shoulders, tapered point.
          Stroke inherits currentColor. */}
      <path
        d="M18 18
           Q 18 14 22 14
           L 78 14
           Q 82 14 82 18
           L 82 46
           Q 82 72 50 90
           Q 18 72 18 46 Z"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Three angled bars forming the stylized "E".
          Each bar is a parallelogram skewed ~18° right.
          Bars break through the shield's right edge for the brand's
          signature "energy escaping" silhouette. */}
      <g fill="currentColor">
        <polygon points="48,30 92,30 88,40 44,40" />
        <polygon points="48,45 92,45 88,55 44,55" />
        <polygon points="48,60 84,60 80,70 44,70" />
      </g>
    </svg>
  );
}

export default Logo;
