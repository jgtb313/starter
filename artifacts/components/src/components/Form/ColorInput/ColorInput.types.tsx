import { InputProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'
import { ColorInputVariants } from './ColorInput.styles'

export type ColorInputProps = BaseComponent<
  {
    name: string
    label?: string
    size?: InputProps['size']
    disabled?: boolean
    onChange?: (value?: string) => void
  },
  ColorInputVariants
>
