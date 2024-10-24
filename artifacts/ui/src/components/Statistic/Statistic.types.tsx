import { SimpleGridProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'
import { IconProps } from '../Icon'
import { StatisticVariants } from './Statistic.styles'

type StatisticItem = {
  title: string
  description?: string
  value?: number | string
  valueChange?: number | string
  valueChangeMode?: 'up' | 'down'
  icon?: IconProps['name']
}

export type StatisticProps = BaseComponent<
  {
    cols?: SimpleGridProps['cols']
    spacing?: SimpleGridProps['spacing']
    verticalSpacing?: SimpleGridProps['verticalSpacing']
    items?: StatisticItem[]
  },
  StatisticVariants
>
