/**
 * Client-safe entry point for CMS data.
 *
 * `getSiteContentFn` is a TanStack server function that runs on the edge,
 * queries Wix through the gateway, and returns a normalized CmsMap. On the
 * client side it becomes an RPC stub — no credentials ship to the browser.
 *
 * `siteContentQueryOptions` is the shared query key + fetcher used by the
 * root loader and the RootComponent so SSR + hydration share one entry.
 */
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";

import type { CmsMap } from "./types";

export const getSiteContentFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<CmsMap> => {
    // Server-only import kept inside the handler so it never enters the
    // client bundle.
    const { fetchSiteContent } = await import("./wix.server");
    return fetchSiteContent();
  },
);

export const siteContentQueryOptions = queryOptions({
  queryKey: ["cms", "site-content"],
  queryFn: () => getSiteContentFn(),
  // CMS content is edited manually and does not need per-navigation refetch.
  staleTime: 5 * 60_000, // 5 minutes
  gcTime: 30 * 60_000, // 30 minutes
});
