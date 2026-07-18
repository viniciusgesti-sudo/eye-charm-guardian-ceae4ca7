import { Logo } from "./Logo";

/* ---------- Icons (line-art, currentColor) ---------- */

const Ic = {
  Shield: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3 4 6v6c0 4.5 3.2 8.2 8 9 4.8-.8 8-4.5 8-9V6l-8-3Z" />
      <path d="m8.5 12 2.4 2.4L16 10" />
    </svg>
  ),
  Eye: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </svg>
  ),
  Frame: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="6.5" cy="14" r="3.5" />
      <circle cx="17.5" cy="14" r="3.5" />
      <path d="M10 14h4M2 11l2.3-2M22 11l-2.3-2" />
    </svg>
  ),
  Check: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.8 2.8L16 9.5" />
    </svg>
  ),
  Instagram: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  ),
  TikTok: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 4c.4 2.5 2.2 4.3 4.7 4.7" />
    </svg>
  ),
  Facebook: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 8.5V6.8c0-.9.5-1.3 1.4-1.3H17V2.5h-2.6c-2.7 0-3.9 1.5-3.9 3.8V8.5H8v3h2.5V21H14v-9.5h2.4l.5-3H14Z" />
    </svg>
  ),
  YouTube: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="m10.5 9.5 4.5 2.5-4.5 2.5v-5Z" fill="currentColor" />
    </svg>
  ),
};

/* ---------- Trust Bar ---------- */

const trust = [
  { icon: Ic.Shield, title: "Engineered to Protect", sub: "Advanced blue light protection" },
  { icon: Ic.Eye,    title: "True Colors",           sub: "No yellow tint" },
  { icon: Ic.Frame,  title: "Designed to Wear",      sub: "Timeless style, every day" },
  { icon: Ic.Check,  title: "Quality You Can Trust", sub: "Built to last" },
];

function TrustBar() {
  return (
    <section className="bg-[#F9F9F9] border-t border-b border-ink/10">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 px-6 py-10 md:grid-cols-4 md:px-10 md:py-12">
        {trust.map(({ icon: Icon, title, sub }) => (
          <div key={title} className="flex flex-col items-center text-center">
            <Icon className="h-7 w-7 text-[#004B57]" />
            <div className="mt-4 small-caps text-[11px] text-[#1D252D]">{title}</div>
            <div className="mt-1 font-sans text-[13px] font-light text-ink/60">{sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

const AMZ = "https://www.amazon.com/stores/Eyegis/page/?tag=eyegis-20";

const cols = [
  {
    title: "Products",
    links: [
      { label: "Men", href: AMZ, external: true },
      { label: "Women", href: AMZ, external: true },
      { label: "Kids & Teenagers", href: AMZ, external: true },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Our Technology", href: "#technology" },
      { label: "Honest Science™", href: "#honest-science" },
      { label: "Who We Are", href: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Website Terms of Use", href: "/terms" },
      { label: "Conformity & Compliance", href: "/compliance" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com/eyegis",   Icon: Ic.Instagram },
  { label: "TikTok",    href: "https://tiktok.com/@eyegis",     Icon: Ic.TikTok },
  { label: "Facebook",  href: "https://facebook.com/eyegis",    Icon: Ic.Facebook },
  { label: "YouTube",   href: "https://youtube.com/@eyegis",    Icon: Ic.YouTube },
];

const topNav = [
  { label: "Shop",       href: AMZ, external: true },
  { label: "Technology", href: "#technology" },
  { label: "Science",    href: "#honest-science" },
  { label: "About",      href: "/about" },
  { label: "Support",    href: "/contact" },
];

export function Footer() {
  return (
    <>
      <TrustBar />

      <footer className="relative bg-[#1D252D] text-[#F9F9F9]">
        {/* Hairline top */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(134,217,209,0.35), transparent)" }}
        />

        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
          {/* Top row — logo + top nav */}
          <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-center">
            <a href="/" aria-label="Eyegis home" className="text-[#F9F9F9]">
              <Logo className="h-7 w-auto text-[#F9F9F9]" />
            </a>

            <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-x-8">
              {topNav.map((l, i) => (
                <div key={l.label} className="flex items-center gap-x-6 md:gap-x-8">
                  {i > 0 && <span aria-hidden className="text-white/25">·</span>}
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="small-caps text-[11px] text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </div>
              ))}
            </nav>
          </div>

          {/* 4 columns */}
          <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {cols.map((col) => (
              <div key={col.title}>
                <h4 className="small-caps text-[11px] text-[#86D9D1]">{col.title}</h4>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...("external" in link && link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="font-sans text-sm font-light text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Column 4 — social */}
            <div>
              <h4 className="small-caps text-[11px] text-[#86D9D1]">Follow Eyegis</h4>
              <ul className="mt-5 flex items-center gap-4">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="group grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-all hover:border-[#86D9D1] hover:text-[#86D9D1]"
                    >
                      <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-sans text-xs font-light leading-relaxed text-white/40">
                Join the Eyegis community for launches, honest science, and
                editorial stories.
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="font-sans text-xs font-light text-white/40">
              © 2026 Eyegis. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
