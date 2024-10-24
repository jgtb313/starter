import { RadioProps as MRadioProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'
import { RadioVariants } from './Radio.styles'

export type RadioProps = BaseComponent<
  {
    name: string
    label?: String
    size?: MRadioProps['size']
    labelPosition?: MRadioProps['labelPosition']
    hint?: string
    clearable?: boolean
    onChange?: (value: boolean) => void
  },
  RadioVariants
>
