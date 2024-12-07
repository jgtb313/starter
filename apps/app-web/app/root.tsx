import '@starter/ui/dist/style.css'

import { PropsWithChildren } from 'react'
import { Meta, Links, ScrollRestoration, Scripts, Outlet } from '@remix-run/react'
import { LinksFunction } from '@remix-run/node'
import { config } from '@starter/config'
import { ColorSchemeScript } from '@starter/ui'

export const links: LinksFunction = () => [
  {
    rel: 'icon',
    sizes: '180x180',
    href: config.logo.darkSymbol.svg,
  },
]

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ColorSchemeScript />
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

const App = () => {
  return <Outlet />
}

export default App
