export function adjustHookImportPaths(hookCode: string) {
  const importRegex = /import\s+(.*?)\s+from\s+['"]\.\.\/(.*?)['"]/g;

  let updatedHookCode = hookCode;

  let match;

  while ((match = importRegex.exec(hookCode)) !== null) {
    const originalImport = match[0];
    const updatedImport = originalImport.replace(/\.\.\//g, "./");

    updatedHookCode = updatedHookCode.replace(originalImport, updatedImport);
  }

  return updatedHookCode;
}