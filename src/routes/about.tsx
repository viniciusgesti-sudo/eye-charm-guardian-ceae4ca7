import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { buildSeo } from "@/lib/seo";

// Lazy-load the heavy AboutPage component so it ships in its own chunk
// instead of the critical route bundle. Keeps head() / SEO in the main
// bundle where TanStack Router needs it.
const AboutPage = lazy(() =>
  import("@/components/eyegis/AboutPage").then((m) => ({ default: m.AboutPage })),
);

function AboutRoute() {
  return (
    <Suspense fallback={<div style={{ minHeight: "60vh" }} aria-hidden />}>
      <AboutPage />
    </Suspense>
  );
}

export const Route = createFileRoute("/about")({
  head: () =>
    buildSeo({
      title: "About Eyegis — Designed for the Way We Live Today",
      description:
        "Eyegis is a premium eyewear brand built for the digital generation — pairing evidence-based optical engineering with timeless design.",
      path: "/about",
    }),
  component: AboutRoute,
});
