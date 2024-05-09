#!/usr/bin/env node
import process from "node:process";
import { Command } from "commander";

import { add } from "src/commands/add";
import { init } from "src/commands/init";
import { list } from "src/commands/list";
import { info } from "src/commands/info";
import { getPackageInfo } from "src/utils/get-package-info";

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
  const packageInfo = await getPackageInfo();

  const program = new Command()
    .name("hookifier")
    .description("add hooks to your project")
    .version(
      packageInfo?.version || "1.0.0",
      "-v, --version",
      "display the version number",
    )

    program.addCommand(init).addCommand(add).addCommand(list).addCommand(info);

    program.parse();
}

main();