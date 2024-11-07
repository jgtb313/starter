import { Outlet, Link } from '@remix-run/react'
import { AuthProvider } from '@starter/store'
import { UiProvider, Layout, Flex } from '@starter/ui'

import { setupAuthLayout } from '~/server'
import { ToggleColorScheme } from '~/common'
import { Shell } from '~/Shell'

export const loader = setupAuthLayout

const AuthLayout = () => {
  return (
    <Shell>
      <UiProvider Link={Link}>
        <Layout>
          <Layout.Content centered>
            <AuthProvider>
              <Outlet />
            </AuthProvider>

            <Flex pos="fixed" top={12} right={12}>
              <ToggleColorScheme />
            </Flex>
          </Layout.Content>
        </Layout>
      </UiProvider>
    </Shell>
  )
}

export default AuthLayout
