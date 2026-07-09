import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import heroImg from "@/assets/lifestyle-work.jpg";
import deliveryImg from "@/assets/lifestyle-travel.jpg";
import storeImg from "@/assets/product-hero.jpg";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping, Returns & Amazon Experience — Eyegis" },
      {
        name: "description",
        content:
          "Every Eyegis purchase is fulfilled through Amazon — secure checkout, fast delivery, easy returns and trusted global support.",
      },
      { property: "og:title", content: "Shipping, Returns & Amazon Experience — Eyegis" },
      {
        property: "og:description",
        content:
          "Simple. Fast. Trusted. Your Eyegis order, delivered by Amazon's global logistics network.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShippingPage,
});

const OFFWHITE = "#F6F3EE";
const CHAMPAGNE = "#E9DFCC";
const INK = "#0E1613";
const TEAL = "#0C3B39";
const MUTED = "#6B6559";

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
  y = 24,
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
        transition: `opacity 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Rule({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-10" style={{ background: light ? OFFWHITE : INK }} />
      <span
        className="text-[10px] uppercase tracking-[0.35em]"
        style={{ color: light ? OFFWHITE : INK, fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

const Icon = {
  Lock: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="8" y="18" width="24" height="16" rx="1.5" />
      <path d="M13 18 v-4 a7 7 0 0 1 14 0 v4" />
      <circle cx="20" cy="26" r="1.5" />
    </svg>
  ),
  Truck: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M4 12 h18 v14 H4 z" />
      <path d="M22 16 h8 l4 6 v4 h-12" />
      <circle cx="12" cy="28" r="3" />
      <circle cx="28" cy="28" r="3" />
    </svg>
  ),
  Return: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M8 20 A12 12 0 1 1 20 32" />
      <path d="M8 12 v8 h8" />
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M20 5 L24 15 L35 16 L27 24 L29 35 L20 30 L11 35 L13 24 L5 16 L16 15 Z" />
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M4 10 h12" />
      <path d="M10 4 v12" />
    </svg>
  ),
  Minus: () => (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M4 10 h12" />
    </svg>
  ),
};

function ShippingPage() {
  const serif = "'Cormorant Garamond', 'Times New Roman', serif";
  const sans = "'Inter', system-ui, sans-serif";

  const whyCards = [
    { icon: <Icon.Lock />, k: "Secure Checkout", d: "Industry-leading payment security, protected by Amazon Pay." },
    { icon: <Icon.Truck />, k: "Fast Delivery", d: "Backed by Amazon's global logistics and Prime-eligible where available." },
    { icon: <Icon.Return />, k: "Easy Returns", d: "A simple, transparent return process managed through your Amazon account." },
    { icon: <Icon.Star />, k: "Trusted Platform", d: "Hundreds of millions of customers worldwide already trust Amazon." },
  ];

  const steps = [
    { k: "Choose your frame", d: "Discover the collection that fits your life." },
    { k: "Click Buy on Amazon", d: "One click sends you to the official Eyegis store." },
    { k: "Secure purchase", d: "Complete checkout with Amazon Pay." },
    { k: "Amazon prepares your order", d: "Your Eyegis is picked, verified and boxed." },
    { k: "Fast delivery", d: "Shipped to your address via Amazon logistics." },
    { k: "Enjoy your Eyegis", d: "Wear, work, create — comfortably." },
  ];

  const returns = [
    {
      tag: "01 — Arrives damaged",
      k: "If your product arrives damaged",
      d: "Amazon's standard return policy applies. Report the issue directly from your Amazon order — replacement or refund handled end-to-end.",
    },
    {
      tag: "02 — Change of mind",
      k: "If you simply change your mind",
      d: "Return within your local Amazon return window. No questions, no forms, no friction.",
    },
    {
      tag: "03 — Comfort concerns",
      k: "If you experience comfort issues",
      d: "Reach out to Eyegis Customer Support — we'll help you find the right frame, fit or collection under our 60-Day Comfort Guarantee.",
    },
  ];

  const countries = [
    { k: "United States", x: 205, y: 165, live: true },
    { k: "Canada", x: 200, y: 130, live: true },
    { k: "United Kingdom", x: 425, y: 138, live: true },
    { k: "France", x: 430, y: 150, live: true },
    { k: "Germany", x: 470, y: 148, live: true },
    { k: "Italy", x: 460, y: 165, live: true },
    { k: "Spain", x: 415, y: 170, live: true },
    { k: "Brazil", x: 260, y: 250, live: true },
    { k: "Japan", x: 685, y: 175, live: false },
    { k: "Australia", x: 720, y: 285, live: false },
    { k: "UAE", x: 555, y: 195, live: false },
    { k: "Mexico", x: 185, y: 210, live: false },
  ];

  const faqs = [
    { q: "Can I use Amazon Prime?", a: "Yes. Where Prime is available, Eyegis products are eligible for Prime shipping and returns." },
    { q: "Can I track my order?", a: "All orders are tracked directly inside your Amazon account, from dispatch to delivery." },
    { q: "Can I exchange sizes?", a: "Yes — initiate an exchange or return from your Amazon order page, then reorder your preferred size." },
    { q: "Who handles returns?", a: "Returns are managed by Amazon under your local marketplace's return window and process." },
    { q: "Who provides support?", a: "Amazon handles shipping and return logistics. Eyegis Care handles product, comfort and warranty questions." },
    { q: "What if my product arrives damaged?", a: "Report it inside your Amazon order within the return window — replacement is typically dispatched immediately." },
  ];

  return (
    <main style={{ background: OFFWHITE, color: INK, fontFamily: sans }}>
      {/* HERO */}
      <section className="relative min-h-[88vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Eyegis lifestyle — desk with minimalist objects"
            className="h-full w-full object-cover"
            style={{ filter: "saturate(0.92) contrast(1.02)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(14,22,19,0.10) 0%, rgba(246,243,238,0.4) 55%, rgba(246,243,238,0.95) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-[1400px] flex-col justify-between px-6 py-10 md:px-12 md:py-14">
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
              Shipping & Returns
            </span>
          </div>

          <div className="max-w-[1100px]">
            <Reveal>
              <span className="text-[11px] uppercase tracking-[0.5em]" style={{ color: TEAL }}>
                — Fulfilled by Amazon
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h1
                className="mt-6 text-[52px] leading-[0.95] tracking-[-0.02em] md:text-[120px] lg:text-[152px]"
                style={{ fontFamily: serif, fontWeight: 400 }}
              >
                Simple.
                <br />
                Fast.
                <br />
                Trusted.
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 max-w-2xl text-[15px] leading-[1.75] md:text-[17px]" style={{ color: INK }}>
                Every Eyegis purchase is fulfilled through Amazon — providing a secure shopping
                experience, fast delivery and reliable customer support in every marketplace we
                serve.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 01 — WHY AMAZON */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label="01 — Why Amazon" />
        </Reveal>
        <div className="mt-14 grid gap-16 md:grid-cols-12 md:items-end">
          <Reveal delay={100} className="md:col-span-7">
            <h2
              className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[76px]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              The most trusted checkout in the world.
            </h2>
          </Reveal>
          <Reveal delay={200} className="md:col-span-4 md:col-start-9">
            <p className="text-[13px] leading-[1.8]" style={{ color: MUTED }}>
              We chose Amazon as our official retail partner so that every Eyegis order is
              protected by the same standards you already know and trust.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: "rgba(14,22,19,0.12)" }}>
          {whyCards.map((c, i) => (
            <Reveal key={c.k} delay={(i % 4) * 100}>
              <div
                className="group flex h-full min-h-[300px] flex-col justify-between p-10 transition-transform duration-700 hover:-translate-y-1"
                style={{ background: OFFWHITE }}
              >
                <div style={{ color: TEAL }}>{c.icon}</div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: MUTED }}>
                    0{i + 1}
                  </span>
                  <h3
                    className="mt-3 text-[26px] leading-[1.05]"
                    style={{ fontFamily: serif, fontWeight: 400 }}
                  >
                    {c.k}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.7]" style={{ color: MUTED }}>
                    {c.d}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 02 — HOW YOUR ORDER WORKS */}
      <section style={{ background: CHAMPAGNE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <Rule label="02 — How Your Order Works" />
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="mt-10 max-w-[1100px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[72px]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              Six quiet steps
              <br />
              from click to comfort.
            </h2>
          </Reveal>

          <div className="mt-20">
            <div className="grid gap-0 md:grid-cols-6">
              {steps.map((s, i) => (
                <Reveal key={s.k} delay={i * 120}>
                  <div
                    className="relative border-t px-2 py-8 md:border-t-0 md:border-l md:px-6 md:py-2"
                    style={{ borderColor: "rgba(14,22,19,0.18)" }}
                  >
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 md:block">
                      <span
                        className="min-w-0 text-[10px] uppercase tracking-[0.35em]"
                        style={{ color: MUTED }}
                      >
                        Step 0{i + 1}
                      </span>
                      <span
                        className="shrink-0 text-[10px] tracking-[0.3em] md:hidden"
                        style={{ color: MUTED }}
                      >
                        {i < steps.length - 1 ? "↓" : "•"}
                      </span>
                    </div>
                    <h3
                      className="mt-4 text-[24px] leading-[1.05] md:mt-10 md:text-[28px]"
                      style={{ fontFamily: serif, fontWeight: 400 }}
                    >
                      {s.k}
                    </h3>
                    <p className="mt-3 text-[13px] leading-[1.7]" style={{ color: MUTED }}>
                      {s.d}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 — DELIVERY */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label="03 — Delivery" />
        </Reveal>
        <div className="mt-16 grid gap-16 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-6">
            <img src={deliveryImg} alt="Eyegis package in transit" className="h-[70vh] w-full object-cover" />
          </Reveal>
          <div className="md:col-span-5 md:col-start-8">
            <Reveal delay={120}>
              <h2
                className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[60px]"
                style={{ fontFamily: serif, fontWeight: 400 }}
              >
                Delivered by the world's
                <br />
                largest logistics network.
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-10 space-y-6 text-[14px] leading-[1.85]" style={{ color: MUTED }}>
                <p>
                  Delivery times vary depending on your country and Amazon marketplace, and are
                  quoted in real time at checkout.
                </p>
                <p>
                  Amazon Prime members may benefit from faster, complimentary shipping wherever
                  Prime is available.
                </p>
                <p>
                  Every Eyegis order is dispatched from an Amazon fulfilment center and tracked
                  end-to-end inside your Amazon account.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 04 — RETURNS */}
      <section style={{ background: CHAMPAGNE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <Rule label="04 — Returns" />
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="mt-10 max-w-[1100px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[68px]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              Three scenarios,
              <br />
              one calm answer.
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {returns.map((r, i) => (
              <Reveal key={r.k} delay={i * 120}>
                <article
                  className="flex h-full min-h-[360px] flex-col justify-between p-10"
                  style={{ background: OFFWHITE }}
                >
                  <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: TEAL }}>
                    {r.tag}
                  </span>
                  <div>
                    <h3
                      className="text-[26px] leading-[1.1]"
                      style={{ fontFamily: serif, fontWeight: 400 }}
                    >
                      {r.k}
                    </h3>
                    <p className="mt-4 text-[13px] leading-[1.75]" style={{ color: MUTED }}>
                      {r.d}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — COUNTRIES */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label="05 — Countries" />
        </Reveal>
        <div className="mt-16 grid gap-16 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <Reveal delay={100}>
              <h2
                className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[60px]"
                style={{ fontFamily: serif, fontWeight: 400 }}
              >
                Available in eight marketplaces.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-md text-[14px] leading-[1.85]" style={{ color: MUTED }}>
                Eyegis ships through Amazon's regional marketplaces today, with more markets on
                the roadmap.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-10 grid grid-cols-2 gap-y-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: INK }}>
                {countries.filter(c => c.live).map((c) => (
                  <div key={c.k} className="flex items-center gap-3">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: TEAL }}
                    />
                    <span className="truncate">{c.k}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-y-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: MUTED }}>
                {countries.filter(c => !c.live).map((c) => (
                  <div key={c.k} className="flex items-center gap-3">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full border"
                      style={{ borderColor: MUTED }}
                    />
                    <span className="truncate">{c.k} · Soon</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={220} className="md:col-span-7">
            <WorldMap countries={countries} />
          </Reveal>
        </div>
      </section>

      {/* 06 — QUESTIONS */}
      <section style={{ background: CHAMPAGNE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <Rule label="06 — Questions" />
          </Reveal>
          <div className="mt-14 grid gap-16 md:grid-cols-12">
            <Reveal delay={100} className="md:col-span-5">
              <h2
                className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[60px]"
                style={{ fontFamily: serif, fontWeight: 400 }}
              >
                Everything else,
                <br />
                answered.
              </h2>
              <p className="mt-8 max-w-md text-[13px] leading-[1.8]" style={{ color: MUTED }}>
                Still stuck? The Eyegis Care team responds within one business day.
              </p>
            </Reveal>
            <div className="md:col-span-7">
              <FAQList items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* 07 — CUSTOMER SUPPORT */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label="07 — Customer Support" />
        </Reveal>
        <div className="mt-14 grid gap-16 md:grid-cols-12 md:items-end">
          <Reveal delay={100} className="md:col-span-7">
            <h2
              className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[68px]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              Need help?
              <br />
              A real person is waiting.
            </h2>
          </Reveal>
          <Reveal delay={200} className="md:col-span-4 md:col-start-9">
            <p className="text-[13px] leading-[1.8]" style={{ color: MUTED }}>
              For product, comfort or warranty questions — write to us. For shipping or refunds,
              open your Amazon order directly.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: "rgba(14,22,19,0.12)" }}>
          {[
            { k: "Contact Eyegis", d: "care@eyegis.com", href: "mailto:care@eyegis.com" },
            { k: "Visit Amazon Store", d: "Shop the full collection", href: "https://www.amazon.com/eyegis" },
            { k: "Warranty", d: "2 years + 60-day comfort", href: "/warranty" },
            { k: "FAQ", d: "Lenses, fit & care", href: "/lenses" },
          ].map((b, i) => (
            <Reveal key={b.k} delay={i * 100}>
              <a
                href={b.href}
                target={b.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex h-full min-h-[220px] flex-col justify-between p-10 transition-colors hover:bg-[rgba(14,22,19,0.03)]"
                style={{ background: OFFWHITE, color: INK }}
              >
                <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: MUTED }}>
                  0{i + 1}
                </span>
                <div>
                  <h3
                    className="text-[26px] leading-[1.05]"
                    style={{ fontFamily: serif, fontWeight: 400 }}
                  >
                    {b.k}
                  </h3>
                  <p className="mt-3 text-[12px] leading-[1.7]" style={{ color: MUTED }}>
                    {b.d}
                  </p>
                </div>
                <span
                  className="mt-8 text-[11px] uppercase tracking-[0.35em] transition-transform group-hover:translate-x-1"
                  style={{ color: TEAL }}
                >
                  Open →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 08 — OFFICIAL AMAZON STORE */}
      <section className="relative overflow-hidden" style={{ background: INK, color: OFFWHITE }}>
        <div className="absolute inset-0 opacity-30">
          <img src={storeImg} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-32 md:px-12 md:py-52">
          <Reveal>
            <Rule label="08 — Official Amazon Store" light />
          </Reveal>

          <div className="mt-12 grid gap-16 md:grid-cols-12 md:items-end">
            <Reveal delay={120} className="md:col-span-7">
              <h2
                className="text-[40px] leading-[1.02] tracking-[-0.02em] md:text-[92px]"
                style={{ fontFamily: serif, fontWeight: 400, color: OFFWHITE }}
              >
                The official
                <br />
                Eyegis store.
              </h2>
              <ul
                className="mt-10 grid max-w-lg grid-cols-2 gap-y-3 text-[11px] uppercase tracking-[0.3em]"
                style={{ color: "rgba(246,243,238,0.85)" }}
              >
                {["Verified Products", "Secure Checkout", "Fast Delivery", "Trusted Reviews"].map((k) => (
                  <li key={k} className="flex items-center gap-3">
                    <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: OFFWHITE }} />
                    <span className="truncate">{k}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={240} className="md:col-span-5">
              <a
                href="https://www.amazon.com/eyegis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-between px-8 py-6 text-[12px] uppercase tracking-[0.3em] transition-colors"
                style={{ background: OFFWHITE, color: INK }}
              >
                <span>Buy on Amazon</span>
                <span>↗</span>
              </a>
              <Link
                to="/"
                hash="collections"
                className="mt-3 inline-flex w-full items-center justify-between border px-8 py-6 text-[12px] uppercase tracking-[0.3em] transition-colors hover:bg-[rgba(246,243,238,0.08)]"
                style={{ borderColor: OFFWHITE, color: OFFWHITE }}
              >
                <span>Explore Collections</span>
                <span>→</span>
              </Link>
            </Reveal>
          </div>

          <div
            className="mt-24 flex flex-col items-start justify-between gap-6 border-t pt-10 md:flex-row md:items-center"
            style={{ borderColor: "rgba(246,243,238,0.2)" }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "rgba(246,243,238,0.5)" }}>
              Eyegis © 2026 — Shipping & Returns
            </span>
            <div className="flex flex-wrap gap-8 text-[10px] uppercase tracking-[0.4em]" style={{ color: "rgba(246,243,238,0.7)" }}>
              <Link to="/">Home</Link>
              <Link to="/warranty">Warranty</Link>
              <Link to="/about">About</Link>
              <Link to="/lenses">Lenses</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FAQList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t" style={{ borderColor: "rgba(14,22,19,0.2)" }}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className="border-b" style={{ borderColor: "rgba(14,22,19,0.2)" }}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-6 py-7 text-left"
            >
              <span
                className="min-w-0 text-[22px] leading-[1.15] md:text-[28px]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: INK }}
              >
                {it.q}
              </span>
              <span className="shrink-0" style={{ color: INK }}>
                {isOpen ? <Icon.Minus /> : <Icon.Plus />}
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-500"
              style={{ maxHeight: isOpen ? 320 : 0, opacity: isOpen ? 1 : 0 }}
            >
              <p className="pb-8 pr-10 text-[14px] leading-[1.85]" style={{ color: MUTED }}>
                {it.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function WorldMap({ countries }: { countries: { x: number; y: number; k: string; live: boolean }[] }) {
  const dots: { x: number; y: number }[] = [];
  const seed = (x: number, y: number) =>
    Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
  for (let y = 40; y < 320; y += 10) {
    for (let x = 40; x < 800; x += 10) {
      const nx = (x - 420) / 380;
      const ny = (y - 180) / 140;
      const r = nx * nx + ny * ny * 1.35;
      if (r < 0.95 && seed(x, y) > 0.55) dots.push({ x, y });
    }
  }
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 840 360" className="w-full">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={1.1} fill="rgba(14,22,19,0.22)" />
        ))}
        {countries.map((c, i) => (
          <g key={c.k}>
            <circle
              cx={c.x}
              cy={c.y}
              r={4}
              fill={c.live ? TEAL : "transparent"}
              stroke={TEAL}
              strokeWidth={c.live ? 0 : 1}
            />
            {c.live && (
              <circle cx={c.x} cy={c.y} r={4} fill={TEAL}>
                <animate
                  attributeName="r"
                  values="4;14;4"
                  dur="3.2s"
                  begin={`${i * 0.25}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.5;0;0.5"
                  dur="3.2s"
                  begin={`${i * 0.25}s`}
                  repeatCount="indefinite"
                />
              </circle>
            )}
            <text
              x={c.x + 10}
              y={c.y + 4}
              fontSize="9"
              fill={c.live ? INK : MUTED}
              style={{ letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}
            >
              {c.k}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
