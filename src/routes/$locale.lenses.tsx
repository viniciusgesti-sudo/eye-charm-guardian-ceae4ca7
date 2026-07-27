import { createFileRoute } from "@tanstack/react-router";
import { LensesPage } from "@/components/eyegis/LensesPage";
import { buildSeo } from "@/lib/seo";

const META = {
  br: {
    title: "Escolha suas Lentes — Masculino, Feminino, Kids & Teens | Eyegis",
    description:
      "Escolha a lente Eyegis certa para as coleções Masculina, Feminina e Kids & Teens — E-Guard Retina™ e E-Guard Circadian™ para cada rotina de tela.",
  },
  en: {
    title: "Choose Your Lenses — Men's, Women's & Kids & Teens | Eyegis",
    description:
      "Pick the right Eyegis lens across Men's Collection, Women's Collection and Kids & Teens — E-Guard Retina™ and E-Guard Circadian™ for every screen day.",
  },
  fr: {
    title: "Choisissez vos Verres — Homme, Femme, Kids & Teens | Eyegis",
    description:
      "Trouvez le verre Eyegis idéal parmi les collections Homme, Femme et Kids & Teens — E-Guard Retina™ et E-Guard Circadian™ pour chaque journée d'écran.",
  },
} as const;

export const Route = createFileRoute("/$locale/lenses")({
  head: ({ params }) => {
    const m = META[(params.locale as keyof typeof META)] ?? META.en;
    return buildSeo({
      title: m.title,
      description: m.description,
      path: `/${params.locale}/lenses`,
    });
  },
  component: LensesPage,
});
