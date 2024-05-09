export function cleanDirectives(hookCode: string) {
  return hookCode.replace(/\/\/@\w+/gi, "")
}