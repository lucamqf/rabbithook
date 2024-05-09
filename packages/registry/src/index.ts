import express from "express";
import { promises as fs } from "fs";
import path from "path";
import { adjustHookImportPaths } from "./utils/adjust-hook-import-paths";
import { removeExtension, toCamelCase } from "./utils/formatters";
import { cleanDirectives } from "./utils/clean-directives";
import { removeFirstEmptyLine } from "./utils/remove-first-empty-line";
import { readHook } from "./utils/read-hook";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "hooks")));

app.get("/hook/:hook", async (request, response) => {
  try {
    const hook = request.params.hook;

    const [hookName, extension] = hook.split(".");

    const file = await readHook(hookName, `index.${extension}`);

    const cleanedFile = removeFirstEmptyLine(cleanDirectives(adjustHookImportPaths(file)));

    response.setHeader("Content-Type", "text/plain");
    response.send(cleanedFile);
  } catch (error) {
    console.error(error);
    response.status(500).send("An error occurred while reading the file.");
    return;
  }
});

app.get("/hooks", async (_, response) => {
  const hooksPath = path.resolve(__dirname, "hooks");
  const rawHooks = await fs.readdir(hooksPath);

  const hooks = rawHooks.map((hook) => toCamelCase(removeExtension(hook)));

  response.json(hooks);
});

app.get("/doc/:hook", async (request, response) => {
  try {
    const hook = request.params.hook;

    const [hookName] = hook.split(".");

    const file = await readHook(hookName, "doc.md");

    response.setHeader("Content-Type", "text/plain");
    response.send(file);
  } catch (error) {
    console.error(error);
    response.send("")
  }
});

app.listen(3000, () => console.log("Listening on port 3000."))