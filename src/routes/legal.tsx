import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { Header } from "@/components/eyegis/Header";
import { Footer } from "@/components/eyegis/Footer";
import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

const COPY: Record<Lang, { title: string; intro: string; sections: { h: string; p: string }[] }> = {
  EN: {
    title: "Legal Notice — Website Terms of Use",
    intro: "This page is maintained by the Eyegis team to inform visitors about the legal information related to this website and its use.",
    sections: [
      { h: "Publisher", p: "This website is published by the Eyegis team. Company details, registration number and registered address will be provided by the publisher upon request." },
      { h: "Hosting", p: "This website is hosted on Lovable's cloud infrastructure." },
      { h: "Intellectual property", p: "All content on this website — including texts, logos, images, product names such as EyegisGuard™, E-Guard Retina™ and E-Guard Circadian™, illustrations and page layouts — is the property of Eyegis or its partners and is protected by international intellectual property laws. Any reproduction, in whole or in part, without prior written consent is prohibited." },
      { h: "Personal data", p: "For any information regarding the processing of your personal data, please refer to our Privacy Policy." },
      { h: "Contact", p: "For any legal request, please use the contact form available on the Contact page." },
    ],
  },
  PT: {
    title: "Aviso Legal — Termos de Uso do Site",
    intro: "Esta página é mantida pela equipe Eyegis para informar os visitantes sobre as informações legais relativas a este site e ao seu uso.",
    sections: [
      { h: "Editor", p: "Este site é publicado pela equipe Eyegis. Dados societários, número de registro e endereço da sede podem ser fornecidos pelo editor mediante solicitação." },
      { h: "Hospedagem", p: "Este site está hospedado na infraestrutura em nuvem da Lovable." },
      { h: "Propriedade intelectual", p: "Todos os conteúdos deste site — textos, logos, imagens, nomes como EyegisGuard™, E-Guard Retina™ e E-Guard Circadian™, ilustrações e diagramações — pertencem à Eyegis ou aos seus parceiros e são protegidos pelas leis internacionais de propriedade intelectual. Qualquer reprodução, total ou parcial, sem autorização prévia por escrito é proibida." },
      { h: "Dados pessoais", p: "Para informações sobre o tratamento dos seus dados pessoais, consulte a nossa Política de Privacidade." },
      { h: "Contato", p: "Para qualquer solicitação de natureza legal, utilize o formulário disponível na página de Contato." },
    ],
  },
  FR: {
    title: "Mentions Légales — Conditions d'utilisation du site",
    intro: "Cette page est maintenue par l'équipe Eyegis afin d'informer les visiteurs des mentions légales relatives à ce site et à son utilisation.",
    sections: [
      { h: "Éditeur", p: "Ce site est édité par l'équipe Eyegis. Les informations juridiques (raison sociale, numéro d'immatriculation, siège social) peuvent être communiquées par l'éditeur sur simple demande." },
      { h: "Hébergement", p: "Ce site est hébergé sur l'infrastructure cloud de Lovable." },
      { h: "Propriété intellectuelle", p: "L'ensemble des contenus de ce site — textes, logos, images, noms tels que EyegisGuard™, E-Guard Retina™ et E-Guard Circadian™, illustrations et mises en page — sont la propriété d'Eyegis ou de ses partenaires et sont protégés par les lois internationales de la propriété intellectuelle. Toute reproduction, totale ou partielle, sans autorisation écrite préalable est interdite." },
      { h: "Données personnelles", p: "Pour toute information relative au traitement de vos données personnelles, veuillez vous référer à notre Politique de Confidentialité." },
      { h: "Contact", p: "Pour toute demande de nature juridique, merci d'utiliser le formulaire disponible sur la page Contact." },
    ],
  },
};

export function LegalPage() {
  const { lang } = useI18n();
  const c = COPY[lang];
  return (
    <>
      <Header variant="compact" />
      <main className="bg-paper pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="font-editorial text-4xl md:text-5xl leading-[1.05] text-ink">{c.title}</h1>
          <p className="mt-6 text-ink/70 leading-relaxed">{c.intro}</p>
          <div className="mt-12 space-y-10">
            {c.sections.map((s) => (
              <section key={s.h}>
                <h2 className="font-editorial text-xl md:text-2xl text-teal">{s.h}</h2>
                <p className="mt-3 text-ink/75 leading-relaxed">{s.p}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const Route = createFileRoute("/legal")({
  head: () => buildSeo({ title: "Legal Notice — Eyegis", description: "Legal notice, website terms of use and publisher information for Eyegis.", path: "/legal" }),
  component: LegalPage,
});
