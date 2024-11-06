import { TextInputProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type PhoneInputProps = BaseComponent<{
  name: string
  label?: string
  placeholder?: string
  size?: ComponentProps['size']
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
  hint?: string
  readOnly?: boolean
  onChange?: (input: { ddi: string; number?: string }) => void
  onBlur?: () => void
}>
