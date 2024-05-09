import fs from "fs";

export function exists(path: string): boolean {
  return fs.existsSync(path);
}