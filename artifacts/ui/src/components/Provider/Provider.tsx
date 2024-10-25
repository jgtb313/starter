import { PropsWithChildren } from 'react'
import { NavigationProgress } from '@mantine/nprogress'

import { ThemeProvider } from '../Theme'
import { ToastProvider } from '../Toast'
import { ModalsProvider } from '../Modal'
import { DrawersProvider } from '../Drawer'
import { Context } from './Provider.context'
import { UiProviderProps } from './Provider.types'

export const UiProvider = ({ palette, colorScheme, Link, children }: PropsWithChildren<UiProviderProps>) => {
  return (
    <Context.Provider value={{ Link }}>
      <ThemeProvider palette={palette} colorScheme={colorScheme}>
        <NavigationProgress />
        <ToastProvider />
        <ModalsProvider />
        <DrawersProvider />

        {children}
      </ThemeProvider>
    </Context.Provider>
  )
}
