import { promises as fs } from "fs";
import path from "path";
import { exists } from "./exists";

export async function findProjectRoot(currentDir: string) {
  const packageJsonPath = path.join(currentDir, 'package.json');

  if (exists(packageJsonPath)) {
    const rawPackageJson = await fs.readFile(packageJsonPath, 'utf8')
    const packageJson = JSON.parse(rawPackageJson);

    if (packageJson.dependencies && (packageJson.dependencies.react || packageJson.dependencies.next)) {
      return currentDir;
    }

    throw new Error('Command must be ran in a React or Next.js project directory.')
  }

  const parentDir = path.resolve(currentDir, '..');
  
  if (parentDir !== currentDir) {
    return findProjectRoot(parentDir);
  }

  throw new Error('Could not find the root directory of a React or Next.js project');
}