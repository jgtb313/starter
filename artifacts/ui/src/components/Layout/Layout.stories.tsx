import { Meta, StoryFn } from '@storybook/react'

import { Layout } from './Layout'

export default {
  title: 'Layout/Layout',
  component: Layout,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Layout component to render button with optional icon and link functionality',
      },
    },
  },
  argTypes: {},
} as Meta

const Template: StoryFn<React.ComponentProps<typeof Layout>> = (args) => <Layout {...args} />

export const Default = Template.bind({})
Default.args = {}
