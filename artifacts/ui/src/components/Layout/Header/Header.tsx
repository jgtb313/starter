import { PropsWithChildren } from 'react'
import { AppShell, Flex } from '@mantine/core'

import { HeaderStartStyles, HeaderEndStyles } from './Header.styles'
import { HeaderProps } from './Header.types'

export const Header = ({ h = 60, children, ...props }: PropsWithChildren<HeaderProps>) => {
  return (
    <AppShell.Header {...props} h={h}>
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
