import { tv } from 'tailwind-variants'

export const ContentStyles = tv({
  base: '',
  variants: {
    centered: {
      true: 'flex items-center justify-center min-h-screen',
    },
  },
})
