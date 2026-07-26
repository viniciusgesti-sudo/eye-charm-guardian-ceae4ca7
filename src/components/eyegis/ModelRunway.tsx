import heroMan from "@/assets/hero-saopaulo-eyegis.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import heroWoman from "@/assets/hero-paris-eyegis.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import businessModel from "@/assets/models-business-eyegis.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import creativeModel from "@/assets/models-creative-eyegis.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import focusModel from "@/assets/models-focus-eyegis.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";
import { DEFAULT_AMAZON_URL } from "@/lib/amazon";

import { Picture, type PictureSource } from "./Picture";

export type RunwayAudience = "men" | "women" | "kids";

type RunwayLook = {
  code: string;
  city: string;
  hour: string;
  lens: string;
  image: PictureSource;
  alt: string;
  title: string;
  body: string;
};

/* Per-look audience mapping, aligned by index across all languages */
const LOOK_AUDIENCE: RunwayAudience[] = ["men", "women", "women", "women", "men"];



type Copy = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  intro: string;
  drag: string;
  cta: string;
  looks: RunwayLook[];
};

const COPY: Record<Lang, Copy> = {
  EN: {
    eyebrow: "Applied Models · Eyegis in use",
    title: "A living runway",
    titleAccent: "for real digital lives.",
    intro:
      "Five cinematic moments built around people actually wearing Eyegis — not product cutouts, not stock poses, but premium eyewear in motion.",
    drag: "Drag sideways",
    cta: "Wear this look on Amazon",
    looks: [
      {
        code: "SP / 01",
        city: "São Paulo",
        hour: "22:41",
        lens: "Men's Collection · Clear Guard",
        image: heroMan,
        alt: "Man wearing Eyegis Men's Collection glasses on a São Paulo rooftop at night",
        title: "After-hours precision.",
        body: "A sharper frame for late presentations, night screens and city light — the glasses stay visible, premium and intentional.",
      },
      {
        code: "PAR / 02",
        city: "Paris",
        hour: "17:12",
        lens: "Women's Collection · Warm Clear",
        image: heroWoman,
        alt: "Woman wearing Eyegis Women's Collection glasses on a Paris balcony",
        title: "Soft light, exact focus.",
        body: "Warm editorial styling with real Eyegis eyewear placed naturally on the face — refined, wearable and product-led.",
      },
      {
        code: "LON / 03",
        city: "London",
        hour: "09:18",
        lens: "Men's Collection · Work Lens",
        image: businessModel,
        alt: "Professional woman wearing Eyegis glasses while reviewing documents",
        title: "Boardroom without the glare.",
        body: "A measured workday image: posture, reflections and blue-light lenses engineered to feel credible instead of staged.",
      },
      {
        code: "AMS / 04",
        city: "Amsterdam",
        hour: "14:06",
        lens: "Men's Collection · Studio Lens",
        image: creativeModel,
        alt: "Creative professional wearing Eyegis glasses while working on a laptop",
        title: "Creative flow, visible craft.",
        body: "The frame reads as part of the person’s style, while the lens reflection quietly explains the screen-focused function.",
      },
      {
        code: "TYO / 05",
        city: "Tokyo",
        hour: "00:24",
        lens: "Women's Collection · Focus Lens",
        image: focusModel,
        alt: "Focused user wearing Eyegis glasses with headphones at a screen",
        title: "Immersion without cliché.",
        body: "A darker digital scene where Eyegis remains the product hero — less gaming trope, more precision instrument.",
      },
    ],
  },
  PT: {
    eyebrow: "Modelos aplicados · Eyegis em uso",
    title: "Uma passarela viva",
    titleAccent: "para vidas digitais reais.",
    intro:
      "Cinco momentos cinematográficos com pessoas realmente usando Eyegis — sem recorte de produto, sem pose de banco de imagem, com os óculos como protagonista.",
    drag: "Arraste para o lado",
    cta: "Comprar este look na Amazon",
    looks: [
      {
        code: "SP / 01",
        city: "São Paulo",
        hour: "22:41",
        lens: "Men's Collection · Clear Guard",
        image: heroMan,
        alt: "Homem usando óculos Eyegis Men's Collection em um rooftop em São Paulo à noite",
        title: "Precisão depois do expediente.",
        body: "Uma armação mais marcante para apresentações tarde, telas à noite e luz urbana — os óculos aparecem com presença premium.",
      },
      {
        code: "PAR / 02",
        city: "Paris",
        hour: "17:12",
        lens: "Women's Collection · Warm Clear",
        image: heroWoman,
        alt: "Mulher usando óculos Eyegis Women's Collection em uma varanda em Paris",
        title: "Luz suave, foco exato.",
        body: "Estética editorial quente com Eyegis aplicado naturalmente no rosto — refinado, usável e orientado ao produto.",
      },
      {
        code: "LON / 03",
        city: "Londres",
        hour: "09:18",
        lens: "Men's Collection · Work Lens",
        image: businessModel,
        alt: "Profissional usando óculos Eyegis enquanto revisa documentos",
        title: "Reunião sem reflexo pesado.",
        body: "Uma imagem de trabalho mais verdadeira: postura, reflexos e lentes blue-light com aparência crível, não encenada.",
      },
      {
        code: "AMS / 04",
        city: "Amsterdam",
        hour: "14:06",
        lens: "Men's Collection · Studio Lens",
        image: creativeModel,
        alt: "Profissional criativo usando óculos Eyegis enquanto trabalha no laptop",
        title: "Fluxo criativo, produto visível.",
        body: "A armação entra no estilo da pessoa, enquanto o reflexo da lente explica discretamente a função para telas.",
      },
      {
        code: "TYO / 05",
        city: "Tóquio",
        hour: "00:24",
        lens: "Women's Collection · Focus Lens",
        image: focusModel,
        alt: "Usuário focado usando óculos Eyegis com headset diante de uma tela",
        title: "Imersão sem clichê.",
        body: "Uma cena digital mais escura onde Eyegis continua sendo o herói — menos trope de gamer, mais instrumento de precisão.",
      },
    ],
  },
  FR: {
    eyebrow: "Modèles appliqués · Eyegis porté",
    title: "Un runway vivant",
    titleAccent: "pour des vies numériques réelles.",
    intro:
      "Cinq moments cinématographiques avec Eyegis réellement porté — pas de découpe produit, pas de pose stock, mais des lunettes premium en situation.",
    drag: "Glisser latéralement",
    cta: "Porter ce look sur Amazon",
    looks: [
      {
        code: "SP / 01",
        city: "São Paulo",
        hour: "22:41",
        lens: "Men's Collection · Clear Guard",
        image: heroMan,
        alt: "Homme portant des lunettes Eyegis Men's Collection sur un rooftop à São Paulo de nuit",
        title: "Précision après les heures.",
        body: "Une monture plus nette pour les présentations tardives, les écrans de nuit et les lumières urbaines.",
      },
      {
        code: "PAR / 02",
        city: "Paris",
        hour: "17:12",
        lens: "Women's Collection · Warm Clear",
        image: heroWoman,
        alt: "Femme portant des lunettes Eyegis Women's Collection sur un balcon parisien",
        title: "Lumière douce, focus exact.",
        body: "Un style éditorial chaleureux avec Eyegis posé naturellement sur le visage — raffiné, portable et orienté produit.",
      },
      {
        code: "LON / 03",
        city: "Londres",
        hour: "09:18",
        lens: "Men's Collection · Work Lens",
        image: businessModel,
        alt: "Professionnelle portant des lunettes Eyegis en consultant des documents",
        title: "Réunion sans éblouissement.",
        body: "Une scène de travail mesurée : posture, reflets et verres blue-light crédibles plutôt que mis en scène.",
      },
      {
        code: "AMS / 04",
        city: "Amsterdam",
        hour: "14:06",
        lens: "Men's Collection · Studio Lens",
        image: creativeModel,
        alt: "Créatif portant des lunettes Eyegis devant un ordinateur portable",
        title: "Flux créatif, produit visible.",
        body: "La monture devient une partie du style, tandis que le reflet du verre raconte discrètement l’usage écran.",
      },
      {
        code: "TYO / 05",
        city: "Tokyo",
        hour: "00:24",
        lens: "Women's Collection · Focus Lens",
        image: focusModel,
        alt: "Utilisateur concentré portant des lunettes Eyegis avec un casque devant un écran",
        title: "Immersion sans cliché.",
        body: "Une scène numérique plus sombre où Eyegis reste le héros produit — moins cliché gamer, plus instrument de précision.",
      },
    ],
  },
};

export function ModelRunway({ audience }: { audience?: RunwayAudience } = {}) {
  const { lang } = useI18n();
  const copy = COPY[lang];
  const looks = audience
    ? copy.looks.filter((_, i) => LOOK_AUDIENCE[i] === audience)
    : copy.looks;

  if (looks.length === 0) return null;

  return (
    <section id="models" className="relative overflow-hidden bg-paper-warm py-24 text-ink md:py-32" aria-labelledby="model-runway-title">

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(29,37,45,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(29,37,45,0.05)_1px,transparent_1px)] bg-[size:120px_120px]" />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span className="font-eyebrow text-teal">{copy.eyebrow}</span>
            <h2 id="model-runway-title" className="mt-5 max-w-3xl font-editorial leading-[0.9] text-[12vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.6vw] xl:text-[76px]">
              {copy.title}
              <span className="block italic text-teal">{copy.titleAccent}</span>
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-xl text-base leading-relaxed text-ink/68 md:text-lg">{copy.intro}</p>
            <div className="mt-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
              <span className="h-px w-12 bg-teal/60" />
              <span>{copy.drag}</span>
            </div>
          </div>
        </div>

        <div className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-8 [scrollbar-width:none] md:mt-20 md:gap-7 [&::-webkit-scrollbar]:hidden" aria-label="Eyegis applied model runway">
          {looks.map((look, index) => (
            <article
              key={look.code}
              className="group relative grid min-h-[720px] min-w-[86vw] snap-center overflow-hidden bg-ink text-paper md:min-w-[72vw] lg:min-w-[58vw] xl:min-w-[980px]"
            >
              <Picture source={look.image} alt={look.alt} sizes="(min-width:1024px) 60vw, 90vw" priority={false} width={1600} height={2000} className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1600ms] ease-out group-hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(29,37,45,0.82)_0%,rgba(29,37,45,0.42)_42%,rgba(29,37,45,0.08)_100%)]" />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-paper/15 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/65 md:px-8">
                <span>{look.code}</span>
                <span>{look.city} · {look.hour}</span>
              </div>
              <div className="relative z-10 grid h-full content-end px-5 pb-8 pt-20 md:px-8 md:pb-10 lg:grid-cols-[0.95fr_1fr] lg:gap-8">
                <div className="max-w-xl self-end">
                  <div className="mb-5 inline-flex items-center gap-3 border border-paper/20 bg-ink/35 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-mint backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                    <span>{look.lens}</span>
                  </div>
                  <h3 className="font-editorial text-5xl leading-[0.92] md:text-7xl">{look.title}</h3>
                </div>
                <div className="mt-8 max-w-md self-end border-t border-paper/20 pt-6 lg:mt-0 lg:justify-self-end">
                  <p className="text-sm leading-relaxed text-paper/72 md:text-base">{look.body}</p>
                  <a href={DEFAULT_AMAZON_URL} target="_blank" rel="noopener noreferrer sponsored" className="mt-7 inline-flex items-center gap-4 rounded-full bg-paper px-6 py-4 font-eyebrow text-ink transition-transform duration-500 hover:-translate-y-0.5">
                    <span>{copy.cta}</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}