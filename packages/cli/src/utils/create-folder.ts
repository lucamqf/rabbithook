import path from "pathe";
import { existsSync, promises as fs } from "node:fs";

export async function createFolder(rootFolder: string, folderName: string): Promise<string> {
  const outputFolder = path.join(rootFolder, folderName);

  if (!existsSync(outputFolder)) {
    await fs.mkdir(outputFolder);
  }

  return outputFolder;
}