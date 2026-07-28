/**
 * Wix Custom Element bundle entry.
 *
 * Registers <eyegis-app> as a Web Component. When Wix instantiates the tag
 * on a page, this file:
 *
 *   1. reads its attributes (page, locale, cms-json)
 *   2. mounts the React app inside the element
 *   3. re-renders when attributes change
 *
 * The bundle is a SINGLE self-contained ES module. Ship it to a CDN
 * (Wix Media Manager, Cloudflare R2, GitHub Pages, Netlify) and paste
 * the URL into the Wix Custom Element panel — Source = "External" or
 * "Server URL", Tag = "eyegis-app".
 *
 * Same file is added to every page (Home, Men, Women…). Each page just
 * sets a different `page` attribute; a single small React switch below
 * selects which section tree to render.
 */

import { createRoot, type Root } from "react-dom/client";
import { StrictMode } from "react";

import { EyegisApp, type PageId } from "./EyegisApp";
import { CmsProvider } from "@/lib/cms";
import type { CmsMap } from "@/lib/cms";

// Import global stylesheet — Vite inlines it into the bundle's CSS output.
import "@/styles.css";

// ── TEMP INSTRUMENTATION ─────────────────────────────────────────────────
// Diagnostic logs to trace Custom Element execution inside Wix Preview.
// Remove once <eyegis-app> is confirmed rendering.
try {
  // eslint-disable-next-line no-console
  console.info("[EYEGIS] bundle loaded", { url: import.meta.url });
} catch (err) {
  // eslint-disable-next-line no-console
  console.error("[EYEGIS] failed to log bundle load", err);
}

if (typeof window !== "undefined") {
  window.addEventListener("error", (event) => {
    // eslint-disable-next-line no-console
    console.error("[EYEGIS] window.error", event.message, event.error);
  });
  window.addEventListener("unhandledrejection", (event) => {
    // eslint-disable-next-line no-console
    console.error("[EYEGIS] unhandledrejection", event.reason);
  });
}
// ─────────────────────────────────────────────────────────────────────────

const TAG = "eyegis-app";

// Auto-inject the sibling CSS file (eyegis-bundle.css) based on this module's
// URL so the Wix Custom Element renders styled without manual <link> setup.
// Safe against duplicate injection when multiple <eyegis-app> elements exist.
(function injectBundleCss() {
  try {
    const moduleUrl = import.meta.url;
    if (!moduleUrl) return;
    const cssUrl = new URL("./eyegis-bundle.css", moduleUrl).href;
    const existing = document.querySelector<HTMLLinkElement>(
      `link[rel="stylesheet"][data-eyegis-bundle="1"]`,
    );
    if (existing && existing.href === cssUrl) return;
    if (existing) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssUrl;
    link.setAttribute("data-eyegis-bundle", "1");
    document.head.appendChild(link);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[EYEGIS] failed to inject bundle CSS", err);
  }
})();

class EyegisElement extends HTMLElement {
  static get observedAttributes() {
    return ["page", "locale", "cms-json"];
  }

  private root: Root | null = null;
  private mountNode: HTMLDivElement | null = null;

  connectedCallback() {
    // eslint-disable-next-line no-console
    console.info("[EYEGIS] connectedCallback");
    try {
      if (this.mountNode) return;
      this.mountNode = document.createElement("div");
      this.mountNode.style.display = "contents";
      this.appendChild(this.mountNode);
      // eslint-disable-next-line no-console
      console.info("[EYEGIS] mount node created");
      this.root = createRoot(this.mountNode);
      // eslint-disable-next-line no-console
      console.info("[EYEGIS] React root created");
      this.render();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[EYEGIS] connectedCallback failed", err);
    }
  }

  attributeChangedCallback() {
    if (this.root) this.render();
  }

  disconnectedCallback() {
    this.root?.unmount();
    this.root = null;
    this.mountNode?.remove();
    this.mountNode = null;
  }

  private render() {
    if (!this.root) return;
    try {
      const page = (this.getAttribute("page") ?? "home") as PageId;
      const locale = (this.getAttribute("locale") ?? "br").toLowerCase();
      const cms = this.readCms();
      // eslint-disable-next-line no-console
      console.info("[EYEGIS] rendering app", { page, locale, hasCms: !!cms });
      this.root.render(
        <StrictMode>
          <CmsProvider value={cms}>
            <EyegisApp page={page} locale={locale} />
          </CmsProvider>
        </StrictMode>,
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[EYEGIS] render failed", err);
    }
  }

  private readCms(): CmsMap | undefined {
    // Preferred: Velo pushed data into window.__EYEGIS_CMS__ (largest payloads).
    const w = window as unknown as { __EYEGIS_CMS__?: CmsMap };
    if (w.__EYEGIS_CMS__) return w.__EYEGIS_CMS__;
    // Fallback: JSON pasted straight into the attribute (small payloads / tests).
    const raw = this.getAttribute("cms-json");
    if (!raw) return undefined;
    try {
      return JSON.parse(raw) as CmsMap;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[EYEGIS] invalid cms-json attribute", err);
      return undefined;
    }
  }
}

// eslint-disable-next-line no-console
console.info("[EYEGIS] defining custom element");
if (!customElements.get(TAG)) {
  try {
    customElements.define(TAG, EyegisElement);
    // eslint-disable-next-line no-console
    console.info("[EYEGIS] custom element defined");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[EYEGIS] customElements.define failed", err);
  }
} else {
  // eslint-disable-next-line no-console
  console.info("[EYEGIS] custom element already defined, skipping");
}

// Signal readiness so Velo can `window.__EYEGIS_CMS__ = …` and then dispatch
// `eyegis:cms-updated` on any existing elements to re-render.
window.addEventListener("eyegis:cms-updated", () => {
  document.querySelectorAll<EyegisElement>(TAG).forEach((el) => {
    // Trigger re-render by touching an observed attribute.
    el.setAttribute("cms-json", el.getAttribute("cms-json") ?? "");
  });
});

// eslint-disable-next-line no-console
console.info("[eyegis-app] custom element registered");
