import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { wpDiagnosticsQueryOptions } from "@/lib/wpcms";

export const Route = createFileRoute("/cms-status")({
  head: () => ({
    meta: [
      { title: "Diagnóstico do CMS — Eyegis" },
      { name: "description", content: "Estado da conexão com o WordPress headless da Eyegis." },
      { name: "robots", content: "noindex,nofollow" },
      { property: "og:title", content: "Diagnóstico do CMS — Eyegis" },
      { property: "og:description", content: "Estado da conexão com o WordPress headless da Eyegis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CmsStatusPage,
});

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-2">
      <span className="font-sans text-[12px] uppercase tracking-wide text-ink/50">{label}</span>
      <span className="font-mono text-[13px] text-ink">{value}</span>
    </div>
  );
}

function CmsStatusPage() {
  const published = useQuery(wpDiagnosticsQueryOptions(false));
  const preview = useQuery(wpDiagnosticsQueryOptions(true));
  const d = published.data;

  return (
    <main className="min-h-screen bg-paper px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-ink/50">
          Eyegis · WordPress headless
        </p>
        <h1 className="mt-3 font-editorial text-4xl text-ink">Diagnóstico do CMS</h1>

        {published.isPending ? (
          <p className="mt-8 font-sans text-sm text-ink/60">Consultando o endpoint…</p>
        ) : !d ? (
          <p className="mt-8 font-sans text-sm text-ink/60">Sem resposta do diagnóstico.</p>
        ) : (
          <>
            <div
              className={`mt-8 rounded-lg border px-5 py-4 font-sans text-sm ${
                d.ok
                  ? "border-teal/30 bg-teal/5 text-teal"
                  : "border-red-400/40 bg-red-50 text-red-700"
              }`}
            >
              {d.ok
                ? "WordPress respondendo — conteúdo carregado com sucesso."
                : `WordPress indisponível: ${d.error ?? "erro desconhecido"} — o site segue com o conteúdo local.`}
            </div>

            <section className="mt-10">
              <h2 className="font-sans text-[12px] uppercase tracking-[0.2em] text-ink/50">
                Endpoint
              </h2>
              <div className="mt-3">
                <Row label="URL" value={d.endpoint} />
                <Row label="Status HTTP" value={d.status ? String(d.status) : "—"} />
                <Row label="Latência" value={`${d.latencyMs} ms`} />
                <Row label="Versão do payload" value={d.version ?? "—"} />
                <Row label="Gerado em" value={d.generatedAt ?? "—"} />
                <Row label="Token configurado" value={d.tokenConfigured ? "sim" : "não"} />
                <Row
                  label="Preview"
                  value={
                    preview.isPending
                      ? "verificando…"
                      : preview.data?.ok
                        ? `disponível (${preview.data.version ?? "—"})`
                        : `indisponível (${preview.data?.error ?? "—"})`
                  }
                />
                <Row label="Verificado em" value={d.checkedAt} />
              </div>
            </section>

            <section className="mt-10">
              <h2 className="font-sans text-[12px] uppercase tracking-[0.2em] text-ink/50">
                Mídias
              </h2>
              <div className="mt-3">
                <Row label="Itens em `media`" value={String(d.mediaCount)} />
                <Row label="Com URL preenchida" value={String(d.mediaWithUrl)} />
              </div>
            </section>

            <section className="mt-10">
              <h2 className="font-sans text-[12px] uppercase tracking-[0.2em] text-ink/50">
                Coleções carregadas ({d.documents.length})
              </h2>
              <div className="mt-3 grid gap-x-8 sm:grid-cols-2">
                {d.documents.map((doc) => (
                  <div
                    key={doc.key}
                    className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-2"
                  >
                    <span className="font-mono text-[13px] text-ink">{doc.key}</span>
                    <span className="font-sans text-[11px] uppercase tracking-wide text-ink/50">
                      {doc.languages.length > 0
                        ? doc.languages.join(" · ")
                        : `${doc.fieldCount} campos`}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-12 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  void published.refetch();
                  void preview.refetch();
                }}
                className="rounded-full border border-ink/20 px-5 py-2 font-sans text-[12px] uppercase tracking-wide text-ink hover:border-teal hover:text-teal"
              >
                Re-testar
              </button>
              <a
                href="/?wp_preview=1"
                className="rounded-full bg-teal px-5 py-2 font-sans text-[12px] uppercase tracking-wide text-paper"
              >
                Abrir site em modo preview
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
