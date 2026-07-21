import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/warranty")({
  beforeLoad: () => {
    throw redirect({ to: "/$locale/warranty", params: { locale: "br" }, replace: true });
  },
});
