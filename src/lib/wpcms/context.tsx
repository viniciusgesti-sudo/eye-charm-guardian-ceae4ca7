/**
 * Provider + hooks de leitura do CMS WordPress.
 *
 * Uso nos componentes:
 *
 *   const c = useWpCopy("home-faq", COPY[lang]);  // merge CMS sobre local
 *   const home = useWpDoc("home");                // documento cru do idioma
 *   const img = useWpMedia("collection-men");     // { url, mobileUrl, alt }
 *
 * Se o WordPress não responder, tudo devolve o conteúdo local — sem tela
 * branca, sem erro.
 */
import { createContext, useContext, useMemo, type ReactNode } from "react";

import { useI18n } from "@/i18n/context";
import { EMPTY_WP_CONTENT, type JsonValue, type WpContent, type WpMediaItem } from "./types";
import { mergeCms, resolveLocalized } from "./resolve";

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

/** `true` quando a página está exibindo rascunhos do WordPress. */
export function useWpPreview(): boolean {
  return useContext(WpContext).preview;
}

/**
 * Documento do CMS já resolvido para o idioma ativo (PT/EN/FR, com aliases
 * `br`/`pt-BR`), caindo para EN e depois PT quando faltar tradução.
 */
export function useWpDoc(docKey: string): Record<string, JsonValue> {
  const { documents } = useWpContent();
  const { lang } = useI18n();
  return useMemo(() => resolveLocalized(documents[docKey], lang), [documents, docKey, lang]);
}

/**
 * Cópia local mesclada com o documento do CMS.
 * Campos ausentes ou vazios no WordPress mantêm o texto local.
 */
export function useWpCopy<T>(docKey: string, local: T): T {
  const doc = useWpDoc(docKey);
  return useMemo(() => mergeCms(local, doc), [local, doc]);
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

/** URL de imagem do CMS com fallback para o asset local. */
export function useWpImage(mediaKey: string, fallback: string): string {
  const media = useWpMedia(mediaKey);
  return media.url && media.url.trim() !== "" ? media.url : fallback;
}

export { str, list, mergeCms, resolveLocalized } from "./resolve";
