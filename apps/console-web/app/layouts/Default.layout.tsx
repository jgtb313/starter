import { PropsWithChildren } from 'react'
import { Link } from '@remix-run/react'
import { Provider, Layout, Flex, useMount } from '@ss/components'

import { Shell } from '~/Shell'
import { usePathname } from '~/hooks'
import { AppProvider, useStore, AppProviderProps } from '~/stores'
import { Brand } from '~/common'
import { ToggleColorScheme } from '~/common'
import { UserMenu, StoreSelector } from '~/components'

type DefaultLayoutProps = {
  appProviderProps: AppProviderProps
}

const { Header: LayoutHeader, Sidebar: LayoutSidebar, Main, Content } = Layout

const Header = () => {
  return (
    <LayoutHeader>
      <LayoutHeader.Start>
        <StoreSelector />
      </LayoutHeader.Start>

      <LayoutHeader.End>
        <UserMenu />
      </LayoutHeader.End>
    </LayoutHeader>
  )
}

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <LayoutSidebar
      active={pathname}
      header={<Brand to="/" width={50} symbol />}
      items={[
        { label: 'Entregas', href: '/deliveries', icon: 'Truck' },
        { label: 'Inventários', href: '/inventories', icon: 'PackageOpen' },
        { label: 'Notas', href: '/invoices', icon: 'NotepadText' },
        { label: 'Configurações', href: '/settings', icon: 'Settings' }
      ]}
      footer={
        <Flex justify="center" align="center" p={16}>
          <ToggleColorScheme />
        </Flex>
      }
    />
  )
}

export const DefaultLayout = ({ appProviderProps, children }: PropsWithChildren<DefaultLayoutProps>) => {
  const { fetchStores } = useStore()

  useMount(() => {
    fetchStores({})
  })

  return (
    <Shell>
      <AppProvider {...appProviderProps}>
        <Provider Link={Link}>
          <Layout hasHeader>
            <Sidebar />

            <Content>
              <Header />

              <Main>{children}</Main>
            </Content>
          </Layout>
        </Provider>
      </AppProvider>
    </Shell>
  )
}
