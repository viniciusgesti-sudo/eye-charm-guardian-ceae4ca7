import { Picture, type PictureSource } from "./Picture";
import { useI18n } from "@/i18n/context";

/* Men (Meridian — glossy black + gold) */
import menHinge from "@/assets/products/meridian-macro-hinge.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import menBridge from "@/assets/products/meridian-macro-bridge.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import menLens from "@/assets/products/meridian-macro-lens.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";

/* Women (Solène — tortoise + gold) */
import womenHinge from "@/assets/products/solene-macro-hinge.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import womenBridge from "@/assets/products/solene-macro-bridge.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import womenLens from "@/assets/products/solene-macro-lens.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";

/* Kids (cognac tortoise + gold flex-hinge) */
import kidsHinge from "@/assets/products/kids-macro-hinge.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import kidsBridge from "@/assets/products/kids-macro-bridge.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";
import kidsLens from "@/assets/products/kids-macro-lens.jpg?w=480;800;1200;1600&format=avif;webp;jpg&as=picture";

export type MacroAudience = "men" | "women" | "kids";

type Tile = { src: PictureSource; alt: string };

const SETS: Record<MacroAudience, { hinge: PictureSource; bridge: PictureSource; lens: PictureSource; altKey: string }> = {
  men: {
    hinge: menHinge,
    bridge: menBridge,
    lens: menLens,
    altKey: "Men's Collection — glossy black acetate with polished gold temple",
  },
  women: {
    hinge: womenHinge,
    bridge: womenBridge,
    lens: womenLens,
    altKey: "Women's Collection — tortoise acetate with gold temple engraving",
  },
  kids: {
    hinge: kidsHinge,
    bridge: kidsBridge,
    lens: kidsLens,
    altKey: "Kids & Teens — flexible cognac tortoise acetate with spring-flex hinge",
  },
};

const COPY = {
  EN: {
    eyebrow: "The craft, up close",
    title1: "Every detail,",
    accent: "engineered.",
    lead: "Three studies from the same frame — hinge, bridge and lens — shot without retouch.",
    tiles: {
      hinge: { tag: "01 · Hinge", title: "Precision hinge", body: "Spring-loaded articulation with the discreet shield-G on the outer temple." },
      bridge: { tag: "02 · Bridge", title: "Keyhole bridge", body: "A quiet geometry that distributes weight evenly across the nose." },
      lens: { tag: "03 · Lens", title: "EyegisGuard™ lens", body: "A warm champagne coating that selectively filters high-energy blue light." },
    },
  },
  PT: {
    eyebrow: "O ofício, de perto",
    title1: "Cada detalhe,",
    accent: "engenheirado.",
    lead: "Três estudos da mesma armação — charneira, ponte e lente — fotografados sem retoque.",
    tiles: {
      hinge: { tag: "01 · Charneira", title: "Charneira de precisão", body: "Articulação com mola e o shield-G discreto na parte externa da haste." },
      bridge: { tag: "02 · Ponte", title: "Ponte keyhole", body: "Uma geometria silenciosa que distribui o peso de forma equilibrada." },
      lens: { tag: "03 · Lente", title: "Lente EyegisGuard™", body: "Camada champagne quente que filtra seletivamente a luz azul de alta energia." },
    },
  },
  FR: {
    eyebrow: "Le savoir-faire, de près",
    title1: "Chaque détail,",
    accent: "conçu.",
    lead: "Trois études d'une même monture — charnière, pont et verre — sans retouche.",
    tiles: {
      hinge: { tag: "01 · Charnière", title: "Charnière de précision", body: "Articulation à ressort avec le shield-G discret sur l'extérieur de la branche." },
      bridge: { tag: "02 · Pont", title: "Pont keyhole", body: "Une géométrie silencieuse qui répartit le poids de façon équilibrée." },
      lens: { tag: "03 · Verre", title: "Verre EyegisGuard™", body: "Un traitement champagne chaud qui filtre sélectivement la lumière bleue haute énergie." },
    },
  },
} as const;

type Props = {
  audience: MacroAudience;
  className?: string;
};

export function MacroTriptych({ audience, className = "" }: Props) {
  const { lang } = useI18n();
  const set = SETS[audience];
  const copy = COPY[lang];

  const tiles: Array<Tile & { key: keyof typeof copy.tiles }> = [
    { key: "hinge", src: set.hinge, alt: `${set.altKey} — hinge macro` },
    { key: "bridge", src: set.bridge, alt: `${set.altKey} — bridge macro` },
    { key: "lens", src: set.lens, alt: `${set.altKey} — lens macro` },
  ];

  return (
    <section
      aria-labelledby="macro-triptych-title"
      className={`bg-paper-warm text-ink ${className}`}
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-10 lg:px-14 py-6 md:py-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-5 md:mb-6">
          <h2
            id="macro-triptych-title"
            className="font-editorial text-fluid-h2 leading-[1] text-ink"
          >
            {copy.title1}{" "}
            <span className="italic text-teal-deep">{copy.accent}</span>
          </h2>
          <span className="font-eyebrow text-[10px] tracking-[0.28em] text-teal">
            {copy.eyebrow}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {tiles.map((t, i) => {
            const c = copy.tiles[t.key];
            return (
              <figure
                key={t.key}
                className="group overflow-hidden rounded-sm bg-paper ring-1 ring-ink/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-ink/[0.04]">
                  <Picture
                    source={t.src}
                    alt={t.alt}
                    sizes="(min-width:1024px) 32vw, 32vw"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    priority={i === 0 ? false : false}
                  />
                </div>
                <figcaption className="px-3 py-2">
                  <span className="font-eyebrow text-[9px] tracking-[0.28em] text-teal">
                    {c.tag}
                  </span>
                  <h3 className="mt-0.5 font-editorial text-sm md:text-[15px] leading-tight">
                    {c.title}
                  </h3>
                </figcaption>
              </figure>
            );
          })}
        </div>

      </div>

    </section>
  );
}
