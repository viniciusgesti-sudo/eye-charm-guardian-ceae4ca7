import { Component, type ErrorInfo, type ReactNode } from "react";
import { reportLovableError } from "./lovable-error-reporting";

type Props = { children: ReactNode; fallback: (err: Error, reset: () => void) => ReactNode };
type State = { error: Error | null };

/**
 * Client-side React error boundary used inside the root Outlet subtree.
 *
 * Complements TanStack Router's `errorComponent` by exposing the React
 * componentStack alongside the raw error, and by logging a structured
 * [PREVIEW-ERROR] line that mirrors the server-side format. Useful for
 * catching import/export shape mismatches and SyntaxErrors that surface
 * during client rendering (e.g. after a bad HMR chunk).
 */
export class PreviewErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    const url = typeof window !== "undefined" ? window.location.href : "(ssr)";
    // Structured single-line log for quick greps.
    // eslint-disable-next-line no-console
    console.error(
      `[PREVIEW-ERROR] kind=CLIENT_RENDER url=${url} :: ${error.message}`,
    );
    // eslint-disable-next-line no-console
    console.error(error);
    if (info?.componentStack) {
      // eslint-disable-next-line no-console
      console.error(`[PREVIEW-ERROR] componentStack:${info.componentStack}`);
    }
    reportLovableError(error, {
      boundary: "preview_error_boundary",
      url,
      componentStack: info?.componentStack ?? undefined,
    });
  }

  reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) return this.props.fallback(this.state.error, this.reset);
    return this.props.children;
  }
}
