import { createFileRoute } from "@tanstack/react-router";
import { LensesPage } from "@/components/eyegis/LensesPage";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/$locale/lenses")({
  head: ({ params }) =>
    buildSeo({
      title: "Choose Your Lenses — Eyegis",
      description:
        "Find the perfect Eyegis lens for the way you live. A premium, interactive guide to visual comfort, color accuracy and screen exposure.",
      path: `/${params.locale}/lenses`,
    }),
  component: LensesPage,
});
