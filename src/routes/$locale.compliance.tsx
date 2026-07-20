import { createFileRoute } from "@tanstack/react-router";
import { CompliancePage } from "@/components/eyegis/CompliancePage";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/$locale/compliance")({
  head: ({ params }) => buildSeo({ title: "Declaration of Compliance — Eyegis", description: "The optical standards Eyegis lenses are engineered and independently tested against: ANSI Z80.3, EN ISO 12312-1, AS/NZS 1067.1.", path: `/${params.locale}/compliance` }),
  component: CompliancePage,
});
