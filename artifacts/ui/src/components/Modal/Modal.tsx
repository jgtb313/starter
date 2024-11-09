import { PropsWithChildren } from 'react'
import { Modal as Component, Flex, FlexProps } from '@mantine/core'

import { useModal } from './Modal.store'
import { ModalHeaderProps } from './Modal.types'

export const Modal = {
  Content: ({ children, ...props }: PropsWithChildren) => <Component.Content {...props}>{children}</Component.Content>,

  Header: ({ closable = true, children }: PropsWithChildren<ModalHeaderProps>) => {
    return (
      <Component.Header>
        <Component.Title display="flex" fz="xl">
          {children}
        </Component.Title>

        {closable && <Component.CloseButton />}
      </Component.Header>
    )
  },

  Body: ({ children }: PropsWithChildren) => {
    return <Component.Body>{children}</Component.Body>
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
