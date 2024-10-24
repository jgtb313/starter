import { tv, VariantProps } from 'tailwind-variants'

export const PasswordInputStyles = tv({
  slots: {
    root: 'relative',
    label: 'mb-1',
    input:
      'text-base pt-3 placeholder:transition-[color] placeholder:duration ease-[ease] placeholder:text-transparent data-[floating]:placeholder:text-[color:var(--mantine-color-placeholder)]',
    innerInput: 'pt-3',
    required: 'transition-opacity duration ease-[ease] opacity-0 data-[floating]:opacity-100',
    error: 'mt-2'
  }
})
export type PasswordInputVariants = VariantProps<typeof PasswordInputStyles>
