import { TextInputProps as MTextInputProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type MaskInputProps = BaseComponent<{
  classNames?: MTextInputProps['classNames']
  name: string
  mask: string | string[]
  value?: string | null
  label?: string
  placeholder?: string
  size?: MTextInputProps['size']
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
  hint?: string
  readOnly?: boolean
  onChange?: (value?: string) => void
  onBlur?: () => void
  onFocus?: () => void
}>
