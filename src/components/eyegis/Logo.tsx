import { useEffect, useRef, useState } from "react";
import shieldMonoImg from "@/assets/brand/eyegis-shield-mono.png";
import shieldColorImg from "@/assets/brand/eyegis-shield-color.jpg";

/**
 * Eyegis brand mark + wordmark.
 *
 * The mark is the OFFICIAL Eyegis shield from the brand kit, rendered via
 * CSS `mask-image` so it always inherits `currentColor`.
 *
 * `tone` controls how the logo adapts to its background:
 *   - "auto"  → detects the nearest opaque ancestor background and picks
 *              ink (#1D252D) on light surfaces or paper (#F9F9F9) on dark
 *              surfaces. Falls back to `currentColor` before hydration.
 *   - "light" → forces paper (for dark backgrounds).
 *   - "dark"  → forces ink (for light backgrounds).
 *   - "inherit" → legacy behavior, keeps `currentColor` (parent controls it).
 *
 * variant="color" swaps to the official raster hero version for decorative
 * uses like loading splash / share cards.
 */

const INK = "#1D252D";
const PAPER = "#F9F9F9";

function relativeLuminance(r: number, g: number, b: number) {
  const toLin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
}

function parseRgb(input: string): [number, number, number, number] | null {
  const m = input.match(/rgba?\(([^)]+)\)/i);
  if (!m) return null;
  const parts = m[1].split(",").map((p) => parseFloat(p.trim()));
  if (parts.length < 3) return null;
  const [r, g, b, a = 1] = parts;
  return [r, g, b, a];
}

function detectBackgroundTone(el: HTMLElement | null): "light" | "dark" | null {
  if (!el || typeof window === "undefined") return null;
  let node: HTMLElement | null = el.parentElement;
  while (node && node !== document.body.parentElement) {
    const bg = window.getComputedStyle(node).backgroundColor;
    const rgba = parseRgb(bg);
    if (rgba && rgba[3] > 0.5) {
      const lum = relativeLuminance(rgba[0], rgba[1], rgba[2]);
      return lum > 0.55 ? "light" : "dark";
    }
    node = node.parentElement;
  }
  // Fallback: body / prefers-color-scheme
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

export function Logo({
  className,
  showMark = true,
  showWordmark = true,
  variant = "mono",
  tone = "auto",
  title = "Eyegis",
}: {
  className?: string;
  showMark?: boolean;
  showWordmark?: boolean;
  variant?: "mono" | "color";
  tone?: "auto" | "light" | "dark" | "inherit";
  title?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [detected, setDetected] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    if (tone !== "auto") return;
    const update = () => setDetected(detectBackgroundTone(ref.current));
    update();

    // Re-check when the page scrolls (header often changes bg on scroll)
    // or when the viewport resizes.
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    mq?.addEventListener?.("change", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mq?.removeEventListener?.("change", update);
    };
  }, [tone]);

  const resolvedColor = (() => {
    if (tone === "inherit") return undefined;
    if (tone === "light") return PAPER;
    if (tone === "dark") return INK;
    // auto
    if (detected === "dark") return PAPER;
    if (detected === "light") return INK;
    return undefined; // pre-hydration → currentColor
  })();

  return (
    <span
      ref={ref}
      role="img"
      aria-label={title}
      className={"inline-flex items-center gap-2 " + (className ?? "")}
      style={{ color: resolvedColor ?? "currentColor" }}
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
            className="inline-block h-full aspect-square transition-[background-color] duration-200"
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
          className="transition-colors duration-200"
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
