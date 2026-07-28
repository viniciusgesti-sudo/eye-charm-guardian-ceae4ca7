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

const TAG = "eyegis-app";

class EyegisElement extends HTMLElement {
  static get observedAttributes() {
    return ["page", "locale", "cms-json"];
  }

  private root: Root | null = null;
  private mountNode: HTMLDivElement | null = null;

  connectedCallback() {
    if (this.mountNode) return;
    this.mountNode = document.createElement("div");
    this.mountNode.style.display = "contents";
    this.appendChild(this.mountNode);
    this.root = createRoot(this.mountNode);
    this.render();
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
    const page = (this.getAttribute("page") ?? "home") as PageId;
    const locale = (this.getAttribute("locale") ?? "br").toLowerCase();
    const cms = this.readCms();
    this.root.render(
      <StrictMode>
        <CmsProvider value={cms}>
          <EyegisApp page={page} locale={locale} />
        </CmsProvider>
      </StrictMode>,
    );
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
      console.error("[eyegis-app] invalid cms-json attribute", err);
      return undefined;
    }
  }
}

if (!customElements.get(TAG)) {
  customElements.define(TAG, EyegisElement);
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
