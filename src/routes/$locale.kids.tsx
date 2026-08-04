import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, SITE } from "@/lib/seo";

import kidsHero from "@/assets/collection-hero-kids.jpg?url";
import kidsHeroSrc from "@/assets/collection-hero-kids.jpg?w=768;1200;1920&format=avif;webp;jpg&as=picture";
import { Collection } from "@/components/eyegis/Collection";
import { FAQ } from "@/components/eyegis/FAQ";
import { PageHero } from "@/components/eyegis/PageHero";
import { ShopOnAmazon } from "@/components/eyegis/ShopOnAmazon";
import { WhatsInTheBox } from "@/components/eyegis/WhatsInTheBox";
import { DEFAULT_AMAZON_URL } from "@/lib/amazon";
import kidsData from "@/content/kids.json";
import { useContentDocument } from "@/lib/cms";

const COPY = {
  br: {
    eyebrow: kidsData.PT?.eyebrow,
    title: (
      <>
        {kidsData.PT?.title}
        <br />
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
        {kidsData.EN?.title}
        <br />
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
        {kidsData.FR?.title}
        <br />
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
      image: `${SITE}${kidsHero}`,
      locale,
      localizedBasePath: "/kids",
    });
  },

  component: KidsPage,
});

function KidsPage() {
  const { locale } = Route.useParams();
  const content = useContentDocument<typeof kidsData>("kids", kidsData);
  const lang = locale === "br" ? "PT" : (locale.toUpperCase() as "EN" | "FR");
  const page = content[lang] ?? content.PT;
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={
          <>
            {page.title}
            <br />
            <span className="italic text-mint">{page.titleAccent}</span>
          </>
        }
        subtitle={page.subtitle}
        bgImage={kidsHero}
        bgSource={kidsHeroSrc}
        tone="dark"
        externalCta={{ label: page.ctaLabel, href: DEFAULT_AMAZON_URL }}
      />
      <Collection audience="kids" />
      <WhatsInTheBox />
      <ShopOnAmazon />
      <FAQ />
    </>
  );
}
