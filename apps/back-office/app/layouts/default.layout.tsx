import { Outlet } from 'react-router'
import { AppShell, Brand, RiDashboard2Fill } from '@starter/ui-web'

import { Flex, Center, Stack, Tooltip, ActionIcon, Container } from '@mantine/core'

import { Shell } from '~/shell'

const sidebarItems = [
  {
    label: 'Dashboard',
    to: '/',
  },
  {
    label: 'Categories',
    to: '/',
  },
  {
    label: 'Settings',
    to: '/settings',
  },
]
type SidebarItem = (typeof sidebarItems)[number]

const SidebarItem = (props: SidebarItem) => {
  return (
    <Tooltip position="right" label={props.label} transitionProps={{ duration: 0 }}>
      <ActionIcon variant="subtle">
        <RiDashboard2Fill size={24} strokeWidth={1.8} />
      </ActionIcon>
    </Tooltip>
  )
}

const Layout = () => {
  return (
    <Shell>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          breakpoint: 'sm',
          width: 80,
        }}
        padding="md"
      >
        <AppShell.Header>
          <Flex h="100%" direction="row" align="center">
            <Flex w={80} h="100%" direction="row" justify="center" align="center">
              <Brand type="mark" size={40} />
            </Flex>
          </Flex>
        </AppShell.Header>

        <AppShell.Navbar>
          <Flex h="100%" direction="column" justify="space-between">
            <Flex direction="column" gap="xl">
              {/* <Center pt={16}>{header}</Center> */}

              <Center mt="xl">
                <Stack gap="xl">
                  {sidebarItems.map((item, index) => (
                    <SidebarItem {...item} key={index} />
                  ))}
                </Stack>
              </Center>
            </Flex>

            <Center mb="xl">
              <Stack gap="xl">
                {sidebarItems.map((item, index) => (
                  <SidebarItem {...item} key={index} />
                ))}
              </Stack>
            </Center>
          </Flex>
        </AppShell.Navbar>

        <AppShell.Main>
          <Container p="xl">
            <Outlet />
          </Container>
        </AppShell.Main>
      </AppShell>
    </Shell>
  )
}

export default Layout
