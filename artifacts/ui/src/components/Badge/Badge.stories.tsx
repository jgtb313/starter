import { Meta, StoryFn } from '@storybook/react'

import { Badge } from './Badge'
import { BadgeProps } from './Badge.types'
import { Icon } from '../Icon'

export default {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badge component to display labels, tags, or statuses.',
      },
    },
  },
  argTypes: {
    color: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['primary', 'dark', 'gray', 'red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'green', 'lime', 'yellow', 'orange', 'teal'],
      description: 'The color of the badge.',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the badge.',
      table: { defaultValue: { summary: 'md' } },
    },
    variant: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['filled', 'outline', 'light', 'dot', 'default', 'gradient'],
      description: 'The variant style of the badge.',
      table: { defaultValue: { summary: 'filled' } },
    },
    radius: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Border radius of the badge.',
      table: { defaultValue: { summary: 'sm' } },
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
      table: { defaultValue: { summary: 'false' } },
    },
    block: {
      type: 'boolean',
      control: {
        type: 'radio',
      },
      options: [true, false],
      description: 'Determines if the badge should take the full width of its container.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
} as Meta<BadgeProps>

const Template: StoryFn<React.ComponentProps<typeof Badge>> = (args) => <Badge {...args} />

export const Default = Template.bind({})
Default.args = {
  color: 'primary',
  size: 'md',
  variant: 'filled',
  radius: 'md',
  children: 'Badge',
}

export const Sections = Template.bind({})
Sections.args = {
  color: 'primary',
  size: 'md',
  variant: 'filled',
  radius: 'md',
  children: 'Badge',
  leftSection: <Icon name="IconHeart" width={14} height={14} />,
  rightSection: <Icon name="IconHeart" width={14} height={14} />,
}

export const LeftSection = Template.bind({})
LeftSection.args = {
  color: 'primary',
  size: 'md',
  variant: 'filled',
  radius: 'md',
  children: 'Badge',
  leftSection: <Icon name="IconHeart" width={14} height={14} />,
}

export const RightSection = Template.bind({})
RightSection.args = {
  color: 'primary',
  size: 'md',
  variant: 'filled',
  radius: 'md',
  children: 'Badge',
  rightSection: <Icon name="IconHeart" width={14} height={14} />,
}
