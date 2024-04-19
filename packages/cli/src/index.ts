#!/usr/bin/env node
import process from "node:process";
import { Command } from "commander";

import { add } from "./commands/add";
import { init } from "./commands/init";
import { list } from "./commands/list";
import { getPackageInfo } from "./utils/get-package-info";

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

async function main() {
  const packageInfo = await getPackageInfo();

  const program = new Command()
    .name("hookifier")
    .description("add hooks to your project")
    .version(
      packageInfo?.version || '1.0.0',
      '-v, --version',
      'display the version number',
    )

    program.addCommand(init).addCommand(add).addCommand(list);

    program.parse();
}

main();