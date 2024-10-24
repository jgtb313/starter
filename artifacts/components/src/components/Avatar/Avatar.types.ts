import { AvatarProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'
import { AvatarVariants } from './Avatar.styles'

export type AvatarProps = BaseComponent<
  {
    src?: ComponentProps['src']
    alt?: ComponentProps['alt']
    size?: ComponentProps['size']
    radius?: ComponentProps['radius']
  },
  AvatarVariants
>
