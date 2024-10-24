import { ListProps as ComponentProps } from '@mantine/core'

import { IconProps } from '../Icon'
import { TypographyProps } from '../Typography'

export type ListItemProps = {
  height?: number
  size?: TypographyProps['size']
  title?: string
  content?: React.ReactNode
  startContent?: React.ReactNode
  endContent?: React.ReactNode
}

export type ListEmptyProps = {
  EmptyIcon?: IconProps['name']
  emptyMessage?: string
}

export type ListProps<T> = {
  items?: T[]
  p?: ComponentProps['p']
  spacing?: ComponentProps['spacing']
  size?: ComponentProps['size']
  type?: ComponentProps['listStyleType']
  center?: boolean
  withPadding?: boolean
  renderItem: (item: T, index: number) => React.ReactElement
} & ListEmptyProps
