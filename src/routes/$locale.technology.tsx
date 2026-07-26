import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { buildSeo } from "@/lib/seo";

const OurTechnology = lazy(() =>
  import("@/components/eyegis/OurTechnology").then((m) => ({ default: m.OurTechnology })),
);
const TechCore = lazy(() =>
  import("@/components/eyegis/TechCore").then((m) => ({ default: m.TechCore })),
);
const HonestScience = lazy(() =>
  import("@/components/eyegis/HonestScience").then((m) => ({ default: m.HonestScience })),
);
const SpectrumSignature = lazy(() =>
  import("@/components/eyegis/SpectrumSignature").then((m) => ({ default: m.SpectrumSignature })),
);
const ScienceInPractice = lazy(() =>
  import("@/components/eyegis/ScienceInPractice").then((m) => ({ default: m.ScienceInPractice })),
);
const EyegisGuard = lazy(() =>
  import("@/components/eyegis/EyegisGuard").then((m) => ({ default: m.EyegisGuard })),
);
const HowItWorks = lazy(() =>
  import("@/components/eyegis/HowItWorks").then((m) => ({ default: m.HowItWorks })),
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
      <Suspense fallback={<div style={{ minHeight: 400 }} aria-hidden />}>
        <TechCore />
        <SpectrumSignature />
        <HonestScience />
        <ScienceInPractice />
        <EyegisGuard />
        <HowItWorks />
        <ShopOnAmazon />
      </Suspense>
    </>
  );
}


