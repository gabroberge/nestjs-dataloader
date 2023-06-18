import path from 'path';
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [swc.rollup(), swc.vite()],
	resolve: {
		alias: {
			'~': path.resolve(__dirname, 'src'),
		},
	},
	test: {},
});
