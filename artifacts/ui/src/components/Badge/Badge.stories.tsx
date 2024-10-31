import { Meta, StoryFn } from '@storybook/react'

import { Badge } from './Badge'

export default {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badge component to display labels or statuses with optional sections and styles.',
      },
    },
  },
  argTypes: {
    variant: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['filled', 'outline', 'light', 'dot', 'default', 'gradient'],
      description: 'The variant style of the badge.',
    },
    color: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['primary', 'dark', 'gray', 'red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'green', 'lime', 'yellow', 'orange', 'teal'],
      description: 'The color of the badge.',
    },
    size: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the badge.',
    },
    radius: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Border radius of the badge.',
    },
    leftSection: {
      control: 'object',
      description: 'Optional element to display on the left side of the badge.',
    },
    rightSection: {
      control: 'object',
      description: 'Optional element to display on the right side of the badge.',
    },
    circle: {
      type: 'boolean',
      control: {
        type: 'radio',
      },
      options: [true, false],
      description: 'Indicates if the badge should be displayed as a circle.',
    },
    block: {
      type: 'boolean',
      control: {
        type: 'radio',
      },
      options: [true, false],
      description: 'Determines if the badge should take the full width of its container.',
    },
  },
} as Meta

const Template: StoryFn<React.ComponentProps<typeof Badge>> = (args) => <Badge {...args} />

export const Default = Template.bind({})
Default.args = {
  variant: 'filled',
  color: 'blue',
  size: 'md',
  radius: 'sm',
  children: 'Badge Label',
}
