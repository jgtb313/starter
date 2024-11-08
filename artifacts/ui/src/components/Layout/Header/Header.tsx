import { PropsWithChildren, useLayoutEffect, useRef } from 'react'
import { rem } from '@mantine/core'

import { useLayout } from '../Layout'
import { HeaderStyles, HeaderStartStyles, HeaderEndStyles } from './Header.styles'
import { HeaderProps } from './Header.types'

export const Header = ({ height = 16, children }: PropsWithChildren<HeaderProps>) => {
  const { setHeaderHeight } = useLayout()
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    setHeaderHeight(ref.current?.offsetHeight ?? 0)
  }, [])

  return (
    <header ref={ref} className={HeaderStyles()} style={{ height: rem(height) }}>
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
