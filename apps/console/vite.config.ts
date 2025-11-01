import { resolve } from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type PluginOption } from 'vite'

export default defineConfig({
	plugins: [
		tanstackRouter({
			autoCodeSplitting: true,
		}),
		react(),
		tailwindcss() as PluginOption,
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			'~/client': resolve(__dirname, './src/~client'),
			'~/i18n': resolve(__dirname, './src/~i18n/console.i18n'),
		},
	},
})
