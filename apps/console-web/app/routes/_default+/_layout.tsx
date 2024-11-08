import { Outlet, Link, useLoaderData } from '@remix-run/react'
import { ProfileProvider, ProfileProviderProps } from '@starter/store'
import { useRouter } from '@starter/use-remix-hooks'
import { UiProvider, Layout, Flex } from '@starter/ui'

import { setupDefaultLayout } from '~/server'
import { Brand, ToggleColorScheme, UserMenu } from '~/components'
import { Shell } from '~/Shell'

export const loader = setupDefaultLayout

const Header = () => {
  return (
    <Layout.Header>
      <Layout.Header.End>
        <UserMenu />
      </Layout.Header.End>
    </Layout.Header>
  )
}

const Sidebar = () => {
  const router = useRouter()

  return (
    <Layout.Sidebar
      active={router.pathname}
      header={<Brand to="/" width={50} symbol />}
      items={[
        { label: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
        { label: 'Settings', href: '/settings', icon: 'Settings' },
      ]}
      footer={
        <Flex justify="center" align="center" p={16}>
          <ToggleColorScheme />
        </Flex>
      }
    />
  )
}

const DefaultLayout = () => {
  const { user } = useLoaderData<typeof loader>() as unknown as Pick<ProfileProviderProps, 'user'>

  return (
    <Shell>
      <ProfileProvider user={user}>
        <UiProvider Link={Link}>
          <Layout hasHeader>
            <Sidebar />

            <Layout.Content>
              <Header />

              <Layout.Main>
                <Outlet />
              </Layout.Main>
            </Layout.Content>
          </Layout>
        </UiProvider>
      </ProfileProvider>
    </Shell>
  )
}

export default DefaultLayout
