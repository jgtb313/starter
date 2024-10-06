import { IDatabase, IRepositories } from '@/ports/database'
import { otp } from './OTP.mongodb'
import { plan } from './Plan.mongodb'
import { role } from './Role.mongodb'
import { workspace } from './Workspace.mongodb'
import { user } from './User.mongodb'

export const Repositories: IDatabase['Repositories'] = (): IRepositories => ({
  otp: otp(),
  plan: plan(),
  role: role(),
  workspace: workspace(),
  user: user()
})
