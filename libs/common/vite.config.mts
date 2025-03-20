import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import path from 'path'

import pkg from './package.json'

const deps = [...Object.keys(pkg.dependencies)]

export default defineConfig({
  plugins: [dts({ insertTypesEntry: true })],

  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'shared',
      formats: ['es', 'cjs'],
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
