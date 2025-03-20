import { createContext, useContext } from 'react'

import { StoreContextProps } from '@/store.context.types'

export const StoreContext = createContext<StoreContextProps | null>(null)

export const useStore = () => {
  const context = useContext(StoreContext)

  if (!context) {
    throw new Error('useStore must be used within an StoreProvider')
  }

  return context
}
