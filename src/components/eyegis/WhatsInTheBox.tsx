import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

type Item = { title: string; body: string };
type Copy = {
  eyebrow: string;
  title1: string;
  title2: string;
  lead: string;
  items: Item[];
};

const COPY: Record<Lang, Copy> = {
  EN: {
    eyebrow: "What's in the box",
    title1: "Every detail",
    title2: "accounted for.",
    lead: "Men's Collection arrives in a fully considered kit — same on every order, whether shipped from Los Angeles, London or São Paulo.",
    items: [
      { title: "Men's Collection frame",         body: "TR90 lightweight frame with EyegisGuard™ lenses, ready to wear." },
      { title: "Hard protective case",   body: "Semi-rigid shell with soft interior, designed to survive daily travel." },
      { title: "Microfiber cloth",       body: "Dual-side weave — one polishing side, one anti-smudge." },
      { title: "Care card",              body: "Cleaning ritual and long-term care recommendations." },
      { title: "Authenticity certificate", body: "Signed batch reference and lens calibration report." },
      { title: "2-year warranty",        body: "Registration-free — proof of purchase on Amazon is enough." },
    ],
  },
  PT: {
    eyebrow: "O que vem na caixa",
    title1: "Cada detalhe",
    title2: "no lugar certo.",
    lead: "A Men's Collection chega com um kit completo — o mesmo em qualquer pedido, seja enviado de Los Angeles, Londres ou São Paulo.",
    items: [
      { title: "Armação Men's Collection",        body: "Armação TR90 leve com lentes EyegisGuard™, pronta para uso." },
      { title: "Estojo rígido",           body: "Casca semirrígida com interior macio, feita para o uso diário." },
      { title: "Flanela de microfibra",   body: "Dupla face — um lado polidor, um lado anti-embaçamento." },
      { title: "Cartão de cuidados",      body: "Ritual de limpeza e recomendações de manutenção." },
      { title: "Certificado de autenticidade", body: "Referência do lote e relatório de calibração das lentes." },
      { title: "Garantia de 2 anos",      body: "Sem cadastro — o comprovante da Amazon já vale." },
    ],
  },
  FR: {
    eyebrow: "Contenu de la boîte",
    title1: "Chaque détail",
    title2: "à sa place.",
    lead: "Men's Collection arrive dans un kit complet — identique pour chaque commande, expédiée depuis Los Angeles, Londres ou São Paulo.",
    items: [
      { title: "Monture Men's Collection",        body: "Monture TR90 légère avec verres EyegisGuard™, prête à porter." },
      { title: "Étui rigide",             body: "Coque semi-rigide à intérieur doux, conçue pour le voyage quotidien." },
      { title: "Chiffon microfibre",      body: "Double face — un côté polissage, un côté anti-traces." },
      { title: "Carte d'entretien",       body: "Rituel de nettoyage et recommandations de soin." },
      { title: "Certificat d'authenticité", body: "Référence de lot signée et rapport de calibration." },
      { title: "Garantie 2 ans",          body: "Sans inscription — la preuve d'achat Amazon suffit." },
    ],
  },
};

export function WhatsInTheBox() {
  const { lang } = useI18n();
  const c = COPY[lang];
  return (
    <section className="relative bg-sand/40 py-10 md:py-10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14">
        <div className="mb-14 md:mb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <span className="font-eyebrow text-teal">{c.eyebrow}</span>
            <h2 className="mt-5 type-display text-ink">
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
