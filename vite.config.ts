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
      cssMinify: "lightningcss",
      // Inline small assets (<=4 KB) to save requests, but let Vite chunk the rest.
      assetsInlineLimit: 4096,
      reportCompressedSize: false,
      rollupOptions: {
        // Aggressive tree-shaking: assume no side-effects outside explicit imports.
        treeshake: {
          preset: "smallest",
          moduleSideEffects: (id) =>
            id.endsWith(".css") || id.includes("styles.css"),
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
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
