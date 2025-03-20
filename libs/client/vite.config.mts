import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import path from 'path'

import pkg from './package.json'

const deps = [...Object.keys(pkg.dependencies)]

export default defineConfig({
  plugins: [dts({ insertTypesEntry: true })],

  server: {
    fs: {
      allow: [path.resolve(__dirname, '../../')],
    },
  },

  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'client',
      formats: ['es', 'cjs'],
    },
    emptyOutDir: false,
    sourcemap: false,
    rollupOptions: {
      external: [...deps, 'path', 'url', 'fs', 'glob'],
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
        },
      },
    },
  },

  optimizeDeps: {
    include: deps,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
