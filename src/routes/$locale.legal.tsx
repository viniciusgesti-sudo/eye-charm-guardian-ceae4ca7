import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/eyegis/LegalPage";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/$locale/legal")({
  head: ({ params }) => buildSeo({ title: "Legal Notice — Eyegis", description: "Legal notice, website terms of use and publisher information for Eyegis.", path: `/${params.locale}/legal` }),
  component: LegalPage,
});
