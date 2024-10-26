import { tv, VariantProps } from 'tailwind-variants'

export const ButtonStyles = tv({
  slots: {
    root: '',
    label: '',
  },
  variants: {},
})
export type ButtonVariants = VariantProps<typeof ButtonStyles>
