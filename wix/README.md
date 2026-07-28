# Eyegis × Wix — Integração

Integração oficial do frontend Eyegis (React + Vite + TanStack Start) com o
site Wix do cliente. Reutiliza 100% dos componentes visuais aprovados sem
reconstruir nada no Wix Editor.

## Arquitetura

```
┌────────────────────────────────────────────────────────────────┐
│ Site Wix (Editor clássico + Dev Mode / Velo)                   │
│                                                                │
│  Página HOME  ──►  <eyegis-app page="home" locale="br">       │
│  Página MEN   ──►  <eyegis-app page="men"  locale="br">       │
│  Página …     ──►  <eyegis-app page="…"    locale="…">        │
│                              │                                 │
│                              ▼                                 │
│  Velo (Home.js) fetch backend/site-content.jsw ──► SiteContent │
│                              │                                 │
│                              ▼                                 │
│  window.__EYEGIS_CMS__ = { "home.hero.men": {...}, ... }       │
│  wix-seo-frontend.setTitle / setDescription / setStructured    │
│                              │                                 │
│                              ▼                                 │
│  <eyegis-app> (Custom Element, Web Component real no DOM)      │
│      ├── carrega eyegis-bundle.js + eyegis-bundle.css (CDN)   │
│      ├── mount React + CmsProvider + I18n                     │
│      └── renderiza a árvore de componentes da página escolhida │
└────────────────────────────────────────────────────────────────┘
```

**Uma URL Wix real por página** (não SPA) → Google indexa cada URL como
página nativa Wix. `wix-seo-frontend` popula title/description/JSON-LD no
HTML servido pelo SSR do Wix (antes do JS do bundle rodar). Zero hack, zero
texto oculto.

## O que é editável pelo cliente (via Wix CMS)

Todos os campos da collection `SiteContent`:
- `text`, `title`, `subtitle`, `description`, `buttonText`, `buttonLink`
- `image`, `mobileImage`, `video`, `altText`, `link`
- `active` (toggle liga/desliga)
- `order` (ordenação)

## O que NÃO é editável (fica em código, como pedido)

- Layout, CSS, tipografia, breakpoints
- Animações, transições, hovers
- Estrutura de componentes
- Sistema de design

## Arquivos criados

```
wix/
├── entry.tsx                   # Registro <eyegis-app>
├── EyegisApp.tsx               # Seletor de página (home/men/women/…)
├── I18nProviderStandalone.tsx  # Provider i18n sem TanStack Router
├── vite.config.wix.ts          # Build isolado do bundle
├── shims/
│   └── router.tsx              # Shim TanStack Router → <a> + hooks stub
├── velo/
│   ├── masterPage.js           # Boot global (site inteiro)
│   ├── pages/
│   │   ├── Home.js             # Velo — Home (completo, com SEO)
│   │   └── _TEMPLATE_page.js   # Base para Men/Women/Kids/…
│   └── backend/
│       └── site-content.jsw    # Query SiteContent server-side
├── README.md                   # (este arquivo)
├── INSTALL.md                  # Passo-a-passo no Wix (5 passos)
└── CMS_SCHEMA.md               # Mapa de todas as keys esperadas

src/lib/cms/
├── index.ts                    # Barrel
├── types.ts                    # CmsEntry, CmsKey, CmsMap
├── context.tsx                 # <CmsProvider>, useCms()
├── fallbacks.ts                # Fallback local por key (site nunca quebra)
└── image.ts                    # Resolver wix:image:// → https://static.wixstatic.com
```

## Arquivos modificados

- `src/routes/__root.tsx` — envolve o app com `<CmsProvider>` (fallbacks
  ativos, comportamento atual preservado 100%).
- `src/components/eyegis/Hero.tsx` — POC: consome `home.hero.*` do CMS
  com fallback para o dicionário i18n local.
- `package.json` — script `bun run build:wix`.

Nada mais foi tocado. Design, rotas e experiência TanStack seguem idênticos.

## Como funciona (fluxo completo)

1. **Cliente edita** um card no CMS `SiteContent` (ex: `home.hero.men` →
   troca a imagem, altera CTA).
2. **Wix salva** no banco. Nenhum deploy necessário.
3. **Próximo pageload**, `Home.js` (Velo) chama
   `backend/site-content.jsw:getContentForPage('home')`, que devolve o
   dicionário `{ "home.hero.men": {…}, "home.hero.women": {…}, … }`.
4. Velo escreve `window.__EYEGIS_CMS__ = {…}` **antes** do bundle rodar
   e chama `wix-seo-frontend.setTitle(…)` — o HTML servido ao Google já
   contém título, descrição e JSON-LD atualizados.
5. `<eyegis-app>` monta, `<CmsProvider value={window.__EYEGIS_CMS__}>`
   distribui os dados, cada componente pega o que precisa via
   `useCms("home.hero.men")`.
6. Se qualquer campo estiver vazio → fallback local do
   `src/lib/cms/fallbacks.ts`. Site nunca quebra.

## SEO — estratégia oficial

- **Meta tags per-page**: `wix-seo-frontend.setTitle/Description/OG` em
  cada `pages/*.js` do Velo, alimentados pelos campos do CMS. Renderizado
  no HTML servidor.
- **JSON-LD**: `wix-seo-frontend.setStructuredData([{type, children}])`.
- **URLs limpas**: `/`, `/men`, `/women`… (Wix nativo).
- **Sitemap**: gerado automaticamente pelo Wix.
- **Multilíngue**: URLs `/en/men`, `/fr/men` via Wix Multilingual — cada
  variante recebe title/description no idioma correto.

## Multilíngue

- Wix Multilingual ativa `/pt-br`, `/en`, `/fr` como URLs nativas.
- `Home.js` lê `wix-window.multilingual.currentLanguage` e passa no
  atributo `locale` do Custom Element.
- Dentro do bundle, `I18nProviderStandalone` sincroniza o `useI18n()`
  existente. Todos os componentes que já usam `t("nav.men")` continuam
  funcionando.

## Imagens — fluxo

O CMS aceita 2 fontes:

1. **Wix Media Manager** — cliente arrasta imagem no CMS → Wix devolve
   `wix:image://v1/abc123~mv2.jpg/hero.jpg#…`. O resolver em
   `src/lib/cms/image.ts` converte para
   `https://static.wixstatic.com/media/abc123~mv2.jpg`.
2. **URL externa** — cola qualquer https diretamente no campo.
3. **Vazio** → fallback local (`/hero-*.jpg` do bundle).

`wixImageAt(url, width)` gera variantes responsivas usando o serviço de
imagem oficial do Wix.

## Comandos

```bash
# Desenvolvimento normal (nada muda, TanStack + fallbacks)
bun run dev

# Build do bundle Wix (produz dist-wix/eyegis-bundle.{js,css})
bun run build:wix

# Ver conteúdo servido pelo Velo em dev (via console do Wix Preview)
console.log(window.__EYEGIS_CMS__)
```

## Riscos e limitações conhecidos

1. **CSS global do bundle**: `eyegis-bundle.css` aplica reset/tokens
   Tailwind. Em Wix isso pode afetar elementos nativos Wix da MESMA
   página (Header/Footer que o cliente eventualmente adicionar).
   **Mitigação**: manter Header/Footer 100% dentro do Custom Element
   (não usar componentes nativos Wix na mesma página).
2. **Fontes**: bundle importa Google Fonts via `<link>` em `styles.css`.
   Se o Wix bloquear domínios externos, precisa mudar para @font-face
   self-hosted.
3. **Tamanho do Custom Element no Editor**: o Wix Editor mostra o
   Custom Element como uma caixa vazia. Definir altura mínima
   generosa (ex: 3000px) no painel de tamanho — no runtime o React
   controla a altura real.
4. **Hot reload**: mudanças no bundle exigem re-upload do JS/CSS no
   CDN. Solução: automatizar via GitHub Actions (ver `INSTALL.md`).
5. **Custom Element roda client-side**: LCP inicial é levemente pior
   que uma página Wix 100% nativa. Compensado por SEO server-side via
   `wix-seo-frontend`.

## Próximos passos (fora do escopo desta POC)

- CI GitHub Actions publicando `dist-wix/` no CDN a cada push.
- Página Men/Women/Kids ativando os componentes de coleção via `page`
  attribute (a base já está pronta em `EyegisApp.tsx`).
- Editor Wix: adicionar Custom Element em `/men`, `/women`, `/kids`
  seguindo o mesmo padrão da Home.

Veja **INSTALL.md** para os 5 passos manuais no Wix.
