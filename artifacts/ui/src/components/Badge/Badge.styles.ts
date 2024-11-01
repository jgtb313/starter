import { tv, VariantProps } from 'tailwind-variants'

export const BadgeStyles = tv({
  slots: {
    root: '',
  },
})
export type BadgeVariants = VariantProps<typeof BadgeStyles>
