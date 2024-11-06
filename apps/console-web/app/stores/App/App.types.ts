import { Store, User } from '@ss/schema'

export type AppContextProps = {
  store: Store
  user: User

  updateCurrentStore: (store: Store) => void

  updateStore: (value: Store) => void
  updateUser: (value: User) => void
  logout: () => void
}

export type AppProviderProps = {
  store: Store
  user: User
}
