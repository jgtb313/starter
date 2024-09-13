import { resolve } from 'node:path'
import { defineConfig, PluginOption } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true
    }) as PluginOption
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'schema',
      formats: ['es', 'umd'],
      fileName: (format) => `schema.${format}.js`
    },
    emptyOutDir: false,
    sourcemap: false
  },
  resolve: {
    alias: {
      '@/common': resolve(__dirname, './src/@common'),
      '@': resolve(__dirname, './src')
    }
  }
})
