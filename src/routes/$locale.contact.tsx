import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/eyegis/ContactPage";
import { buildSeo } from "@/lib/seo";

const META = {
  br: {
    title: "Contato — Estamos aqui para ajudar | Eyegis",
    description:
      "Fale com a equipe Eyegis sobre produtos, garantia, pedidos na Amazon e parcerias.",
  },
  en: {
    title: "Contact — We're Here to Help | Eyegis",
    description:
      "Reach the Eyegis team for product questions, warranty, Amazon orders and business enquiries.",
  },
  fr: {
    title: "Contact — Nous sommes là pour vous aider | Eyegis",
    description:
      "Contactez l'équipe Eyegis pour vos questions sur les produits, la garantie, les commandes Amazon et les partenariats.",
  },
} as const;

export const Route = createFileRoute("/$locale/contact")({
  head: ({ params }) => {
    const locale = (params.locale in META ? params.locale : "br") as "br" | "en" | "fr";
    const meta = META[locale];
    return buildSeo({
      ...meta,
      path: `/${locale}/contact`,
      locale,
      localizedBasePath: "/contact",
    });
  },
  component: ContactPage,
});
