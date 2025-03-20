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
        'src/brazilian-values',
        'src/creditcard-js',
        'src/date-fns',
        'src/flat',
        'src/lodash',
        'src/lukeed-uuid',
        'src/omit-deep-lodash',
        '**/*.test.{js,ts,jsx,tsx}',
        '**/*.spec.{js,ts,jsx,tsx}',
        '**/index.{js,ts,jsx,tsx}',
        '**/*.d.ts',
        '**/types.ts',
      ],
    },
  },
})
