import { Command } from "commander";
import consola from "consola";
import { existsSync } from "node:fs";
import ora from "ora";
import path from "pathe";
import prompts from "prompts";
import { EnCasings } from "src/config/casings";
import { hookDependencies } from "src/config/dependencies";
import { createFolder } from "src/utils/create-folder";
import { toKebabCase } from "src/utils/formatters";
import { removeExtension } from "src/utils/formatters/remove-extension";
import { readConfig } from "src/utils/get-config";
import { getExtension } from "src/utils/get-extension";
import { getSrcFolderPath } from "src/utils/get-source-folder";
import { handleError } from "src/utils/handle-error";
import { highlight } from "src/utils/highlight";
import { addHook, fetchHook, getCasedHookName } from "src/utils/hook";
import { replaceImportsToCasing } from "src/utils/hook/replace-imports-to-casing";

async function fetchAndAddHook({
  hookName,
  fileExtension,
  casing,
  outputFolder
}: { hookName: string, fileExtension: string, casing: EnCasings, outputFolder: string}) {
  const outputFile = path.join(outputFolder, `${hookName}.${fileExtension}`);

  const spinner = ora().start(`Fetching ${highlight(hookName)}...`);

  if (existsSync(outputFile)) {
    spinner.info(`${highlight(hookName)} already exists in your project. Skipping...`);

    return true;
  }

  const projectLevelHookName = toKebabCase(hookName)

  // const fetchedHook = await fetchHook(`${projectLevelHookName}/hook.${fileExtension}`);
  const fetchedHook = await fetchHook(`hook/${projectLevelHookName}.${fileExtension}`);

  if (!fetchedHook) {
    spinner.fail(`${highlight(hookName)} not found. Please check the name and try again.`);

    return false;
  }

  const hookWithCorrectImports = replaceImportsToCasing(fetchedHook, casing);

  await addHook(outputFile, hookWithCorrectImports);

  spinner.succeed(`${highlight(hookName)} added to the project!`);

  return true;
}

async function handleDependencies({
  hookName,
  fileExtension,
  casing,
  outputFolder
}: { hookName: string, fileExtension: string, casing: EnCasings, outputFolder: string }): Promise<boolean> {
  const projectLevelHookName = toKebabCase(hookName);
  const dependencies = hookDependencies[projectLevelHookName] ?? [];

  if (dependencies.length === 0) return true;

  const formatter = new Intl.ListFormat("en", { style: "long", type: "conjunction" });
  const dependencyNames = dependencies.map(dependency => `${getCasedHookName(dependency, casing)}.${fileExtension}`);
  const highlightedNames = formatter.format(dependencyNames.map(dep => highlight(removeExtension(dep))));

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
    const hookNameWithoutExtension = removeExtension(dependency);

    const isDependencyDependenciesHandledSuccessfully = await handleDependencies({ hookName: hookNameWithoutExtension, fileExtension, casing, outputFolder });

    if (!isDependencyDependenciesHandledSuccessfully) {
      return false;
    }

    const fetchedSuccessfully = await fetchAndAddHook({ hookName: hookNameWithoutExtension, fileExtension, casing, outputFolder });

    if (!fetchedSuccessfully) {
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
        const hookNameInCasing =  getCasedHookName(hook, config.casing);

        const dependenciesHandledSuccessfully = await handleDependencies({ hookName: hookNameInCasing, fileExtension, casing: config.casing, outputFolder });

        if (!dependenciesHandledSuccessfully) {
          consola.warn(`Skipping ${highlight(hookNameInCasing)} due to dependency issues.`);
          continue;
        }

        await fetchAndAddHook({ hookName: hookNameInCasing, fileExtension, casing: config.casing, outputFolder });
      }
    } catch (error: any) {
      handleError(error);
    }
  });