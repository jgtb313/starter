import { tv, VariantProps } from 'tailwind-variants'

export const RadioGroupStyles = tv({
  slots: {
    root: '',
    label: 'mb-1',
    body: 'items-center',
    error: 'mt-2'
  }
})
export type RadioGroupVariants = VariantProps<typeof RadioGroupStyles>
