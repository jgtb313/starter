import { Pagination, PaginationOutput } from '@starter/schema'

import { Workspace, BaseWorkspace } from '@/schemas'

export type IWorkspaceRepository = {
  findAllPaginated(input: Pagination<Workspace>): Promise<PaginationOutput<Workspace>>
  findAll(input: Partial<Workspace>): Promise<Workspace[]>
  findById(workspaceId: string): Promise<Workspace>
  findOne(input: Partial<Workspace>): Promise<Workspace | null>
  create(input: BaseWorkspace): Promise<Workspace>
  updateById(workspaceId: string, input: Partial<Workspace>): Promise<Workspace>
}
