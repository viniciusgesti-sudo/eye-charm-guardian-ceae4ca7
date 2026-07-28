/**
 * Wix CMS — SiteContent schema
 *
 * Mirrors the Wix collection `SiteContent` exactly. Every field is optional
 * from the perspective of the frontend because a content editor may leave
 * cells empty. Fallbacks live in `fallbacks.ts` per key.
 */

export type CmsImage = {
  /** Absolute HTTPS URL (Wix Media OR local asset). */
  src: string;
  alt?: string;
  /** Optional mobile-optimized variant (Wix Media Manager `mobileImage` field). */
  mobileSrc?: string;
};

export type CmsEntry = {
  /** Editable label in the Wix CMS UI. */
  title?: string;
  /** Stable key used by the frontend to lookup content (`home.hero.center` …). */
  key: string;
  /** Primary body text. */
  text?: string;
  /** Secondary/lead text. */
  subtitle?: string;
  /** Long-form paragraph. */
  description?: string;
  /** Primary image (Wix media URL or local). */
  image?: CmsImage;
  /** Optional mobile-optimized image. */
  mobileImage?: CmsImage;
  /** Optional video URL. */
  video?: string;
  /** Primary CTA label. */
  buttonText?: string;
  /** Primary CTA href (external URL or internal route). */
  buttonLink?: string;
  /** Alt for image (falls back to image.alt). */
  altText?: string;
  /** Deep link when the entry itself represents a link. */
  link?: string;
  /** Sort order inside a list. */
  order?: number;
  /** Editor toggle — false = ignore this entry. */
  active?: boolean;
};

/** Registry of every key the frontend consumes. */
export type CmsMap = Record<string, CmsEntry>;

/** Every known key (also enforced by the fallback table). */
export type CmsKey =
  | "home.hero.center"
  | "home.hero.men"
  | "home.hero.women"
  | "home.collection.men"
  | "home.collection.men.amazon"
  | "home.collection.women"
  | "home.collection.women.amazon"
  | "home.collection.kids"
  | "home.science"
  | "home.reviews.header"
  | "home.reviews.1"
  | "home.reviews.2"
  | "home.reviews.3"
  | "home.cta.amazon"
  | "home.sticky.bar"
  | "home.lifestyle.1"
  | "home.lifestyle.2"
  | "home.lifestyle.3"
  | "home.lifestyle.4"
  | "home.lifestyle.5"
  | "home.lifestyle.6";
