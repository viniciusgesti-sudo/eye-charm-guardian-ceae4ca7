import { createFileRoute } from "@tanstack/react-router";
import { Picture } from "@/components/eyegis/Picture";
import { Header } from "@/components/eyegis/Header";
import { Footer } from "@/components/eyegis/Footer";
import { DEFAULT_AMAZON_URL } from "@/lib/amazon";
import solenePage from "@/content/products/solene-page.json";
import { useContentDocument } from "@/lib/cms";

import heroImg from "@/assets/products/solene-front.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import macroImg from "@/assets/products/solene-macro-lens.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import packageImg from "@/assets/products/solene-package.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import pouchImg from "@/assets/products/solene-pouch.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import lifestyleImg from "@/assets/products/solene-macro-lens.jpg?w=768;1200;1600;2000&format=avif;webp;jpg&as=picture";

import { buildSeo, SITE } from "@/lib/seo";

const SOLENE_OG = `${SITE}/og-solene.jpg`;

export const Route = createFileRoute("/product/solene")({
  head: () => {
    const seo = buildSeo({
      title: "Women's Collection by Eyegis — Cat-Eye Blue-Light Glasses",
      description:
        "Women's Collection by Eyegis — cat-eye acetate frame in warm tortoise with EyegisGuard™ blue-light filtering. Softened geometry, everyday elegance for long screen hours.",
      path: "/product/solene",
      image: SOLENE_OG,
      ogType: "product",
    });
    return {
      ...seo,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Women's Collection by Eyegis",
            brand: { "@type": "Brand", name: "Eyegis" },
            description:
              "Cat-eye acetate blue-light glasses with EyegisGuard™ optical filter (400–455 nm HEV). Warm tortoise finish, gold hinge, feather-light on face.",
            image: [SOLENE_OG],
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
    };
  },
  component: SoleneProduct,
});

function SoleneProduct() {
  const content = useContentDocument<typeof solenePage>("products-solene-page", solenePage);
  return (
    <main className="bg-[#F9F6F1] text-[#1D252D]">
      <Header variant="compact" />



      {/* Hero */}
      <section className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 px-6 py-16 md:py-24 items-center">
        <div className="order-2 md:order-1">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#004B57]">
            {content.hero.chapter}
          </p>
          <h1 className="mt-4 font-editorial text-4xl md:text-6xl leading-[0.95] tracking-tight">
            {content.hero.title}
            <br />
            <span className="italic text-[#004B57]">{content.hero.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-md text-base md:text-lg leading-relaxed text-black/70">
            {content.hero.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={content.buyLink || DEFAULT_AMAZON_URL}
              className="inline-flex items-center gap-3 rounded-full bg-[#004B57] px-6 py-3 text-white transition hover:-translate-y-0.5 hover:bg-[#003942]"
             target="_blank" rel="noopener noreferrer">
              <span className="font-eyebrow text-xs tracking-[0.2em]">{content.hero.buyLabel}</span>
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
              {content.hero.labLabel}
            </span>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {content.hero.badges.map((b) => (
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
            alt="Women's Collection acetate frame with polished gold temple engraved “EYEGIS · LVR-T-CL” — front view"
            sizes="(min-width:768px) 48vw, 92vw"
            className="w-full aspect-[4/5] object-cover object-center rounded-lg bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]"
          />
        </div>
      </section>

      {/* Why you'll love it */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {content.features.map((f, i) => (
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
            alt="Women's Collection macro detail — gold temple engraving reading “EYEGIS · LVR-T-CL” with CE marking, anti-reflective lens coating in warm light"
            sizes="(min-width:768px) 48vw, 92vw"
            className="w-full aspect-[4/3] object-cover object-center rounded-lg"
          />
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#004B57]">
              {content.detail.eyebrow}
            </p>
            <h2 className="mt-4 font-editorial text-3xl md:text-5xl leading-[1] tracking-tight">
              {content.detail.title}
              <br />
              <span className="italic text-[#004B57]">{content.detail.titleAccent}</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-black/70">
              {content.detail.body}
            </p>
          </div>
        </div>
      </section>

      {/* In the box — package + pouch */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#004B57]">
              {content.box.eyebrow}
            </p>
            <h2 className="mt-2 font-editorial text-3xl md:text-4xl">
              {content.box.title}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <figure className="overflow-hidden rounded-lg bg-white border border-black/10">
            <Picture
              source={packageImg}
              alt="Women's Collection packaging — recycled paperboard box with debossed logo"
              sizes="(min-width:768px) 48vw, 92vw"
              className="w-full aspect-[4/3] object-center object-cover"
            />
            <figcaption className="px-4 py-3 text-xs text-black/60">
              {content.box.packageCaption}
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-lg bg-white border border-black/10">
            <Picture
              source={pouchImg}
              alt="Women's Collection soft microfibre pouch"
              sizes="(min-width:768px) 48vw, 92vw"
              className="w-full aspect-[4/3] object-center object-cover"
            />
            <figcaption className="px-4 py-3 text-xs text-black/60">
              {content.box.pouchCaption}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Specs */}
      <section className="bg-white border-y border-black/10">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#004B57]">
            {content.specifications.eyebrow}
          </p>
          <h2 className="mt-2 font-editorial text-3xl md:text-4xl mb-8">
            {content.specifications.title}
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            {content.specifications.rows.map((row) => (
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
          alt="Woman wearing Women's Collection — Parisian afternoon"
          sizes="100vw"
          className="w-full aspect-[16/9] md:aspect-[21/9] object-center object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-6xl px-6 pb-10 md:pb-16 text-white">
            <p className="text-[11px] uppercase tracking-[0.25em] opacity-80">
              {content.lifestyle.eyebrow}
            </p>
            <h2 className="mt-3 font-editorial text-3xl md:text-5xl max-w-xl leading-tight">
              {content.lifestyle.title}
            </h2>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#004B57] text-white">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] opacity-70">
            {content.cta.eyebrow}
          </p>
          <h2 className="mt-4 font-editorial text-4xl md:text-6xl leading-[0.95]">
            {content.cta.title}
            <br />
            <span className="italic text-[#86D9D1]">{content.cta.titleAccent}</span>
          </h2>
          <a
            href={content.buyLink || DEFAULT_AMAZON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[#004B57] transition hover:-translate-y-0.5"
          >
            <span className="font-eyebrow text-xs tracking-[0.2em]">{content.cta.buyLabel}</span>
            <span aria-hidden>→</span>
          </a>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs opacity-80">
            {content.cta.trust.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>
      <Footer />
    </main>
  );
}
