import { createFileRoute } from "@tanstack/react-router";
import { WarrantyPage } from "@/components/eyegis/WarrantyPage";
import { buildSeo } from "@/lib/seo";

const META = {
  br: {
    title: "Garantia & Garantia de Conforto 60 Dias — Eyegis",
    description:
      "Cada par Eyegis é protegido por uma Garantia de Fabricação de 2 Anos e nossa Garantia de Conforto de 60 Dias.",
  },
  en: {
    title: "Warranty & 60-Day Comfort Guarantee — Eyegis",
    description:
      "Every pair of Eyegis is backed by a 2-Year Manufacturing Warranty and an exclusive 60-Day Comfort Guarantee.",
  },
  fr: {
    title: "Garantie & Garantie Confort 60 jours — Eyegis",
    description:
      "Chaque paire Eyegis est protégée par une Garantie de Fabrication de 2 ans et notre Garantie Confort 60 jours.",
  },
} as const;

export const Route = createFileRoute("/$locale/warranty")({
  head: ({ params }) => {
    const locale = (params.locale in META ? params.locale : "br") as keyof typeof META;
    const m = META[locale];
    return buildSeo({
      title: m.title,
      description: m.description,
      path: `/${locale}/warranty`,
      locale,
      localizedBasePath: "/warranty",
    });
  },
  component: WarrantyPage,
});
