import { Divider as Component } from '@mantine/core'

import { DividerStyles } from './Divider.styles'
import { DividerProps } from './Divider.types'

export const Divider = ({ ...props }: DividerProps) => {
  const styles = DividerStyles(props)

  return <Component classNames={{ root: styles.root() }} {...props} />
}
