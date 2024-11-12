import { tv } from 'tailwind-variants'

export const ModalStyles = tv({
  slots: {
    root: '',
  },
})

export const ModalHeaderStyles = tv({
  slots: {
    root: '',
    title: '',
  },
  variants: {
    centered: {
      true: {
        title: 'w-full justify-center items-center',
      },
    },
    bordered: {
      true: {
        root: 'border-b border-[light-dark(var(--mantine-color-gray-1),var(--mantine-color-dark-6))]',
      },
    },
  },
})
