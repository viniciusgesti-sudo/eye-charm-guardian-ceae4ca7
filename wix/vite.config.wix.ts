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

function inlineCssPlugin() {
  return {
    name: 'inline-css',
    enforce: 'post' as const,
    generateBundle(options: any, bundle: any) {
      let cssContent = '';
      const cssFiles: string[] = [];
      for (const [fileName, file] of Object.entries(bundle)) {
        if (fileName.endsWith('.css') && 'source' in (file as any)) {
          cssContent += (file as any).source;
          cssFiles.push(fileName);
        }
      }
      if (cssContent) {
        for (const [fileName, file] of Object.entries(bundle)) {
          if (fileName.endsWith('.js') && (file as any).type === 'chunk' && (file as any).isEntry) {
            const injectCode = `\n(function(){try{var s=document.createElement('style');s.setAttribute('data-eyegis-bundle', '1');s.textContent=${JSON.stringify(cssContent)};document.head.appendChild(s);}catch(e){}})();`;
            (file as any).code += injectCode;
          }
        }
        cssFiles.forEach(f => delete bundle[f]);
      }
    }
  };
}


export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), inlineCssPlugin()],
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
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return { runtime: `(window.__EYEGIS_CDN_BASE__ || '') + ${JSON.stringify('/' + filename)}` };
      }
      return '/' + filename;
    }
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
      input: {
        "eyegis-bundle": path.resolve(__dirname, "entry.tsx"),
      },
      output: {
        format: "iife",
        name: "EyegisAppBundle",
        entryFileNames: "eyegis-bundle.js",
        inlineDynamicImports: true,
        assetFileNames: (asset) => {
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
