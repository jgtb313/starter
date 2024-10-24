import { tv, VariantProps } from 'tailwind-variants'

export const SwitchStyles = tv({
  slots: {
    root: '',
    error: 'mt-2'
  }
})
export type SwitchVariants = VariantProps<typeof SwitchStyles>
