import { PropsWithChildren } from 'react'
import { Loader as Component } from '@mantine/core'

import { LoaderStyles } from './Loader.styles'
import { LoaderProps } from './Loader.types'

export const Loader = ({ children, ...props }: PropsWithChildren<LoaderProps>) => {
  const styles = LoaderStyles(props)

  return (
    <Component classNames={{ root: styles.root() }} {...props}>
      {children}
    </Component>
  )
}
