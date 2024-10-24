import { tv, VariantProps } from 'tailwind-variants'

export const CardStyles = tv({
  slots: {
    root: '',
    title: '',
    body: ''
  },
  variants: {
    title: {
      true: {
        body: 'mt-[var(--mantine-spacing-lg)]'
      }
    }
  }
})
export type CardVariants = VariantProps<typeof CardStyles>
