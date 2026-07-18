import { useState, type ImgHTMLAttributes, type SyntheticEvent } from "react";

export type PictureSource = {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
};

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
  source: PictureSource;
  sizes?: string;
  /** Set true for the LCP image; adds fetchpriority=high and eager loading. */
  priority?: boolean;
};

/**
 * Responsive <picture> that consumes the output of
 *   import xyz from "@/assets/foo.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture"
 *
 * Automatically injects AVIF → WebP → fallback source order,
 * lazy loading + async decoding by default, and preserves intrinsic dimensions.
 * If the fallback <img> fails to decode (naturalWidth === 0), renders a
 * neutral placeholder with the alt text so layout never collapses.
 */
export function Picture({
  source,
  sizes = "100vw",
  priority = false,
  className,
  alt = "",
  onLoad,
  onError,
  ...rest
}: Props) {
  const [failed, setFailed] = useState(false);

  const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    if (e.currentTarget.naturalWidth === 0) setFailed(true);
    onLoad?.(e);
  };
  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    setFailed(true);
    onError?.(e);
  };

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt || undefined}
        className={`flex items-center justify-center bg-teal-deep/10 text-teal-deep/60 text-xs font-eyebrow tracking-wider p-4 text-center ${className ?? ""}`}
        style={{ aspectRatio: `${source.img.w} / ${source.img.h}` }}
      >
        <span className="max-w-[28ch] leading-relaxed">{alt || "Image unavailable"}</span>
      </div>
    );
  }

  return (
    <picture>
      {Object.entries(source.sources).map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        src={source.img.src}
        width={source.img.w}
        height={source.img.h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
      />
    </picture>
  );
}
