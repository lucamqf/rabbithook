import { EnCasings } from "src/config/casings";
import { toCamelCase, toKebabCase, toSnakeCase } from "src/utils/formatters";

export function getCasedHookName(hook: string, casing: EnCasings) {
  const casingFormatterMap = {
    [EnCasings.CAMEL_CASE]: toCamelCase,
    [EnCasings.KEBAB_CASE]: toKebabCase,
    [EnCasings.SNAKE_CASE]: toSnakeCase,
  };

  const casingFormatter = casingFormatterMap[casing];

  if (!casingFormatter) return hook;

  return casingFormatter(hook);
}