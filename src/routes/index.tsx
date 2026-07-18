import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Root `/` redirects to the default locale.
 * SSR/edge always resolves to `/pt` (safe default); the user can switch via the header.
 */
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({
      to: "/$locale",
      params: { locale: "pt" },
      replace: true,
    });
  },
});
