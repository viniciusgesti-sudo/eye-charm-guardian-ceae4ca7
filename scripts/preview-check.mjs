#!/usr/bin/env node
/**
 * Preview release checklist.
 *
 * Runs:
 *   1) HMR gate flush (dev server must be running on :8080)
 *   2) HTTP 200 smoke test for a curated route matrix
 *   3) Headless Chromium page load per route capturing console errors
 *      and failed network requests (skipped when playwright is unavailable)
 *   4) Optional production build (`--build`)
 *
 * Usage:
 *   node scripts/preview-check.mjs            # fast checks (flush + HTTP + console)
 *   node scripts/preview-check.mjs --build    # also runs `bun run build`
 *   node scripts/preview-check.mjs --http-only
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const BASE = process.env.PREVIEW_BASE ?? "http://localhost:8080";
const args = new Set(process.argv.slice(2));
const RUN_BUILD = args.has("--build");
const HTTP_ONLY = args.has("--http-only");

const LOCALES = ["br", "en", "fr"];
const LOCALIZED = [
  "",
  "/men",
  "/women",
  "/kids",
  "/technology",
  "/about",
  "/lenses",
  "/warranty",
  "/shipping",
  "/contact",
  "/faq",
  "/legal",
  "/privacy",
  "/compliance",
];
const NON_LOCALIZED = ["/", "/about", "/technology", "/lenses", "/contact", "/faq"];

const ROUTES = [
  ...NON_LOCALIZED,
  ...LOCALES.flatMap((l) => LOCALIZED.map((p) => `/${l}${p}`)),
];

const results = { pass: 0, fail: 0, warn: 0, details: [] };
const log = (icon, msg) => console.log(`${icon} ${msg}`);
const record = (kind, msg) => {
  results[kind]++;
  results.details.push({ kind, msg });
};

async function step(name, fn) {
  console.log(`\n▸ ${name}`);
  try {
    await fn();
  } catch (err) {
    log("✗", `${name} crashed: ${err?.message ?? err}`);
    record("fail", `${name}: ${err?.message ?? err}`);
  }
}

async function flushHmr() {
  try {
    const res = await fetch(`${BASE}/__hmr_flush`, { method: "POST" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    log("✓", `HMR flushed (count=${body.count ?? 0})`);
    record("pass", "hmr flush");
  } catch (err) {
    log("⚠", `HMR flush skipped: ${err.message}`);
    record("warn", "hmr flush unavailable");
  }
}

async function httpMatrix() {
  const failures = [];
  await Promise.all(
    ROUTES.map(async (path) => {
      try {
        const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
        if (res.status >= 400) failures.push(`${path} → ${res.status}`);
      } catch (err) {
        failures.push(`${path} → ${err.message}`);
      }
    }),
  );
  if (failures.length) {
    failures.forEach((f) => log("✗", f));
    record("fail", `http: ${failures.length} route(s) failed`);
  } else {
    log("✓", `${ROUTES.length} routes returned <400`);
    record("pass", "http matrix");
  }
}

async function consoleAudit() {
  if (HTTP_ONLY) return;
  let playwright;
  try {
    playwright = await import("playwright");
  } catch {
    log("⚠", "playwright not installed — skipping console audit (bun add -D playwright)");
    record("warn", "console audit skipped");
    return;
  }
  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const sample = [
    "/",
    "/br",
    "/en",
    "/fr",
    "/br/about",
    "/br/men",
    "/br/women",
    "/br/kids",
    "/br/technology",
  ];
  const issues = [];
  for (const path of sample) {
    const page = await context.newPage();
    const errors = [];
    const failedReq = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("requestfailed", (r) => failedReq.push(`${r.url()} ${r.failure()?.errorText}`));
    try {
      const resp = await page.goto(`${BASE}${path}`, { waitUntil: "networkidle", timeout: 15000 });
      if (!resp || resp.status() >= 400) {
        issues.push(`${path}: HTTP ${resp?.status()}`);
      }
      if (errors.length) issues.push(`${path}: ${errors.length} console error(s) → ${errors[0]}`);
      if (failedReq.length) issues.push(`${path}: ${failedReq.length} failed request(s)`);
    } catch (err) {
      issues.push(`${path}: ${err.message}`);
    }
    await page.close();
  }
  await browser.close();
  if (issues.length) {
    issues.forEach((i) => log("✗", i));
    record("fail", `console: ${issues.length} issue(s)`);
  } else {
    log("✓", `${sample.length} pages loaded with clean console`);
    record("pass", "console audit");
  }
}

async function build() {
  if (!RUN_BUILD) return;
  if (!existsSync("package.json")) return;
  log("…", "running `bun run build` (this takes a while)");
  const r = spawnSync("bun", ["run", "build"], { stdio: "inherit" });
  if (r.status !== 0) record("fail", "build failed");
  else record("pass", "build");
}

console.log(`Preview checklist against ${BASE}`);
await step("1) Flush HMR gate", flushHmr);
await step("2) HTTP route matrix", httpMatrix);
await step("3) Console + network audit", consoleAudit);
await step("4) Production build", build);

console.log("\n──────── Summary ────────");
console.log(`  passed:  ${results.pass}`);
console.log(`  warned:  ${results.warn}`);
console.log(`  failed:  ${results.fail}`);
if (results.fail > 0) {
  console.error("\n✗ Preview NOT ready.");
  process.exit(1);
}
console.log("\n✓ Preview ready.");
