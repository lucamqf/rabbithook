import { homedir } from "os";
import path from "pathe";
import { findProjectRoot } from "./get-root-folder";
import { GLOBAL_CONFIG_DIR, GLOBAL_CONFIG_FILENAME, LOCAL_CONFIG_FILENAME } from "src/constants/config";

export async function getConfigFilePath(isGlobal: boolean): Promise<string> {
  if (isGlobal) {
    const globalConfigFileDir = path.join(homedir(), GLOBAL_CONFIG_DIR);
    const globalConfigFilePath = path.join(globalConfigFileDir, GLOBAL_CONFIG_FILENAME);

    return globalConfigFilePath;
  }

  const rootFolder = await findProjectRoot(process.cwd());
  const configPath = path.join(rootFolder, LOCAL_CONFIG_FILENAME);

  return configPath;
}