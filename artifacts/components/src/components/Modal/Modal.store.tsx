import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { uuid } from '@starter/shared'

import { ModalProps } from './Modal.types'

export type ModalState = {
  modals: Record<string, ModalProps>

  open: (props: ModalProps) => void
  update: (props: ModalProps) => void
  close: (modalId: string) => void
}

const store = create<ModalState>()

export const useModal = store(
  immer((set) => ({
    modals: {},

    open: (modal: ModalProps) => {
      set((state) => {
        state.modals[modal.id] = modal

        setTimeout(() => {
          set((state) => {
            state.modals[modal.id].opened = true
          })
        }, 100)
      })
    },

    update: (modal: ModalProps) => {
      set((state) => {
        state.modals[modal.id] = {
          ...modal,
          opened: true,
        }
      })
    },

    close: (modalId: string) => {
      set((state) => {
        state.modals[modalId].opened = false

        setTimeout(() => {
          set((state) => {
            delete state.modals[modalId]
          })
        }, 100)
      })
    },
  })),
)

export const modal = {
  open: ({ id = uuid(), ...props }: Omit<ModalProps, 'id'> & Partial<Pick<ModalProps, 'id'>>) => {
    useModal.getState().open({ id, ...props })
  },

  update: (props: ModalProps) => {
    useModal.getState().update(props)
  },

  close: (modalId: string) => {
    useModal.getState().close(modalId)
  },
}
