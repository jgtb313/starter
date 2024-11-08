import { Outlet, Link, useLoaderData } from '@remix-run/react'
import { AuthProvider, ProfileProvider, ProfileProviderProps } from '@starter/store'
import { UiProvider, Layout } from '@starter/ui'

import { setupDefaultLayout } from '~/server'
import { Shell } from '~/Shell'

export const loader = setupDefaultLayout

const Header = () => {
  return <Layout.Header></Layout.Header>
}

const DefaultLayout = () => {
  const { user } = useLoaderData<typeof loader>() as unknown as Pick<ProfileProviderProps, 'user'>

  return (
    <Shell>
      <AuthProvider>
        <ProfileProvider user={user}>
          <UiProvider Link={Link} colorScheme="dark">
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
