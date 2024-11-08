import { PropsWithChildren } from 'react'
import client from '@starter/client'
import { useRequest } from '@starter/use-hooks'

import { ProfileContext } from './Profile.context'
import { ProfileContextProps, ProfileProviderProps } from './Profile.store.types'

export const ProfileProvider = <WithUser extends boolean>({ user, children }: PropsWithChildren<ProfileProviderProps<WithUser>>) => {
  const [callRetrieve, { loading: loadingRetrieve }] = useRequest(client.profile.retrieve)
  const [callUpdate, { loading: loadingUpdate }] = useRequest(client.profile.update)
  const [callUpdateEmail, { loading: loadingUpdateEmail }] = useRequest(client.profile.updateEmail)
  const [callUpdatePhone, { loading: loadingUpdatePhone }] = useRequest(client.profile.updatePhone)
  const [callUpdatePassword, { loading: loadingUpdatePassword }] = useRequest(client.profile.updatePassword)

  const retrieve: ProfileContextProps<WithUser>['retrieve'] = (input, options) => {
    return callRetrieve({ params: input, options })
  }

  const update: ProfileContextProps<WithUser>['update'] = (input, options) => {
    return callUpdate({
      params: { ...input },
      options,
    })
  }

  const updateEmail: ProfileContextProps<WithUser>['updateEmail'] = (input, options) => {
    return callUpdateEmail({
      params: { ...input },
      options,
    })
  }

  const updatePhone: ProfileContextProps<WithUser>['updatePhone'] = (input, options) => {
    return callUpdatePhone({
      params: { ...input },
      options,
    })
  }

  const updatePassword: ProfileContextProps<WithUser>['updatePassword'] = (input, options) => {
    return callUpdatePassword({
      params: { ...input },
      options,
    })
  }

  const value: ProfileContextProps<WithUser> = {
    user,
    loadingRetrieve,
    loadingUpdate,
    loadingUpdateEmail,
    loadingUpdatePhone,
    loadingUpdatePassword,

    retrieve,
    update,
    updateEmail,
    updatePhone,
    updatePassword,
  }

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}
