import { createContext, useContext } from 'react'

import { AuthContextProps } from './Auth.store.types'

export const AuthContext = createContext<AuthContextProps | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    return
  }

  return context
}
