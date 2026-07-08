import { useEffect, useRef, useState } from "react";

/* Product images — official Eyegis photography */
import soleneFront from "@/assets/products/solene-front.jpg";
import soleneMacro from "@/assets/products/solene-macro.jpg";
import solenePouch from "@/assets/products/solene-pouch.jpg";
import solenePackage from "@/assets/products/solene-package.jpg";

import maraisFront from "@/assets/products/marais-front.jpg";
import maraisPackage from "@/assets/products/marais-package.jpg";
import maraisPouch from "@/assets/products/marais-pouch.jpg";

import meridianHero from "@/assets/products/meridian-hero.jpg";
import meridianPackage from "@/assets/products/meridian-package.jpg";
import meridianPouch from "@/assets/products/meridian-pouch.jpg";
import meridianPair from "@/assets/products/meridian-pair.jpg";

import atelierFront from "@/assets/products/atelier-front.jpg";
import atelierProfile from "@/assets/products/atelier-profile.jpg";
import atelierPouch from "@/assets/products/atelier-pouch.jpg";
import atelierPackage from "@/assets/products/atelier-package.jpg";

/* ------------------------------------------------------------------
   Reveal on scroll
   ------------------------------------------------------------------ */
function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   Icons
   ------------------------------------------------------------------ */
function AmazonIcon() {
  // minimal outline "a↗" smile mark — official-feeling but line-only
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 15c4 3.4 12 3.4 16 0"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M17.5 13.2c.6.9.5 2.2-.3 3.1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M9 11.5V8.6c0-1.4 1.1-2.4 2.6-2.4 1.4 0 2.4.9 2.6 2v4.3c0 .6.3 1 .8 1.4M9 11.5c0 1.2.9 2 2 2 1.6 0 2.6-1 2.6-2.5v-.5c-1 0-2 .1-2.9.4-1 .3-1.7.9-1.7 1.6z"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

function CheckThin() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5l3.2 3L13 4.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function GuardMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l8 3v6c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V6l8-3z"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Product card — editorial luxury
   ------------------------------------------------------------------ */
type Product = {
  slug: string;
  index: string;
  name: string;
  subtitle: string;
  description: string;
  lens: string;
  material: string;
  gallery: { src: string; alt: string; label: string }[];
  amazonUrl: string;
};

function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const [active, setActive] = useState(0);
  const { ref, visible } = useReveal<HTMLElement>(0.12);
  const img = product.gallery[active];

  return (
    <article
      ref={ref as any}
      className={`reveal ${visible ? "reveal-in" : ""} group grid grid-cols-12 gap-8 lg:gap-14 items-start`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Gallery */}
      <div className="col-span-12 lg:col-span-7">
        {/* Hero image */}
        <div className="relative overflow-hidden rounded-[6px] aspect-[5/4] bg-[var(--paper-warm)]">
          {product.gallery.map((g, i) => (
            <img
              key={g.src}
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                i === active ? "opacity-100" : "opacity-0"
              } group-hover:scale-[1.03]`}
            />
          ))}
          {/* Corner index */}
          <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-3 text-ink/60">
            <span className="font-eyebrow text-[10px]">{product.index}</span>
            <span className="h-px w-8 bg-ink/30" />
          </div>
          {/* Frame caption */}
          <div className="pointer-events-none absolute right-5 bottom-5 font-eyebrow text-[10px] text-ink/55">
            {img.label}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="mt-4 grid grid-cols-4 gap-3">
          {product.gallery.map((g, i) => (
            <button
              key={g.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View ${g.label}`}
              aria-pressed={i === active}
              className={`group/thumb relative aspect-square overflow-hidden rounded-[4px] bg-[var(--paper-warm)] transition-[border-color] duration-500 border ${
                i === active ? "border-ink/50" : "border-transparent hover:border-ink/20"
              }`}
            >
              <img
                src={g.src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover/thumb:scale-[1.06]"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="col-span-12 lg:col-span-5 lg:pt-2">
        <div className="flex items-center gap-3">
          <span className="font-eyebrow text-ink/50">{product.subtitle}</span>
          <span className="h-px w-8 bg-ink/25" />
        </div>

        <h3 className="mt-6 font-editorial text-ink text-[46px] md:text-[56px] leading-[0.98] tracking-[-0.02em]">
          {product.name}
        </h3>

        <p className="mt-6 text-[15px] leading-[1.75] text-ink/70 max-w-[42ch]">
          {product.description}
        </p>

        {/* Specs */}
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4">
          <div className="border-t border-ink/15 pt-3">
            <dt className="font-eyebrow text-ink/50 text-[10px]">Lens</dt>
            <dd className="mt-1 text-[14px] text-ink">{product.lens}</dd>
          </div>
          <div className="border-t border-ink/15 pt-3">
            <dt className="font-eyebrow text-ink/50 text-[10px]">Frame</dt>
            <dd className="mt-1 text-[14px] text-ink">{product.material}</dd>
          </div>
        </dl>

        {/* Assurances */}
        <ul className="mt-8 flex flex-wrap gap-2">
          <li className="inline-flex items-center gap-2 rounded-full border border-teal/25 bg-teal/[0.04] px-3 py-1.5 text-teal">
            <GuardMark />
            <span className="font-eyebrow text-[10px]">EyegisGuard™</span>
          </li>
          {[
            "Blue-Light Filtering",
            "2-Year Warranty",
            "60-Day Comfort Guarantee",
          ].map((b) => (
            <li
              key={b}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-1.5 text-ink/75"
            >
              <CheckThin />
              <span className="font-eyebrow text-[10px]">{b}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-[12.5px] leading-[1.7] text-ink/55 max-w-[42ch]">
          Available through Amazon with fast shipping and trusted customer
          service.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-lift group/cta inline-flex items-center justify-between gap-5 rounded-full bg-teal px-7 py-4 text-paper shadow-[0_18px_40px_-20px_rgba(0,75,87,0.55)] hover:bg-teal-deep hover:-translate-y-0.5 hover:shadow-[0_26px_50px_-20px_rgba(0,56,66,0.75)]"
          >
            <span className="inline-flex items-center gap-3">
              <AmazonIcon />
              <span className="font-eyebrow">Buy on Amazon</span>
            </span>
            <span
              aria-hidden="true"
              className="grid h-7 w-7 place-items-center rounded-full bg-paper/10 transition-transform duration-500 group-hover/cta:translate-x-1"
            >
              ↗
            </span>
          </a>

          <a
            href={`/collection/${product.slug}`}
            className="group/cta2 inline-flex items-center justify-between gap-5 rounded-full border border-ink/25 px-7 py-4 text-ink hover:border-ink transition-colors"
          >
            <span className="font-eyebrow">Learn More</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-500 group-hover/cta2:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------
   Section
   ------------------------------------------------------------------ */
export function Collection() {
  const products: Product[] = [
    {
      slug: "solene",
      index: "N°01",
      subtitle: "Women · Cat-Eye",
      name: "Solène",
      description:
        "A soft-line cat-eye cut from Italian tortoise acetate. Designed in Paris, engineered around the EyegisGuard™ selective filter.",
      lens: "EyegisGuard™ Neutral",
      material: "Italian acetate",
      gallery: [
        {
          src: soleneFront,
          alt: "Eyegis Solène tortoise cat-eye premium blue-light filtering eyewear, front view",
          label: "Front · N°01",
        },
        {
          src: soleneMacro,
          alt: "Eyegis Solène close-up showing selective blue-light filtering lens",
          label: "Lens · macro",
        },
        {
          src: solenePouch,
          alt: "Eyegis Solène tortoise cat-eye on the signature Eyegis pouch and peach box",
          label: "Studio · N°02",
        },
        {
          src: solenePackage,
          alt: "Eyegis Solène cat-eye eyewear with Paris–São Paulo peach packaging",
          label: "Package",
        },
      ],
      amazonUrl: "https://www.amazon.com/s?k=eyegis+solene",
    },
    {
      slug: "marais",
      index: "N°02",
      subtitle: "Women · Cat-Eye Noir",
      name: "Marais",
      description:
        "Sharpened cat-eye in matte black acetate — a Parisian silhouette for long screen days without a change of register.",
      lens: "EyegisGuard™ Neutral",
      material: "Italian acetate",
      gallery: [
        {
          src: maraisFront,
          alt: "Eyegis Marais black cat-eye premium blue-light filtering eyewear, front view",
          label: "Front · N°01",
        },
        {
          src: maraisPackage,
          alt: "Eyegis Marais black cat-eye eyewear with Paris–São Paulo peach packaging",
          label: "Package",
        },
        {
          src: maraisPouch,
          alt: "Eyegis Marais black cat-eye on branded pouch and peach box",
          label: "Studio",
        },
      ],
      amazonUrl: "https://www.amazon.com/s?k=eyegis+marais",
    },
    {
      slug: "meridian",
      index: "N°03",
      subtitle: "Unisex · Rectangular",
      name: "Meridian",
      description:
        "A quiet rectangular frame with brushed-gold temples. Balanced, symmetrical, engineered for full-day wear at the desk and beyond.",
      lens: "EyegisGuard™ Neutral",
      material: "Acetate · titanium temples",
      gallery: [
        {
          src: meridianHero,
          alt: "Eyegis Meridian black rectangular frame with gold titanium temples, 3/4 view",
          label: "Hero · N°01",
        },
        {
          src: meridianPackage,
          alt: "Eyegis Meridian frame with signature peach Paris–São Paulo packaging",
          label: "Package",
        },
        {
          src: meridianPouch,
          alt: "Eyegis Meridian rectangular frame on branded microfibre pouch",
          label: "Studio",
        },
        {
          src: meridianPair,
          alt: "Two Eyegis Meridian frames in profile, showing temple geometry",
          label: "Profile · pair",
        },
      ],
      amazonUrl: "https://www.amazon.com/s?k=eyegis+meridian",
    },
    {
      slug: "atelier",
      index: "N°04",
      subtitle: "Unisex · Square",
      name: "Atelier",
      description:
        "A softened square in matte black — the São Paulo studio's most understated frame. Minimum weight, maximum optical calm.",
      lens: "EyegisGuard™ Neutral",
      material: "Italian acetate",
      gallery: [
        {
          src: atelierFront,
          alt: "Eyegis Atelier soft-square black frame, 3/4 view",
          label: "Front · N°01",
        },
        {
          src: atelierProfile,
          alt: "Eyegis Atelier frame in profile view showing acetate temple geometry",
          label: "Profile",
        },
        {
          src: atelierPouch,
          alt: "Eyegis Atelier frame on Eyegis-branded microfibre pouch and peach box",
          label: "Studio",
        },
        {
          src: atelierPackage,
          alt: "Eyegis Atelier frame with Paris–São Paulo peach packaging",
          label: "Package",
        },
      ],
      amazonUrl: "https://www.amazon.com/s?k=eyegis+atelier",
    },
  ];

  return (
    <section
      id="collection"
      aria-labelledby="collection-title"
      className="relative bg-[var(--paper)] text-ink"
    >
      {/* ============ Title band ============ */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 pt-32 md:pt-40 lg:pt-48">
        <Reveal className="flex items-center gap-4">
          <span className="h-px w-10 bg-ink/30" />
          <span className="font-eyebrow text-ink/60">Chapter V · The Collection</span>
        </Reveal>

        <div className="mt-14 grid grid-cols-12 gap-10 lg:gap-16 items-end">
          <Reveal delay={100} className="col-span-12 lg:col-span-8">
            <h2
              id="collection-title"
              className="font-editorial text-ink text-balance-tight leading-[0.92] tracking-[-0.02em] text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[120px]"
            >
              Four frames.
              <br />
              <span className="italic text-teal">One studio.</span>
            </h2>
          </Reveal>

          <Reveal delay={220} className="col-span-12 lg:col-span-4">
            <p className="text-[15px] md:text-[16px] leading-[1.75] text-ink/70 max-w-md">
              Every Eyegis frame is drawn between our Paris and São Paulo
              ateliers, then finished with the EyegisGuard™ selective
              blue-light filter. Purchase is completed on Amazon — the brand
              experience lives here.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ============ Products — long-form editorial rhythm ============ */}
      <div className="mx-auto mt-24 md:mt-32 max-w-[1600px] px-6 md:px-10 lg:px-14 pb-32 md:pb-40 space-y-32 md:space-y-44">
        {products.map((p, i) => (
          <ProductCard key={p.slug} product={p} delay={i === 0 ? 0 : 40} />
        ))}
      </div>

      {/* ============ Amazon assurance strip ============ */}
      <div className="bg-[var(--paper-warm)]">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 py-20 md:py-24 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              t: "Sold on Amazon",
              d: "Every Eyegis frame ships from Amazon with fast, trusted delivery worldwide.",
            },
            {
              t: "2-Year Warranty",
              d: "Optical defects, hinge failures and lens delamination — covered end-to-end.",
            },
            {
              t: "60-Day Comfort Guarantee",
              d: "If the frame doesn't feel weightless within sixty days, return it — no questions.",
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 100}>
              <div className="border-t border-ink/15 pt-6">
                <div className="font-eyebrow text-ink/50 text-[10px]">
                  Care · N°0{i + 1}
                </div>
                <div className="mt-3 font-editorial text-ink text-2xl tracking-[-0.01em]">
                  {c.t}
                </div>
                <p className="mt-3 text-[14px] leading-[1.7] text-ink/70 max-w-xs">
                  {c.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Collection;
