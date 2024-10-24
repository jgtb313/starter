import { tv, VariantProps } from 'tailwind-variants'

export const SkeletonStyles = tv({
  slots: {
    root: ''
  }
})
export type SkeletonVariants = VariantProps<typeof SkeletonStyles>
