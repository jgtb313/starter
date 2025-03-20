import { Outlet } from 'react-router'
import { AppShell, Center } from '@starter/ui-web'

import { Shell } from '~/shell'

const Layout = () => {
  return (
    <Shell>
      <AppShell>
        <AppShell.Main>
          <Center h="100vh">
            <Outlet />
          </Center>
        </AppShell.Main>
      </AppShell>
    </Shell>
  )
}

export default Layout
