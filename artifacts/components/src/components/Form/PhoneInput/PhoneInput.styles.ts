import { tv, VariantProps } from 'tailwind-variants'

export const PhoneInputStyles = tv({
  slots: {
    root: 'w-full',
    input: 'border-none bg-transparent px-2 -my-[1px]',
    wrapper: 'flex border border-[var(--input-bd)] rounded-[--input-radius] data-[error=true]:border-[var(--mantine-color-error)]',
    section: 'w-auto relative flex justify-start border-r border-[var(--input-bd)] -mt-[1px]',
    label: 'mb-1',
    countryRoot: 'cursor-pointer border-0 p-2 py-0 px-[6px]',
    countryDropdown: 'overflow-y-auto',
    error: 'mt-2'
  },
  variants: {
    focused: {
      true: {
        wrapper: 'border-[var(--input-bd-focus)] data-[error=true]:border-[var(--mantine-color-error)]'
      },
      false: {}
    }
  }
})
export type PhoneInputVariants = VariantProps<typeof PhoneInputStyles>
