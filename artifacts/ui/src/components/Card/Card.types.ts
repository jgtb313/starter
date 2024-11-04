import { CardProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type CardProps = BaseComponent<{
  w?: ComponentProps['w']
  h?: ComponentProps['h']
  padding?: ComponentProps['p']
  shadow?: ComponentProps['shadow']
  bordered?: boolean
}>

export type CardHeaderProps = {
  bordered?: boolean
}

export type CardBodyProps = {}

export type CardFooterProps = {
  bordered?: boolean
}
