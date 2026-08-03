import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";


import heroClarity from "@/assets/products/solene-front.jpg?url";
import heroClaritySrc from "@/assets/products/solene-front.jpg?w=768;1200;1920&format=avif;webp;jpg&as=picture";

import { Collection } from "@/components/eyegis/Collection";
import { FAQ } from "@/components/eyegis/FAQ";
import { LifestyleUniverse } from "@/components/eyegis/LifestyleUniverse";

import { PageHero } from "@/components/eyegis/PageHero";
import { ShopOnAmazon } from "@/components/eyegis/ShopOnAmazon";
import { DEFAULT_AMAZON_URL } from "@/lib/amazon";
import womenData from "@/content/women.json";

const COPY = {
  br: {
    eyebrow: womenData.br.eyebrow,
    title: (
      <>
        {womenData.br.title}<br />
        <span className="italic text-teal-deep">{womenData.br.titleAccent}</span>
      </>
    ),
    subtitle: womenData.br.subtitle,
    ctaLabel: womenData.br.ctaLabel,
    metaTitle: "Coleção Feminina — Eyegis",
    metaDesc: "Coleção Feminina Eyegis: cat-eye em acetato tartaruga com shield-G dourado.",
  },
  en: {
    eyebrow: womenData.en.eyebrow,
    title: (
      <>
        {womenData.en.title}<br />
        <span className="italic text-teal-deep">{womenData.en.titleAccent}</span>
      </>
    ),
    subtitle: womenData.en.subtitle,
    ctaLabel: womenData.en.ctaLabel,
    metaTitle: "Women's Collection — Eyegis",
    metaDesc: "Eyegis Women's Collection: tortoise cat-eye with a discreet gold shield-G.",
  },
  fr: {
    eyebrow: "Collection · Femme",
    title: (
      <>
        Collection Femme<br />
        <span className="italic text-teal-deep">pour celles qui créent.</span>
      </>
    ),
    subtitle: "Un cat-eye en acétate écaille avec un discret shield-G doré sur la branche.",
    ctaLabel: "Voir sur Amazon",
    metaTitle: "Collection Femme — Eyegis",
    metaDesc: "Collection Femme Eyegis : cat-eye écaille avec un discret shield-G doré.",
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
      <LifestyleUniverse audience="women" compact />
      
      <ShopOnAmazon />
      <FAQ />
    </>
  );
}
