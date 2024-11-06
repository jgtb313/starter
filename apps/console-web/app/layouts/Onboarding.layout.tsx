import { PropsWithChildren } from 'react'
import { Link } from '@remix-run/react'
import { Provider, Layout, Flex } from '@ss/components'
import { Store } from '@ss/schema'

import { Shell } from '~/Shell'
import { AppProvider, AppProviderProps } from '~/stores'
import { ToggleColorScheme } from '~/common'

type OnboardingLayoutProps = {
  appProviderProps: Pick<AppProviderProps, 'user'>
}

export const OnboardingLayout = ({ appProviderProps, children }: PropsWithChildren<OnboardingLayoutProps>) => {
  return (
    <Shell>
      <AppProvider {...appProviderProps} store={{} as Store}>
        <Provider Link={Link}>
          <Layout hasHeader>
            <Layout.Content centered>
              {children}{' '}
              <Flex pos="fixed" top={12} right={12}>
                <ToggleColorScheme />
              </Flex>
            </Layout.Content>
          </Layout>
        </Provider>
      </AppProvider>
    </Shell>
  )
}
