import { tv, VariantProps } from 'tailwind-variants'

export const DropdownStyles = tv({
  slots: {
    dropdown: 'min-w-[120px]',
    dropdownButton: 'rounded-tr-none rounded-br-none',
    dropdownButtonTarget: 'rounded-tr-none rounded-br-none border-l-[color:var(--mantine-color-body)] border-l-[rem(1px)] border-solid cursor-pointer'
  }
})
export type DropdownVariants = VariantProps<typeof DropdownStyles>
