import { tv, VariantProps } from 'tailwind-variants'

export const TabsStyles = tv({
  slots: {
    tab: '',
    tabLabel: 'font-semibold text-[1rem] leading-[1.5rem]',
    tabPanel: 'pt-4',
    list: 'bg-[light-dark(var(--mantine-color-white),var(--mantine-color-dark-7))]'
  },
  variants: {
    padding: {
      true: {
        tabPanel: 'p-4'
      }
    },
    fixed: {
      true: {
        list: 'sticky top-0'
      }
    }
  }
})
export type TabsVariants = VariantProps<typeof TabsStyles>
