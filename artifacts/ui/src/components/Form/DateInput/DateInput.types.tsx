import { DateInputProps as ComponentProps } from '@mantine/dates'

import { BaseComponent } from '@/support/types'
import { DateInputVariants } from './DateInput.styles'

export type DateInputProps = BaseComponent<
  {
    name: string
    type?: 'default' | 'range'
    label?: string
    placeholder?: string
    size?: ComponentProps['size']
    leftSection?: React.ReactNode
    rightSection?: React.ReactNode
    hint?: string
    onChange?: (value?: string) => void
    onBlur?: () => void
  },
  DateInputVariants
>
