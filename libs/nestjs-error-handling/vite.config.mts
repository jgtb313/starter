import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import typescript from '@rollup/plugin-typescript'
import path from 'path'
import pkg from './package.json'

const deps = [...Object.keys(pkg.dependencies)]

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.json',
      outDir: 'dist/types',
    }),
  ],

  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'nestjs-error-handling',
      formats: ['es', 'cjs'],
    },
    emptyOutDir: false,
    sourcemap: false,
    rollupOptions: {
      external: [...deps, 'node:fs', 'node:path'],
      plugins: [
        typescript({
          tsconfig: './tsconfig.json',
          compilerOptions: {
            module: 'ESNext',
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            declaration: false,
            declarationMap: false,
            composite: false,
          },
          outDir: 'dist',
        }),
      ],
      output: {
        exports: 'named',
        dir: 'dist',
        globals: deps.reduce((globals, dep) => ({ ...globals, [dep]: dep }), {}),
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
