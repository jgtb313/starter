import { CheckboxProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type CheckboxProps = BaseComponent<{
  name: string
  label?: String
  size?: ComponentProps['size']
  labelPosition?: ComponentProps['labelPosition']
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
  hint?: string
  indeterminate?: boolean
  disabled?: boolean
  onChange?: (value: boolean) => void
}>
