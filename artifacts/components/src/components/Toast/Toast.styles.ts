import { tv, VariantProps } from 'tailwind-variants'

export const ToastStyles = tv({
  slots: {
    root: '',
    title: 'text-xl',
    description: 'text-lg'
  }
})
export type ToastVariants = VariantProps<typeof ToastStyles>
