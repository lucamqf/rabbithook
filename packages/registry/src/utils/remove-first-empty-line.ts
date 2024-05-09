export function removeFirstEmptyLine(code: string) {
  return code.replace(/^\s*\n/, '');
}