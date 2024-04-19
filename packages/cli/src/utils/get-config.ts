import { existsSync, promises as fs } from "node:fs";
import path from "pathe";
import { z } from "zod";
import { getSrcFolderPath } from "./get-source-folder";
import { getPackageInfo } from "./get-package-info";

const configSchema = z.object({
  typescript: z.boolean(),
  destination: z.string(),
})

type IConfig = z.infer<typeof configSchema>;

export async function readConfig(): Promise<IConfig> {
  try {
    const sourceFolder = await getSrcFolderPath(process.cwd());

    const configPath = path.join(sourceFolder, '..', 'hooks.json');
    
    const packageInfo = await getPackageInfo();

    if (!existsSync(configPath)) {
      throw new Error(`Configuration file not found. Please run 'npx ${packageInfo.name}@latest init' to create one.`)
    }

    const rawConfig = await fs.readFile(configPath, 'utf8');
    
    const config = JSON.parse(rawConfig);

    const parsedConfig = configSchema.safeParse(config);

    if (!parsedConfig.success) {
      throw new Error('Invalid configuration file.');
    }

    return parsedConfig.data;
  } catch (error: any) {
    throw error;
  }
}