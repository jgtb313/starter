import { forwardRef, PropsWithChildren, Ref } from 'react'
import { Center, Stack, Tooltip } from '@mantine/core'

import { Link } from '../../Link'
import { Icon } from '../../Icon'
import { SidebarStyles } from './Sidebar.styles'
import { SidebarProps, SidebarItemProps } from './Sidebar.types'

const SidebarItemControl = forwardRef(
  ({ href, active, children }: PropsWithChildren<Pick<SidebarItemProps, 'href' | 'active'>>, ref: Ref<HTMLAnchorElement>) => {
    const styles = SidebarStyles({})

    return (
      <Link ref={ref} className={styles.item()} href={href} data-active={active || undefined}>
        {children}
      </Link>
    )
  },
)

const SidebarItemMiniSingle = ({ label, icon, ...props }: SidebarItemProps) => {
  return (
    <Tooltip position="right" label={label} transitionProps={{ duration: 0 }}>
      <SidebarItemControl {...props}>
        <Icon name={icon} width={23} height={23} strokeWidth={1.8} />
      </SidebarItemControl>
    </Tooltip>
  )
}

const SidebarItem = (props: SidebarItemProps) => {
  return <SidebarItemMiniSingle {...props} />
}

export const Sidebar = ({ active, items = [], header, footer }: SidebarProps) => {
  const styles = SidebarStyles({})

  return (
    <nav className={styles.root()}>
      <Center>{header}</Center>

      <div className={styles.main()}>
        <Stack gap={8} mt="lg">
          {items.map((item, index) => (
            <SidebarItem {...item} key={index} active={item.href === active} />
          ))}
        </Stack>
      </div>
    </nav>
  )
}
