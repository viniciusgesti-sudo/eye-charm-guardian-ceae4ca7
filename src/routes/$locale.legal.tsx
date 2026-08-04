import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/eyegis/LegalPage";
import { buildSeo } from "@/lib/seo";

const META = {
  br: {
    title: "Aviso Legal — Eyegis",
    description: "Aviso legal, termos de uso do site e informações da Eyegis.",
  },
  en: {
    title: "Legal Notice — Eyegis",
    description: "Legal notice, website terms of use and publisher information for Eyegis.",
  },
  fr: {
    title: "Mentions légales — Eyegis",
    description: "Mentions légales, conditions d'utilisation du site et informations sur Eyegis.",
  },
} as const;

export const Route = createFileRoute("/$locale/legal")({
  head: ({ params }) => {
    const locale = (params.locale in META ? params.locale : "br") as "br" | "en" | "fr";
    const meta = META[locale];
    return buildSeo({
      ...meta,
      path: `/${locale}/legal`,
      locale,
      localizedBasePath: "/legal",
    });
  },
  component: LegalPage,
});
