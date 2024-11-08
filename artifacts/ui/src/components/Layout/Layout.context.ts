import { createContext, useContext } from 'react'

import { LayoutContextProps } from './Layout.types'

export const LayoutContext = createContext<LayoutContextProps | null>(null)

export const useLayout = () => {
  const context = useContext(LayoutContext)

  if (!context) {
    throw new Error('useLayout must be used within an LayoutProvider')
  }

  return context
}
