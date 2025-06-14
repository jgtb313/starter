import { Pagination, PaginationOutput } from '@starter/schema'

import { Workspace, BaseWorkspace } from '@/core/workspace/workspace.schema'
import { WorkspaceDomain } from '@/core/workspace/workspace.domain'

// export type IWorkspaceRepository = {
//   findAllPaginated(input: Pagination<Workspace>): Promise<PaginationOutput<Workspace>>
//   findAll(input: Partial<Workspace>): Promise<Workspace[]>
//   findById(workspaceId: string): Promise<Workspace>
//   create(input: BaseWorkspace): Promise<Workspace>
//   updateById(workspaceId: string, input: Partial<Workspace>): Promise<Workspace>
// }

export type IWorkspaceRepository = {
  findAllPaginated(input: Pagination<Workspace>): Promise<PaginationOutput<WorkspaceDomain>>
  findAll(input: Partial<Workspace>): Promise<WorkspaceDomain[]>
  findById(workspaceId: string): Promise<WorkspaceDomain>
  create(input: BaseWorkspace): Promise<WorkspaceDomain>
  updateById(workspaceId: string, input: Partial<Workspace>): Promise<WorkspaceDomain>
}
