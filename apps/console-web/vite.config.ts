import { resolve } from 'node:path'
import { defineConfig, PluginOption } from 'vite'
import { installGlobals } from '@remix-run/node'
import { vitePlugin as remix } from '@remix-run/dev'
import { visualizer } from 'rollup-plugin-visualizer'
import tsconfigPaths from 'vite-tsconfig-paths'
import { flatRoutes } from 'remix-flat-routes'

installGlobals()

export default defineConfig({
  server: {
    port: 3000,
  },

  plugins: [
    remix({
      ssr: true,
      appDirectory: 'app',
      ignoredRouteFiles: ['**/*'],
      routes: (defineRoutes) => {
        return flatRoutes('routes', defineRoutes)
      },
    }),

    visualizer({ emitFile: true }),

    tsconfigPaths() as PluginOption,
  ],

  resolve: {
    alias: {
      '~': resolve(__dirname, './app'),
    },
  },
})
