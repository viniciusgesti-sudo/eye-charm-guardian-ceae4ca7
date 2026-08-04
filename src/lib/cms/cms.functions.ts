import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { WordPressContentPayload } from "./types";

const EMPTY_PAYLOAD: WordPressContentPayload = {
  version: "fallback",
  generated_at: "",
  documents: {},
};

export const getSiteContentFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<WordPressContentPayload> => {
    const { fetchWordPressContent } = await import("./wordpress.server");
    return fetchWordPressContent();
  },
);

export const siteContentQueryOptions = queryOptions({
  queryKey: ["cms", "wordpress-content"],
  queryFn: () => getSiteContentFn(),
  placeholderData: EMPTY_PAYLOAD,
  staleTime: 60_000,
  gcTime: 15 * 60_000,
  retry: 1,
});
