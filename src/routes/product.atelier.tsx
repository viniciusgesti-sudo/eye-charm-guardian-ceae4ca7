import { createFileRoute, Link } from "@tanstack/react-router";
import { Picture } from "@/components/eyegis/Picture";
import { DEFAULT_AMAZON_URL, AMAZON_RATING } from "@/lib/amazon";

import heroImg from "@/assets/products/atelier-front.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import profileImg from "@/assets/products/atelier-profile.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import packageImg from "@/assets/products/atelier-package.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import pouchImg from "@/assets/products/atelier-pouch.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import lifestyleImg from "@/assets/collection-men.jpg?w=768;1200;1600;2000&format=avif;webp;jpg&as=picture";

const SITE = "https://eye-charm-guardian.lovable.app";

export const Route = createFileRoute("/product/atelier")({
  head: () => ({
    meta: [
      { title: "Atelier — Eyegis" },
      {
        name: "description",
        content:
          "Atelier by Eyegis — a quieter men's silhouette with studied proportion, thin temples, and EyegisGuard™ blue-light filtering. Weightless on the bridge.",
      },
      { property: "og:title", content: "Atelier — Eyegis" },
      {
        property: "og:description",
        content:
          "Refined men's acetate blue-light glasses. Studied proportion, honest hinges, EyegisGuard™ optical filter. 2-year warranty, 60-day comfort guarantee.",
      },
      { property: "og:type", content: "product" },
      { property: "og:image", content: `${SITE}/og-meridian.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/product/atelier` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Atelier by Eyegis",
          brand: { "@type": "Brand", name: "Eyegis" },
          description:
            "A quieter men's acetate frame with EyegisGuard™ optical filter (400–455 nm HEV). Thin temples, honest hinges, studied proportion.",
          image: [`${SITE}/og-meridian.jpg`],
          sku: "EYG-ATL-01",
          category: "Eyewear > Blue Light Glasses",
          offers: {
            "@type": "Offer",
            url: DEFAULT_AMAZON_URL,
            availability: "https://schema.org/InStock",
            priceCurrency: "USD",
            price: "89.00",
            seller: { "@type": "Organization", name: "Amazon" },
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: AMAZON_RATING.stars,
            reviewCount: AMAZON_RATING.count,
          },
        }),
      },
    ],
  }),
  component: AtelierProduct,
});

const SPECS: { k: string; v: string }[] = [
  { k: "Frame Material", v: "Italian acetate — matte graphite" },
  { k: "Lens Type", v: "EyegisGuard™ optical grade" },
  { k: "Weight", v: "17.8 g" },
  { k: "Protection", v: "Filters 400–455 nm HEV blue light" },
  { k: "Coating", v: "Anti-reflective · Anti-scratch · Oleophobic" },
  { k: "Temples", v: "Thin profile · titanium-core hinges" },
  { k: "Warranty", v: "2-year international" },
  { k: "Comfort Guarantee", v: "60 days, no questions" },
];

const FEATURES = [
  { title: "Considered proportion", body: "A quieter silhouette — narrower, lower, drawn to disappear rather than announce." },
  { title: "Screen-honest color", body: "EyegisGuard™ filters the harmful HEV band without an amber tint or color shift." },
  { title: "Weightless on the bridge", body: "17.8g of hand-polished acetate with titanium-core hinges tuned for zero pressure." },
];

function AtelierProduct() {
  return (
    <main className="bg-[#F9F6F1] text-[#1D252D]">
      {/* Top nav */}
      <div className="border-b border-black/10 bg-white/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            hash="preview"
            className="font-eyebrow text-xs tracking-[0.2em] text-[#004B57] hover:opacity-70"
          >
            ← All Collections
          </Link>
          <a
            href={DEFAULT_AMAZON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#004B57] px-5 py-2 text-xs uppercase tracking-[0.15em] text-white hover:bg-[#003942]"
          >
            Buy on Amazon
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 px-6 py-16 md:py-24 items-center">
        <div className="order-2 md:order-1">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#004B57]">
            Chapter IV · Atelier
          </p>
          <h1 className="mt-4 font-editorial text-4xl md:text-6xl leading-[0.95] tracking-tight">
            A quieter
            <br />
            <span className="italic text-[#004B57]">silhouette.</span>
          </h1>
          <p className="mt-6 max-w-md text-base md:text-lg leading-relaxed text-black/70">
            Drawn in São Paulo studios — a men's frame designed to be forgotten
            on the face and remembered by the eyes.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={DEFAULT_AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-[#004B57] px-6 py-3 text-white transition hover:-translate-y-0.5 hover:bg-[#003942]"
            >
              <span className="font-eyebrow text-xs tracking-[0.2em]">Buy on Amazon</span>
              <span aria-hidden>→</span>
            </a>
            <span className="text-xs text-black/60">
              ★ {AMAZON_RATING.stars} · {AMAZON_RATING.count.toLocaleString()} reviews
            </span>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {["EyegisGuard™", "Matte acetate", "Thin temples", "2-yr warranty", "60-day comfort"].map((b) => (
              <li
                key={b}
                className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-black/70"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 md:order-2">
          <Picture
            source={heroImg}
            alt="Atelier acetate frame in matte graphite — front view"
            sizes="(min-width:768px) 48vw, 92vw"
            className="w-full aspect-[4/5] object-cover rounded-lg bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]"
          />
        </div>
      </section>

      {/* Why you'll love it */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES.map((f, i) => (
          <article
            key={f.title}
            className="rounded-lg border border-black/10 bg-white p-6"
          >
            <span className="font-eyebrow text-[10px] tracking-[0.2em] text-[#004B57]">
              0{i + 1}
            </span>
            <h3 className="mt-3 font-editorial text-2xl">{f.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-black/70">{f.body}</p>
          </article>
        ))}
      </section>

      {/* Profile study */}
      <section className="bg-[#EFE7DA]">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 px-6 py-16 md:py-24 items-center">
          <Picture
            source={profileImg}
            alt="Atelier — studied side profile, thin temple detail"
            sizes="(min-width:768px) 48vw, 92vw"
            className="w-full aspect-[4/3] object-cover rounded-lg"
          />
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#004B57]">
              The profile
            </p>
            <h2 className="mt-4 font-editorial text-3xl md:text-5xl leading-[1] tracking-tight">
              Thin temples,
              <br />
              <span className="italic text-[#004B57]">honest hinges.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-black/70">
              Every line is functional. Titanium-core hinges disappear into the
              acetate. No ornament, no logo screaming across the temple — just
              a quiet, considered profile.
            </p>
          </div>
        </div>
      </section>

      {/* In the box — package + pouch */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#004B57]">
              In the box
            </p>
            <h2 className="mt-2 font-editorial text-3xl md:text-4xl">
              Atelier, carefully packed.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <figure className="overflow-hidden rounded-lg bg-white border border-black/10">
            <Picture
              source={packageImg}
              alt="Atelier packaging — recycled paperboard box with debossed logo"
              sizes="(min-width:768px) 48vw, 92vw"
              className="w-full aspect-[4/3] object-cover"
            />
            <figcaption className="px-4 py-3 text-xs text-black/60">
              Recyclable paperboard box · debossed Eyegis mark
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-lg bg-white border border-black/10">
            <Picture
              source={pouchImg}
              alt="Atelier soft microfibre pouch"
              sizes="(min-width:768px) 48vw, 92vw"
              className="w-full aspect-[4/3] object-cover"
            />
            <figcaption className="px-4 py-3 text-xs text-black/60">
              Microfibre pouch · doubles as a lens cloth
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Specs */}
      <section className="bg-white border-y border-black/10">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#004B57]">
            Specifications
          </p>
          <h2 className="mt-2 font-editorial text-3xl md:text-4xl mb-8">
            Every measurement, honest.
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            {SPECS.map((row) => (
              <div
                key={row.k}
                className="flex items-baseline justify-between border-b border-black/10 py-3 gap-4"
              >
                <dt className="font-eyebrow text-[11px] uppercase tracking-[0.15em] text-black/55">
                  {row.k}
                </dt>
                <dd className="text-sm text-right text-black/85">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Lifestyle */}
      <section className="relative">
        <Picture
          source={lifestyleImg}
          alt="Man wearing Atelier — studio light"
          sizes="100vw"
          className="w-full aspect-[16/9] md:aspect-[21/9] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-6xl px-6 pb-10 md:pb-16 text-white">
            <p className="text-[11px] uppercase tracking-[0.25em] opacity-80">
              Where Atelier belongs
            </p>
            <h2 className="mt-3 font-editorial text-3xl md:text-5xl max-w-xl leading-tight">
              Studios, long deep work, unhurried thinking.
            </h2>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#004B57] text-white">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] opacity-70">
            Atelier · by Eyegis
          </p>
          <h2 className="mt-4 font-editorial text-4xl md:text-6xl leading-[0.95]">
            Ready to design
            <br />
            <span className="italic text-[#86D9D1]">a quieter day?</span>
          </h2>
          <a
            href={DEFAULT_AMAZON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[#004B57] transition hover:-translate-y-0.5"
          >
            <span className="font-eyebrow text-xs tracking-[0.2em]">Buy on Amazon</span>
            <span aria-hidden>→</span>
          </a>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs opacity-80">
            <li>Secure purchase through Amazon</li>
            <li>Fast Prime shipping</li>
            <li>60-day comfort guarantee</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
