import { BaseComponent } from '@/support/types'
import { PillVariants } from './Pill.styles'

export type PillProps = BaseComponent<
  {
    closable?: boolean
    onRemove?: () => void
  },
  PillVariants
>
