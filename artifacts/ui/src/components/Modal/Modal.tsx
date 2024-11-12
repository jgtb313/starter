import { PropsWithChildren } from 'react'
import { Modal as Component, Flex, FlexProps } from '@mantine/core'

import { useModal } from './Modal.store'
import { ModalHeaderStyles } from './Modal.styles'
import { ModalHeaderProps } from './Modal.types'

export const Modal = {
  Content: ({ children, ...props }: PropsWithChildren) => <Component.Content {...props}>{children}</Component.Content>,

  Header: ({ size = 'xl', centered = false, bordered = false, closable = true, children }: PropsWithChildren<ModalHeaderProps>) => {
    const styles = ModalHeaderStyles({ bordered, centered })

    return (
      <Component.Header classNames={{ header: styles.root() }}>
        <Component.Title classNames={{ title: styles.title() }} display="flex" fz={size} fw={500}>
          {children}
        </Component.Title>

        {closable && <Component.CloseButton />}
      </Component.Header>
    )
  },

  Body: ({ children }: PropsWithChildren) => {
    return <Component.Body pt="md">{children}</Component.Body>
  },

  Footer: ({ children, ...props }: PropsWithChildren<FlexProps>) => {
    return (
      <Flex p={16} justify="flex-end" gap={16} {...props}>
        {children}
      </Flex>
    )
  },
}

export const ModalsProvider = () => {
  const { modals, close } = useModal()

  return (
    <>
      {Object.values(modals).map(({ id, opened = false, children, ...props }) => (
        <Component.Root {...props} key={id} opened={opened} onClose={() => close(id)}>
          <Component.Overlay />

          {children}
        </Component.Root>
      ))}
    </>
  )
}
