import { PropsWithChildren } from 'react'
import { Link } from '@remix-run/react'
import { ProfileProvider, ProfileProviderProps } from '@starter/store'
import { UiProvider, Layout, Flex } from '@starter/ui'

import { Shell } from '~/Shell'
import { usePathname } from '~/hooks'
import { Brand } from '~/common'
import { ToggleColorScheme } from '~/common'
import { UserMenu } from '~/components'

type DefaultLayoutProps = {
  appProviderProps: ProfileProviderProps
}

const { Header: LayoutHeader, Sidebar: LayoutSidebar, Main, Content } = Layout

const Header = () => {
  return (
    <LayoutHeader>
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
        { label: 'Dashboard', href: '/', icon: 'IconDashboard' },
        { label: 'Settings', href: '/settings', icon: 'IconSettings' },
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
  return (
    <Shell>
      <ProfileProvider {...appProviderProps}>
        <UiProvider Link={Link}>
          <Layout hasHeader>
            <Sidebar />

            <Content>
              <Header />

              <Main>{children}</Main>
            </Content>
          </Layout>
        </UiProvider>
      </ProfileProvider>
    </Shell>
  )
}
