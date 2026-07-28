/**
 * Velo masterPage.js — runs on every page.
 *
 * File location in Wix: Pages panel > Site (top) > masterPage
 *
 * We use it to inject a shared boot flag so pages can coordinate if
 * needed. Keep it minimal — page-specific logic belongs in each page's
 * code file.
 */

$w.onReady(() => {
  if (typeof window !== 'undefined') {
    window.__EYEGIS_BOOT__ = { ts: Date.now() };
  }
});
