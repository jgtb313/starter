import { PinInputProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type PinInputProps = BaseComponent<{
  name: string
  length?: number
  size?: ComponentProps['size']
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
  onChange?: (value?: string) => void
  onBlur?: () => void
}>
