import { highlight } from './../utils/highlight';
import { Command } from "commander";
import path from "pathe";
import { existsSync } from "node:fs";
import prompts from "prompts";
import { createFolder } from "../utils/create-folder";
import { getExtension } from "../utils/get-extension";
import { readConfig } from "../utils/get-config";
import { getSrcFolderPath } from "../utils/get-source-folder";
import { fetchHook, addHook } from "../utils/hook";
import consola from "consola";

const hookDependencies: Record<string, string[]> = {
  useHover: ["useEventListener"],
  useWindowSize: ["useEventListener"],
  useOnlineStatus: ["useEventListener"],
  useOrientation: ["useEventListener"],
}

export const add = new Command()
  .name('add')
  .description('add hook to your project')
  .argument('[hooks...]', 'the components to add')
  .action(async (hooks: string[]) => {
    try {
      const config = await readConfig();

      const fileExtension = getExtension(config.typescript);

      const userSrcFolder = await getSrcFolderPath(process.cwd());
      const outputFolder = await createFolder(userSrcFolder, config.destination);
      
      for (const hook of hooks) {
        const outputFile = path.join(outputFolder, `${hook}.${fileExtension}`);
  
        if (existsSync(outputFile)) {
          consola.info(`${highlight(hook)} already exists in your project. Skipping...`)
          continue;
        }

        const fetchedHook = await fetchHook(`${hook}.${fileExtension}`)
  
        if (!fetchedHook) {
          consola.error(`${highlight(hook)} not found. Please check the name and try again.`);
          continue;
        }
  
        const dependenciesInstalledSuccessfully = await handleDependencies(hook, fileExtension, outputFolder);

        if (!dependenciesInstalledSuccessfully) {
          consola.error(`Cannot install ${highlight(hook)} without dependencies. Skipping...`)

          continue;
        }
        
        await addHook(outputFile, fetchedHook);
      }
    } catch (error: any) {
      consola.error(error.message)
    }
  });

async function handleDependencies(hook: string, fileExtension: string, outputFolder: string) {
  let dependencies = hookDependencies[hook] ?? [];

  if (dependencies.length > 0) {
    const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });

    const dependantHooks = dependencies.map((dependency) => `${dependency}.${fileExtension}`).filter((dependency) => !existsSync(path.join(outputFolder, dependency)))

    if (dependantHooks.length > 0) {
      const dependenciesWithoutExtension = dependantHooks.map((dependency) => highlight(dependency.split('.')[0]));
      const dependenciesNames = formatter.format(dependenciesWithoutExtension);

      const options = await prompts([
        {
          type: 'toggle',
          name: 'canInstallDependencies',
          message: `${highlight(hook)} relies on the following hooks: ${dependenciesNames}. Would you like to install them?`,
          initial: true,
          active: 'yes',
          inactive: 'no',
        },
      ])

      if (!options.canInstallDependencies) {
        return false;
      }
      
      dependantHooks.forEach(async (dependency) => {
        const hookPath = path.join(outputFolder, dependency);
        
        if (!existsSync(hookPath)) {
          const hook = await fetchHook(dependency);
          
          if (hook) {
            await addHook(hookPath, hook);
          }
        }
      })

      return true;
    }
  }
}