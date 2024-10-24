import { tv, VariantProps } from 'tailwind-variants'

export const BreadcrumbsStyles = tv({
  slots: {
    root: '',
    item: ''
  }
})
export type BreadcrumbsVariants = VariantProps<typeof BreadcrumbsStyles>
