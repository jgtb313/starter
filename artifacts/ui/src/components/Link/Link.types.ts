import { BaseComponent } from '@/support/types'
import { TypographyProps } from '../Typography'

export type LinkProps = BaseComponent<{
  href: string
  target?: '_blank' | '_parent' | '_self' | '_top'
}> &
  Omit<TypographyProps, 'component'>
