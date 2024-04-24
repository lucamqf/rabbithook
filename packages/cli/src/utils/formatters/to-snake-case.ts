export function toSnakeCase(str: string): string {
  let result = str.replace(/([A-Z])/g, "_$1").replace(/-/g, "_");

  if (result.startsWith("_")) {
    return result.substring(1).toLowerCase();
  }

  return result.toLowerCase();
}