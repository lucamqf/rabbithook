import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import fs from "fs";
import path from 'path';

const hooks = fs.readdirSync(path.resolve("..", "..", "packages", "registry", "src", "hooks"));

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
					items: (hooks ?? []).map(hook => ({ label: hook, link: `/guided/${hook}` })),
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
