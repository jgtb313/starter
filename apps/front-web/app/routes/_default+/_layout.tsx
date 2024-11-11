import { Outlet, Link, useLoaderData } from '@remix-run/react'
import { AuthProvider, ProfileProvider, ProfileProviderProps } from '@starter/store'
import { UiProvider, Layout, Flex } from '@starter/ui'

import { setupDefaultLayout } from '~/server'
import { Brand, ToggleColorScheme } from '~/common'
import { AuthenticationSelector } from '~/components'
import { Shell } from '~/Shell'

export const loader = setupDefaultLayout

const DefaultLayout = () => {
  const { user } = useLoaderData<typeof loader>() as unknown as Pick<ProfileProviderProps, 'user'>

  return (
    <Shell>
      <AuthProvider>
        <ProfileProvider user={user}>
          <UiProvider Link={Link}>
            <Layout padding="lg">
              <Layout.Header py={36} px={36}>
                <Layout.Header.Start>
                  <Brand to="/" width={120} />
                </Layout.Header.Start>

                <Layout.Header.End>
                  <Flex justify="center" align="center" gap={16}>
                    <ToggleColorScheme />

                    <AuthenticationSelector />
                  </Flex>
                </Layout.Header.End>
              </Layout.Header>

              <Layout.Content py={36} px={36}>
                <Outlet />
              </Layout.Content>
            </Layout>
          </UiProvider>
        </ProfileProvider>
      </AuthProvider>
    </Shell>
  )
}

export default DefaultLayout
