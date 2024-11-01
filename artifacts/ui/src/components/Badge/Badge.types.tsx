import { BadgeProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type BadgeProps = BaseComponent<{
  color?: ComponentProps['color']
  size?: ComponentProps['size']
  variant?: ComponentProps['variant']
  radius?: ComponentProps['radius']
  leftSection?: ComponentProps['leftSection']
  rightSection?: ComponentProps['rightSection']
  circle?: boolean
  block?: boolean
}>
