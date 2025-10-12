import { defineConfig } from '@kubb/core'
import { pluginClient } from '@kubb/plugin-client'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'

export default defineConfig(() => {
	return {
		root: '.',
		input: {
			path: 'https://gist.githubusercontent.com/jgtb313/3477cb69f7a5f1cbfad6602b21ba7621/raw/49d3e041c6a4092f0381dcb811f4886e2da0dd36/openapi.json',
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

			pluginZod({
				output: {
					path: './schemas',
				},
				importPath: '@starter/schema',
				version: '4',
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
				operations: false,
			}),

			pluginReactQuery({
				output: {
					path: './hooks',
				},
				suspense: false,
				paramsType: 'inline',
				pathParamsType: 'object',
				client: {
					baseURL: 'http://localhost:4000/',
					dataReturnType: 'full',
					importPath: '../../../kubb.client',
				},
			}),
		],
	}
})
