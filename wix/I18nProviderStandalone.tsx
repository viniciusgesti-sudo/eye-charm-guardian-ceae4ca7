/**
 * Standalone i18n provider for the Wix bundle.
 *
 * The main app's I18nProvider depends on TanStack Router's useRouterState
 * to derive locale from the pathname. Inside a Wix page there is no
 * TanStack router, so we short-circuit: the locale comes straight from the
 * `locale` attribute the Custom Element received (which Velo sets from
 * Wix Multilingual).
 */

import { useEffect, useMemo, useState, type ReactNode } from "react";

// Re-import the same context and translations table the app uses, so every
// child component's useI18n() call keeps working unchanged.
import type { Lang } from "@/i18n/translations";
import { LANGS, translations } from "@/i18n/translations";

import { createContext } from "react";

type I18nContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  langs: readonly Lang[];
};

// The main context is defined in src/i18n/context.tsx; we re-declare a compatible
// one here because the module also runs code that assumes a Router. Components
// call useI18n() from the main context — to keep them working, we monkey-patch
// the module-level context AFTER import via an env check inside the bundle.
//
// Simplest reliable path: re-export a Provider that writes into the SAME
// context symbol. We do this by re-importing it lazily.
import * as MainI18n from "@/i18n/context";

const InternalContext = createContext<I18nContextValue | null>(null);

function toLang(locale: string): Lang {
  const l = locale.toLowerCase();
  if (l === "br" || l === "pt" || l === "pt-br") return "PT";
  if (l === "fr") return "FR";
  return "EN";
}

export function I18nProviderStandalone({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(() => toLang(locale));

  useEffect(() => {
    setLangState(toLang(locale));
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang: setLangState,
      t: (key: string) => translations[lang][key] ?? translations.EN[key] ?? key,
      langs: LANGS,
    }),
    [lang],
  );

  // Wrap both the internal context (for our own usage) AND the main app's
  // I18nProvider — the latter is what every existing component reads via
  // `useI18n()`. MainI18n.I18nProvider expects to derive language from the
  // router; in a Wix page there is no router so it will fall back to EN.
  // We override by rendering our own value via `MainI18n.I18nProvider`'s
  // parent context is not exported, so we instead use its Provider and
  // then inject our own via a second wrapper below.
  return (
    <InternalContext.Provider value={value}>
      <MainI18n.I18nProvider>
        <LangSync targetLang={lang}>{children}</LangSync>
      </MainI18n.I18nProvider>
    </InternalContext.Provider>
  );
}

function LangSync({ targetLang, children }: { targetLang: Lang; children: ReactNode }) {
  const { lang, setLang } = MainI18n.useI18n();
  useEffect(() => {
    if (lang !== targetLang) setLang(targetLang);
  }, [lang, targetLang, setLang]);
  return <>{children}</>;
}
