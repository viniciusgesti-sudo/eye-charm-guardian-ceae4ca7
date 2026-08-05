import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { buildSeo } from "@/lib/seo";

const AboutPage = lazy(() =>
  import("@/components/eyegis/AboutPage").then((m) => ({ default: m.AboutPage })),
);

function LocaleAboutRoute() {
  return (
    <Suspense fallback={<div style={{ minHeight: "60vh" }} aria-hidden />}>
      <AboutPage />
    </Suspense>
  );
}

const META = {
  br: {
    title: "Sobre a Eyegis — Feito para o modo como vivemos hoje",
    description:
      "A Eyegis é uma marca premium de eyewear feita para a geração digital — engenharia óptica baseada em evidências e design atemporal.",
  },
  en: {
    title: "About Eyegis — Designed for the Way We Live Today",
    description:
      "Eyegis is a premium eyewear brand built for the digital generation — pairing evidence-based optical engineering with timeless design.",
  },
  fr: {
    title: "À propos d'Eyegis — Pensée pour la vie que nous vivons aujourd'hui",
    description:
      "Eyegis est une marque de lunetterie premium pensée pour la génération numérique — ingénierie optique fondée sur des preuves et design intemporel.",
  },
} as const;

export const Route = createFileRoute("/$locale/about")({
  head: ({ params }) => {
    const locale = (params.locale in META ? params.locale : "br") as "br" | "en" | "fr";
    const m = META[locale];
    return buildSeo({
      title: m.title,
      description: m.description,
      path: `/${locale}/about`,
      locale,
      localizedBasePath: "/about",
    });
  },
  component: LocaleAboutRoute,
});
