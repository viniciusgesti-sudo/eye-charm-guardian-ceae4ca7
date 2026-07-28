/**
 * Resolve a Wix Media Manager URL or a plain URL into a browser-usable src.
 *
 * Wix returns strings like:
 *   wix:image://v1/abc123~mv2.jpg/hero.jpg#originWidth=2400&originHeight=1600
 *
 * They must be rewritten to:
 *   https://static.wixstatic.com/media/abc123~mv2.jpg
 *
 * Anything already starting with http(s), data:, or a leading "/" is returned
 * unchanged so local /assets, imported `?as=picture` URLs, and Amazon CDN
 * links continue to work.
 */
export function resolveImageUrl(raw: string | undefined | null): string | undefined {
  if (!raw) return undefined;
  const s = raw.trim();
  if (!s) return undefined;
  if (s.startsWith("wix:image://")) {
    // wix:image://v1/<mediaId>/<filename>#...
    // Strip protocol, take the first path segment after v1/
    const withoutProto = s.replace(/^wix:image:\/\//, "");
    const withoutFragment = withoutProto.split("#")[0];
    const parts = withoutFragment.split("/").filter(Boolean);
    // parts = [ "v1", "<mediaId>", "<filename>" ]
    const mediaId = parts[1];
    if (!mediaId) return undefined;
    return `https://static.wixstatic.com/media/${mediaId}`;
  }
  return s;
}

/**
 * Given a Wix media URL, return a width-optimized variant using Wix's
 * built-in image service. Falls back to the original URL if the input is
 * not a Wix static URL.
 */
export function wixImageAt(url: string | undefined, width: number): string | undefined {
  if (!url) return undefined;
  if (!url.includes("static.wixstatic.com/media/")) return url;
  // /media/<id> -> /media/<id>/v1/fill/w_<width>,h_<width>,al_c,q_80,usm_0.66_1.00_0.01/<id>
  const id = url.split("/media/")[1]?.split(/[/?#]/)[0];
  if (!id) return url;
  return `https://static.wixstatic.com/media/${id}/v1/fill/w_${width},al_c,q_80,enc_auto/${id}`;
}
