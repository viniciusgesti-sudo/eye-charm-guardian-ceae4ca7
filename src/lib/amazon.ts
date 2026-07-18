// Central Amazon configuration.
// Replace ASIN and associate tag once available.

export const AMAZON_ASSOCIATE_TAG = "eyegis-20"; // TODO: replace with real associate tag
export const AMAZON_ASIN = "B0XXXXXXXX"; // TODO: replace with real Meridian ASIN

type Marketplace = {
  code: string;      // ISO code shown in UI
  label: string;     // Country label
  flag: string;      // Emoji flag
  domain: string;    // amazon domain
  active: boolean;   // true = live, false = coming soon
};

export const MARKETPLACES: Marketplace[] = [
  { code: "US", label: "United States",  flag: "🇺🇸", domain: "amazon.com",    active: true  },
  { code: "UK", label: "United Kingdom", flag: "🇬🇧", domain: "amazon.co.uk",  active: true  },
  { code: "DE", label: "Deutschland",    flag: "🇩🇪", domain: "amazon.de",     active: true  },
  { code: "FR", label: "France",         flag: "🇫🇷", domain: "amazon.fr",     active: true  },
  { code: "IT", label: "Italia",         flag: "🇮🇹", domain: "amazon.it",     active: true  },
  { code: "ES", label: "España",         flag: "🇪🇸", domain: "amazon.es",     active: true  },
  { code: "CA", label: "Canada",         flag: "🇨🇦", domain: "amazon.ca",     active: true  },
  { code: "BR", label: "Brasil",         flag: "🇧🇷", domain: "amazon.com.br", active: false },
];

export function amazonUrl(domain = "amazon.com", asin = AMAZON_ASIN) {
  return `https://www.${domain}/dp/${asin}?tag=${AMAZON_ASSOCIATE_TAG}`;
}

export const DEFAULT_AMAZON_URL = amazonUrl();

// Amazon-rating aggregate (update as reviews scale)
export const AMAZON_RATING = {
  stars: 4.7,
  count: 2341,
  url: `https://www.amazon.com/product-reviews/${AMAZON_ASIN}?tag=${AMAZON_ASSOCIATE_TAG}`,
};
