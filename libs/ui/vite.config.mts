import path from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import pkg from './package.json'

const deps = Object.keys(pkg.dependencies || {})

export default defineConfig({
	plugins: [
		react({
			jsxRuntime: 'automatic',
		}),
		tailwindcss(),
		dts({
			insertTypesEntry: true,
		}),
	],
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'ui',
			formats: [
				'es',
				'cjs',
			],
		},
		emptyOutDir: false,
		sourcemap: false,
		rollupOptions: {
			external: [
				...deps,
				'react',
				'react-dom',
			],
			output: {
				exports: 'named',
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
		dedupe: [
			'react',
			'react-dom',
		],
	},
	optimizeDeps: {
		exclude: [
			'react',
			'react-dom',
		],
	},
})
