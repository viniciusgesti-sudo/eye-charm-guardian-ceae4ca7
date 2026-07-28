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
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: "dist-wix",
    emptyOutDir: true,
    target: "es2022",
    minify: "esbuild",
    cssCodeSplit: false,
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, "entry.tsx"),
      formats: ["es"],
      fileName: () => "eyegis-bundle.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: (asset) => {
          if (asset.name?.endsWith(".css")) return "eyegis-bundle.css";
          return "assets/[name][extname]";
        },
        inlineDynamicImports: true,
      },
    },
  },
});
