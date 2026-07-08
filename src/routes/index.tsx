import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import heroSaoPaulo from "@/assets/hero-saopaulo.jpg";
import heroParis from "@/assets/hero-paris.jpg";
import productHero from "@/assets/product-hero.jpg";
import collectionMen from "@/assets/collection-men.jpg";
import collectionWomen from "@/assets/collection-women.jpg";
import collectionKids from "@/assets/collection-kids.jpg";
import lifestyleWork from "@/assets/lifestyle-work.jpg";
import lifestyleTravel from "@/assets/lifestyle-travel.jpg";
import lifestyleArch from "@/assets/lifestyle-architecture.jpg";
import techLens from "@/assets/tech-lens.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eyegis — Engineered for Vision. Designed for Style." },
      {
        name: "description",
        content:
          "Premium blue-light filtering eyewear for the digital generation. Visual comfort, timeless design and scientific transparency.",
      },
    ],
  }),
  component: Index,
});

/* ---------- Small utilities ---------- */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: keyof HTMLElementTagNameMap;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useReveal<HTMLElement>();
  const Comp = Tag as unknown as React.ElementType;
  return (
    <Comp ref={ref as never} className={`reveal ${className}`}>
      {children}
    </Comp>
  );
}

/* ---------- Header ---------- */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
        <a href="/" className="flex items-baseline gap-2">
          <span className="font-editorial text-2xl tracking-tight text-ink">Eyegis</span>
          <span className="font-eyebrow text-[9px] text-muted-foreground hidden sm:inline">
            ® Optical Science
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10 font-eyebrow text-ink/80">
          <a href="#collections" className="hover:text-ink transition-colors">Collections</a>
          <a href="#technology" className="hover:text-ink transition-colors">Technology</a>
          <a href="#science" className="hover:text-ink transition-colors">Science</a>
          <a href="#universe" className="hover:text-ink transition-colors">Universe</a>
          <a href="#assessment" className="hover:text-ink transition-colors">Eye Score</a>
        </nav>

        <div className="flex items-center gap-6">
          <button className="font-eyebrow text-ink/80 hover:text-ink transition-colors hidden sm:inline">
            Account
          </button>
          <button className="font-eyebrow text-ink hover:text-teal transition-colors">
            Bag <span className="text-muted-foreground">(0)</span>
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------- Sections ---------- */

function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background pt-20">
      <div className="grid min-h-[calc(100vh-5rem)] grid-cols-1 lg:grid-cols-2">
        {/* LEFT — São Paulo · Night · Deep Teal */}
        <div className="relative group overflow-hidden bg-teal-deep">
          <img
            src={heroSaoPaulo}
            alt="Eyegis campaign — São Paulo, night"
            width={1600}
            height={1920}
            className="absolute inset-0 h-full w-full object-cover img-hover group-hover:img-hover-in"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-teal-deep/40 via-transparent to-teal-deep/70" />
          <div className="relative z-10 flex h-full min-h-[70vh] flex-col justify-between p-8 md:p-14 lg:p-16 text-paper">
            <div className="flex items-center justify-between">
              <span className="font-eyebrow opacity-80">Chapter I</span>
              <span className="font-eyebrow opacity-80">São Paulo · 22:41</span>
            </div>
            <div className="max-w-lg">
              <h1 className="font-editorial text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.9] text-balance-tight">
                Engineered<br />
                <em className="not-italic opacity-90">for vision.</em>
              </h1>
              <p className="mt-8 max-w-sm text-base md:text-lg font-light text-paper/85">
                For the executive, the coder, the night-shift architect.
                Precision optics against the glow of the modern city.
              </p>
              <a
                href="#collections"
                className="mt-10 inline-flex items-center gap-3 font-eyebrow text-paper hover:text-mint transition-colors"
              >
                Discover Meridian <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT — Paris · Golden Hour · Sand */}
        <div className="relative group overflow-hidden bg-sand">
          <img
            src={heroParis}
            alt="Eyegis campaign — Paris, golden hour"
            width={1600}
            height={1920}
            className="absolute inset-0 h-full w-full object-cover img-hover group-hover:img-hover-in"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sand/20 via-transparent to-sand-warm/60" />
          <div className="relative z-10 flex h-full min-h-[70vh] flex-col justify-between p-8 md:p-14 lg:p-16 text-ink">
            <div className="flex items-center justify-between">
              <span className="font-eyebrow opacity-70">Chapter II</span>
              <span className="font-eyebrow opacity-70">Paris · 17:12</span>
            </div>
            <div className="max-w-lg">
              <h1 className="font-editorial text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.9] text-balance-tight">
                Designed<br />
                <em className="not-italic opacity-90">for style.</em>
              </h1>
              <p className="mt-8 max-w-sm text-base md:text-lg font-light text-ink/75">
                Frames drawn with the patience of a Parisian atelier.
                Worn from a morning meeting to the last light on the balcony.
              </p>
              <a
                href="#collections"
                className="mt-10 inline-flex items-center gap-3 font-eyebrow text-ink hover:text-teal transition-colors"
              >
                Discover Solène <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Center divider brand mark */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-paper shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]">
          <span className="font-editorial text-3xl text-teal">E</span>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Engineered for vision",
    "Designed for style",
    "EyegisGuard™ Optical Filter",
    "Honest Science™",
    "Made for the digital generation",
  ];
  const line = [...items, ...items, ...items];
  return (
    <div className="border-y border-border/60 bg-paper-warm overflow-hidden">
      <div className="flex whitespace-nowrap marquee py-6">
        {line.map((t, i) => (
          <span key={i} className="mx-10 font-editorial text-3xl md:text-4xl text-ink/70 italic">
            {t}
            <span className="mx-10 text-teal/40">◦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Difference() {
  const features = [
    {
      no: "01",
      title: "EyegisGuard™",
      body: "Proprietary lens coating engineered to attenuate the 400–450 nm spectrum without altering colour perception.",
    },
    {
      no: "02",
      title: "Comfort & Style",
      body: "Italian acetate hand-polished across seven stages. Featherweight titanium hinges tuned for eight hours of continuous wear.",
    },
    {
      no: "03",
      title: "Focus & Performance",
      body: "Clinically observed reduction of digital eye strain across screen-intensive professions. Longer sessions, quieter eyes.",
    },
  ];
  return (
    <section className="bg-background px-6 py-32 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="grid grid-cols-1 items-end gap-12 border-b border-border/60 pb-16 lg:grid-cols-12">
            <div className="lg:col-span-1 font-eyebrow text-muted-foreground">— Difference</div>
            <h2 className="lg:col-span-8 font-editorial text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-balance-tight">
              A quiet obsession with what happens
              <em className="text-teal"> between the screen and the eye.</em>
            </h2>
            <p className="lg:col-span-3 font-light text-muted-foreground">
              Three principles inform every Eyegis frame. Optical rigour,
              considered materials, and a design language that outlives seasons.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-8">
          {features.map((f) => (
            <Reveal key={f.no}>
              <div className="flex flex-col">
                <span className="font-eyebrow text-teal">{f.no}</span>
                <h3 className="mt-8 font-editorial text-4xl md:text-5xl leading-none">
                  {f.title}
                </h3>
                <div className="hairline mt-8 pt-6" />
                <p className="text-ink/70 font-light leading-relaxed max-w-sm">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Collections() {
  const items = [
    { name: "For Him", tagline: "Meridian Series", img: collectionMen, tone: "sand" as const },
    { name: "For Her", tagline: "Solène Series", img: collectionWomen, tone: "teal" as const },
    { name: "Youth", tagline: "Kids & Teens", img: collectionKids, tone: "warm" as const },
  ];
  return (
    <section id="collections" className="bg-paper-warm px-6 py-32 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-eyebrow text-teal">— The Collections</p>
              <h2 className="mt-6 font-editorial text-5xl md:text-7xl leading-[0.95] max-w-3xl">
                Three universes.<br />
                <em className="text-teal">One optical philosophy.</em>
              </h2>
            </div>
            <a href="#" className="font-eyebrow text-ink hover:text-teal transition-colors">
              View all frames →
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4">
          {items.map((it, i) => (
            <Reveal key={it.name}>
              <a
                href="#"
                className={`group block ${i === 1 ? "md:translate-y-16" : ""}`}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                  <img
                    src={it.img}
                    alt={`${it.name} — ${it.tagline}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover img-hover group-hover:img-hover-in"
                  />
                </div>
                <div className="mt-6 flex items-baseline justify-between">
                  <div>
                    <p className="font-eyebrow text-muted-foreground">{it.tagline}</p>
                    <h3 className="mt-2 font-editorial text-3xl md:text-4xl">{it.name}</h3>
                  </div>
                  <span className="font-eyebrow text-ink group-hover:text-teal transition-colors">
                    Explore →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Universe() {
  return (
    <section id="universe" className="bg-teal-deep text-paper px-6 py-32 md:px-12 md:py-48 overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="font-eyebrow text-mint">— Eyegis Universe</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <h2 className="font-editorial text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-balance-tight">
              We do not make blue-light glasses.
              <em className="block mt-2 text-mint">We compose visual comfort.</em>
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-4 lg:pt-8">
            <p className="font-light text-lg text-paper/80 leading-relaxed">
              Eyegis was founded on a stubborn belief: that eyewear conceived
              for a screen-driven century deserves the craftsmanship, the
              honesty and the beauty of the finest optical houses.
            </p>
            <p className="mt-6 font-light text-paper/80 leading-relaxed">
              Every frame is an act of composure — between engineering and
              elegance, between science and softness.
            </p>
          </Reveal>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-10 md:grid-cols-4 border-t border-paper/15 pt-12">
          {[
            ["Mission", "Protect the vision of a screen-native generation."],
            ["Vision", "Elevate eyewear to the language of luxury."],
            ["Technology", "EyegisGuard™ — optical filtration without compromise."],
            ["Craft", "Italian acetate. Japanese hinges. Portuguese assembly."],
          ].map(([t, d]) => (
            <div key={t}>
              <p className="font-eyebrow text-mint">{t}</p>
              <p className="mt-4 font-light text-paper/80 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HonestScience() {
  return (
    <section id="science" className="bg-background px-6 py-32 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <Reveal className="lg:col-span-5 lg:sticky lg:top-32">
          <p className="font-eyebrow text-teal">— Honest Science™</p>
          <h2 className="mt-8 font-editorial text-5xl md:text-6xl leading-[0.95]">
            No miracle claims.<br />
            <em className="text-teal">Just measured light.</em>
          </h2>
          <p className="mt-8 font-light text-lg text-ink/70 leading-relaxed max-w-md">
            The optical industry has, for too long, sold promises it could
            not measure. Eyegis publishes its methodology, its filtration
            curves and its independent laboratory reports — because a
            premium object owes its wearer the truth.
          </p>
        </Reveal>

        <Reveal className="lg:col-span-7 space-y-10">
          {[
            {
              n: "01 — What we filter",
              t: "The 400–450 nm band",
              d: "The narrow spectrum most implicated in digital eye strain. Our EyegisGuard™ coating attenuates up to 34% of this range while preserving natural colour perception.",
            },
            {
              n: "02 — What we do not claim",
              t: "Blue light does not cause blindness.",
              d: "The scientific consensus is measured. We report the discomfort we can meaningfully reduce, and nothing beyond it.",
            },
            {
              n: "03 — How we prove it",
              t: "Independent optical laboratories",
              d: "Every batch of Eyegis lenses is tested by Institut d'Optique Paris-Saclay affiliated laboratories. Reports are available on request for every serial number.",
            },
          ].map((s) => (
            <div key={s.n} className="border-t border-border/60 pt-8">
              <p className="font-eyebrow text-muted-foreground">{s.n}</p>
              <h3 className="mt-4 font-editorial text-3xl md:text-4xl">{s.t}</h3>
              <p className="mt-4 font-light text-ink/70 leading-relaxed max-w-2xl">{s.d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function EyeScore() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const questions = [
    { q: "How many hours a day do you spend in front of a screen?", a: ["< 4h", "4–8h", "8–12h", "> 12h"] },
    { q: "Do you experience visual fatigue by the end of the day?", a: ["Rarely", "Sometimes", "Often", "Constantly"] },
    { q: "Does artificial light disturb your sleep?", a: ["Never", "A little", "Frequently", "Every night"] },
  ];
  const done = step >= questions.length;
  const score = Math.min(
    100,
    Math.round((answers.reduce((s, v) => s + v, 0) / (questions.length * 3)) * 100),
  );

  return (
    <section id="assessment" className="bg-paper-warm px-6 py-32 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-eyebrow text-teal">— Digital Eye Score™</p>
            <h2 className="mt-8 font-editorial text-5xl md:text-6xl leading-[0.95]">
              Sixty seconds<br />
              <em className="text-teal">to understand your eyes.</em>
            </h2>
            <p className="mt-6 font-light text-ink/70 leading-relaxed">
              A short, honest assessment. No email required.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-16 rounded-md border border-border/60 bg-background p-8 md:p-14">
            {!done ? (
              <div>
                <div className="flex items-center justify-between mb-10">
                  <span className="font-eyebrow text-muted-foreground">
                    {String(step + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}
                  </span>
                  <div className="h-px w-40 bg-border relative overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-teal transition-all duration-700"
                      style={{ width: `${((step) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>
                <h3 className="font-editorial text-3xl md:text-4xl leading-tight max-w-2xl">
                  {questions[step].q}
                </h3>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {questions[step].a.map((opt, i) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setAnswers([...answers, i]);
                        setStep(step + 1);
                      }}
                      className="text-left border border-border/70 px-6 py-5 hover:border-teal hover:bg-teal hover:text-paper transition-all duration-500 group"
                    >
                      <span className="font-eyebrow text-muted-foreground group-hover:text-paper/70 mr-4">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="font-light">{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="font-eyebrow text-teal">Your Digital Eye Score™</p>
                <div className="mt-8 font-editorial text-8xl md:text-9xl text-ink leading-none">
                  {score}
                  <span className="text-3xl text-muted-foreground align-top">/100</span>
                </div>
                <p className="mt-8 font-light text-lg text-ink/70 max-w-lg mx-auto">
                  {score < 40
                    ? "Your eyes are relatively calm. The Meridian series will preserve that composure."
                    : score < 70
                    ? "Moderate strain. We recommend the Solène collection for daily protection."
                    : "Significant fatigue. Consider EyegisGuard™ Pro across your daily rotation."}
                </p>
                <button
                  onClick={() => {
                    setStep(0);
                    setAnswers([]);
                  }}
                  className="mt-10 font-eyebrow text-teal hover:text-ink transition-colors"
                >
                  Retake the assessment →
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Technology() {
  return (
    <section id="technology" className="bg-ink text-paper px-6 py-32 md:px-12 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-10 border-b border-paper/15 pb-16">
            <div className="lg:col-span-1 font-eyebrow text-mint">— Tech</div>
            <h2 className="lg:col-span-8 font-editorial text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
              EyegisGuard™<br />
              <em className="text-mint">a coating measured in nanometres.</em>
            </h2>
            <p className="lg:col-span-3 font-light text-paper/70">
              A seven-layer optical treatment, vacuum-deposited at 180 °C
              across seventy-two hours per batch.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <Reveal className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={techLens}
                alt="Macro view of EyegisGuard™ lens coating"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5 space-y-10">
            {[
              ["Filtration", "400–450 nm", "Attenuation up to 34%"],
              ["Transmission", "92%", "Colour fidelity preserved"],
              ["Reflectance", "< 0.5%", "Anti-glare, anti-fingerprint"],
              ["Weight", "12 g", "Titanium hinge system"],
            ].map(([label, value, sub]) => (
              <div key={label} className="border-b border-paper/15 pb-6 flex items-baseline justify-between gap-6">
                <div>
                  <p className="font-eyebrow text-mint">{label}</p>
                  <p className="mt-2 font-light text-sm text-paper/60">{sub}</p>
                </div>
                <p className="font-editorial text-4xl md:text-5xl text-paper">{value}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="bg-background px-6 py-32 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="mb-16 max-w-3xl">
            <p className="font-eyebrow text-teal">— Lifestyle</p>
            <h2 className="mt-6 font-editorial text-5xl md:text-6xl leading-[0.95]">
              A day in Eyegis.<br />
              <em>From São Paulo to Paris.</em>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <Reveal className="col-span-12 md:col-span-7">
            <figure className="relative aspect-[4/3] overflow-hidden group">
              <img
                src={lifestyleWork}
                alt="Working, in Eyegis"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover img-hover group-hover:img-hover-in"
              />
              <figcaption className="absolute bottom-6 left-6 font-eyebrow text-paper">
                Studio · 09:14
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="col-span-6 md:col-span-5">
            <figure className="relative aspect-[3/4] overflow-hidden group">
              <img
                src={lifestyleArch}
                alt="Modernist architecture"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover img-hover group-hover:img-hover-in"
              />
              <figcaption className="absolute bottom-6 left-6 font-eyebrow text-paper">
                Faria Lima · 19:47
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="col-span-6 md:col-span-5">
            <figure className="relative aspect-[4/5] overflow-hidden group bg-sand">
              <img
                src={productHero}
                alt="Product still life"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover img-hover group-hover:img-hover-in"
              />
              <figcaption className="absolute bottom-6 left-6 font-eyebrow text-ink">
                Object · Meridian 01
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-7">
            <figure className="relative aspect-[4/3] overflow-hidden group">
              <img
                src={lifestyleTravel}
                alt="Traveller in Eyegis"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover img-hover group-hover:img-hover-in"
              />
              <figcaption className="absolute bottom-6 left-6 font-eyebrow text-paper">
                In Transit · TWA Terminal
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const notes = [
    {
      q: "The first pair I've worn from morning meetings to a red-eye without noticing them.",
      by: "Camille R.",
      role: "Creative Director, Paris",
    },
    {
      q: "Eyegis writes about optics the way Leica writes about photography. Rare, and correct.",
      by: "Rafael M.",
      role: "Architect, São Paulo",
    },
    {
      q: "Discreet. Precise. The only screen-hour eyewear I'd call beautiful.",
      by: "Anouk V.",
      role: "Editor, Objekt Magazine",
    },
  ];
  return (
    <section className="bg-sand-warm px-6 py-32 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="font-eyebrow text-teal text-center">— Worn</p>
          <h2 className="mt-6 text-center font-editorial text-5xl md:text-6xl">
            <em>Quiet testimonies.</em>
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {notes.map((n, i) => (
            <Reveal key={i}>
              <figure className="flex flex-col h-full">
                <span className="font-editorial text-6xl text-teal leading-none">"</span>
                <blockquote className="mt-4 font-editorial text-2xl md:text-[26px] leading-[1.2] text-ink text-balance-tight">
                  {n.q}
                </blockquote>
                <figcaption className="mt-auto pt-10">
                  <p className="font-eyebrow text-ink">{n.by}</p>
                  <p className="mt-2 text-sm text-muted-foreground font-light">{n.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const items = [
    {
      q: "Do Eyegis frames come with prescription lenses?",
      a: "Every Eyegis frame is prepared for prescription. Select your correction at checkout; lenses are cut and coated in our Portuguese atelier within seven working days.",
    },
    {
      q: "How is EyegisGuard™ different from ordinary blue-light coatings?",
      a: "Most commodity coatings block a broad, imprecise range — often distorting colour. EyegisGuard™ targets the 400–450 nm band with a seven-layer treatment that preserves natural colour perception.",
    },
    {
      q: "Are the frames handmade?",
      a: "Frames are shaped from Mazzucchelli 1849 Italian acetate, polished across seven manual stages and assembled by hand in Portugal.",
    },
    {
      q: "What is your return policy?",
      a: "Thirty days, without ceremony. Complimentary return shipping worldwide.",
    },
    {
      q: "Do you offer sunglass versions?",
      a: "Our sun collection launches with the next volume. Register below to be notified.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-background px-6 py-32 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-16">
        <Reveal className="lg:col-span-4">
          <p className="font-eyebrow text-teal">— Enquiries</p>
          <h2 className="mt-6 font-editorial text-5xl md:text-6xl leading-[0.95]">
            Frequently<br />
            <em>considered.</em>
          </h2>
          <p className="mt-8 font-light text-ink/70 max-w-sm">
            Should a question remain unanswered, our concierge replies within a working day.
          </p>
        </Reveal>

        <Reveal className="lg:col-span-8">
          <div className="border-t border-border/60">
            {items.map((it, i) => (
              <div key={it.q} className="border-b border-border/60">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-start justify-between gap-8 py-8 text-left group"
                >
                  <span className="font-editorial text-2xl md:text-3xl leading-tight text-ink group-hover:text-teal transition-colors">
                    {it.q}
                  </span>
                  <span
                    className={`font-editorial text-3xl text-teal transition-transform duration-500 ${
                      open === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-700 ease-out ${
                    open === i ? "grid-rows-[1fr] opacity-100 pb-8" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl font-light text-ink/70 leading-relaxed">{it.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-paper px-6 pt-24 pb-10 md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-20">
          <div className="lg:col-span-5">
            <p className="font-eyebrow text-mint">— Newsletter</p>
            <h3 className="mt-6 font-editorial text-4xl md:text-5xl leading-[0.95] max-w-md">
              Correspondence, occasionally.
            </h3>
            <form className="mt-10 flex items-center gap-4 border-b border-paper/25 pb-3 max-w-md">
              <input
                type="email"
                placeholder="your@address.com"
                className="flex-1 bg-transparent font-light text-paper placeholder:text-paper/40 outline-none py-2"
              />
              <button className="font-eyebrow text-mint hover:text-paper transition-colors">
                Subscribe →
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              ["Shop", ["Meridian", "Solène", "Youth", "Sun (soon)"]],
              ["Science", ["Honest Science™", "EyegisGuard™", "Lab Reports", "Digital Eye Score™"]],
              ["Maison", ["Universe", "Atelier", "Sustainability", "Journal"]],
              ["Care", ["Concierge", "Prescription", "Returns", "Contact"]],
            ].map(([title, links]) => (
              <div key={title as string}>
                <p className="font-eyebrow text-mint">{title as string}</p>
                <ul className="mt-6 space-y-3">
                  {(links as string[]).map((l) => (
                    <li key={l}>
                      <a href="#" className="font-light text-paper/70 hover:text-paper transition-colors">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="hairline border-paper/15 pt-8 flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="font-editorial text-7xl md:text-9xl leading-none">Eyegis</p>
            <p className="mt-4 font-eyebrow text-paper/50">Engineered for vision. Designed for style.</p>
          </div>
          <div className="text-right font-eyebrow text-paper/40 text-[10px] space-y-2">
            <p>São Paulo · Paris · Porto</p>
            <p>© {new Date().getFullYear()} Eyegis Maison Optique</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <Header />
      <Hero />
      <Marquee />
      <Difference />
      <Collections />
      <Universe />
      <HonestScience />
      <EyeScore />
      <Technology />
      <Gallery />
      <Testimonials />
      <Faq />
      <Footer />
    </main>
  );
}
