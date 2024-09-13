import { IDatabase, IRepositories } from '@/ports/database'
import { otp } from './OTP.mongodb'
import { role } from './Role.mongodb'
import { store } from './Store.mongodb'
import { user } from './User.mongodb'

export const Repositories: IDatabase['Repositories'] = (): IRepositories => ({
  otp: otp(),
  role: role(),
  store: store(),
  user: user()
})
