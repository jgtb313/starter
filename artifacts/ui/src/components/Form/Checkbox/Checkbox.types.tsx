import { CheckboxProps as MCheckboxProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'
import { CheckboxVariants } from './Checkbox.styles'

export type CheckboxProps = BaseComponent<
  {
    name: string
    label?: String
    size?: MCheckboxProps['size']
    labelPosition?: MCheckboxProps['labelPosition']
    leftSection?: React.ReactNode
    rightSection?: React.ReactNode
    hint?: string
    indeterminate?: boolean
    disabled?: boolean
    onChange?: (value: boolean) => void
  },
  CheckboxVariants
>
