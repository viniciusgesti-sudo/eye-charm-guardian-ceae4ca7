import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";


import heroZenith from "@/assets/hero-zenith-man.jpg?url";
import heroZenithSrc from "@/assets/hero-zenith-man.jpg?w=768;1200;1920&format=avif;webp;jpg&as=picture";

import { Collection } from "@/components/eyegis/Collection";
import { EyegisGuard } from "@/components/eyegis/EyegisGuard";
import { FAQ } from "@/components/eyegis/FAQ";
import { LifestyleUniverse } from "@/components/eyegis/LifestyleUniverse";
import { ModelRunway } from "@/components/eyegis/ModelRunway";
import { PageHero } from "@/components/eyegis/PageHero";
import { ShopOnAmazon } from "@/components/eyegis/ShopOnAmazon";
import { DEFAULT_AMAZON_URL } from "@/lib/amazon";

const COPY = {
  br: {
    eyebrow: "Coleção · Homem",
    title: (
      <>
        Meridian<br />
        <span className="italic text-mint">para quem vive em telas.</span>
      </>
    ),
    subtitle:
      "Acetato preto brilhante, hastes douradas e lente com filtro E-Guard Retina™. Silhueta discreta, testada em laboratório contra luz azul de alta energia — do escritório à noite.",
    ctaLabel: "Ver na Amazon",
    metaTitle: "Coleção Homem — Eyegis Meridian",
    metaDesc:
      "Eyegis Meridian: acetato preto, hastes douradas e proteção laboratorial contra luz azul. A eyewear masculina para o dia digital.",
  },
  en: {
    eyebrow: "Collection · Men",
    title: (
      <>
        Meridian<br />
        <span className="italic text-mint">for the screen-bound day.</span>
      </>
    ),
    subtitle:
      "Glossy black acetate, gold temples and E-Guard Retina™ lens. A discreet silhouette, lab-tested against high-energy blue light — from office to nightfall.",
    ctaLabel: "Shop on Amazon",
    metaTitle: "Men's Collection — Eyegis Meridian",
    metaDesc:
      "Eyegis Meridian: black acetate, gold temples and lab-tested blue-light protection. The men's eyewear for the digital day.",
  },
  fr: {
    eyebrow: "Collection · Homme",
    title: (
      <>
        Meridian<br />
        <span className="italic text-mint">pour la journée sur écran.</span>
      </>
    ),
    subtitle:
      "Acétate noir brillant, branches dorées et verre E-Guard Retina™. Une silhouette discrète, testée en laboratoire contre la lumière bleue haute énergie — du bureau à la nuit.",
    ctaLabel: "Voir sur Amazon",
    metaTitle: "Collection Homme — Eyegis Meridian",
    metaDesc:
      "Eyegis Meridian : acétate noir, branches dorées et protection testée en laboratoire contre la lumière bleue.",
  },
} as const;


export const Route = createFileRoute("/$locale/men")({
  head: ({ params }) => {
    const locale = (params.locale in COPY ? params.locale : "br") as "br" | "en" | "fr";
    const c = COPY[locale];
    return buildSeo({
      title: c.metaTitle,
      description: c.metaDesc,
      path: `/${locale}/men`,
      image: `https://eye-charm-guardian.lovable.app${heroZenith}`,
      locale,
      localizedBasePath: "/men",
    });
  },

  component: MenPage,
});

function MenPage() {
  const { locale } = Route.useParams();
  const c = COPY[locale as keyof typeof COPY] ?? COPY.br;
  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
        bgImage={heroZenith}
        bgSource={heroZenithSrc}
        tone="dark"
        externalCta={{ label: c.ctaLabel, href: DEFAULT_AMAZON_URL }}
      />
      <Collection audience="men" />
      <LifestyleUniverse audience="men" />
      <ModelRunway audience="men" />

      <EyegisGuard />
      <ShopOnAmazon />
      <FAQ />
    </>
  );
}
