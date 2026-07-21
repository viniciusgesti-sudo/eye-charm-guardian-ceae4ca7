import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/lenses")({
  beforeLoad: () => {
    throw redirect({ to: "/$locale/lenses", params: { locale: "br" }, replace: true });
  },
});
