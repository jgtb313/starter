import { tv, VariantProps } from 'tailwind-variants'

export const ListStyles = tv({
  slots: {
    root: 'w-full'
  }
})
export type ListVariants = VariantProps<typeof ListStyles>
