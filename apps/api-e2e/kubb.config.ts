import { defineConfig } from '@kubb/core'
import { pluginClient } from '@kubb/plugin-client'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'

export default defineConfig(() => {
	return {
		root: '.',
		input: {
			path: 'http://localhost:4000/openapi',
		},
		output: {
			path: './src/~client',
			extension: {
				ts: '',
			},
			barrelType: false,
		},

		plugins: [
			pluginOas({
				validate: false,
			}),

			pluginTs({
				output: {
					path: './types',
					barrelType: 'named',
				},
				enumType: 'literal',
				dateType: 'string',
				syntaxType: 'type',
				unknownType: 'any',
				optionalType: 'questionToken',
				oasType: false,
			}),

			pluginClient({
				output: {
					path: './services',
					barrelType: 'named',
				},
				baseURL: 'http://localhost:4000/',
				parser: 'client',
				paramsType: 'inline',
				pathParamsType: 'object',
				dataReturnType: 'full',
				importPath: '../../../kubb.client',
				operations: true,
			}),
		],
	}
})
