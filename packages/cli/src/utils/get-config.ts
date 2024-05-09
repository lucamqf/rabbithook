import { promises as fs } from "node:fs";
import { homedir } from "node:os";
import path from "pathe";
import { EnCasings } from "src/config/casings";
import { GLOBAL_CONFIG_DIR, GLOBAL_CONFIG_FILENAME, LOCAL_CONFIG_FILENAME } from "src/constants/config";
import { getPackageInfo } from "src/utils/get-package-info";
import { z } from "zod";
import { exists } from "./exists";
import { findProjectRoot } from "./get-root-folder";

const configSchema = z.object({
  typescript: z.boolean(),
  outputDir: z.string(),
  casing: z.enum([EnCasings.CAMEL_CASE, EnCasings.SNAKE_CASE, EnCasings.KEBAB_CASE]),
  next: z.boolean(),
  srcFolder: z.boolean(),
})

type IConfig = z.infer<typeof configSchema>;

export async function readConfig(): Promise<IConfig> {
  try {
    const rootFolder = await findProjectRoot(process.cwd());

    const localConfigPath = path.join(rootFolder, LOCAL_CONFIG_FILENAME);
    const globalConfigPath = path.join(homedir(), GLOBAL_CONFIG_DIR, GLOBAL_CONFIG_FILENAME);

    const packageInfo = await getPackageInfo();
    
    if (!exists(localConfigPath) && !exists(globalConfigPath)) {
      throw new Error(`Configuration file not found. Please run "npx ${packageInfo.name}@latest init" to create one.`)
    }

    const configPath = exists(localConfigPath) ? localConfigPath : globalConfigPath;

    const rawConfig = await fs.readFile(configPath, "utf8");
    
    const config = JSON.parse(rawConfig);

    const parsedConfig = configSchema.safeParse(config);

    if (!parsedConfig.success) {
      throw new Error("Invalid configuration file.");
    }

    return parsedConfig.data;
  } catch (error: any) {
    throw error;
  }
}