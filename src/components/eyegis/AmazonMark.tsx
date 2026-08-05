import type { ImgHTMLAttributes } from "react";
import amazonAsset from "@/assets/amazon-logo.png.asset.json";

/**
 * Amazon "a-smile" brand mark. Uses the official PNG published via
 * lovable-assets so button badges match Amazon's brand exactly.
 *
 * Default: square badge, sized by className (e.g. h-4 w-4).
 */
type Tone = "brand" | "dark" | "light";

const TONE_FILTER: Record<Tone, string> = {
  /** Original Amazon orange artwork — only for light/neutral surfaces. */
  brand: "",
  /** Solid ink silhouette — use on light backgrounds (paper, mint, white). */
  dark: "[filter:brightness(0)_saturate(0)]",
  /** Solid white silhouette — use on dark backgrounds (teal, ink). */
  light: "[filter:brightness(0)_saturate(0)_invert(1)]",
};

export function AmazonMark({
  className = "h-4 w-4",
  alt = "Amazon",
  tone = "brand",
  ...props
}: Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & { tone?: Tone }) {
  return (
    <img
      src={amazonAsset.url}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`inline-block object-contain ${TONE_FILTER[tone]} ${className}`}
      {...props}
    />
  );
}
