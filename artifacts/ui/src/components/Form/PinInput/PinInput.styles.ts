import { tv, VariantProps } from 'tailwind-variants'

export const PinInputStyles = tv({
  slots: {
    root: 'justify-center',
    error: 'mt-2'
  }
})
export type PinInputVariants = VariantProps<typeof PinInputStyles>
