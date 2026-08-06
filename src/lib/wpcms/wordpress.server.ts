/**
 * WordPress CMS — fetcher SERVER-ONLY.
 *
 * Lê `/wp-json/eyegis/v1/content` do WordPress headless e devolve o payload
 * normalizado. Regras de ouro:
 *
 *  1. NUNCA lança. Qualquer falha (rede, 4xx/5xx, JSON inválido, timeout)
 *     resolve para `EMPTY_WP_CONTENT` — o site renderiza o conteúdo local.
 *  2. Timeout duro (`WP_TIMEOUT_MS`) para o SSR nunca ficar preso.
 *  3. Só é importado dentro do handler de um server function — a URL e a
 *     eventual credencial nunca vão para o bundle do navegador.
 *
 * Variáveis de ambiente (todas opcionais):
 *   WORDPRESS_CMS_URL   — base do WordPress. Default: https://cms.eyegis-eyewear.com
 *   WORDPRESS_CMS_PATH  — rota REST. Default: /wp-json/eyegis/v1/content
 *   WORDPRESS_CMS_TOKEN — Bearer token, se o endpoint for protegido.
 */
import {
  EMPTY_WP_CONTENT,
  type WpContent,
  type WpContentPayload,
  type WpDiagnostics,
  type JsonValue,
} from "./types";

const DEFAULT_BASE_URL = "https://cms.eyegis-eyewear.com";
const DEFAULT_PATH = "/wp-json/eyegis/v1/content";
const WP_TIMEOUT_MS = 4000;

function endpoint() {
  const base = (process.env["WORDPRESS_CMS_URL"] || DEFAULT_BASE_URL).replace(/\/+$/, "");
  const path = process.env["WORDPRESS_CMS_PATH"] || DEFAULT_PATH;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function headers() {
  const token = process.env["WORDPRESS_CMS_TOKEN"];
  return {
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/**
 * Busca o conteúdo. Em modo preview o cache HTTP é ignorado e a flag
 * `preview=1` é enviada ao WordPress (rascunhos ainda não publicados).
 */
export async function fetchWpContent(preview = false): Promise<WpContent> {
  const url = preview ? `${endpoint()}?preview=1&_ts=${Date.now()}` : endpoint();

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: headers(),
      ...(preview ? { cache: "no-store" as const } : {}),
      signal: AbortSignal.timeout(WP_TIMEOUT_MS),
    });

    if (!res.ok) {
      console.warn(`[WP-CMS] ${res.status} ao buscar ${url} — usando conteúdo local.`);
      return EMPTY_WP_CONTENT;
    }

    const json = (await res.json()) as WpContentPayload;
    if (!json || typeof json !== "object" || typeof json.documents !== "object") {
      console.warn("[WP-CMS] payload inesperado — usando conteúdo local.");
      return EMPTY_WP_CONTENT;
    }

    return {
      version: typeof json.version === "string" ? json.version : null,
      generatedAt: typeof json.generated_at === "string" ? json.generated_at : null,
      preview,
      documents: json.documents as unknown as Record<string, JsonValue>,
    };
  } catch (err) {
    console.warn(`[WP-CMS] falha ao buscar conteúdo: ${(err as Error).message}`);
    return EMPTY_WP_CONTENT;
  }
}

/** Só a "impressão digital" do conteúdo — usada para revalidar o cache. */
export async function fetchWpVersion(preview = false): Promise<string | null> {
  const content = await fetchWpContent(preview);
  return content.version ?? content.generatedAt;
}

/** Diagnóstico do CMS: o endpoint responde? o que veio? */
export async function fetchWpDiagnostics(preview = false): Promise<WpDiagnostics> {
  const url = endpoint();
  const startedAt = Date.now();

  try {
    const res = await fetch(preview ? `${url}?preview=1&_ts=${Date.now()}` : url, {
      method: "GET",
      headers: headers(),
      signal: AbortSignal.timeout(WP_TIMEOUT_MS + 4000),
    });
    const latencyMs = Date.now() - startedAt;

    if (!res.ok) {
      return {
        ok: false,
        endpoint: url,
        status: res.status,
        latencyMs,
        preview,
        version: null,
        generatedAt: null,
        tokenConfigured: Boolean(process.env["WORDPRESS_CMS_TOKEN"]),
        documents: [],
        mediaCount: 0,
        mediaWithUrl: 0,
        error: `HTTP ${res.status}`,
        checkedAt: new Date().toISOString(),
      };
    }

    const json = (await res.json()) as WpContentPayload;
    const docs = (json.documents ?? {}) as Record<string, JsonValue>;
    const media = docs["media"];
    const mediaEntries =
      media && typeof media === "object" && !Array.isArray(media)
        ? Object.entries(media as Record<string, JsonValue>)
        : [];

    const documents = Object.entries(docs)
      .filter(([key]) => key !== "media")
      .map(([key, value]) => {
        const obj =
          value && typeof value === "object" && !Array.isArray(value)
            ? (value as Record<string, JsonValue>)
            : {};
        const keys = Object.keys(obj);
        const languages = keys.filter((k) => /^(pt|en|fr|br|pt-br)$/i.test(k));
        return {
          key,
          languages,
          fieldCount: languages.length > 0 ? languages.length : keys.length,
        };
      })
      .sort((a, b) => a.key.localeCompare(b.key));

    return {
      ok: true,
      endpoint: url,
      status: res.status,
      latencyMs,
      preview,
      version: typeof json.version === "string" ? json.version : null,
      generatedAt: typeof json.generated_at === "string" ? json.generated_at : null,
      tokenConfigured: Boolean(process.env["WORDPRESS_CMS_TOKEN"]),
      documents,
      mediaCount: mediaEntries.length,
      mediaWithUrl: mediaEntries.filter(([, v]) => {
        const item = v as { url?: string } | null;
        return Boolean(item && typeof item === "object" && item.url);
      }).length,
      error: null,
      checkedAt: new Date().toISOString(),
    };
  } catch (err) {
    return {
      ok: false,
      endpoint: url,
      status: null,
      latencyMs: Date.now() - startedAt,
      preview,
      version: null,
      generatedAt: null,
      tokenConfigured: Boolean(process.env["WORDPRESS_CMS_TOKEN"]),
      documents: [],
      mediaCount: 0,
      mediaWithUrl: 0,
      error: (err as Error).message,
      checkedAt: new Date().toISOString(),
    };
  }
}
