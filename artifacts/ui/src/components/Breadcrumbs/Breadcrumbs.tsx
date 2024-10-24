import { Breadcrumbs as Component } from '@mantine/core'

import { Link } from '../Link'
import { Typography } from '../Typography'
import { BreadcrumbsStyles } from './Breadcrumbs.styles'
import { BreadcrumbsProps } from './Breadcrumbs.types'

export const Breadcrumbs = ({ items, ...props }: BreadcrumbsProps) => {
  const styles = BreadcrumbsStyles(props)

  return (
    <Component classNames={{ root: styles.root() }} {...props} separator="/">
      {items.map((item, index) =>
        item.href ? (
          <Link key={index} className={styles.item()} td="underline" href={item.href}>
            {item.label}
          </Link>
        ) : (
          <Typography key={index} className={styles.item()}>
            {item.label}
          </Typography>
        ),
      )}
    </Component>
  )
}
