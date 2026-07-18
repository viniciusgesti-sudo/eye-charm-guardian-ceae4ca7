import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/about")({
  beforeLoad: () => {
    throw redirect({ to: "/about", replace: true });
  },
});
