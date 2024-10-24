import { CardProps as ComponentProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'
import { CardVariants } from './Card.styles'

export type CardProps = BaseComponent<
  {
    w?: ComponentProps['w']
    h?: ComponentProps['h']
    mih?: ComponentProps['mih']
    maw?: ComponentProps['maw']
    miw?: ComponentProps['miw']
    mah?: ComponentProps['mah']
    mt?: ComponentProps['mt']
    mb?: ComponentProps['mb']
    mr?: ComponentProps['mr']
    ml?: ComponentProps['ml']
    mx?: ComponentProps['mx']
    my?: ComponentProps['my']
    pt?: ComponentProps['pt']
    pb?: ComponentProps['pb']
    pr?: ComponentProps['pr']
    pl?: ComponentProps['pl']
    px?: ComponentProps['px']
    py?: ComponentProps['py']
    title?: React.ReactNode
    description?: React.ReactNode
    shadow?: ComponentProps['shadow']
    bordered?: boolean
  },
  CardVariants
>
