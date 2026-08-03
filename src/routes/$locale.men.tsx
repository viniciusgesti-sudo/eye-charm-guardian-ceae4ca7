import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";


import heroZenith from "@/assets/hero-zenith-man.jpg?url";
import heroZenithSrc from "@/assets/hero-zenith-man.jpg?w=768;1200;1920&format=avif;webp;jpg&as=picture";

import { Collection } from "@/components/eyegis/Collection";
import { FAQ } from "@/components/eyegis/FAQ";
import { LifestyleUniverse } from "@/components/eyegis/LifestyleUniverse";

import { PageHero } from "@/components/eyegis/PageHero";
import { ShopOnAmazon } from "@/components/eyegis/ShopOnAmazon";
import { DEFAULT_AMAZON_URL } from "@/lib/amazon";
import menData from "@/content/men.json";

const COPY = {
  br: {
    eyebrow: menData.br.eyebrow,
    title: (
      <>
        {menData.br.title}<br />
        <span className="italic text-mint">{menData.br.titleAccent}</span>
      </>
    ),
    subtitle: menData.br.subtitle,
    ctaLabel: menData.br.ctaLabel,
    metaTitle: menData.br.metaTitle,
    metaDesc: menData.br.metaDesc,
  },
  en: {
    eyebrow: menData.en.eyebrow,
    title: (
      <>
        {menData.en.title}<br />
        <span className="italic text-mint">{menData.en.titleAccent}</span>
      </>
    ),
    subtitle: menData.en.subtitle,
    ctaLabel: menData.en.ctaLabel,
    metaTitle: menData.en.metaTitle,
    metaDesc: menData.en.metaDesc,
  },
  fr: {
    eyebrow: menData.fr.eyebrow,
    title: (
      <>
        {menData.fr.title}<br />
        <span className="italic text-mint">{menData.fr.titleAccent}</span>
      </>
    ),
    subtitle: menData.fr.subtitle,
    ctaLabel: menData.fr.ctaLabel,
    metaTitle: menData.fr.metaTitle,
    metaDesc: menData.fr.metaDesc,
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
      <LifestyleUniverse audience="men" compact />
      
      <ShopOnAmazon />
      <FAQ />
    </>
  );
}
