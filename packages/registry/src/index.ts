import express from "express";
import fs from 'fs';
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "hooks")));

app.get("/hooks", (req, res) => {
  const hooksPath = path.resolve(__dirname, "hooks");
  const rawHooks = fs.readdirSync(hooksPath);

  const hooks = rawHooks.map((hook) => hook.split('.')[0]);
  const uniqueHooks = [...new Set(hooks)];

  res.json(uniqueHooks);
});

app.listen(3000, () => console.log("Listening on port 3000."))