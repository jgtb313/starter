import { Outlet } from '@remix-run/react'

import { setupAuthLayout } from '~/server'
import { AuthLayout } from '~/layouts'

export const loader = setupAuthLayout

const Layout = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  )
}

export default Layout
