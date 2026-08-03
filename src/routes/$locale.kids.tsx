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
    eyebrow: kidsData.br.eyebrow,
    title: (
      <>
        {kidsData.br.title}<br />
        <span className="italic text-mint">{kidsData.br.titleAccent}</span>
      </>
    ),
    subtitle: kidsData.br.subtitle,
    ctaLabel: kidsData.br.ctaLabel,
    metaTitle: "Kids & Teens — Eyegis",
    metaDesc: "Kids & Teens da Eyegis: armações leves, flexíveis e resistentes para o dia em telas.",
  },
  en: {
    eyebrow: kidsData.en.eyebrow,
    title: (
      <>
        {kidsData.en.title}<br />
        <span className="italic text-mint">{kidsData.en.titleAccent}</span>
      </>
    ),
    subtitle: kidsData.en.subtitle,
    ctaLabel: kidsData.en.ctaLabel,
    metaTitle: "Kids & Teens — Eyegis",
    metaDesc: "Eyegis Kids & Teens: lightweight, flexible, impact-resistant frames for a life on screens.",
  },
  fr: {
    eyebrow: "Collection · Enfants & Ados",
    title: (
      <>
        Protection<br />
        <span className="italic text-mint">pour la génération des écrans.</span>
      </>
    ),
    subtitle: "Montures légères, flexibles et résistantes — pour l'étude, le jeu et les cours à distance.",
    ctaLabel: "Voir la collection Enfants",
    metaTitle: "Kids & Teens — Eyegis",
    metaDesc: "Eyegis Kids & Teens : montures légères, flexibles et résistantes pour la vie sur écrans.",
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
