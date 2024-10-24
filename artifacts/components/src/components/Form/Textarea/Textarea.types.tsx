import { TextareaProps as MTextareaProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'
import { TextareaVariants } from './Textarea.styles'

export type TextareaProps = BaseComponent<
  {
    name: string
    label?: string
    placeholder?: string
    size?: MTextareaProps['size']
    maxRows?: number
    minRows?: number
    hint?: string
    autoSize?: boolean
    onChange?: (value?: string) => void
    onBlur?: () => void
  },
  TextareaVariants
>
