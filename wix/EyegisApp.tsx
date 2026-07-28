/**
 * EyegisApp — page selector for the Wix bundle.
 *
 * The Wix Custom Element passes a `page` attribute. We render the matching
 * React tree from the existing components. NO routing library is loaded
 * here — Wix owns URLs. Internal navigation uses <a href="/men"> so Wix
 * handles it as a normal page transition.
 *
 * Every page tree reuses the SAME components the TanStack app already
 * ships, so visual fidelity is guaranteed.
 */

import { lazy, Suspense, useEffect } from "react";

import { Hero } from "@/components/eyegis/Hero";
import { TrustStrip } from "@/components/eyegis/TrustStrip";
import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

const HowItWorks = lazy(() =>
  import("@/components/eyegis/HowItWorks").then((m) => ({ default: m.HowItWorks })),
);
const Universe = lazy(() =>
  import("@/components/eyegis/Universe").then((m) => ({ default: m.Universe })),
);
const HonestScienceTeaser = lazy(() =>
  import("@/components/eyegis/HonestScienceTeaser").then((m) => ({ default: m.HonestScienceTeaser })),
);
const ShopOnAmazon = lazy(() =>
  import("@/components/eyegis/ShopOnAmazon").then((m) => ({ default: m.ShopOnAmazon })),
);
const FAQ = lazy(() =>
  import("@/components/eyegis/FAQ").then((m) => ({ default: m.FAQ })),
);
const Collection = lazy(() =>
  import("@/components/eyegis/Collection").then((m) => ({ default: m.Collection })),
);
const LifestyleUniverse = lazy(() =>
  import("@/components/eyegis/LifestyleUniverse").then((m) => ({ default: m.LifestyleUniverse })),
);
const OurTechnology = lazy(() =>
  import("@/components/eyegis/OurTechnology").then((m) => ({ default: m.OurTechnology })),
);
const AboutPage = lazy(() =>
  import("@/components/eyegis/AboutPage").then((m) => ({ default: m.AboutPage })),
);
const FAQPage = lazy(() =>
  import("@/components/eyegis/FAQPage").then((m) => ({ default: m.FAQPage })),
);
const ContactPage = lazy(() =>
  import("@/components/eyegis/ContactPage").then((m) => ({ default: m.ContactPage })),
);
const LensesPage = lazy(() =>
  import("@/components/eyegis/LensesPage").then((m) => ({ default: m.LensesPage })),
);

import { I18nProviderStandalone } from "./I18nProviderStandalone";

export type PageId =
  | "home"
  | "men"
  | "women"
  | "kids"
  | "technology"
  | "lenses"
  | "about"
  | "faq"
  | "contact";

const Fallback = () => <div style={{ minHeight: 300 }} aria-hidden />;

function HomeTree({ locale }: { locale: string }) {
  return (
    <>
      <Hero locale={locale} />
      <TrustStrip />
      <Suspense fallback={<Fallback />}>
        <Collection />
        <HowItWorks />
        <Universe />
        <LifestyleUniverse />
        <HonestScienceTeaser />
        <ShopOnAmazon />
        <FAQ />
      </Suspense>
    </>
  );
}

function GenderTree({ page }: { page: "men" | "women" | "kids" }) {
  return (
    <Suspense fallback={<Fallback />}>
      <Collection focus={page} />
      <LifestyleUniverse audience={page} />
      <ShopOnAmazon />
    </Suspense>
  );
}

export function EyegisApp({ page, locale }: { page: PageId; locale: string }) {
  return (
    <I18nProviderStandalone locale={locale}>
      <PageBody page={page} locale={locale} />
    </I18nProviderStandalone>
  );
}

function PageBody({ page, locale }: { page: PageId; locale: string }) {
  const { setLang } = useI18n();
  useEffect(() => {
    setLang(localeToLang(locale));
  }, [locale, setLang]);

  switch (page) {
    case "home":
      return <HomeTree locale={locale} />;
    case "men":
    case "women":
    case "kids":
      return <GenderTree page={page} />;
    case "technology":
      return (
        <Suspense fallback={<Fallback />}>
          <OurTechnology />
        </Suspense>
      );
    case "lenses":
      return (
        <Suspense fallback={<Fallback />}>
          <LensesPage />
        </Suspense>
      );
    case "about":
      return (
        <Suspense fallback={<Fallback />}>
          <AboutPage />
        </Suspense>
      );
    case "faq":
      return (
        <Suspense fallback={<Fallback />}>
          <FAQPage />
        </Suspense>
      );
    case "contact":
      return (
        <Suspense fallback={<Fallback />}>
          <ContactPage />
        </Suspense>
      );
    default:
      return <div>Unknown page: {page}</div>;
  }
}

function localeToLang(locale: string): Lang {
  const l = locale.toLowerCase();
  if (l === "br" || l === "pt" || l === "pt-br") return "PT";
  if (l === "fr") return "FR";
  return "EN";
}
