import { PinInputProps as MPinInputProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'
import { PinInputVariants } from './PinInput.styles'

export type PinInputProps = BaseComponent<
  {
    name: string
    length?: number
    size?: MPinInputProps['size']
    leftSection?: React.ReactNode
    rightSection?: React.ReactNode
    onChange?: (value?: string) => void
    onBlur?: () => void
  },
  PinInputVariants
>
