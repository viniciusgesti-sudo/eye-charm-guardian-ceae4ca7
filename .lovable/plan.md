
# Plano: Eyegis editável no Wix (sem quebrar de novo)

## Por que as tentativas anteriores falharam

Testamos três caminhos e cada um bateu num limite real do Wix:

1. **Custom Element único (bundle standalone)** — arquivo passou de 25 MiB, Cloudflare/Wix não aceitam, e o CSS não herda dentro do Shadow DOM.
2. **Custom Element com code-splitting** — carrega, mas Wix não deixa editar textos/imagens dentro do elemento. Editor só vê "uma caixa preta".
3. **Vercel + Wix CMS via API** — funciona tecnicamente, mas o site continua hospedado fora do Wix, então o time de conteúdo edita no CMS Wix e não vê preview no Editor Wix. Além disso depende de `WIX_API_KEY` real (JWT `IST.`) que ainda não foi gerada.

Conclusão: **não existe um caminho onde 100% do site atual, do jeito que foi construído em React/Tailwind, seja editável dentro do Editor Wix arrastando textos e trocando imagens**. Precisa escolher o modelo certo pro objetivo.

## As 3 opções que realmente funcionam

### Opção A — Rebuild no Wix Editor (100% editável, esforço alto)
Reconstruir cada seção usando componentes nativos do Wix (Strip, Section, Repeater, Gallery). Textos e imagens ficam 100% editáveis por qualquer pessoa com acesso ao Editor.
- **Ganha:** edição nativa, multilíngue nativo, sem código, sem deploy.
- **Perde:** animações finas, o slider "com/sem", tipografia fluida com `clamp()`, e o polish do design system atual. Fica ~85% visual do atual.
- **Esforço:** 2–3 semanas de remontagem manual, seção por seção.

### Opção B — Híbrido: Wix Editor para conteúdo + Embeds HTML para seções técnicas (recomendado)
Divide o site em duas categorias:
- **Editável no Wix (nativo):** Header, Hero, Coleções, About, FAQ, Warranty, Shipping, Contact, Footer. Reconstruídos com componentes Wix. Textos/imagens editáveis por qualquer editor.
- **Embed HTML (fixo, visual premium):** EyegisGuard slider, Digital Eye Score, Honest Science, Spectrum Signature. Rodam como `<iframe>` a partir de um bundle pequeno hospedado (Vercel/Cloudflare). Texto desses blocos edita via Wix CMS (Collection SiteContent que já existe).
- **Ganha:** 90% do site editável direto no Editor, 10% técnico preservado no visual atual.
- **Perde:** dois lugares de edição (Editor pra maioria, CMS pra blocos técnicos).
- **Esforço:** 1–2 semanas.

### Opção C — Manter na Vercel, usar Wix só como CMS (o que já estava em andamento)
O que já estávamos construindo. Site continua React/Tailwind na Vercel. Editores mexem em textos/imagens pela Collection `SiteContent` no Wix.
- **Ganha:** visual 100% preservado, nada precisa ser refeito.
- **Perde:** editor não vê preview visual — edita campos numa tabela. Não é "arrastar no Editor Wix". Requer gerar `WIX_API_KEY` real e configurar Vercel.
- **Esforço:** 2–3 dias pra terminar (chave + refactor do fetcher + mapear todos os textos como campos CMS).

## Recomendação

**Opção B (híbrido)**, porque é o único caminho onde:
- Quem tem acesso ao Wix consegue editar textos/imagens de verdade, arrastando no Editor
- O visual premium das seções-assinatura (slider, spectrum, score) não é perdido
- Não depende de infra externa pro dia a dia editorial

## Passos concretos se aprovar Opção B

1. **Inventário editorial:** listar cada texto e imagem do site atual e marcar `wix-native` ou `embed-cms`. Entrego esse mapa como planilha.
2. **Setup do Wix (fase estrutura):**
   - Confirmar tema (cores/fontes já enviadas antes).
   - Criar as páginas: Home, Homem, Mulher, Kids, Tecnologia, Lentes, Sobre, Garantia, Envio, Contato, FAQ — em PT/EN/FR usando Wix Multilingual.
   - Criar Header e Footer globais no Wix.
3. **Reconstruir seções nativas (Wix Editor):** uma página por vez, começando pela Home. Cada Strip usa texto e imagem editáveis nativos.
4. **Preparar bundle de embeds:** extrair apenas os 4 blocos técnicos do repo atual em builds independentes, cada um <500 KB, hospedados na Vercel como rotas isoladas (ex: `/embed/guard`, `/embed/score`).
5. **Inserir cada embed via "HTML iframe" no Wix** apontando pra URL correspondente, com altura fixa.
6. **CMS Wix (Collection SiteContent) só pros textos dos embeds** — usar o data layer que já foi construído em `src/lib/cms/`.
7. **Publicar no domínio `eyegis-eyewear.com`** direto pelo Wix (o domínio passa a apontar pro Wix, Vercel some do fluxo público).

## Detalhes técnicos

- **Multilíngue:** Wix Multilingual traduz textos nativos automaticamente na UI do Editor. Embeds recebem locale via querystring (`?locale=br`) e o React lê isso.
- **CMS existente:** Collection `SiteContent` já criada, chave `WIX_API_KEY` (real, formato `IST.`) precisa ser gerada em Wix Dashboard → Settings → API Keys. Só usada pelos embeds.
- **Domínio:** transferir DNS pro Wix ou apontar registros conforme instruções do Wix. Vercel deixa de servir tráfego público.
- **O que não vai pro Wix:** rota `/dev-tokens`, scripts de bundle, testes de contraste — ficam no repo pra manutenção.

## O que preciso de você antes de começar

1. Confirmar Opção A, B ou C.
2. Se B: gerar `WIX_API_KEY` real (JWT `IST.`) no painel Wix e me passar via secret.
3. Confirmar que o domínio pode ser reapontado pro Wix quando o site estiver pronto.
