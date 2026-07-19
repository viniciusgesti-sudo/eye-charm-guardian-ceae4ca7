import type { PictureSource } from "@/components/eyegis/Picture";

/**
 * Typed helper for `?as=picture` imports.
 *
 * Use at import sites when you want a compile-time guarantee that a value
 * conforms to `PictureSource` — TypeScript will error if the imported shape
 * ever drifts (e.g. someone drops `&as=picture` and gets a string back).
 *
 * @example
 *   import heroRaw from "@/assets/hero.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
 *   export const hero = definePicture(heroRaw);
 */
export function definePicture(source: PictureSource): PictureSource {
  if (import.meta.env.DEV) assertPictureSource(source);
  return source;
}

/**
 * Typed helper for records/arrays of picture sources. Preserves the key
 * union so downstream consumers keep autocomplete on the map keys.
 *
 * @example
 *   export const PERSONAS = definePictureMap({
 *     business: businessRaw,
 *     creative: creativeRaw,
 *   });
 *   // typeof PERSONAS = Record<"business" | "creative", PictureSource>
 */
export function definePictureMap<K extends string>(
  map: Record<K, PictureSource>,
): Record<K, PictureSource> {
  if (import.meta.env.DEV) {
    for (const key in map) assertPictureSource(map[key], key);
  }
  return map;
}

export function definePictureList(sources: readonly PictureSource[]): readonly PictureSource[] {
  if (import.meta.env.DEV) sources.forEach((s, i) => assertPictureSource(s, `[${i}]`));
  return sources;
}

/** Runtime sanity check — only runs in dev to catch malformed imports early. */
export function assertPictureSource(value: unknown, label = "value"): asserts value is PictureSource {
  if (!value || typeof value !== "object") {
    throw new TypeError(`[pictures] ${label} is not a PictureSource object.`);
  }
  const v = value as Partial<PictureSource>;
  if (!v.sources || typeof v.sources !== "object") {
    throw new TypeError(
      `[pictures] ${label}.sources missing — did you forget \`&as=picture\` on the import query?`,
    );
  }
  if (!v.img || typeof v.img.src !== "string" || typeof v.img.w !== "number" || typeof v.img.h !== "number") {
    throw new TypeError(`[pictures] ${label}.img must be { src, w, h }.`);
  }
}

export type { PictureSource };
