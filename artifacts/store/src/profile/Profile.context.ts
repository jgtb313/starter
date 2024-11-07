import { createContext, useContext } from 'react'

import { ProfileContextProps } from './Profile.store.types'

export const ProfileContext = createContext<ProfileContextProps | null>(null)

export const useProfile = () => {
  const context = useContext(ProfileContext)

  if (!context) {
    throw new Error('useProfile must be used within an ProfileProvider')
  }

  return context
}
