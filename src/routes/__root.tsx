import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { lazy, Suspense, useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { PreviewErrorBoundary } from "../lib/preview-error-boundary";
import { I18nProvider } from "../i18n/context";
import { WpCmsProvider, wpContentQueryOptions } from "../lib/wpcms";

// Cookie banner is non-critical and shown after hydration — lazy-load to keep
// it out of the client entry chunk.
const CookieBanner = lazy(() =>
  import("../components/eyegis/CookieBanner").then((m) => ({ default: m.CookieBanner })),
);

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
  const url = typeof window !== "undefined" ? window.location.href : "(ssr)";
  // Structured log so preview tooling can grep [PREVIEW-ERROR] and pick up
  // the URL alongside the framework error (import/export/syntax issues, etc.).
  // eslint-disable-next-line no-console
  console.error(`[PREVIEW-ERROR] kind=ROUTE_RENDER url=${url} :: ${error.message}`);
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component", url });
  }, [error, url]);

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
      { name: "theme-color", content: "#F9F9F9", media: "(prefers-color-scheme: light)" },
      { name: "theme-color", content: "#004B57", media: "(prefers-color-scheme: dark)" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Eyegis" },
      { name: "mobile-web-app-capable", content: "yes" },
      { property: "og:title", content: "Eyegis — Engineered for Vision. Designed for Style." },
      {
        property: "og:description",
        content:
          "Premium blue-light filtering eyewear for the digital generation. Scientifically engineered. Timelessly designed.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Eyegis" },
      // og:image/twitter:image intentionally NOT set here — TanStack Router
      // concatenates root meta into every route, so a root-level og:image
      // overrides every leaf. Each route's buildSeo() provides its own image.
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@eyegis" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Adaptive SVG favicons — Safari/Chrome/Firefox switch by system theme.
      { rel: "icon", type: "image/svg+xml", href: "/favicon-light.svg", media: "(prefers-color-scheme: light)" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon-dark.svg", media: "(prefers-color-scheme: dark)" },
      // PNG + ICO fallbacks for browsers without SVG favicon or media support.
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      // Preload the fonts stylesheet so the CSS request starts in the
      // preload scanner phase (parallel to HTML parse) instead of waiting
      // for the <link rel=stylesheet> to be discovered. Trimmed weight set
      // (Montserrat 300/400/500/600/700, Lato 400/700) reduces byte cost —
      // number of font files fetched — improving LCP.
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Lato:wght@400;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Lato:wght@400;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },


    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
  // Aquece o conteúdo do WordPress no servidor, mas NUNCA bloqueia o render:
  // o fetcher já tem timeout e resolve vazio em caso de falha, e aqui ainda
  // há um teto de 2,5s para o SSR jamais ficar preso no CMS.
  loader: async ({ context, location }) => {
    const preview = isPreviewSearch(location.search);
    try {
      await Promise.race([
        context.queryClient.ensureQueryData(wpContentQueryOptions(preview)),
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ]);
    } catch {
      /* conteúdo local assume */
    }
  },
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
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <WpCmsHydrator>
          <a href="#main" className="skip-to-content">Skip to content</a>
          <PreviewErrorBoundary
            fallback={(err, resetBoundary) => (
              <ErrorComponent error={err} reset={resetBoundary} />
            )}
          >
            <Outlet />
          </PreviewErrorBoundary>
          <Suspense fallback={null}>
            <CookieBanner />
          </Suspense>
        </WpCmsHydrator>
      </I18nProvider>
    </QueryClientProvider>
  );
}

/**
 * Alimenta o WpCmsProvider com o payload do WordPress vindo do React Query.
 * Usa `useQuery` (não suspense) para que uma resposta lenta ou com erro
 * nunca segure a árvore — os componentes seguem no conteúdo local.
 */
function WpCmsHydrator({ children }: { children: ReactNode }) {
  const { data } = useQuery(wpContentQueryOptions);
  return <WpCmsProvider value={data}>{children}</WpCmsProvider>;
}
