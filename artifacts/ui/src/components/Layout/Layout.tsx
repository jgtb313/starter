import { PropsWithChildren, useState } from 'react'
import { AppShell } from '@mantine/core'

import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Content } from './Content'
import { LayoutContext } from './Layout.context'
import { LayoutProviderProps, LayoutContextProps } from './Layout.types'

export const Layout = ({ layout = 'default', padding, children }: PropsWithChildren<LayoutProviderProps>) => {
  const [headerHeight, setHeaderHeight] = useState(0)
  const [sidebarWidth, setSidebarWidth] = useState(0)

  const value: LayoutContextProps = {
    headerHeight,
    sidebarWidth,

    setHeaderHeight,
    setSidebarWidth,
  }

  return (
    <LayoutContext.Provider value={value}>
      <AppShell header={{ height: headerHeight }} navbar={{ width: sidebarWidth, breakpoint: 'sm' }} layout={layout} padding={padding}>
        {children}
      </AppShell>
    </LayoutContext.Provider>
  )
}

Layout.Header = Header
Layout.Sidebar = Sidebar
Layout.Content = Content
