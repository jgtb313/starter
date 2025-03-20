import path from 'node:path'
import { glob } from 'glob'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'

const deps = [...Object.keys(pkg.dependencies)]

const migrations = glob.sync('src/adapters/database/migrations/**/*.ts')
const entities = glob.sync('src/adapters/database/**/*.entity.ts')

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.json',
      outDir: 'dist/types',
    }),
  ],

  build: {
    minify: false,

    lib: {
      entry: 'src/index.ts',
      name: 'domain',
      formats: ['es', 'cjs'],
      fileName(entryFormat, entryName) {
        const format = entryFormat === 'es' ? 'js' : entryFormat

        if (entryName === 'index') {
          return `domain.${format}`
        }

        if (entryName.includes('entity')) {
          return `entities/${entryName}.${format}`
        }

        return `migrations/${entryName}.${format}`
      },
    },
    emptyOutDir: false,
    sourcemap: false,
    rollupOptions: {
      external: [...deps, 'node:path', 'path', 'os', 'stream'],
      input: ['src/index.ts', ...migrations, ...entities],
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
