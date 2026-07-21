import { createFileRoute } from "@tanstack/react-router";
import { FAQPage } from "@/components/eyegis/FAQPage";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/$locale/faq")({
  head: ({ params }) =>
    buildSeo({
      title: "FAQ & Knowledge Center — Eyegis",
      description:
        "Answers about Eyegis lenses, EyegisGuard™ technology, shipping, warranty, returns and lens care.",
      path: `/${params.locale}/faq`,
    }),
  component: FAQPage,
});
