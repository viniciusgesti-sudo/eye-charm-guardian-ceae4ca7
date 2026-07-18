import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/faq")({
  beforeLoad: () => {
    throw redirect({ to: "/faq", replace: true });
  },
});
