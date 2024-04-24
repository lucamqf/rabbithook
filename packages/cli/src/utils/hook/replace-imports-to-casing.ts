import { EnCasings } from "src/config/casings";
import { getCasedHookName } from "./get-cased-hook-name";

export function replaceImportsToCasing(hookCode: string, casing: EnCasings): string {
  const importRegex = /import\s+((?:[\w*\s{},]*)\s+from\s+)?([\'\"])(.*?)\2/g;

  let updatedHookCode = hookCode;

  let match;
  while ((match = importRegex.exec(hookCode)) !== null) {
    const originalImport = match[0];
    const importedModule = match[3];

    if (importedModule.startsWith('./')) {
      const originalHookName = importedModule.slice(2);
      const updatedHookName = getCasedHookName(originalHookName, casing);
      const updatedImport = originalImport.replace(`./${originalHookName}`, `./${updatedHookName}`);

      updatedHookCode = updatedHookCode.replace(originalImport, updatedImport);
    }
  }

  return updatedHookCode;
}