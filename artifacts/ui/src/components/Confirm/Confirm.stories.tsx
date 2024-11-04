import { Meta, StoryFn } from '@storybook/react'

import { confirm } from './Confirm'
import { ConfirmProps } from './Confirm.types'
import { Button } from '../Button'
import React from 'react'

const Component = (props: ConfirmProps) => React.createElement('div', props)

export default {
  title: 'Components/Confirm',
  component: Component,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A confirmation dialog that displays a message with confirm and cancel options. Useful for prompting user confirmation before critical actions.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the confirm dialog.',
      type: 'string',
    },
    description: {
      control: 'text',
      description: 'Description text for the confirm dialog.',
      type: 'string',
    },
    confirmLabel: {
      control: 'text',
      description: 'Label text for the confirm button.',
      type: 'string',
      table: { defaultValue: { summary: 'Confirm' } },
    },
    cancelLabel: {
      control: 'text',
      description: 'Label text for the cancel button.',
      type: 'string',
      table: { defaultValue: { summary: 'Cancel' } },
    },
    closable: {
      control: 'boolean',
      description: 'Determines if the dialog can be closed without action.',
      type: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    onConfirm: {
      action: 'confirmed',
      description: 'Function called when the confirm action is triggered.',
      type: 'function',
    },
    onCancel: {
      action: 'cancelled',
      description: 'Function called when the cancel action is triggered.',
      type: 'function',
    },
  },
} as Meta<ConfirmProps>

const Template: StoryFn<React.ComponentProps<typeof Component>> = (args) => {
  return <Button onClick={() => confirm(args)}>Open Confirm</Button>
}

export const Default = Template.bind({})
Default.args = {
  title: 'Delete Item',
  description: 'Are you sure you want to delete this item? This action cannot be undone.',
}
