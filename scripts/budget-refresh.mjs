#!/usr/bin/env node
/**
 * Safe wrapper to regenerate + validate a bundle-budget baseline.
 *
 * Guardrails:
 *  1. Requires `--force` (or `BUDGET_FORCE=1`) — prevents accidental writes.
 *  2. Refuses to run with a dirty git working tree unless `--allow-dirty`,
 *     so the diff you review is only the baseline change.
 *  3. Requires `dist/` to exist (build must have happened first) unless
 *     `--build` is passed, in which case we run `bun run build` first.
 *  4. Runs the budget check AFTER writing to confirm the new baseline
 *     actually passes its own limits — bails out and restores the
 *     previous baseline if it doesn't.
 *  5. Prints a before/after diff summary (totals + top chunk deltas) so you
 *     can eyeball the change before committing.
 *
 * Usage:
 *   bun run budget:refresh --force                # default env (legacy file)
 *   bun run budget:refresh --force --env=pr       # updates baseline.pr.json
 *   bun run budget:refresh --force --env=main --build
 *   bun run budget:refresh --force --allow-dirty
 */
import { execFileSync, spawnSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
  writeFileSync,
  copyFileSync,
  unlinkSync,
} from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const val = (name) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=")[1] : undefined;
};

const FORCE = has("--force") || process.env.BUDGET_FORCE === "1";
const ALLOW_DIRTY = has("--allow-dirty");
const BUILD_FIRST = has("--build");
const ENV = (val("env") || process.env.BUDGET_BASELINE_ENV || "").trim();

const BASELINE_FILE = ENV
  ? `bundle-budget.baseline.${ENV}.json`
  : "bundle-budget.baseline.json";
const BASELINE_PATH = join(ROOT, BASELINE_FILE);
const BACKUP_PATH = BASELINE_PATH + ".bak";

function die(msg, code = 1) {
  console.error(`\n✖ ${msg}\n`);
  process.exit(code);
}
function info(msg) {
  console.log(`• ${msg}`);
}

// -------- Guard 1: --force required --------
if (!FORCE) {
  die(
    `Refusing to update baseline without --force.\n\n` +
      `  This rewrites ${BASELINE_FILE} and, once committed, becomes the\n` +
      `  new reference every future PR is measured against. If sizes look\n` +
      `  wrong here, they will look "fine" from then on.\n\n` +
      `  Re-run with:\n` +
      `    bun run budget:refresh --force${ENV ? ` --env=${ENV}` : ""}\n`,
  );
}

// -------- Guard 2: clean working tree --------
if (!ALLOW_DIRTY) {
  try {
    const dirty = execFileSync("git", ["status", "--porcelain"], {
      encoding: "utf8",
    }).trim();
    if (dirty) {
      die(
        `Working tree has uncommitted changes. Stash/commit them first so\n` +
          `  the baseline update is the only diff, or pass --allow-dirty.\n\n` +
          dirty
            .split("\n")
            .slice(0, 10)
            .map((l) => "    " + l)
            .join("\n"),
      );
    }
  } catch {
    info("git not available — skipping clean-tree check.");
  }
}

// -------- Guard 3: build first if asked / needed --------
const DIST = join(ROOT, "dist", "client");
if (BUILD_FIRST || !existsSync(DIST)) {
  info(
    BUILD_FIRST
      ? "Running `bun run build` (--build passed)…"
      : "dist/ missing — running `bun run build` first…",
  );
  const r = spawnSync("bun", ["run", "build"], { stdio: "inherit" });
  if (r.status !== 0) die("Build failed. Baseline NOT updated.", r.status ?? 1);
}

// -------- Snapshot previous baseline for diff / rollback --------
const hadPrevious = existsSync(BASELINE_PATH);
if (hadPrevious) copyFileSync(BASELINE_PATH, BACKUP_PATH);

// -------- Write new baseline --------
info(`Writing new baseline → ${BASELINE_FILE}`);
{
  const r = spawnSync(
    "node",
    ["scripts/bundle-budget.mjs", "--update-baseline"],
    {
      stdio: "inherit",
      env: { ...process.env, ...(ENV ? { BUDGET_BASELINE_ENV: ENV } : {}) },
    },
  );
  if (r.status !== 0) {
    if (hadPrevious) copyFileSync(BACKUP_PATH, BASELINE_PATH);
    die("Baseline write failed — previous baseline restored.", r.status ?? 1);
  }
}

// -------- Validate: the new baseline must pass its own check --------
info("Re-running budget check against fresh baseline…");
{
  const r = spawnSync("node", ["scripts/bundle-budget.mjs"], {
    stdio: "inherit",
    env: { ...process.env, ...(ENV ? { BUDGET_BASELINE_ENV: ENV } : {}) },
  });
  if (r.status !== 0) {
    if (hadPrevious) {
      copyFileSync(BACKUP_PATH, BASELINE_PATH);
      die(
        "New baseline FAILED its own budget check — previous baseline restored.\n" +
          "  This usually means a chunk exceeds a hard cap (BUDGET_*_KB).\n" +
          "  Fix the regression, or raise the cap intentionally, before retrying.",
        r.status ?? 1,
      );
    }
    die("New baseline failed validation and no previous baseline to restore.", r.status ?? 1);
  }
}

// -------- Diff summary --------
if (hadPrevious) {
  try {
    const prev = JSON.parse(readFileSync(BACKUP_PATH, "utf8"));
    const next = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const fmt = (n) =>
      n == null
        ? "—"
        : `${(n / 1024).toFixed(1)} KB`;
    const delta = (a, b) => {
      const d = (a ?? 0) - (b ?? 0);
      const p = b ? ((d / b) * 100).toFixed(1) : "∞";
      const sign = d >= 0 ? "+" : "";
      return `${sign}${fmt(d)} (${sign}${p}%)`;
    };
    console.log("\n─── Baseline change summary ───");
    console.log(
      `client total: ${fmt(prev.client?.total)} → ${fmt(next.client?.total)}   ${delta(next.client?.total, prev.client?.total)}`,
    );
    console.log(
      `server total: ${fmt(prev.server?.total)} → ${fmt(next.server?.total)}   ${delta(next.server?.total, prev.server?.total)}`,
    );

    const groupDeltas = [];
    const prevGroups = prev.client?.groups ?? {};
    const nextGroups = next.client?.groups ?? {};
    const keys = new Set([...Object.keys(prevGroups), ...Object.keys(nextGroups)]);
    for (const k of keys) {
      const d = (nextGroups[k] ?? 0) - (prevGroups[k] ?? 0);
      if (d !== 0) groupDeltas.push({ k, d, cur: nextGroups[k], prev: prevGroups[k] });
    }
    groupDeltas.sort((a, b) => Math.abs(b.d) - Math.abs(a.d));
    if (groupDeltas.length) {
      console.log("\ntop chunk deltas:");
      for (const g of groupDeltas.slice(0, 10)) {
        const sign = g.d >= 0 ? "+" : "";
        console.log(`  ${sign}${fmt(g.d).padStart(9)}  ${g.k.replace(/^dist\/client\/assets\//, "")}`);
      }
    } else {
      console.log("no per-chunk changes.");
    }
  } catch (err) {
    info(`(diff summary skipped: ${err.message})`);
  }
  unlinkSync(BACKUP_PATH);
}

console.log(
  `\n✓ Baseline updated and validated: ${BASELINE_FILE}\n` +
    `  Review the diff, then commit:\n` +
    `    git add ${BASELINE_FILE}\n` +
    `    git commit -m "chore(budget): refresh baseline${ENV ? ` (${ENV})` : ""}"\n`,
);
