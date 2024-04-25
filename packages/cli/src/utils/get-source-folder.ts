import { promises as fs } from "node:fs";
import path from "pathe";

export async function getSrcFolderPath(localPath: string): Promise<string> {
  const withinSrcFolder = localPath.includes("src");

  if (!withinSrcFolder) {
    const files = await fs.readdir(localPath);

    if (files.includes("src")) {
      return path.join(localPath, "src");
    }

    throw new Error("You must be within the source of your project");
  }

  const isSrcFolder = localPath.split("src")[1].length === 0;

  if (isSrcFolder) {
    return localPath;
  }

  return path.join(localPath.split("src")[0], "src");
}