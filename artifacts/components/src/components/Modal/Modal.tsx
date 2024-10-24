import { PropsWithChildren } from 'react'
import { Modal as Component, Flex, FlexProps } from '@mantine/core'

import { Typography } from '../Typography'
import { useModal } from './Modal.store'
import { ModalHeaderProps } from './Modal.types'

export const Modal = {
  Content: ({ children }: PropsWithChildren) => <Component.Content>{children}</Component.Content>,

  Header: ({ description, closable = true, children }: PropsWithChildren<ModalHeaderProps>) => {
    return (
      <Component.Header>
        <Component.Title style={{ flexDirection: 'column' }} display="flex" fz="xl">
          {children}

          {description && (
            <Typography fz="sm" c="dimmed" mt={8}>
              {description}
            </Typography>
          )}
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
  }
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
