import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";


import heroClarity from "@/assets/products/solene-front.jpg?url";
import heroClaritySrc from "@/assets/products/solene-front.jpg?w=768;1200;1920&format=avif;webp;jpg&as=picture";

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
    eyebrow: "Coleção · Mulher",
    title: (
      <>
        Women's Collection<br />
        <span className="italic text-teal-deep">para quem cria e escreve.</span>
      </>
    ),
    subtitle:
      "Cat-eye em acetato tartaruga, shield-G dourado discreto na haste e lente E-Guard Circadian™ — alta fidelidade de cor de dia, luz mais quente ao entardecer.",
    ctaLabel: "Ver na Amazon",
    metaTitle: "Women's Collection — Eyegis",
    metaDesc:
      "Eyegis Women's Collection: cat-eye em acetato tartaruga com lente E-Guard Circadian™. Cor fiel de dia, luz mais quente ao entardecer.",
  },
  en: {
    eyebrow: "Collection · Women",
    title: (
      <>
        Women's Collection<br />
        <span className="italic text-teal-deep">for those who create.</span>
      </>
    ),
    subtitle:
      "A cat-eye in tortoise acetate, discreet gold shield-G on the temple, and an E-Guard Circadian™ lens — true color by day, warmer light at dusk.",
    ctaLabel: "Shop on Amazon",
    metaTitle: "Women's Collection — Eyegis",
    metaDesc:
      "Eyegis Women's Collection: tortoise cat-eye with E-Guard Circadian™ lens. True color by day, warmer light at dusk.",
  },
  fr: {
    eyebrow: "Collection · Femme",
    title: (
      <>
        Women's Collection<br />
        <span className="italic text-teal-deep">pour celles qui créent.</span>
      </>
    ),
    subtitle:
      "Un cat-eye en acétate écaille, discret shield-G doré sur la branche et un verre E-Guard Circadian™ — couleurs fidèles le jour, lumière plus chaude au crépuscule.",
    ctaLabel: "Voir sur Amazon",
    metaTitle: "Women's Collection — Eyegis",
    metaDesc:
      "Eyegis Women's Collection : cat-eye écaille avec verre E-Guard Circadian™. Couleurs fidèles le jour, lumière plus chaude au crépuscule.",
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
  const c = COPY[locale as keyof typeof COPY] ?? COPY.br;
  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
        bgImage={heroClarity}
        bgSource={heroClaritySrc}
        tone="light"
        accent="champagne"
        externalCta={{ label: c.ctaLabel, href: DEFAULT_AMAZON_URL }}

      />
      <Collection audience="women" />
      <LifestyleUniverse audience="women" />
      <ModelRunway audience="women" />

      <EyegisGuard />
      <ShopOnAmazon />
      <FAQ />
    </>
  );
}
