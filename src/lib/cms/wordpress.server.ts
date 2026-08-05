import type { ContentDocuments, WordPressContentPayload } from "./types";

const EMPTY_PAYLOAD: WordPressContentPayload = {
  version: "fallback",
  generated_at: "",
  documents: {},
};

// Public, read-only endpoint for the production Eyegis CMS. The environment
// variable remains available so preview/staging deployments can override it.
const DEFAULT_WORDPRESS_API_URL = "https://cms.eyegis-eyewear.com/wp-json/eyegis/v1/content";
const REQUEST_TIMEOUT_MS = 12_000;
const MEMORY_CACHE_TTL_MS = 60_000;

let cachedEndpoint = "";
let cachedAt = 0;
let cachedPayload: WordPressContentPayload | null = null;
let inFlightRequest: Promise<WordPressContentPayload> | null = null;

export async function fetchWordPressContent(): Promise<WordPressContentPayload> {
  const endpoint = getContentEndpoint(process.env.WORDPRESS_API_URL || DEFAULT_WORDPRESS_API_URL);
  if (!endpoint) {
    console.warn("[CMS] WORDPRESS_API_URL ausente — usando o conteúdo local.");
    return EMPTY_PAYLOAD;
  }

  if (cachedPayload && cachedEndpoint === endpoint && Date.now() - cachedAt < MEMORY_CACHE_TTL_MS) {
    return cachedPayload;
  }

  if (inFlightRequest && cachedEndpoint === endpoint) {
    return inFlightRequest;
  }

  cachedEndpoint = endpoint;
  inFlightRequest = requestWordPressContent(endpoint).finally(() => {
    inFlightRequest = null;
  });

  return inFlightRequest;
}

async function requestWordPressContent(endpoint: string): Promise<WordPressContentPayload> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Eyegis-React/1.0",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      console.warn(`[CMS] WordPress respondeu ${response.status} — usando o conteúdo local.`);
      return cachedPayload ?? EMPTY_PAYLOAD;
    }

    const payload = (await response.json()) as Partial<WordPressContentPayload>;
    if (!isDocuments(payload.documents)) {
      console.warn("[CMS] Resposta inválida do WordPress — usando o conteúdo local.");
      return cachedPayload ?? EMPTY_PAYLOAD;
    }

    const contentPayload: WordPressContentPayload = {
      version: typeof payload.version === "string" ? payload.version : "wordpress",
      generated_at: typeof payload.generated_at === "string" ? payload.generated_at : "",
      documents: payload.documents,
    };
    cachedPayload = contentPayload;
    cachedAt = Date.now();
    return contentPayload;
  } catch (error) {
    const message = error instanceof Error ? error.message : "erro desconhecido";
    console.warn(`[CMS] Falha ao consultar o WordPress (${message}) — usando o conteúdo local.`);
    return cachedPayload ?? EMPTY_PAYLOAD;
  } finally {
    clearTimeout(timeout);
  }
}

function getContentEndpoint(rawUrl: string | undefined): string | null {
  const raw = rawUrl?.trim();
  if (!raw) return null;

  const normalized = raw.replace(/\/+$/, "");
  if (/\/wp-json\/eyegis\/v1\/content$/i.test(normalized)) return normalized;
  if (/\/wp-json$/i.test(normalized)) return `${normalized}/eyegis/v1/content`;
  return `${normalized}/wp-json/eyegis/v1/content`;
}

function isDocuments(value: unknown): value is ContentDocuments {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
