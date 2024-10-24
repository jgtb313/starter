import { PropsWithChildren } from 'react'
import { Avatar as Component } from '@mantine/core'

import { AvatarStyles } from './Avatar.styles'
import { AvatarProps } from './Avatar.types'

export const Avatar = ({ children, ...props }: PropsWithChildren<AvatarProps>) => {
  const styles = AvatarStyles(props)

  return (
    <Component classNames={{ root: styles.root() }} {...props}>
      {children}
    </Component>
  )
}
