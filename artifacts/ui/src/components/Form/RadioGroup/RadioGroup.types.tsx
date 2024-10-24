import { RadioGroupProps as MRadioGroupProps, FlexProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'
import { RadioGroupVariants } from './RadioGroup.styles'

type RadioGroupItems = { label: string; value: string }[]

export type RadioGroupProps = BaseComponent<
  {
    name: string
    label?: string
    value?: string
    items?: RadioGroupItems
    size?: MRadioGroupProps['size']
    type?: FlexProps['direction']
    onChange?: (value: string) => void
  },
  RadioGroupVariants
>
