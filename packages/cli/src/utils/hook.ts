import consola from "consola";
import { promises as fs } from "node:fs";
import { fetchRegistry } from "src/utils/registry";

export async function addHook(file: string, content: string): Promise<void> {
  const rawFileName = file.split('/').pop() ?? "";

  const fileName = rawFileName.replace(/\.\w+/gi, "")

  try {
    await fs.writeFile(file, content);
  } catch (err) {
    throw new Error(`Error adding ${fileName}.`);
  }
}

export async function fetchHook(name: string): Promise<string | null> {
  try {
    const response = await fetchRegistry<string>(name, true);

    return response;
  } catch (err: any) {
    if (err.status === 404) {
      return null;
    }
    
    throw new Error("Error fetching hook.")
  }
}