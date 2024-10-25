import { PropsWithChildren } from 'react'
import { ActionIcon as Component } from '@mantine/core'

import { Link } from '../Link'
import { ActionButtonStyles } from './ActionButton.styles'
import { ActionButtonProps } from './ActionButton.types'

export const ActionButton = ({ variant = 'default', href, children, ...props }: PropsWithChildren<ActionButtonProps>) => {
  const styles = ActionButtonStyles(props)

  if (href) {
    return (
      <Component classNames={{ root: styles.root() }} {...props} component={Link} href={href} variant={variant}>
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
