// Central Amazon configuration.
// The Amazon store is not live yet — we do NOT link to a real /dp/ or
// display invented ratings. All CTAs route through `#coming-soon`, which
// the global ComingSoonModal intercepts to capture email leads.

export const AMAZON_ASSOCIATE_TAG = ""; // set once the real tag is issued
export const AMAZON_ASIN = ""; // set once the real ASIN is issued

export const ASIN_IS_PLACEHOLDER = !AMAZON_ASIN;

// Sentinel href used by every "Shop on Amazon" CTA across the site.
// The global ComingSoonModal listens for clicks on `#coming-soon`
// and intercepts them to open the email capture — so a single flag
// flip here retires the whole "Em breve" state when the store goes live.
export const COMING_SOON_HREF = "#coming-soon";

type Marketplace = {
  code: string;
  label: string;
  flag: string;
  domain: string;
  active: boolean;
};

export const MARKETPLACES: Marketplace[] = [
  { code: "US", label: "United States",  flag: "🇺🇸", domain: "amazon.com",    active: false },
  { code: "UK", label: "United Kingdom", flag: "🇬🇧", domain: "amazon.co.uk",  active: false },
  { code: "DE", label: "Deutschland",    flag: "🇩🇪", domain: "amazon.de",     active: false },
  { code: "FR", label: "France",         flag: "🇫🇷", domain: "amazon.fr",     active: false },
  { code: "IT", label: "Italia",         flag: "🇮🇹", domain: "amazon.it",     active: false },
  { code: "ES", label: "España",         flag: "🇪🇸", domain: "amazon.es",     active: false },
  { code: "CA", label: "Canada",         flag: "🇨🇦", domain: "amazon.ca",     active: false },
  { code: "BR", label: "Brasil",         flag: "🇧🇷", domain: "amazon.com.br", active: true  },
];

// Store isn't live yet: every CTA opens the ComingSoonModal instead of
// linking to a placeholder Amazon page.
export function amazonUrl(_domain = "amazon.com.br", _asin = AMAZON_ASIN) {
  return COMING_SOON_HREF;
}

export const DEFAULT_AMAZON_URL = COMING_SOON_HREF;


// Honest social proof only — no fabricated reviews.
// When real Amazon reviews exist, set this to
// `{ stars: <n>, count: <n>, url: <string> }`.
export const AMAZON_RATING: { stars: number; count: number; url: string } | null = null;

// Verifiable certifications shown in place of fake reviews.
export const LAB_CERTIFICATIONS = {
  short: "ANSI Z80.3 · EN ISO 12312-1 · AS/NZS 1067.1",
  long: {
    en: "Tested in an independent optical lab — ANSI Z80.3 · EN ISO 12312-1 · AS/NZS 1067.1",
    pt: "Testado em laboratório óptico independente — ANSI Z80.3 · EN ISO 12312-1 · AS/NZS 1067.1",
    fr: "Testé en laboratoire optique indépendant — ANSI Z80.3 · EN ISO 12312-1 · AS/NZS 1067.1",
  },
} as const;
