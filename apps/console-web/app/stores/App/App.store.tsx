import { useEffect, useState, PropsWithChildren } from 'react'
import Cookie from 'js-cookie'
import client from '@ss/client'
import { useLocalStorage } from '@ss/components'

import { useRouter } from '~/hooks'
import { AppContext } from './App.context'
import { AppContextProps, AppProviderProps } from './App.types'

export const AppProvider = ({ store: rootStore, user: rootUser, children }: PropsWithChildren<AppProviderProps>) => {
  const router = useRouter()
  const [store, setStore] = useLocalStorage<AppContextProps['store']>('store', rootStore)
  const [user, setUser] = useState<AppContextProps['user']>(rootUser)

  const updateCurrentStore: AppContextProps['updateCurrentStore'] = (store) => {
    setStore(store)
  }

  const updateStore: AppContextProps['updateStore'] = (value) => {
    setStore(value)
  }

  const updateUser: AppContextProps['updateUser'] = (value) => {
    setUser(value)
  }

  const logout: AppContextProps['logout'] = () => {
    Cookie.remove('token')

    client.unauthenticate()

    router.push('/sign-in')
  }

  useEffect(() => {
    updateCurrentStore(rootStore)
  }, [rootStore])

  const value: AppContextProps = {
    store,
    user,

    updateCurrentStore,

    updateStore,
    updateUser,
    logout
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
