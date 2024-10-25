import { forwardRef, Ref, PropsWithChildren } from 'react'
import { Text } from '@mantine/core'

import { useUi } from '../Provider'
import { LinkProps } from './Link.types'

const BaseLink = ({ href, children, ...props }: PropsWithChildren<LinkProps>, ref: Ref<HTMLAnchorElement>) => {
  const { Link: ContextLink } = useUi()

  console.log({ ContextLink })

  return <Text {...props}>{children}</Text>
}

export const Link = forwardRef(BaseLink)
