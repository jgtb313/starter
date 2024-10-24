import { tv, VariantProps } from 'tailwind-variants'

export const CheckboxGroupStyles = tv({
  slots: {
    root: '',
    error: 'mt-2'
  }
})
export type CheckboxGroupVariants = VariantProps<typeof CheckboxGroupStyles>
