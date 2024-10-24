import { tv, VariantProps } from 'tailwind-variants'

export const GridStyles = tv({
  slots: {
    root: ''
  }
})
export type GridVariants = VariantProps<typeof GridStyles>

export const GridItemStyles = tv({
  slots: {
    root: ''
  }
})
export type GridItemVariants = VariantProps<typeof GridItemStyles>
