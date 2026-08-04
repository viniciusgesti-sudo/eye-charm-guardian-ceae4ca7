import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "@babel/parser";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const sources = [
  ["src/components/eyegis/AboutPage.tsx", "CONTENT", "about-details"],
  ["src/components/eyegis/ComingSoonModal.tsx", "COPY", "coming-soon"],
  ["src/components/eyegis/CompliancePage.tsx", "COPY", "compliance"],
  ["src/components/eyegis/ContactPage.tsx", "COPY", "contact"],
  ["src/components/eyegis/CookieBanner.tsx", "COPY", "cookie-banner"],
  ["src/components/eyegis/EyegisGuard.tsx", "COPY", "technology-guard"],
  ["src/components/eyegis/FAQ.tsx", "COPY", "home-faq"],
  ["src/components/eyegis/FAQPage.tsx", "CONTENT", "faq-page"],
  ["src/components/eyegis/Footer.tsx", "FOOTER_COPY", "footer"],
  ["src/components/eyegis/Footer.tsx", "TRUST_COPY", "footer-trust"],
  ["src/components/eyegis/HonestScienceTeaser.tsx", "COPY", "home-honest-science"],
  ["src/components/eyegis/HowItWorks.tsx", "COPY", "home-how-it-works"],
  ["src/components/eyegis/LegalPage.tsx", "COPY", "legal"],
  ["src/components/eyegis/OurTechnology.tsx", "TECH_HERO_COPY", "technology-overview"],
  ["src/components/eyegis/PrivacyPage.tsx", "COPY", "privacy"],
  ["src/components/eyegis/ShippingPage.tsx", "CONTENT", "shipping"],
  ["src/components/eyegis/SpectrumSignature.tsx", "COPY", "technology-spectrum"],
  ["src/components/eyegis/TrustStrip.tsx", "COPY", "trust-strip"],
  ["src/components/eyegis/Universe.tsx", "UNIVERSE_COPY", "home-universe"],
  ["src/components/eyegis/VsGenerics.tsx", "COPY", "product-comparison"],
  ["src/components/eyegis/WarrantyPage.tsx", "CONTENT", "warranty"],
  ["src/routes/product.meridian.tsx", "CONTENT", "product-meridian-page"],
];

const SKIP = Symbol("skip");

for (const [relativeFile, constantName, documentName] of sources) {
  const filename = path.join(repoRoot, relativeFile);
  const source = fs.readFileSync(filename, "utf8");
  const ast = parse(source, { sourceType: "module", plugins: ["typescript", "jsx"] });
  const initializer = findInitializer(ast.program.body, constantName);
  if (!initializer) throw new Error(`Could not find ${constantName} in ${relativeFile}`);

  const content = evaluateNode(initializer);
  if (content === SKIP) throw new Error(`Could not serialize ${constantName} in ${relativeFile}`);

  const destination = path.join(repoRoot, "src", "content", `${documentName}.json`);
  fs.writeFileSync(destination, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  console.log(`Generated ${path.relative(repoRoot, destination)} from ${constantName}`);
}

function findInitializer(body, constantName) {
  for (const statement of body) {
    if (statement.type !== "VariableDeclaration") continue;
    for (const declaration of statement.declarations) {
      if (declaration.id.type === "Identifier" && declaration.id.name === constantName) {
        return declaration.init;
      }
    }
  }
}

function evaluateNode(node) {
  if (!node) return SKIP;

  if (
    node.type === "TSAsExpression" ||
    node.type === "TSSatisfiesExpression" ||
    node.type === "TypeCastExpression" ||
    node.type === "ParenthesizedExpression"
  ) {
    return evaluateNode(node.expression);
  }

  if (node.type === "StringLiteral" || node.type === "NumericLiteral" || node.type === "BooleanLiteral") {
    return node.value;
  }
  if (node.type === "NullLiteral") return null;
  if (node.type === "TemplateLiteral" && node.expressions.length === 0) {
    return node.quasis.map((part) => part.value.cooked ?? part.value.raw).join("");
  }
  if (node.type === "UnaryExpression" && ["+", "-"].includes(node.operator)) {
    const value = evaluateNode(node.argument);
    if (typeof value !== "number") return SKIP;
    return node.operator === "-" ? -value : value;
  }
  if (node.type === "BinaryExpression" && node.operator === "+") {
    const left = evaluateNode(node.left);
    const right = evaluateNode(node.right);
    if (left === SKIP || right === SKIP) return SKIP;
    return left + right;
  }
  if (node.type === "ArrayExpression") {
    return node.elements.map((element) => {
      const value = evaluateNode(element);
      return value === SKIP ? {} : value;
    });
  }
  if (node.type === "ObjectExpression") {
    const output = {};
    for (const property of node.properties) {
      if (property.type !== "ObjectProperty" || property.computed) continue;
      const key = property.key.type === "Identifier" ? property.key.name : property.key.value;
      const value = evaluateNode(property.value);
      if (value !== SKIP) output[key] = value;
    }
    return output;
  }

  return SKIP;
}
