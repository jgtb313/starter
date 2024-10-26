import { MouseEvent } from 'react'
import { ActionIconProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type ActionButtonProps = BaseComponent<{
  color?: ComponentProps['color']
  variant?: ComponentProps['variant']
  size?: ComponentProps['size']
  href?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  loading?: boolean
}>
