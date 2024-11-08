import { createContext, useContext } from 'react'

import { ProfileContextProps } from './Profile.store.types'

export const ProfileContext = createContext<ProfileContextProps<boolean> | null>(null)

export const useProfile = <WithUser extends boolean>() => {
  const context = useContext(ProfileContext) as ProfileContextProps<WithUser> | null

  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }

  return context
}
