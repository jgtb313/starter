import { createContext, useContext, useState, PropsWithChildren } from 'react'

import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Content } from './Content'
import { Main } from './Main'
import { LayoutProviderProps, LayoutContextProps } from './Layout.types'

const LayoutContext = createContext({} as LayoutContextProps)

export const Layout = ({ hasHeader = false, children }: PropsWithChildren<LayoutProviderProps>) => {
  const [headerHeight, setHeaderHeight] = useState(80)

  const value: LayoutContextProps = {
    hasHeader,
    headerHeight,
    setHeaderHeight
  }

  return (
    <LayoutContext.Provider value={value}>
      <div className="flex flex-wrap overflow-hidden">{children}</div>
    </LayoutContext.Provider>
  )
}

Layout.Header = Header
Layout.Sidebar = Sidebar
Layout.Content = Content
Layout.Main = Main

export const useLayout = () => useContext(LayoutContext)
