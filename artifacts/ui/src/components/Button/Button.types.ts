import { ButtonProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

type ButtonType = 'submit' | 'reset' | 'button'

export type ButtonProps = BaseComponent<{
  form?: string
  type?: ButtonType
  color?: ComponentProps['color']
  size?: ComponentProps['size']
  variant?: ComponentProps['variant']
  radius?: ComponentProps['radius']
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
  href?: string
  target?: '_blank'
  tooltip?: string
  block?: boolean
  loading?: boolean
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}>
