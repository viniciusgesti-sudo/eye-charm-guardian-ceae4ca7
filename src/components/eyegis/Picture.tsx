import type { ImgHTMLAttributes } from "react";

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
 */
export function Picture({ source, sizes = "100vw", priority = false, className, alt = "", ...rest }: Props) {
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
        {...rest}
      />
    </picture>
  );
}
