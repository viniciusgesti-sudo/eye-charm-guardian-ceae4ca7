/**
 * CMS Context — provides a CMS map (from Wix) merged with local fallbacks.
 *
 * Data flow:
 *
 *   Wix Velo (backend .jsw) --> queries `SiteContent` --> serializes to JSON
 *      |
 *      v
 *   Custom Element receives JSON (via attribute `cms-json` OR window global)
 *      |
 *      v
 *   <CmsProvider value={parsed}> wraps the app
 *      |
 *      v
 *   Components call useCms("home.hero.men") -> gets merged entry
 *
 * When running the standalone TanStack dev server (this repo), no CMS is
 * present — every component silently gets its fallback and the site looks
 * identical to today.
 */

import { createContext, useContext, useMemo, type ReactNode } from "react";

import { fallbacks } from "./fallbacks";
import { resolveImageUrl } from "./image";
import type { CmsEntry, CmsKey, CmsMap } from "./types";

const CmsContext = createContext<CmsMap>({});

export function CmsProvider({
  value,
  children,
}: {
  value?: CmsMap;
  children: ReactNode;
}) {
  const normalized = useMemo(() => normalize(value ?? {}), [value]);
  return <CmsContext.Provider value={normalized}>{children}</CmsContext.Provider>;
}

/**
 * Get a CMS entry by key. Missing/empty fields transparently fall back to
 * `fallbacks[key]`, so callers never need to null-check individual fields.
 */
export function useCms(key: CmsKey): CmsEntry {
  const map = useContext(CmsContext);
  const remote = map[key];
  const local = fallbacks[key];
  if (!remote) return local;
  return mergeEntry(local, remote);
}

/** Merge every provided key with its fallback; used at provider time. */
function normalize(raw: CmsMap): CmsMap {
  const out: CmsMap = {};
  for (const key of Object.keys(raw)) {
    const remote = raw[key];
    if (!remote.active && remote.active !== undefined) continue;
    out[key] = {
      ...remote,
      image: remote.image
        ? { ...remote.image, src: resolveImageUrl(remote.image.src) ?? remote.image.src }
        : undefined,
      mobileImage: remote.mobileImage
        ? {
            ...remote.mobileImage,
            src: resolveImageUrl(remote.mobileImage.src) ?? remote.mobileImage.src,
          }
        : undefined,
    };
  }
  return out;
}

function mergeEntry(local: CmsEntry, remote: CmsEntry): CmsEntry {
  return {
    ...local,
    ...pruneEmpty(remote),
    image: remote.image?.src ? remote.image : local.image,
    mobileImage: remote.mobileImage?.src ? remote.mobileImage : local.mobileImage,
  };
}

function pruneEmpty<T extends object>(o: T): Partial<T> {
  const out: Partial<T> = {};
  for (const k of Object.keys(o) as Array<keyof T>) {
    const v = o[k];
    if (v === undefined || v === null) continue;
    if (typeof v === "string" && v.trim() === "") continue;
    out[k] = v;
  }
  return out;
}

export { fallbacks };
export type { CmsEntry, CmsKey, CmsMap };
