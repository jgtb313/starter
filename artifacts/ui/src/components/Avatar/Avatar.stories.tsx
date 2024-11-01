import { Meta, StoryFn } from '@storybook/react'

import { Avatar } from './Avatar'

export default {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar component for displaying user profile images.',
      },
    },
  },
  argTypes: {
    src: {
      type: 'string',
      control: 'text',
      description: 'URL of the image to display in the avatar.',
    },
    alt: {
      type: 'string',
      control: 'text',
      description: 'Alternative text for the avatar image.',
    },
    size: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatar.',
      table: { defaultValue: { summary: 'md' } },
    },
    radius: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Border radius of the avatar for rounded corners.',
      table: { defaultValue: { summary: 'xl' } },
    },
  },
} as Meta

const Template: StoryFn<React.ComponentProps<typeof Avatar>> = (args) => <Avatar {...args} />

export const Default = Template.bind({})
Default.args = {
  src: 'https://i.pravatar.cc/300',
  alt: 'User Avatar',
  size: 'md',
  radius: 'xl',
}

export const Name = Template.bind({})
Name.args = {
  size: 'md',
  radius: 'xl',
  children: 'JD',
}
