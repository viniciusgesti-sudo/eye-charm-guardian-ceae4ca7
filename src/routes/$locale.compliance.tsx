import { createFileRoute } from "@tanstack/react-router";
import { CompliancePage } from "@/components/eyegis/CompliancePage";
import { buildSeo } from "@/lib/seo";

const META = {
  br: {
    title: "Declaração de Conformidade — Eyegis",
    description:
      "Normas ópticas usadas na engenharia e nos testes independentes das lentes Eyegis: ANSI Z80.3, EN ISO 12312-1 e AS/NZS 1067.1.",
  },
  en: {
    title: "Declaration of Compliance — Eyegis",
    description:
      "The optical standards Eyegis lenses are engineered and independently tested against: ANSI Z80.3, EN ISO 12312-1 and AS/NZS 1067.1.",
  },
  fr: {
    title: "Déclaration de conformité — Eyegis",
    description:
      "Les normes optiques utilisées pour concevoir et tester indépendamment les verres Eyegis : ANSI Z80.3, EN ISO 12312-1 et AS/NZS 1067.1.",
  },
} as const;

export const Route = createFileRoute("/$locale/compliance")({
  head: ({ params }) => {
    const locale = (params.locale in META ? params.locale : "br") as "br" | "en" | "fr";
    const meta = META[locale];
    return buildSeo({
      ...meta,
      path: `/${locale}/compliance`,
      locale,
      localizedBasePath: "/compliance",
    });
  },
  component: CompliancePage,
});
