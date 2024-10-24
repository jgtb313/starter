import { tv, VariantProps } from 'tailwind-variants'

export const TextareaStyles = tv({
  slots: {
    root: '',
    error: 'mt-2'
  }
})
export type TextareaVariants = VariantProps<typeof TextareaStyles>
