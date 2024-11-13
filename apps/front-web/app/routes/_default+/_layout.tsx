import { Outlet, Link, useLoaderData } from '@remix-run/react'
import { AuthProvider, ProfileProvider, ProfileProviderProps } from '@starter/store'
import { UiProvider, Layout, Flex } from '@starter/ui'

import { setupDefaultLayout } from '~/server'
import { Brand, ToggleColorScheme } from '~/common'
import { AuthenticationSelector } from '~/components'
import { Shell } from '~/Shell'

export const loader = setupDefaultLayout

const { Header, Content } = Layout

const DefaultLayout = () => {
  const { user } = useLoaderData<typeof loader>() as unknown as Pick<ProfileProviderProps, 'user'>

  return (
    <Shell>
      <AuthProvider>
        <ProfileProvider user={user}>
          <UiProvider Link={Link}>
            <Layout layout="default" padding="lg">
              <Header h={72} p={36}>
                <Header.Start>
                  <Brand to="/" width={120} />
                </Header.Start>

                <Header.End>
                  <Flex justify="center" align="center" gap={8}>
                    <ToggleColorScheme />

                    <AuthenticationSelector />
                  </Flex>
                </Header.End>
              </Header>

              <Content>
                <Outlet />
              </Content>
            </Layout>
          </UiProvider>
        </ProfileProvider>
      </AuthProvider>
    </Shell>
  )
}

export default DefaultLayout
