import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "@/components/eyegis/PrivacyPage";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/$locale/privacy")({
  head: ({ params }) => buildSeo({ title: "Privacy Policy — Eyegis", description: "How Eyegis collects and processes personal data on this website.", path: `/${params.locale}/privacy` }),
  component: PrivacyPage,
});
