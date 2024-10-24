import { tv, VariantProps } from 'tailwind-variants'

export const ContentStyles = tv({
  base: 'flex-1 h-screen',
  variants: {
    centered: {
      true: 'flex justify-center items-center'
    }
  }
})
export type ContentVariants = VariantProps<typeof ContentStyles>
