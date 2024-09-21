import { IOTPRepository } from './OTP.repository'
import { IRoleRepository } from './Role.repository'
import { IWorkspaceRepository } from './Workspace.repository'
import { IUserRepository } from './User.repository'

export type IRepositories = {
  otp: ReturnType<IOTPRepository>
  role: ReturnType<IRoleRepository>
  workspace: ReturnType<IWorkspaceRepository>
  user: ReturnType<IUserRepository>
}
