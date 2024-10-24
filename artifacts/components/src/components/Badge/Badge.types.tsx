import { BadgeProps as MBadgeProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'
import { BadgeVariants } from './Badge.styles'

export type BadgeProps = BaseComponent<
  {
    variant?: MBadgeProps['variant']
    color?: MBadgeProps['color']
    size?: MBadgeProps['size']
    radius?: MBadgeProps['radius']
    leftSection?: MBadgeProps['leftSection']
    rightSection?: MBadgeProps['rightSection']
    circle?: MBadgeProps['circle']
    block?: MBadgeProps['fullWidth']
  },
  BadgeVariants
>
