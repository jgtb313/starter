import { PropsWithChildren } from 'react'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import { shadcnTheme, shadcnCssVariableResolver } from './theme.ui-web'
import { ThemeProviderProps } from './theme.types'

export const ThemeProvider = ({ defaultColorScheme, children }: PropsWithChildren<ThemeProviderProps>) => {
  return (
    <MantineProvider defaultColorScheme={defaultColorScheme} theme={shadcnTheme} cssVariablesResolver={shadcnCssVariableResolver}>
      <Notifications />

      {children}
    </MantineProvider>
  )
}
