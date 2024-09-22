import { IRepositories } from '@/ports/database'

import { clearOTPRepositoryInMemory, OTPRepositoryInMemory } from './OTP.repository.in-memory'
import { clearRoleRepositoryInMemory, RoleRepositoryInMemory } from './Role.repository.in-memory'
import { clearWorkspaceRepositoryInMemory, WorkspaceRepositoryInMemory } from './Workspace.repository.in-memory'
import { clearUserRepositoryInMemory, UserRepositoryInMemory } from './User.repository.in-memory'

export const RepositoriesInMemory: IRepositories = {
  otp: OTPRepositoryInMemory,
  role: RoleRepositoryInMemory,
  workspace: WorkspaceRepositoryInMemory,
  user: UserRepositoryInMemory
}

export const clearRepositoriesMocks = () => {
  clearOTPRepositoryInMemory()
  clearRoleRepositoryInMemory()
  clearUserRepositoryInMemory()
  clearWorkspaceRepositoryInMemory()
}
