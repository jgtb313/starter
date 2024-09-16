import { IOTPRepository } from './OTP.repository'
import { IRoleRepository } from './Role.repository'

export type IRepositories = {
  otp: ReturnType<IOTPRepository>
  role: ReturnType<IRoleRepository>
}
