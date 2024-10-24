import { PropsWithChildren } from 'react'
import { Badge as MBadge } from '@mantine/core'

import { BadgeStyles } from './Badge.styles'
import { BadgeProps } from './Badge.types'

export const Badge = ({ variant = 'outline', block = false, children, ...props }: PropsWithChildren<BadgeProps>) => {
  const styles = BadgeStyles(props)

  return (
    <MBadge classNames={{ root: styles.root() }} {...props} variant={variant} fullWidth={block}>
      {children}
    </MBadge>
  )
}
