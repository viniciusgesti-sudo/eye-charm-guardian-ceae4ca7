import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { I18nProvider } from "../i18n/context";
import { CookieBanner } from "../components/eyegis/CookieBanner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="font-eyebrow text-muted-foreground">Error · 404</p>
        <h1 className="mt-6 font-editorial text-6xl text-foreground">
          This page has drifted out of focus.
        </h1>
        <div className="mt-10">
          <Link to="/" className="font-eyebrow text-teal hover:text-ink transition-colors">
            Return to Eyegis →
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="font-eyebrow text-muted-foreground">An unexpected pause</p>
        <h1 className="mt-6 font-editorial text-5xl text-foreground">
          Something interrupted the composition.
        </h1>
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="font-eyebrow text-teal hover:text-ink transition-colors"
          >
            Try again →
          </button>
          <a href="/" className="font-eyebrow text-muted-foreground hover:text-ink transition-colors">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Eyegis — Engineered for Vision. Designed for Style." },
      {
        name: "description",
        content:
          "Premium blue-light filtering eyewear for the digital generation. Scientifically engineered. Timelessly designed.",
      },
      { name: "author", content: "Eyegis" },
      { name: "theme-color", content: "#F9F9F9" },
      { property: "og:title", content: "Eyegis — Engineered for Vision. Designed for Style." },
      {
        property: "og:description",
        content:
          "Premium blue-light filtering eyewear for the digital generation. Scientifically engineered. Timelessly designed.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Eyegis" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@eyegis" },
      { name: "twitter:title", content: "Eyegis — Engineered for Vision. Designed for Style." },
      { name: "twitter:description", content: "Premium blue-light filtering eyewear for the digital generation. Scientifically engineered. Timelessly designed." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Lato:wght@300;400;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },

    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <Outlet />
        <CookieBanner />
      </I18nProvider>
    </QueryClientProvider>
  );
}
