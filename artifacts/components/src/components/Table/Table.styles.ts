import { tv, VariantProps } from 'tailwind-variants'

export const TableStyles = tv({
  slots: {
    root: 'border border-[light-dark(var(--mantine-color-gray-1),var(--mantine-color-dark-6))] rounded-md overflow-hidden',
    table: '',
    thead: 'bg-[light-dark(var(--mantine-color-gray-1),var(--mantine-color-dark-6))]',
    th: ''
  },
  variants: {
    sorter: {
      true: {
        th: 'cursor-pointer hover:bg-[light-dark(var(--mantine-color-gray-2),var(--mantine-color-dark-4))]'
      }
    },
    sorted: {
      true: {
        th: 'bg-[light-dark(var(--mantine-color-gray-2),var(--mantine-color-dark-4))]'
      }
    }
  }
})
export type TableVariants = VariantProps<typeof TableStyles>
