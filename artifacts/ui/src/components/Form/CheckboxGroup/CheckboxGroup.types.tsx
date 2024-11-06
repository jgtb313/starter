import { CheckboxProps as ComponentProps, CheckboxGroupProps as ComponentGroupProps, FlexProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

type CheckboxItems = { label: string; value: string; disabled?: boolean }[]

export type CheckboxGroupProps = BaseComponent<{
  name: string
  label?: string
  size?: ComponentGroupProps['size']
  type?: FlexProps['direction']
  items?: CheckboxItems
  labelPosition?: ComponentProps['labelPosition']
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
  hint?: string
  onChange?: (value: string[]) => void
}>
