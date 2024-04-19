import { promises as fs } from 'fs'
import { fileURLToPath } from 'node:url'
import path from 'pathe'
import { z } from 'zod'

const packageJsonSchema = z.object({
  version: z.string(),
  name: z.string(),
})

type IPackageJson = z.infer<typeof packageJsonSchema>

export async function getPackageInfo(): Promise<IPackageJson> {
  try {
    const packageJsonPath = getPackageFilePath('../package.json')
  
    const file = await fs.readFile(packageJsonPath, "utf8");

    const parsedFile = JSON.parse(file);

    const parsedPackageJson = packageJsonSchema.parse(parsedFile);
  
    return parsedPackageJson;
  } catch (error: any) {
    throw new Error("Error getting package info")
  }
}

function getPackageFilePath(filePath: string) {
  const distPath = fileURLToPath(new URL('.', import.meta.url))

  return path.resolve(distPath, filePath)
}