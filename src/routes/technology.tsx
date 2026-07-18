import { createFileRoute } from "@tanstack/react-router";
import { OurTechnology } from "@/components/eyegis/OurTechnology";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology — Eyegis | E-Guard Retina™ & Circadian™" },
      {
        name: "description",
        content:
          "Discover Eyegis' core optical technology: E-Guard Retina™ for daytime screen fatigue and E-Guard Circadian™ for evening sleep protection.",
      },
      { property: "og:title", content: "Eyegis Technology — Engineered for Vision" },
      {
        property: "og:description",
        content:
          "Two dedicated optical systems for two distinct challenges of modern digital life.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TechnologyPage,
});

function TechnologyPage() {
  return (
    <main className="bg-[#F9F9F9] text-foreground">
      <div className="h-24" />
      <OurTechnology />
    </main>
  );
}
