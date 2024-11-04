import { tv, VariantProps } from 'tailwind-variants'

export const CardStyles = tv({
  slots: {
    root: '',
    header: '',
    body: '',
    footer: '',
  },
  variants: {
    bordered: {
      true: {
        header: 'border-b border-solid border-b-[light-dark(var(--mantine-color-gray-3),var(--mantine-color-dark-4))]',
        footer: 'border-t border-solid border-t-[light-dark(var(--mantine-color-gray-3),var(--mantine-color-dark-4))]',
      },
    },
  },
})
export type CardVariants = VariantProps<typeof CardStyles>
