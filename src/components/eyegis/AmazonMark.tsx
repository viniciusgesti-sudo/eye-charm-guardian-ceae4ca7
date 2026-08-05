import type { ImgHTMLAttributes } from "react";

const AMAZON_MARK_URL = "/amazon-logo.png";

/**
 * Amazon "a-smile" brand mark. Uses the official PNG published via
 * the app itself so Netlify, Vercel and production do not depend on the
 * Lovable-only asset proxy.
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
      src={AMAZON_MARK_URL}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`inline-block object-contain ${className}`}
      {...props}
    />
  );
}
