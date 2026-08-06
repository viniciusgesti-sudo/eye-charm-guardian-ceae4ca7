/**
 * Regras únicas de resolução de idioma + merge CMS→local.
 *
 * Todos os hooks (`useWpDoc`, `useWpCopy`, `useWpMedia`) passam por aqui, de
 * modo que PT/EN/FR e o fallback local seguem exatamente a mesma lógica em
 * todas as seções do site.
 */
import type { JsonValue } from "./types";

/** Ordem de tentativa por idioma ativo (inclui aliases de rota: br/pt). */
const LANG_CHAIN: Record<string, string[]> = {
  PT: ["PT", "pt", "br", "BR", "pt-BR", "EN", "en"],
  EN: ["EN", "en", "PT", "pt", "br"],
  FR: ["FR", "fr", "EN", "en", "PT", "pt", "br"],
};

function isPlainObject(v: unknown): v is Record<string, JsonValue> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

/** `true` se o documento tem variantes por idioma no primeiro nível. */
function hasLangVariants(obj: Record<string, JsonValue>): boolean {
  const keys = Object.keys(obj);
  if (keys.length === 0) return false;
  return keys.every((k) => /^(pt|en|fr|br|pt-br)$/i.test(k));
}

/**
 * Devolve o conteúdo do documento para o idioma ativo, caindo para EN e
 * depois para PT quando a tradução não existir. Documentos sem variação de
 * idioma são devolvidos como estão.
 */
export function resolveLocalized(
  doc: JsonValue | undefined,
  lang: string,
): Record<string, JsonValue> {
  if (!isPlainObject(doc)) return {};
  if (!hasLangVariants(doc)) return doc;

  const chain = LANG_CHAIN[lang.toUpperCase()] ?? LANG_CHAIN["EN"]!;
  for (const key of chain) {
    const candidate = doc[key];
    if (isPlainObject(candidate) && Object.keys(candidate).length > 0) return candidate;
  }
  // Última tentativa: primeira variante não vazia.
  for (const value of Object.values(doc)) {
    if (isPlainObject(value) && Object.keys(value).length > 0) return value;
  }
  return {};
}

/** Valor "vazio" do CMS = ignorar e manter o conteúdo local. */
function isEmptyCmsValue(v: unknown): boolean {
  if (v === null || v === undefined) return true;
  if (typeof v === "string") return v.trim() === "";
  if (Array.isArray(v)) return v.length === 0;
  if (v instanceof Object && Object.keys(v).length === 0) return true;
  return false;
}

/**
 * Deep-merge do payload do WordPress sobre a cópia local.
 *
 * Regras:
 *  - valor ausente/vazio no CMS  → mantém o local (fallback garantido);
 *  - objetos                     → merge recursivo;
 *  - arrays                      → item a item, preservando campos locais
 *    (ícones, componentes React, imagens) que o CMS não fornece;
 *  - qualquer valor local que não seja JSON puro (React node, função) nunca é
 *    sobrescrito por um objeto do CMS — só por string/número.
 */
export function mergeCms<T>(local: T, cms: unknown): T {
  if (isEmptyCmsValue(cms)) return local;

  if (Array.isArray(local) && Array.isArray(cms)) {
    const out = cms.map((item, i) =>
      i < local.length ? mergeCms(local[i], item) : item,
    );
    return out as unknown as T;
  }

  if (isPlainObject(cms)) {
    if (!local || typeof local !== "object" || Array.isArray(local)) return local;
    // Não mesclar dentro de elementos React / instâncias de classe.
    if ("$$typeof" in (local as Record<string, unknown>)) return local;
    const out: Record<string, unknown> = { ...(local as Record<string, unknown>) };
    for (const [k, v] of Object.entries(cms)) {
      out[k] = k in out ? mergeCms(out[k], v) : v;
    }
    return out as unknown as T;
  }

  // Escalares: CMS vence quando não vazio.
  if (typeof cms === "string" || typeof cms === "number" || typeof cms === "boolean") {
    if (local && typeof local === "object") return local; // não trocar JSX por string
    return cms as unknown as T;
  }

  return local;
}

/** Só devolve strings não vazias — ideal para `?? fallbackLocal`. */
export function str(value: JsonValue | undefined): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

/** Só devolve arrays não vazios. */
export function list<T = JsonValue>(value: JsonValue | undefined): T[] | undefined {
  return Array.isArray(value) && value.length > 0 ? (value as T[]) : undefined;
}
