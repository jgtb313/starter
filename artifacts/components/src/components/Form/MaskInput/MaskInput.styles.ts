import { tv, VariantProps } from 'tailwind-variants'

export const MaskInputStyles = tv({
  slots: {
    root: 'w-full',
    input: '',
    label: 'mb-1',
    error: 'mt-2'
  }
})
export type MaskInputVariants = VariantProps<typeof MaskInputStyles>
