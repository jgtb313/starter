import { PropsWithChildren } from 'react'
import { AppShell } from '@mantine/core'

import { ContentStyles } from './Content.styles'
import { ContentProps } from './Content.types'

export const Content = ({ children, ...props }: PropsWithChildren<ContentProps>) => {
  const styles = ContentStyles(props)

  return <AppShell.Main className={styles}>{children}</AppShell.Main>
}
