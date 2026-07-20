import shieldMonoImg from "@/assets/brand/eyegis-shield-mono.png";
import shieldColorImg from "@/assets/brand/eyegis-shield-color.jpg";

/**
 * Eyegis brand mark + wordmark.
 *
 * The mark is the OFFICIAL Eyegis shield from the brand kit
 * (Drive › Logos › Making Of › Eyegis_mono_black.png). Rendered via CSS
 * `mask-image` so it always inherits `currentColor` — legible on paper,
 * teal, or ink backgrounds without duplicate assets.
 *
 * variant="color" swaps to the official raster hero version for decorative
 * uses like loading splash / share cards.
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
          <span
            aria-hidden="true"
            className="inline-block h-full aspect-square"
            style={{
              backgroundColor: "currentColor",
              WebkitMaskImage: `url(${shieldMonoImg})`,
              maskImage: `url(${shieldMonoImg})`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />
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

export default Logo;
