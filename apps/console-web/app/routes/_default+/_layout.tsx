import { Outlet, useLoaderData } from '@remix-run/react'
import { ProfileProviderProps } from '@starter/store'

import { setupDefaultLayout } from '~/server'
import { DefaultLayout } from '~/layouts'

export const loader = setupDefaultLayout

const Layout = () => {
  const { user } = useLoaderData<typeof loader>() as unknown as Pick<ProfileProviderProps, 'user'>

  return (
    <DefaultLayout appProviderProps={{ user }}>
      <Outlet />
    </DefaultLayout>
  )
}

export default Layout
