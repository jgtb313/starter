import { TextInputProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type MaskInputProps = BaseComponent<{
  classNames?: ComponentProps['classNames']
  name: string
  mask: string | string[]
  value?: string | null
  label?: string
  placeholder?: string
  size?: ComponentProps['size']
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
  hint?: string
  readOnly?: boolean
  onChange?: (value?: string) => void
  onBlur?: () => void
  onFocus?: () => void
}>
