/**
 * Velo page code — GENERIC template for Men / Women / Kids / Technology /
 * Lenses / About / FAQ / Contact.
 *
 * Copy this file into each Wix page's code panel and change PAGE_ID to
 * match. The Custom Element setup is identical to Home.js.
 */

import wixWindow from 'wix-window';
import wixSeo from 'wix-seo-frontend';
import { getContentForPage } from 'backend/site-content';

// EDIT THIS PER PAGE: 'men' | 'women' | 'kids' | 'technology' | 'lenses'
//                     'about' | 'faq' | 'contact'
const PAGE_ID = 'men';

$w.onReady(async () => {
  const locale = getLocale();
  const el = $w('#eyegisApp');
  const cms = await getContentForPage(PAGE_ID);

  el.setAttribute('cms-json', JSON.stringify(cms));
  el.setAttribute('page', PAGE_ID);
  el.setAttribute('locale', locale);

  const s = document.createElement('script');
  s.textContent = `window.__EYEGIS_CMS__ = ${JSON.stringify(cms)};` +
    `window.dispatchEvent(new CustomEvent('eyegis:cms-updated'));`;
  document.head.appendChild(s);

  const hero = cms[`${PAGE_ID}.hero`] || cms[`${PAGE_ID}.header`];
  if (hero?.text) wixSeo.setTitle(`Eyegis — ${hero.text}`);
  if (hero?.subtitle) wixSeo.setDescription(hero.subtitle);
});

function getLocale() {
  try {
    const code = (wixWindow.multilingual?.currentLanguage || 'pt').toLowerCase();
    if (code === 'pt' || code === 'pt-br') return 'br';
    return code;
  } catch (_) {
    return 'br';
  }
}
