import { forwardRef, PropsWithChildren, Ref } from 'react'
import { Button as Component, Tooltip, ButtonProps as ComponentProps } from '@mantine/core'

import { Link } from '../Link'
import { ButtonStyles, ButtonVariants } from './Button.styles'
import { ButtonProps } from './Button.types'

const BaseButton = (
  {
    type = 'button',
    variant = 'filled',
    color = 'primary',
    size = 'md',
    href,
    tooltip,
    block = false,
    children,
    ...props
  }: PropsWithChildren<ButtonProps>,
  ref: Ref<HTMLButtonElement>,
) => {
  const styles = ButtonStyles({ variant, ...props } as ButtonVariants)
  const commonProps: ComponentProps = {
    ...props,
    classNames: { root: styles.root(), label: styles.label() },
    variant,
    color,
    size,
    fullWidth: block,
    loaderProps: { type: 'dots' },
  }

  if (href) {
    if (tooltip) {
      return (
        <Tooltip label={tooltip} withArrow>
          <Component ref={ref as unknown as Ref<HTMLAnchorElement>} component={Link} href={href} {...commonProps}>
            {children}
          </Component>
        </Tooltip>
      )
    }

    return (
      <Component ref={ref as unknown as Ref<HTMLAnchorElement>} component={Link} href={href} {...commonProps}>
        {children}
      </Component>
    )
  }

  if (tooltip) {
    return (
      <Tooltip label={tooltip} withArrow>
        <Component ref={ref} type={type} {...commonProps}>
          {children}
        </Component>
      </Tooltip>
    )
  }

  return (
    <Component ref={ref} type={type} {...commonProps}>
      {children}
    </Component>
  )
}

export const Button = forwardRef(BaseButton)
