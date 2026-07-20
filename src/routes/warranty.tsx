import { createFileRoute } from "@tanstack/react-router";
import { WarrantyPage } from "@/components/eyegis/WarrantyPage";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/warranty")({
  head: () =>
    buildSeo({
      title: "Warranty & 60-Day Comfort Guarantee — Eyegis",
      description:
        "Every pair of Eyegis is backed by a 2-Year Manufacturing Warranty and an exclusive 60-Day Comfort Guarantee.",
      path: "/warranty",
    }),
  component: WarrantyPage,
});
