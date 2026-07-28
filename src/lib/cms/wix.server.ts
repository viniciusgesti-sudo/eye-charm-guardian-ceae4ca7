/**
 * Wix CMS — server-only fetcher.
 *
 * Reads the `SiteContent` data collection through the Lovable connector
 * gateway. Credentials never leave the server: WIX_API_KEY and
 * LOVABLE_API_KEY are only readable inside handlers. This module has the
 * `.server.` suffix so the client-bundle import guard blocks it hard.
 */
import type { CmsMap, CmsEntry } from "./types";

/**
 * Wix site ID for eyegis-eyewear.com — non-secret, stable identifier.
 * If Eyegis ever migrates sites, override with SiteContent env in Cloud.
 */
const WIX_SITE_ID = "fd7d4ce1-76de-49ab-8bdf-8a3c5425cced";
const COLLECTION_ID = "SiteContent";
const GATEWAY = "https://connector-gateway.lovable.dev/wix";

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
    title: asString(raw.title),
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
