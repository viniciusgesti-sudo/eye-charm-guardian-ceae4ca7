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

export const Route = createFileRoute("/$locale/about")({
  head: ({ params }) =>
    buildSeo({
      title: "About Eyegis — Designed for the Way We Live Today",
      description:
        "Eyegis is a premium eyewear brand built for the digital generation — pairing evidence-based optical engineering with timeless design.",
      path: `/${params.locale}/about`,
    }),
  component: LocaleAboutRoute,
});
