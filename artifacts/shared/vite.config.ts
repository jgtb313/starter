import { defineConfig, PluginOption } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts({ insertTypesEntry: true }) as PluginOption],

  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'shared',
      formats: ['es', 'umd'],
      fileName: (format) => `shared.${format}.js`
    },
    emptyOutDir: false,
    sourcemap: false,
    rollupOptions: {
      external: ['date-fns', 'brazilian-values'],
      output: {
        exports: 'named',
        globals: {
          'date-fns': 'date-fns',
          'brazilian-values': 'brazilian-values'
        }
      }
    }
  },
  optimizeDeps: {
    include: ['date-fns', 'brazilian-values']
  }
})
