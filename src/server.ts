import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// Regexes that identify the error classes we want to flag loudly in preview:
// module resolution failures, ESM import/export shape mismatches, and
// SyntaxErrors that survive from the transform pipeline.
const IMPORT_ERROR_PATTERNS: Array<{ re: RegExp; kind: string }> = [
  { re: /Failed to resolve import/i, kind: "IMPORT_RESOLVE" },
  { re: /Cannot find module/i, kind: "IMPORT_RESOLVE" },
  { re: /does not provide an export named/i, kind: "IMPORT_EXPORT_SHAPE" },
  { re: /is not exported (?:by|from)/i, kind: "IMPORT_EXPORT_SHAPE" },
  { re: /The requested module .* does not provide/i, kind: "IMPORT_EXPORT_SHAPE" },
  { re: /Unexpected (?:token|identifier|end of)/i, kind: "SYNTAX_ERROR" },
  { re: /SyntaxError/i, kind: "SYNTAX_ERROR" },
  { re: /Element type is invalid/i, kind: "IMPORT_EXPORT_SHAPE" },
  { re: /is not defined/i, kind: "REFERENCE_ERROR" },
];

function classifyError(error: unknown): string | undefined {
  const msg =
    (error instanceof Error && (error.stack || error.message)) ||
    (typeof error === "string" ? error : "");
  if (!msg) return undefined;
  for (const { re, kind } of IMPORT_ERROR_PATTERNS) if (re.test(msg)) return kind;
  return undefined;
}

function logPreviewFailure(context: {
  url: string;
  method: string;
  status: number;
  error: unknown;
  bodySnippet?: string;
}) {
  const kind = classifyError(context.error) ?? "SSR_FAILURE";
  const err =
    context.error instanceof Error
      ? context.error
      : new Error(typeof context.error === "string" ? context.error : JSON.stringify(context.error));
  // Single structured line first — easy to grep in preview logs.
  console.error(
    `[PREVIEW-ERROR] kind=${kind} status=${context.status} ${context.method} ${context.url} :: ${err.message}`,
  );
  console.error(err);
  if (context.bodySnippet) {
    // Truncate large bodies so Cloudflare/Nitro log lines stay readable.
    const snippet =
      context.bodySnippet.length > 2000
        ? `${context.bodySnippet.slice(0, 2000)}…[truncated ${context.bodySnippet.length - 2000} chars]`
        : context.bodySnippet;
    console.error(`[PREVIEW-ERROR] body-snippet:\n${snippet}`);
  }
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(
  request: Request,
  response: Response,
): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  const body = await response.clone().text();

  const h3Swallowed = contentType.includes("application/json") && isH3SwallowedErrorBody(body);
  const captured = consumeLastCapturedError();

  // Always log 5xx with URL + body snippet so import/export/syntax regressions
  // are visible in preview even when the framework returns a generic error.
  logPreviewFailure({
    url: request.url,
    method: request.method,
    status: response.status,
    error: captured ?? new Error(h3Swallowed ? `h3 swallowed SSR error: ${body}` : body),
    bodySnippet: body,
  });

  if (!h3Swallowed) return response;
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(request, response);
    } catch (error) {
      logPreviewFailure({
        url: request.url,
        method: request.method,
        status: 500,
        error,
      });
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
