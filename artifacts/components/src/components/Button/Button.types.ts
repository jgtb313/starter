import { MouseEvent, ReactNode } from 'react'
import { ButtonProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

type ButtonType = 'submit' | 'reset' | 'button'

// type ButtonColor =
//   | 'primary'
//   | 'dark'
//   | 'gray'
//   | 'red'
//   | 'pink'
//   | 'grape'
//   | 'violet'
//   | 'indigo'
//   | 'blue'
//   | 'cyan'
//   | 'green'
//   | 'lime'
//   | 'yellow'
//   | 'orange'
//   | 'teal'

// type ButtonVariant = 'filled' | 'light' | 'outline' | 'transparent' | 'white' | 'subtle' | 'default' | 'gradient'

// type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// type ButtonRadius = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ButtonProps = BaseComponent<{
  form?: string
  type?: ButtonType
  color?: ComponentProps['color']
  size?: ComponentProps['size']
  variant?: ComponentProps['variant']
  radius?: ComponentProps['radius']
  leftSection?: ReactNode
  rightSection?: ReactNode
  href?: string
  tooltip?: string
  block?: boolean
  loading?: boolean
  disabled?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}>
