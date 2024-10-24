import { PropsWithChildren } from 'react'
import { Pill as Component } from '@mantine/core'

import { PillStyles } from './Pill.styles'
import { PillProps } from './Pill.types'

export const Pill = ({ closable = false, children, ...props }: PropsWithChildren<PillProps>) => {
  const styles = PillStyles(props)

  return (
    <Component classNames={{ root: styles.root() }} {...props} withRemoveButton={closable}>
      {children}
    </Component>
  )
}
