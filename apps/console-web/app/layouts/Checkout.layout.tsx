import { PropsWithChildren } from 'react'
import { Link } from '@remix-run/react'
import { Provider, Layout, Flex } from '@ss/components'

import { Shell } from '~/Shell'
import { ToggleColorScheme } from '~/common'

export const CheckoutLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Shell>
      <Provider Link={Link}>
        <Layout>
          <Layout.Content centered>
            {children}

            <Flex pos="fixed" top={12} right={12}>
              <ToggleColorScheme />
            </Flex>
          </Layout.Content>
        </Layout>
      </Provider>
    </Shell>
  )
}
