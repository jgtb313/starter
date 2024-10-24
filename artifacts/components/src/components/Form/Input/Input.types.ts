import { TextInputProps as MTextInputProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type InputProps = BaseComponent<{
  name: string
  label?: string
  placeholder?: string
  size?: MTextInputProps['size']
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
  hint?: string
  error?: string | boolean
  readOnly?: boolean
  debounce?: boolean
  disabled?: boolean
  onChange?: (value?: string) => void
  onBlur?: () => void
}>
