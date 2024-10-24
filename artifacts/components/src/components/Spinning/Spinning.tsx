import { PropsWithChildren } from 'react'
import { Box, LoadingOverlay as Component } from '@mantine/core'

import { SpinningStyles } from './Spinning.styles'
import { SpinningProps } from './Spinning.types'

export const Spinning = ({ loading = false, children, ...props }: PropsWithChildren<SpinningProps>) => {
  const styles = SpinningStyles(props)

  return (
    <Box pos="relative">
      <Component classNames={{ root: styles.root() }} {...props} visible={loading} zIndex={100} />

      {children}
    </Box>
  )
}
