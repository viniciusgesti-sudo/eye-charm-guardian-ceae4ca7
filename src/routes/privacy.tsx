import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { useI18n } from "@/i18n/context";
import type { Lang } from "@/i18n/translations";

const COPY: Record<Lang, { title: string; intro: string; sections: { h: string; p: string }[] }> = {
  EN: {
    title: "Privacy Policy",
    intro: "This page is maintained by the Eyegis team to describe how personal data is collected and handled on this website.",
    sections: [
      { h: "Data we collect on this site", p: "This website does not run user accounts or purchase flows. We only process the information you actively submit through the Contact form and analytics/consent choices you make through the cookie banner." },
      { h: "Cookies and analytics", p: "Non-essential cookies are only loaded after you give consent through the cookie banner. You can change or withdraw your consent at any time." },
      { h: "Amazon purchases", p: "All purchases take place on Amazon. Your account, order, payment and shipping data are handled directly by Amazon under their own privacy terms." },
      { h: "Your rights", p: "You can request access, correction or deletion of the personal data you have shared with us via the Contact page." },
    ],
  },
  PT: {
    title: "Política de Privacidade",
    intro: "Esta página é mantida pela equipe Eyegis para descrever como os dados pessoais são coletados e tratados neste site.",
    sections: [
      { h: "Dados coletados neste site", p: "Este site não possui contas de usuário nem fluxo de compra. Tratamos apenas as informações que você envia ativamente pelo formulário de Contato e as escolhas de analytics/consentimento feitas no banner de cookies." },
      { h: "Cookies e analytics", p: "Cookies não essenciais só são carregados após o seu consentimento no banner de cookies. Você pode alterar ou retirar o consentimento a qualquer momento." },
      { h: "Compras na Amazon", p: "Todas as compras acontecem na Amazon. Seus dados de conta, pedido, pagamento e entrega são tratados diretamente pela Amazon, segundo os termos de privacidade dela." },
      { h: "Seus direitos", p: "Você pode solicitar acesso, correção ou exclusão dos dados pessoais que compartilhou conosco pela página de Contato." },
    ],
  },
  FR: {
    title: "Politique de Confidentialité",
    intro: "Cette page est maintenue par l'équipe Eyegis pour décrire la manière dont les données personnelles sont collectées et traitées sur ce site.",
    sections: [
      { h: "Données collectées sur ce site", p: "Ce site ne propose pas de compte utilisateur ni de tunnel d'achat. Nous traitons uniquement les informations que vous transmettez via le formulaire de Contact et les choix d'analytics/consentement effectués via la bannière cookies." },
      { h: "Cookies et analytics", p: "Les cookies non essentiels ne sont chargés qu'après votre consentement via la bannière cookies. Vous pouvez modifier ou retirer votre consentement à tout moment." },
      { h: "Achats sur Amazon", p: "Tous les achats se font sur Amazon. Vos données de compte, de commande, de paiement et de livraison sont traitées directement par Amazon selon ses propres conditions de confidentialité." },
      { h: "Vos droits", p: "Vous pouvez demander l'accès, la correction ou la suppression des données personnelles partagées avec nous via la page Contact." },
    ],
  },
};

export function PrivacyPage() {
  const { lang } = useI18n();
  const c = COPY[lang];
  return (
    <>
      
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
      
    </>
  );
}

export const Route = createFileRoute("/privacy")({
  head: () => buildSeo({ title: "Privacy Policy — Eyegis", description: "How Eyegis collects and processes personal data on this website.", path: "/privacy" }),
  component: PrivacyPage,
});
