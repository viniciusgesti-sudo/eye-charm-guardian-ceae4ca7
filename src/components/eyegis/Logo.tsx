import shieldMono from "@/assets/brand/eyegis-shield-mono.png";
import shieldColor from "@/assets/brand/eyegis-shield-color.jpg";

/**
 * Eyegis brand mark + wordmark.
 * Uses the OFFICIAL shield-E crest supplied in the brand kit.
 * - `variant="mono"` (default): black shield, inherits currentColor for wordmark.
 * - `variant="color"`: cyan gradient shield (original brand color version).
 * The wordmark uses Montserrat with brand tracking.
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
  const src = variant === "color" ? shieldColor : shieldMono;

  return (
    <span
      role="img"
      aria-label={title}
      className={
        "inline-flex items-center gap-2 " + (className ?? "")
      }
    >
      {showMark && (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="h-full w-auto object-contain"
          style={{
            // mono variant uses PNG with black artwork on white — blend so
            // it inherits currentColor cleanly on any background.
            mixBlendMode: variant === "mono" ? "multiply" : "normal",
          }}
          draggable={false}
        />
      )}

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

export default Logo;
