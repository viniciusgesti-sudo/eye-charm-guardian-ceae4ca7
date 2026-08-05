/**
 * WordPress CMS — fetcher SERVER-ONLY.
 *
 * Lê `/wp-json/eyegis/v1/content` do WordPress headless e devolve o payload
 * normalizado. Regras de ouro (aprendidas com a tentativa anterior de CMS):
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
import { EMPTY_WP_CONTENT, type WpContent, type WpContentPayload } from "./types";

const DEFAULT_BASE_URL = "https://cms.eyegis-eyewear.com";
const DEFAULT_PATH = "/wp-json/eyegis/v1/content";
const WP_TIMEOUT_MS = 4000;

export async function fetchWpContent(): Promise<WpContent> {
  const base = (process.env["WORDPRESS_CMS_URL"] || DEFAULT_BASE_URL).replace(/\/+$/, "");
  const path = process.env["WORDPRESS_CMS_PATH"] || DEFAULT_PATH;
  const token = process.env["WORDPRESS_CMS_TOKEN"];
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
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
      documents: json.documents as unknown as Record<string, import("./types").JsonValue>,
    };
  } catch (err) {
    console.warn(`[WP-CMS] falha ao buscar conteúdo: ${(err as Error).message}`);
    return EMPTY_WP_CONTENT;
  }
}
