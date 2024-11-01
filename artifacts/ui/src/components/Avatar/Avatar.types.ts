import { AvatarProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type AvatarProps = BaseComponent<{
  src?: string
  alt?: string
  size?: ComponentProps['size']
  radius?: ComponentProps['radius']
}>
