import { useEffect, useState, type ImgHTMLAttributes, type SyntheticEvent } from "react";

import { useMediaOverride } from "@/lib/cms";

export type PictureSource = {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
};

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
  source: PictureSource | string;
  mobileSource?: string;
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
  mobileSource,
  sizes = "100vw",
  priority = false,
  className,
  alt = "",
  onLoad,
  onError,
  ...rest
}: Props) {
  const [failed, setFailed] = useState(false);
  const localSourceUrl = typeof source === "string" ? source : source.img.src;
  const mediaOverride = useMediaOverride(localSourceUrl);
  const remoteSource = typeof source === "string" ? source : mediaOverride?.url?.trim();
  const remoteMobileSource = mobileSource?.trim() || mediaOverride?.mobileUrl?.trim();
  const resolvedAlt = mediaOverride?.alt?.trim() || alt;
  const width = typeof source === "string" ? rest.width : source.img.w;
  const height = typeof source === "string" ? rest.height : source.img.h;

  useEffect(() => {
    setFailed(false);
  }, [localSourceUrl, remoteMobileSource, remoteSource]);

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
        aria-label={resolvedAlt || undefined}
        className={`flex items-center justify-center bg-teal-deep/10 text-teal-deep/60 text-xs font-eyebrow tracking-wider p-4 text-center ${className ?? ""}`}
        style={width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
      >
        <span className="max-w-[28ch] leading-relaxed">{resolvedAlt || "Image unavailable"}</span>
      </div>
    );
  }

  if (remoteSource) {
    return (
      <picture>
        {remoteMobileSource && <source media="(max-width: 767px)" srcSet={remoteMobileSource} />}
        <img
          src={remoteSource}
          width={width}
          height={height}
          alt={resolvedAlt}
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

  if (typeof source === "string") {
    return null;
  }

  return (
    <picture>
      {remoteMobileSource && <source media="(max-width: 767px)" srcSet={remoteMobileSource} />}
      {Object.entries(source.sources).map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        src={source.img.src}
        width={source.img.w}
        height={source.img.h}
        alt={resolvedAlt}
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
