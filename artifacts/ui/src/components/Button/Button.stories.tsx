import { Meta, StoryFn } from '@storybook/react'

import { Button } from './Button'

export default {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button component to render button or link',
      },
    },
  },
  argTypes: {
    type: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['submit', 'reset', 'button'],
      description: 'The type of button to be rendered.',
    },
    color: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['primary', 'dark', 'gray', 'red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'green', 'lime', 'yellow', 'orange', 'teal'],
      description: 'The color of the button.',
    },
    size: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'compact-xs', 'compact-sm', 'compact-md', 'compact-lg', 'compact-xl'],
      description: 'The size of the button.',
    },
    variant: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['filled', 'light', 'outline', 'transparent', 'white', 'subtle', 'default', 'gradient'],
      description: 'The variant style of the button.',
    },
    radius: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The border radius of the button.',
    },
    block: {
      type: 'boolean',
      control: {
        type: 'radio',
      },
      options: [true, false],
      description: 'Indicates whether the button should take the full width of its container.',
    },
    loading: {
      type: 'boolean',
      control: {
        type: 'radio',
      },
      options: [true, false],
      description: 'Indicates if the button is in a loading state.',
    },
    disabled: {
      type: 'boolean',
      control: {
        type: 'radio',
      },
      options: [true, false],
      description: 'Indicates whether the button is disabled.',
    },
    onClick: {
      type: 'function',
      action: 'clicked',
      description: 'Function called when the button is clicked.',
    },
  },
} as Meta

const Template: StoryFn<React.ComponentProps<typeof Button>> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
  size: 'md',
  children: 'Primary Button',
}
