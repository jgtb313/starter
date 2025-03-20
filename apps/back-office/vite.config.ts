import { defineConfig, type PluginOption } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import pkg from './package.json'

const deps = [...Object.keys(pkg.dependencies)].filter((dep) => !dep.startsWith('@react-router'))

export default defineConfig({
  plugins: [reactRouter() as PluginOption, tsconfigPaths() as PluginOption],

  // build: {
  //   rollupOptions: {
  //     external: deps,
  //   },
  // },

  // optimizeDeps: {
  //   include: deps,
  // },
})
