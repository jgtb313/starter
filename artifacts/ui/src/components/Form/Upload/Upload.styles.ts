import { tv, VariantProps } from 'tailwind-variants'

export const UploadStyles = tv({
  slots: {
    root: '',
    error: 'mt-2'
  },
  variants: {
    disabled: {
      true: {
        root: 'opacity-50 cursor-not-allowed'
      }
    }
  }
})
export type UploadVariants = VariantProps<typeof UploadStyles>
