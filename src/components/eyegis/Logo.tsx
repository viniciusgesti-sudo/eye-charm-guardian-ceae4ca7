import { useEffect, useRef, useState } from "react";
import shieldMonoImg from "@/assets/brand/eyegis-shield-mono.png";
import shieldColorImg from "@/assets/brand/eyegis-shield-color.jpg";

/**
 * Inline SVG fallback for the Eyegis shield. Rendered when the raster
 * mask asset fails to load so the mark is never invisible. Uses
 * `currentColor` so tone detection still applies.
 */
function ShieldFallback({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 104"
      aria-hidden="true"
      className={className}
      style={{ display: "block" }}
      fill="none"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinejoin="round"
    >
      {/* Shield silhouette */}
      <path d="M50 4 6 14v34c0 26 20 44 44 52 24-8 44-26 44-52V14L50 4Z" />
      {/* G crossbar */}
      <path d="M52 44h34" strokeWidth="10" strokeLinecap="butt" />
      <path d="M52 60h26" strokeWidth="10" strokeLinecap="butt" />
    </svg>
  );
}



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

function contrastRatio(l1: number, l2: number) {
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

const INK_LUM = relativeLuminance(0x1d, 0x25, 0x2d);
const PAPER_LUM = relativeLuminance(0xf9, 0xf9, 0xf9);

function detectBackgroundTone(el: HTMLElement | null): "light" | "dark" | null {
  if (!el || typeof window === "undefined") return null;
  let node: HTMLElement | null = el.parentElement;
  while (node && node !== document.body.parentElement) {
    const bg = window.getComputedStyle(node).backgroundColor;
    const rgba = parseRgb(bg);
    if (rgba && rgba[3] > 0.5) {
      const lum = relativeLuminance(rgba[0], rgba[1], rgba[2]);
      // Pick the tone (ink vs paper) that yields the higher contrast
      // ratio against the actual background. This handles mid-tone
      // surfaces like champagne (#E2D1C3) where a fixed luminance cutoff
      // would otherwise misclassify and drop below WCAG AA.
      const inkContrast = contrastRatio(lum, INK_LUM);
      const paperContrast = contrastRatio(lum, PAPER_LUM);
      return paperContrast > inkContrast ? "dark" : "light";
    }
    node = node.parentElement;
  }
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
  const [markStatus, setMarkStatus] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    if (tone !== "auto") return;
    const update = () => setDetected(detectBackgroundTone(ref.current));
    update();
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

  // Preload the mono mask asset so we can detect failure (mask-image has no
  // error hook) and provide the inline SVG fallback instead of a blank square.
  useEffect(() => {
    if (!showMark || variant !== "mono") return;
    const img = new Image();
    let cancelled = false;
    img.onload = () => { if (!cancelled) setMarkStatus("loaded"); };
    img.onerror = () => { if (!cancelled) setMarkStatus("error"); };
    img.src = shieldMonoImg;
    if (img.complete && img.naturalWidth > 0) setMarkStatus("loaded");
    return () => { cancelled = true; };
  }, [showMark, variant]);

  const resolvedColor = (() => {
    if (tone === "inherit") return undefined;
    if (tone === "light") return PAPER;
    if (tone === "dark") return INK;
    if (detected === "dark") return PAPER;
    if (detected === "light") return INK;
    return undefined;
  })();

  const renderMark = () => {
    if (!showMark) return null;

    if (variant === "color") {
      return (
        <span
          aria-hidden="true"
          className="relative inline-block h-full aspect-square overflow-hidden"
        >
          {markStatus !== "error" ? (
            <img
              src={shieldColorImg}
              alt=""
              aria-hidden="true"
              width={64}
              height={64}
              className={
                "h-full w-full object-contain transition-opacity duration-200 " +
                (markStatus === "loaded" ? "opacity-100" : "opacity-0")
              }
              draggable={false}
              onLoad={() => setMarkStatus("loaded")}
              onError={() => setMarkStatus("error")}
            />
          ) : (
            <ShieldFallback className="h-full w-full" />
          )}
          {markStatus === "loading" && (
            <span
              aria-hidden="true"
              className="absolute inset-0 animate-pulse rounded-sm"
              style={{ backgroundColor: "currentColor", opacity: 0.12 }}
            />
          )}
        </span>
      );
    }

    // mono
    if (markStatus === "error") {
      return <ShieldFallback className="h-full aspect-square" />;
    }
    return (
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
    );
  };

  return (
    <span
      ref={ref}
      role="img"
      aria-label={title}
      className={"inline-flex items-center gap-2 " + (className ?? "")}
      style={{ color: resolvedColor ?? "currentColor" }}
    >
      {renderMark()}

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

