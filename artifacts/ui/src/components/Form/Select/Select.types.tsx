import { SelectProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'
import { SelectVariants } from './Select.styles'

export type SelectProps<T> = BaseComponent<{
  name: string
  label?: string
  placeholder?: string
  size?: ComponentProps['size']
  optionValue?: keyof T
  optionLabel?: keyof T
  options?: T[]
  hint?: string
  multiple?: boolean
  renderOption?: (item: T) => React.ReactNode
  onChange?: (value?: string | string[]) => void
  onSearchChange?: (value?: string) => void
}>
