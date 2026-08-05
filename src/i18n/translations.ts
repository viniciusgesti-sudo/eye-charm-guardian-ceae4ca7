import translationsData from "@/content/translations.json";

export type Lang = "EN" | "PT" | "FR";

export const LANGS: readonly Lang[] = ["EN", "PT", "FR"] as const;

const HTML_LANGUAGE: Record<Lang, string> = {
  EN: "en",
  PT: "pt-BR",
  FR: "fr",
};

export function toHtmlLanguage(lang: Lang): string {
  return HTML_LANGUAGE[lang];
}

type Dict = Record<string, string>;

export const translations: Record<Lang, Dict> = translationsData;

export function detectBrowserLang(): Lang {
  if (typeof navigator === "undefined") return "EN";
  const raw = (navigator.language || "en").slice(0, 2).toLowerCase();
  if (raw === "pt" || raw === "br") return "PT";
  if (raw === "fr") return "FR";
  return "EN";
}
