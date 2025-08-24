import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig, type PluginOption } from 'vite'
import dts from 'vite-plugin-dts'

import pkg from './package.json'

const deps = [
	...Object.keys(pkg.peerDependencies),
	...Object.keys(pkg.dependencies),
]

export default defineConfig({
	plugins: [
		react({
			jsxRuntime: 'automatic',
		}) as PluginOption,
		dts({
			insertTypesEntry: true,
		}),
	],

	build: {
		lib: {
			entry: 'src/index.ts',
			name: 'emails-marketing',
			formats: [
				'es',
				'cjs',
			],
		},
		emptyOutDir: false,
		sourcemap: false,
		rollupOptions: {
			external: deps,
			output: {
				exports: 'named',
				globals: {
					...deps.reduce(
						(globals, dep) => ({
							...globals,
							[dep]: dep,
						}),
						{},
					),
					'react-dom': 'ReactDom',
				},
			},
		},
	},

	optimizeDeps: {
		include: deps,
	},

	resolve: {
		dedupe: [
			'react',
			'react-dom',
		],
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
