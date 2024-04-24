import { Command } from "commander";
import consola from "consola";
import ora from "ora";
import { highlight } from "src/utils/highlight";
import { fetchRegistry } from "src/utils/registry";

export const list = new Command()
  .name("list")
  .description("List available hooks")
  .action(async () => {
    const spinner = ora().start("Fetching hooks...")

    const hooks = await fetchRegistry<string[]>("hooks")

    const hooksList = hooks.map(hook => `• ${hook}`).join("\n");
    
    spinner.stop();
    consola.box(`${highlight("Available hooks:")}\n\n${hooksList}`);
  })