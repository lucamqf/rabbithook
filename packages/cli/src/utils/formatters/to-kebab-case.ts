export function toKebabCase(str: string): string {
    let result = str.replace(/([A-Z])/g, "-$1").replace(/_/g, "-");

    if (result.startsWith("-")) {
      return result.substring(1).toLowerCase();
    }

    return result.toLowerCase();
}