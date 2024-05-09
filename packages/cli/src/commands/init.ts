import { Command } from "commander";
import { colors } from "consola/utils";
import fs, { promises as promiseFs } from "fs";
import ora from "ora";
import path from "path";
import prompts from "prompts";
import { EnCasings } from "src/config/casings";
import { exists } from "src/utils/exists";
import { findProjectRoot } from "src/utils/get-root-folder";
import { handleError } from "src/utils/handle-error";
import { highlight } from "src/utils/highlight";

export const init = new Command()
  .name("init")
  .description("Initialize config file")
  .action(async () => {
    try {
      const options = await prompts([
        {
          type: "toggle",
          name: "typescript",
          message: `Would you like to use ${highlight("TypeScript")} (recommended)?`,
          initial: true,
          active: "yes",
          inactive: "no",
        },
        {
          type: "text",
          name: "outputDir",
          message: `Name of the ${highlight("directory")} where the hooks will be stored:`,
          initial: "hooks",
        },
        {
          type: "select",
          name: "casing",
          message: `Which ${highlight("casing")} would you like your hooks to be created with?`,
          choices: Object.values(EnCasings).map(casing => ({ title: casing, value: casing })),
          initial: 0,
        },
        {
          type: "toggle",
          name: "next",
          message: `Are you using ${highlight("Next.js")}?`,
          initial: false,
          active: "yes",
          inactive: "no",
        },
      ])

      let optionsWithNextConfig = { ...options } as typeof options & { srcFolder: boolean }

      if (options.next) {
        const nextOptions = await prompts([
          {
            type: "toggle",
            name: "srcFolder",
            message: `Are you using ${highlight('"src"')} folder?`,
            initial: true,
            active: "yes",
            inactive: "no",
          },
        ])

        optionsWithNextConfig = { ...options, ...nextOptions }
      }

      const config = {
        ...optionsWithNextConfig,
        srcFolder: optionsWithNextConfig.srcFolder ?? true,
      }

      const spinner = ora().start("Initializing...")

      const rootFolder = findProjectRoot(process.cwd());

      const configPath = path.join(rootFolder, "hooks.json");

      if (exists(configPath)) {
        const { overwrite } = await prompts([
          {
            type: "toggle",
            name: "overwrite",
            message: `Config file already exists. Would you like to ${highlight("overwrite")} it?`,
            initial: false,
            active: "yes",
            inactive: "no",
          },
        ])

        if (!overwrite) {
          spinner.fail("Project initialization aborted.");
          return;
        }
      }

      spinner.text = "Writing config file..."

      await promiseFs.writeFile(configPath, JSON.stringify(config, null, 2));

      spinner.succeed(`${colors.green("Success!")} Project initialization completed.`);
    } catch (error) {
      handleError(error)
    }
  })