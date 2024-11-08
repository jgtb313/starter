import { tv } from 'tailwind-variants'

export const SidebarStyles = tv({
  slots: {
    root: '',
    main: '',
    item: 'w-[rem(50px)] h-[rem(50px)] flex items-center justify-center rounded-[var(--mantine-radius-md)] hover:bg-[light-dark(var(--mantine-color-gray-2),var(--mantine-color-dark-5))]',
  },
  variants: {
    active: {
      true: {
        item: 'bg-[light-dark(var(--mantine-color-gray-1),var(--mantine-color-dark-6))]',
      },
    },
  },
})
