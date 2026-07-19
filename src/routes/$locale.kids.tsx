import { createFileRoute } from "@tanstack/react-router";

import kidsHero from "@/assets/life-student.jpg?url";
import kidsHeroSrc from "@/assets/life-student.jpg?w=768;1200;1920&format=avif;webp;jpg&as=picture";
import { Collection } from "@/components/eyegis/Collection";
import { FAQ } from "@/components/eyegis/FAQ";
import { PageHero } from "@/components/eyegis/PageHero";
import { ShopOnAmazon } from "@/components/eyegis/ShopOnAmazon";
import { VsGenerics } from "@/components/eyegis/VsGenerics";
import { WhatsInTheBox } from "@/components/eyegis/WhatsInTheBox";
import { DEFAULT_AMAZON_URL } from "@/lib/amazon";

const COPY = {
  pt: {
    eyebrow: "Coleção · Kids & Teens",
    title: (
      <>
        Proteção<br />
        <span className="italic text-teal-deep">para a geração das telas.</span>
      </>
    ),
    subtitle:
      "Armações leves, flexíveis e resistentes com o mesmo padrão óptico dos adultos. Feitos para estudo, jogos e videoaulas — sem fadiga visual.",
    ctaLabel: "Ver coleção Kids",
    metaTitle: "Coleção Kids & Teens — Eyegis",
    metaDesc:
      "Óculos infantis Eyegis com filtro de luz azul: armações leves, flexíveis e resistentes para o dia escolar digital.",
  },
  en: {
    eyebrow: "Collection · Kids & Teens",
    title: (
      <>
        Protection<br />
        <span className="italic text-teal-deep">for the screen generation.</span>
      </>
    ),
    subtitle:
      "Lightweight, flexible, impact-resistant frames with the same optical grade as the adult lineup. Built for study, gaming, and remote learning.",
    ctaLabel: "Shop the Kids collection",
    metaTitle: "Kids & Teens Collection — Eyegis",
    metaDesc:
      "Eyegis kids eyewear with blue-light filter: lightweight, flexible, and impact-resistant frames built for the digital school day.",
  },
  fr: {
    eyebrow: "Collection · Enfants & Ados",
    title: (
      <>
        Protection<br />
        <span className="italic text-teal-deep">pour la génération des écrans.</span>
      </>
    ),
    subtitle:
      "Montures légères, flexibles et résistantes avec la même qualité optique que la gamme adulte. Pensées pour l'étude, le jeu et les cours à distance.",
    ctaLabel: "Voir la collection Enfants",
    metaTitle: "Collection Enfants & Ados — Eyegis",
    metaDesc:
      "Lunettes enfants Eyegis avec filtre de lumière bleue : légères, flexibles et résistantes pour la journée d'école numérique.",
  },
} as const;

export const Route = createFileRoute("/$locale/kids")({
  head: ({ params }) => {
    const c = COPY[params.locale as keyof typeof COPY] ?? COPY.pt;
    return {
      meta: [
        { title: c.metaTitle },
        { name: "description", content: c.metaDesc },
        { property: "og:title", content: c.metaTitle },
        { property: "og:description", content: c.metaDesc },
        { property: "og:image", content: kidsHero },
      ],
    };
  },
  component: KidsPage,
});

function KidsPage() {
  const { locale } = Route.useParams();
  const c = COPY[locale as keyof typeof COPY] ?? COPY.pt;
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
      <Collection />
      <WhatsInTheBox />
      <VsGenerics />
      <ShopOnAmazon />
      <FAQ />
    </>
  );
}
