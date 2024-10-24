import { PropsWithChildren } from 'react'
import { Popover as Component } from '@mantine/core'

import { PopoverStyles } from './Popover.styles'
import { PopoverProps } from './Popover.types'

export const Popover = ({ arrow = false, content, children, ...props }: PropsWithChildren<PopoverProps>) => {
  const styles = PopoverStyles(props)

  return (
    <Component classNames={{ dropdown: styles.root() }} {...props} arrowPosition="center" withArrow={arrow} zIndex={5000} closeOnClickOutside>
      <Component.Target>{children}</Component.Target>

      <Component.Dropdown p={0}>{content}</Component.Dropdown>
    </Component>
  )
}
