import { resolve } from 'node:path'
import { defineConfig, PluginOption } from 'vite'
import dts from 'vite-plugin-dts'

import pkg from './package.json'

const deps = [...Object.keys(pkg.peerDependencies), ...Object.keys(pkg.dependencies)]

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }) as PluginOption,
  ],
  build: {
    target: 'es2021',
    lib: {
      entry: 'src/index.ts',
      name: 'domain',
      formats: ['es', 'umd'],
      fileName: (format) => `domain.${format}.js`,
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
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
