import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

import whatsInTheBoxData from "@/content/whatsinthebox.json";
import { useContentDocument } from "@/lib/cms";

type Item = { title: string; body: string };
type Copy = {
  eyebrow: string;
  title1: string;
  title2: string;
  lead: string;
  items: Item[];
};

export function WhatsInTheBox() {
  const { lang } = useI18n();
  const content = useContentDocument<typeof whatsInTheBoxData>(
    "whatsinthebox",
    whatsInTheBoxData,
  );
  const c = content[lang] as Copy;
  return (
    <section className="relative bg-sand/40 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14">
        <div className="mb-14 md:mb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <span className="font-eyebrow text-teal">{c.eyebrow}</span>
            <h2 className="mt-5 font-editorial text-ink leading-[0.95] text-[10vw] sm:text-[7vw] md:text-[5vw] lg:text-[4vw] xl:text-[60px]">
              {c.title1}
              <span className="block italic text-teal">{c.title2}</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-ink/70 leading-relaxed max-w-md">{c.lead}</p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-ink/10 border-y border-ink/10">
          {c.items.map((it, i) => (
            <li
              key={it.title}
              className={`px-0 md:px-8 py-8 flex gap-5 ${
                i >= 3 ? "md:border-t md:border-ink/10" : ""
              }`}
            >
              <span className="font-editorial text-3xl text-teal/80 tabular-nums shrink-0 w-10">
                0{i + 1}
              </span>
              <div>
                <h3 className="font-editorial text-xl text-ink leading-tight">{it.title}</h3>
                <p className="mt-2 text-sm text-ink/65 leading-relaxed">{it.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
