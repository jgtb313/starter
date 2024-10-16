import { IDatabase, IRepositories } from '@/ports/database'
import { Collections } from '../MongoDB.collections'

import { otp } from './OTP.mongodb'
import { user } from './User.mongodb'
// appendAdapterImportHere

export const Repositories: IDatabase['Repositories'] = (): IRepositories => ({
  otp: otp(Collections)(),
  user: user(Collections)(),
  // appendAdapterRepositoryHere
})
