import { createContext, useContext } from 'react'
import { AppContextProps } from './App.types'

export const AppContext = createContext<AppContextProps>({} as AppContextProps)

export const useApp = () => useContext(AppContext)
