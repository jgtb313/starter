import { resolve } from 'node:path'
import { defineConfig, PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

import pkg from './package.json'

const deps = [...Object.keys(pkg.peerDependencies), ...Object.keys(pkg.dependencies)]

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    dts({
      insertTypesEntry: true,
      logLevel: 'error',
    }) as PluginOption,
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ui-mobile',
      formats: ['es', 'umd'],
      fileName: (format) => `ui-mobile.${format}.js`,
    },
    emptyOutDir: false,
    sourcemap: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react-native', ...deps],
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
          'react-native': 'ReactNative',
        },
      },
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'react-native'],
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
