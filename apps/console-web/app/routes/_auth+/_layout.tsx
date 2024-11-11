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
      <AuthProvider>
        <UiProvider Link={Link}>
          <Layout>
            <Layout.Content centered>
              <Outlet />

              <Flex pos="fixed" top={12} right={12}>
                <ToggleColorScheme />
              </Flex>
            </Layout.Content>
          </Layout>
        </UiProvider>
      </AuthProvider>
    </Shell>
  )
}

export default AuthLayout
