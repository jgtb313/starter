import { forwardRef, PropsWithChildren, Ref } from 'react'
import { AppShell, Center, Stack, Tooltip } from '@mantine/core'

import { Link } from '../../Link'
import { Icon } from '../../Icon'
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

export const Sidebar = ({ active, items = [], header }: SidebarProps) => {
  return (
    <AppShell.Navbar w={80}>
      <Center pt={16}>{header}</Center>

      <Center mt={54}>
        <Stack gap={16}>
          {items.map((item, index) => (
            <SidebarItem {...item} key={index} active={item.href === active} />
          ))}
        </Stack>
      </Center>
    </AppShell.Navbar>
  )
}
