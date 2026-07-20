import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/eyegis/AboutPage";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/$locale/about")({
  head: ({ params }) =>
    buildSeo({
      title: "About Eyegis — Designed for the Way We Live Today",
      description:
        "Eyegis is a premium eyewear brand built for the digital generation — pairing evidence-based optical engineering with timeless design.",
      path: `/${params.locale}/about`,
    }),
  component: AboutPage,
});
