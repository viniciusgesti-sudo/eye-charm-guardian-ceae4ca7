import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";


import kidsHero from "@/assets/collection-hero-kids.jpg?url";
import kidsHeroSrc from "@/assets/collection-hero-kids.jpg?w=768;1200;1920&format=avif;webp;jpg&as=picture";
import { Collection } from "@/components/eyegis/Collection";
import { FAQ } from "@/components/eyegis/FAQ";
import { PageHero } from "@/components/eyegis/PageHero";
import { ShopOnAmazon } from "@/components/eyegis/ShopOnAmazon";
import { DEFAULT_AMAZON_URL } from "@/lib/amazon";


const COPY = {
  br: {
    eyebrow: "Coleção · Kids & Teens",
    title: (
      <>
        Proteção<br />
        <span className="italic text-mint">para a geração das telas.</span>
      </>
    ),
    subtitle:
      "Armações leves e resistentes com filtro de luz azul. Estudo, jogos e videoaulas.",
    ctaLabel: "Ver coleção Kids",
    metaTitle: "Kids & Teens — Eyegis",
    metaDesc:
      "Kids & Teens da Eyegis: armações leves, flexíveis e resistentes com filtro de luz azul — feitas para estudo, jogos e videoaulas.",
  },
  en: {
    eyebrow: "Collection · Kids & Teens",
    title: (
      <>
        Protection<br />
        <span className="italic text-mint">for the screen generation.</span>
      </>
    ),
    subtitle:
      "Lightweight, impact-resistant frames with blue-light filter. Study, gaming, class.",
    ctaLabel: "Shop the Kids collection",
    metaTitle: "Kids & Teens — Eyegis",
    metaDesc:
      "Eyegis Kids & Teens: lightweight, flexible, impact-resistant frames with a blue-light filter — built for study, gaming, and remote learning.",
  },
  fr: {
    eyebrow: "Collection · Enfants & Ados",
    title: (
      <>
        Protection<br />
        <span className="italic text-mint">pour la génération des écrans.</span>
      </>
    ),
    subtitle:
      "Montures légères et résistantes avec filtre lumière bleue. Étude, jeu et cours.",
    ctaLabel: "Voir la collection Enfants",
    metaTitle: "Kids & Teens — Eyegis",
    metaDesc:
      "Eyegis Kids & Teens : montures légères, flexibles et résistantes avec filtre de lumière bleue — pensées pour l'étude, le jeu et les cours à distance.",
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
      <ShopOnAmazon />
      <FAQ compact />

    </>
  );
}
