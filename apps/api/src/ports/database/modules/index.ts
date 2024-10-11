import { IOTPRepository } from './OTP.repository'
import { IWorkspaceRepository } from './Workspace.repository'
import { IUserRepository } from './User.repository'
// appendModuleImportHere

export type IRepositories = {
  otp: ReturnType<IOTPRepository>
  workspace: ReturnType<IWorkspaceRepository>
  user: ReturnType<IUserRepository>
  // appendModuleTypeHere
}
