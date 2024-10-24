import { SwitchProps as MSwitchProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'
import { SwitchVariants } from './Switch.styles'

export type SwitchProps = BaseComponent<
  {
    name: string
    label?: string
    value?: string | string[]
    size?: MSwitchProps['size']
    hint?: string
    onChange?: (value: boolean) => void
  },
  SwitchVariants
>
