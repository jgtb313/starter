import { Outlet, Link } from '@remix-run/react'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { makeAuthRedirectUrl, ClientIdEnum } from '@starter/config'
import client from '@starter/client'
import { AuthProvider, ProfileProvider, ProfileProviderProps } from '@starter/store'
import { useLoaderData } from '@starter/use-remix-hooks'
import { UiProvider, Layout, Flex, Avatar, Button, Brand, ToggleColorScheme } from '@starter/ui'

import { cookie } from '~/cookie.server'
import { Shell } from '~/Shell'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const Cookie = await cookie.getSession(request.headers.get('Cookie'))

  const accessToken = Cookie.get('accessToken')

  client.connect(import.meta.env.VITE_STAGE)

  if (accessToken) {
    client.authenticate(accessToken)

    const user = await client.profile.retrieve({})

    return json({ user })
  }

  return json({ user: undefined })
}

const { Header, Content } = Layout

const signInRedirectUrl = makeAuthRedirectUrl({
  clientId: ClientIdEnum.APP,
  stage: import.meta.env.VITE_STAGE,
  responseType: 'token',
  scope: 'user',
})

const logoutRedirectUrl = makeAuthRedirectUrl({
  clientId: ClientIdEnum.APP,
  stage: import.meta.env.VITE_STAGE,
  to: 'logout',
})

const DefaultLayout = () => {
  const { user } = useLoaderData<Pick<ProfileProviderProps, 'user'>>()

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
                  <Flex justify="center" align="center" gap={16}>
                    <ToggleColorScheme color="default" variant="transparent" size="md" />

                    {user ? (
                      <>
                        <Avatar>{user.name.charAt(0)}</Avatar>

                        <Button href={logoutRedirectUrl}>Sign Out</Button>
                      </>
                    ) : (
                      <Button href={signInRedirectUrl} variant="outline" radius={50}>
                        Sign In
                      </Button>
                    )}
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
