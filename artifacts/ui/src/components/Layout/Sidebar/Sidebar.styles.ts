import { tv } from 'tailwind-variants'

export const SidebarStyles = tv({
  slots: {
    root: 'w-[rem(80px)] flex pt-6 flex-col bg-[light-dark(var(--mantine-color-gray-1),var(--mantine-color-dark-6))]',
    main: 'flex flex-1 justify-center pt-8',
    item: 'w-[rem(50px)] h-[rem(50px)] flex justify-center rounded-[var(--mantine-radius-md)] items-center bg-[light-dark(var(--mantine-color-gray-1),var(--mantine-color-dark-6))] hover:bg-[light-dark(var(--mantine-color-gray-2),var(--mantine-color-dark-5))] data-[active=true]:bg-[light-dark(var(--mantine-color-gray-3),var(--mantine-color-dark-7))]',
    footer:
      'flex items-center justify-center border-t-[light-dark(var(--mantine-color-gray-3),var(--mantine-color-dark-4))] border-t border-solid p-3 cursor-pointer'
  }
})
