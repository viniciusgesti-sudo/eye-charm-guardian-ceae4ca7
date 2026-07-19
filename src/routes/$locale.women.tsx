import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";


import heroClarity from "@/assets/hero-clarity-woman.jpg?url";
import heroClaritySrc from "@/assets/hero-clarity-woman.jpg?w=768;1200;1920&format=avif;webp;jpg&as=picture";

import { Collection } from "@/components/eyegis/Collection";
import { EyegisGuard } from "@/components/eyegis/EyegisGuard";
import { FAQ } from "@/components/eyegis/FAQ";
import { LifestyleUniverse } from "@/components/eyegis/LifestyleUniverse";
import { ModelRunway } from "@/components/eyegis/ModelRunway";
import { PageHero } from "@/components/eyegis/PageHero";
import { ShopOnAmazon } from "@/components/eyegis/ShopOnAmazon";
import { DEFAULT_AMAZON_URL } from "@/lib/amazon";

const COPY = {
  pt: {
    eyebrow: "Coleção · Mulher",
    title: (
      <>
        Clarity<br />
        <span className="italic text-teal-deep">para a visionária.</span>
      </>
    ),
    subtitle:
      "Alta fidelidade de cor, leveza de acetato champagne e proteção contra fadiga digital — pensados para quem cria, escreve e olha o mundo com estilo.",
    ctaLabel: "Ver coleção Clarity",
    metaTitle: "Coleção Mulher — Eyegis Clarity",
    metaDesc:
      "Óculos femininos Eyegis Clarity: alta precisão de cor, acetato premium e proteção contra a fadiga digital.",
  },
  en: {
    eyebrow: "Collection · Women",
    title: (
      <>
        Clarity<br />
        <span className="italic text-teal-deep">for the visionary.</span>
      </>
    ),
    subtitle:
      "High-fidelity color, lightweight champagne acetate, and digital-eye protection — for those who create, write, and see the world in style.",
    ctaLabel: "Shop the Clarity collection",
    metaTitle: "Women's Collection — Eyegis Clarity",
    metaDesc:
      "Eyegis Clarity women's eyewear: high-fidelity color, premium acetate, and digital eye strain protection.",
  },
  fr: {
    eyebrow: "Collection · Femme",
    title: (
      <>
        Clarity<br />
        <span className="italic text-teal-deep">pour la visionnaire.</span>
      </>
    ),
    subtitle:
      "Haute fidélité chromatique, acétate champagne léger et protection contre la fatigue numérique — pour celles qui créent, écrivent et regardent le monde avec style.",
    ctaLabel: "Voir la collection Clarity",
    metaTitle: "Collection Femme — Eyegis Clarity",
    metaDesc:
      "Lunettes femme Eyegis Clarity : haute fidélité des couleurs, acétate premium et protection contre la fatigue oculaire numérique.",
  },
} as const;

export const Route = createFileRoute("/$locale/women")({
  head: ({ params }) => {
    const locale = (params.locale in COPY ? params.locale : "br") as "br" | "en" | "fr";
    const c = COPY[locale];
    return buildSeo({
      title: c.metaTitle,
      description: c.metaDesc,
      path: `/${locale}/women`,
      image: `https://eye-charm-guardian.lovable.app${heroClarity}`,
      locale,
      localizedBasePath: "/women",
    });
  },

  component: WomenPage,
});

function WomenPage() {
  const { locale } = Route.useParams();
  const c = COPY[locale as keyof typeof COPY] ?? COPY.pt;
  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
        bgImage={heroClarity}
        bgSource={heroClaritySrc}
        tone="light"
        externalCta={{ label: c.ctaLabel, href: DEFAULT_AMAZON_URL }}
      />
      <Collection />
      <LifestyleUniverse />
      <ModelRunway />
      <EyegisGuard />
      <ShopOnAmazon />
      <FAQ />
    </>
  );
}
