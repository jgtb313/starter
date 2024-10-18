import { IDatabase } from '@/ports/database'
import { Collections } from '../MongoDB.collections'

import { otp } from './OTP.mongodb'
import { user } from './User.mongodb'
// appendAdapterImportHere

export const Repositories: IDatabase['Repositories'] = {
  otp: otp(Collections)(),
  user: user(Collections)(),
  // appendAdapterRepositoryHere
}
