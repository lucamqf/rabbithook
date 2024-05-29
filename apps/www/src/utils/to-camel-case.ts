export function toCamelCase(text: string) {
  return text.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}