import { RadioProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type RadioProps = BaseComponent<{
  name: string
  label?: String
  size?: ComponentProps['size']
  labelPosition?: ComponentProps['labelPosition']
  hint?: string
  clearable?: boolean
  onChange?: (value: boolean) => void
}>
