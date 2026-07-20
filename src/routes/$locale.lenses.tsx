import { createFileRoute } from "@tanstack/react-router";
import { LensesPage } from "@/components/eyegis/LensesPage";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/$locale/lenses")({
  head: ({ params }) =>
    buildSeo({
      title: "Choose Your Lenses — Men's, Women's & Kids & Teens | Eyegis",
      description:
        "Pick the right Eyegis lens across Men's Collection, Women's Collection and Kids & Teens — E-Guard Retina™ and E-Guard Circadian™ for every screen day.",
      path: `/${params.locale}/lenses`,
    }),
  component: LensesPage,
});
