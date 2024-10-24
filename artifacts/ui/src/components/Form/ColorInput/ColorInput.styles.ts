import { tv, VariantProps } from 'tailwind-variants'

export const ColorInputStyles = tv({
  slots: {
    body: '',
    error: 'mt-2'
  }
})
export type ColorInputVariants = VariantProps<typeof ColorInputStyles>
