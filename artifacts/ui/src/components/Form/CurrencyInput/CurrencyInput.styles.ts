import { tv, VariantProps } from 'tailwind-variants'

export const CurrencyInputStyles = tv({
  slots: {
    root: '',
    error: 'mt-2'
  }
})
export type CurrencyInputVariants = VariantProps<typeof CurrencyInputStyles>
