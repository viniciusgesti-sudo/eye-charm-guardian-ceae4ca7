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
import { useContentDocument } from "@/lib/cms";

const COPY = {
  br: {
    eyebrow: womenData.PT?.eyebrow,
    title: (
      <>
        {womenData.PT?.title}<br />
        <span className="italic text-mint">{womenData.PT?.titleAccent}</span>
      </>
    ),
    subtitle: womenData.PT?.subtitle,
    ctaLabel: womenData.PT?.ctaLabel,
    metaTitle: "Coleção Feminina — Eyegis",
    metaDesc: "Descubra a elegância parisiense da coleção feminina Eyegis.",
  },
  en: {
    eyebrow: womenData.EN?.eyebrow,
    title: (
      <>
        {womenData.EN?.title}<br />
        <span className="italic text-mint">{womenData.EN?.titleAccent}</span>
      </>
    ),
    subtitle: womenData.EN?.subtitle,
    ctaLabel: womenData.EN?.ctaLabel,
    metaTitle: "Women's Collection — Eyegis",
    metaDesc: "Discover the Parisian elegance of the Eyegis women's collection.",
  },
  fr: {
    eyebrow: womenData.FR?.eyebrow,
    title: (
      <>
        {womenData.FR?.title}<br />
        <span className="italic text-mint">{womenData.FR?.titleAccent}</span>
      </>
    ),
    subtitle: womenData.FR?.subtitle,
    ctaLabel: womenData.FR?.ctaLabel,
    metaTitle: "Collection Femme — Eyegis",
    metaDesc: "Découvrez l'élégance parisienne de la collection femme Eyegis.",
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
  const content = useContentDocument<typeof womenData>("women", womenData);
  const lang = locale === "br" ? "PT" : locale.toUpperCase() as "EN" | "FR";
  const page = content[lang] ?? content.PT;
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={<>{page.title}<br /><span className="italic text-mint">{page.titleAccent}</span></>}
        subtitle={page.subtitle}
        bgImage={heroClarity}
        bgSource={heroClaritySrc}
        tone="light"
        accent="champagne"
        externalCta={{ label: page.ctaLabel, href: DEFAULT_AMAZON_URL }}

      />
      <Collection audience="women" />
      <LifestyleUniverse audience="women" compact />
      
      <ShopOnAmazon />
      <FAQ />
    </>
  );
}
