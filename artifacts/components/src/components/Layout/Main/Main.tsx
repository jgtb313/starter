import { PropsWithChildren } from 'react'

import { useLayout } from '../Layout'
import { MainStyles } from './Main.styles'

export const Main = ({ children }: PropsWithChildren<{}>) => {
  const { hasHeader, headerHeight } = useLayout()

  return (
    <main style={hasHeader ? { height: `calc(100vh - ${headerHeight}px)` } : undefined} className={MainStyles()}>
      {children}
    </main>
  )
}
