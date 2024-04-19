import { Command } from 'commander';
import path from 'path';
import { promises as fs } from 'fs';
import prompts from 'prompts';
import consola from 'consola';
import { colors } from 'consola/utils';
import ora from "ora";
import { handleError } from 'src/utils/handle-error';
import { highlight } from 'src/utils/highlight';
import { getSrcFolderPath } from 'src/utils/get-source-folder';

export const init = new Command()
  .name("init")
  .description("Initialize config file")
  .action(async () => {
    try {
      const options = await prompts([
        {
          type: 'toggle',
          name: 'typescript',
          message: `Would you like to use ${highlight("TypeScript")} (recommended)?`,
          initial: true,
          active: 'yes',
          inactive: 'no',
        },
        {
          type: 'text',
          name: 'folder',
          message: `Name of the ${highlight("folder")} where the hooks will be stored:`,
          initial: 'hooks',
        },
      ])
      
      const spinner = ora().start("Initializing...")

      const sourceFolder = await getSrcFolderPath(process.cwd());
  
      const config = {
        typescript: options.typescript ?? true,
        destination: options.folder ?? "hooks",
      };
  
      const configPath = path.join(sourceFolder, '..', 'hooks.json');
      
      spinner.text = "Writing config file..."
      await fs.writeFile(configPath, JSON.stringify(config, null, 2));
      
      spinner.stop();
      consola.log(
        `${colors.green('Success!')} Project initialization completed.`,
      )
    } catch (error) {
      handleError(error)
    }
  })