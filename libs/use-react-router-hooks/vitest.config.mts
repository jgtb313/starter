import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    reporters: ['default'],
    outputFile: {
      json: './json-report.json',
    },
    include: ['**/*.test.{js,ts,jsx,tsx}'],
    coverage: {
      include: ['src/**/*.{js,ts,jsx,tsx}'],
      exclude: ['node_modules', '**/*.test.{js,ts,jsx,tsx}', '**/*.spec.{js,ts,jsx,tsx}', '**/index.{js,ts,jsx,tsx}', '**/*.d.ts', '**/types.ts'],
    },
    setupFiles: [resolve(__dirname, 'vitest.setup.ts')],
    globals: true,
    passWithNoTests: true,
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
