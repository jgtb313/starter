import { tv, VariantProps } from 'tailwind-variants'

export const FormStyles = tv({
  slots: {
    root: 'w-full h-full'
  }
})
export type FormVariants = VariantProps<typeof FormStyles>
