# Eyegis × Wix CMS

The Eyegis website (Lovable + TanStack Start) reads its editable content from
a Wix CMS collection called **`SiteContent`**. Design, layout, animations,
and code live in this repository. Textos, imagens e CTAs vivem no Wix.

---

## 1. Arquitetura

```
Browser
   ↓
Lovable frontend (TanStack Start · SSR)
   ↓
loader in src/routes/__root.tsx
   ↓
createServerFn — src/lib/cms/cms.functions.ts
   ↓
src/lib/cms/wix.server.ts        (SERVER ONLY — never bundled to the client)
   ↓
Wix Data API — POST https://www.wixapis.com/wix-data/v2/items/query
   ↓
Collection `SiteContent` (segmento LIVE)
```

**Nunca** a API Key do Wix trafega para o navegador. O único lugar onde ela
é lida é dentro do handler de `getSiteContentFn`, no runtime edge do Lovable.

Site alvo:

- Nome: **Eyegis**
- Site ID: `fd7d4ce1-76de-49ab-8bdf-8a3c5425cced`
- URL: <https://www.eyegis-eyewear.com/>

---

## 2. Collection `SiteContent`

Coleção única, chave-valor, com uma linha por bloco editorial do site.

| Campo         | Tipo    | Uso pelo frontend                                                                 |
| ------------- | ------- | --------------------------------------------------------------------------------- |
| `key`         | Text    | **Obrigatório.** Identificador estável (ex: `home.hero.center`).                  |
| `title`       | Text    | Somente rótulo administrativo (aparece no Wix, **nunca** na UI).                  |
| `text`        | Text    | Texto principal / headline.                                                       |
| `subtitle`    | Text    | Eyebrow, tag, subtítulo curto.                                                    |
| `description` | Text    | Parágrafo longo.                                                                  |
| `buttonText`  | Text    | Rótulo do CTA.                                                                    |
| `buttonLink`  | Text    | URL do CTA (rota interna `/men` ou externa `https://…`).                          |
| `image`       | Image   | URL Wix Media (`wix:image://…`) — renderizado via `resolveImageUrl`.              |
| `mobileImage` | Image   | Variante mobile opcional.                                                         |
| `altText`     | Text    | Texto alternativo da imagem (aceita também `alttext` — grafia legada).            |
| `video`       | Text    | URL de vídeo opcional.                                                            |
| `order`       | Number  | Ordem em listas.                                                                  |
| `active`      | Boolean | `false` esconde o registro do frontend sem apagar do CMS.                         |

---

## 3. Chaves em produção (21)

Todas na página HOME. Podem ser expandidas seguindo o mesmo padrão `page.section.slot`.

```
home.hero.center                home.reviews.header
home.hero.men                   home.reviews.1..3
home.hero.women                 home.cta.amazon
home.collection.men             home.sticky.bar
home.collection.men.amazon      home.lifestyle.1..6
home.collection.women           home.science
home.collection.women.amazon
home.collection.kids
```

A tabela completa com valores atuais está em `src/lib/cms/fallbacks.ts`.

---

## 4. Como editar conteúdo

1. Acesse o Wix Editor de <https://www.eyegis-eyewear.com/>.
2. Menu esquerdo → **CMS** → **SiteContent**.
3. Clique no registro pela coluna `title` (ex: `Hero Center`).
4. Edite `text`, `subtitle`, `description`, `buttonText`, `buttonLink`.
5. **Salvar** e **Publicar**.
6. Aguarde ~5 minutos (cache do TanStack Query) ou force reload no site.

O site **nunca** exibe o campo `title` — use-o livremente como rótulo interno.

### Trocar uma imagem

1. Registro no Wix → campo `image` → **Media Manager** → Upload/selecionar.
2. Confirme que a imagem entra como `wix:image://…` (a integração converte
   automaticamente para URL `https://static.wixstatic.com/media/…`).
3. Preencha `altText` para acessibilidade.
4. Opcional: envie uma variante otimizada para mobile em `mobileImage`.
5. Salvar → Publicar.

**IMPORTANTE:** se o campo `image` ficar vazio, a imagem local original do
projeto é usada (fallback), sem quebrar layout.

### Adicionar conteúdo repetível

Ex: um 7º card de lifestyle:

1. No CMS `SiteContent`, **+ Add Item**.
2. `key` = `home.lifestyle.7`
3. Preencha `text`, `altText`, `image`, `order` = `22`.
4. Adicione a chave ao enum `CmsKey` em `src/lib/cms/types.ts` e um fallback
   em `src/lib/cms/fallbacks.ts` (uma linha).
5. Consuma no componente com `useCms("home.lifestyle.7")`.

---

## 5. Data layer no código

- **`src/lib/cms/wix.server.ts`** — fetcher isolado (nunca vai ao cliente).
- **`src/lib/cms/cms.functions.ts`** — `getSiteContentFn` (server fn) +
  `siteContentQueryOptions` (React Query).
- **`src/lib/cms/context.tsx`** — `<CmsProvider>` + `useCms(key)`.
- **`src/lib/cms/fallbacks.ts`** — texto/imagem local para cada chave.
- **`src/lib/cms/image.ts`** — resolve URLs `wix:image://…` para
  `static.wixstatic.com` e gera variantes de largura.
- **`src/routes/__root.tsx`** — `loader` faz `ensureQueryData` na raiz;
  `<CmsHydrator>` alimenta o `<CmsProvider>` com o mapa.

### Fluxo de fallback

```
useCms("home.hero.women")
  → CmsContext (Wix data)
      → mergeEntry(local, remote)
          → pruneEmpty(remote)  ← campos vazios do Wix somem
          → local  ← fica valendo o fallback
```

Se Wix responder erro/timeout/permissão, o handler devolve `{}` e o site
opera 100% com fallbacks. **Sem single point of failure visual.**

---

## 6. Cache

- React Query — `staleTime: 5 min`, `gcTime: 30 min`.
- SSR pré-hidrata o cache no loader do `__root`, então o primeiro paint já
  contém o conteúdo do CMS (sem CLS).
- Após publicar no Wix, o site atualiza automaticamente em até 5 min ou
  imediatamente após um refresh forçado.

---

## 7. Segurança

- `WIX_API_KEY` — segredo do connector Wix. Injetado apenas em
  `process.env` no runtime edge. **Nunca** exposto ao navegador.
- `LOVABLE_API_KEY` — mesma coisa, para autenticar no Gateway.
- Nenhuma credencial em `.env` versionado, `localStorage` ou variável Vite
  (`VITE_*`).
- Todo tráfego passa pelo gateway TLS `connector-gateway.lovable.dev`.

---

## 8. Troubleshooting

| Sintoma                                 | Causa provável                                     | Ação                                                 |
| --------------------------------------- | -------------------------------------------------- | ---------------------------------------------------- |
| Alteração no Wix não aparece no site    | Cache do React Query (5 min)                       | Aguardar 5 min ou hard-refresh (`Ctrl/Cmd+Shift+R`). |
| Registro exibe texto antigo             | Não foi publicado no Wix                           | Confirme "Publish" no editor Wix.                    |
| Layout mostra imagem antiga             | Campo `image` do Wix vazio → usa fallback local.   | Suba a imagem no campo `image` e publique.           |
| Console mostra `[CMS] Wix query failed` | Wix indisponível / permissão / API Key inválida    | Site continua com fallbacks. Rechecar conexão Wix.   |
| Regressão visual repentina              | Provavelmente removeu conteúdo obrigatório do Wix  | Reactive `active` = true no registro.                |

---

## 9. Arquivos legados (arquitetura anterior)

Mantidos por referência histórica, **não usados** pela integração atual:

- `wix/entry.tsx`
- `wix/vite.config.wix.ts`
- `wix/EyegisApp.tsx`
- `wix/Home.js`, `wix/site-content.jsw`
- `.github/workflows/wix-bundle-pages.yml`
- `dist-wix/` (build artefato)

Podem ser removidos com segurança após validação em produção da nova
arquitetura CMS. Nada no runtime atual os importa.

---

## 10. Validando Wix → Lovable

1. No Wix CMS, altere `home.reviews.header.text` de `4.8` para `4.9`.
2. Publique.
3. Aguarde 5 min ou faça hard-refresh em `/br`, `/en`, `/fr`.
4. A avaliação exibida na home muda para `4.9`.
5. **Reverta** o valor para `4.8` no CMS.

Se qualquer etapa falhar, cheque os logs do servidor por `[CMS] Wix`.
