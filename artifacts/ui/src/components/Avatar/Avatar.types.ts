import { AvatarProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type AvatarProps = BaseComponent<{
  src?: ComponentProps['src']
  alt?: ComponentProps['alt']
  size?: ComponentProps['size']
  radius?: ComponentProps['radius']
}>
