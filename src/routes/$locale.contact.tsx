import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/eyegis/ContactPage";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/$locale/contact")({
  head: ({ params }) =>
    buildSeo({
      title: "Contact — We're Here to Help — Eyegis",
      description:
        "Reach the Eyegis team for product questions, warranty, Amazon orders and business enquiries.",
      path: `/${params.locale}/contact`,
    }),
  component: ContactPage,
});
