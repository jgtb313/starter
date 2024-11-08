import { useLayoutEffect, useRef, forwardRef, PropsWithChildren, Ref } from 'react'
import { AppShell, Center, Flex, Stack, Tooltip } from '@mantine/core'

import { Link } from '../../Link'
import { Icon } from '../../Icon'
import { useLayout } from '../Layout.context'
import { SidebarStyles } from './Sidebar.styles'
import { SidebarProps, SidebarItemProps } from './Sidebar.types'

const SidebarItemControl = forwardRef(
  ({ href, active, children }: PropsWithChildren<Pick<SidebarItemProps, 'href' | 'active'>>, ref: Ref<HTMLAnchorElement>) => {
    const styles = SidebarStyles({
      active,
    })

    return (
      <Link ref={ref} className={styles.item()} href={href}>
        {children}
      </Link>
    )
  },
)

const SidebarItemMiniSingle = ({ label, icon, ...props }: SidebarItemProps) => {
  return (
    <Tooltip position="right" label={label} transitionProps={{ duration: 0 }}>
      <SidebarItemControl {...props}>
        <Icon name={icon} width={24} height={24} strokeWidth={1.8} />
      </SidebarItemControl>
    </Tooltip>
  )
}

const SidebarItem = (props: SidebarItemProps) => {
  return <SidebarItemMiniSingle {...props} />
}

export const Sidebar = ({ active, items = [], header, footer }: SidebarProps) => {
  const { setSidebarWidth } = useLayout()
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    setSidebarWidth(ref.current?.offsetWidth ?? 0)
  }, [])

  return (
    <AppShell.Navbar ref={ref} w={80}>
      <Flex h="100%" direction="column" justify="space-between">
        <Flex direction="column" gap={16}>
          <Center pt={16}>{header}</Center>

          <Center mt={54}>
            <Stack gap={16}>
              {items.map((item, index) => (
                <SidebarItem {...item} key={index} active={item.href === active} />
              ))}
            </Stack>
          </Center>
        </Flex>

        <Center pb={16}>{footer}</Center>
      </Flex>
    </AppShell.Navbar>
  )
}
