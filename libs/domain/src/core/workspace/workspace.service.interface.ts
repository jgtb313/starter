import { Pagination, PaginationOutput } from '@starter/schema'

import { User } from '@/core/user/user.schema'
import { Workspace, BaseWorkspace } from '@/core/workspace/workspace.schema'

export interface IWorkspaceService {
  getPaginatedWorkspaces(input: Pagination<Workspace>): Promise<PaginationOutput<Workspace>>

  getWorkspace(workspaceId: string): Promise<Workspace>

  createWorkspace(user: User, input: BaseWorkspace): Promise<Workspace>

  updateWorkspace(workspaceId: string, input: Partial<Workspace>): Promise<Workspace>
}
