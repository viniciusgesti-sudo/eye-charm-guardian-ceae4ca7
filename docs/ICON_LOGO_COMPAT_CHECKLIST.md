# Eyegis — Icon & Logo Cross-Browser Compatibility Checklist

Aplicar em cada release. Testar em **Chrome (Blink), Safari (WebKit) e Firefox (Gecko)** — desktop e mobile (iOS Safari + Chrome Android).

Escopo: SVGs flat (lucide + custom em `EyegisGuard`, `LifestyleUniverse`, `TechCore`, `OurTechnology`, `HonestScience`, `FAQ`, `Header`, `Footer`) e o componente `Logo` (`src/components/eyegis/Logo.tsx`, incluindo variante `mask-image`).

---

## 1 · Estilo base dos ícones flat

- [ ] Todos os `<svg>` usam `stroke="currentColor"` e `fill="none"` (herda cor do parent).
- [ ] `stroke-width="1.5"` uniforme em toda UI (auditado em Jul/2026).
- [ ] `stroke-linecap="round"` e `stroke-linejoin="round"` — evita "cantos serrilhados" no Safari <16.
- [ ] `viewBox` explícito (não confiar em `width/height` só) — Firefox exige para escalar corretamente.
- [ ] Ícones com `aria-hidden="true"` quando decorativos; `role="img"` + `<title>` quando semânticos.
- [ ] Sem `filter: drop-shadow` em ícones críticos no Safari mobile (bug de repaint em iOS <17). Se precisar, aplicar no wrapper, não no `<svg>`.

## 2 · Logo (`<Logo />`)

- [ ] Wordmark em Montserrat 600, `letter-spacing: 0.32em` — checar fallback se Montserrat ainda não carregou (FOUT vs FOIT).
- [ ] Escudo via `mask-image: url(/favicon-dark.svg)` — testar:
  - [ ] Chrome/Edge: `mask-image` sem prefixo. ✅
  - [ ] Safari: requer `-webkit-mask-image` **e** `-webkit-mask-repeat: no-repeat`. Confirmar shorthand `mask` cobre ambos.
  - [ ] Firefox: suporte nativo desde 53; validar tamanho `mask-size: contain`.
- [ ] Cor do escudo herda de `currentColor` (via `background-color` do container mascarado).
- [ ] `variant="mono"` sobre fundos escuros (`text-paper`) E claros (`text-ink`) — contraste AA.
- [ ] `variant="color"` renderiza teal `#004B57` sem "washing out" no Safari (perfil de cor sRGB, não P3).
- [ ] Altura fixa `h-8`/`h-10` mantém `aspect-square` do escudo — nada distorce em Firefox (bug antigo de `aspect-ratio` em SVG inline).
- [ ] Preload do arquivo `/favicon-dark.svg` (usado como mask) em `__root.tsx` OU inline como data-URI para evitar FOUC no primeiro paint.

## 3 · Favicon adaptativo

- [ ] `<link rel="icon" type="image/svg+xml" href="/favicon-light.svg" media="(prefers-color-scheme: light)">` — Chrome ✅, Firefox ✅.
- [ ] Fallback `/favicon.ico` presente para Safari <16.4 (que ignora `media` em `<link rel="icon">`).
- [ ] `apple-touch-icon.png` 180×180 PNG opaco (Safari iOS não usa SVG).
- [ ] `theme-color` com par `media="(prefers-color-scheme: light|dark)"` — validar em Safari 15+ que aplica apenas a primeira regra sem media.
- [ ] Ícones maskable PWA (192/512) testados no Chrome Android → "Add to Home Screen" mostra escudo dentro do safe zone (círculo 80%).

## 4 · Estados de Hover

Cada componente interativo com ícone/logo:

- [ ] **Header/Nav links** — hover altera `color` do texto **e** do ícone (via `currentColor`) em transição < 200ms; sem "jump" no Safari (evitar `transform: scale` sem `will-change: transform`).
- [ ] **Botões com ícone (CTA "Comprar", setas →)** — hover `translate-x-1` na seta usa `transition-transform` (não `transition-all`, evita repaint do gradiente no Firefox).
- [ ] **Logo no Header** — hover apenas `opacity: 0.85` (sem escala) — mascara CSS não deve piscar no Safari.
- [ ] **Ícones em cards (`EyegisGuard`, `LifestyleUniverse`)** — hover no card muda cor do stroke; verificar herança via `group-hover:text-mint`.
- [ ] **FAQ accordion chevron** — rotação 180° suave; `transform-origin: center` explícito (Firefox default OK, Safari mobile precisa).
- [ ] **Focus-visible** presente em todos: outline 2px `--mint` com `offset-2`, respeitando `prefers-reduced-motion`.
- [ ] Sem `:hover` "pegado" em touch (iOS) — usar `@media (hover: hover)` para efeitos puramente visuais.

## 5 · Estados de Carregamento

- [ ] **Ícones lucide-react** — importados nomeados (tree-shake); nunca via `DynamicIcon` fora de rotas raramente usadas (evita layout shift).
- [ ] **Logo `<Logo />`** — reserva `aspect-square` + `h-*` fixo → **zero CLS** enquanto Montserrat carrega.
- [ ] **Font swap** — `font-display: swap` em Montserrat/Lato. Confirmar wordmark do logo não "salta" na troca (usar `size-adjust` no `@font-face` se necessário).
- [ ] **Preload crítico**: fontes Montserrat 600 e Lato 400 com `<link rel="preload" as="font" crossorigin>` — sem `crossorigin` o Firefox re-baixa.
- [ ] **Mask do escudo** — carregado como asset estático (não import dinâmico); pré-cachear via `<link rel="preload" as="image" href="/favicon-dark.svg">` no root se aparecer above-the-fold.
- [ ] **SVGs inline** (custom em `HonestScience`, `TechCore`) — nunca dentro de `React.lazy` sem `Suspense` fallback com `min-height` reservado.
- [ ] **Prefers-reduced-motion** — animações de stroke (`animate-pulse` no HUD do Hero) desligam via `motion-reduce:animate-none`.
- [ ] **Skeleton** — se algum ícone depende de dado async (badges de certificação), renderizar placeholder cinza `bg-ink/5` no mesmo tamanho.

## 6 · Casos específicos por browser

### Chrome / Edge (Blink)
- [ ] DevTools > Rendering > "Emulate CSS media prefers-color-scheme" → favicon e theme-color alternam.
- [ ] Lighthouse: Best Practices ≥ 95; sem warning de "Serves images with low resolution" no logo.

### Safari (WebKit) desktop + iOS
- [ ] `-webkit-mask` prefixado onde necessário.
- [ ] SVG stroke fino (1.5) não fica pixelado em Retina — testar `shape-rendering="geometricPrecision"` se preciso.
- [ ] Tap highlight removido em botões/logo: `-webkit-tap-highlight-color: transparent`.
- [ ] iOS 16-17: `backdrop-filter` no header (`backdrop-blur`) tem fallback sólido (`bg-paper/95`).
- [ ] `apple-touch-icon` aparece corretamente no "Adicionar à Tela Inicial".

### Firefox (Gecko)
- [ ] `mask-image` renderiza (Firefox 53+); testar em ESR mais antigo se suportado.
- [ ] `currentColor` propaga em SVGs aninhados dentro de `<button>` disabled (regressão histórica).
- [ ] Font-smoothing: aceitar diferença sutil (Firefox não expõe `-webkit-font-smoothing`).
- [ ] Sem uso de `zoom` (Firefox ignora); usar `transform: scale`.

## 7 · Ferramentas de validação

- [ ] Playwright cross-browser: `chromium`, `webkit`, `firefox` — snapshots de `/br`, `/br/men`, `/br/women`, `/br/kids`, `/br/technology`, header collapsed/expanded, hover em CTA principal.
- [ ] axe-core: 0 violações críticas em contraste de ícones sobre teal/paper.
- [ ] Lighthouse mobile em 3 rotas principais: performance ≥ 90, CLS < 0.05.
- [ ] BrowserStack (ou equivalente): Safari 16/17 iOS, Chrome Android 12+, Firefox 128+.
- [ ] Verificação manual de `prefers-color-scheme` alternado nos 3 browsers → favicon, theme-color e logo (se houver variante) respondem.

## 8 · Regressões conhecidas a monitorar

| Sintoma | Causa provável | Ação |
| --- | --- | --- |
| Escudo do logo some no Safari | `mask` sem prefixo `-webkit-` | Confirmar shorthand ou adicionar prefixo |
| Ícone lucide "pisca" no primeiro render | Import via `DynamicIcon` sem SSR | Trocar para import nomeado |
| Wordmark salta ao carregar Montserrat | Falta `size-adjust` no fallback | Ajustar `@font-face` local |
| Favicon dark não aparece no Safari | Safari <16.4 ignora `media` em `<link>` | Manter `.ico` como base |
| Hover "grudado" em iPad | `:hover` sem `@media (hover:hover)` | Envolver regra |
| CLS > 0.1 no header | Logo sem `aspect-square` reservado | Fixar `h-* w-auto aspect-square` |

---

**Owner:** Design System · **Última revisão:** Jul/2026 · **Próxima:** a cada release maior ou upgrade de lucide-react/Tailwind.
