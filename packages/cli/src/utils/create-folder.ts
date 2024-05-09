import { existsSync, promises as fs } from "node:fs";

export async function createDir(dir: string): Promise<string> {
  if (!existsSync(dir)) {
    await fs.mkdir(dir);
  }

  return dir;
}