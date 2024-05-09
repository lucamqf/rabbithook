import { Command } from "commander";
import consola from "consola";
import ora from "ora";
import { toKebabCase } from "src/utils/formatters";
import { handleError } from "src/utils/handle-error";
import { highlight } from "src/utils/highlight";
import { fetchHook } from "src/utils/hook";

export const info = new Command()
  .name("info")
  .description("Returns the information about a hook")
  .argument("hooks", "The hooks to get information about")
  .action(async (hook: string) => {
    try {
      const spinner = ora().start("Searching for hook...")

      const hookName = toKebabCase(hook);

      const doc = await fetchHook(`doc/${hookName}`);

      if (!doc) {
        spinner.info(`No information found for hook ${highlight(hook)}.`);
        return;
      }

      spinner.stop();

      consola.box(doc);
    } catch (error: any) {
      handleError("");
    }
  });