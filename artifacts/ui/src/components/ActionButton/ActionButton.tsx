import { PropsWithChildren } from 'react'
import { ActionIcon as Component } from '@mantine/core'

import { useApp } from '../Provider'
import { ActionButtonStyles } from './ActionButton.styles'
import { ActionButtonProps } from './ActionButton.types'

export const ActionButton = ({ variant = 'default', href, children, ...props }: PropsWithChildren<ActionButtonProps>) => {
  const { Link } = useApp()
  const styles = ActionButtonStyles(props)

  if (href) {
    return (
      <Component classNames={{ root: styles.root() }} {...props} component={Link} to={href} variant={variant}>
        {children}
      </Component>
    )
  }

  return (
    <Component component="button" classNames={{ root: styles.root() }} {...props} variant={variant}>
      {children}
    </Component>
  )
}
