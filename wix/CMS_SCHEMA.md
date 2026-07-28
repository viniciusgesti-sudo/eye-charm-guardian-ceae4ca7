# CMS Schema — SiteContent

Mapa de todas as chaves consumidas pelo frontend, os campos que cada uma
usa, e o fallback que aparece se a key estiver ausente/vazia.

Fields disponíveis na collection: `title`, `key`, `text`, `subtitle`,
`description`, `image`, `mobileImage`, `video`, `buttonText`, `buttonLink`,
`link`, `altText`, `order`, `active`.

## HOME (21 keys)

### home.hero.center — Manifesto central
| Campo | Uso no site |
|---|---|
| `title` | Eyebrow acima da manchete (ex: "Manifesto Eyegis") |
| `text` | H1 principal (headline) |
| `subtitle` | Manifesto abaixo (visível em desktop) |

### home.hero.men — Painel esquerdo
| Campo | Uso |
|---|---|
| `title` | Nome do produto ("Coleção Masculina") |
| `text` | Tag geográfica ("São Paulo · Noite") |
| `buttonText` | Label do CTA |
| `buttonLink` | URL de destino (ex: `/men`) |
| `image` | Imagem de fundo do painel (Wix Media ou URL) |
| `altText` | Alt da imagem |

### home.hero.women — Painel direito
Mesmos campos que `home.hero.men`.

### home.collection.men / home.collection.women / home.collection.kids
| Campo | Uso |
|---|---|
| `title` | Título do card |
| `subtitle` | Frase de posicionamento |
| `description` | Parágrafo curto |
| `buttonText` / `buttonLink` | CTA principal |
| `image` | Foto da coleção |

### home.collection.men.amazon / home.collection.women.amazon
| Campo | Uso |
|---|---|
| `buttonText` | Label CTA Amazon |
| `buttonLink` | URL Amazon completa |

### home.science
| Campo | Uso |
|---|---|
| `title` | "Honest Science™" |
| `subtitle` | Frase de suporte |
| `description` | Parágrafo |
| `buttonText` / `buttonLink` | CTA "Conhecer" → `/technology` |

### home.reviews.header
| Campo | Uso |
|---|---|
| `title` | Título da faixa de certificação |
| `subtitle` | Frase de contexto |

### home.reviews.1 / .2 / .3 — Selos de certificação
| Campo | Uso |
|---|---|
| `title` | Nome do laboratório/norma (ex: "ISO 12312-1") |
| `text` | Descrição curta |
| `image` | Logo do laboratório (opcional) |

### home.cta.amazon — Bloco final "Comprar na Amazon"
| Campo | Uso |
|---|---|
| `title` | Título grande |
| `buttonText` / `buttonLink` | CTA Amazon |

### home.sticky.bar — Barra inferior fixa
| Campo | Uso |
|---|---|
| `text` | Texto ("Frete grátis · Garantia 60 dias") |
| `buttonText` / `buttonLink` | CTA |

### home.lifestyle.1 … home.lifestyle.6 — 6 cenários da Universe
| Campo | Uso |
|---|---|
| `title` | Nome do cenário (Business, Creative, Gaming…) |
| `text` | Frase de contexto |
| `image` | Foto do cenário (Wix Media ou local) |

## Regras gerais

- **`active = false`** → a entrada é ignorada, fallback local aparece.
- **Campo vazio** → fallback local aparece (não quebra o site).
- **`image` (Wix Media)** → cole a imagem no campo Media do CMS; Wix
  devolve `wix:image://…`; o frontend converte automaticamente.
- **`image` (URL externa)** → cole qualquer HTTPS direto no campo.
- **`buttonLink`** aceita URLs internas (`/men`) ou externas
  (`https://amazon.com.br/…`).

## Como adicionar novas keys

1. Adicione a key no enum `CmsKey` de `src/lib/cms/types.ts`.
2. Adicione um fallback em `src/lib/cms/fallbacks.ts`.
3. Consuma no componente com `const c = useCms("nova.key")`.
4. Adicione a linha na collection Wix `SiteContent`.
5. Rebuild `bun run build:wix` e re-upload.

## Convenção de nomes

`{página}.{seção}.{índice ou nome}`

Exemplos:
- `home.hero.center`
- `home.collection.men.amazon`
- `men.lifestyle.1`
- `technology.chapter.3`

Manter minúsculas + pontos. Nunca hífens.
