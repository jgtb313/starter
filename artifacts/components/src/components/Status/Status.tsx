import { Badge as Component } from '@mantine/core'

import { StatusStyles } from './Status.styles'
import { StatusLabels, StatusColors, StatusProps } from './Status.types'

export const Status = ({ variant, ...props }: StatusProps) => {
  const styles = StatusStyles(props)

  return (
    <Component {...props} classNames={{ root: styles.root() }} color={StatusColors[variant]} size="md" variant="outline">
      {StatusLabels[variant]}
    </Component>
  )
}
