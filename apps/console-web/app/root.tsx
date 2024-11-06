import '@ss/components/dist/style.css'

import { PropsWithChildren } from 'react'
import { Meta, Links, ScrollRestoration, Scripts, Outlet, useRouteLoaderData } from '@remix-run/react'
import { json, LinksFunction } from '@remix-run/node'
import { ColorSchemeScript } from '@ss/components'

import { ErrorLayout } from '~/layouts'

export const loader = async () => {
  return json({
    ENV: {
      STAGE: process.env.STAGE
    }
  })
}

export const links: LinksFunction = () => [
  {
    rel: 'icon',
    sizes: '180x180',
    href: '/favicon.svg'
  }
]

export const ErrorBoundary = () => {
  return <ErrorLayout />
}

export const Layout = ({ children }: PropsWithChildren) => {
  const data = useRouteLoaderData<typeof loader>('root')

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ColorSchemeScript />
        <Meta />
        <Links />
        <script type="text/javascript" src="https://js.iugu.com/v2"></script>
      </head>

      <body>
        {children}
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data?.ENV)}`
          }}
        />
        <Scripts />
      </body>
    </html>
  )
}

const App = () => {
  return <Outlet />
}

export default App
