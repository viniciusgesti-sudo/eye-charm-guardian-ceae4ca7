/**
 * Standalone Vite config for the Wix Custom Element bundle.
 *
 * Produces a SINGLE ES module + one CSS file under `dist-wix/`:
 *   dist-wix/eyegis-bundle.js
 *   dist-wix/eyegis-bundle.css
 *
 * Upload BOTH files to a public HTTPS host (Wix Media Manager works, but
 * a real CDN such as Cloudflare R2 / Netlify / GitHub Pages is preferred
 * for cache headers). Then, in Wix:
 *
 *   Custom Element panel
 *     Source        = Server URL
 *     Server URL    = https://<your-cdn>/eyegis-bundle.js
 *     Tag name      = eyegis-app
 *
 * The bundle auto-loads its CSS by injecting a <link> at boot; no extra
 * step required in Wix.
 *
 * Usage:
 *   bun run build:wix
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      // Swap TanStack Router for a shim so <Link>/hooks work without a
      // RouterProvider (Wix owns URLs). See wix/shims/router.tsx.
      "@tanstack/react-router": path.resolve(__dirname, "shims/router.tsx"),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: "dist-wix",
    emptyOutDir: true,
    target: "es2022",
    minify: "esbuild",
    cssMinify: "esbuild",
    cssCodeSplit: false,
    sourcemap: false,
    // Keep asset inlining threshold at Vite's default (4 KiB) so large
    // images/fonts are emitted as sibling files instead of base64. Lib mode
    // would force-inline everything, which pushed the single JS above the
    // 25 MiB Cloudflare Pages per-file cap.
    assetsInlineLimit: 4096,
    modulePreload: { polyfill: false },
    rollupOptions: {
      // Explicit non-HTML entry (replaces `lib` mode) so we get standard
      // multi-chunk code splitting while still emitting a stable
      // `eyegis-bundle.js` for the Wix Custom Element to load.
      input: {
        "eyegis-bundle": path.resolve(__dirname, "entry.tsx"),
      },
      output: {
        format: "es",
        entryFileNames: "eyegis-bundle.js",
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: (asset) => {
          if (asset.name?.endsWith(".css")) return "eyegis-bundle.css";
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
