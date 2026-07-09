import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

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

export function I18nProvider({ children }: { children: ReactNode }) {
  // SSR-safe: start with EN, then hydrate from browser once mounted
  const [lang, setLangState] = useState<Lang>("EN");

  useEffect(() => {
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
  }, []);

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
      const dict = translations[lang];
      return dict[key] ?? translations.EN[key] ?? key;
    },
    [lang],
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
