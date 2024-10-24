import { createContext, useContext, PropsWithChildren } from 'react'
import { NavigationProgress } from '@mantine/nprogress'

import { ThemeProvider } from '../Theme'
import { Toast } from '../Toast'
import { ModalsProvider } from '../Modal'
import { DrawersProvider } from '../Drawer'
import { AppProviderProps, AppContextProps } from './Provider.types'

const Context = createContext({} as AppContextProps)

export const Provider = ({ palette, colorScheme, Link, children }: PropsWithChildren<AppProviderProps>) => {
  const value = {
    Link
  }

  return (
    <Context.Provider value={value}>
      <ThemeProvider palette={palette} colorScheme={colorScheme}>
        <NavigationProgress />
        <Toast />
        <ModalsProvider />
        <DrawersProvider />

        {children}
      </ThemeProvider>
    </Context.Provider>
  )
}

export const useApp = () => useContext(Context)
