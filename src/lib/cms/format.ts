export function formatContentTemplate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{([A-Za-z0-9_-]+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : match,
  );
}
