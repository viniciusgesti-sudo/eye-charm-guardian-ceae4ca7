import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";
import { MARKETPLACES, COMING_SOON_HREF, LAB_CERTIFICATIONS } from "@/lib/amazon";
import { AmazonMark } from "./AmazonMark";

type Copy = {
  eyebrow: string;
  title1: string;
  title2: string;
  body: string;
  primary: string;
  comingSoon: string;
  reviews: string;
  trust: string[];
};

const COPY: Record<Lang, Copy> = {
  EN: {
    eyebrow: "Launching soon on Amazon",
    title1: "One catalogue.",
    title2: "Your marketplace.",
    body: "Eyegis is arriving on Amazon in every core marketplace — secure checkout, Prime delivery and hassle-free returns wherever you already shop. Leave your e-mail on the launch list to be the first served.",
    primary: "Shop on Amazon",
    comingSoon: "Join the launch list",
    reviews: "verified reviews on Amazon",
    trust: ["Prime delivery on launch", "60-day comfort guarantee", "2-year warranty", "Verified marketplace"],
  },
  PT: {
    eyebrow: "Chegando em breve na Amazon",
    title1: "Um catálogo.",
    title2: "O seu marketplace.",
    body: "A Eyegis chega à Amazon nos principais mercados — checkout seguro, entrega Prime e trocas sem burocracia onde você já compra. Deixe seu e-mail na lista de lançamento e seja o primeiro a receber.",
    primary: "Comprar na Amazon",
    comingSoon: "Entrar na lista de lançamento",
    reviews: "avaliações verificadas na Amazon",
    trust: ["Entrega Prime no lançamento", "Garantia de conforto 60 dias", "Garantia 2 anos", "Marketplace verificado"],
  },
  FR: {
    eyebrow: "Bientôt sur Amazon",
    title1: "Un catalogue.",
    title2: "Votre marketplace.",
    body: "Eyegis arrive sur Amazon dans les principaux marchés — paiement sécurisé, livraison Prime et retours simples là où vous achetez déjà. Inscrivez-vous à la liste de lancement pour être servi en premier.",
    primary: "Acheter sur Amazon",
    comingSoon: "Rejoindre la liste de lancement",
    reviews: "avis vérifiés sur Amazon",
    trust: ["Livraison Prime au lancement", "Garantie confort 60 jours", "Garantie 2 ans", "Marketplace vérifiée"],
  },
};

export function ShopOnAmazon() {
  const { lang } = useI18n();
  const c = COPY[lang];

  return (
    <section id="shop-amazon" className="relative bg-teal-deep text-paper py-24 md:py-32 overflow-hidden">
      {/* soft ambient light */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(200,222,220,0.10),transparent_60%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_90%,rgba(200,222,220,0.08),transparent_55%)]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end mb-16 md:mb-20">
          <div className="lg:col-span-7">
            <span className="font-eyebrow text-mint">{c.eyebrow}</span>
            <h2 className="mt-5 font-editorial leading-[0.92] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.6vw] xl:text-[76px]">
              {c.title1}
              <span className="block italic text-mint">{c.title2}</span>
            </h2>
            <p className="mt-8 max-w-xl text-paper/75 leading-relaxed text-lg">{c.body}</p>
          </div>

          <div className="lg:col-span-5 lg:justify-self-end w-full">
            <a
              href={COMING_SOON_HREF}
              className="group inline-flex w-full sm:w-auto items-center justify-between gap-6 rounded-full bg-mint px-8 py-5 text-ink shadow-[0_20px_60px_-20px_rgba(200,222,220,0.6)] hover:-translate-y-0.5 hover:bg-paper transition-all duration-500"
             target="_blank" rel="noopener noreferrer">
              <span className="flex items-center gap-3">
                <AmazonMark className="h-6 w-6" />
                <span className="font-eyebrow">{c.comingSoon} · Amazon</span>
              </span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink/10 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">→</span>
            </a>

            {/* Verifiable lab certification (in place of fabricated reviews) */}
            <div className="mt-6 inline-flex items-center gap-3 text-paper/80">
              <span
                aria-hidden
                className="inline-grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold"
                style={{ backgroundColor: "#86D9D1", color: "#004B57" }}
              >
                ✓
              </span>
              <span className="font-eyebrow text-xs">{LAB_CERTIFICATIONS.short}</span>
            </div>
          </div>
        </div>

        {/* Marketplace grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MARKETPLACES.map((m) => {
            const commonClass =
              "group flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 transition-all duration-500";
            const inner = (
              <>
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl leading-none" aria-hidden="true">{m.flag}</span>
                  <div className="min-w-0">
                    <div className="font-eyebrow text-xs text-paper truncate">{m.label}</div>
                    <div className="text-[10px] text-paper/50 truncate">
                      {m.active ? m.domain : c.comingSoon}
                    </div>
                  </div>
                </div>
                <span className="text-paper/60 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
                  {m.active ? "→" : "·"}
                </span>
              </>
            );
            return m.active ? (
              <a
                key={m.code}
                href={COMING_SOON_HREF}
                className={`${commonClass} border-paper/15 bg-paper/[0.04] hover:bg-paper/[0.09] hover:border-paper/30`}
               target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <div
                key={m.code}
                aria-disabled="true"
                className={`${commonClass} border-paper/10 bg-paper/[0.02] opacity-60 cursor-not-allowed`}
              >
                {inner}
              </div>
            );
          })}
        </div>

        {/* Trust row */}
        <ul className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-paper/60 font-eyebrow text-[10px]">
          {c.trust.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-mint" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
