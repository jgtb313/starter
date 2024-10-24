import { PropsWithChildren } from 'react'
import { Text } from '@mantine/core'

import { TypographyProps } from './Typography.types'

export const Typography = ({ component = 'span', children, ...props }: PropsWithChildren<TypographyProps>) => {
  return (
    <Text component={component} {...props}>
      {children}
    </Text>
  )
}
