import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { uuid } from '@starter/shared'

import { DrawerProps } from './Drawer.types'

export type DrawerState = {
  drawers: Record<string, DrawerProps>
  currentDrawerId?: string

  open: (props: DrawerProps) => void
  update: (props: DrawerProps) => void
  close: (DrawerId: string) => void
}

const store = create<DrawerState>()

export const useDrawer = store(
  immer((set) => ({
    drawers: {},
    currentDrawerId: undefined,

    open: (modal: DrawerProps) => {
      set((state) => {
        state.drawers[modal.id] = modal
        state.currentDrawerId = modal.id

        setTimeout(() => {
          set((state) => {
            state.drawers[modal.id].opened = true
          })
        }, 100)
      })
    },

    update: (modal: DrawerProps) => {
      set((state) => {
        state.drawers[modal.id] = {
          ...modal,
          opened: true,
        }
      })
    },

    close: (modalId: string) => {
      set((state) => {
        if (!state.drawers[modalId]) {
          return
        }

        state.drawers[modalId].opened = false

        setTimeout(() => {
          set((state) => {
            delete state.drawers[modalId]
          })
        }, 100)
      })
    },
  })),
)

export const drawer = {
  open: ({ id = uuid(), ...props }: Omit<DrawerProps, 'id'> & Partial<Pick<DrawerProps, 'id'>>) => {
    useDrawer.getState().open({ id, ...props })
  },

  update: (props: DrawerProps) => {
    useDrawer.getState().update(props)
  },

  close: (drawerId: string) => {
    useDrawer.getState().close(drawerId)
  },
}
