import type { ImgHTMLAttributes } from "react";
import amazonAsset from "@/assets/amazon-logo.png.asset.json";

/**
 * Amazon "a-smile" brand mark. Uses the official PNG published via
 * lovable-assets so button badges match Amazon's brand exactly.
 *
 * Default: square badge, sized by className (e.g. h-4 w-4).
 */
export function AmazonMark({
  className = "h-4 w-4",
  alt = "Amazon",
  ...props
}: Omit<ImgHTMLAttributes<HTMLImageElement>, "src">) {
  return (
    <img
      src={amazonAsset.url}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`inline-block object-contain ${className}`}
      {...props}
    />
  );
}
