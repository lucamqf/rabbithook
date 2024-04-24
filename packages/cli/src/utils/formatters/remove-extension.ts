export function removeExtension(str: string) {
  return str.replace(/\.[^/.]+$/, "");
}