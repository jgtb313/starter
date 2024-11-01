import { PropsWithChildren } from 'react'
import { Badge as Component } from '@mantine/core'

import { BadgeStyles } from './Badge.styles'
import { BadgeProps } from './Badge.types'

export const Badge = ({
  color = 'primary',
  size = 'md',
  variant = 'outline',
  radius = 'md',
  circle = false,
  block = false,
  children,
  ...props
}: PropsWithChildren<BadgeProps>) => {
  const styles = BadgeStyles(props)

  return (
    <Component
      classNames={{ root: styles.root() }}
      {...props}
      color={color}
      size={size}
      variant={variant}
      radius={radius}
      circle={circle}
      fullWidth={block}
    >
      {children}
    </Component>
  )
}
