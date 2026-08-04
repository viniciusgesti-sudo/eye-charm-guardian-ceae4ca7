import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouterState } from "@tanstack/react-router";
import { useContentDocument } from "@/lib/cms";

import {
  LANGS,
  detectBrowserLang,
  translations,
  type Lang,
} from "./translations";

type I18nContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  langs: readonly Lang[];
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "eyegis.lang";

function langFromPathname(pathname: string | undefined): Lang | null {
  if (!pathname) return null;
  const seg = pathname.split("/")[1]?.toLowerCase();
  if (seg === "br") return "PT";
  if (seg === "en") return "EN";
  if (seg === "fr") return "FR";
  return null;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Derive locale from router pathname — identical on SSR and client,
  // so first paint never mismatches on /br, /en, /fr routes.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const urlLang = langFromPathname(pathname);

  const [lang, setLangState] = useState<Lang>(() => urlLang ?? "EN");
  const contentTranslations = useContentDocument<typeof translations>(
    "translations",
    translations,
  );

  useEffect(() => {
    if (urlLang && urlLang !== lang) {
      setLangState(urlLang);
      document.documentElement.lang = urlLang.toLowerCase();
    }
  }, [urlLang, lang]);

  useEffect(() => {
    if (urlLang) return; // URL locale wins on locale routes
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored && LANGS.includes(stored)) {
        setLangState(stored);
        document.documentElement.lang = stored.toLowerCase();
        return;
      }
    } catch {
      // ignore
    }
    const detected = detectBrowserLang();
    setLangState(detected);
    document.documentElement.lang = detected.toLowerCase();
  }, [urlLang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l.toLowerCase();
    } catch {
      // ignore
    }
  }, []);

  const t = useCallback(
    (key: string) => {
      const dict = contentTranslations[lang] ?? translations[lang];
      return dict[key] ?? contentTranslations.EN?.[key] ?? translations.EN[key] ?? key;
    },
    [contentTranslations, lang],
  );

  const value = useMemo<I18nContextValue>(
    () => ({ lang, setLang, t, langs: LANGS }),
    [lang, setLang, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    // Fail-soft during SSR or unusual mount order: return EN
    return {
      lang: "EN" as Lang,
      setLang: () => {},
      t: (key: string) => translations.EN[key] ?? key,
      langs: LANGS,
    };
  }
  return ctx;
}
