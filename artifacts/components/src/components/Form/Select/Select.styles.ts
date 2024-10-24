import { tv, VariantProps } from 'tailwind-variants'

export const SelectStyles = tv({
  slots: {
    root: '',
    error: 'mt-2'
  }
})
export type SelectVariants = VariantProps<typeof SelectStyles>
