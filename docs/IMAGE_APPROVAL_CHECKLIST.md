# Eyegis — Checklist de Aprovação de Imagens

Use este checklist antes de commitar **qualquer** nova imagem (produto, lifestyle, editorial, hero, card, thumbnail) ao catálogo. Uma imagem só entra em `src/assets/` quando **todos os itens obrigatórios** (🔴) passam. Itens 🟡 são recomendados; 🟢 são "nice-to-have".

---

## 1. Fidelidade de marca (🔴 bloqueadores)

- [ ] 🔴 **Emblema shield-G dourado** presente e legível na haste (produto). Sem versões deformadas, sem letras trocadas (nunca "C", "O", "Q").
- [ ] 🔴 **Engraving "EYEGIS · <SKU-CODE>"** correto na haste metálica quando visível (ex.: `LVR-T-CL`). Zero typos, zero caracteres invertidos.
- [ ] 🔴 **Marcação CE** presente quando a haste aparece em close-up.
- [ ] 🔴 **Zero logos de terceiros** visíveis: sem Apple, Nike, Ray-Ban, Gucci, marcas fictícias inventadas pelo modelo, packaging de outras casas.
- [ ] 🔴 **Zero texto acidental** em fundo (letreiros, placas, etiquetas com palavras inventadas). Exceção: engraving oficial do próprio SKU.
- [ ] 🔴 **Silhueta do frame** bate com a linha oficial do SKU:
  - Meridian → acetato preto slim + hastes douradas polidas
  - Solène → acetato + haste metálica dourada engraving
  - Marais → acetato preto retangular
  - Atelier → conforme referência mestre
- [ ] 🔴 **Paleta oficial** ao fundo: teal `#004B57`, champagne `#E2D1C3`, mint `#86D9D1`, obsidian `#1A1A2E`, ou neutros quentes (off-white, oak, linho). **Nunca** roxo/indigo cyberpunk, RGB gaming, verde neon.

## 2. Qualidade técnica (🔴 bloqueadores)

- [ ] 🔴 **Foco nítido** no emblema shield-G e no engraving da haste (100% zoom).
- [ ] 🔴 **Resolução mínima**: hero 1600px lado maior; card 1200px; thumbnail 640px.
- [ ] 🔴 **Ratio consistente**: produto isolado → 1:1 quadrado. Hero editorial → 4:5 ou 16:9. Nada cortado.
- [ ] 🔴 **Peso ≤ 300KB** após passar por `vite-imagetools` (AVIF/WebP). Se o source `.jpg` bruto > 500KB, re-encoda antes de commitar.
- [ ] 🔴 **Sem artefatos IA**: dedos/mãos deformados, lentes duplicadas, hastes assimétricas, reflexos impossíveis, olhos vazados.
- [ ] 🟡 **Unsharp Mask leve** aplicado para preservar legibilidade do micro-engraving.

## 3. Contexto e narrativa (🔴 para imagens de audiência)

- [ ] 🔴 **Audience-consistency**: imagem em `/men` só mostra homens; `/women` só mulheres; `/kids` só crianças/teens. Sem misturas por descuido.
- [ ] 🔴 **Zero clichês proibidos** (memória do projeto):
  - Sem microscópio literal na sessão de ciência.
  - Sem headset de call-center na Contact.
  - Sem RGB/LED roxo em gaming.
  - Sem HUD cyberpunk no hero.
  - Sem stock corporativo genérico.
- [ ] 🔴 **Diversidade autêntica** em imagens com pessoas (idade, etnia, contexto). Sem estereótipos.
- [ ] 🟡 **Iluminação Apple-keynote**: soft, direcional, com sombra sutil. Nada de flash frontal duro.
- [ ] 🟡 **Mood coerente** com a seção: PDP = editorial premium; Card = clean e-com; Lifestyle = cinematográfico.

## 4. Acessibilidade e integração (🔴 bloqueadores)

- [ ] 🔴 **Alt text descritivo** em i18n (`en/br/fr`) mencionando SKU, cor, ângulo e emblema quando visível. Ex.: *"Meridian eyewear — black acetate frame with polished gold temples and gold shield-G emblem, three-quarter view"*.
- [ ] 🔴 **`width` e `height` explícitos** no JSX para evitar CLS.
- [ ] 🔴 **`loading="lazy"`** em tudo below-the-fold. LCP hero fica eager + preload.
- [ ] 🔴 **`<Picture>` helper** com `?w=...&format=avif;webp;jpg&as=picture` — nunca importar `.jpg` cru fora de casos de fallback.
- [ ] 🟡 **Contraste AA** sobre a imagem se ela carrega texto por cima (score ≥ 4.5:1 no Header/CTA).

## 5. Governança (🔴 bloqueadores)

- [ ] 🔴 **Nome do arquivo** segue convenção: `<sku>-<slot>-<variant>.jpg` (produto) ou `<contexto>-<descricao>.jpg` (editorial). Kebab-case, sem espaços.
- [ ] 🔴 **Path correto**: produtos em `src/assets/products/`; editorial em `src/assets/`; nunca em `public/`.
- [ ] 🔴 **Sem duplicatas**: rode `rg <nome-base> src/` antes de adicionar. Reaproveitar um asset existente > gerar um novo.
- [ ] 🔴 **Todas as referências no código atualizadas** se o asset substitui um antigo (`rg -l <old-name> src/`).
- [ ] 🟡 **Registro no QA** (`src/routes/qa.tsx`) quando for troca before/after relevante.
- [ ] 🟢 **Fonte documentada**: prompt IA, referência do Drive, ou fotógrafo, anotado no PR.

## 6. Validação final (rodar sempre)

```bash
# 1. Build passa sem erros de asset faltando
bun run build:dev

# 2. Sem imports quebrados
rg "@/assets/" src/ | rg -v "\.jpg|\.png|\.svg|\.webp|\.avif"

# 3. Nenhum asset órfão (arquivo existe mas ninguém importa)
for f in src/assets/**/*.jpg; do
  name=$(basename "$f")
  rg -q "$name" src/ || echo "ORPHAN: $f"
done

# 4. Auditoria de contraste + alt text
bunx playwright test tests/visual-audit.spec.ts
```

---

## Definição de "pronto"

Uma imagem está **aprovada para catálogo** quando:
1. ✅ 100% dos 🔴 marcados.
2. ✅ Screenshot de comparação side-by-side com a referência oficial do SKU postado no PR.
3. ✅ Build passa + auditoria axe-core continua em 0 violações.
4. ✅ Pelo menos 2 dos 3 idiomas revisados no preview (`/en`, `/br`, `/fr`).

Reprovação em qualquer 🔴 = **regenerar ou substituir**. Nunca "aceitar com ressalva" imagens que falham em fidelidade de logo, engraving ou silhueta — são o núcleo da marca.
