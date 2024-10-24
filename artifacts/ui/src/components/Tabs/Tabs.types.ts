import { PropsWithChildren } from 'react'

import { BaseComponent } from '@/support/types'
import { IconProps } from '../Icon'
import { TabsVariants } from './Tabs.styles'

export type TabItemProps = PropsWithChildren<{
  label: string
  value: string
  icon?: IconProps['name']
}>

export type TabsProps = BaseComponent<
  {
    value?: string | null
    items?: TabItemProps[]
    padding?: boolean
    grow?: boolean
    fixed?: boolean
    onChange?: (value: string) => void
  },
  TabsVariants
>
