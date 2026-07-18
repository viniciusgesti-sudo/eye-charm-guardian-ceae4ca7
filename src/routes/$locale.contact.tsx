import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/contact")({
  beforeLoad: () => {
    throw redirect({ to: "/contact", replace: true });
  },
});
