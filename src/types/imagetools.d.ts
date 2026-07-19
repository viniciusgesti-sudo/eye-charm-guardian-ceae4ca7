// Central type declarations for vite-imagetools and asset URL imports.
// Keep the shape here in sync with `PictureSource` in
// `src/components/eyegis/Picture.tsx` — the canonical runtime consumer.

type ImagetoolsPictureSource = {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
};

// Any query string that ends with `as=picture` (regardless of preceding
// params) resolves to a PictureSource. This is what `?w=...&format=...&as=picture`
// imports return.
declare module "*&as=picture" {
  const value: ImagetoolsPictureSource;
  export default value;
}
declare module "*?as=picture" {
  const value: ImagetoolsPictureSource;
  export default value;
}

// `?url` — force URL import (string). Prefer this over the default asset
// import when you need just an href (e.g. og:image, background-image).
declare module "*?url" {
  const src: string;
  export default src;
}

// `?w=...` / `?format=...` without `as=picture` returns a plain URL string.
// (imagetools default output when no `as` directive is present.)
declare module "*&format=*" {
  const src: string;
  export default src;
}
declare module "*&w=*" {
  const src: string;
  export default src;
}
