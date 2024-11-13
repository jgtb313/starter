import { PropsWithChildren } from 'react'
import { ActionIcon as Component, Tooltip, ActionIconProps as ComponentProps } from '@mantine/core'

import { Icon } from '../Icon'
import { Link } from '../Link'
import { ActionIconStyles } from './ActionIcon.styles'
import { ActionIconProps } from './ActionIcon.types'

export const ActionIcon = ({
  color = 'primary',
  variant = 'default',
  size = 'md',
  href,
  target,
  tooltip,
  children,
  ...props
}: PropsWithChildren<ActionIconProps>) => {
  const styles = ActionIconStyles(props)
  const componentProps: ComponentProps = {
    ...props,
    classNames: { root: styles.root() },
    color,
    variant,
    size,
    loaderProps: { type: 'dots' },
  }

  if (href) {
    if (tooltip) {
      return (
        <Tooltip label={tooltip} withArrow>
          <Component {...componentProps} component={Link} href={href} target={target}>
            {children}
          </Component>
        </Tooltip>
      )
    }

    return (
      <Component {...componentProps} component={Link} href={href} target={target}>
        {children}
      </Component>
    )
  }

  if (tooltip) {
    return (
      <Tooltip label={tooltip} withArrow>
        <Component component="button" {...componentProps}>
          {children}
        </Component>
      </Tooltip>
    )
  }

  return (
    <Component component="button" {...componentProps}>
      {children}
    </Component>
  )
}
