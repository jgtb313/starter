import { forwardRef, PropsWithChildren, Ref } from 'react'
import { Avatar as Component } from '@mantine/core'

import { AvatarStyles } from './Avatar.styles'
import { AvatarProps } from './Avatar.types'

const BaseAvatar = ({ children, size = 'md', radius = 'xl', ...props }: PropsWithChildren<AvatarProps>, ref: Ref<HTMLDivElement>) => {
  const styles = AvatarStyles(props)

  return (
    <Component ref={ref} classNames={{ root: styles.root() }} {...props} size={size} radius={radius}>
      {children}
    </Component>
  )
}

export const Avatar = forwardRef(BaseAvatar)
