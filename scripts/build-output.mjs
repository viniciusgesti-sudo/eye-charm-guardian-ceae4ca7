import { join, relative } from "node:path";

const PROVIDERS = {
  local: {
    client: ".output/public",
    server: ".output/server",
  },
  netlify: {
    client: "dist",
    server: ".netlify/functions-internal/server",
  },
  vercel: {
    client: ".vercel/output/static",
    server: ".vercel/output/functions/__server.func",
  },
};

function envEnabled(value) {
  if (value == null) return false;
  return !["", "0", "false", "no", "off"].includes(String(value).trim().toLowerCase());
}

export function detectBuildProvider(env = process.env) {
  const override = String(env.BUILD_OUTPUT_PROVIDER ?? "")
    .trim()
    .toLowerCase();

  if (override) {
    if (!(override in PROVIDERS)) {
      throw new Error(
        `Unsupported BUILD_OUTPUT_PROVIDER=${JSON.stringify(override)}; expected local, netlify, or vercel.`,
      );
    }
    return override;
  }

  if (envEnabled(env.VERCEL)) return "vercel";
  if (envEnabled(env.NETLIFY)) return "netlify";
  return "local";
}

export function resolveBuildOutput(root = process.cwd(), env = process.env) {
  const provider = detectBuildProvider(env);
  const paths = PROVIDERS[provider];

  return {
    provider,
    clientDir: join(root, paths.client),
    serverDir: join(root, paths.server),
    clientRelative: paths.client,
    serverRelative: paths.server,
  };
}

export function canonicalBuildPath(output, file, side) {
  const base = side === "client" ? output.clientDir : output.serverDir;
  const canonicalRoot = side === "client" ? ".output/public" : ".output/server";
  const nested = relative(base, file).replace(/\\/g, "/");
  return `${canonicalRoot}/${nested}`;
}
