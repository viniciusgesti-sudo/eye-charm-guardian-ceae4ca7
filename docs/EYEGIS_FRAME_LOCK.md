# Eyegis Frame Lock — Padrão de Fidelidade de Imagem

> ⚠️ **REVISÃO CRÍTICA (Jul/2026):** especificação anterior estava incorreta ("round-square + tint mint"). As referências reais do brand (Google Drive `15CVC4aFoRWPK…`) mostram silhueta **cat-eye/soft-square** com **lente champagne quente** — não mint. Este documento agora reflete o produto real.

Todo hero, banner ou retrato editorial DEVE usar o mesmo "brand lock" ao ser gerado ou re-editado. Nunca alterar composição, pose, cenário, luz ou enquadramento — apenas garantir a armação e as lentes autênticas Eyegis.

## Especificação canônica (produto real)

- **Silhueta:** acetato **cat-eye suave / soft-square** com upsweep leve nos cantos externos. Espessura média-fina.
- **Variantes de cor (as duas oficiais):**
  - **Preto brilhante** (glossy black acetate) — modelo Meridian (masculino/unissex). Pode ter **braço superior do templo em metal dourado fino** (estilo Persol).
  - **Tortoise / leopard cognac** (amber–brown mesclado) — modelo Solène / Clarity (feminino).
- **Emblema:** pequeno **shield-G dourado** discreto na face externa do templo, próximo à dobradiça. Nunca centralizado, nunca grande, nunca estampado no aro/ponte.
- **Lentes:** **tint champagne / âmbar quente muito sutil** com leve camada anti-reflexo (blue-light coating dá um leve highlight azul-violeta na luz oblíqua). **Nunca mint, nunca teal, nunca espelhadas, nunca laranja forte.**
- **Proporção:** rosto legível, sobrancelhas parcialmente visíveis acima do aro.
- **Packaging (quando aparecer):** caixa slide champagne-cream com logo shield-G + "EYEGIS" e "PARIS – SÃO PAULO" em coral/peach, interior kraft-laranja, pouch microfibra off-white com cordão.

## Prompt canônico (copiar e colar)

Use como `prompt` em `imagegen--edit_image` sobre o asset existente:

```
Replace ONLY the eyewear on the subject with authentic Eyegis frames:
soft cat-eye / soft-square acetate silhouette with a subtle upsweep,
either glossy black acetate (Meridian) OR amber tortoise/leopard (Solène),
small discreet gold shield-G emblem on the OUTER TEMPLE near the hinge (never on the front),
subtle warm champagne / light amber tint on the lenses with a faint anti-reflective coating.
Keep face, pose, wardrobe, background, lighting, color grading, composition
and framing 100% identical. Do NOT recompose, do NOT change crop, do NOT
alter the scene. Editorial premium finish, photorealistic.
```

## Regras de uso

1. **Sempre prefira `edit_image`** sobre `generate_image` para heros existentes — preserva composição e luz.
2. **Nunca** mencione: aviator, wireframe, round wire, RGB, gaming, oakley, ray-ban, mirrored, mint tint, teal tint.
3. **Nunca** peça troca de cenário no mesmo prompt — separe em duas passadas.
4. **Validação obrigatória** após gerar: confirmar (a) silhueta cat-eye suave, (b) shield-G dourado discreto lateral, (c) tint champagne quente, (d) cor preto brilhante OU tortoise.
5. **Produto real como fonte de verdade:** para PDPs, coleção e heros de produto puro, usar **as fotos oficiais** salvas em `src/assets/product-*-hero.jpg` (Solène e Meridian) em vez de gerar via IA.

## Novos assets (a partir de agora)

Sempre iniciar o prompt do novo asset com o bloco `[FRAME LOCK]`:

```
[FRAME LOCK] Subject wears authentic Eyegis frames: soft cat-eye / soft-square
acetate silhouette (glossy black Meridian OR tortoise/leopard Solène),
small discreet gold shield-G emblem on the outer temple near the hinge,
subtle warm champagne lens tint with faint AR coating.

[SCENE] <descrição da cena, pose, luz, enquadramento aqui>
```
