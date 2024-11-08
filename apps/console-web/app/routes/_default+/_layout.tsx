import { Outlet, Link, useLoaderData } from '@remix-run/react'
import { ProfileProvider, ProfileProviderProps, ProfileProtected } from '@starter/store'
import { useRouter } from '@starter/use-remix-hooks'
import { UiProvider, Layout } from '@starter/ui'

import { setupDefaultLayout } from '~/server'
import { Brand, ToggleColorScheme, UserMenu } from '~/components'
import { Shell } from '~/Shell'

export const loader = setupDefaultLayout

const DefaultLayout = () => {
  const { user } = useLoaderData<typeof loader>() as unknown as Pick<ProfileProviderProps<ProfileProtected>, 'user'>
  const router = useRouter()

  return (
    <Shell>
      <ProfileProvider<ProfileProtected> user={user}>
        <UiProvider Link={Link}>
          <Layout layout="alt" padding="lg">
            <Layout.Header py={40} px={24}>
              <Layout.Header.End>
                <UserMenu />
              </Layout.Header.End>
            </Layout.Header>

            <Layout.Sidebar
              active={router.pathname}
              header={<Brand to="/" width={50} symbol />}
              items={[
                { label: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
                { label: 'Settings', href: '/settings', icon: 'Settings' },
              ]}
              footer={<ToggleColorScheme />}
            />

            <Layout.Content>
              <Outlet />
            </Layout.Content>
          </Layout>
        </UiProvider>
      </ProfileProvider>
    </Shell>
  )
}

export default DefaultLayout
