import { tv, VariantProps } from 'tailwind-variants'

export const ButtonStyles = tv({
  slots: {
    root: '',
    label: 'overflow-visible'
  },
  variants: {
    variant: {
      filled: {
        root: ''
      },
      light: {
        root: ''
      },
      outline: {
        root: ''
      },
      transparent: {
        root: 'p-0'
      },
      white: {
        root: ''
      },
      subtle: {
        root: ''
      },
      default: {
        root: ''
      },
      gradient: {
        root: ''
      }
    }
  }
})
export type ButtonVariants = VariantProps<typeof ButtonStyles>
