import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  bgImage: string;
  tone?: "dark" | "light";
  align?: "center" | "left";
  cta?: { label: string; to: "/$locale/men" | "/$locale/women" | "/$locale/kids" | "/$locale/technology"; locale: string };
  externalCta?: { label: string; href: string };
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  bgImage,
  tone = "dark",
  align = "center",
  cta,
  externalCta,
}: Props) {
  const isDark = tone === "dark";
  return (
    <section
      className={`relative isolate flex min-h-[72vh] w-full items-end overflow-hidden ${
        isDark ? "bg-ink text-paper" : "bg-paper text-ink"
      }`}
    >
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        width={2400}
        height={1600}
        loading="eager"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 ${
          isDark
            ? "bg-[linear-gradient(180deg,rgba(10,15,20,0.15)_0%,rgba(10,15,20,0.55)_55%,rgba(10,15,20,0.92)_100%)]"
            : "bg-[linear-gradient(180deg,rgba(255,250,240,0.1)_0%,rgba(226,209,195,0.35)_60%,rgba(226,209,195,0.85)_100%)]"
        }`}
      />
      <div
        className={`relative z-10 mx-auto w-full max-w-6xl px-6 pt-40 pb-20 md:px-10 md:pt-52 md:pb-28 ${
          align === "center" ? "text-center" : "text-left"
        }`}
      >
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.32em] ${
            isDark ? "text-paper/70" : "text-teal-deep/70"
          }`}
        >
          {eyebrow}
        </span>
        <h1 className="mt-6 font-editorial text-fluid-hero leading-[0.9]">{title}</h1>
        {subtitle && (
          <p
            className={`mx-auto mt-6 max-w-2xl text-fluid-lead ${
              isDark ? "text-paper/80" : "text-ink/75"
            } ${align === "center" ? "mx-auto" : ""}`}
          >
            {subtitle}
          </p>
        )}
        {(cta || externalCta) && (
          <div className={`mt-10 flex flex-wrap gap-4 ${align === "center" ? "justify-center" : ""}`}>
            {cta && (
              <Link
                to={cta.to}
                params={{ locale: cta.locale }}
                className={`inline-flex items-center gap-4 rounded-full px-7 py-4 transition-all hover:-translate-y-0.5 ${
                  isDark
                    ? "bg-paper text-ink hover:bg-paper/90"
                    : "bg-teal-deep text-paper hover:bg-teal"
                }`}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
                  {cta.label}
                </span>
                <span aria-hidden>→</span>
              </Link>
            )}
            {externalCta && (
              <a
                href={externalCta.href}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={`inline-flex items-center gap-4 rounded-full border px-7 py-4 transition-all hover:-translate-y-0.5 ${
                  isDark
                    ? "border-paper/40 text-paper hover:bg-paper hover:text-ink"
                    : "border-ink/30 text-ink hover:bg-ink hover:text-paper"
                }`}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
                  {externalCta.label}
                </span>
                <span aria-hidden>→</span>
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
