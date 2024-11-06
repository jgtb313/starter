import { Outlet, useLoaderData } from '@remix-run/react'

import { setupDefaultLayout } from '~/server'
import { DefaultLayout } from '~/layouts'
import { AppProviderProps } from '~/stores'

export const loader = setupDefaultLayout

const Layout = () => {
  const { store, user } = useLoaderData<typeof loader>() as unknown as Pick<AppProviderProps, 'store' | 'user'>

  return (
    <DefaultLayout appProviderProps={{ store, user }}>
      <Outlet />
    </DefaultLayout>
  )
}

export default Layout
