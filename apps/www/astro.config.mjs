import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import fs from "fs";
import path from 'path';
import { toCamelCase } from './src/utils/to-camel-case';

const hookFiles = fs.readdirSync(path.resolve("..", "..", "packages", "registry", "src", "hooks"));
const hooks = hookFiles ?? [];

export default defineConfig({
	integrations: [
		starlight({
			title: 'Rabbithook',
			social: {
				github: 'https://github.com/lucamqf/rabbithook',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						{ label: "Getting started", link: "/guides/getting-started" }
					]
				},
				{
					label: 'Hooks',
					items: hooks.map(hook => ({ label: toCamelCase(hook), link: `/hooks/${hook}` })),
				}
			],
		}),
	],
});
