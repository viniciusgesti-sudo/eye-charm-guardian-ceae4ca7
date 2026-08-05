/**
 * WordPress CMS (headless) — tipos do payload de `/wp-json/eyegis/v1/content`.
 *
 * O plugin Eyegis no WordPress devolve um único documento JSON com todos os
 * blocos editáveis do site, no formato:
 *
 *   {
 *     version: "2.0.0",
 *     generated_at: "2026-08-05T17:30:25+00:00",
 *     documents: {
 *       home:  { PT: {...}, EN: {...}, FR: {...} },
 *       media: { "collection-men": { url, mobileUrl, alt, label } , ... },
 *       ...
 *     }
 *   }
 *
 * Nada aqui é obrigatório para o site funcionar: se o WordPress estiver fora
 * do ar, lento ou sem a chave, o frontend continua com o conteúdo local.
 */

/** Item do documento `media` (imagens gerenciadas no WordPress). */
export type WpMediaItem = {
  label?: string;
  match?: string;
  url?: string;
  mobileUrl?: string;
  alt?: string;
};

/** Valor JSON serializável (o payload do WordPress é sempre JSON puro). */
export type JsonValue = string | number | boolean | null | JsonValue[] | { [k: string]: JsonValue };

/** Conteúdo arbitrário de um bloco editorial (shape definido pelo plugin). */
export type WpDoc = Record<string, JsonValue>;

/** Documento com variantes por idioma (`PT` / `EN` / `FR`, case-insensitive). */
export type WpLocalizedDoc = Record<string, WpDoc>;

export type WpContentPayload = {
  version?: string;
  generated_at?: string;
  documents: Record<string, WpLocalizedDoc | Record<string, WpMediaItem> | WpDoc>;
};

/** Mapa normalizado consumido pelo frontend. */
export type WpContent = {
  version: string | null;
  generatedAt: string | null;
  documents: Record<string, JsonValue>;
};

export const EMPTY_WP_CONTENT: WpContent = {
  version: null,
  generatedAt: null,
  documents: {},
};
