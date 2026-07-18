import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/technology")({
  beforeLoad: () => {
    throw redirect({
      to: "/$locale/technology",
      params: { locale: "pt" },
      replace: true,
    });
  },
});
