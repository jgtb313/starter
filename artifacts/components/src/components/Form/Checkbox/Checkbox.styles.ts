import { tv, VariantProps } from 'tailwind-variants'

export const CheckboxStyles = tv({
  slots: {
    root: '',
    error: 'mt-2'
  }
})
export type CheckboxVariants = VariantProps<typeof CheckboxStyles>
