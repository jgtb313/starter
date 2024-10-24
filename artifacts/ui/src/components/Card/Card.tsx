import { PropsWithChildren } from 'react'
import { Card as Component } from '@mantine/core'

import { Typography } from '../Typography'
import { CardStyles } from './Card.styles'
import { CardProps } from './Card.types'

export const Card = ({ title, description, bordered, children, ...props }: PropsWithChildren<CardProps>) => {
  const styles = CardStyles({ title: !!title })

  return (
    <Component className="w-full" classNames={{ root: styles.root() }} withBorder={bordered} {...props}>
      {title && (
        <Component.Section className={styles.title()} py="xs" withBorder={bordered} inheritPadding>
          <Typography className="block" fw={500}>
            {title}
          </Typography>

          {description && (
            <Typography fw={400} fz="sm" c="dimmed">
              {description}
            </Typography>
          )}
        </Component.Section>
      )}

      <div className={styles.body()}>{children}</div>
    </Component>
  )
}
