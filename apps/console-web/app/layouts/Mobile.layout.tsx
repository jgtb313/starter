import { Link } from '@remix-run/react'
import { Provider, Layout } from '@ss/components'

import { Shell } from '~/Shell'
import { Brand } from '~/common'

export const MobileLayout = () => {
  return (
    <Shell>
      <Provider Link={Link}>
        <Layout>
          <Layout.Content centered>
            <Brand width={120} symbol />
          </Layout.Content>
        </Layout>
      </Provider>
    </Shell>
  )
}
