import { Meta, StoryFn } from '@storybook/react'

import { Icon } from '../Icon'
import { ActionButton } from './ActionButton'

export default {
  title: 'Components/ActionButton',
  component: ActionButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ActionButton component to render button with optional icon and link functionality',
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
      description: 'The color of the button.',
    },
    variant: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['filled', 'light', 'outline', 'transparent', 'white', 'subtle', 'default', 'gradient'],
      description: 'The variant style of the button.',
    },
    size: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size of the button.',
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
      options: ['_blank'],
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
    },
    loading: {
      type: 'boolean',
      control: {
        type: 'radio',
      },
      options: [true, false],
      description: 'Indicates if the button is in a loading state.',
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
} as Meta

const Template: StoryFn<React.ComponentProps<typeof ActionButton>> = (args) => <ActionButton {...args} />

export const Default = Template.bind({})
Default.args = {
  color: 'primary',
  variant: 'filled',
  size: 'md',
  children: <Icon name="Heart" width={20} height={20} strokeWidth={1.5} />,
}
