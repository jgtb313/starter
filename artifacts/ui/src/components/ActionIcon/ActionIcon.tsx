import { ActionIcon as Component, Tooltip, ActionIconProps as ComponentProps } from '@mantine/core'

import { Icon } from '../Icon'
import { Link } from '../Link'
import { ActionIconStyles } from './ActionIcon.styles'
import { ActionIconProps } from './ActionIcon.types'

export const ActionIcon = ({ icon, variant = 'default', href, target, tooltip, ...props }: ActionIconProps) => {
  const styles = ActionIconStyles(props)
  const componentProps: ComponentProps = {
    ...props,
    classNames: { root: styles.root() },
    variant: variant,
    loaderProps: { type: 'dots' },
  }

  if (href) {
    if (tooltip) {
      return (
        <Tooltip label={tooltip} withArrow>
          <Component {...componentProps} component={Link} href={href} target={target}>
            <Icon name={icon} />
          </Component>
        </Tooltip>
      )
    }

    return (
      <Component {...componentProps} component={Link} href={href} target={target}>
        <Icon name={icon} />
      </Component>
    )
  }

  if (tooltip) {
    return (
      <Tooltip label={tooltip} withArrow>
        <Component component="button" {...componentProps}>
          <Icon name={icon} />
        </Component>
      </Tooltip>
    )
  }

  return (
    <Component component="button" {...componentProps}>
      <Icon name={icon} />
    </Component>
  )
}
