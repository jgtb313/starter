import { BadgeProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type BadgeProps = BaseComponent<{
  variant?: ComponentProps['variant']
  color?: ComponentProps['color']
  size?: ComponentProps['size']
  radius?: ComponentProps['radius']
  leftSection?: ComponentProps['leftSection']
  rightSection?: ComponentProps['rightSection']
  circle?: ComponentProps['circle']
  block?: ComponentProps['fullWidth']
}>
