import { Pagination, PaginationOutput } from '@starter/schema'

import { Workspace, BaseWorkspace } from '@/schemas'

export type IWorkspaceRepository = {
  findAll(query: Pagination<Workspace>): Promise<PaginationOutput<Workspace>>
  findById(userId: string): Promise<Workspace>
  findOne(input: Partial<Workspace>): Promise<Workspace | null>
  create(input: BaseWorkspace): Promise<Workspace>
  updateById(userId: string, input: Partial<Workspace>): Promise<Workspace>
  deleteById(userId: string): Promise<void>
}
