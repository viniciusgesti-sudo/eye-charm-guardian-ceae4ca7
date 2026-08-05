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

const LEGACY_CONTENT_VALUES: Record<string, Record<string, string>> = {
  women: {
    "FR.eyebrow": "Collection · Women",
    "FR.title": "Women's Collection",
    "FR.titleAccent": "for those who create.",
    "FR.subtitle": "A cat-eye in tortoise acetate with a discreet gold shield-G on the temple.",
    "FR.ctaLabel": "Shop on Amazon",
  },
  kids: {
    "FR.eyebrow": "Collection · Kids & Teens",
    "FR.title": "Protection",
    "FR.titleAccent": "for the screen generation.",
    "FR.subtitle":
      "Lightweight, flexible, impact-resistant frames — for study, gaming and remote learning.",
    "FR.ctaLabel": "Shop the Kids collection",
  },
  about: {
    "FR.title": "Our Story",
    "FR.mission": "We believe design and engineering should walk together.",
  },
  faq: {
    "FR.questions.0.q": "What is Eyegis?",
    "FR.questions.0.a":
      "Eyegis is an eyewear brand focused on digital protection and premium design.",
  },
};

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

export function useContentDocument<T = ContentDocument>(key: string, fallback?: T): T {
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

function mergeDocuments(local: ContentDocuments, remote: ContentDocuments): ContentDocuments {
  const output: ContentDocuments = { ...local };

  for (const [key, remoteDocument] of Object.entries(remote)) {
    const localDocument = local[key];
    const migratedRemote = migrateLegacyDocument(key, remoteDocument, localDocument);
    output[key] =
      isPlainObject(localDocument) && isPlainObject(migratedRemote)
        ? (deepMerge(localDocument, migratedRemote) as ContentDocument)
        : migratedRemote;
  }

  return output;
}

function migrateLegacyDocument(
  key: string,
  remote: ContentDocument,
  local: ContentDocument | undefined,
): ContentDocument {
  const migrations = LEGACY_CONTENT_VALUES[key];
  if (!migrations || !isContainer(remote) || !isContainer(local)) return remote;

  const migrated = deepMerge(undefined, remote) as ContentDocument;
  for (const [path, obsoleteValue] of Object.entries(migrations)) {
    replaceValueIfUnchanged(migrated, local, path, obsoleteValue);
  }
  return migrated;
}

function replaceValueIfUnchanged(
  remote: ContentDocument,
  local: ContentDocument,
  path: string,
  obsoleteValue: string,
): void {
  const segments = path.split(".");
  let remoteCursor: unknown = remote;
  let localCursor: unknown = local;

  for (let index = 0; index < segments.length; index += 1) {
    if (!isContainer(remoteCursor) || !isContainer(localCursor)) return;
    const segment = segments[index];
    const isLast = index === segments.length - 1;

    if (isLast) {
      if (remoteCursor[segment] === obsoleteValue && segment in localCursor) {
        remoteCursor[segment] = localCursor[segment];
      }
      return;
    }

    remoteCursor = remoteCursor[segment];
    localCursor = localCursor[segment];
  }
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

function isContainer(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}
