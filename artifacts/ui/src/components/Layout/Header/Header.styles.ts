import { tv, VariantProps } from 'tailwind-variants'

export const HeaderStyles = tv({
  base: 'w-full px-6 py-[4px] border-b border-b-[light-dark(var(--mantine-color-gray-3),var(--mantine-color-dark-4))] border-solid',
})
export type HeaderVariants = VariantProps<typeof HeaderStyles>

export const HeaderStartStyles = tv({
  base: 'h-full flex items-center float-left',
})
export type HeaderStartVariants = VariantProps<typeof HeaderStartStyles>

export const HeaderEndStyles = tv({
  base: 'h-full flex items-center float-right',
})
export type HeaderEndVariants = VariantProps<typeof HeaderEndStyles>
