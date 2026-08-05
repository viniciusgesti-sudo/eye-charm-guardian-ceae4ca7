import assert from "node:assert/strict";
import test from "node:test";
import { canonicalBuildPath, detectBuildProvider, resolveBuildOutput } from "./build-output.mjs";

test("detects each deployment provider without falling back to stale outputs", () => {
  assert.equal(detectBuildProvider({}), "local");
  assert.equal(detectBuildProvider({ NETLIFY: "true" }), "netlify");
  assert.equal(detectBuildProvider({ VERCEL: "1" }), "vercel");
  assert.equal(detectBuildProvider({ NETLIFY: "false", VERCEL: "0" }), "local");
  assert.equal(detectBuildProvider({ NETLIFY: "true", VERCEL: "1" }), "vercel");
});

test("supports an explicit provider for deterministic local validation", () => {
  assert.equal(detectBuildProvider({ BUILD_OUTPUT_PROVIDER: "netlify" }), "netlify");
  assert.throws(
    () => detectBuildProvider({ BUILD_OUTPUT_PROVIDER: "unknown" }),
    /Unsupported BUILD_OUTPUT_PROVIDER/,
  );
});

test("resolves provider-specific directories", () => {
  const netlify = resolveBuildOutput("/repo", { NETLIFY: "true" });
  assert.equal(netlify.clientDir, "/repo/dist");
  assert.equal(netlify.serverDir, "/repo/.netlify/functions-internal/server");

  const vercel = resolveBuildOutput("/repo", { VERCEL: "1" });
  assert.equal(vercel.clientDir, "/repo/.vercel/output/static");
  assert.equal(vercel.serverDir, "/repo/.vercel/output/functions/__server.func");
});

test("normalizes provider paths to the existing baseline namespace", () => {
  const vercel = resolveBuildOutput("/repo", { VERCEL: "1" });
  assert.equal(
    canonicalBuildPath(vercel, "/repo/.vercel/output/static/assets/app-12345678.js", "client"),
    ".output/public/assets/app-12345678.js",
  );
  assert.equal(
    canonicalBuildPath(
      vercel,
      "/repo/.vercel/output/functions/__server.func/_ssr/page-12345678.mjs",
      "server",
    ),
    ".output/server/_ssr/page-12345678.mjs",
  );
});
