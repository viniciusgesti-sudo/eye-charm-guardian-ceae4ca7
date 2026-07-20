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
      { name: "theme-color", content: "#004B57" },
      { property: "og:title", content: "Eyegis — Engineered for Vision. Designed for Style." },
      {
        property: "og:description",
        content:
          "Premium blue-light filtering eyewear for the digital generation. Scientifically engineered. Timelessly designed.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Eyegis" },
      { property: "og:image", content: "https://eye-charm-guardian.lovable.app/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Eyegis — shield emblem" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@eyegis" },
      { name: "twitter:title", content: "Eyegis — Engineered for Vision. Designed for Style." },
      { name: "twitter:description", content: "Premium blue-light filtering eyewear for the digital generation. Scientifically engineered. Timelessly designed." },
      { name: "twitter:image", content: "https://eye-charm-guardian.lovable.app/og-image.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
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

  useEffect(() => {
    // One-time cleanup of legacy high-contrast toggle state.
    try {
      document.documentElement.classList.remove("hc");
      localStorage.removeItem("eyegis:hc");
      localStorage.removeItem("eyegis-hc");
      localStorage.removeItem("hc");
      document.cookie = "eyegis_hc=; Max-Age=0; path=/";
    } catch {
      /* ignore */
    }
    // Ensure the first <main> is a valid skip-link target on every route.
    const assignMainId = () => {
      const main = document.querySelector("main");
      if (main && !main.id) {
        main.id = "main";
        if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
      }
    };
    assignMainId();
    const obs = new MutationObserver(assignMainId);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);


  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <a href="#main" className="skip-to-content">Skip to content</a>
        <Outlet />
        <CookieBanner />
      </I18nProvider>
    </QueryClientProvider>
  );

}

