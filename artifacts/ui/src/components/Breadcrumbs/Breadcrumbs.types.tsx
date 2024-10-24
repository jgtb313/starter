import { BaseComponent } from '@/support/types'
import { BreadcrumbsVariants } from './Breadcrumbs.styles'

type BreadcrumbItemProps = {
  label: string
  href?: string
}

export type BreadcrumbsProps = BaseComponent<
  {
    items: BreadcrumbItemProps[]
  },
  BreadcrumbsVariants
>
