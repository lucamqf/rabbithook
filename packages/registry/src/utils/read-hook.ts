import path from "path";
import { promises as fs } from "fs";

export async function readHook(hook: string, file: string): Promise<string> {
  const filePath = path.join(__dirname, "..", "hooks", hook, file);

  return fs.readFile(filePath, "utf8");
}