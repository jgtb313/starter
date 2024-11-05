import { useState, PropsWithChildren } from 'react'
import { Box, Menu, rem } from '@mantine/core'

import { Link } from '../Link'
import { Icon } from '../Icon'
import { DropdownStyles } from './Dropdown.styles'
import { DropdownProps } from './Dropdown.types'

export const Dropdown = ({
  width,
  open,
  position = 'bottom-end',
  trigger = 'click',
  items = [],
  arrow = false,
  children,
  ...props
}: PropsWithChildren<DropdownProps>) => {
  const styles = DropdownStyles(props)
  const [internalOpen, setInternalOpen] = useState(open)

  return (
    <Menu
      classNames={{ dropdown: styles.dropdown() }}
      opened={internalOpen}
      width={width}
      position={position}
      trigger={trigger}
      transitionProps={{ transition: 'pop-top-right' }}
      arrowPosition="center"
      onOpen={() => setInternalOpen(true)}
      onClose={() => setInternalOpen(false)}
      withArrow={arrow}
      withinPortal
    >
      <Menu.Target>
        <Box className="cursor-pointer">{children}</Box>
      </Menu.Target>

      <Menu.Dropdown>
        {items.map((item, index) =>
          item.type === 'label' ? (
            <Menu.Label key={index} fz={rem(14)}>
              {item.label}
            </Menu.Label>
          ) : item.type === 'divider' ? (
            <Menu.Divider key={index} />
          ) : item.type === 'link' ? (
            <Menu.Item
              component={Link}
              key={index}
              href={item.href}
              target={item.target}
              leftSection={item.icon && <Icon name={item.icon} width={18} height={18} />}
              rightSection={item.target === '_blank' ? <Icon name="IconExternalLink" width={15} height={15} /> : undefined}
              disabled={item.disabled}
            >
              {item.label}
            </Menu.Item>
          ) : item.type === 'button' ? (
            <Menu.Item
              key={index}
              onClick={item.onClick}
              leftSection={item.icon && <Icon name={item.icon} width={18} height={18} />}
              rightSection={item.rightSection}
              disabled={item.disabled}
            >
              {item.label}
            </Menu.Item>
          ) : null,
        )}
      </Menu.Dropdown>
    </Menu>
  )
}
