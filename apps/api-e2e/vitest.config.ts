import { resolve } from 'node:path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		setupFiles: [],
		passWithNoTests: true,
		coverage: {
			all: true,
			provider: 'v8',
			include: [
				'src/core/**/*.{js,ts,jsx,tsx}',
			],
			exclude: [
				'src/core/**/*.test.ts',
				'node_modules/**',
			],
			reporter: [
				'text',
				'json',
				'html',
			],
		},
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			'~/client': resolve(__dirname, './src/~client'),
		},
	},
})
