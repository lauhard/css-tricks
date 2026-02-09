import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	kit: {
		adapter: adapter(),
		experimental: {
			remoteFunctions: true
		}
	},
	vitePlugin: {
		inspector:{
			toggleKeyCombo: 'alt-x',
			showToggleButton: 'always',
			toggleButtonPos: 'bottom-right'
		}
	},
	compilerOptions: {
		experimental: {
			async: true
		}
	},
	preprocess: vitePreprocess()
};

export default config;
