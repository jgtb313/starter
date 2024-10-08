import { IDatabase, IRepositories } from '@/ports/database'
import { Collections } from '../MongoDB.collections'

import { otp } from './OTP.mongodb'
import { plan } from './Plan.mongodb'
import { role } from './Role.mongodb'
import { workspace } from './Workspace.mongodb'
import { user } from './User.mongodb'
// appendAdapterImportHere

export const Repositories: IDatabase['Repositories'] = (): IRepositories => ({
  otp: otp(Collections)(),
  plan: plan(Collections)(),
  role: role(Collections)(),
  workspace: workspace(Collections)(),
  user: user(Collections)(),
  // appendAdapterRepositoryHere
})
