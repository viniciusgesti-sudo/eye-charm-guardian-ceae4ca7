/**
 * Ponto de entrada client-safe do CMS WordPress.
 *
 * `getWpContentFn` é um server function: no cliente vira um stub RPC, então
 * nenhuma URL interna, token ou lógica de fetch entra no bundle do browser.
 */
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";

import { EMPTY_WP_CONTENT, type WpContent } from "./types";

export const getWpContentFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<WpContent> => {
    // Import server-only dentro do handler para nunca vazar ao cliente.
    const { fetchWpContent } = await import("./wordpress.server");
    return fetchWpContent();
  },
);

export const wpContentQueryOptions = queryOptions({
  queryKey: ["wp-cms", "content"],
  queryFn: () => getWpContentFn(),
  staleTime: 5 * 60_000, // 5 min — conteúdo editorial não muda a cada clique
  gcTime: 30 * 60_000,
  retry: 1,
  // O site tem conteúdo local completo: nunca esperar o CMS para pintar.
  placeholderData: EMPTY_WP_CONTENT,
});
