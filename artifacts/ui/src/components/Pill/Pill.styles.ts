import { tv, VariantProps } from 'tailwind-variants'

export const PillStyles = tv({
  slots: {
    root: 'bg-[light-dark(var(--mantine-color-gray-2),var(--mantine-color-dark-4))]'
  }
})
export type PillVariants = VariantProps<typeof PillStyles>
