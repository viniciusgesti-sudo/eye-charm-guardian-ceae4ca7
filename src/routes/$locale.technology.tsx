import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { buildSeo } from "@/lib/seo";

// Above-the-fold intro stays eager so the page hero is fully SSR/hydrated.
import { OurTechnology } from "@/components/eyegis/OurTechnology";

// Everything below the hero is behind a tabbed deep-dive to keep the page
// short (target ~7 screens vs. the previous ~27). See TechnologyDeepDive
// for the tab wiring and lazy panels.
const TechCore = lazy(() =>
  import("@/components/eyegis/TechCore").then((m) => ({ default: m.TechCore })),
);
const TechnologyDeepDive = lazy(() =>
  import("@/components/eyegis/TechnologyDeepDive").then((m) => ({
    default: m.TechnologyDeepDive,
  })),
);
const ShopOnAmazon = lazy(() =>
  import("@/components/eyegis/ShopOnAmazon").then((m) => ({ default: m.ShopOnAmazon })),
);

const META = {
  br: {
    title: "Tecnologia — Eyegis | E-Guard Retina™ & Circadian™",
    description:
      "Conheça a engenharia óptica Eyegis: E-Guard Retina™ para a fadiga digital diurna e E-Guard Circadian™ para o sono noturno.",
  },
  en: {
    title: "Technology — Eyegis | E-Guard Retina™ & Circadian™",
    description:
      "Discover Eyegis' optical engineering: E-Guard Retina™ for daytime digital fatigue and E-Guard Circadian™ for evening sleep protection.",
  },
  fr: {
    title: "Technologie — Eyegis | E-Guard Retina™ & Circadian™",
    description:
      "Découvrez l'ingénierie optique Eyegis : E-Guard Retina™ pour la fatigue diurne et E-Guard Circadian™ pour la protection du sommeil.",
  },
} as const;

export const Route = createFileRoute("/$locale/technology")({
  head: ({ params }) => {
    const locale = (params.locale in META ? params.locale : "br") as "br" | "en" | "fr";
    const m = META[locale];
    return buildSeo({
      title: m.title,
      description: m.description,
      path: `/${locale}/technology`,
      locale,
      localizedBasePath: "/technology",
    });
  },

  component: TechnologyPage,
});

function TechnologyPage() {
  return (
    <>
      <OurTechnology />
      <Suspense fallback={<div style={{ minHeight: 320 }} aria-hidden />}>
        <TechCore />
        <TechnologyDeepDive />
        <ShopOnAmazon />
      </Suspense>
    </>
  );
}



