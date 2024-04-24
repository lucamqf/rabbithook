export function getExtension(isTypescript: boolean): string {
  return isTypescript ? "ts" : "js";
}