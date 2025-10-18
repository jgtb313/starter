import path from 'path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},

	test: {
		include: [
			'**/*.test.{js,ts,jsx,tsx}',
		],
		coverage: {
			include: [
				'src/**/*.service.{js,ts}',
				'src/**/*.strategy.{js,ts}',
			],
			exclude: [
				'node_modules',
				'**/*.test.{js,ts,jsx,tsx}',
				'**/index.{js,ts,jsx,tsx}',
				'**/*.d.ts',
				'**/types.ts',
			],
		},
	},
})
