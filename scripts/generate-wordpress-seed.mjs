import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = path.join(repoRoot, "src", "content");
const pluginRoot = path.join(repoRoot, "wordpress-plugin", "eyegis-headless-content");
const mediaFile = path.join(contentRoot, "media.json");
const seedFile = path.join(pluginRoot, "seed-content.json");

const media = collectMediaOverrides();
fs.writeFileSync(mediaFile, `${JSON.stringify(media, null, 2)}\n`, "utf8");

const documents = walkJson(contentRoot)
  .map((file) => {
    const relative = path.relative(contentRoot, file).replaceAll(path.sep, "/");
    const key = relative.replace(/\.json$/i, "").replaceAll("/", "-");
    return {
      key,
      title: titleFor(key),
      content: JSON.parse(fs.readFileSync(file, "utf8")),
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));

fs.mkdirSync(pluginRoot, { recursive: true });
fs.writeFileSync(
  seedFile,
  `${JSON.stringify({ schema_version: 4, documents }, null, 2)}\n`,
  "utf8",
);

console.log(
  `Generated ${path.relative(repoRoot, mediaFile)} with ${Object.keys(media).length} media entries.`,
);
console.log(
  `Generated ${path.relative(repoRoot, seedFile)} with ${documents.length} content documents.`,
);

function collectMediaOverrides() {
  const sourceFiles = walk(repoRoot)
    .filter((file) => /\.(?:ts|tsx)$/i.test(file))
    .filter((file) => file.includes(`${path.sep}src${path.sep}`));
  const assets = new Map();
  const pattern = /@\/assets\/([^"'?]+?\.(?:avif|webp|png|jpe?g))(?=[?"'])/gi;

  for (const file of sourceFiles) {
    const source = fs.readFileSync(file, "utf8");
    for (const match of source.matchAll(pattern)) {
      const assetPath = match[1];
      if (assetPath.startsWith("brand/")) continue;
      const parsed = path.posix.parse(assetPath);
      const key = parsed.name;
      if (key === "foo") continue;
      if (assets.has(key)) continue;
      assets.set(key, {
        label: humanize(parsed.name),
        match: parsed.name,
        url: "",
        mobileUrl: "",
        alt: "",
      });
    }
  }

  return Object.fromEntries([...assets.entries()].sort(([a], [b]) => a.localeCompare(b)));
}

function walkJson(root) {
  return walk(root).filter((file) => file.endsWith(".json"));
}

function walk(root) {
  if (!fs.existsSync(root)) return [];
  const output = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) output.push(...walk(fullPath));
    else output.push(fullPath);
  }
  return output;
}

function titleFor(key) {
  const titles = {
    about: "Página — Sobre",
    "about-details": "Página — Sobre · Seções completas",
    collection_comp: "Seção — Coleções",
    "coming-soon": "Global — Modal Em breve",
    compliance: "Página — Conformidade",
    contact: "Página — Contato",
    "cookie-banner": "Global — Banner de cookies",
    faq: "Página e seção — FAQ",
    "faq-page": "Página — FAQ · Conteúdo completo",
    footer: "Global — Rodapé",
    "footer-trust": "Global — Faixa de confiança do rodapé",
    global: "Configurações globais",
    home: "Página — Inicial",
    "home-faq": "Inicial — FAQ",
    "home-honest-science": "Inicial — Chamada Honest Science",
    "home-how-it-works": "Inicial — Como funciona",
    "home-universe": "Inicial — Universo Eyegis",
    "honest-science": "Tecnologia — Honest Science completa",
    kids: "Página — Kids",
    legal: "Página — Aviso legal",
    lenses: "Lentes — Resumo",
    lenses_page: "Página — Lentes",
    lifestyle: "Seção — Lifestyle",
    media: "Biblioteca — Imagens do site",
    men: "Página — Homem",
    privacy: "Página — Privacidade",
    "products-meridian": "Produto — Meridian",
    "product-comparison": "Produto — Comparativo Eyegis",
    "product-meridian-page": "Produto — Meridian · Página completa",
    "products-atelier-page": "Produto — Atelier · Página completa",
    "products-marais-page": "Produto — Marais · Página completa",
    "products-solene-page": "Produto — Solene · Página completa",
    shipping: "Página — Envio e devoluções",
    shoponamazon: "Seção — Loja Amazon",
    translations: "Textos — Menu e navegação",
    "technology-guard": "Tecnologia — EyegisGuard",
    "technology-overview": "Tecnologia — Visão geral",
    "technology-spectrum": "Tecnologia — Espectro interativo",
    "trust-strip": "Inicial — Faixa de certificações",
    warranty: "Página — Garantia",
    whatsinthebox: "Seção — O que vem na caixa",
    women: "Página — Mulher",
  };
  return titles[key] ?? humanize(key);
}

function humanize(value) {
  return value
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
