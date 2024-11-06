import { InputProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type ColorInputProps = BaseComponent<{
  name: string
  label?: string
  size?: InputProps['size']
  disabled?: boolean
  onChange?: (value?: string) => void
}>
