import { MouseEvent } from 'react'
import { ActionIconProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'
import { LinkProps } from '../Link'

export type ActionIconProps = BaseComponent<{
  color?: ComponentProps['color']
  variant?: ComponentProps['variant']
  size?: ComponentProps['size']
  href?: LinkProps['href']
  target?: LinkProps['target']
  tooltip?: string
  disabled?: boolean
  loading?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}>
