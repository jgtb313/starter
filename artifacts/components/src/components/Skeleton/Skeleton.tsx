import { PropsWithChildren } from 'react'
import { Skeleton as Component } from '@mantine/core'

import { SkeletonStyles } from './Skeleton.styles'
import { SkeletonProps } from './Skeleton.types'

export const Skeleton = ({ loading = false, children, ...props }: PropsWithChildren<SkeletonProps>) => {
  const styles = SkeletonStyles(props)

  return (
    <Component classNames={{ root: styles.root() }} {...props} visible={loading}>
      {children}
    </Component>
  )
}
