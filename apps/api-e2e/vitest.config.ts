import path from 'path'
import { defineConfig } from 'vitest/config'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'node',

    include: ['**/*.spec.{js,ts,jsx,tsx}'],
    coverage: {
      include: ['src/**/*.{js,ts,jsx,tsx}'],
      exclude: ['node_modules', '**/*.spec.{js,ts,jsx,tsx}'],
    },
    setupFiles: 'vitest.setup.ts',
  },
})
