import { useState } from "react";
import { ChevronDown } from "lucide-react";

const TEAL = "#004B57";
const TEAL_DEEP = "#003842"; // Deep Teal shade
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
  strokeWidth: 1.5,
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
    q: "How does selective filtering actually work?",
    a: "Honest Science™, in plain words: our E-Guard Retina™ and E-Guard Circadian™ lenses act only on the specific wavelengths of visible light involved in digital eye strain and evening exposure — while letting the rest of the spectrum pass through, so you keep seeing colors as they are. It is not a tinted lens and not a filter over reality. We describe what the lens does optically, not how you should feel wearing it.",
  },
  {
    icon: <IconPeople />,
    q: "Who are Eyegis glasses designed for?",
    a: "Anyone who spends meaningful time in front of screens — working, studying, creating, gaming, streaming or scrolling. Eyegis is built around different lifestyles and levels of digital exposure, from focused daytime hours (E-Guard Retina™) to late-evening use before sleep (E-Guard Circadian™).",
  },
  {
    icon: <IconGlassesHeadset />,
    q: "Are your glasses compatible with headphones and gaming headsets?",
    a: "Yes. Our TR90 frames are lightweight and slim at the temples, designed for long sessions and comfortable use with most over-ear headphones and gaming headsets.",
  },
  {
    icon: <IconGlassesHeadset />,
    q: "Do you make prescription (corrective) glasses?",
    a: "Not yet — we don't offer prescription lenses at this time. You can wear your Eyegis frames together with your contact lenses.",
  },
  {
    icon: <IconBox />,
    q: "What are your shipping and return policies?",
    a: "Shipping times and return conditions are handled directly by your local Amazon marketplace and follow its standard policies. Please refer to your marketplace order page for the most up-to-date information.",
  },
  {
    icon: <IconShield />,
    q: "Do Eyegis glasses come with a warranty?",
    a: "Yes. Every pair of Eyegis glasses is covered by a two-year warranty against manufacturing defects. Not covered: accidental damage (drops, impact, crushing), normal wear such as everyday scratches, and damage from misuse, excessive heat or modifications. On top of that, we offer a 60-Day Comfort Guarantee — if your Eyegis glasses don't deliver the visual comfort you expected, reach out and we'll work with you to find the best solution.",
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
            background: open ? `${TEAL_DEEP}22` : `${TEAL_DEEP}15`,
            color: open ? TEAL : TEAL_DEEP,
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
            style={{ color: INK }}
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
            style={{ color: TEAL_DEEP }}
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
            style={{ background: `${TEAL_DEEP}66` }}
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
