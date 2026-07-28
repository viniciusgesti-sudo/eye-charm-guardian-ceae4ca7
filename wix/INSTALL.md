# Instalação no Wix — HOME (POC)

Passo-a-passo para conectar a Home. Depois da Home funcionar, replica-se
o mesmo padrão nas outras páginas.

## Pré-requisitos

- Wix Editor clássico
- Dev Mode / Velo **ligado** (menu `Dev Mode > Turn on Dev Mode`)
- Wix Multilingual instalado (PT-BR principal, EN + FR secundários)
- Collection `SiteContent` já criada com os 21 registros da Home ✅

## Passo 1 — Build local

Na raiz deste projeto:

```bash
bun install
bun run build:wix
```

Isso gera:

```
dist-wix/eyegis-bundle.js    (~350 KB gzip)
dist-wix/eyegis-bundle.css   (~40 KB gzip)
```

## Passo 2 — Hospedar os 2 arquivos em HTTPS público

Escolha UMA das opções:

**Opção A — Wix Media Manager** (mais simples, mas cache agressivo)
1. No Editor: `Media > Upload Media > Site Files`
2. Suba `eyegis-bundle.js` e `eyegis-bundle.css`
3. Clique em cada arquivo → botão `Get File URL`
4. Anote as URLs (algo como `https://static.wixstatic.com/shapes/…`)

**Opção B — GitHub Pages / Cloudflare R2 / Netlify** (recomendado)
- Publique a pasta `dist-wix/` como site estático.
- Anote a URL final `https://<cdn>/eyegis-bundle.js`.
- Vantagem: rebuild automático via GitHub Actions.

## Passo 3 — Adicionar o Custom Element na HOME

1. Abra a **página Home** no Wix Editor.
2. Botão `+ Add Elements` → `Embed Code` → **Custom Element**.
3. Arraste para a página. Uma caixa vazia aparece.
4. Clique na caixa → painel lateral `Settings`:
   - **Source**: `Server URL`
   - **Server URL**: cole a URL do `eyegis-bundle.js` do Passo 2
   - **Tag name**: `eyegis-app`
5. Ainda no painel lateral → `Properties Panel` → ID: renomeie para
   `eyegisApp` (fica `#eyegisApp` no código).
6. Ajuste o tamanho no Editor:
   - Largura: **100% da página** (edge-to-edge)
   - Altura: **3000 px** (o React ajusta a altura real em runtime)
7. Pin to full-width (ícone de âncora → `Stretch to full width`).

## Passo 4 — Colar o código Velo

1. Painel esquerdo do Editor → `Backend + Public`.
2. `Backend` → botão `+ Add File` → tipo **web module** → nome
   `site-content.jsw`.
3. Cole o conteúdo de `wix/velo/backend/site-content.jsw` deste repo.
4. `Pages` → clique em **Home** → ícone `<>` no rodapé → cole o
   conteúdo de `wix/velo/pages/Home.js` deste repo.
5. `Pages` → **Site (topo)** → `masterPage` → cole
   `wix/velo/masterPage.js`.
6. Salvar tudo.

## Passo 5 — Testar

1. Botão **Preview** (canto superior direito).
2. A Home deve renderizar exatamente igual ao preview atual.
3. Abra DevTools → Console:
   - Deve aparecer `[eyegis-app] custom element registered`
   - Rode `console.log(window.__EYEGIS_CMS__)` — deve ver o objeto
     com as 21 keys.
4. Edite um card no CMS `SiteContent` (ex: `home.hero.center` → mude
   o campo `text`) → salve → recarregue a Preview → o texto muda.
5. Verificar SEO:
   - `view-source:` na Preview → procurar `<title>` e
     `<meta name="description">` → devem refletir o CMS.
   - `<script type="application/ld+json">` presente no `<head>`.

## Adicionar outras páginas

Para cada página Wix (`/men`, `/women`, `/kids`, `/technology`,
`/lenses`, `/about`, `/faq`, `/contact`):

1. Passo 3 idêntico (mesmo `eyegis-bundle.js`, mesmo tag).
2. Copie `wix/velo/pages/_TEMPLATE_page.js` no code panel da página e
   troque a constante `PAGE_ID` para o nome da página.
3. Salvar.

O mesmo bundle serve todas as páginas — nenhum rebuild necessário.

## Multilíngue

Uma vez que Wix Multilingual esteja ativo, `Home.js` já lê o idioma
atual via `wix-window.multilingual.currentLanguage`. As URLs `/en/`,
`/fr/` funcionam automaticamente. As traduções vêm de:

1. Textos do CMS (você mantém 3 versões da mesma key, uma por idioma
   — Wix Multilingual permite tradução por linha).
2. Fallback: dicionário `src/i18n/translations.ts` do bundle.

## Rebuild após mudanças de código

```bash
bun run build:wix
```

- **Opção A (Media Manager)**: substitua o arquivo (mesmo nome →
  substituir; Wix mantém a URL).
- **Opção B (GitHub Pages/R2)**: push → deploy automático.

Depois: hard-refresh do Wix Preview (`Ctrl+Shift+R`).

## Troubleshooting

| Sintoma | Causa | Solução |
|---|---|---|
| Custom Element aparece vazio | Bundle não carregou (CORS/404) | Abra a URL do bundle no navegador — deve retornar JS |
| Console: "custom element registered" mas nada renderiza | ID errado no Velo (`$w('#eyegisApp')`) | Renomear Custom Element ID para `eyegisApp` |
| Texto do CMS não aparece | `active` = false ou `key` errada | Ver `wix/CMS_SCHEMA.md` |
| Imagens não aparecem | URL Wix Media não convertida | Já tratado por `resolveImageUrl()` — abra console para logs |
| Fontes erradas | Wix bloqueando Google Fonts | Ver seção "Riscos" do `wix/README.md` |
| Layout quebra elementos nativos Wix | CSS global do bundle | Não usar elementos nativos Wix na mesma página do Custom Element |

## Comandos úteis (Console do navegador)

```js
// Ver todo o CMS injetado
console.table(Object.values(window.__EYEGIS_CMS__));

// Forçar re-render sem reload
window.dispatchEvent(new CustomEvent('eyegis:cms-updated'));

// Trocar página em runtime (para teste)
document.querySelector('eyegis-app').setAttribute('page','men');
```
