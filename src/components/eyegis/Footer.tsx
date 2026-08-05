import { Link, useParams } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";
import { useContentDocument } from "@/lib/cms";
import globalData from "@/content/global.json";

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

const TRUST_COPY: Record<Lang, { items: { title: string; sub: string }[] }> = {
  EN: {
    items: [
      { title: "Engineered to Protect", sub: "Selective blue-light filtering" },
      { title: "True Colors",           sub: "No yellow tint" },
      { title: "Designed to Wear",      sub: "Timeless style, every day" },
      { title: "Lab-Verified",          sub: "ANSI · EN ISO · AS/NZS" },
    ],
  },
  PT: {
    items: [
      { title: "Feito para proteger",   sub: "Filtragem seletiva de luz azul" },
      { title: "Cores fiéis",           sub: "Sem tom amarelado" },
      { title: "Feito para usar",       sub: "Estilo atemporal, todo dia" },
      { title: "Verificado em laboratório", sub: "ANSI · EN ISO · AS/NZS" },
    ],
  },
  FR: {
    items: [
      { title: "Conçu pour protéger",   sub: "Filtrage sélectif de lumière bleue" },
      { title: "Couleurs fidèles",      sub: "Sans teinte jaune" },
      { title: "Conçu pour être porté", sub: "Un style intemporel, chaque jour" },
      { title: "Vérifié en laboratoire", sub: "ANSI · EN ISO · AS/NZS" },
    ],
  },
};

const trustIcons = [Ic.Shield, Ic.Eye, Ic.Frame, Ic.Check];

function TrustBar() {
  const { lang } = useI18n();
  const content = useContentDocument<typeof TRUST_COPY>("footer-trust", TRUST_COPY);
  const items = content[lang].items;
  return (
    <section className="bg-paper border-t border-b border-ink/10">
      <div className="container-editorial grid grid-cols-2 gap-8 py-10 md:grid-cols-4 md:py-12">
        {items.map((it, i) => {
          const Icon = trustIcons[i];
          return (
            <div key={it.title} className="flex flex-col items-center text-center">
              <Icon className="h-7 w-7 text-teal" />
              <div className="mt-4 small-caps text-[11px] text-ink">{it.title}</div>
              <div className="mt-1 font-sans text-[13px] font-light text-ink/60">{it.sub}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

const AMZ = "#coming-soon";

type LocaleSeg = "br" | "en" | "fr";
const LOCALES: LocaleSeg[] = ["br", "en", "fr"];

type FooterRoute =
  | "/men"
  | "/women"
  | "/kids"
  | "/lenses"
  | "/technology"
  | "/about"
  | "/faq"
  | "/contact"
  | "/shipping"
  | "/warranty"
  | "/legal"
  | "/compliance"
  | "/privacy";

type FooterCopy = {
  columns: [
    { title: string; links: { label: string; to?: FooterRoute; href?: string; external?: boolean }[] },
    { title: string; links: { label: string; to?: FooterRoute; href?: string; hash?: string }[] },
    { title: string; links: { label: string; to?: FooterRoute; href?: string }[] },
    { title: string; social: { label: string; href: string; icon: (p: React.SVGProps<SVGSVGElement>) => React.ReactElement }[] },
  ];
  copyright: string;
  langLabel: string;
};

const FOOTER_COPY: Record<Lang, FooterCopy> = {
  EN: {
    columns: [
      {
        title: "Products",
        links: [
          { label: "Men",             to: "/men" },
          { label: "Women",           to: "/women" },
          { label: "Kids & Teens",    to: "/kids" },
          { label: "Choose your lenses", to: "/lenses" },
          { label: "Shop on Amazon",  href: AMZ, external: true },
        ],
      },
      {
        title: "Learn",
        links: [
          { label: "Our Technology",  to: "/technology" },
          { label: "Honest Science™", to: "/technology", hash: "#honest-science" },
          { label: "About Eyegis",    to: "/about" },
          { label: "FAQ",             to: "/faq" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Contact",                 to: "/contact" },
          { label: "Shipping & Returns",      to: "/shipping" },
          { label: "Warranty & Comfort Guarantee", to: "/warranty" },
          { label: "Website Terms of Use",    to: "/legal" },
          { label: "Declaration of Compliance", to: "/compliance" },
          { label: "Privacy Policy",          to: "/privacy" },
        ],
      },
      {
        title: "Follow Eyegis",
        social: [
          { label: "Instagram", href: "https://www.instagram.com/", icon: Ic.Instagram },
          { label: "TikTok",    href: "https://www.tiktok.com/",    icon: Ic.TikTok },
          { label: "Facebook",  href: "https://www.facebook.com/",  icon: Ic.Facebook },
          { label: "YouTube",   href: "https://www.youtube.com/",   icon: Ic.YouTube },
        ],
      },
    ],
    copyright: "© 2026 Eyegis. All rights reserved.",
    langLabel: "Language",
  },
  PT: {
    columns: [
      {
        title: "Produtos",
        links: [
          { label: "Homem",           to: "/men" },
          { label: "Mulher",          to: "/women" },
          { label: "Kids & Teens",    to: "/kids" },
          { label: "Escolha suas lentes", to: "/lenses" },
          { label: "Comprar na Amazon", href: AMZ, external: true },
        ],
      },
      {
        title: "Aprenda",
        links: [
          { label: "Nossa Tecnologia", to: "/technology" },
          { label: "Honest Science™", to: "/technology", hash: "#honest-science" },
          { label: "Sobre a Eyegis",   to: "/about" },
          { label: "FAQ",              to: "/faq" },
        ],
      },
      {
        title: "Recursos",
        links: [
          { label: "Contato",                   to: "/contact" },
          { label: "Envio & Trocas",            to: "/shipping" },
          { label: "Garantia & Conforto",       to: "/warranty" },
          { label: "Termos de Uso",             to: "/legal" },
          { label: "Declaração de Conformidade", to: "/compliance" },
          { label: "Política de Privacidade",   to: "/privacy" },
        ],
      },
      {
        title: "Siga a Eyegis",
        social: [
          { label: "Instagram", href: "https://www.instagram.com/", icon: Ic.Instagram },
          { label: "TikTok",    href: "https://www.tiktok.com/",    icon: Ic.TikTok },
          { label: "Facebook",  href: "https://www.facebook.com/",  icon: Ic.Facebook },
          { label: "YouTube",   href: "https://www.youtube.com/",   icon: Ic.YouTube },
        ],
      },
    ],
    copyright: "© 2026 Eyegis. Todos os direitos reservados.",
    langLabel: "Idioma",
  },
  FR: {
    columns: [
      {
        title: "Produits",
        links: [
          { label: "Homme",           to: "/men" },
          { label: "Femme",           to: "/women" },
          { label: "Enfants & Ados",  to: "/kids" },
          { label: "Choisir ses verres", to: "/lenses" },
          { label: "Acheter sur Amazon", href: AMZ, external: true },
        ],
      },
      {
        title: "Comprendre",
        links: [
          { label: "Notre Technologie", to: "/technology" },
          { label: "Honest Science™",   to: "/technology", hash: "#honest-science" },
          { label: "À propos d'Eyegis", to: "/about" },
          { label: "FAQ",               to: "/faq" },
        ],
      },
      {
        title: "Ressources",
        links: [
          { label: "Contact",                     to: "/contact" },
          { label: "Livraison & Retours",         to: "/shipping" },
          { label: "Garantie & Confort",          to: "/warranty" },
          { label: "Mentions légales",            to: "/legal" },
          { label: "Déclaration de conformité",   to: "/compliance" },
          { label: "Politique de confidentialité", to: "/privacy" },
        ],
      },
      {
        title: "Suivre Eyegis",
        social: [
          { label: "Instagram", href: "https://www.instagram.com/", icon: Ic.Instagram },
          { label: "TikTok",    href: "https://www.tiktok.com/",    icon: Ic.TikTok },
          { label: "Facebook",  href: "https://www.facebook.com/",  icon: Ic.Facebook },
          { label: "YouTube",   href: "https://www.youtube.com/",   icon: Ic.YouTube },
        ],
      },
    ],
    copyright: "© 2026 Eyegis. Tous droits réservés.",
    langLabel: "Langue",
  },
};

function socialUrl(
  label: string,
  global: (typeof globalData)[keyof typeof globalData],
  fallback: string,
) {
  const urls: Record<string, string> = {
    Instagram: global.instagram_url,
    TikTok: global.tiktok_url,
    Facebook: global.facebook_url,
    YouTube: global.youtube_url,
  };
  return urls[label] || fallback;
}

export function Footer() {
  const { lang, setLang } = useI18n();
  const globalContent = useContentDocument<typeof globalData>("global", globalData);
  const global = globalContent[lang] ?? globalContent.EN;
  const params = useParams({ strict: false }) as { locale?: string };
  const locale = ((params.locale ?? "br").toLowerCase()) as LocaleSeg;
  const footerContent = useContentDocument<typeof FOOTER_COPY>("footer", FOOTER_COPY);
  const c = footerContent[lang];

  

  return (
    <>
      <TrustBar />

      <footer className="relative bg-ink text-paper">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(134,217,209,0.35), transparent)" }}
        />

        <div className="container-editorial py-16 md:py-20">
          {/* Top row — logo */}
          <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-center">
            <Link to="/$locale" params={{ locale }} aria-label="Eyegis home" className="text-paper">
              <Logo className="h-7 w-auto text-paper" />
            </Link>

            <div className="flex items-center gap-3 font-eyebrow text-[11px] text-white/60">
              <span className="small-caps">{c.langLabel}</span>
              {LOCALES.map((l, i) => (
                <div key={l} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden className="text-white/25">·</span>}
                  <Link
                    to="/$locale"
                    params={{ locale: l }}
                    onClick={() => setLang(l === "br" ? "PT" : (l.toUpperCase() as Lang))}
                    className={`uppercase transition-colors ${locale === l ? "text-white" : "text-white/60 hover:text-white"}`}
                    aria-current={locale === l ? "true" : undefined}
                  >
                    {l}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Brand pillar + 4 columns — brand takes 2/6 on desktop for stronger hierarchy */}
          <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 md:gap-10 lg:grid-cols-6">
            {/* Brand pillar */}
            <div className="sm:col-span-2 lg:col-span-2 lg:pr-10">
              <Logo className="h-8 w-auto text-paper" />
              <p className="mt-5 max-w-xs font-sans text-sm font-light leading-relaxed text-white/60">
                {global.footer_text}
              </p>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.32em] text-mint/80">
                Honest Science™ · λ 445nm
              </p>
            </div>

            {c.columns.map((col, idx) => (
              <div key={col.title} className="lg:col-span-1 min-w-0">
                <h4 className="small-caps text-[11px] text-mint">{col.title}</h4>

                {idx === 3 && "social" in col ? (
                  <ul className="mt-5 flex flex-wrap gap-3">
                    {col.social.map((s) => (
                      <li key={s.label}>
                        <a
                          href={socialUrl(s.label, global, s.href)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-mint hover:text-mint"
                        >
                          <s.icon className="h-4 w-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="mt-5 space-y-3">
                    {(col as { links: { label: string; to?: FooterRoute; href?: string; external?: boolean; hash?: string }[] }).links.map((link) => (
                      <li key={link.label}>
                        {link.href ? (
                          <a
                            href={link.href}
                            {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="font-sans text-sm font-light text-white/60 transition-colors hover:text-white"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            to={`/$locale${link.to!}`}
                            params={{ locale }}
                            hash={link.hash ? link.hash.replace(/^#/, "") : undefined}
                            className="font-sans text-sm font-light text-white/60 transition-colors hover:text-white"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-center gap-3 border-t border-white/10 pt-8 text-center md:flex-row md:justify-between md:text-left">
            <p className="font-sans text-xs font-light text-white/70">{c.copyright}</p>
            <p className="font-sans text-[11px] font-light text-white/70">
              EyegisGuard™ · E-Guard Retina™ · E-Guard Circadian™
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
