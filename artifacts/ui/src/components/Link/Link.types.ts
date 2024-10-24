import { BaseComponent } from '@/support/types'
import { TypographyProps } from '../Typography'

export type LinkProps = BaseComponent<
  {
    href: string
    target?: '_blank'
  },
  Omit<TypographyProps, 'component'>
>
