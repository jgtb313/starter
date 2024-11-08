import { PropsWithChildren } from 'react'
import { Drawer as Component, Flex, FlexProps } from '@mantine/core'

import { Typography } from '../Typography'
import { Icon } from '../Icon'
import { useDrawer } from './Drawer.store'
import { DrawerStyles } from './Drawer.styles'
import { DrawerHeaderProps } from './Drawer.types'

export const Drawer = {
  Content: (props: PropsWithChildren) => <Component.Content {...props} />,

  Header: ({ description, closable = true, children }: PropsWithChildren<DrawerHeaderProps>) => (
    <Component.Header>
      <Flex direction="column">
        <Component.Title fz="xl" fw={600}>
          {children}
        </Component.Title>

        {description && (
          <Typography component="h5" c="dimmed" mt={6}>
            {description}
          </Typography>
        )}
      </Flex>

      {closable && <Component.CloseButton icon={<Icon name="X" width={18} strokeWidth={1.5} />} />}
    </Component.Header>
  ),

  Body: (props: PropsWithChildren) => <Component.Body {...props} p={16} />,

  Footer: ({ children, ...props }: PropsWithChildren<FlexProps>) => {
    const styles = DrawerStyles()

    return (
      <Flex className={styles.footer()} direction="row" gap={16} {...props}>
        {children}
      </Flex>
    )
  },
}

export const DrawersProvider = () => {
  const { drawers, close } = useDrawer()

  return (
    <>
      {Object.values(drawers).map(
        ({ id, opened = false, position = 'right', size, padding = true, fullscreen = false, closeOnClickOutside = false, children, ...props }) => {
          const styles = DrawerStyles({ padding })
          size = fullscreen ? '100%' : size

          return (
            <Component.Root
              {...props}
              key={id}
              classNames={{ root: styles.root(), header: styles.header(), title: styles.title(), content: styles.content(), body: styles.body() }}
              opened={opened}
              position={position}
              size={size}
              onClose={() => close(id)}
            >
              <Component.Overlay />

              {children}
            </Component.Root>
          )
        },
      )}
    </>
  )
}
