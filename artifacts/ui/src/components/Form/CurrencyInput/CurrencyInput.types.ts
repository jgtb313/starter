import { NumberInputProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type CurrencyInputProps = BaseComponent<{
  name: string
  label?: string
  placeholder?: string
  size?: ComponentProps['size']
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
  hint?: string
  disabled?: boolean
  onChange?: (value?: number) => void
  onBlur?: () => void
}>
