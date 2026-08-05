import { useEffect, useMemo, useState } from "react";

import type { ContentDocument, ContentDocuments, WordPressContentPayload } from "./types";

const PREVIEW_SOURCE = "eyegis-studio";

type PreviewMessage =
  | {
      source: typeof PREVIEW_SOURCE;
      type: "eyegis:preview:update";
      documentKey: string;
      content: ContentDocument;
    }
  | {
      source: typeof PREVIEW_SOURCE;
      type: "eyegis:preview:focus";
      field: string;
    };

/**
 * Applies unsaved Studio content only inside an explicitly requested iframe
 * preview. The public site and its server-rendered payload remain untouched.
 */
export function useCmsPreviewPayload(
  published: WordPressContentPayload | undefined,
): WordPressContentPayload | undefined {
  const [draftDocuments, setDraftDocuments] = useState<ContentDocuments>({});

  useEffect(() => {
    if (!isPreviewWindow()) return;

    document.documentElement.dataset.eyegisPreview = "true";
    const parentOrigin = getAllowedParentOrigin();

    const notifyReady = () => {
      if (!parentOrigin) return;
      window.parent.postMessage(
        { source: PREVIEW_SOURCE, type: "eyegis:preview:ready" },
        parentOrigin,
      );
    };

    const handleMessage = (event: MessageEvent<PreviewMessage>) => {
      if (event.source !== window.parent || !isAllowedStudioOrigin(event.origin)) return;
      const message = event.data;
      if (!message || message.source !== PREVIEW_SOURCE) return;

      if (message.type === "eyegis:preview:update") {
        if (!/^[a-z0-9_-]+$/i.test(message.documentKey) || !isContentDocument(message.content)) {
          return;
        }
        setDraftDocuments((current) => ({
          ...current,
          [message.documentKey]: message.content,
        }));
        return;
      }

      if (message.type === "eyegis:preview:focus") {
        focusPreviewField(message.field);
      }
    };

    const handlePreviewClick = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-eyegis-field]")
          : null;
      if (!target || !parentOrigin) return;

      event.preventDefault();
      event.stopPropagation();
      window.parent.postMessage(
        {
          source: PREVIEW_SOURCE,
          type: "eyegis:preview:select",
          field: target.dataset.eyegisField,
        },
        parentOrigin,
      );
    };

    window.addEventListener("message", handleMessage);
    document.addEventListener("click", handlePreviewClick, true);
    notifyReady();

    return () => {
      window.removeEventListener("message", handleMessage);
      document.removeEventListener("click", handlePreviewClick, true);
      delete document.documentElement.dataset.eyegisPreview;
    };
  }, []);

  return useMemo(() => {
    if (!Object.keys(draftDocuments).length) return published;
    return {
      version: `${published?.version ?? "local"}-preview`,
      generated_at: published?.generated_at ?? "",
      documents: {
        ...(published?.documents ?? {}),
        ...draftDocuments,
      },
    };
  }, [draftDocuments, published]);
}

function isPreviewWindow(): boolean {
  if (typeof window === "undefined" || window.parent === window) return false;
  return new URLSearchParams(window.location.search).get("eyegis_preview") === "1";
}

function getAllowedParentOrigin(): string | null {
  try {
    const origin = new URL(document.referrer).origin;
    return isAllowedStudioOrigin(origin) ? origin : null;
  } catch {
    return null;
  }
}

function isAllowedStudioOrigin(origin: string): boolean {
  if (origin === "https://cms.eyegis-eyewear.com") return true;
  return /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/i.test(origin);
}

function isContentDocument(value: unknown): value is ContentDocument {
  return Boolean(value) && typeof value === "object";
}

function focusPreviewField(field: string): void {
  if (!field) return;
  const candidates = document.querySelectorAll<HTMLElement>("[data-eyegis-field]");
  const selected = Array.from(candidates).find(
    (candidate) => candidate.dataset.eyegisField === field,
  );

  candidates.forEach((candidate) => {
    const matches = candidate.dataset.eyegisField === field;
    if (matches) candidate.dataset.eyegisSelected = "true";
    else delete candidate.dataset.eyegisSelected;
  });

  selected?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
}
