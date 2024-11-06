import { RadioGroupProps as ComponentProps, FlexProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

type RadioGroupItems = { label: string; value: string }[]

export type RadioGroupProps = BaseComponent<{
  name: string
  label?: string
  value?: string
  items?: RadioGroupItems
  size?: ComponentProps['size']
  type?: FlexProps['direction']
  onChange?: (value: string) => void
}>
