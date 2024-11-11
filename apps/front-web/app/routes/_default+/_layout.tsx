import { Outlet, Link, useLoaderData } from '@remix-run/react'
import { AuthProvider, ProfileProvider, ProfileProviderProps } from '@starter/store'
import { UiProvider, Layout, Flex, Button } from '@starter/ui'

import { setupDefaultLayout } from '~/server'
import { Brand, ToggleColorScheme } from '~/common'
import { authenticationFormModal } from '~/components'
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
                  <Brand to="/" width={40} symbol />
                </Layout.Header.Start>

                <Layout.Header.End>
                  <Flex gap={16}>
                    <ToggleColorScheme />

                    <Button variant="outline" onClick={authenticationFormModal.open}>
                      Sign In
                    </Button>

                    <Button variant="outline">Sign Up</Button>
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
