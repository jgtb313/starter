import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    coverage: {
      exclude: ['src/config/**', 'src/core/shared/types/**'],
      include: ['src/core/**', 'src/support/**'],
    },
    sequence: {
      hooks: 'list',
    },
  },
})
