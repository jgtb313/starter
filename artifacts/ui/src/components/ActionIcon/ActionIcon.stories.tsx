import { Meta, StoryFn } from '@storybook/react'

import { ActionIcon } from './ActionIcon'
import { ActionIconProps } from './ActionIcon.types'

export default {
  title: 'Components/ActionIcon',
  component: ActionIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ActionIcon component displays an icon with customizable actions, providing an interactive icon button for user interactions.',
      },
    },
  },
  argTypes: {
    icon: {
      type: 'string',
      control: {
        type: 'text',
      },
      description: 'A valid icon name from Tabler React Icons. Refer to the Tabler Icons library for available options.',
    },
    color: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['primary', 'dark', 'gray', 'red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'green', 'lime', 'yellow', 'orange', 'teal'],
      description: 'The color of the button.',
      table: { defaultValue: { summary: 'primary' } },
    },
    variant: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['filled', 'light', 'outline', 'transparent', 'white', 'subtle', 'default', 'gradient'],
      description: 'The variant style of the button.',
      table: { defaultValue: { summary: 'filled' } },
    },
    size: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size of the button.',
      table: { defaultValue: { summary: 'md' } },
    },
    href: {
      type: 'string',
      control: 'text',
      description: 'Optional link to which the button redirects.',
    },
    target: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['_blank', '_parent', '_self', '_top'],
      description: 'Specifies where to open the linked document. Use _blank to open in a new tab.',
    },
    tooltip: {
      type: 'string',
      control: 'text',
      description: 'Optional tooltip text that appears on hover over the button.',
    },
    disabled: {
      type: 'boolean',
      control: {
        type: 'radio',
      },
      options: [true, false],
      description: 'Indicates whether the button is disabled.',
      table: { defaultValue: { summary: 'false' } },
    },
    loading: {
      type: 'boolean',
      control: {
        type: 'radio',
      },
      options: [true, false],
      description: 'Indicates if the button is in a loading state.',
      table: { defaultValue: { summary: 'false' } },
    },
    onClick: {
      type: 'function',
      action: 'clicked',
      description: 'Function called when the button is clicked.',
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<ActionIconProps>

const Template: StoryFn<React.ComponentProps<typeof ActionIcon>> = (args) => <ActionIcon {...args} />

export const Default = Template.bind({})
Default.args = {
  icon: 'IconHeart',
  color: 'primary',
  variant: 'filled',
  size: 'md',
}
