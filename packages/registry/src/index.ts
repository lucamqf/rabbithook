import express from "express";
import { promises as fs } from 'fs';
import path from "path";
import { adjustHookImportPaths } from "./utils/adjust-hook-import-paths";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "hooks")));

app.get('/hook/:hook', async (request, response) => {
  try {
    const hook = request.params.hook;

    const [hookName, extension] = hook.split('.');

    const filePath = path.join(__dirname, 'hooks', hookName, `hook.${extension}`);

    const file = await fs.readFile(filePath, 'utf8');

    const fileWithFixedImports = adjustHookImportPaths(file);

    response.setHeader('Content-Type', 'text/plain');
    response.send(fileWithFixedImports);
  } catch (error) {
    console.error(error);
    response.status(500).send('An error occurred while reading the file.');
    return;
  }
});

app.get("/hooks", async (_, response) => {
  const hooksPath = path.resolve(__dirname, "hooks");
  const rawHooks = await fs.readdir(hooksPath);

  const hooks = rawHooks.map((hook) => hook.split('.')[0]);
  const uniqueHooks = [...new Set(hooks)];

  response.json(uniqueHooks);
});

app.listen(3000, () => console.log("Listening on port 3000."))