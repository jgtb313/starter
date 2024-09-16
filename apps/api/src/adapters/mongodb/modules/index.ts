import { IDatabase, IRepositories } from '@/ports/database'
import { otp } from './OTP.mongodb'
import { role } from './Role.mongodb'

export const Repositories: IDatabase['Repositories'] = (): IRepositories => ({
  otp: otp(),
  role: role()
})
