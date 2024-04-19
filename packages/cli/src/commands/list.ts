import { highlight } from './../utils/highlight';
import { Command } from "commander";
import consola from "consola";
import { fetchRegistry } from "src/utils/registry";

export const list = new Command()
  .name("list")
  .description("List available hooks")
  .action(async () => {
    const hooks = await fetchRegistry<string[]>("hooks")

    const hooksList = hooks.map(hook => `• ${hook}`).join("\n");
    
    consola.box(`${highlight('Available hooks:')}\n\n${hooksList}`);
  })