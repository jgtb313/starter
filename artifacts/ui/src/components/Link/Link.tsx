import { forwardRef, Ref, PropsWithChildren } from 'react'
import { Text } from '@mantine/core'

// import { useUi } from '../Provider'
import { LinkProps } from './Link.types'

const BaseLink = ({ href, children, ...props }: PropsWithChildren<LinkProps>, ref: Ref<HTMLAnchorElement>) => {
  // const { Link: CustomLink } = useUi()

  return (
    <Text ref={ref} component="a" {...props} href={href}>
      {children}
    </Text>
  )
}

export const Link = forwardRef(BaseLink)
