import { SkeletonProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'
import { SkeletonVariants } from './Skeleton.styles'

export type SkeletonProps = BaseComponent<
  {
    w?: ComponentProps['width']
    h?: ComponentProps['height']
    me?: ComponentProps['me']
    ms?: ComponentProps['ms']
    pe?: ComponentProps['pe']
    ps?: ComponentProps['ps']
    radius?: ComponentProps['radius']
    circle?: boolean
    loading?: boolean
    animate?: boolean
  },
  SkeletonVariants
>
