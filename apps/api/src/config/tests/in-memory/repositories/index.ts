import { IRepositories } from '@/ports/database'

import { clearOTPRepositoryInMemory, OTPRepositoryInMemory } from './OTP.repository.in-memory'
import { clearPlanRepositoryInMemory, PlanRepositoryInMemory } from './Plan.repository.in-memory'
import { clearRoleRepositoryInMemory, RoleRepositoryInMemory } from './Role.repository.in-memory'
import { clearWorkspaceRepositoryInMemory, WorkspaceRepositoryInMemory } from './Workspace.repository.in-memory'
import { clearUserRepositoryInMemory, UserRepositoryInMemory } from './User.repository.in-memory'
// appendRepositoryInMemoryImportHere

export const RepositoriesInMemory: IRepositories = {
  otp: OTPRepositoryInMemory,
  plan: PlanRepositoryInMemory,
  role: RoleRepositoryInMemory,
  workspace: WorkspaceRepositoryInMemory,
  user: UserRepositoryInMemory,
  // appendRepositoryInMemoryHere
}

export const clearRepositoriesMocks = () => {
  clearOTPRepositoryInMemory()
  clearPlanRepositoryInMemory()
  clearRoleRepositoryInMemory()
  clearUserRepositoryInMemory()
  clearWorkspaceRepositoryInMemory()
  // appendClearRepositoryInMemoryImportHere
}
