import React, { PropsWithChildren } from 'react'
import { Box, Card as Component } from '@mantine/core'
import { pick, set } from '@starter/shared'

import { CardStyles } from './Card.styles'
import { CardProps } from './Card.types'

export const Card = ({ padding = 0, children, ...props }: PropsWithChildren<CardProps>) => {
  const styles = CardStyles(props)

  return (
    <Component classNames={{ root: styles.root() }} p={padding} {...props}>
      {React.Children.toArray(children).map((children) => React.isValidElement(children) && React.cloneElement(children, pick(props, 'bordered')))}
    </Component>
  )
}

Card.Header = ({ children, ...props }: PropsWithChildren<CardProps>) => {
  const styles = CardStyles(props)

  return (
    <Box className={styles.header()} p="md">
      {children}
    </Box>
  )
}
set(Card.Header, 'displayName', 'CardHeader')

Card.Body = ({ children, ...props }: PropsWithChildren<CardProps>) => {
  const styles = CardStyles(props)

  return (
    <Box className={styles.body()} p="md">
      {children}
    </Box>
  )
}
set(Card.Body, 'displayName', 'CardBody')

Card.Footer = ({ children, ...props }: PropsWithChildren<CardProps>) => {
  const styles = CardStyles(props)

  return (
    <Box className={styles.footer()} p="md">
      {children}
    </Box>
  )
}
set(Card.Footer, 'displayName', 'CardFooter')
