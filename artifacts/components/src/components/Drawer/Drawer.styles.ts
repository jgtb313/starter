import { tv, VariantProps } from 'tailwind-variants'

export const DrawerStyles = tv({
  slots: {
    root: '',
    header: 'border-b border-[light-dark(var(--mantine-color-gray-1),var(--mantine-color-dark-6))]',
    title: '',
    content: 'flex flex-col',
    body: 'flex-1',
    footer:
      'bg-[light-dark(var(--mantine-color-white),var(--mantine-color-dark-7))] w-full border-t border-[light-dark(var(--mantine-color-gray-1),var(--mantine-color-dark-6))] p-5'
  },
  variants: {
    padding: {
      true: {
        body: 'p-5'
      },
      false: {
        body: 'p-0'
      }
    }
  }
})
export type DrawerVariants = VariantProps<typeof DrawerStyles>
