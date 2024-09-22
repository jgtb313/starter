import { IRepositories } from '@/ports/database'

import { OTPRepositoryInMemory } from './OTP.repository.in-memory'
import { RoleRepositoryInMemory } from './Role.repository.in-memory'
import { WorkspaceRepositoryInMemory } from './Workspace.repository.in-memory'
import { UserRepositoryInMemory } from './User.repository.in-memory'

export const RepositoriesInMemory: IRepositories = {
  otp: OTPRepositoryInMemory,
  role: RoleRepositoryInMemory,
  workspace: WorkspaceRepositoryInMemory,
  user: UserRepositoryInMemory
}
