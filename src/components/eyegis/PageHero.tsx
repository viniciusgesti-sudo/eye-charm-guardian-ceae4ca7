import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";

import { AmazonMark } from "./AmazonMark";
import { Picture, type PictureSource } from "./Picture";

type Props = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  bgImage: string;
  bgSource?: PictureSource;
  tone?: "dark" | "light";
  align?: "center" | "left";
  accent?: "mint" | "champagne";
  cta?: {
    label: string;
    to: "/$locale/men" | "/$locale/women" | "/$locale/kids" | "/$locale/technology";
    locale: string;
  };
  externalCta?: { label: string; href: string };
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  bgImage,
  bgSource,
  tone = "dark",
  align = "center",
  accent = "mint",
  cta,
  externalCta,
}: Props) {
  const isDark = tone === "dark";
  const accentText = accent === "mint" ? "text-mint" : "text-champagne";
  const accentBar = accent === "mint" ? "bg-mint/70" : "bg-champagne/70";
  const accentGlow =
    accent === "mint"
      ? "shadow-[0_20px_50px_-20px_rgba(134,217,209,0.55)]"
      : "shadow-[0_20px_50px_-20px_rgba(226,209,195,0.6)]";
  const accentHoverBg = accent === "mint" ? "hover:bg-mint" : "hover:bg-champagne";

  return (
    <section
      aria-label={typeof title === "string" ? title : eyebrow}
      data-page-hero
      className={`relative isolate flex min-h-[62svh] w-full items-end overflow-hidden ${
        isDark ? "bg-ink text-paper" : "bg-paper text-ink"
      }`}

    >
      {bgSource ? (
        <Picture
          source={bgSource}
          alt=""
          aria-hidden="true"
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 h-full w-full object-cover motion-safe:animate-[kenburns-right_28s_ease-in-out_infinite_alternate]"
        />
      ) : (
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          width={2400}
          height={1600}
          loading="eager"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover motion-safe:animate-[kenburns-right_28s_ease-in-out_infinite_alternate]"
        />
      )}

      <div
        aria-hidden
        className={`absolute inset-0 -z-10 ${
          isDark
            ? "bg-[radial-gradient(120%_80%_at_30%_40%,rgba(0,75,87,0.22),transparent_62%),linear-gradient(180deg,rgba(10,15,20,0.15)_0%,rgba(10,15,20,0.72)_70%,rgba(10,15,20,0.95)_100%)]"
            : "bg-[radial-gradient(120%_80%_at_70%_40%,rgba(226,209,195,0.28),transparent_62%),linear-gradient(180deg,rgba(255,250,240,0.10)_0%,rgba(226,209,195,0.45)_65%,rgba(226,209,195,0.85)_100%)]"
        }`}
      />

      <div
        className={`relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-16 md:px-10 md:pt-40 md:pb-20 ${
          align === "center" ? "text-center" : "text-left"
        }`}
      >
        <div
          className={`flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.36em] ${
            isDark ? "text-paper/80" : "text-ink/70"
          } ${accentText} ${align === "center" ? "justify-center" : ""}`}
        >
          <span className={`inline-block h-px w-10 ${accentBar}`} />
          {eyebrow}
        </div>

        <h1 className="mt-4 font-editorial text-fluid-hero leading-[0.95] tracking-[-0.02em]">
          {title}
        </h1>

        {subtitle && (
          <p
            className={`mt-4 max-w-xl font-sans text-fluid-lead leading-snug ${
              isDark ? "text-paper/80" : "text-ink/75"
            } ${align === "center" ? "mx-auto" : ""}`}
          >
            {subtitle}
          </p>
        )}

        {(cta || externalCta) && (
          <div
            className={`mt-10 flex flex-wrap items-center gap-3 ${
              align === "center" ? "justify-center" : ""
            }`}
          >
            {cta && (
              <Link
                to={cta.to}
                params={{ locale: cta.locale }}
                className={`group inline-flex items-center gap-3 rounded-full bg-paper px-7 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-ink transition ${accentGlow} ${accentHoverBg}`}
              >
                {cta.label}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            )}
            {externalCta && (
              <a
                href={externalCta.href}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={`inline-flex items-center gap-3 rounded-full border px-7 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] transition ${
                  isDark
                    ? "border-paper/40 text-paper hover:bg-paper hover:text-ink"
                    : "border-ink/30 text-ink hover:bg-ink hover:text-paper"
                }`}
              >
                <AmazonMark className="h-5 w-5" />
                {externalCta.label}
                <span aria-hidden>→</span>
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
