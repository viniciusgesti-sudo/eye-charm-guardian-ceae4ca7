import { createFileRoute } from "@tanstack/react-router";
import { ShippingPage } from "@/components/eyegis/ShippingPage";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/shipping")({
  head: () =>
    buildSeo({
      title: "Shipping, Returns & Amazon Experience — Eyegis",
      description:
        "Every Eyegis purchase is fulfilled through Amazon — secure checkout, fast delivery, easy returns and trusted global support.",
      path: "/shipping",
    }),
  component: ShippingPage,
});
