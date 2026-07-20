import { createFileRoute } from "@tanstack/react-router";
import { Picture } from "@/components/eyegis/Picture";
import { Header } from "@/components/eyegis/Header";
import { Footer } from "@/components/eyegis/Footer";
import { DEFAULT_AMAZON_URL } from "@/lib/amazon";

import heroImg from "@/assets/products/solene-front.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import macroImg from "@/assets/products/solene-macro.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import packageImg from "@/assets/products/solene-package.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import pouchImg from "@/assets/products/solene-pouch.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import lifestyleImg from "@/assets/collection-women.jpg?w=768;1200;1600;2000&format=avif;webp;jpg&as=picture";

const SITE = "https://eye-charm-guardian.lovable.app";

export const Route = createFileRoute("/product/solene")({
  head: () => ({
    meta: [
      { title: "Solène — Eyegis" },
      {
        name: "description",
        content:
          "Solène by Eyegis — cat-eye acetate frame in warm tortoise with EyegisGuard™ blue-light filtering. Softened geometry, everyday elegance for long screen hours.",
      },
      { property: "og:title", content: "Solène — Eyegis" },
      {
        property: "og:description",
        content:
          "Cat-eye acetate blue-light glasses. Warm tortoise, gold hinge, EyegisGuard™ optical filter. 2-year warranty, 60-day comfort guarantee.",
      },
      { property: "og:type", content: "product" },
      { property: "og:image", content: `${SITE}/og-meridian.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/product/solene` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Solène by Eyegis",
          brand: { "@type": "Brand", name: "Eyegis" },
          description:
            "Cat-eye acetate blue-light glasses with EyegisGuard™ optical filter (400–455 nm HEV). Warm tortoise finish, gold hinge, feather-light on face.",
          image: [`${SITE}/og-meridian.jpg`],
          sku: "EYG-SOL-01",
          category: "Eyewear > Blue Light Glasses",
          offers: {
            "@type": "Offer",
            url: DEFAULT_AMAZON_URL,
            availability: "https://schema.org/PreOrder",
            priceCurrency: "USD",
            price: "89.00",
            seller: { "@type": "Organization", name: "Eyegis" },
          },
        }),
      },
    ],
  }),
  component: SoleneProduct,
});

const SPECS: { k: string; v: string }[] = [
  { k: "Frame Material", v: "Italian acetate — warm tortoise" },
  { k: "Lens Type", v: "EyegisGuard™ optical grade" },
  { k: "Weight", v: "19.4 g" },
  { k: "Protection", v: "Filters 400–455 nm HEV blue light" },
  { k: "Coating", v: "Anti-reflective · Anti-scratch · Oleophobic" },
  { k: "Hinge", v: "Gold-tone precision spring hinge" },
  { k: "Warranty", v: "2-year international" },
  { k: "Comfort Guarantee", v: "60 days, no questions" },
];

const FEATURES = [
  { title: "Cat-eye, softened", body: "Warm tortoise acetate cut in a rounded cat-eye — feminine but never loud." },
  { title: "Screen-honest color", body: "EyegisGuard™ filters the harmful HEV band without an amber tint or color shift." },
  { title: "All-day balance", body: "19.4g on the face with gold-tone spring hinges tuned for a soft, secure fit." },
];

function SoleneProduct() {
  return (
    <main className="bg-[#F9F6F1] text-[#1D252D]">
      <Header variant="compact" />



      {/* Hero */}
      <section className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 px-6 py-16 md:py-24 items-center">
        <div className="order-2 md:order-1">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#004B57]">
            Chapter II · Solène
          </p>
          <h1 className="mt-4 font-editorial text-4xl md:text-6xl leading-[0.95] tracking-tight">
            Softened geometry,
            <br />
            <span className="italic text-[#004B57]">golden-hour every day.</span>
          </h1>
          <p className="mt-6 max-w-md text-base md:text-lg leading-relaxed text-black/70">
            A cat-eye acetate frame drawn from Parisian afternoons — designed for
            women who spend the day between screens and softer light.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={DEFAULT_AMAZON_URL}
              className="inline-flex items-center gap-3 rounded-full bg-[#004B57] px-6 py-3 text-white transition hover:-translate-y-0.5 hover:bg-[#003942]"
            >
              <span className="font-eyebrow text-xs tracking-[0.2em]">Coming soon on Amazon</span>
              <span aria-hidden>→</span>
            </a>
            <span className="inline-flex items-center gap-2 text-xs text-black/60">
              <span
                aria-hidden
                className="inline-grid h-4 w-4 place-items-center rounded-full text-[10px] font-bold"
                style={{ backgroundColor: "#86D9D1", color: "#004B57" }}
              >
                ✓
              </span>
              Independent lab tested
            </span>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {["EyegisGuard™", "Cat-eye acetate", "Gold hinge", "2-yr warranty", "60-day comfort"].map((b) => (
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
            alt="Solène cat-eye acetate frame in warm tortoise — front view"
            sizes="(min-width:768px) 48vw, 92vw"
            className="w-full aspect-[4/5] object-cover object-center rounded-lg bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]"
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

      {/* Lens macro */}
      <section className="bg-[#EFE7DA]">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 px-6 py-16 md:py-24 items-center">
          <Picture
            source={macroImg}
            alt="Solène lens macro — anti-reflective coating in warm light"
            sizes="(min-width:768px) 48vw, 92vw"
            className="w-full aspect-[4/3] object-cover object-center rounded-lg"
          />
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#004B57]">
              The lens
            </p>
            <h2 className="mt-4 font-editorial text-3xl md:text-5xl leading-[1] tracking-tight">
              EyegisGuard™
              <br />
              <span className="italic text-[#004B57]">optical filter.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-black/70">
              A precisely tuned coating that attenuates the 400–455 nm band of
              high-energy visible light — without shifting natural colors. No
              amber tint. No compromise.
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
              Solène, carefully packed.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <figure className="overflow-hidden rounded-lg bg-white border border-black/10">
            <Picture
              source={packageImg}
              alt="Solène packaging — recycled paperboard box with debossed logo"
              sizes="(min-width:768px) 48vw, 92vw"
              className="w-full aspect-[4/3] object-center object-cover"
            />
            <figcaption className="px-4 py-3 text-xs text-black/60">
              Recyclable paperboard box · debossed Eyegis mark
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-lg bg-white border border-black/10">
            <Picture
              source={pouchImg}
              alt="Solène soft microfibre pouch"
              sizes="(min-width:768px) 48vw, 92vw"
              className="w-full aspect-[4/3] object-center object-cover"
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
          alt="Woman wearing Solène — Parisian afternoon"
          sizes="100vw"
          className="w-full aspect-[16/9] md:aspect-[21/9] object-center object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-6xl px-6 pb-10 md:pb-16 text-white">
            <p className="text-[11px] uppercase tracking-[0.25em] opacity-80">
              Where Solène belongs
            </p>
            <h2 className="mt-3 font-editorial text-3xl md:text-5xl max-w-xl leading-tight">
              Long meetings, quiet afternoons, golden light.
            </h2>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#004B57] text-white">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] opacity-70">
            Solène · by Eyegis
          </p>
          <h2 className="mt-4 font-editorial text-4xl md:text-6xl leading-[0.95]">
            Ready to see the day
            <br />
            <span className="italic text-[#86D9D1]">a little softer?</span>
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
      <Footer />
    </main>
  );
}
