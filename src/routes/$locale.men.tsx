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
import { useContentDocument } from "@/lib/cms";

const COPY = {
  br: {
    eyebrow: menData.PT?.eyebrow,
    title: (
      <>
        {menData.PT?.title}<br />
        <span className="italic text-mint">{menData.PT?.titleAccent}</span>
      </>
    ),
    subtitle: menData.PT?.subtitle,
    ctaLabel: menData.PT?.ctaLabel,
    metaTitle: menData.PT?.metaTitle,
    metaDesc: menData.PT?.metaDesc,
  },
  en: {
    eyebrow: menData.EN?.eyebrow,
    title: (
      <>
        {menData.EN?.title}<br />
        <span className="italic text-mint">{menData.EN?.titleAccent}</span>
      </>
    ),
    subtitle: menData.EN?.subtitle,
    ctaLabel: menData.EN?.ctaLabel,
    metaTitle: menData.EN?.metaTitle,
    metaDesc: menData.EN?.metaDesc,
  },
  fr: {
    eyebrow: menData.FR?.eyebrow,
    title: (
      <>
        {menData.FR?.title}<br />
        <span className="italic text-mint">{menData.FR?.titleAccent}</span>
      </>
    ),
    subtitle: menData.FR?.subtitle,
    ctaLabel: menData.FR?.ctaLabel,
    metaTitle: menData.FR?.metaTitle,
    metaDesc: menData.FR?.metaDesc,
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
  const content = useContentDocument<typeof menData>("men", menData);
  const lang = locale === "br" ? "PT" : locale.toUpperCase() as "EN" | "FR";
  const page = content[lang] ?? content.PT;
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={<>{page.title}<br /><span className="italic text-mint">{page.titleAccent}</span></>}
        subtitle={page.subtitle}
        bgImage={heroZenith}
        bgSource={heroZenithSrc}
        tone="dark"
        externalCta={{ label: page.ctaLabel, href: DEFAULT_AMAZON_URL }}
      />
      <Collection audience="men" />
      <LifestyleUniverse audience="men" compact />
      
      <ShopOnAmazon />
      <FAQ />
    </>
  );
}
