import { ModalProps as MModalProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type ModalProps = BaseComponent<{
  id: string
  opened?: boolean
  size?: MModalProps['size']
  closeOnClickOutside?: boolean
  centered?: boolean
  fullscreen?: boolean
  children?: MModalProps['children']
}>

export type ModalHeaderProps = {
  description?: string
  closable?: boolean
}

export type ModalRendererProps<T = undefined> = T extends undefined
  ? {
      open: () => void
      close: () => void
    }
  : {
      open: (value: T) => void
      close: () => void
    }

export type ModalRenderer<T = undefined> = (props: ModalRendererProps<T>) => React.ReactNode
