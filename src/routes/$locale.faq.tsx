import { createFileRoute } from "@tanstack/react-router";
import { FAQPage } from "@/components/eyegis/FAQPage";
import { buildSeo } from "@/lib/seo";

const META = {
  br: {
    title: "FAQ e Central de Ajuda — Eyegis",
    description:
      "Respostas sobre lentes Eyegis, tecnologia EyegisGuard™, envio, garantia, devoluções e cuidados.",
  },
  en: {
    title: "FAQ & Knowledge Center — Eyegis",
    description:
      "Answers about Eyegis lenses, EyegisGuard™ technology, shipping, warranty, returns and lens care.",
  },
  fr: {
    title: "FAQ et Centre d'aide — Eyegis",
    description:
      "Réponses sur les verres Eyegis, la technologie EyegisGuard™, la livraison, la garantie, les retours et l'entretien.",
  },
} as const;

export const Route = createFileRoute("/$locale/faq")({
  head: ({ params }) => {
    const locale = (params.locale in META ? params.locale : "br") as "br" | "en" | "fr";
    const meta = META[locale];
    return buildSeo({
      ...meta,
      path: `/${locale}/faq`,
      locale,
      localizedBasePath: "/faq",
    });
  },
  component: FAQPage,
});
