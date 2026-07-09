import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";

import heroImg from "@/assets/hero-paris.jpg";
import supportImg from "@/assets/universe-portrait.jpg";
import storeImg from "@/assets/product-hero.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — We're Here to Help — Eyegis" },
      {
        name: "description",
        content:
          "Reach the Eyegis team for product questions, warranty, Amazon orders and business enquiries. Premium international customer care.",
      },
      { property: "og:title", content: "Contact Eyegis — We're Here to Help" },
      {
        property: "og:description",
        content:
          "Premium customer care for Eyegis. Product, warranty, orders and partnerships.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const OFFWHITE = "#F6F3EE";
const CHAMPAGNE = "#E9DFCC";
const INK = "#0E1613";
const TEAL = "#0C3B39";
const MUTED = "#6B6559";

const serif = "'Cormorant Garamond', 'Times New Roman', serif";
const sans = "'Inter', system-ui, sans-serif";

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
        style={{ color: light ? OFFWHITE : INK, fontFamily: sans }}
      >
        {label}
      </span>
    </div>
  );
}

const Icon = {
  Chat: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M6 10 h28 v18 H14 l-8 6 V10 Z" />
    </svg>
  ),
  Lens: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="18" cy="18" r="10" />
      <path d="M26 26 L34 34" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M20 4 L34 10 V21 C34 29 27 34 20 36 C13 34 6 29 6 21 V10 Z" />
    </svg>
  ),
  Handshake: () => (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M4 22 L12 14 L20 20 L28 14 L36 22" />
      <path d="M12 24 L20 30 L28 24" />
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" />
    </svg>
  ),
  TikTok: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M14 4 v10.5 a3.5 3.5 0 1 1 -3.5 -3.5" />
      <path d="M14 4 c0 2.5 2 4.5 4.5 4.5" />
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M15 3 h-2.5 A3.5 3.5 0 0 0 9 6.5 V10 H6 v3 h3 v8 h3 v-8 h3 l0.5 -3 H12 V7 a1 1 0 0 1 1 -1 h2 Z" />
    </svg>
  ),
  Linkedin: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10 v7 M7 7 v0.01 M11 17 v-7 M15 17 v-4 a2 2 0 0 1 4 0 v4" />
    </svg>
  ),
  Youtube: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="2.5" y="6" width="19" height="12" rx="3" />
      <path d="M10 9.5 L15 12 L10 14.5 Z" fill="currentColor" />
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M4 10 h12 M10 4 v12" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 48 48" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="24" cy="24" r="22" />
      <path d="M14 24 L21 31 L34 17" />
    </svg>
  ),
};

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Required").max(60),
  lastName: z.string().trim().min(1, "Required").max(60),
  email: z.string().trim().email("Invalid email").max(200),
  country: z.string().trim().min(1, "Required").max(60),
  reason: z.string().trim().min(1, "Required").max(60),
  message: z.string().trim().min(10, "Please add a few more details").max(1500),
});
type ContactValues = z.infer<typeof contactSchema>;

function ContactPage() {
  const options = [
    { icon: <Icon.Chat />, k: "General Questions", d: "For anything about the brand, product line or press.", cta: "hello@eyegis.com" },
    { icon: <Icon.Lens />, k: "Product Support", d: "Fit, lens choice, comfort or feature questions.", cta: "care@eyegis.com" },
    { icon: <Icon.Shield />, k: "Warranty & Returns", d: "2-year warranty and 60-day comfort guarantee.", cta: "care@eyegis.com" },
    { icon: <Icon.Handshake />, k: "Business & Partnerships", d: "Collaborations, retail and international distribution.", cta: "partners@eyegis.com" },
  ];

  const categories = [
    "Product Questions",
    "Order Assistance",
    "Warranty",
    "Returns",
    "Lens Information",
    "Business Inquiries",
  ];

  const socials = [
    { icon: <Icon.Instagram />, k: "Instagram", d: "Daily editorial", handle: "@eyegis", href: "https://instagram.com/eyegis" },
    { icon: <Icon.TikTok />, k: "TikTok", d: "Behind the design", handle: "@eyegis", href: "https://tiktok.com/@eyegis" },
    { icon: <Icon.Facebook />, k: "Facebook", d: "Community & updates", handle: "/eyegis", href: "https://facebook.com/eyegis" },
    { icon: <Icon.Linkedin />, k: "LinkedIn", d: "Company & partnerships", handle: "/company/eyegis", href: "https://linkedin.com/company/eyegis" },
    { icon: <Icon.Youtube />, k: "YouTube", d: "Films & tech stories", handle: "@eyegis", href: "https://youtube.com/@eyegis" },
  ];

  const quickLinks = [
    { k: "Shipping", to: "/shipping" as const },
    { k: "Warranty", to: "/warranty" as const },
    { k: "Returns", to: "/shipping" as const },
    { k: "Technology", to: "/lenses" as const },
    { k: "Choose Your Lens", to: "/lenses" as const },
    { k: "About", to: "/about" as const },
  ];

  const countries = [
    { k: "North America", x: 205, y: 165, live: true },
    { k: "Europe", x: 445, y: 152, live: true },
    { k: "South America", x: 250, y: 250, live: true },
    { k: "Asia", x: 640, y: 190, live: false },
    { k: "Oceania", x: 720, y: 285, live: false },
    { k: "Middle East", x: 545, y: 190, live: false },
  ];

  return (
    <main style={{ background: OFFWHITE, color: INK, fontFamily: sans }}>
      {/* HERO */}
      <section className="relative min-h-[88vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Soft natural light interior" className="h-full w-full object-cover" style={{ filter: "saturate(0.92) contrast(1.02)" }} />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(14,22,19,0.1) 0%, rgba(246,243,238,0.35) 55%, rgba(246,243,238,0.95) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-[1400px] flex-col justify-between px-6 py-10 md:px-12 md:py-14">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <Link to="/" className="min-w-0 truncate text-[11px] uppercase tracking-[0.4em]" style={{ color: INK }}>
              ← Eyegis
            </Link>
            <span className="shrink-0 text-[10px] uppercase tracking-[0.4em]" style={{ color: INK }}>
              Contact
            </span>
          </div>

          <div className="max-w-[1100px]">
            <Reveal>
              <span className="text-[11px] uppercase tracking-[0.5em]" style={{ color: TEAL }}>
                — Customer Care
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h1
                className="mt-6 text-[52px] leading-[0.98] tracking-[-0.02em] md:text-[112px] lg:text-[140px]"
                style={{ fontFamily: serif, fontWeight: 400 }}
              >
                We're here
                <br />
                to help.
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 max-w-2xl text-[15px] leading-[1.75] md:text-[17px]" style={{ color: INK }}>
                Whether you have questions about our products, technology, warranty or your Amazon
                order, our team is ready to assist you.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 01 — CONTACT OPTIONS */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label="01 — How can we help" />
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="mt-10 max-w-[1100px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[72px]"
            style={{ fontFamily: serif, fontWeight: 400 }}
          >
            Choose the door
            <br />
            that fits your question.
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: "rgba(14,22,19,0.12)" }}>
          {options.map((o, i) => (
            <Reveal key={o.k} delay={(i % 4) * 100}>
              <a
                href={`mailto:${o.cta}`}
                className="group flex h-full min-h-[320px] flex-col justify-between p-10 transition-transform duration-700 hover:-translate-y-1"
                style={{ background: OFFWHITE }}
              >
                <div style={{ color: TEAL }}>{o.icon}</div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: MUTED }}>
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 text-[26px] leading-[1.05]" style={{ fontFamily: serif, fontWeight: 400 }}>
                    {o.k}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.7]" style={{ color: MUTED }}>
                    {o.d}
                  </p>
                  <span
                    className="mt-6 inline-block text-[11px] uppercase tracking-[0.3em] transition-transform group-hover:translate-x-1"
                    style={{ color: TEAL }}
                  >
                    {o.cta} →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 02 — CONTACT FORM */}
      <section style={{ background: CHAMPAGNE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <Rule label="02 — Write to Us" />
              </Reveal>
              <Reveal delay={120}>
                <h2
                  className="mt-10 text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[64px]"
                  style={{ fontFamily: serif, fontWeight: 400 }}
                >
                  A message,
                  <br />
                  answered by
                  <br />
                  a real person.
                </h2>
              </Reveal>
              <Reveal delay={220}>
                <p className="mt-8 max-w-md text-[14px] leading-[1.85]" style={{ color: MUTED }}>
                  Expect a reply within one business day, from a member of our care team — never
                  an automated system.
                </p>
              </Reveal>
              <Reveal delay={320}>
                <div className="mt-12 space-y-6 text-[12px] uppercase tracking-[0.3em]" style={{ color: INK }}>
                  <div>
                    <div className="opacity-60">Care</div>
                    <div className="mt-1 text-[15px] tracking-normal" style={{ fontFamily: serif }}>
                      care@eyegis.com
                    </div>
                  </div>
                  <div>
                    <div className="opacity-60">Partnerships</div>
                    <div className="mt-1 text-[15px] tracking-normal" style={{ fontFamily: serif }}>
                      partners@eyegis.com
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-7">
              <Reveal delay={120}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — CUSTOMER SUPPORT */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label="03 — Customer Support" />
        </Reveal>
        <div className="mt-16 grid gap-16 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-6">
            <img src={supportImg} alt="Portrait, natural light" className="h-[70vh] w-full object-cover" />
          </Reveal>
          <div className="md:col-span-5 md:col-start-8">
            <Reveal delay={120}>
              <h2
                className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[60px]"
                style={{ fontFamily: serif, fontWeight: 400 }}
              >
                Support for every
                <br />
                part of ownership.
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <ul className="mt-10 grid grid-cols-2 gap-y-4 text-[13px] uppercase tracking-[0.28em]" style={{ color: INK }}>
                {categories.map((c) => (
                  <li key={c} className="flex items-center gap-3">
                    <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: TEAL }} />
                    <span className="truncate">{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 04 — OFFICIAL AMAZON STORE */}
      <section className="relative overflow-hidden" style={{ background: INK, color: OFFWHITE }}>
        <div className="absolute inset-0 opacity-25">
          <img src={storeImg} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-32 md:px-12 md:py-52">
          <Reveal>
            <Rule label="04 — Official Amazon Store" light />
          </Reveal>
          <div className="mt-12 grid gap-16 md:grid-cols-12 md:items-end">
            <Reveal delay={120} className="md:col-span-7">
              <h2
                className="text-[36px] leading-[1.02] tracking-[-0.02em] md:text-[76px]"
                style={{ fontFamily: serif, fontWeight: 400, color: OFFWHITE }}
              >
                Need immediate assistance with your order?
              </h2>
              <p className="mt-8 max-w-md text-[14px] leading-[1.85]" style={{ color: "rgba(246,243,238,0.75)" }}>
                Orders are securely processed through our official Amazon Store. Track shipments,
                request returns and manage refunds directly from your Amazon account.
              </p>
            </Reveal>
            <Reveal delay={240} className="md:col-span-5">
              <a
                href="https://www.amazon.com/eyegis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-between px-8 py-6 text-[12px] uppercase tracking-[0.3em] transition-colors"
                style={{ background: OFFWHITE, color: INK }}
              >
                <span>Visit Official Amazon Store</span>
                <span>↗</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 05 — SOCIAL MEDIA */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label="05 — Follow Eyegis" />
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="mt-10 max-w-[1100px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[64px]"
            style={{ fontFamily: serif, fontWeight: 400 }}
          >
            Meet the brand,
            <br />
            wherever you are.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-5" style={{ background: "rgba(14,22,19,0.12)" }}>
          {socials.map((s, i) => (
            <Reveal key={s.k} delay={(i % 5) * 80}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full min-h-[240px] flex-col justify-between p-8 transition-transform duration-700 hover:-translate-y-1"
                style={{ background: OFFWHITE }}
              >
                <div style={{ color: TEAL }}>{s.icon}</div>
                <div>
                  <h3 className="text-[22px] leading-[1.05]" style={{ fontFamily: serif, fontWeight: 400 }}>
                    {s.k}
                  </h3>
                  <p className="mt-2 text-[12px] leading-[1.6]" style={{ color: MUTED }}>
                    {s.d}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.3em]" style={{ color: TEAL }}>
                    <span className="truncate">{s.handle}</span>
                    <span className="shrink-0">Follow →</span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 06 — BUSINESS HOURS */}
      <section style={{ background: CHAMPAGNE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <Rule label="06 — Business Hours" />
          </Reveal>
          <div className="mt-14 grid gap-16 md:grid-cols-12 md:items-end">
            <Reveal delay={120} className="md:col-span-6">
              <h2
                className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[64px]"
                style={{ fontFamily: serif, fontWeight: 400 }}
              >
                When our team
                <br />
                is at the desk.
              </h2>
            </Reveal>
            <Reveal delay={220} className="md:col-span-5 md:col-start-8">
              <p className="text-[13px] leading-[1.8]" style={{ color: MUTED }}>
                Times shown in Central European Time (CET). Our international team covers
                extended hours across time zones.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-3" style={{ background: "rgba(14,22,19,0.12)" }}>
            {[
              { k: "Monday – Friday", d: "09:00 – 19:00 CET" },
              { k: "Saturday", d: "10:00 – 16:00 CET" },
              { k: "Sunday", d: "By email — care@eyegis.com" },
            ].map((h) => (
              <div key={h.k} className="p-10" style={{ background: OFFWHITE }}>
                <div className="text-[10px] uppercase tracking-[0.35em]" style={{ color: MUTED }}>
                  {h.k}
                </div>
                <div className="mt-4 text-[24px]" style={{ fontFamily: serif, fontWeight: 400 }}>
                  {h.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — GLOBAL SUPPORT */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <Rule label="07 — Global Support" />
        </Reveal>
        <div className="mt-16 grid gap-16 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <Reveal delay={100}>
              <h2
                className="text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[60px]"
                style={{ fontFamily: serif, fontWeight: 400 }}
              >
                Support that
                <br />
                speaks globally.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-md text-[14px] leading-[1.85]" style={{ color: MUTED }}>
                Active support across three continents today, expanding to Asia, Oceania and the
                Middle East next.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-10 grid grid-cols-2 gap-y-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: INK }}>
                {countries.filter(c => c.live).map((c) => (
                  <div key={c.k} className="flex items-center gap-3">
                    <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: TEAL }} />
                    <span className="truncate">{c.k}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-y-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: MUTED }}>
                {countries.filter(c => !c.live).map((c) => (
                  <div key={c.k} className="flex items-center gap-3">
                    <span className="inline-block h-1.5 w-1.5 rounded-full border" style={{ borderColor: MUTED }} />
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

      {/* 08 — COMMON QUESTIONS QUICK LINKS */}
      <section style={{ background: CHAMPAGNE }}>
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <Rule label="08 — Common Questions" />
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="mt-10 max-w-[1100px] text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[64px]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              Jump straight
              <br />
              to an answer.
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6" style={{ background: "rgba(14,22,19,0.12)" }}>
            {quickLinks.map((q) => (
              <Link
                key={q.k}
                to={q.to}
                className="group flex min-h-[160px] items-end p-8 transition-colors hover:bg-[rgba(14,22,19,0.03)]"
                style={{ background: OFFWHITE }}
              >
                <div className="w-full">
                  <span
                    className="block text-[22px] leading-[1.05]"
                    style={{ fontFamily: serif, fontWeight: 400 }}
                  >
                    {q.k}
                  </span>
                  <span className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.35em]" style={{ color: TEAL }}>
                    <span>Read</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <div className="grid gap-16 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <h2
              className="text-[40px] leading-[1.02] tracking-[-0.02em] md:text-[88px]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              Let's make your
              <br />
              digital life more comfortable.
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-5">
            <div className="flex flex-col gap-3">
              <a
                href="https://www.amazon.com/eyegis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-8 py-5 text-[12px] uppercase tracking-[0.3em]"
                style={{ background: INK, color: OFFWHITE }}
              >
                <span>Buy on Amazon</span>
                <span>↗</span>
              </a>
              <Link
                to="/"
                hash="collections"
                className="inline-flex items-center justify-between border px-8 py-5 text-[12px] uppercase tracking-[0.3em] transition-colors hover:bg-[rgba(14,22,19,0.04)]"
                style={{ borderColor: INK, color: INK }}
              >
                <span>Explore Collections</span>
                <span>→</span>
              </Link>
              <Link
                to="/lenses"
                className="inline-flex items-center justify-between border px-8 py-5 text-[12px] uppercase tracking-[0.3em] transition-colors hover:bg-[rgba(14,22,19,0.04)]"
                style={{ borderColor: "rgba(14,22,19,0.35)", color: INK }}
              >
                <span>Learn About EyegisGuard™</span>
                <span>→</span>
              </Link>
            </div>
          </Reveal>
        </div>

        <div
          className="mt-32 flex flex-col items-start justify-between gap-6 border-t pt-10 md:flex-row md:items-center"
          style={{ borderColor: "rgba(14,22,19,0.15)" }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
            Eyegis © 2026 — Customer Care
          </span>
          <div className="flex flex-wrap gap-8 text-[10px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/lenses">Lenses</Link>
            <Link to="/warranty">Warranty</Link>
            <Link to="/shipping">Shipping</Link>
          </div>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div
        className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
        style={{ filter: "drop-shadow(0 12px 24px rgba(14,22,19,0.25))" }}
      >
        <a
          href="mailto:care@eyegis.com"
          className="flex w-full items-center justify-between px-6 py-4 text-[11px] uppercase tracking-[0.3em]"
          style={{ background: INK, color: OFFWHITE, borderRadius: 999 }}
        >
          <span>Contact Care Team</span>
          <span>→</span>
        </a>
      </div>
    </main>
  );
}

const reasons = [
  "General Question",
  "Product Support",
  "Warranty & Returns",
  "Amazon Order",
  "Business & Partnerships",
  "Press",
];

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span
        className="mb-2 block text-[10px] uppercase tracking-[0.3em]"
        style={{ color: MUTED }}
      >
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-2 block text-[11px]" style={{ color: "#B0463A" }}>
          {error}
        </span>
      ) : null}
    </label>
  );
}

function ContactForm() {
  const [values, setValues] = useState<ContactValues>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    reason: reasons[0],
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function set<K extends keyof ContactValues>(k: K, v: ContactValues[K]) {
    setValues((s) => ({ ...s, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const errs: Partial<Record<keyof ContactValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactValues;
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
  }

  const inputBase =
    "w-full bg-transparent border-0 border-b px-0 py-4 text-[16px] outline-none transition-colors focus:border-b-[color:var(--ink,#0E1613)]";
  const borderStyle = { borderColor: "rgba(14,22,19,0.25)" } as React.CSSProperties;

  if (status === "sent") {
    return (
      <div
        className="flex min-h-[560px] flex-col items-start justify-center rounded-[28px] p-10 md:p-16"
        style={{ background: OFFWHITE }}
      >
        <div style={{ color: TEAL }}>
          <Icon.Check />
        </div>
        <h3
          className="mt-8 text-[36px] leading-[1.05] tracking-[-0.01em] md:text-[52px]"
          style={{ fontFamily: serif, fontWeight: 400 }}
        >
          Message received.
        </h3>
        <p className="mt-6 max-w-md text-[14px] leading-[1.8]" style={{ color: MUTED }}>
          Thank you, {values.firstName}. A member of our care team will reply to{" "}
          <span style={{ color: INK }}>{values.email}</span> within one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setValues({
              firstName: "",
              lastName: "",
              email: "",
              country: "",
              reason: reasons[0],
              message: "",
            });
          }}
          className="mt-10 inline-flex items-center gap-3 border px-6 py-4 text-[11px] uppercase tracking-[0.3em]"
          style={{ borderColor: INK, color: INK }}
        >
          Send another message →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[28px] p-8 md:p-12"
      style={{ background: OFFWHITE, boxShadow: "0 30px 80px -40px rgba(14,22,19,0.25)" }}
    >
      <div className="grid gap-8 md:grid-cols-2">
        <Field label="First Name" error={errors.firstName}>
          <input
            className={inputBase}
            style={borderStyle}
            value={values.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            maxLength={60}
            autoComplete="given-name"
          />
        </Field>
        <Field label="Last Name" error={errors.lastName}>
          <input
            className={inputBase}
            style={borderStyle}
            value={values.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            maxLength={60}
            autoComplete="family-name"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            className={inputBase}
            style={borderStyle}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            maxLength={200}
            autoComplete="email"
          />
        </Field>
        <Field label="Country" error={errors.country}>
          <input
            className={inputBase}
            style={borderStyle}
            value={values.country}
            onChange={(e) => set("country", e.target.value)}
            maxLength={60}
            autoComplete="country-name"
          />
        </Field>
        <div className="md:col-span-2">
          <Field label="Reason for Contact" error={errors.reason}>
            <select
              className={inputBase}
              style={{ ...borderStyle, appearance: "none" }}
              value={values.reason}
              onChange={(e) => set("reason", e.target.value)}
            >
              {reasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field label="Message" error={errors.message}>
            <textarea
              className={inputBase + " min-h-[140px] resize-y"}
              style={borderStyle}
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              maxLength={1500}
            />
            <div className="mt-2 text-right text-[10px] uppercase tracking-[0.25em]" style={{ color: MUTED }}>
              {values.message.length} / 1500
            </div>
          </Field>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-10 inline-flex w-full items-center justify-between px-8 py-5 text-[12px] uppercase tracking-[0.3em] transition-colors disabled:opacity-70"
        style={{ background: INK, color: OFFWHITE }}
      >
        <span>{status === "sending" ? "Sending..." : "Send Message"}</span>
        <span>→</span>
      </button>

      <p className="mt-4 text-[10px] uppercase tracking-[0.3em]" style={{ color: MUTED }}>
        By sending, you agree to be contacted about your enquiry.
      </p>
    </form>
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
              r={5}
              fill={c.live ? TEAL : "transparent"}
              stroke={TEAL}
              strokeWidth={c.live ? 0 : 1}
            />
            {c.live && (
              <circle cx={c.x} cy={c.y} r={5} fill={TEAL}>
                <animate
                  attributeName="r"
                  values="5;16;5"
                  dur="3.2s"
                  begin={`${i * 0.3}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.5;0;0.5"
                  dur="3.2s"
                  begin={`${i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
            )}
            <text
              x={c.x + 12}
              y={c.y + 4}
              fontSize="10"
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
