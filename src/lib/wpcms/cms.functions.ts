/**
 * Ponto de entrada client-safe do CMS WordPress.
 *
 * Este módulo é um *thin wrapper*: só imports e declarações de server
 * functions (exigência do splitting do TanStack Start).
 */
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";

import { EMPTY_WP_CONTENT, type WpContent, type WpDiagnostics } from "./types";

export const getWpContentFn = createServerFn({ method: "GET" })
  .inputValidator((input: { preview?: boolean } | undefined) => ({
    preview: Boolean(input?.preview),
  }))
  .handler(async ({ data }): Promise<WpContent> => {
    const { fetchWpContent } = await import("./wordpress.server");
    return fetchWpContent(data.preview);
  });

export const getWpVersionFn = createServerFn({ method: "GET" })
  .inputValidator((input: { preview?: boolean } | undefined) => ({
    preview: Boolean(input?.preview),
  }))
  .handler(async ({ data }): Promise<{ version: string | null }> => {
    const { fetchWpVersion } = await import("./wordpress.server");
    return { version: await fetchWpVersion(data.preview) };
  });

export const getWpDiagnosticsFn = createServerFn({ method: "GET" })
  .inputValidator((input: { preview?: boolean } | undefined) => ({
    preview: Boolean(input?.preview),
  }))
  .handler(async ({ data }): Promise<WpDiagnostics> => {
    const { fetchWpDiagnostics } = await import("./wordpress.server");
    return fetchWpDiagnostics(data.preview);
  });

/**
 * Cache do conteúdo. Preview tem chave (e política) separada: sempre fresco,
 * nunca compartilhado com o cache do conteúdo publicado.
 */
export function wpContentQueryOptions(preview = false) {
  return queryOptions({
    queryKey: ["wp-cms", "content", preview ? "preview" : "published"] as const,
    queryFn: () => getWpContentFn({ data: { preview } }),
    staleTime: preview ? 0 : 5 * 60_000,
    gcTime: preview ? 0 : 30 * 60_000,
    refetchOnWindowFocus: preview,
    retry: 1,
    // O site tem conteúdo local completo: nunca esperar o CMS para pintar.
    placeholderData: EMPTY_WP_CONTENT,
  });
}

/**
 * Sonda leve de versão. Quando o `version` do endpoint muda (cliente publicou
 * algo no WordPress), o conteúdo é revalidado automaticamente.
 */
export function wpVersionQueryOptions(preview = false) {
  return queryOptions({
    queryKey: ["wp-cms", "version", preview ? "preview" : "published"] as const,
    queryFn: () => getWpVersionFn({ data: { preview } }),
    staleTime: 0,
    gcTime: 60_000,
    refetchInterval: preview ? 15_000 : 5 * 60_000,
    refetchOnWindowFocus: true,
    retry: 0,
  });
}

export function wpDiagnosticsQueryOptions(preview = false) {
  return queryOptions({
    queryKey: ["wp-cms", "diagnostics", preview ? "preview" : "published"] as const,
    queryFn: () => getWpDiagnosticsFn({ data: { preview } }),
    staleTime: 0,
    gcTime: 0,
    retry: 0,
  });
}
