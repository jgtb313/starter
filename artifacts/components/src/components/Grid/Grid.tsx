import { PropsWithChildren } from 'react'
import { Grid as Component } from '@mantine/core'

import { GridStyles, GridItemStyles } from './Grid.styles'
import { GridProps, GridColProps } from './Grid.types'

export const Grid = ({ children, ...props }: PropsWithChildren<GridProps>) => {
  const styles = GridStyles(props)

  return (
    <Component classNames={{ root: styles.root() }} {...props}>
      {children}
    </Component>
  )
}

Grid.Col = ({ children, ...props }: PropsWithChildren<GridColProps>) => {
  const styles = GridItemStyles(props)

  return (
    <Component.Col classNames={{ col: styles.root() }} {...props}>
      {children}
    </Component.Col>
  )
}
