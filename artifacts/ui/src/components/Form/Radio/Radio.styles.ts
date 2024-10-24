import { tv, VariantProps } from 'tailwind-variants'

export const RadioStyles = tv({
  slots: {
    root: '',
    error: 'mt-2'
  }
})
export type RadioVariants = VariantProps<typeof RadioStyles>
