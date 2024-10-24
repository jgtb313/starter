import { BaseComponent } from '@/support/types'
import { IconProps } from '@/components'

export type SidebarItemProps = BaseComponent<{
  label: string
  href: string
  icon: IconProps['name']
  active?: boolean
}>

export type SidebarProps = BaseComponent<{
  active?: string
  items?: SidebarItemProps[]
  header?: React.ReactNode
  footer?: React.ReactNode
}>
