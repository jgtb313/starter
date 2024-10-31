import { Meta, StoryFn } from '@storybook/react'

import { Form } from './Form'

export default {
  title: 'Form/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Form component to render button with optional icon and link functionality',
      },
    },
  },
  argTypes: {},
} as Meta

const Template: StoryFn<React.ComponentProps<typeof Form>> = (args) => <Form {...args} />

export const Default = Template.bind({})
Default.args = {}
