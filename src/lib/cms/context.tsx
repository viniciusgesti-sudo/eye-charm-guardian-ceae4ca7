import { createContext, useContext, useMemo, type ReactNode } from "react";

import { defaultDocuments } from "./defaults";
import type {
  ContentDocument,
  ContentDocuments,
  MediaDocument,
  MediaOverride,
  WordPressContentPayload,
} from "./types";

const ContentContext = createContext<ContentDocuments>(defaultDocuments);

export function CmsProvider({
  value,
  children,
}: {
  value?: WordPressContentPayload;
  children: ReactNode;
}) {
  const documents = useMemo(
    () => mergeDocuments(defaultDocuments, value?.documents ?? {}),
    [value],
  );

  return <ContentContext.Provider value={documents}>{children}</ContentContext.Provider>;
}

export function useContentDocument<T = ContentDocument>(
  key: string,
  fallback?: T,
): T {
  const documents = useContext(ContentContext);
  const document = documents[key];

  return useMemo(() => {
    if (fallback !== undefined && isPlainObject(fallback) && isPlainObject(document)) {
      return deepMerge(fallback, document) as T;
    }
    return (document ?? fallback ?? {}) as T;
  }, [document, fallback]);
}

export function useContentDocuments(): ContentDocuments {
  return useContext(ContentContext);
}

export function useMediaOverride(sourceUrl: string): MediaOverride | undefined {
  const media = useContentDocument<MediaDocument>("media", {});

  return useMemo(() => {
    const normalizedSource = sourceUrl.toLowerCase();
    return Object.values(media).find((entry) => {
      if (!entry?.url?.trim()) return false;
      const match = entry.match?.trim().toLowerCase();
      return Boolean(match && normalizedSource.includes(match));
    });
  }, [media, sourceUrl]);
}

function mergeDocuments(
  local: ContentDocuments,
  remote: ContentDocuments,
): ContentDocuments {
  const output: ContentDocuments = { ...local };

  for (const [key, remoteDocument] of Object.entries(remote)) {
    const localDocument = local[key];
    output[key] = isPlainObject(localDocument) && isPlainObject(remoteDocument)
      ? (deepMerge(localDocument, remoteDocument) as ContentDocument)
      : remoteDocument;
  }

  return output;
}

function deepMerge(local: unknown, remote: unknown): unknown {
  if (Array.isArray(remote)) {
    const localItems = Array.isArray(local) ? local : [];
    return remote.map((value, index) => deepMerge(localItems[index], value));
  }
  if (!isPlainObject(remote)) return remote;

  const base = isPlainObject(local) ? local : {};
  const output: Record<string, unknown> = { ...base };

  for (const [key, value] of Object.entries(remote)) {
    output[key] = deepMerge(base[key], value);
  }

  return output;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
