import { createFileRoute } from "@tanstack/react-router";
import { ShippingPage } from "@/components/eyegis/ShippingPage";
import { buildSeo } from "@/lib/seo";

const META = {
  br: {
    title: "Envio, Devoluções e Experiência Amazon — Eyegis",
    description:
      "Cada compra Eyegis é processada pela Amazon — checkout seguro, entrega rápida, devoluções fáceis e suporte global confiável.",
  },
  en: {
    title: "Shipping, Returns & Amazon Experience — Eyegis",
    description:
      "Every Eyegis purchase is fulfilled through Amazon — secure checkout, fast delivery, easy returns and trusted global support.",
  },
  fr: {
    title: "Livraison, Retours & Expérience Amazon — Eyegis",
    description:
      "Chaque achat Eyegis est expédié via Amazon — paiement sécurisé, livraison rapide, retours faciles et support global fiable.",
  },
} as const;

export const Route = createFileRoute("/$locale/shipping")({
  head: ({ params }) => {
    const locale = (params.locale in META ? params.locale : "br") as keyof typeof META;
    const m = META[locale];
    return buildSeo({
      title: m.title,
      description: m.description,
      path: `/${locale}/shipping`,
      locale,
      localizedBasePath: "/shipping",
    });
  },
  component: ShippingPage,
});
