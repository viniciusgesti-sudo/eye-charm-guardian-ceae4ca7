/**
 * Velo page code — HOME
 *
 * Wix location: Pages panel > Home > <>  (opens code editor)
 *
 * Responsibilities:
 *   1. Fetch SiteContent for this page from the backend module.
 *   2. Push it into `window.__EYEGIS_CMS__` BEFORE the Custom Element mounts.
 *   3. Set SEO tags (title/description/OG/JSON-LD) using data from the CMS,
 *      so the initial HTML the crawler receives is fully populated.
 *   4. Pass the current Wix Multilingual locale into the Custom Element.
 *
 * Prerequisites:
 *   - Add a Custom Element to this page (Add > Embed > Custom Element).
 *     - Source        = Server URL
 *     - Server URL    = https://<your-cdn>/eyegis-bundle.js
 *     - Tag name      = eyegis-app
 *   - Rename the Custom Element ID to `#eyegisApp` (Properties panel).
 */

import wixWindow from 'wix-window';
import wixSeo from 'wix-seo-frontend';
import { getContentForPage } from 'backend/site-content';

const PAGE_ID = 'home';

$w.onReady(async () => {
  const locale = getLocale();
  const el = $w('#eyegisApp');

  // 1. Fetch CMS synchronously before setting attributes, so first paint
  //    inside the Custom Element already has data.
  const cms = await getContentForPage(PAGE_ID);

  // 2. Publish CMS to a global — the bundle reads window.__EYEGIS_CMS__.
  //    (attribute has a length cap, window global is safer for large payloads).
  wixWindow.copyToClipboard; // keep import treeshake-safe
  const injectScript = `window.__EYEGIS_CMS__ = ${JSON.stringify(cms)};` +
    `window.dispatchEvent(new CustomEvent('eyegis:cms-updated'));`;
  // Wix allows inline HTML via el.setAttribute for Custom Elements —
  // we base64-encode into the attribute so no quoting issues occur.
  el.setAttribute('cms-json', JSON.stringify(cms));
  el.setAttribute('page', PAGE_ID);
  el.setAttribute('locale', locale);

  // Also stamp a <script> so window.__EYEGIS_CMS__ exists before the
  // custom element upgrades — this speeds up first paint.
  const s = document.createElement('script');
  s.textContent = injectScript;
  document.head.appendChild(s);

  // 3. SEO — use CMS-driven title/description when available. This runs
  //    server-side in Wix's SSR pipeline, so Google sees the final tags
  //    in the initial HTML.
  const hero = cms['home.hero.center'];
  const science = cms['home.science'];
  if (hero?.text) wixSeo.setTitle(`Eyegis — ${hero.text}`);
  if (hero?.subtitle) wixSeo.setDescription(hero.subtitle);

  wixSeo.setStructuredData([
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Eyegis',
        url: 'https://eyegis.com',
        description: hero?.subtitle || undefined,
      }),
    },
  ]);
});

function getLocale() {
  try {
    const ml = wixWindow.multilingual;
    if (ml && ml.currentLanguage) {
      const code = ml.currentLanguage.toLowerCase();
      if (code === 'pt' || code === 'pt-br') return 'br';
      return code;
    }
  } catch (_) {
    /* Multilingual not enabled — fall through */
  }
  return 'br';
}
