import { Command } from "commander";
import path from "pathe";
import { existsSync } from "node:fs";
import prompts from "prompts";
import consola from "consola";
import ora from 'ora';
import { highlight } from 'src/utils/highlight';
import { createFolder } from "src/utils/create-folder";
import { getExtension } from "src/utils/get-extension";
import { readConfig } from "src/utils/get-config";
import { getSrcFolderPath } from "src/utils/get-source-folder";
import { fetchHook, addHook } from "src/utils/hook";

const hookDependencies: Record<string, string[]> = {
  useHover: ["useEventListener"],
  useWindowSize: ["useEventListener"],
  useOnlineStatus: ["useEventListener"],
  useOrientation: ["useEventListener"],
  useLongPress: ["useEventListener", "useTimeout"],
  useFetch: ["useAsync"],
};

async function fetchAndAddHook(hookName: string, fileExtension: string, outputFolder: string) {
  const outputFile = path.join(outputFolder, `${hookName}.${fileExtension}`);
  const spinner = ora().start(`Fetching ${highlight(hookName)}...`);

  if (existsSync(outputFile)) {
    spinner.info(`${highlight(hookName)} already exists in your project. Skipping...`);

    return true;
  }

  const fetchedHook = await fetchHook(`${hookName}.${fileExtension}`);

  if (!fetchedHook) {
    spinner.fail(`${highlight(hookName)} not found. Please check the name and try again.`);

    return false;
  }

  await addHook(outputFile, fetchedHook);
  spinner.succeed(`${highlight(hookName)} added to the project!`);

  return true;
}

async function handleDependencies(
  hookName: string,
  fileExtension: string,
  outputFolder: string
): Promise<boolean> {
  const dependencies = hookDependencies[hookName] ?? [];

  if (dependencies.length === 0) return true;

  const formatter = new Intl.ListFormat("en", { style: "long", type: "conjunction" });
  
  const dependencyNames = dependencies.map((dep) => `${dep}.${fileExtension}`);
  const highlightedNames = formatter.format(dependencyNames.map((dep) => highlight(dep.split(".")[0])));

  const response = await prompts({
    type: "toggle",
    name: "installDependencies",
    message: `${highlight(hookName)} relies on the following hooks: ${highlightedNames}. Would you like to install them?`,
    initial: true,
    active: "yes",
    inactive: "no",
  });

  if (!response.installDependencies) return false;

  for (const dependency of dependencyNames) {
    if (!(await fetchAndAddHook(dependency.split(".")[0], fileExtension, outputFolder))) {
      return false;
    }
  }

  return true;
}

export const add = new Command()
  .name("add")
  .description("Add hook(s) to your project")
  .argument("[hooks...]", "The hook(s) to add")
  .action(async (hooks: string[]) => {
    try {
      const config = await readConfig();
      const fileExtension = getExtension(config.typescript);
      const userSrcFolder = await getSrcFolderPath(process.cwd());
      const outputFolder = await createFolder(userSrcFolder, config.destination);

      for (const hook of hooks) {
        if (!(await handleDependencies(hook, fileExtension, outputFolder))) {
          consola.warn(`Skipping ${highlight(hook)} due to dependency issues.`);
          continue;
        }

        await fetchAndAddHook(hook, fileExtension, outputFolder);
      }
    } catch (error: any) {
      consola.error(`An error occurred: ${error.message}`);
    }
  });