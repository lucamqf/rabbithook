import { highlight } from './../utils/highlight';
import { Command } from 'commander';
import path from 'path';
import { promises as fs } from 'fs';
import prompts from 'prompts';
import { getSrcFolderPath } from '../utils/get-source-folder';
import consola from 'consola';
import { colors } from 'consola/utils';
import { handleError } from 'src/utils/handle-error';

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
  
      const sourceFolder = await getSrcFolderPath(process.cwd());
  
      const config = {
        typescript: options.typescript ?? true,
        destination: options.folder ?? "hooks",
      };
  
      const configPath = path.join(sourceFolder, '..', 'hooks.json');
  
      await fs.writeFile(configPath, JSON.stringify(config, null, 2));
  
      consola.log(
        `${colors.green('Success!')} Project initialization completed.`,
      )
    } catch (error) {
      handleError(error)
    }
  })