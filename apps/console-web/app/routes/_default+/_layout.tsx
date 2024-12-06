import { Outlet, Link, useLoaderData } from '@remix-run/react'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { makeAuthRedirectUrl, ClientIdEnum } from '@starter/config'
import client from '@starter/client'
import { ProfileProvider, ProfileProviderProps, ProfileProtected } from '@starter/store'
import { useRouter } from '@starter/use-remix-hooks'
import { UiProvider, Layout, Brand, ToggleColorScheme } from '@starter/ui'

import { cookie } from '~/cookie.server'
import { UserMenu } from '~/components'
import { Shell } from '~/Shell'

const signInRedirectUrl = makeAuthRedirectUrl({
  clientId: ClientIdEnum.CONSOLE,
  stage: import.meta.env.VITE_STAGE,
  responseType: 'token',
  scope: 'admin',
})

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const Cookie = await cookie.getSession(request.headers.get('Cookie'))

  const accessToken = Cookie.get('accessToken')

  if (!accessToken) {
    return redirect(signInRedirectUrl)
  }

  client.connect(import.meta.env.VITE_STAGE)
  client.authenticate(accessToken)

  const user = await client.profile.retrieve({})

  return json({ user })
}

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
              footer={<ToggleColorScheme color="default" variant="default" size="xl" />}
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
