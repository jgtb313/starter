import { resolve } from 'node:path'

import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [
		tanstackRouter({
			autoCodeSplitting: true,
		}),
		react(),
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			'~/client': resolve(__dirname, './src/~client'),
			'~/i18n': resolve(__dirname, './src/~i18n/console.i18n'),
		},
	},
})
