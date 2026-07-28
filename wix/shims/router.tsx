/**
 * TanStack Router shim used ONLY by the Wix bundle build.
 *
 * The main app renders inside <RouterProvider>. Inside Wix each page is a
 * standalone Wix URL (Wix owns navigation), so we replace TanStack's Link
 * with a plain <a> and stub out the router hooks. This lets every existing
 * component render unchanged with zero refactor cost, and Wix handles the
 * page transition natively.
 *
 * Wired up via vite.config.wix.ts:
 *   resolve.alias: { '@tanstack/react-router': path.resolve(__dirname, 'shims/router.tsx') }
 */

import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to?: string;
  params?: Record<string, string>;
  search?: Record<string, unknown>;
  replace?: boolean;
  preload?: unknown;
  activeProps?: unknown;
  inactiveProps?: unknown;
};

function buildHref(to: string | undefined, params?: Record<string, string>): string {
  if (!to) return "#";
  let href = to;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      href = href.replace(`$${k}`, encodeURIComponent(v));
    }
  }
  // TanStack Router uses `/$locale` style; strip any remaining `$` segments.
  href = href.replace(/\/\$[a-zA-Z0-9_]+/g, "");
  if (!href.startsWith("/") && !href.startsWith("http")) href = "/" + href;
  return href;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, params, search: _s, replace: _r, preload: _p, activeProps: _a, inactiveProps: _i, children, ...rest },
  ref,
) {
  return (
    <a ref={ref} href={buildHref(to, params)} {...rest}>
      {children}
    </a>
  );
});

export function Outlet(): null {
  return null;
}

export function useRouterState<T = { location: { pathname: string } }>(
  opts?: { select?: (s: { location: { pathname: string } }) => T },
): T {
  const state = { location: { pathname: typeof window !== "undefined" ? window.location.pathname : "/" } };
  return (opts?.select ? opts.select(state) : (state as unknown as T));
}

export function useParams<T = Record<string, string>>(): T {
  const locale =
    typeof document !== "undefined"
      ? (document.querySelector("eyegis-app")?.getAttribute("locale") ?? "br")
      : "br";
  return { locale } as unknown as T;
}

export function useNavigate() {
  return (opts?: { to?: string; params?: Record<string, string> }) => {
    if (opts?.to) window.location.href = buildHref(opts.to, opts.params);
  };
}

export function useLocation() {
  return { pathname: typeof window !== "undefined" ? window.location.pathname : "/" };
}

export function useRouter() {
  return {
    invalidate: async () => {},
    navigate: useNavigate(),
  };
}

// createFileRoute is used at module scope; return a no-op factory whose
// `useParams` etc. also work.
export function createFileRoute() {
  return () => ({
    useParams,
    useLoaderData: () => undefined,
    useSearch: () => ({}),
    useRouteContext: () => ({}),
  });
}

export function createRootRouteWithContext() {
  return () => ({});
}

export function createRootRoute() {
  return {};
}

export function redirect(_: unknown): never {
  throw new Error("redirect() called inside Wix bundle — Wix owns navigation");
}

export function HeadContent(): null {
  return null;
}
export function Scripts(): null {
  return null;
}

// Passthrough types the components import as types only.
export type LinkComponentProps = LinkProps;

// Provide a placeholder for anything else that gets imported by name.
export default { Link, Outlet };

// A no-op provider component in case some component imports it.
export function RouterProvider({ children }: { children?: ReactNode }): ReactNode {
  return children ?? null;
}
