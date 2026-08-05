import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "@/components/eyegis/PrivacyPage";
import { buildSeo } from "@/lib/seo";

const META = {
  br: {
    title: "Política de Privacidade — Eyegis",
    description: "Como a Eyegis coleta, utiliza e protege dados pessoais neste site.",
  },
  en: {
    title: "Privacy Policy — Eyegis",
    description: "How Eyegis collects and processes personal data on this website.",
  },
  fr: {
    title: "Politique de confidentialité — Eyegis",
    description:
      "Comment Eyegis collecte, utilise et protège les données personnelles sur ce site.",
  },
} as const;

export const Route = createFileRoute("/$locale/privacy")({
  head: ({ params }) => {
    const locale = (params.locale in META ? params.locale : "br") as "br" | "en" | "fr";
    const meta = META[locale];
    return buildSeo({
      ...meta,
      path: `/${locale}/privacy`,
      locale,
      localizedBasePath: "/privacy",
    });
  },
  component: PrivacyPage,
});
