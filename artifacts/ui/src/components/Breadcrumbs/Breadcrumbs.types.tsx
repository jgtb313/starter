import { BaseComponent } from '@/support/types'

type BreadcrumbItemProps = {
  label: string
  href?: string
}

export type BreadcrumbsProps = BaseComponent<{
  items: BreadcrumbItemProps[]
}>
