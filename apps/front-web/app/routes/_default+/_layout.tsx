import { Outlet, Link, useLoaderData } from '@remix-run/react'
import { AuthProvider, ProfileProvider, ProfileProviderProps } from '@starter/store'
import { UiProvider, Layout, Flex, Button } from '@starter/ui'

import { setupDefaultLayout } from '~/server'
import { Brand } from '~/components'
import { Shell } from '~/Shell'

export const loader = setupDefaultLayout

const Header = () => {
  return (
    <Layout.Header height={70}>
      <Layout.Header.Start>
        <Brand to="/" width={40} symbol />
      </Layout.Header.Start>

      <Layout.Header.End>
        <Flex gap={16}>
          <Button variant="outline">Sign In</Button>
          <Button variant="outline">Sign Up</Button>
        </Flex>
      </Layout.Header.End>
    </Layout.Header>
  )
}

const DefaultLayout = () => {
  const { user } = useLoaderData<typeof loader>() as unknown as Pick<ProfileProviderProps, 'user'>

  return (
    <Shell>
      <AuthProvider>
        <ProfileProvider user={user}>
          <UiProvider Link={Link}>
            <Layout hasHeader>
              <Layout.Content>
                <Header />

                <Layout.Main>
                  <Outlet />
                </Layout.Main>
              </Layout.Content>
            </Layout>
          </UiProvider>
        </ProfileProvider>
      </AuthProvider>
    </Shell>
  )
}

export default DefaultLayout
