import { forwardRef, Ref, PropsWithChildren } from 'react'
import { Text } from '@mantine/core'

import { useApp } from '../Provider'
import { LinkProps } from './Link.types'

const BaseLink = ({ href, children, ...props }: PropsWithChildren<LinkProps>, ref: Ref<HTMLAnchorElement>) => {
  const { Link: CustomLink } = useApp()

  return (
    <Text ref={ref} component={CustomLink} {...props} to={href}>
      {children}
    </Text>
  )
}

export const Link = forwardRef(BaseLink)
