import { PropsWithChildren } from 'react'
import { ActionIcon as Component, Tooltip } from '@mantine/core'

import { Link } from '../Link'
import { ActionButtonStyles } from './ActionButton.styles'
import { ActionButtonProps } from './ActionButton.types'

export const ActionButton = ({ variant = 'default', href, target, tooltip, children, ...props }: PropsWithChildren<ActionButtonProps>) => {
  const styles = ActionButtonStyles(props)

  if (href) {
    if (tooltip) {
      return (
        <Tooltip label={tooltip} withArrow>
          <Component
            classNames={{ root: styles.root() }}
            {...props}
            component={Link}
            href={href}
            target={target}
            variant={variant}
            loaderProps={{ type: 'dots' }}
          >
            {children}
          </Component>
        </Tooltip>
      )
    }

    return (
      <Component
        classNames={{ root: styles.root() }}
        {...props}
        component={Link}
        href={href}
        target={target}
        variant={variant}
        loaderProps={{ type: 'dots' }}
      >
        {children}
      </Component>
    )
  }

  if (tooltip) {
    return (
      <Tooltip label={tooltip} withArrow>
        <Component component="button" classNames={{ root: styles.root() }} {...props} variant={variant} loaderProps={{ type: 'dots' }}>
          {children}
        </Component>
      </Tooltip>
    )
  }

  return (
    <Component component="button" classNames={{ root: styles.root() }} {...props} variant={variant} loaderProps={{ type: 'dots' }}>
      {children}
    </Component>
  )
}
