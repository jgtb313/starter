import { BaseComponent } from '@/support/types'
import { LinkProps } from '../Link'

type BreadcrumbItemProps = {
  label: string
  href?: LinkProps['href']
  target?: LinkProps['target']
}

export type BreadcrumbsProps = BaseComponent<{
  items: BreadcrumbItemProps[]
}>
