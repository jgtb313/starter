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
      name: 'client',
      formats: ['es', 'umd'],
      fileName: (format) => `client.${format}.js`
    },
    emptyOutDir: false,
    sourcemap: false,
    rollupOptions: {
      external: ['axios'],
      output: {
        exports: 'named',
        globals: {
          axios: 'axios'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
