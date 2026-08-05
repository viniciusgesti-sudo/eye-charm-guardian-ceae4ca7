/**
 * Provider + hooks de leitura do CMS WordPress.
 *
 * Uso nos componentes:
 *
 *   const home = useWpDoc("home");            // já resolve o idioma atual
 *   const title = str(home.heroTitle) ?? t.headline;   // fallback local
 *
 *   const img = useWpMedia("collection-men"); // { url, mobileUrl, alt }
 *
 * Se o WordPress não responder, os hooks devolvem objetos vazios e cada
 * componente continua com o texto/imagem local — sem tela branca, sem erro.
 */
import { createContext, useContext, useMemo, type ReactNode } from "react";

import { useI18n } from "@/i18n/context";
import { EMPTY_WP_CONTENT, type JsonValue, type WpContent, type WpMediaItem } from "./types";

const WpContext = createContext<WpContent>(EMPTY_WP_CONTENT);

export function WpCmsProvider({
  value,
  children,
}: {
  value?: WpContent | null;
  children: ReactNode;
}) {
  const content = value ?? EMPTY_WP_CONTENT;
  return <WpContext.Provider value={content}>{children}</WpContext.Provider>;
}

/** Acesso bruto ao payload (versão, data de geração, documentos). */
export function useWpContent(): WpContent {
  return useContext(WpContext);
}

/**
 * Documento do CMS já resolvido para o idioma ativo.
 * Aceita chaves `PT` / `pt` / `EN` / `en` / `FR` / `fr` e documentos sem
 * variação de idioma (retorna o objeto direto).
 */
export function useWpDoc(docKey: string): Record<string, JsonValue> {
  const { documents } = useWpContent();
  const { lang } = useI18n();

  return useMemo(() => {
    const doc = documents[docKey];
    if (!doc || typeof doc !== "object" || Array.isArray(doc)) return {};
    const obj = doc as Record<string, JsonValue>;

    const upper = lang.toUpperCase();
    const localized = obj[upper] ?? obj[lang.toLowerCase()];
    if (localized && typeof localized === "object" && !Array.isArray(localized)) {
      return localized as Record<string, JsonValue>;
    }
    // Documento sem variantes de idioma.
    return obj;
  }, [documents, docKey, lang]);
}

/** Item de mídia gerenciado no WordPress (`documents.media[key]`). */
export function useWpMedia(mediaKey: string): WpMediaItem {
  const { documents } = useWpContent();
  return useMemo(() => {
    const media = documents["media"];
    if (!media || typeof media !== "object" || Array.isArray(media)) return {};
    const item = (media as Record<string, JsonValue>)[mediaKey];
    if (!item || typeof item !== "object" || Array.isArray(item)) return {};
    return item as WpMediaItem;
  }, [documents, mediaKey]);
}

/** Helper: só devolve strings não vazias — ideal para `?? fallbackLocal`. */
export function str(value: JsonValue | undefined): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

/** Helper: só devolve arrays não vazios. */
export function list<T = JsonValue>(value: JsonValue | undefined): T[] | undefined {
  return Array.isArray(value) && value.length > 0 ? (value as T[]) : undefined;
}
