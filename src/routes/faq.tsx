import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

import heroImg from "@/assets/universe-lens-macro.jpg";

export const Route = createFileRoute("/faq")({
  head: () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: ALL_QUESTIONS.map((q) => ({
        "@type": "Question",
        name: q.q,
        acceptedAnswer: { "@type": "Answer", text: q.a },
      })),
    };
    return {
      meta: [
        { title: "FAQ & Knowledge Center — Eyegis" },
        {
          name: "description",
          content:
            "Answers about Eyegis lenses, EyegisGuard™ technology, shipping, warranty, returns and lens care. The Eyegis Knowledge Center.",
        },
        { property: "og:title", content: "FAQ & Knowledge Center — Eyegis" },
        {
          property: "og:description",
          content:
            "Everything about Eyegis: technology, blue-light research, orders, shipping, warranty and lens care.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
      ],
    };
  },
  component: FAQPage,
});

const OFFWHITE = "#F6F3EE";
const CHAMPAGNE = "#E9DFCC";
const INK = "#0E1613";
const TEAL = "#0C3B39";
const MUTED = "#6B6559";

const serif = "'Cormorant Garamond', 'Times New Roman', serif";
const sans = "'Inter', system-ui, sans-serif";

type RelatedKey = "technology" | "warranty" | "lenses" | "shipping" | "collections" | "contact";
const RELATED_MAP: Record<RelatedKey, { label: string; to: string; hash?: string }> = {
  technology: { label: "Learn About EyegisGuard™", to: "/lenses" },
  warranty: { label: "Warranty", to: "/warranty" },
  lenses: { label: "Choose Your Lens", to: "/lenses" },
  shipping: { label: "Shipping & Returns", to: "/shipping" },
  collections: { label: "Explore Collections", to: "/", hash: "collections" },
  contact: { label: "Contact Us", to: "/contact" },
};

type Category = {
  id: string;
  index: string;
  label: string;
  icon: React.ReactNode;
  items: { q: string; a: string; related: RelatedKey[] }[];
};

const Icon = {
  Cpu: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="8" y="8" width="16" height="16" />
      <rect x="12" y="12" width="8" height="8" />
      <path d="M4 12 h4 M4 16 h4 M4 20 h4 M24 12 h4 M24 16 h4 M24 20 h4 M12 4 v4 M16 4 v4 M20 4 v4 M12 24 v4 M16 24 v4 M20 24 v4" />
    </svg>
  ),
  Frame: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="10" cy="18" r="5" />
      <circle cx="22" cy="18" r="5" />
      <path d="M15 18 h2" />
    </svg>
  ),
  Wave: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M2 20 Q8 12 14 20 T26 20 T30 18" />
    </svg>
  ),
  Bag: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M6 10 h20 l-2 18 H8 Z" />
      <path d="M12 10 v-2 a4 4 0 0 1 8 0 v2" />
    </svg>
  ),
  Truck: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M3 10 h15 v12 H3 z M18 14 h6 l4 5 v3 h-10" />
      <circle cx="9" cy="24" r="2.5" />
      <circle cx="22" cy="24" r="2.5" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M16 3 L28 8 V17 C28 24 22 28 16 30 C10 28 4 24 4 17 V8 Z" />
    </svg>
  ),
  Return: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M6 16 A10 10 0 1 1 16 26" />
      <path d="M6 8 v8 h8" />
    </svg>
  ),
  Cloth: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M4 8 Q16 4 28 8 L26 26 Q16 30 6 26 Z" />
      <path d="M8 14 Q16 11 24 14 M9 20 Q16 17 23 20" />
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M16 4 L19 13 L28 13 L21 19 L23 28 L16 23 L9 28 L11 19 L4 13 L13 13 Z" />
    </svg>
  ),
  Info: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="16" cy="16" r="12" />
      <path d="M16 14 v8 M16 10 v0.01" />
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="11" cy="11" r="7" />
      <path d="M16 16 L21 21" />
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M4 10 h12 M10 4 v12" />
    </svg>
  ),
  Minus: () => (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M4 10 h12" />
    </svg>
  ),
};

const CATEGORIES: Category[] = [
  {
    id: "technology",
    index: "01",
    label: "Technology",
    icon: <Icon.Cpu />,
    items: [
      {
        q: "What is EyegisGuard™?",
        a: "EyegisGuard™ is our proprietary lens system — a selective blue-light filter engineered to reduce the highest-energy portion of visible blue light (around 400–450nm) without visibly altering colors on your screen.",
        related: ["technology", "lenses"],
      },
      {
        q: "How does selective blue light filtering work?",
        a: "The lens coating and substrate are tuned to attenuate a narrow band of high-energy visible light while remaining highly transparent across the rest of the spectrum. The result is measurable filtration without a yellow cast.",
        related: ["technology", "lenses"],
      },
      {
        q: "Do Eyegis lenses change colors?",
        a: "No. Colors on your screen and in the world remain accurate — which is essential for designers, photographers and anyone working with color.",
        related: ["lenses"],
      },
      {
        q: "Why don't your lenses have a yellow tint?",
        a: "Yellow-tinted lenses filter a wide portion of the blue spectrum, distorting whites and colors. EyegisGuard™ filters a narrower band selectively, preserving color fidelity.",
        related: ["technology", "lenses"],
      },
      {
        q: "What's different from ordinary blue-light glasses?",
        a: "Ordinary lenses often either filter too little to be measurable, or filter so aggressively that they distort color. Eyegis publishes third-party optical data and designs frames worthy of daily wear.",
        related: ["technology", "collections"],
      },
    ],
  },
  {
    id: "products",
    index: "02",
    label: "Products",
    icon: <Icon.Frame />,
    items: [
      {
        q: "Which collection is right for me?",
        a: "Use the Choose Your Lens experience — a short guided flow that recommends the best Eyegis collection based on how you actually use screens.",
        related: ["lenses", "collections"],
      },
      {
        q: "Can I wear Eyegis every day?",
        a: "Yes. Every frame is designed for all-day comfort and timeless style — not a technical accessory you take off between meetings.",
        related: ["collections"],
      },
      {
        q: "Are the frames lightweight?",
        a: "Most Eyegis frames weigh under 22g thanks to TR90 and β-titanium construction. You'll forget you're wearing them.",
        related: ["collections"],
      },
      {
        q: "What materials are used?",
        a: "Ultralight TR90, hypoallergenic β-titanium, Italian acetate and stainless spring hinges — chosen for longevity, comfort and repairability.",
        related: ["collections", "warranty"],
      },
      {
        q: "Can I wear them with headphones?",
        a: "Yes. Slim TR90 temples are designed to sit comfortably under most audio and gaming headsets.",
        related: ["collections"],
      },
    ],
  },
  {
    id: "blue-light",
    index: "03",
    label: "Blue Light",
    icon: <Icon.Wave />,
    items: [
      {
        q: "Do blue-light glasses really work?",
        a: "Independent lab data confirms that Eyegis lenses attenuate high-energy visible light in the 400–450nm band. Whether that improves personal comfort varies by individual — which is why we offer a 60-day comfort guarantee.",
        related: ["technology", "warranty"],
      },
      {
        q: "What does current research say?",
        a: "Peer-reviewed research on symptomatic relief remains mixed. We publish what our lenses do optically and let you decide, backed by our comfort guarantee.",
        related: ["technology"],
      },
      {
        q: "Does Eyegis make medical claims?",
        a: "No. Eyegis is a lifestyle eyewear brand. We do not diagnose, treat or cure any condition. Consult a qualified optometrist for medical advice.",
        related: ["technology"],
      },
      {
        q: "Why is Honest Science™ important?",
        a: "The blue-light category is full of unverifiable claims. Honest Science™ means every optical statement we make is measurable and independently verified.",
        related: ["technology"],
      },
    ],
  },
  {
    id: "orders",
    index: "04",
    label: "Orders",
    icon: <Icon.Bag />,
    items: [
      {
        q: "Where can I buy Eyegis?",
        a: "Eyegis is sold exclusively through the official Amazon Store in supported marketplaces.",
        related: ["shipping"],
      },
      {
        q: "Why do purchases happen through Amazon?",
        a: "Amazon offers secure checkout, fast global logistics and trusted returns — freeing us to focus on the product itself.",
        related: ["shipping"],
      },
      {
        q: "Can I use Amazon Prime?",
        a: "Yes. Where Prime is available, Eyegis products are eligible for Prime shipping and returns.",
        related: ["shipping"],
      },
      {
        q: "How do I track my order?",
        a: "All orders are tracked end-to-end inside your Amazon account.",
        related: ["shipping"],
      },
    ],
  },
  {
    id: "shipping",
    index: "05",
    label: "Shipping",
    icon: <Icon.Truck />,
    items: [
      {
        q: "How long does delivery take?",
        a: "Delivery times vary by country and Amazon marketplace and are quoted in real time at checkout.",
        related: ["shipping"],
      },
      {
        q: "Which countries are supported?",
        a: "Eyegis currently ships across the United States, Canada, United Kingdom, France, Germany, Italy, Spain and Brazil, with more markets on the roadmap.",
        related: ["shipping"],
      },
      {
        q: "How is shipping calculated?",
        a: "Shipping cost is calculated by Amazon based on your marketplace, delivery speed and Prime status.",
        related: ["shipping"],
      },
    ],
  },
  {
    id: "returns",
    index: "06",
    label: "Returns",
    icon: <Icon.Return />,
    items: [
      {
        q: "How do returns work?",
        a: "Returns are managed by Amazon under your local marketplace's return window and process.",
        related: ["shipping", "warranty"],
      },
      {
        q: "Can I exchange products?",
        a: "Yes — initiate a return from your Amazon order page and reorder your preferred model or size.",
        related: ["shipping"],
      },
      {
        q: "What if my product arrives damaged?",
        a: "Report it inside your Amazon order within the return window — replacement is typically dispatched immediately.",
        related: ["shipping", "warranty"],
      },
    ],
  },
  {
    id: "warranty",
    index: "07",
    label: "Warranty",
    icon: <Icon.Shield />,
    items: [
      {
        q: "What does the warranty cover?",
        a: "Two years of coverage against manufacturing defects — frame construction, hinges, materials, lens manufacturing and craftsmanship.",
        related: ["warranty"],
      },
      {
        q: "What isn't covered?",
        a: "Accidental damage, drops, crushing, normal scratches, improper cleaning, heat exposure and unauthorized modifications sit outside the warranty. Paid repairs may still be available.",
        related: ["warranty"],
      },
      {
        q: "How do I request support?",
        a: "Email care@eyegis.com with your Amazon order ID. A member of the care team replies within one business day.",
        related: ["contact", "warranty"],
      },
    ],
  },
  {
    id: "lens-care",
    index: "08",
    label: "Lens Care",
    icon: <Icon.Cloth />,
    items: [
      {
        q: "How should I clean my lenses?",
        a: "Use only the microfiber cloth and lens spray supplied. Rinse with lukewarm water first if the lens is dusty, then dry gently.",
        related: ["warranty"],
      },
      {
        q: "Can I use alcohol?",
        a: "No. Alcohol, ammonia and household glass cleaners will degrade lens coatings over time.",
        related: ["warranty"],
      },
      {
        q: "How should I store my glasses?",
        a: "Return your Eyegis to its hardshell case whenever they're not on your face.",
        related: ["warranty"],
      },
      {
        q: "Can I travel with them?",
        a: "Yes — but never leave your frames in a hot car or in direct sunlight for long periods, as heat can distort the frame material.",
        related: ["warranty", "shipping"],
      },
    ],
  },
  {
    id: "general",
    index: "09",
    label: "General",
    icon: <Icon.Info />,
    items: [
      {
        q: "Is Eyegis a certified medical device?",
        a: "No. Eyegis is a premium lifestyle eyewear brand and does not sell medical devices.",
        related: ["technology"],
      },
      {
        q: "How do I contact the Eyegis team?",
        a: "Reach us at care@eyegis.com for product and care questions, or partners@eyegis.com for business enquiries.",
        related: ["contact"],
      },
    ],
  },
];

const ALL_QUESTIONS = CATEGORIES.flatMap((c) =>
  c.items.map((i) => ({ ...i, category: c.label, categoryId: c.id })),
);

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Reveal({
  children,
  delay = 0,
  y = 20,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 800ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 800ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Rule({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-10" style={{ background: INK }} />
      <span
        className="text-[10px] uppercase tracking-[0.35em]"
        style={{ color: INK, fontFamily: sans }}
      >
        {label}
      </span>
    </div>
  );
}

function FAQPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>(CATEGORIES[0].id);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: cmd/ctrl + K focuses search
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!q) return null;
    return ALL_QUESTIONS.filter(
      (item) =>
        item.q.toLowerCase().includes(q) ||
        item.a.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q),
    ).slice(0, 12);
  }, [q]);

  const activeCategory = CATEGORIES.find((c) => c.id === active)!;

  return (
    <main style={{ background: OFFWHITE, color: INK, fontFamily: sans }}>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt=""
            className="h-full w-full object-cover"
            style={{ filter: "saturate(0.85) contrast(1.02)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(246,243,238,0.85) 0%, rgba(246,243,238,0.95) 60%, rgba(246,243,238,1) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 pt-10 pb-16 md:px-12 md:pt-14 md:pb-24">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <Link
              to="/"
              className="min-w-0 truncate text-[11px] uppercase tracking-[0.4em]"
              style={{ color: INK }}
            >
              ← Eyegis
            </Link>
            <span
              className="shrink-0 text-[10px] uppercase tracking-[0.4em]"
              style={{ color: INK }}
            >
              Knowledge Center
            </span>
          </div>

          <div className="mt-20 max-w-[1200px] md:mt-28">
            <Reveal>
              <span className="text-[11px] uppercase tracking-[0.5em]" style={{ color: TEAL }}>
                — FAQ & Knowledge
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h1
                className="mt-6 text-[44px] leading-[0.98] tracking-[-0.02em] md:text-[96px] lg:text-[120px]"
                style={{ fontFamily: serif, fontWeight: 400 }}
              >
                Questions,
                <br />
                answered beautifully.
              </h1>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-8 max-w-2xl text-[15px] leading-[1.75] md:text-[17px]" style={{ color: INK }}>
                Everything you need to know about Eyegis — our lenses, shipping, warranty and
                digital eye comfort.
              </p>
            </Reveal>

            {/* SEARCH */}
            <Reveal delay={320}>
              <div
                className="mt-12 flex items-center gap-4 rounded-full px-6 py-4 md:px-8 md:py-5"
                style={{
                  background: OFFWHITE,
                  boxShadow: "0 30px 60px -30px rgba(14,22,19,0.25)",
                  border: "1px solid rgba(14,22,19,0.08)",
                }}
              >
                <span style={{ color: MUTED }}>
                  <Icon.Search />
                </span>
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value.slice(0, 120))}
                  placeholder="Search for answers..."
                  className="min-w-0 flex-1 bg-transparent text-[15px] outline-none md:text-[17px]"
                  style={{ color: INK }}
                  maxLength={120}
                  aria-label="Search FAQ"
                />
                <kbd
                  className="hidden shrink-0 rounded-md border px-2 py-1 text-[10px] uppercase tracking-[0.3em] md:inline-block"
                  style={{ borderColor: "rgba(14,22,19,0.2)", color: MUTED }}
                >
                  ⌘ K
                </kbd>
              </div>

              {/* Live results */}
              {filtered && (
                <div
                  className="mt-4 overflow-hidden rounded-2xl"
                  style={{
                    background: OFFWHITE,
                    border: "1px solid rgba(14,22,19,0.1)",
                    boxShadow: "0 20px 40px -30px rgba(14,22,19,0.2)",
                  }}
                >
                  {filtered.length === 0 ? (
                    <div className="px-6 py-8 text-[14px]" style={{ color: MUTED }}>
                      No results for "{query}". Try a different word — or{" "}
                      <Link to="/contact" style={{ color: TEAL }}>
                        contact us
                      </Link>
                      .
                    </div>
                  ) : (
                    <ul>
                      {filtered.map((r) => (
                        <li
                          key={r.categoryId + r.q}
                          className="border-b last:border-b-0"
                          style={{ borderColor: "rgba(14,22,19,0.08)" }}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setActive(r.categoryId);
                              setOpenKey(r.categoryId + "::" + r.q);
                              setQuery("");
                              setTimeout(() => {
                                document
                                  .getElementById("faq-body")
                                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
                              }, 40);
                            }}
                            className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-6 px-6 py-4 text-left transition-colors hover:bg-[rgba(14,22,19,0.04)]"
                          >
                            <span className="min-w-0">
                              <span
                                className="block truncate text-[15px]"
                                style={{ fontFamily: serif, color: INK }}
                              >
                                {r.q}
                              </span>
                              <span
                                className="mt-1 block text-[10px] uppercase tracking-[0.3em]"
                                style={{ color: MUTED }}
                              >
                                {r.category}
                              </span>
                            </span>
                            <span className="shrink-0 text-[11px] uppercase tracking-[0.3em]" style={{ color: TEAL }}>
                              Open →
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* CATEGORY NAV + BODY */}
      <section id="faq-body" className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-32">
        <div className="grid gap-16 md:grid-cols-12">
          {/* Sidebar / horizontal category nav */}
          <aside className="md:col-span-4 lg:col-span-3">
            <div className="sticky top-6">
              <Rule label="Categories" />
              <nav className="mt-8 -mx-2 flex snap-x gap-2 overflow-x-auto md:mx-0 md:block md:overflow-visible">
                {CATEGORIES.map((c) => {
                  const on = c.id === active;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setActive(c.id);
                        setOpenKey(null);
                      }}
                      className="group flex shrink-0 snap-start items-center gap-3 whitespace-nowrap rounded-full px-4 py-2 text-[12px] uppercase tracking-[0.28em] transition-colors md:w-full md:shrink md:justify-between md:whitespace-normal md:rounded-none md:border-b md:px-0 md:py-4"
                      style={{
                        color: on ? INK : MUTED,
                        borderColor: on ? INK : "rgba(14,22,19,0.12)",
                        background: on ? CHAMPAGNE : "transparent",
                      }}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="shrink-0" style={{ color: on ? TEAL : MUTED }}>
                          {c.icon}
                        </span>
                        <span className="truncate">{c.label}</span>
                      </span>
                      <span
                        className="hidden shrink-0 text-[10px] tracking-[0.3em] md:inline"
                        style={{ color: on ? TEAL : MUTED }}
                      >
                        {c.index}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Answers */}
          <div className="md:col-span-8 lg:col-span-9">
            <div
              key={activeCategory.id}
              style={{ animation: "fade-in 0.4s ease-out both" }}
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4">
                <h2
                  className="min-w-0 text-[36px] leading-[1.05] tracking-[-0.01em] md:text-[64px]"
                  style={{ fontFamily: serif, fontWeight: 400 }}
                >
                  {activeCategory.label}
                </h2>
                <span
                  className="shrink-0 text-[10px] uppercase tracking-[0.35em]"
                  style={{ color: MUTED }}
                >
                  Category {activeCategory.index}
                </span>
              </div>
              <p className="mt-4 max-w-xl text-[13px] leading-[1.7]" style={{ color: MUTED }}>
                {activeCategory.items.length} answers in this category.
              </p>

              <div className="mt-10 border-t" style={{ borderColor: "rgba(14,22,19,0.15)" }}>
                {activeCategory.items.map((item) => {
                  const key = activeCategory.id + "::" + item.q;
                  const isOpen = openKey === key;
                  return (
                    <div
                      key={item.q}
                      className="border-b"
                      style={{ borderColor: "rgba(14,22,19,0.15)" }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenKey(isOpen ? null : key)}
                        className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-6 py-7 text-left"
                        aria-expanded={isOpen}
                      >
                        <span
                          className="min-w-0 text-[20px] leading-[1.2] md:text-[26px]"
                          style={{ fontFamily: serif, fontWeight: 400, color: INK }}
                        >
                          {item.q}
                        </span>
                        <span
                          className="shrink-0"
                          style={{ color: INK, transition: "transform 300ms" }}
                        >
                          {isOpen ? <Icon.Minus /> : <Icon.Plus />}
                        </span>
                      </button>
                      <div
                        className="overflow-hidden transition-all duration-500"
                        style={{ maxHeight: isOpen ? 600 : 0, opacity: isOpen ? 1 : 0 }}
                      >
                        <div className="pb-8">
                          <p className="max-w-2xl text-[15px] leading-[1.85]" style={{ color: MUTED }}>
                            {item.a}
                          </p>

                          {item.related.length > 0 && (
                            <div className="mt-8">
                              <div
                                className="text-[10px] uppercase tracking-[0.35em]"
                                style={{ color: TEAL }}
                              >
                                Related
                              </div>
                              <div className="mt-4 flex flex-wrap gap-2">
                                {item.related.map((r) => {
                                  const rel = RELATED_MAP[r];
                                  return (
                                    <Link
                                      key={r}
                                      to={rel.to}
                                      hash={rel.hash}
                                      className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.3em] transition-colors hover:bg-[rgba(14,22,19,0.04)]"
                                      style={{ borderColor: "rgba(14,22,19,0.25)", color: INK }}
                                    >
                                      <span>{rel.label}</span>
                                      <span style={{ color: TEAL }}>→</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STILL NEED HELP */}
      <section style={{ background: CHAMPAGNE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <div className="grid gap-16 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-7">
              <Rule label="Still need help" />
              <h2
                className="mt-8 text-[40px] leading-[1.02] tracking-[-0.02em] md:text-[80px]"
                style={{ fontFamily: serif, fontWeight: 400 }}
              >
                Didn't find
                <br />
                your answer?
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-[1.85]" style={{ color: MUTED }}>
                Our care team responds within one business day — from a real person, in your
                language when available.
              </p>
            </Reveal>
            <Reveal delay={120} className="md:col-span-5">
              <div className="flex flex-col gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-between px-8 py-5 text-[12px] uppercase tracking-[0.3em]"
                  style={{ background: INK, color: OFFWHITE }}
                >
                  <span>Contact Us</span>
                  <span>→</span>
                </Link>
                <a
                  href="https://www.amazon.com/eyegis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between border px-8 py-5 text-[12px] uppercase tracking-[0.3em] transition-colors hover:bg-[rgba(14,22,19,0.04)]"
                  style={{ borderColor: INK, color: INK }}
                >
                  <span>Visit Amazon Store</span>
                  <span>↗</span>
                </a>
                <Link
                  to="/lenses"
                  className="inline-flex items-center justify-between border px-8 py-5 text-[12px] uppercase tracking-[0.3em] transition-colors hover:bg-[rgba(14,22,19,0.04)]"
                  style={{ borderColor: "rgba(14,22,19,0.35)", color: INK }}
                >
                  <span>Explore Technology</span>
                  <span>→</span>
                </Link>
              </div>
            </Reveal>
          </div>

          <div
            className="mt-24 flex flex-col items-start justify-between gap-6 border-t pt-10 md:flex-row md:items-center"
            style={{ borderColor: "rgba(14,22,19,0.2)" }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
              Eyegis © 2026 — Knowledge Center
            </span>
            <div className="flex flex-wrap gap-8 text-[10px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
              <Link to="/">Home</Link>
              <Link to="/lenses">Lenses</Link>
              <Link to="/warranty">Warranty</Link>
              <Link to="/shipping">Shipping</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
