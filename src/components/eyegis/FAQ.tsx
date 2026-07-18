import { useState } from "react";
import { ChevronDown } from "lucide-react";

const TEAL = "#004B57";
const COPPER = "#B4956B";
const INK = "#1D252D";

type FaqItem = {
  q: string;
  a: string;
  icon: React.ReactNode;
};

const iconProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const IconMicroscope = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M14 5l5 5-6 6-5-5z" />
    <path d="M12 16l3 3" />
    <path d="M17 21a6 6 0 0 0 6-6" />
    <path d="M7 27h18" />
    <path d="M10 24h6l1 3h-8z" />
  </svg>
);

const IconPeople = () => (
  <svg {...iconProps} aria-hidden="true">
    <circle cx="11" cy="12" r="3.5" />
    <circle cx="22" cy="13" r="2.8" />
    <path d="M5 25c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <path d="M18 25c0-2.5 2-4.5 4.5-4.5S27 22.5 27 25" />
  </svg>
);

const IconGlassesHeadset = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M6 12v5a3 3 0 0 0 3 3h1a3 3 0 0 0 3-3v-3" />
    <path d="M26 12v5a3 3 0 0 1-3 3h-1a3 3 0 0 1-3-3v-3" />
    <path d="M13 14h6" />
    <path d="M7 12a9 9 0 0 1 18 0" />
  </svg>
);

const IconBox = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M5 10l11-5 11 5v12l-11 5-11-5z" />
    <path d="M5 10l11 5 11-5" />
    <path d="M16 15v12" />
    <path d="M10.5 7.5l11 5" />
  </svg>
);

const IconShield = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M16 4l10 3v8c0 6-4.5 10.5-10 12-5.5-1.5-10-6-10-12V7z" />
    <path d="M11.5 16l3 3 6-6" />
  </svg>
);

const ITEMS: FaqItem[] = [
  {
    icon: <IconMicroscope />,
    q: "Do blue light glasses really work?",
    a: "That's a great question, and the answer is more nuanced than many marketing claims suggest. Yes, blue light filtering lenses can provide real benefits. But not all lenses are designed the same, and many claims you'll find online are exaggerated or oversimplified. At Eyegis, we believe in Honest Science™. Our lenses are engineered using evidence-based optical principles, with selective blue light filtering designed to improve visual comfort while preserving natural color accuracy and contrast.",
  },
  {
    icon: <IconPeople />,
    q: "Who are Eyegis glasses designed for?",
    a: "Whether you're working, studying, creating, gaming or simply spending hours in front of digital screens, Eyegis lenses are designed to match different lifestyles and levels of digital exposure.",
  },
  {
    icon: <IconGlassesHeadset />,
    q: "Are your glasses compatible with headphones and gaming headsets?",
    a: "Yes. Our lightweight TR90 frames are designed for long-lasting comfort and are compatible with most headphones and gaming headsets.",
  },
  {
    icon: <IconBox />,
    q: "What are your shipping and return policies?",
    a: "Shipping times and return conditions vary by marketplace and country. Please refer to your local Amazon marketplace for the most up-to-date information.",
  },
  {
    icon: <IconShield />,
    q: "Do Eyegis glasses come with a warranty?",
    a: "Every pair of Eyegis glasses is covered by a two-year warranty against manufacturing defects. We also offer a 60-Day Comfort Guarantee — if your Eyegis glasses don't provide the visual comfort or experience you expected, simply contact us for assistance.",
  },
];

function FaqCard({
  item,
  index,
  open,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const contentId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;
  return (
    <div
      className="overflow-hidden rounded-2xl bg-white transition-shadow duration-300"
      style={{
        border: `1px solid ${open ? `${TEAL}33` : "rgba(29,37,45,0.08)"}`,
        boxShadow: open
          ? "0 30px 70px -40px rgba(0,75,87,0.35)"
          : "0 10px 30px -20px rgba(29,37,45,0.15)",
      }}
    >
      <button
        id={buttonId}
        aria-expanded={open}
        aria-controls={contentId}
        onClick={onToggle}
        className="group flex w-full items-center gap-5 px-6 py-6 text-left md:px-8"
      >
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full transition-colors"
          style={{
            background: open ? `${COPPER}22` : `${COPPER}15`,
            color: open ? TEAL : COPPER,
          }}
        >
          {item.icon}
        </span>

        <span
          className="flex-1 min-w-0 font-editorial text-base leading-snug md:text-lg"
          style={{ color: INK }}
        >
          {item.q}
        </span>

        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all"
          style={{
            background: open ? TEAL : "rgba(29,37,45,0.05)",
            color: open ? "#F9F9F9" : INK,
          }}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-500 ${
              open ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className="px-6 pb-7 pl-[76px] pr-16 text-[15px] leading-relaxed md:px-8 md:pl-[92px]"
            style={{ color: "rgba(29,37,45,0.75)" }}
          >
            <div
              className="mb-5 h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(180,149,107,0.35), transparent)",
              }}
            />
            {item.a}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="relative"
      style={{ background: "#F9F9F9" }}
    >
      <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <div className="text-center">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.32em]"
            style={{ color: COPPER }}
          >
            Frequently Asked Questions
          </span>
          <h2
            className="mt-5 font-editorial text-3xl leading-[1.1] md:text-5xl"
            style={{ color: INK }}
          >
            Still have questions?{" "}
            <span className="italic" style={{ color: TEAL }}>
              We've got you covered.
            </span>
          </h2>
          <div
            className="mx-auto mt-6 h-px w-16"
            style={{ background: `${COPPER}66` }}
          />
        </div>

        <div className="mt-14 flex flex-col gap-4 md:mt-16">
          {ITEMS.map((item, i) => (
            <FaqCard
              key={item.q}
              item={item}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
