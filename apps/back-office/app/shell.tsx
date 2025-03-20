import { Fragment, type PropsWithChildren } from 'react'
import { StoreProvider } from '@starter/store'
import { ThemeProvider } from '@starter/ui-web'

import { useClient } from '~/hooks'

export const Shell = ({ children }: PropsWithChildren) => {
  useClient()

  return (
    <ThemeProvider defaultColorScheme="dark">
      <StoreProvider cache={{ storage: window.localStorage }}>
        <Fragment>{children}</Fragment>
      </StoreProvider>
    </ThemeProvider>
  )
}
