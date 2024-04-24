import { toKebabCase } from "./to-kebab-case";

export function toCamelCase(str: string): string {
  let kebab = toKebabCase(str);

  let spaced = kebab.replace(/-/g, ' ');

  let title = spaced.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  let result = title.replace(/ /g, '');
  result = result.charAt(0).toLowerCase() + result.slice(1);

  return result;
}