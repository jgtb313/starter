import { IOTPRepository } from './OTP.repository'
import { IRoleRepository } from './Role.repository'
import { IStoreRepository } from './Store.repository'
import { IUserRepository } from './User.repository'

export type IRepositories = {
  otp: ReturnType<IOTPRepository>
  role: ReturnType<IRoleRepository>
  store: ReturnType<IStoreRepository>
  user: ReturnType<IUserRepository>
}
