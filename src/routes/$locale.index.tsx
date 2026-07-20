import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { Hero } from "@/components/eyegis/Hero";
import { TrustStrip } from "@/components/eyegis/TrustStrip";
import { buildSeo, DEFAULT_LOCALE, type Locale } from "@/lib/seo";
import heroZenith from "@/assets/hero-saopaulo-eyegis.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import heroClarity from "@/assets/hero-paris-eyegis.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";


// Below-the-fold sections are lazy-loaded to shrink the initial home chunk.
const HowItWorks = lazy(() =>
  import("@/components/eyegis/HowItWorks").then((m) => ({ default: m.HowItWorks })),
);
const Universe = lazy(() =>
  import("@/components/eyegis/Universe").then((m) => ({ default: m.Universe })),
);
const OurTechnology = lazy(() =>
  import("@/components/eyegis/OurTechnology").then((m) => ({ default: m.OurTechnology })),
);
const LifestyleUniverse = lazy(() =>
  import("@/components/eyegis/LifestyleUniverse").then((m) => ({ default: m.LifestyleUniverse })),
);
const HonestScienceTeaser = lazy(() =>
  import("@/components/eyegis/HonestScienceTeaser").then((m) => ({ default: m.HonestScienceTeaser })),
);
const SocialProof = lazy(() =>
  import("@/components/eyegis/SocialProof").then((m) => ({ default: m.SocialProof })),
);
const ShopOnAmazon = lazy(() =>
  import("@/components/eyegis/ShopOnAmazon").then((m) => ({ default: m.ShopOnAmazon })),
);
const FAQ = lazy(() =>
  import("@/components/eyegis/FAQ").then((m) => ({ default: m.FAQ })),
);

const META = {
  br: {
    title: "Eyegis — Óculos de proteção digital com estilo",
    description:
      "Óculos premium com filtro de luz azul, engenharia científica e design atemporal para a geração digital.",
  },
  en: {
    title: "Eyegis — Engineered for Vision. Designed for Style.",
    description:
      "Premium blue-light filtering eyewear for the digital generation. Scientifically engineered. Timelessly designed.",
  },
  fr: {
    title: "Eyegis — Conçu pour la vision. Dessiné pour le style.",
    description:
      "Lunettes premium à filtre de lumière bleue pour la génération numérique. Ingénierie scientifique, design intemporel.",
  },
} as const;

export const Route = createFileRoute("/$locale/")({
  head: ({ params }) => {
    const locale = (params.locale in META ? params.locale : DEFAULT_LOCALE) as Locale;
    const m = META[locale];
    const seo = buildSeo({
      title: m.title,
      description: m.description,
      path: `/${locale}`,
      locale,
      localizedBasePath: "",
    });
    // Preload LCP hero images (split-screen — both are candidates above the fold).
    const heroSizes = "(min-width: 1024px) 50vw, 100vw";
    return {
      ...seo,
      links: [
        ...seo.links,
        { rel: "preload", as: "image", href: heroZenith.img.src, imageSrcSet: heroZenith.sources.avif, imageSizes: heroSizes, type: "image/avif", fetchPriority: "high" } as unknown as { rel: string; href: string },
        { rel: "preload", as: "image", href: heroClarity.img.src, imageSrcSet: heroClarity.sources.avif, imageSizes: heroSizes, type: "image/avif", fetchPriority: "high" } as unknown as { rel: string; href: string },
      ],
    };
  },
  component: HomePage,
});


const SectionFallback = () => <div style={{ minHeight: 400 }} aria-hidden />;

function HomePage() {
  const { locale } = Route.useParams();
  return (
    <>
      <Hero locale={locale} />
      <TrustStrip />
      <Suspense fallback={<SectionFallback />}>
        <HowItWorks />
        <Universe />
        <OurTechnology />
        <LifestyleUniverse />
        <HonestScienceTeaser />
        <SocialProof />
        <ShopOnAmazon />
        <FAQ />
      </Suspense>
    </>
  );
}
