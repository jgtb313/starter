import { Meta, StoryFn } from '@storybook/react'

import { Breadcrumbs } from './Breadcrumbs'
import { BreadcrumbsProps } from './Breadcrumbs.types'

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Breadcrumbs component for navigation hierarchy.',
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items, each containing a label and optional href.',
    },
  },
} as Meta<BreadcrumbsProps>

const Template: StoryFn<React.ComponentProps<typeof Breadcrumbs>> = (args) => <Breadcrumbs {...args} />

export const Default = Template.bind({})
Default.args = {
  items: [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptops' },
  ],
}
