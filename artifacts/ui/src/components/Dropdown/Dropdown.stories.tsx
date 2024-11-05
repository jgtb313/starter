import { Meta, StoryFn } from '@storybook/react'

import { Button } from '../Button'
import { Dropdown } from './Dropdown'
import { DropdownProps } from './Dropdown.types'

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Dropdown component displays a list of actions or options in a dropdown menu format, allowing customizable interactions.',
      },
    },
  },
  argTypes: {
    open: {
      type: 'boolean',
      control: 'boolean',
      description: 'Controls whether the dropdown menu is open.',
      table: { defaultValue: { summary: 'false' } },
    },
    width: {
      type: 'string',
      control: 'text',
      description: 'The width of the dropdown menu.',
    },
    position: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['left', 'right', 'center'],
      description: 'The position of the dropdown menu relative to the trigger.',
      table: { defaultValue: { summary: 'right' } },
    },
    trigger: {
      type: 'string',
      control: {
        type: 'select',
      },
      options: ['hover', 'click'],
      description: 'The event that triggers the dropdown menu to open.',
      table: { defaultValue: { summary: 'click' } },
    },
    items: {
      control: 'object',
      description: 'An array of items to be displayed in the dropdown menu.',
      table: { type: { summary: 'DropdownItemProps[]' } },
    },
    arrow: {
      type: 'boolean',
      control: 'boolean',
      description: 'Whether an arrow is displayed on the dropdown pointing to the trigger.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
} as Meta<DropdownProps>

const Template: StoryFn<DropdownProps> = (args) => (
  <Dropdown {...args}>
    <Button>Dropdown</Button>
  </Dropdown>
)

export const Default = Template.bind({})
Default.args = {
  open: true,
  width: '200px',
  position: 'right',
  trigger: 'click',
  arrow: true,
  items: [
    {
      type: 'button',
      label: 'Action 1',
      icon: 'IconEdit',
      onClick: () => alert('Action 1 clicked'),
    },
    {
      type: 'button',
      label: 'Action 2',
      icon: 'IconSettings',
      onClick: () => alert('Action 2 clicked'),
      disabled: true,
    },
    {
      type: 'link',
      label: 'External Link',
      href: 'https://www.example.com',
      target: '_blank',
    },
    {
      type: 'divider',
    },
    {
      type: 'label',
      label: 'Information Label',
    },
  ],
}
