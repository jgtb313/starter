import { BaseComponent } from '@/support/types'
import { SpinningVariants } from './Spinning.styles'

export type SpinningProps = BaseComponent<
  {
    loading?: boolean
  },
  SpinningVariants
>
