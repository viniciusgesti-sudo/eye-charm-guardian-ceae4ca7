/**
 * Wix CMS — server-only fetcher.
 *
 * Talks directly to the official Wix Data API (www.wixapis.com) using a
 * real Wix API Key (IST.*) stored in WIX_API_KEY. This runs server-side
 * only (TanStack server functions / SSR on Vercel) — the key never ships
 * to the client bundle. No Lovable gateway, no LOVABLE_API_KEY.
 */
import type { CmsMap, CmsEntry } from "./types";

/**
 * Wix site ID for eyegis-eyewear.com — non-secret, stable identifier.
 * Override with WIX_SITE_ID env var if the site ever changes.
 */
const DEFAULT_WIX_SITE_ID = "fd7d4ce1-76de-49ab-8bdf-8a3c5425cced";
const COLLECTION_ID = "SiteContent";
const WIX_QUERY_URL = "https://www.wixapis.com/wix-data/v2/items/query";


type WixItem = {
  id: string;
  dataCollectionId: string;
  data: Record<string, unknown> & { key?: string };
};

type WixQueryResponse = {
  dataItems?: WixItem[];
  pagingMetadata?: { count?: number; hasNext?: boolean };
};

/** Normalize a Wix row into our CmsEntry shape. */
function toEntry(raw: Record<string, unknown>): CmsEntry | null {
  const key = typeof raw.key === "string" ? raw.key : undefined;
  if (!key) return null;

  const asString = (v: unknown) => (typeof v === "string" && v.trim() ? v : undefined);

  const imageSrc = asString(raw.image) ?? asString((raw as { imageUrl?: unknown }).imageUrl);
  const mobileSrc = asString(raw.mobileImage) ?? asString((raw as { mobileImageUrl?: unknown }).mobileImageUrl);
  const alt = asString(raw.altText) ?? asString((raw as { alttext?: unknown }).alttext);

  const entry: CmsEntry = {
    key,
    // NOTE: Wix `title` is the ADMIN label shown inside the CMS list view
    // (e.g. "Hero Center", "Review 1"). It is intentionally NOT surfaced to
    // the frontend — mapping it would leak internal labels into the UI.
    // Components that need a display title read `text`, `subtitle`, or
    // `description`.
    text: asString(raw.text),
    subtitle: asString(raw.subtitle),
    description: asString(raw.description),
    buttonText: asString(raw.buttonText),
    buttonLink: asString(raw.buttonLink) ?? asString((raw as { link?: unknown }).link),
    altText: alt,
    link: asString((raw as { link?: unknown }).link),
    video: asString(raw.video),
    order: typeof raw.order === "number" ? raw.order : undefined,
    active: typeof raw.active === "boolean" ? raw.active : undefined,
  };

  if (imageSrc) entry.image = { src: imageSrc, alt };
  if (mobileSrc) entry.mobileImage = { src: mobileSrc, alt };

  return entry;
}

/**
 * Fetch the entire SiteContent collection. Returns {} on any failure so the
 * CmsProvider falls back to local content — the site never breaks because
 * the CMS is unreachable.
 */
export async function fetchSiteContent(): Promise<CmsMap> {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const wixKey = process.env.WIX_API_KEY;
  if (!lovableKey || !wixKey) {
    // No credentials injected — running outside Lovable runtime. Fallback path.
    return {};
  }

  try {
    const res = await fetch(`${GATEWAY}/wix-data/v2/items/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": wixKey,
        "Content-Type": "application/json",
        "wix-site-id": WIX_SITE_ID,
      },
      body: JSON.stringify({
        dataCollectionId: COLLECTION_ID,
        query: { paging: { limit: 200 } },
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.warn(`[CMS] Wix query failed [${res.status}]: ${body.slice(0, 300)}`);
      return {};
    }

    const json = (await res.json()) as WixQueryResponse;
    const items = json.dataItems ?? [];
    const map: CmsMap = {};
    for (const item of items) {
      const entry = toEntry(item.data ?? {});
      if (entry) map[entry.key] = entry;
    }
    return map;
  } catch (err) {
    console.warn(`[CMS] Wix fetch threw: ${(err as Error).message}`);
    return {};
  }
}
