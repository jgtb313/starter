import { PropsWithChildren } from 'react'
import { NavigationProgress } from '@mantine/nprogress'

import { ThemeProvider } from '../Theme'
import { Toast } from '../Toast'
import { ModalsProvider } from '../Modal'
import { DrawersProvider } from '../Drawer'
import { Context } from './Provider.context'
import { UiProviderProps } from './Provider.types'

export const UiProvider = ({ palette, colorScheme, Link, children }: PropsWithChildren<UiProviderProps>) => {
  const value = {
    Link,
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
