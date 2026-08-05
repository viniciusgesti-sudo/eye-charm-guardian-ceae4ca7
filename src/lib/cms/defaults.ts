import type { ContentDocument, ContentDocuments } from "./types";

const contentModules = import.meta.glob("../../content/**/*.json", {
  eager: true,
  import: "default",
}) as Record<string, ContentDocument>;

export const defaultDocuments: ContentDocuments = Object.fromEntries(
  Object.entries(contentModules).map(([path, content]) => [documentKey(path), content]),
);

function documentKey(path: string): string {
  return path
    .replace(/^.*\/content\//, "")
    .replace(/\.json$/, "")
    .replace(/\//g, "-");
}
