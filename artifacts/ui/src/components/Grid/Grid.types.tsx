import { GridProps as MGridProps, GridColProps as MGridColProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'
import { GridVariants } from './Grid.styles'

export type GridProps = BaseComponent<
  {
    justify?: MGridProps['justify']
    align?: MGridProps['align']
    gutter?: MGridProps['gutter']
    columns?: MGridProps['columns']
    w?: MGridProps['w']
    me?: MGridProps['me']
    ms?: MGridProps['ms']
    mx?: MGridProps['mx']
    my?: MGridProps['my']
    p?: MGridProps['p']
    pe?: MGridProps['pe']
    ps?: MGridProps['ps']
    grow?: MGridProps['grow']
  },
  GridVariants
>

export type GridColProps = BaseComponent<{
  order?: MGridColProps['order']
  offset?: MGridColProps['offset']
  span?: MGridColProps['span']
  w?: MGridProps['w']
  me?: MGridColProps['me']
  ms?: MGridColProps['ms']
  mx?: MGridProps['mx']
  my?: MGridProps['my']
  pe?: MGridColProps['pe']
  ps?: MGridColProps['ps']
}>
