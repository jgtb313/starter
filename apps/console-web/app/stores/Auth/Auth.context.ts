import { createContext, useContext } from 'react'

import { AuthContextProps } from './Auth.types'

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const useAuth = () => useContext(AuthContext)
