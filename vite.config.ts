// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Nitro (server bundler) options. Minifying the SSR/Worker output cuts the
  // heaviest vendor chunk (@tanstack/react-router) roughly in half without
  // changing runtime behavior. The template's public type omits `minify`, but
  // user nitro options are spread straight into `nitro()`, so a cast is safe.
  // Deploy target: Lovable/Cloudflare by default. Set NITRO_PRESET (e.g. "vercel")
  // in the hosting provider to emit that provider's output format instead.
  nitro: {
    minify: true,
    ...(process.env.NITRO_PRESET ? { preset: process.env.NITRO_PRESET } : {}),
  } as any,


  plugins: [
    imagetools({
      // Enable ?url and ?picture etc. Defaults are fine; we opt-in per import.
      defaultDirectives: (url) => {
        // Auto-optimize JPGs referenced via ?optimized query
        if (url.searchParams.has("optimized")) {
          return new URLSearchParams({
            format: "webp",
            quality: "78",
            w: "1600",
          });
        }
        return new URLSearchParams();
      },
    }),
  ],
  vite: {
    // Modern target -> smaller output, no legacy transforms.
    build: {
      target: "es2022",
      // Force esbuild minify regardless of Vite `--mode`. Without this, running
      // `vite build --mode development` (used by `build:dev` in CI) disables
      // client minify, so tree-shaking + dead-code elimination + drop of
      // `debugger`/`console.*` all silently regress and the CI bundle no longer
      // matches production. Explicit "esbuild" keeps CI and prod byte-consistent.
      minify: "esbuild",
      cssMinify: "lightningcss",
      // Inline small assets (<=4 KB) to save requests, but let Vite chunk the rest.
      assetsInlineLimit: 4096,
      reportCompressedSize: false,
      // Emit sourcemaps only when generating a bundle diff report.
      // `BUNDLE_STATS=1 bun run build` enables per-module attribution used
      // by scripts/bundle-diff.mjs. Normal builds stay sourcemap-free.
      sourcemap: process.env.BUNDLE_STATS === "1" ? "hidden" : false,
      rollupOptions: {
        output: {
          // Split heavy vendors out of the client entry chunk so the initial
          // JS stays small. Each group becomes its own long-cacheable chunk.
          manualChunks(id: string) {
            if (!id.includes("node_modules")) return;
            if (/[\\/]node_modules[\\/](react|react-dom|scheduler|use-sync-external-store)[\\/]/.test(id)) {
              return "react";
            }
            if (id.includes("node_modules/@tanstack/")) return "tanstack";
            if (id.includes("node_modules/@radix-ui/")) return "radix";
            if (
              id.includes("node_modules/lucide-react") ||
              id.includes("node_modules/framer-motion") ||
              id.includes("node_modules/motion")
            ) {
              return "motion-icons";
            }
          },
        },
        // Aggressive tree-shaking: assume most modules are side-effect free.
        treeshake: {
          moduleSideEffects: (id: string) =>
            id.endsWith(".css") || id.includes("styles.css"),
          propertyReadSideEffects: false,
        },
      },
    },
    // esbuild handles JS/TS minify; drop dev-only noise from prod bundles.
    esbuild: {
      legalComments: "none",
      drop: ["debugger"],
      pure: ["console.log", "console.debug", "console.trace"],
    },
    // Keep dependency pre-bundle lean.
    optimizeDeps: {
      esbuildOptions: { target: "es2022", legalComments: "none" },
    },
  },
});
