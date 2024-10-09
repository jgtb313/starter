import { IOTPRepository } from './OTP.repository'
import { IPlanRepository } from './Plan.repository'
import { IWorkspaceRepository } from './Workspace.repository'
import { IUserRepository } from './User.repository'
// appendModuleImportHere

export type IRepositories = {
  otp: ReturnType<IOTPRepository>
  plan: ReturnType<IPlanRepository>
  workspace: ReturnType<IWorkspaceRepository>
  user: ReturnType<IUserRepository>
  // appendModuleTypeHere
}
