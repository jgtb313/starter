import { tv, VariantProps } from 'tailwind-variants'

export const ButtonStyles = tv({
  slots: {
    root: '',
    label: 'overflow-visible',
  },
  variants: {
    variant: {
      transparent: {
        root: 'p-0',
      },
    },
  },
})
export type ButtonVariants = VariantProps<typeof ButtonStyles>
