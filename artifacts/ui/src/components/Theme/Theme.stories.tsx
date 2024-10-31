import { Meta, StoryFn } from '@storybook/react'

const Theme = ({}) => <></>

export default {
  title: 'Theme/Theme',
  component: Theme,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Theme component to render button with optional icon and link functionality',
      },
    },
  },
  argTypes: {},
} as Meta

const Template: StoryFn<React.ComponentProps<typeof Theme>> = (args) => <Theme {...args} />

export const Default = Template.bind({})
Default.args = {}
