import { createFileRoute } from "@tanstack/react-router";

import heroZenith from "@/assets/hero-zenith-man.jpg";
import heroZenithSrc from "@/assets/hero-zenith-man.jpg?w=768;1200;1920&format=avif;webp;jpg&as=picture";

import { Collection } from "@/components/eyegis/Collection";
import { EyegisGuard } from "@/components/eyegis/EyegisGuard";
import { FAQ } from "@/components/eyegis/FAQ";
import { LifestyleUniverse } from "@/components/eyegis/LifestyleUniverse";
import { ModelRunway } from "@/components/eyegis/ModelRunway";
import { PageHero } from "@/components/eyegis/PageHero";
import { ShopOnAmazon } from "@/components/eyegis/ShopOnAmazon";
import { DEFAULT_AMAZON_URL } from "@/lib/amazon";

const COPY = {
  pt: {
    eyebrow: "Coleção · Homem",
    title: (
      <>
        Zenith<br />
        <span className="italic text-cyan-200">para a rotina 24/7.</span>
      </>
    ),
    subtitle:
      "Proteção de alta intensidade contra luz azul e reflexos. Armações discretas, acabamento matte e engenharia italiana para quem passa o dia entre telas.",
    ctaLabel: "Ver coleção Zenith",
    metaTitle: "Coleção Homem — Eyegis Zenith",
    metaDesc:
      "Óculos masculinos Eyegis Zenith: proteção contra luz azul, armações discretas e engenharia premium para o dia digital.",
  },
  en: {
    eyebrow: "Collection · Men",
    title: (
      <>
        Zenith<br />
        <span className="italic text-cyan-200">for the 24/7 hustle.</span>
      </>
    ),
    subtitle:
      "High-intensity blue light and glare protection. Discreet frames, matte finishes, and Italian engineering for anyone living between screens.",
    ctaLabel: "Shop the Zenith collection",
    metaTitle: "Men's Collection — Eyegis Zenith",
    metaDesc:
      "Eyegis Zenith men's eyewear: high-intensity blue light protection, discreet frames, and premium engineering for the digital day.",
  },
  fr: {
    eyebrow: "Collection · Homme",
    title: (
      <>
        Zenith<br />
        <span className="italic text-cyan-200">pour le rythme 24/7.</span>
      </>
    ),
    subtitle:
      "Protection haute intensité contre la lumière bleue et les reflets. Montures discrètes, finitions mates et ingénierie italienne pour ceux qui vivent entre les écrans.",
    ctaLabel: "Voir la collection Zenith",
    metaTitle: "Collection Homme — Eyegis Zenith",
    metaDesc:
      "Lunettes homme Eyegis Zenith : protection haute intensité contre la lumière bleue, montures discrètes et ingénierie premium.",
  },
} as const;

export const Route = createFileRoute("/$locale/men")({
  head: ({ params }) => {
    const c = COPY[params.locale as keyof typeof COPY] ?? COPY.pt;
    return {
      meta: [
        { title: c.metaTitle },
        { name: "description", content: c.metaDesc },
        { property: "og:title", content: c.metaTitle },
        { property: "og:description", content: c.metaDesc },
        { property: "og:image", content: heroZenith },
      ],
    };
  },
  component: MenPage,
});

function MenPage() {
  const { locale } = Route.useParams();
  const c = COPY[locale as keyof typeof COPY] ?? COPY.pt;
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
      <Collection />
      <LifestyleUniverse />
      <ModelRunway />
      <EyegisGuard />
      <ShopOnAmazon />
      <FAQ />
    </>
  );
}
