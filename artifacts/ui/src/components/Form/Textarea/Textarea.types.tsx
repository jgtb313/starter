import { TextareaProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'
import { TextareaVariants } from './Textarea.styles'

export type TextareaProps = BaseComponent<{
  name: string
  label?: string
  placeholder?: string
  size?: ComponentProps['size']
  maxRows?: number
  minRows?: number
  hint?: string
  autoSize?: boolean
  onChange?: (value?: string) => void
  onBlur?: () => void
}>
