import { promises as fs } from "node:fs";

export async function addHook(file: string, content: string): Promise<void> {
  const rawFileName = file.split('/').pop() ?? "";

  const fileName = rawFileName.replace(/\.\w+/gi, "")

  try {
    await fs.writeFile(file, content);
  } catch (err) {
    throw new Error(`Error adding ${fileName}.`);
  }
}