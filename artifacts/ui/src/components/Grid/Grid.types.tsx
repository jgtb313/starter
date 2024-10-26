import { GridProps as ComponentGridProps, GridColProps as ComponentColProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type GridProps = BaseComponent<{
  justify?: ComponentGridProps['justify']
  align?: ComponentGridProps['align']
  gutter?: ComponentGridProps['gutter']
  columns?: ComponentGridProps['columns']
  w?: ComponentGridProps['w']
  me?: ComponentGridProps['me']
  ms?: ComponentGridProps['ms']
  mx?: ComponentGridProps['mx']
  my?: ComponentGridProps['my']
  p?: ComponentGridProps['p']
  pe?: ComponentGridProps['pe']
  ps?: ComponentGridProps['ps']
  grow?: ComponentGridProps['grow']
}>

export type GridColProps = BaseComponent<{
  order?: ComponentColProps['order']
  offset?: ComponentColProps['offset']
  span?: ComponentColProps['span']
  w?: ComponentColProps['w']
  me?: ComponentColProps['me']
  ms?: ComponentColProps['ms']
  mx?: ComponentColProps['mx']
  my?: ComponentColProps['my']
  pe?: ComponentColProps['pe']
  ps?: ComponentColProps['ps']
}>
