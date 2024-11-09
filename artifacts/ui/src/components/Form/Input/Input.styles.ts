import { tv, VariantProps } from 'tailwind-variants'

export const InputStyles = tv({
  slots: {
    root: 'w-full',
    wrapper: '',
    label: 'mb-1',
    error: 'mt-2',
  },
})
export type InputVariants = VariantProps<typeof InputStyles>
