import { createFileRoute } from "@tanstack/react-router";

import { EyegisGuard } from "@/components/eyegis/EyegisGuard";
import { HonestScience } from "@/components/eyegis/HonestScience";
import { HowItWorks } from "@/components/eyegis/HowItWorks";
import { OurTechnology } from "@/components/eyegis/OurTechnology";
import { ScienceInPractice } from "@/components/eyegis/ScienceInPractice";
import { ShopOnAmazon } from "@/components/eyegis/ShopOnAmazon";
import { TechCore } from "@/components/eyegis/TechCore";

const META = {
  pt: {
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
    const locale = (params.locale in META ? params.locale : "pt") as "pt" | "en" | "fr";
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
      <TechCore />
      <HonestScience />
      <ScienceInPractice />
      <EyegisGuard />
      <HowItWorks />
      <ShopOnAmazon />
    </>
  );
}
