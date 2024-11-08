import { createContext } from 'react'
import { create } from 'zustand'

import { StoreState } from './Store.types'

const store = create<StoreState>()

export const useStore = store((set) => ({
  onError: undefined,

  apply: (props) => {
    set(props)
  },
}))

export const Context = createContext<Pick<StoreState, 'onError'> | null>(null)
