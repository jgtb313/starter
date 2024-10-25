import { createContext, useContext } from 'react'
import { UiContextProps } from './Provider.types'

export const Context = createContext({} as UiContextProps)

export const useUi = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('useUi must be used within a UiProvider')
  }

  return context
}
