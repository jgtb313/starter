import { CheckboxProps as MCheckboxProps, CheckboxGroupProps as MCheckboxGroupProps, FlexProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'
import { CheckboxGroupVariants } from './CheckboxGroup.styles'

type CheckboxItems = { label: string; value: string; disabled?: boolean }[]

export type CheckboxGroupProps = BaseComponent<
  {
    name: string
    label?: string
    size?: MCheckboxGroupProps['size']
    type?: FlexProps['direction']
    items?: CheckboxItems
    labelPosition?: MCheckboxProps['labelPosition']
    leftSection?: React.ReactNode
    rightSection?: React.ReactNode
    hint?: string
    onChange?: (value: string[]) => void
  },
  CheckboxGroupVariants
>
