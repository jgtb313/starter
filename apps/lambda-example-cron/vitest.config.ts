import path from 'node:path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},

	test: {
		environment: 'node',
		passWithNoTests: true,
		include: [
			'**/*.test.{js,ts,jsx,tsx}',
		],
		coverage: {
			provider: 'v8',
			include: [
				'src/**/*.service.{js,ts}',
			],
			exclude: [
				'node_modules',
				'**/*.test.{js,ts,jsx,tsx}',
				'**/*.spec.{js,ts,jsx,tsx}',
				'**/index.{js,ts,jsx,tsx}',
				'**/*.d.ts',
				'**/types.ts',
			],
			reporter: [
				'text',
				'json',
				'html',
			],
		},
	},
})
