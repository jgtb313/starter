import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'api-types/index.ts'),
      name: 'api-types',
      formats: ['es', 'umd'],
      fileName: (format) => `api-types.${format}.js`
    },
    outDir: './dist/api-types',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        exports: 'named'
      }
    }
  }
})
