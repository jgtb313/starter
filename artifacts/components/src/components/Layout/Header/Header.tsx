import { PropsWithChildren, useLayoutEffect, useRef } from 'react'

import { HeaderStyles, HeaderStartStyles, HeaderEndStyles } from './Header.styles'
import { useLayout } from '../Layout'

export const Header = ({ children }: PropsWithChildren<{}>) => {
  const { setHeaderHeight } = useLayout()
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    setHeaderHeight(ref.current?.offsetHeight ?? 0)
  }, [])

  return (
    <header ref={ref} className={HeaderStyles()}>
      {children}
    </header>
  )
}

Header.Start = ({ children }: PropsWithChildren<{}>) => {
  return <div className={HeaderStartStyles()}>{children}</div>
}

Header.End = ({ children }: PropsWithChildren<{}>) => {
  return <div className={HeaderEndStyles()}>{children}</div>
}
