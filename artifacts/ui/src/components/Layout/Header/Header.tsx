import { useRef, useLayoutEffect, PropsWithChildren } from 'react'
import { AppShell, Flex } from '@mantine/core'

import { useLayout } from '../Layout.context'
import { HeaderStartStyles, HeaderEndStyles } from './Header.styles'
import { HeaderProps } from './Header.types'

export const Header = ({ h = 60, bordered = true, children, ...props }: PropsWithChildren<HeaderProps>) => {
  const { setHeaderHeight } = useLayout()
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    setHeaderHeight(ref.current?.offsetHeight ?? 0)
  }, [])

  return (
    <AppShell.Header ref={ref} h={h} withBorder={bordered} {...props}>
      {children}
    </AppShell.Header>
  )
}

Header.Start = ({ children }: PropsWithChildren<{}>) => {
  const styles = HeaderStartStyles()

  return <Flex className={styles}>{children}</Flex>
}

Header.End = ({ children }: PropsWithChildren<{}>) => {
  const styles = HeaderEndStyles()

  return <Flex className={styles}>{children}</Flex>
}
