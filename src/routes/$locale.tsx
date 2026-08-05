import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { Suspense, lazy, useEffect } from "react";

const Footer = lazy(() =>
  import("@/components/eyegis/Footer").then((m) => ({ default: m.Footer })),
);
import { Header } from "@/components/eyegis/Header";
import { StickyBuyBar } from "@/components/eyegis/StickyBuyBar";
import { useI18n } from "@/i18n/context";
import { toHtmlLanguage, type Lang } from "@/i18n/translations";

const ComingSoonModal = lazy(() =>
  import("@/components/eyegis/ComingSoonModal").then((m) => ({ default: m.ComingSoonModal })),
);

const VALID = ["br", "en", "fr"] as const;
type ValidLocale = (typeof VALID)[number];

function isValid(v: string): v is ValidLocale {
  return (VALID as readonly string[]).includes(v);
}

function localeToLang(locale: string): Lang {
  return locale === "br" ? "PT" : (locale.toUpperCase() as Lang);
}

export const Route = createFileRoute("/$locale")({
  beforeLoad: ({ params }) => {
    if (!isValid(params.locale)) {
      throw redirect({
        to: "/$locale",
        params: { locale: "br" },
        replace: true,
      });
    }
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  const { locale } = Route.useParams();
  const { lang, setLang } = useI18n();
  const target = localeToLang(locale);

  useEffect(() => {
    if (lang !== target) setLang(target);
    if (typeof document !== "undefined") {
      document.documentElement.lang = toHtmlLanguage(target);
    }
  }, [locale, target, lang, setLang]);

  return (
    <main
      id="main"
      tabIndex={-1}
      className="bg-background text-foreground overflow-x-hidden outline-none"
    >
      <Header />
      <Outlet />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <StickyBuyBar />
      <Suspense fallback={null}>
        <ComingSoonModal />
      </Suspense>
    </main>
  );
}
