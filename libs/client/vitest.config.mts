import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  test: {
    include: ['**/*.test.{js,ts,jsx,tsx}'],
    coverage: {
      include: ['src/**/*.{js,ts,jsx,tsx}'],
      exclude: [
        'node_modules',
        'src/resources.generated.ts',
        '**/*.test.{js,ts,jsx,tsx}',
        '**/*.spec.{js,ts,jsx,tsx}',
        '**/index.{js,ts,jsx,tsx}',
        '**/*.d.ts',
        '**/types.ts',
      ],
    },
  },
})
