import { Outlet, Link } from '@remix-run/react'
import { redirect, json, LoaderFunctionArgs } from '@remix-run/node'
import { config } from '@starter/config'
import client from '@starter/client'
import { AuthProvider } from '@starter/store'
import { UiProvider, Layout, Flex, ToggleColorScheme } from '@starter/ui'

import { getClientIdInfos } from '~/support/get-client-id-infos'
import { Shell } from '~/Shell'

export const loader = async (args: LoaderFunctionArgs) => {
  const stage = import.meta.env.VITE_STAGE

  client.connect(stage)

  const clientIdInfos = getClientIdInfos(args)

  if (clientIdInfos === false) {
    return redirect(config.oauth.fallbackUrl)
  }

  return json({})
}

const DefaultLayout = () => {
  return (
    <Shell>
      <AuthProvider>
        <UiProvider Link={Link}>
          <Layout>
            <Layout.Content centered>
              <Outlet />

              <Flex pos="fixed" top={12} right={12}>
                <ToggleColorScheme color="default" variant="default" size="xl" />
              </Flex>
            </Layout.Content>
          </Layout>
        </UiProvider>
      </AuthProvider>
    </Shell>
  )
}

export default DefaultLayout
