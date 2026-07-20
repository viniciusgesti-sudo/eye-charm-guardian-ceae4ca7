# Eyegis Frame Lock — Padrão de Fidelidade de Imagem

Todo hero, banner ou retrato editorial DEVE usar o mesmo "brand lock" ao ser gerado ou re-editado. Nunca alterar composição, pose, cenário, luz ou enquadramento — apenas garantir a armação e as lentes autênticas Eyegis.

## Especificação canônica (sempre a mesma)

- **Armação:** acetato matte black, silhueta round-square, espessura média, acabamento fosco (sem brilho plástico).
- **Emblema:** pequeno shield-G dourado (gold) visível na dobradiça do templo (lateral). Discreto, não estampado.
- **Lentes:** tint mint/teal muito sutil, com leve camada anti-reflexo. Nunca espelhadas, nunca coloridas fortes, nunca amarelo/laranja.
- **Proporção:** mantém o rosto legível, sobrancelhas parcialmente visíveis acima do aro.

## Prompt canônico (copiar e colar)

Use como `prompt` em `imagegen--edit_image` sobre o asset existente:

```
Replace ONLY the eyewear on the subject with authentic Eyegis frames:
matte black acetate round-square silhouette (medium thickness, fully matte finish),
small gold shield-G emblem visible on the temple hinge,
subtle mint/teal tint on the lenses with faint anti-reflective coating.
Keep face, pose, wardrobe, background, lighting, color grading, composition
and framing 100% identical. Do NOT recompose, do NOT change crop, do NOT
alter the scene. Editorial premium finish, photorealistic.
```

## Regras de uso

1. **Sempre prefira `edit_image`** sobre `generate_image` para heros existentes — preserva composição e luz.
2. **Nunca** mencione formatos proibidos: aviator, wireframe, tortoise, cat-eye, RGB, gaming, oakley, ray-ban.
3. **Nunca** peça troca de cenário no mesmo prompt — separe em duas passadas se precisar.
4. **Validação obrigatória** após gerar: confirmar (a) silhueta round-square, (b) shield-G dourado visível, (c) tint mint sutil. Se qualquer item falhar, re-editar com o mesmo prompt (o modelo converge em 1–2 iterações).
5. **Assets cobertos por este lock** (P0 + P1, todos ✅ atualizados):
   - Heros: `hero-zenith-man.jpg`, `hero-clarity-woman.jpg`, `hero-saopaulo-eyegis.jpg`, `hero-paris-eyegis.jpg`, `life-student.jpg`
   - Lifestyle: `life-business.jpg`, `life-travel.jpg`, `life-gaming.jpg`, `life-creative.jpg`
   - Coleções/Personas: `collection-men.jpg`, `collection-women.jpg`, `persona-executive.jpg`, `models-focus-eyegis.jpg`

## Novos assets (a partir de agora)

Sempre iniciar o prompt do novo asset com o bloco `[FRAME LOCK]`:

```
[FRAME LOCK] Subject wears authentic Eyegis frames: matte black acetate
round-square silhouette, small gold shield-G emblem on the temple hinge,
subtle mint/teal lens tint with faint AR coating.

[SCENE] <descrição da cena, pose, luz, enquadramento aqui>
```

Isso mantém 100% de consistência visual da marca em toda a operação de geração.
