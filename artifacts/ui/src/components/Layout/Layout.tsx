import { PropsWithChildren } from 'react'
import { AppShell } from '@mantine/core'

import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Content } from './Content'
import { LayoutContext } from './Layout.context'
import { LayoutProviderProps, LayoutContextProps } from './Layout.types'

export const Layout = ({ layout = 'default', children }: PropsWithChildren<LayoutProviderProps>) => {
  const value: LayoutContextProps = {}

  return (
    <LayoutContext.Provider value={value}>
      <AppShell layout={layout} header={{ height: 60 }} navbar={{ width: 80, breakpoint: 'sm' }}>
        {children}
      </AppShell>
    </LayoutContext.Provider>
  )
}

Layout.Header = Header
Layout.Sidebar = Sidebar
Layout.Content = Content
