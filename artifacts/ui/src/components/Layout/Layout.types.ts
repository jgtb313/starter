import { AppShellProps } from '@mantine/core'

export type LayoutContextProps = {
  headerHeight?: number
  sidebarWidth?: number

  setHeaderHeight: (value: number) => void
  setSidebarWidth: (value: number) => void
}

export type LayoutProviderProps = {
  padding?: AppShellProps['padding']
  layout?: AppShellProps['layout']
}
