import { BaseComponent } from '@/support/types'
import { NumberInputProps as MNumberInputProps } from '@mantine/core'

export type CurrencyInputProps = BaseComponent<{
  name: string
  label?: string
  placeholder?: string
  size?: MNumberInputProps['size']
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
  hint?: string
  disabled?: boolean
  onChange?: (value?: number) => void
  onBlur?: () => void
}>
