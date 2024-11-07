import { PropsWithChildren } from 'react'
import { Link } from '@remix-run/react'
import { AuthProvider } from '@starter/store'
import { UiProvider, Layout, Flex } from '@starter/ui'

import { Shell } from '~/Shell'
import { ToggleColorScheme } from '~/common'

export const AuthLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Shell>
      <UiProvider Link={Link}>
        <Layout>
          <Layout.Content centered>
            <AuthProvider>{children}</AuthProvider>

            <Flex pos="fixed" top={12} right={12}>
              <ToggleColorScheme />
            </Flex>
          </Layout.Content>
        </Layout>
      </UiProvider>
    </Shell>
  )
}
