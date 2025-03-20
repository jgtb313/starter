import '@starter/ui-web/dist/style.css'

import type { PropsWithChildren } from 'react'
import { Meta, Links, ScrollRestoration, Scripts, Outlet } from 'react-router'
import { config } from '@starter/config'

import type { Route } from './+types/root'
import { authentication } from '~/middlewares'

const clientMiddleware: Route.unstable_ClientMiddlewareFunction = async ({ request }, next) => {
  await authentication(request, next)
}

export const meta = ({}: Route.MetaArgs) => {
  return [{ title: 'Starter' }]
}

export const unstable_clientMiddleware = [clientMiddleware]

export const links: Route.LinksFunction = () => [
  {
    rel: 'icon',
    type: 'image/png',
    href: config.logo.lightSymbol,
  },
]

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" />
        <Meta />
        <Links />
      </head>

      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default () => {
  return <Outlet />
}
