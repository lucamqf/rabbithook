import { existsSync, promises as fs } from "node:fs";
import path from "pathe";
import { z } from "zod";
import { getSrcFolderPath } from "src/utils/get-source-folder";
import { getPackageInfo } from "src/utils/get-package-info";
import { EnCasings } from "src/config/casings";

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
    const sourceFolder = await getSrcFolderPath(process.cwd());

    const configPath = path.join(sourceFolder, "..", "hooks.json");
    
    const packageInfo = await getPackageInfo();

    if (!existsSync(configPath)) {
      throw new Error(`Configuration file not found. Please run "npx ${packageInfo.name}@latest init" to create one.`)
    }

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