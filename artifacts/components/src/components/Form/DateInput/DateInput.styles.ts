import { tv, VariantProps } from 'tailwind-variants'

export const DateInputStyles = tv({
  slots: {
    root: '',
    error: 'mt-2'
  }
})
export type DateInputVariants = VariantProps<typeof DateInputStyles>
