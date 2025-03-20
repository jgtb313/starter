import { type RouteConfig, layout, index, route } from '@react-router/dev/routes'

export default [
  layout('layouts/default.layout.tsx', [index('routes/home.tsx')]),

  layout('layouts/auth.layout.tsx', [route('sign-in', 'routes/sign-in.tsx')]),
] satisfies RouteConfig
