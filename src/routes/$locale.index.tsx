import { createFileRoute } from "@tanstack/react-router";

import { FAQ } from "@/components/eyegis/FAQ";
import { Hero } from "@/components/eyegis/Hero";
import { HowItWorks } from "@/components/eyegis/HowItWorks";
import { LifestyleUniverse } from "@/components/eyegis/LifestyleUniverse";
import { ShopOnAmazon } from "@/components/eyegis/ShopOnAmazon";
import { SocialProof } from "@/components/eyegis/SocialProof";
import { TrustStrip } from "@/components/eyegis/TrustStrip";
import { Universe } from "@/components/eyegis/Universe";
import { buildSeo, DEFAULT_LOCALE, type Locale } from "@/lib/seo";

const META = {
  pt: {
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
    return buildSeo({
      title: m.title,
      description: m.description,
      path: `/${locale}`,
      locale,
      localizedBasePath: "",
    });
  },
  component: HomePage,
});


function HomePage() {
  const { locale } = Route.useParams();
  return (
    <>
      <Hero locale={locale} />
      <TrustStrip />
      <HowItWorks />
      <Universe />
      <LifestyleUniverse />
      <SocialProof />
      <ShopOnAmazon />
      <FAQ />
    </>
  );
}
