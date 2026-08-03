import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";


import kidsHero from "@/assets/collection-hero-kids.jpg?url";
import kidsHeroSrc from "@/assets/collection-hero-kids.jpg?w=768;1200;1920&format=avif;webp;jpg&as=picture";
import { Collection } from "@/components/eyegis/Collection";
import { FAQ } from "@/components/eyegis/FAQ";
import { PageHero } from "@/components/eyegis/PageHero";
import { ShopOnAmazon } from "@/components/eyegis/ShopOnAmazon";
import { WhatsInTheBox } from "@/components/eyegis/WhatsInTheBox";
import { DEFAULT_AMAZON_URL } from "@/lib/amazon";
import kidsData from "@/content/kids.json";

const COPY = {
  br: {
    eyebrow: kidsData.PT?.eyebrow,
    title: (
      <>
        {kidsData.PT?.title}<br />
        <span className="italic text-mint">{kidsData.PT?.titleAccent}</span>
      </>
    ),
    subtitle: kidsData.PT?.subtitle,
    ctaLabel: kidsData.PT?.ctaLabel,
    metaTitle: "Coleção Kids — Eyegis",
    metaDesc: "Proteção contra luz azul projetada para os mais jovens.",
  },
  en: {
    eyebrow: kidsData.EN?.eyebrow,
    title: (
      <>
        {kidsData.EN?.title}<br />
        <span className="italic text-mint">{kidsData.EN?.titleAccent}</span>
      </>
    ),
    subtitle: kidsData.EN?.subtitle,
    ctaLabel: kidsData.EN?.ctaLabel,
    metaTitle: "Kids Collection — Eyegis",
    metaDesc: "Blue light protection engineered for young minds.",
  },
  fr: {
    eyebrow: kidsData.FR?.eyebrow,
    title: (
      <>
        {kidsData.FR?.title}<br />
        <span className="italic text-mint">{kidsData.FR?.titleAccent}</span>
      </>
    ),
    subtitle: kidsData.FR?.subtitle,
    ctaLabel: kidsData.FR?.ctaLabel,
    metaTitle: "Collection Kids — Eyegis",
    metaDesc: "Protection contre la lumière bleue conçue pour les plus jeunes.",
  },
} as const;

export const Route = createFileRoute("/$locale/kids")({
  head: ({ params }) => {
    const locale = (params.locale in COPY ? params.locale : "br") as "br" | "en" | "fr";
    const c = COPY[locale];
    return buildSeo({
      title: c.metaTitle,
      description: c.metaDesc,
      path: `/${locale}/kids`,
      image: `https://eye-charm-guardian.lovable.app${kidsHero}`,
      locale,
      localizedBasePath: "/kids",
    });
  },

  component: KidsPage,
});

function KidsPage() {
  const { locale } = Route.useParams();
  const c = COPY[locale as keyof typeof COPY] ?? COPY.br;
  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
        bgImage={kidsHero}
        bgSource={kidsHeroSrc}
        tone="dark"
        externalCta={{ label: c.ctaLabel, href: DEFAULT_AMAZON_URL }}
      />
      <Collection audience="kids" />
      <WhatsInTheBox />
      <ShopOnAmazon />
      <FAQ />
    </>
  );
}
