import { MouseEvent } from 'react'
import { ActionIconProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type ActionButtonProps = BaseComponent<{
  color?: ComponentProps['color']
  variant?: ComponentProps['variant']
  size?: ComponentProps['size']
  href?: string
  target?: '_blank'
  tooltip?: string
  disabled?: boolean
  loading?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}>
