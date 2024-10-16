import { IOTPRepository } from './OTP.repository'
import { IUserRepository } from './User.repository'
// appendModuleImportHere

export type IRepositories = {
  otp: ReturnType<IOTPRepository>
  user: ReturnType<IUserRepository>
  // appendModuleTypeHere
}
