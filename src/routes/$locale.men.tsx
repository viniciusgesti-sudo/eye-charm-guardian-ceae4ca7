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

const COPY = {
  br: {
    eyebrow: "Coleção · Homem",
    title: (
      <>
        Coleção Masculina<br />
        <span className="italic text-mint">para quem vive em telas.</span>
      </>
    ),
    subtitle:
      "Acetato preto, hastes douradas, silhueta discreta — do escritório à noite.",
    ctaLabel: "Ver na Amazon",
    metaTitle: "Coleção Masculina — Eyegis",
    metaDesc:
      "Coleção Masculina Eyegis: acetato preto, hastes douradas. Silhueta discreta para o dia digital.",
  },
  en: {
    eyebrow: "Collection · Men",
    title: (
      <>
        Men's Collection<br />
        <span className="italic text-mint">for the screen-bound day.</span>
      </>
    ),
    subtitle:
      "Glossy black acetate, gold temples, a discreet silhouette — office to nightfall.",
    ctaLabel: "Shop on Amazon",
    metaTitle: "Men's Collection — Eyegis",
    metaDesc:
      "Eyegis Men's Collection: glossy black acetate with gold temples. A discreet silhouette for the digital day.",
  },
  fr: {
    eyebrow: "Collection · Homme",
    title: (
      <>
        Collection Homme<br />
        <span className="italic text-mint">pour la journée sur écran.</span>
      </>
    ),
    subtitle:
      "Acétate noir, branches dorées, silhouette discrète — du bureau à la nuit.",
    ctaLabel: "Voir sur Amazon",
    metaTitle: "Collection Homme — Eyegis",
    metaDesc:
      "Collection Homme Eyegis : acétate noir brillant et branches dorées. Silhouette discrète pour la journée numérique.",
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
